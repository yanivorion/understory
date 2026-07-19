import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { base44 } from "../api/base44Client";
import { defaultSiteConfig, mergeConfig, mergeFullJourneys, THEME_KEYS } from "./siteConfigDefaults";

const ConfigContext = createContext(null);

// CSS vars store "R G B" channel triples (see src/index.css), not hex —
// that's what lets Tailwind's rgb(var(--x) / <alpha>) opacity modifiers
// (bg-ink/85, text-paper/70, ...) work against a runtime-editable palette.
// Theme values are kept as hex in config/the color picker UI, so convert on
// the way in.
function hexToRgbTriple(hex) {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || "");
  if (!m) return null;
  return `${parseInt(m[1], 16)} ${parseInt(m[2], 16)} ${parseInt(m[3], 16)}`;
}

function applyTheme(theme) {
  if (typeof document === "undefined" || !theme) return;
  const root = document.documentElement;
  THEME_KEYS.forEach((key) => {
    const triple = hexToRgbTriple(theme[key]);
    if (triple) root.style.setProperty(`--color-${key}`, triple);
  });
}

export function ConfigProvider({ children }) {
  // `savedConfig` mirrors what's actually persisted in Base44 (or defaults,
  // if nothing has been saved yet). `config` is what every component on the
  // site reads — it starts equal to savedConfig but the editor panel can
  // push live, unsaved edits into it via updateLocal() for instant preview.
  const [savedConfig, setSavedConfig] = useState(defaultSiteConfig);
  const [config, setConfig] = useState(defaultSiteConfig);
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const records = await base44.entities.SiteConfig.list("-updated_date", 1);
        if (cancelled) return;
        if (records && records.length > 0) {
          const record = records[0];
          setRecordId(record.id);
          const merged = mergeConfig(defaultSiteConfig, record);
          setSavedConfig(merged);
          setConfig(merged);
          applyTheme(merged.theme);
        }
      } catch (err) {
        if (!cancelled) setLoadError(err?.message || String(err));
        console.warn("Base44 config load failed, using built-in defaults:", err?.message || err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Instant, unsaved preview: merges `partial` into the live config that the
  // whole site renders from. Nothing is written to Base44 until persist().
  const updateLocal = useCallback((partial) => {
    setConfig((current) => {
      const next = mergeConfig(current, partial);
      applyTheme(next.theme);
      return next;
    });
    setDirty(true);
  }, []);

  // Writes the current live config to Base44 and promotes it to
  // `savedConfig`, so it's what reloading the page (or a fresh anonymous
  // visitor) will see.
  const persist = useCallback(async () => {
    let id = recordId;
    if (id) {
      await base44.entities.SiteConfig.update(id, config);
    } else {
      const created = await base44.entities.SiteConfig.create(config);
      id = created.id;
      setRecordId(id);
    }
    setSavedConfig(config);
    setDirty(false);
    return config;
  }, [config, recordId]);

  const discardLocal = useCallback(() => {
    setConfig(savedConfig);
    applyTheme(savedConfig.theme);
    setDirty(false);
  }, [savedConfig]);

  const value = useMemo(
    () => ({ config, savedConfig, loading, loadError, dirty, updateLocal, persist, discardLocal, recordId }),
    [config, savedConfig, loading, loadError, dirty, updateLocal, persist, discardLocal, recordId]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useSiteConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useSiteConfig must be used inside a <ConfigProvider>");
  return ctx;
}

// Full journey records (images, arc, support images from data/journeys.js)
// merged with the editable text-field overrides saved in the config.
export function useJourneys() {
  const { config } = useSiteConfig();
  return useMemo(() => mergeFullJourneys(config.journeys), [config.journeys]);
}
