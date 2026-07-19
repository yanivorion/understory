import Reveal from "./Reveal";

const CAPTIONS = [
  "Every path begins with an open trail, and room enough to walk it slowly.",
  "A hand-held recorder, resting where it was used — never simulated.",
  "Bare feet meet cool earth. The body arrives before the mind does.",
];

export default function CollectionMood() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-y-0">
      <Reveal className="lg:col-span-2">
        <div className="relative overflow-hidden rounded-sm aspect-[3/2]">
          <img
            src="/images/collection-lead.jpg"
            alt="A forest trail curving into soft morning light"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <p className="font-body italic text-ink-soft text-[15px] mt-4 max-w-md">{CAPTIONS[0]}</p>
      </Reveal>

      <div className="flex flex-col gap-8">
        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-sm aspect-square">
            <img
              src="/images/collection-square-1.jpg"
              alt="An analog field recorder resting on tree bark"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <p className="font-body italic text-ink-soft text-[14px] mt-4">{CAPTIONS[1]}</p>
        </Reveal>
        <Reveal delay={180}>
          <div className="relative overflow-hidden rounded-sm aspect-square">
            <img
              src="/images/collection-square-2.jpg"
              alt="Bare feet standing on cool forest earth and moss"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <p className="font-body italic text-ink-soft text-[14px] mt-4">{CAPTIONS[2]}</p>
        </Reveal>
      </div>
    </div>
  );
}
