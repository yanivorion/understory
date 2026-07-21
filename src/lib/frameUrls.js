/**
 * Frame URLs: local /public in dev, bundled /frames for hike, Base44 CDN for the rest.
 */
import bundledManifest from "./frameUploadManifest.json";

let runtimeManifest = null;
let manifestPromise = null;

/** Load manifest from /frameUploadManifest.json in production (updated without rebuild). */
export function ensureFrameManifest() {
  if (import.meta.env.DEV) return Promise.resolve(bundledManifest);
  if (runtimeManifest) return Promise.resolve(runtimeManifest);
  if (!manifestPromise) {
    manifestPromise = fetch("/frameUploadManifest.json")
      .then((r) => (r.ok ? r.json() : bundledManifest))
      .catch(() => bundledManifest)
      .then((data) => {
        runtimeManifest = { ...bundledManifest, ...data };
        return runtimeManifest;
      });
  }
  return manifestPromise;
}

function manifest() {
  return runtimeManifest || bundledManifest;
}

export function framesBaseUrl() {
  const raw = import.meta.env.VITE_FRAMES_BASE_URL;
  if (!raw) return "";
  return String(raw).replace(/\/$/, "");
}

/** Prefer direct media CDN URL — avoids redirect/CORS issues when drawing to canvas. */
export function normalizeFileUrl(url) {
  if (!url || typeof url !== "string") return url;
  if (url.includes("media.base44.com")) return url;
  const m = url.match(/\/files\/mp\/public\/([^/]+)\/([^/?#]+)/);
  if (m) return `https://media.base44.com/images/public/${m[1]}/${m[2]}`;
  return url;
}

/** Full asset path e.g. /frames/hike/frame_0001.jpg */
export function frameAssetKey(path, index, ext) {
  const pad = String(index + 1).padStart(4, "0");
  const base = path.endsWith("_") ? path : `${path}_`;
  const key = `${base}${pad}.${ext}`;
  return key.startsWith("/") ? key : `/${key}`;
}

export function resolveFrameAsset(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return normalizeFileUrl(path);
  const key = path.startsWith("/") ? path : `/${path}`;
  if (manifest()[key]) return normalizeFileUrl(manifest()[key]);
  const base = framesBaseUrl();
  if (base) return `${base}${key}`;
  return key;
}

/** Sequences shipped in dist/frames — always same-origin (canvas-safe). */
const BUNDLED_PREFIXES = ["/frames/hike/"];

function isBundledKey(key) {
  return BUNDLED_PREFIXES.some((p) => key.startsWith(p));
}

/** Resolve a numbered frame for scroll-scrub playback. */
export function resolveFrameUrl(framePath, index, ext) {
  const key = frameAssetKey(framePath, index, ext);

  // Bundled frames: same-origin (canvas-safe in prod, public/ in dev).
  if (isBundledKey(key)) {
    if (/^https?:\/\//i.test(framePath)) {
      return `${framePath}${String(index + 1).padStart(4, "0")}.${ext}`;
    }
    return key;
  }

  if (manifest()[key]) return normalizeFileUrl(manifest()[key]);
  if (/^https?:\/\//i.test(framePath)) {
    return normalizeFileUrl(`${framePath}${String(index + 1).padStart(4, "0")}.${ext}`);
  }
  const base = framesBaseUrl();
  if (base) {
    const localPath = framePath.startsWith("/") ? framePath : `/${framePath}`;
    return `${base}${localPath}${String(index + 1).padStart(4, "0")}.${ext}`;
  }
  return `${framePath}${String(index + 1).padStart(4, "0")}.${ext}`;
}

/** Absolute URL + whether the image is cross-origin (needs crossOrigin for canvas). */
export function resolveFrameImageSrc(framePath, index, ext) {
  const raw = resolveFrameUrl(framePath, index, ext);
  if (typeof window === "undefined") return { src: raw, crossOrigin: false };
  const src = raw.startsWith("/") ? `${window.location.origin}${raw}` : raw;
  const crossOrigin = /^https?:\/\//i.test(src) && !src.startsWith(window.location.origin);
  return { src, crossOrigin };
}
