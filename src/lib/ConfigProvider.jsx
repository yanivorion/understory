import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { base44 } from "../api/base44Client";
import { defaultSiteConfig, mergeConfig, mergeFullJourneys, THEME_KEYS } from "./siteConfigDefaults";

const ConfigContext = createContext(null);

function applyTheme(theme) {
  if (typeof document === "undefined" || !theme) return;
  const root = document.documentElement;
  THEME_KEYS.forEach((key) => {
    const value = theme[key];
    if (value) root.style.setProperty(`--color-${key}`, value);
  });
}

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(defaultSiteConfig);
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

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

  const saveConfig = useCallback(
    async (partial) => {
      const next = mergeConfig(config, partial);
      let id = recordId;
      if (id) {
        await base44.entities.SiteConfig.update(id, partial);
      } else {
        const created = await base44.entities.SiteConfig.create(partial);
        id = created.id;
        setRecordId(id);
      }
      setConfig(next);
      applyTheme(next.theme);
      return next;
    },
    [config, recordId]
  );

  const value = useMemo(
    () => ({ config, loading, loadError, saveConfig, recordId }),
    [config, loading, loadError, saveConfig, recordId]
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
