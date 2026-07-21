#!/usr/bin/env node
/**
 * Slim Base44 deploy (50 MB limit).
 * - Drops 21 MB optional playground chunk
 * - Bundles compressed hero frames (~9 MB) so scrub works immediately
 * - Other sequences use frameUploadManifest.json (uploaded to Base44 storage)
 */
import { spawnSync } from "node:child_process";
import { rmSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const distFrames = join(dist, "frames");
const distAssets = join(dist, "assets");
const hikeSrc = join(root, "public/frames/hike");
const hikeDest = join(distFrames, "hike");
const manifestSrc = join(root, "src/lib/frameUploadManifest.json");
const manifestDest = join(dist, "frameUploadManifest.json");

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: false, ...opts });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("npm", ["run", "build"]);

if (existsSync(distAssets)) {
  for (const name of readdirSync(distAssets)) {
    if (name.includes("concavecylindergallery")) {
      rmSync(join(distAssets, name), { force: true });
      console.log(`Removed ${name} from deploy bundle`);
    }
  }
}

if (existsSync(distFrames)) rmSync(distFrames, { recursive: true, force: true });

if (existsSync(hikeSrc)) {
  mkdirSync(hikeDest, { recursive: true });
  const frames = readdirSync(hikeSrc).filter((f) => /\.jpe?g$/i.test(f)).sort();
  console.log(`Bundling ${frames.length} compressed hero frames…`);
  for (const name of frames) {
    run("ffmpeg", [
      "-y", "-i", join(hikeSrc, name),
      "-vf", "scale=960:-1", "-q:v", "10", "-frames:v", "1",
      join(hikeDest, name),
    ], { stdio: "ignore" });
  }
}

if (existsSync(manifestSrc)) {
  const raw = JSON.parse(readFileSync(manifestSrc, "utf8"));
  const trimmed = Object.fromEntries(
    Object.entries(raw).filter(([k]) => !k.startsWith("/frames/hike/"))
  );
  writeFileSync(manifestDest, JSON.stringify(trimmed));
  console.log(`Copied frameUploadManifest.json (${Object.keys(trimmed).length} entries, hike bundled locally)`);
}
