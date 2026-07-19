import { useEffect } from "react";
import { useSiteConfig } from "../lib/ConfigProvider";
import { collectGoogleFamilies } from "../lib/fontCatalog";
import { collectUsedFontIds } from "../lib/textStyles";

const LINK_ID = "understory-dynamic-fonts";

export default function FontLoader() {
  const { config } = useSiteConfig();

  useEffect(() => {
    const fontIds = collectUsedFontIds(config.textStyles);
    const specs = collectGoogleFamilies(fontIds);
    const existing = document.getElementById(LINK_ID);
    if (!specs.length) {
      existing?.remove();
      return;
    }
    const href = `https://fonts.googleapis.com/css2?${specs.map((s) => `family=${s}`).join("&")}&display=swap`;
    let link = existing;
    if (!link) {
      link = document.createElement("link");
      link.id = LINK_ID;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.href !== href) link.href = href;
  }, [config.textStyles]);

  return null;
}
