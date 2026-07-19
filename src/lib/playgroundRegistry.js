import manifests from "./playgroundManifests.json";

const modules = import.meta.glob("../components/playground/*.jsx");

const byId = new Map(manifests.map((m) => [m.id, m]));
const byType = new Map(manifests.map((m) => [m.type, m]));

export const PLAYGROUND_MANIFESTS = manifests;

export function getPlaygroundManifest(id) {
  return byId.get(id) || null;
}

export function getDefaultPlaygroundConfig(id) {
  const manifest = getPlaygroundManifest(id);
  if (!manifest) return {};
  const defaults = {};
  const data = manifest.manifest?.editorElement?.data || {};
  Object.entries(data).forEach(([key, field]) => {
    defaults[key] = manifest.defaultConfig?.[key] ?? field.defaultValue ?? "";
  });
  return { ...defaults, ...manifest.defaultConfig };
}

export async function loadPlaygroundComponent(id) {
  const manifest = getPlaygroundManifest(id);
  if (!manifest) throw new Error(`Unknown playground component: ${id}`);
  const path = `../components/playground/${manifest.filename}`;
  const loader = modules[path];
  if (!loader) throw new Error(`Playground module not found: ${manifest.filename}`);
  const mod = await loader();
  return {
    Component: mod.Component || mod.default,
    MANIFEST: mod.MANIFEST || manifest.manifest,
    manifest,
  };
}

export function createPlaygroundSection(playgroundId) {
  const manifest = getPlaygroundManifest(playgroundId);
  const sectionId = `playground-${playgroundId}-${Date.now().toString(36)}`;
  return {
    id: sectionId,
    type: "playground",
    playgroundId,
    label: manifest?.label || playgroundId,
    config: getDefaultPlaygroundConfig(playgroundId),
  };
}

export function isPlaygroundSection(section) {
  return section?.type === "playground" && !!section?.playgroundId;
}

export { byType };
