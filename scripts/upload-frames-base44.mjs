#!/usr/bin/env node
/**
 * Upload scroll-scrub frames to Base44 public storage using CLI auth.
 * Resumes from src/lib/frameUploadManifest.json.
 */
import { createClient } from "@base44/sdk";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { homedir } from "node:os";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "src/lib/frameUploadManifest.json");
const framesRoot = join(root, "public/frames");
const appId = "6a5cb737b1cf64633da0d58a";

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice("--only=".length) : process.env.UPLOAD_ONLY || "";
const concurrency = Number(process.env.UPLOAD_CONCURRENCY || "3");
const delayMs = Number(process.env.UPLOAD_DELAY_MS || "200");

function loadToken() {
  const authPath = join(homedir(), ".base44/auth/auth.json");
  if (!existsSync(authPath)) {
    throw new Error("Not logged in — run: npx base44 login");
  }
  const { accessToken } = JSON.parse(readFileSync(authPath, "utf8"));
  if (!accessToken) throw new Error("Missing access token in ~/.base44/auth/auth.json");
  return accessToken;
}

function walkFrames(dir, base = framesRoot) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walkFrames(full, base));
    } else if (/\.(jpe?g|webp)$/i.test(name)) {
      const rel = relative(base, full).replace(/\\/g, "/");
      out.push({ full, key: `/frames/${rel}`, name });
    }
  }
  return out;
}

function mime(name) {
  return /\.webp$/i.test(name) ? "image/webp" : "image/jpeg";
}

function normalizeUploadUrl(url) {
  const m = String(url).match(/\/files\/mp\/public\/([^/]+)\/([^/?#]+)/);
  if (m) return `https://media.base44.com/images/public/${m[1]}/${m[2]}`;
  return url;
}

function isRateLimit(err) {
  const msg = String(err?.message || err?.status || "");
  return msg.includes("429") || msg.toLowerCase().includes("rate limit");
}

let manifest = {};
if (existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    manifest = {};
  }
}

const base44 = createClient({
  appId,
  token: loadToken(),
  appBaseUrl: "https://base44.app",
});

const all = walkFrames(framesRoot);
const queue = all.filter((f) => {
  if (manifest[f.key]) return false;
  if (!only) return true;
  return only.split(",").some((id) => f.key.includes(`/frames/${id.trim()}/`));
});

if (!queue.length) {
  console.log(`All targeted frames uploaded (${Object.keys(manifest).length} total).`);
  process.exit(0);
}

console.log(`Uploading ${queue.length} frames (${Object.keys(manifest).length} already done)…`);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function uploadOne({ full, key, name }) {
  const buf = readFileSync(full);
  const file = new File([buf], name, { type: mime(name) });
  for (let attempt = 0; attempt < 12; attempt++) {
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      manifest[key] = normalizeUploadUrl(file_url);
      return;
    } catch (err) {
      if (isRateLimit(err)) {
        const wait = Math.min(60000, 2000 * 2 ** attempt);
        console.warn(`  rate limited, waiting ${Math.round(wait / 1000)}s…`);
        await sleep(wait);
        continue;
      }
      if (attempt === 11) throw err;
      await sleep(1500 * (attempt + 1));
    }
  }
}

let done = 0;
const started = Date.now();

for (let i = 0; i < queue.length; i += concurrency) {
  const batch = queue.slice(i, i + concurrency);
  try {
    await Promise.all(batch.map((item) => uploadOne(item)));
    done += batch.length;
    if (done % 20 === 0 || done === queue.length) {
      writeFileSync(manifestPath, JSON.stringify(manifest));
      const elapsed = Math.round((Date.now() - started) / 1000);
      const rate = (done / elapsed * 60).toFixed(0);
      console.log(`  ${Object.keys(manifest).length}/${all.length} (${rate}/min)`);
    }
    if (i + concurrency < queue.length) await sleep(delayMs);
  } catch (err) {
    writeFileSync(manifestPath, JSON.stringify(manifest));
    console.error(`Failed at ${Object.keys(manifest).length}/${all.length}: ${err?.message || err}`);
    process.exit(1);
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest));
console.log(`Done — ${Object.keys(manifest).length} frame URLs in manifest.`);
