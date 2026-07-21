#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "src/lib/frameUploadManifest.json");
const framesRoot = join(root, "public/frames");

function walkCount(dir) {
  let n = 0;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) n += walkCount(full);
    else if (/\.(jpe?g|webp)$/i.test(name)) n += 1;
  }
  return n;
}

function manifestCount() {
  if (!existsSync(manifestPath)) return 0;
  try {
    return Object.keys(JSON.parse(readFileSync(manifestPath, "utf8"))).length;
  } catch {
    return 0;
  }
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const total = walkCount(framesRoot);
const uploaded = manifestCount();

if (uploaded < total) {
  console.log(`Uploading frames: ${uploaded}/${total} done…`);
  run("node", ["scripts/upload-frames-base44.mjs"]);
} else {
  console.log(`All ${total} frames already uploaded.`);
}

run("node", ["scripts/build-deploy.mjs"]);
run("npx", ["base44", "site", "deploy", "-y"]);
console.log("\nDeployed: https://understory-3da0d58a.base44.app");
