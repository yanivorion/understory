#!/usr/bin/env node
/**
 * Imports playground components from Downloads exports + JSX files.
 * Dedupes by manifest.type (keeps newest). Generates:
 *   src/components/playground/*.jsx
 *   src/lib/playgroundManifests.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { transformSync } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "src/components/playground");
const manifestOut = path.join(root, "src/lib/playgroundManifests.json");

const downloads = path.join(process.env.HOME, "Downloads");
const jsonGlob = [
  ...fs.readdirSync(downloads).filter((f) => f.startsWith("custom-components") && f.endsWith(".json")),
  ...fs.readdirSync(downloads).filter((f) => f.startsWith("premium-kinetic") && f.endsWith(".json")),
].map((f) => path.join(downloads, f));

const jsxDir = path.join(downloads, "Elementor Plugins");
const jsxPaths = fs.existsSync(jsxDir)
  ? fs.readdirSync(jsxDir).filter((f) => f.endsWith(".jsx")).map((f) => path.join(jsxDir, f))
  : [];

function slugify(type) {
  return type
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractType(code) {
  const m = code.match(/"type"\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function extractManifestBlock(code) {
  const m = code.match(/const\s+MANIFEST\s*=\s*(\{[\s\S]*?\n\};)/);
  return m ? m[1] : null;
}

function isValidJsx(code) {
  try {
    transformSync(code, { loader: "jsx", jsx: "automatic", format: "esm" });
    return true;
  } catch {
    return false;
  }
}

function toModule(code) {
  let body = code.trim();
  if (!body.includes("import React")) {
    body = `import React from "react";\n\n${body}`;
  }
  if (!body.includes("export ")) {
    body += `\n\nexport { MANIFEST, Component };\nexport default Component;\n`;
  }
  return body;
}

const byType = new Map();

for (const p of jsonGlob) {
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const tab of data.tabs || []) {
    const manifest = tab.manifest;
    const code = tab.code || "";
    const type = manifest?.type || extractType(code);
    if (!type || !code) continue;
    const ts = tab.lastModified || 0;
    const prev = byType.get(type);
    if (!prev || ts >= prev.ts) {
      byType.set(type, {
        type,
        displayName: manifest?.editorElement?.displayName || type,
        description: manifest?.description || "",
        manifest,
        config: tab.config || {},
        code,
        source: path.basename(p),
        ts,
      });
    }
  }
}

for (const p of jsxPaths) {
  const code = fs.readFileSync(p, "utf8");
  const type = extractType(code);
  if (!type) continue;
  const displayName = code.match(/"displayName"\s*:\s*"([^"]+)"/)?.[1] || type;
  byType.set(type, {
    type,
    displayName,
    description: "",
    manifest: null,
    config: {},
    code,
    source: path.basename(p),
    ts: Date.now(),
  });
}

fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith(".jsx")) fs.unlinkSync(path.join(outDir, f));
}

const registry = [];
const skipped = [];

for (const entry of [...byType.values()].sort((a, b) => a.displayName.localeCompare(b.displayName))) {
  const id = slugify(entry.type);
  const filename = `${id}.jsx`;
  const moduleCode = toModule(entry.code);
  if (!isValidJsx(moduleCode)) {
    skipped.push({ id, type: entry.type, source: entry.source });
    continue;
  }
  fs.writeFileSync(path.join(outDir, filename), moduleCode);

  let manifest = entry.manifest;
  if (!manifest && extractManifestBlock(entry.code)) {
    // Manifest stays in jsx file; registry stores minimal metadata
    manifest = { type: entry.type, description: entry.description, editorElement: { displayName: entry.displayName } };
  }

  registry.push({
    id,
    type: entry.type,
    label: entry.displayName,
    description: entry.description,
    filename,
    defaultConfig: entry.config,
    manifest,
    source: entry.source,
  });
}

fs.writeFileSync(manifestOut, JSON.stringify(registry, null, 2));
console.log(`Imported ${registry.length} components -> ${outDir}`);
if (skipped.length) console.log(`Skipped ${skipped.length} invalid components`);
console.log(`Registry -> ${manifestOut}`);
