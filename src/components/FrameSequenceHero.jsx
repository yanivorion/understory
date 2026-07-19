import SectionBackground from "./SectionBackground";
import HeroOverlay from "./HeroOverlay";
import { useSiteConfig } from "../lib/ConfigProvider";

// Home hero. Background mode (scroll-scrubbed frame sequence / static image
// / flat color) is driven by config.backgrounds.hero — editable from the
// editor panel's Backgrounds tab. Defaults to the scroll-scrubbed forest
// walk, matching the original design exactly.
export default function FrameSequenceHero() {
  const { config } = useSiteConfig();
  return (
    <SectionBackground
      background={config.backgrounds.hero}
      className="min-h-screen w-full bg-ink"
      loadingLabel="Entering the Understory\u2026"
    >
      <HeroOverlay />
    </SectionBackground>
  );
}
