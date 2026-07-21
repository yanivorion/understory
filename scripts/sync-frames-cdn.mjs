#!/usr/bin/env node
/**
 * Sync public/frames/ to S3-compatible object storage (AWS S3, Cloudflare R2, etc.)
 * preserving folder structure so VITE_FRAMES_BASE_URL can point at the bucket origin.
 *
 * Requires AWS CLI v2: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
 *
 * Example (Cloudflare R2):
 *   export FRAMES_S3_BUCKET=understory-frames
 *   export FRAMES_S3_ENDPOINT=https://<account>.r2.cloudflarestorage.com
 *   export AWS_ACCESS_KEY_ID=...
 *   export AWS_SECRET_ACCESS_KEY=...
 *   npm run sync:frames
 *
 * Then set VITE_FRAMES_BASE_URL to your public bucket URL and rebuild:
 *   VITE_FRAMES_BASE_URL=https://pub-xxxx.r2.dev npm run build:deploy
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "public/frames");
const bucket = process.env.FRAMES_S3_BUCKET;
const endpoint = process.env.FRAMES_S3_ENDPOINT;
const prefix = (process.env.FRAMES_S3_PREFIX || "frames").replace(/^\/|\/$/g, "");

if (!existsSync(source)) {
  console.error("No public/frames/ directory found.");
  process.exit(1);
}

if (!bucket) {
  console.error("Set FRAMES_S3_BUCKET to your S3/R2 bucket name.");
  process.exit(1);
}

const awsArgs = ["s3", "sync", source, `s3://${bucket}/${prefix}/`, "--only-show-errors"];
if (endpoint) {
  awsArgs.push("--endpoint-url", endpoint);
}

console.log(`Syncing ${source} → s3://${bucket}/${prefix}/`);
const result = spawnSync("aws", awsArgs, { stdio: "inherit" });
if (result.error?.code === "ENOENT") {
  console.error("\nAWS CLI not found. Install it, or upload public/frames/ manually to your CDN.");
  process.exit(1);
}
process.exit(result.status ?? 1);
