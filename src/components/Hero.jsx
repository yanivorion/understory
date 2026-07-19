import ScrollFrameSequence from "./ScrollFrameSequence";
import HeroOverlay from "./HeroOverlay";

export default function Hero() {
  return (
    <ScrollFrameSequence
      frameCount={289}
      framePath="/frames/ascent/frame_"
      scrubVh={320}
      bgClassName="bg-forest-deep"
      loadingLabel="Entering the Understory…"
    >
      <HeroOverlay />
    </ScrollFrameSequence>
  );
}
