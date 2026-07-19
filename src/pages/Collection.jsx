import Reveal from "../components/Reveal";
import CollectionMood from "../components/CollectionMood";
import JourneyGrid from "../components/JourneyGrid";
import Gutter from "../components/Gutter";
import HomeContact from "../components/HomeContact";

export default function Collection() {
  return (
    <div className="pt-32 md:pt-40">
      <section className="px-6 md:px-10 mb-20 md:mb-28">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <span className="eyebrow text-clay mb-6 block">Collection</span>
            <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] tracking-[0.012em] text-ink max-w-3xl mb-6">
              The Forest Holds Many Paths
            </h1>
            <p className="font-body text-ink-soft text-[17px] md:text-[19px] max-w-xl leading-relaxed">
              Four journeys, each shaped for a different kind of arrival.
            </p>
          </Reveal>
        </div>
      </section>

      <CollectionMood />
      <Gutter size="lg" />
      <JourneyGrid />
      <Gutter size="lg" />
      <HomeContact />
    </div>
  );
}
