/**
 * Piped to `base44 exec` — uploads frame files to Base44 public storage.
 * Emits one JSON line per file: {"type":"progress","key":"/frames/...","url":"..."}
 * Final line: {"type":"done","count":N}
 */
const fs = await import("node:fs");
const path = await import("node:path");

const ROOT = Deno.env.get("FRAMES_ROOT") || "public/frames";
const MANIFEST_PATH = Deno.env.get("MANIFEST_PATH");
const CONCURRENCY = Number(Deno.env.get("UPLOAD_CONCURRENCY") || "2");
const ONLY = Deno.env.get("UPLOAD_ONLY")?.split(",").filter(Boolean) || null;

let existing = {};
if (MANIFEST_PATH && fs.existsSync(MANIFEST_PATH)) {
  try {
    existing = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    existing = {};
  }
}

function walk(dir, base = ROOT) {
  const entries = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      entries.push(...walk(full, base));
    } else if (/\.(jpe?g|webp)$/i.test(name)) {
      const rel = "/" + path.relative(base.replace(/^\.\//, ""), full).replace(/\\/g, "/");
      const key = rel.startsWith("/frames/") ? rel : `/frames/${rel.replace(/^\//, "")}`;
      entries.push({ full, key, name });
    }
  }
  return entries;
}

function mime(name) {
  return /\.webp$/i.test(name) ? "image/webp" : "image/jpeg";
}

const all = walk(ROOT);
const queue = (ONLY
  ? all.filter((f) => ONLY.some((id) => f.key.includes(`/frames/${id}/`)))
  : all
).filter((f) => !existing[f.key]);

async function uploadOne({ full, key, name }) {
  const buf = fs.readFileSync(full);
  const file = new File([buf], name, { type: mime(name) });
  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      console.log(JSON.stringify({ type: "progress", key, url: file_url }));
      return;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw lastErr;
}

let index = 0;
async function worker() {
  while (index < queue.length) {
    const i = index++;
    try {
      await uploadOne(queue[i]);
    } catch (err) {
      console.error(JSON.stringify({ type: "error", key: queue[i].key, message: String(err?.message || err) }));
    }
  }
}

const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length || 1) }, () => worker());
await Promise.all(workers);
console.log(JSON.stringify({ type: "done", count: queue.length }));
