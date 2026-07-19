import Reveal from "./Reveal";
import JourneyCard from "./JourneyCard";
import { useJourneys } from "../lib/ConfigProvider";

export default function JourneyGrid() {
  const journeys = useJourneys();
  const [lead, second, third, fourth] = journeys;

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-0 mb-14 lg:mb-20">
        <Reveal className="lg:col-span-2">
          <JourneyCard journey={lead} aspect="aspect-[3/2]" size="lead" />
        </Reveal>
        <div className="flex flex-col gap-14">
          <Reveal delay={100}>
            <JourneyCard journey={second} aspect="aspect-square" />
          </Reveal>
          <Reveal delay={180}>
            <JourneyCard journey={third} aspect="aspect-square" />
          </Reveal>
        </div>
      </div>

      <Reveal delay={80}>
        <JourneyCard journey={fourth} aspect="aspect-[16/7]" size="lead" />
      </Reveal>
    </div>
  );
}
