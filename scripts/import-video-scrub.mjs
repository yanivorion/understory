#!/usr/bin/env node
/**
 * Extract every frame from source videos for scroll-scrub backgrounds.
 * No decimation — full native frame count and duration.
 *
 * Usage:
 *   node scripts/import-video-scrub.mjs [video.mp4 ...]
 *   npm run import:video-scrub
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync, spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const framesRoot = path.join(root, "public/frames");
const registryOut = path.join(root, "src/lib/videoFrameSequences.json");

const DEFAULT_VIDEOS = [
  "/Users/yanivo/Downloads/2158566_Green_Snake_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Boat_Billed_1280x672.mp4",
  "/Users/yanivo/Downloads/4954446_Sky_Forest_1280x720.mp4",
  "/Users/yanivo/Downloads/4949819_Environment_Nature_1280x720.mp4",
  "/Users/yanivo/Downloads/4668312_Unrecognizable_Tourists_1280x720.mp4",
  "/Users/yanivo/Downloads/7142155_Forest_Nature_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Rainforest_Binna_Burra_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Aerial_Mossy_1280x720.mp4",
  "/Users/yanivo/Downloads/2411656_Nungnung_Waterfall_1280x720.mp4",
  "/Users/yanivo/Downloads/1519164_Fountain_Water_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Forest_Ferns_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Lush_Green_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Habitat_Jungle_1280x672.mp4",
  "/Users/yanivo/Downloads/2632219_Rainforest_Tropical_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Forest_Jungle_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Jungle_Forest_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Jungle_Palm_Trees_1280x720.mp4",
  "/Users/yanivo/Downloads/0_Aerial_Drone_1280x720.mp4",
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function labelFromFilename(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  const stripped = base
    .replace(/^\d+_/, "")
    .replace(/_\d+x\d+$/, "")
    .replace(/^0_/, "");
  return stripped.replace(/_/g, " ").trim();
}

function probe(videoPath) {
  const json = execSync(
    `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames -show_entries format=duration -of json "${videoPath}"`,
    { encoding: "utf8" }
  );
  const data = JSON.parse(json);
  const stream = data.streams?.[0] || {};
  const [num, den] = (stream.r_frame_rate || "24/1").split("/").map(Number);
  const fps = den ? num / den : 24;
  const duration = parseFloat(data.format?.duration || "0");
  const nbFrames = parseInt(stream.nb_frames || "0", 10);
  return {
    width: stream.width || 1280,
    height: stream.height || 720,
    fps,
    duration,
    nbFrames: nbFrames || Math.round(duration * fps),
  };
}

function extractFrames(videoPath, outDir) {
  const ext = "jpg";
  fs.mkdirSync(outDir, { recursive: true });
  const existing = fs.readdirSync(outDir).filter((f) => new RegExp(`^frame_\\d+\\.${ext}$`).test(f));
  if (existing.length > 0) {
    console.log(`  Skipping extract — ${existing.length} frames already in ${path.basename(outDir)}`);
    return { frameCount: existing.length, ext };
  }

  console.log(`  Extracting all frames -> ${outDir}`);
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      videoPath,
      "-an",
      "-fps_mode",
      "passthrough",
      "-q:v",
      "2",
      path.join(outDir, `frame_%04d.${ext}`),
    ],
    { stdio: "inherit" }
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${videoPath}`);
  }
  const frameCount = fs.readdirSync(outDir).filter((f) => new RegExp(`^frame_\\d+\\.${ext}$`).test(f)).length;
  return { frameCount, ext };
}

function loadExistingRegistry() {
  if (!fs.existsSync(registryOut)) return [];
  return JSON.parse(fs.readFileSync(registryOut, "utf8"));
}

const inputs = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_VIDEOS;
const existing = loadExistingRegistry();
const byId = new Map(existing.map((e) => [e.id, e]));

for (const videoPath of inputs) {
  if (!fs.existsSync(videoPath)) {
    console.warn(`Missing: ${videoPath}`);
    continue;
  }

  const label = labelFromFilename(videoPath);
  const id = slugify(label);
  const outDir = path.join(framesRoot, id);
  const meta = probe(videoPath);

  console.log(`\n[${id}] ${label}`);
  const { frameCount, ext } = extractFrames(videoPath, outDir);

  const entry = {
    id,
    label,
    path: `/frames/${id}/frame_`,
    ext,
    frameCount,
    thumbnail: `/frames/${id}/frame_0001.${ext}`,
    source: path.basename(videoPath),
    width: meta.width,
    height: meta.height,
    fps: Math.round(meta.fps * 1000) / 1000,
    duration: Math.round(meta.duration * 1000) / 1000,
    notes: "Full native frame extraction — no decimation.",
  };

  fs.writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify(
      {
        source: entry.source,
        frameCount: entry.frameCount,
        width: entry.width,
        height: entry.height,
        fps: entry.fps,
        duration: entry.duration,
        extension: entry.ext,
        pattern: `frame_%04d.${entry.ext}`,
        path: `frames/${id}/`,
        notes: entry.notes,
      },
      null,
      2
    )
  );

  byId.set(id, entry);
  console.log(`  ${frameCount} frames (${meta.duration.toFixed(1)}s @ ${meta.fps.toFixed(2)}fps)`);
}

const registry = [...byId.values()].sort((a, b) => a.label.localeCompare(b.label));
fs.writeFileSync(registryOut, JSON.stringify(registry, null, 2));
console.log(`\nRegistry: ${registry.length} video sequences -> ${registryOut}`);
