import { useEffect, useState } from "react";
import SectionBackground from "./SectionBackground";
import { defaultBackgroundForSection } from "../lib/homeSections";
import { useSiteConfig } from "../lib/ConfigProvider";
import { loadPlaygroundComponent } from "../lib/playgroundRegistry";

export default function PlaygroundSection({ sectionId, section }) {
  const { config } = useSiteConfig();
  const [loaded, setLoaded] = useState(null);
  const [error, setError] = useState(null);
  const bg = config.backgrounds?.[sectionId] || defaultBackgroundForSection(sectionId);

  useEffect(() => {
    let cancelled = false;
    setLoaded(null);
    setError(null);
    loadPlaygroundComponent(section.playgroundId)
      .then((mod) => {
        if (!cancelled) setLoaded(mod);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || String(err));
      });
    return () => {
      cancelled = true;
    };
  }, [section.playgroundId]);

  const Component = loaded?.Component;

  return (
    <SectionBackground background={bg} sectionId={sectionId} className="relative overflow-visible">
      <div className="relative z-10 w-full">
        {error && (
          <div className="px-6 py-16 text-center meta text-clay">
            Failed to load component: {error}
          </div>
        )}
        {!error && !Component && (
          <div className="px-6 py-16 text-center meta text-fog/60">Loading component…</div>
        )}
        {Component && <Component config={section.config || {}} />}
      </div>
    </SectionBackground>
  );
}
