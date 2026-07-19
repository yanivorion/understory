export const journeys = [
  {
    slug: "inner-clearing",
    number: "01",
    title: "The Inner Clearing",
    tagline: "Where letting go becomes possible",
    duration: "60 minutes",
    location: "Ein Gedi Forest Reserve",
    sound: "Analog synth & field recordings",
    heroImage: "/images/inner-clearing-hero.jpg",
    widgetImage: "/images/widget-inner-clearing.jpg",
    supportImages: [
      {
        src: "/images/inner-clearing-support-1.jpg",
        caption: "Water moving over stone, warm and unhurried.",
      },
      {
        src: "/images/inner-clearing-support-2.jpg",
        caption: "Desert cliffs framing the green oasis below.",
      },
    ],
    arc: [
      {
        label: "Entry",
        text: "You descend from dry cliffs into sudden green — the air changes before your eyes adjust. A base layer of real water and wind settles under you.",
      },
      {
        label: "Immersion",
        text: "Analog synth drifts in beneath the stream, shifting with the emotional arc of the walk. Nothing is simulated; the terrain leads and the sound follows.",
      },
      {
        label: "Emergence",
        text: "At the water's edge, where the oasis fully opens, a peak moment placed by the terrain itself invites the letting go this journey is named for.",
      },
    ],
    description:
      "A short, contained descent from arid stone into a living oasis. The Inner Clearing is built for people who need permission to stop holding everything together, even briefly.",
  },
  {
    slug: "undersong",
    number: "02",
    title: "Undersong",
    tagline: "A descent beneath thought, into sensation",
    duration: "75 minutes",
    location: "Yatir Forest",
    sound: "Binaural layered ambience",
    heroImage: "/images/undersong-hero.jpg",
    widgetImage: "/images/widget-undersong.jpg",
    supportImages: [
      {
        src: "/images/undersong-support-1.jpg",
        caption: "Pine litter and quiet underfoot.",
      },
      {
        src: "/images/undersong-support-2.jpg",
        caption: "A single figure, small among tall trunks.",
      },
    ],
    arc: [
      {
        label: "Entry",
        text: "Tall, straight pines close overhead. The forest's own hush becomes your base layer — recorded here, walked here, tested here before it was ever offered.",
      },
      {
        label: "Immersion",
        text: "Binaural layers widen the space between your ears until thought quiets and sensation becomes the more honest signal.",
      },
      {
        label: "Emergence",
        text: "Where the trees finally part and light breaks through in shafts, the layered ambience resolves — not into silence, but into presence.",
      },
    ],
    description:
      "The longest and most interior of the four. Undersong is for people ready to move past thinking about their feelings and into feeling them directly.",
  },
  {
    slug: "sky-reveal",
    number: "03",
    title: "The Sky Reveal",
    tagline: "Where breakthrough finds you, not the other way around",
    duration: "50 minutes",
    location: "Jerusalem Hills",
    sound: "Resonant tone & wind harmonics",
    heroImage: "/images/sky-reveal-hero.jpg",
    widgetImage: "/images/widget-sky-reveal.jpg",
    supportImages: [
      {
        src: "/images/sky-reveal-support-1.jpg",
        caption: "Wind moving through dry hillside grass.",
      },
      {
        src: "/images/sky-reveal-support-2.jpg",
        caption: "Layered hills fading into golden haze.",
      },
    ],
    arc: [
      {
        label: "Entry",
        text: "A climbing terrace path, hills folding out behind you with every step. Wind harmonics ride the actual air moving across the ridge.",
      },
      {
        label: "Immersion",
        text: "A single resonant tone holds steady beneath the wind, giving the mind somewhere to rest while the body keeps climbing.",
      },
      {
        label: "Emergence",
        text: "The terrace opens onto open sky and rolling gold. The shortest journey, built for a fast, clean arrival at breakthrough.",
      },
    ],
    description:
      "Built for people short on time but not short on need. The Sky Reveal compresses entry, immersion, and emergence into fifty honest minutes.",
  },
  {
    slug: "nightfall-communion",
    number: "04",
    title: "Nightfall Communion",
    tagline: "Meeting the parts of yourself that only appear after dark",
    duration: "90 minutes",
    location: "Negev high desert edge",
    sound: "Low drone & night-forest field recordings",
    heroImage: "/images/nightfall-hero.jpg",
    widgetImage: "/images/widget-nightfall.jpg",
    supportImages: [
      {
        src: "/images/nightfall-support-1.jpg",
        caption: "The last warm light catching sand and stone.",
      },
      {
        src: "/images/nightfall-support-2.jpg",
        caption: "First stars over a darkening horizon.",
      },
    ],
    arc: [
      {
        label: "Entry",
        text: "You sit as the desert cools and the color drains from the sky in slow gradient — blue overtaking amber, minute by minute.",
      },
      {
        label: "Immersion",
        text: "A low drone rises beneath field recordings of a forest at night, heard nowhere near this desert — a deliberate layering of what the dark holds everywhere.",
      },
      {
        label: "Emergence",
        text: "The first stars arrive. Nothing resolves loudly. You are simply still there, met, when the parts of you that hide from daylight finally show themselves.",
      },
    ],
    description:
      "The longest and darkest of the four. Nightfall Communion is not about comfort — it is about the honesty that only arrives once performing for daylight is no longer possible.",
  },
];

export const getJourneyBySlug = (slug) => journeys.find((j) => j.slug === slug);

export const philosophyText =
  "Nature doesn't perform for us. It waits. My work is to slow a person down until they can meet it — and themselves — without armor. Sound opens what silence alone cannot reach; the forest holds what the mind has been avoiding. This is not escape. It is arrival.";

export const recognition = {
  press: ["Stillpoint Journal", "Wildmind Quarterly", "The Somatic Review"],
  award: "Recipient of the Nordic Wellbeing Innovation Award",
};

export const aboutContent = {
  story:
    "I didn't set out to build a wellness studio. I set out to stop running from my own quiet. Years of sitting in forests with a recorder and no agenda taught me that people don't need to be fixed — they need somewhere safe enough to stop performing. Understory grew out of that: sessions built from real terrain, real sound, and real time, not a script.",
  approach:
    "Every journey is built from a real place — recorded, walked, and tested before it's ever offered. Sound is layered, not looped: a base of the actual environment, a middle layer that shifts with the emotional arc of the walk, and a peak moment placed where the terrain itself opens up. Nothing is simulated. You are always moving toward something real.",
  press: [
    "Stillpoint Journal",
    "Wildmind Quarterly",
    "The Somatic Review",
    "Groundwork Magazine",
  ],
};

export const contactDetails = {
  email: "info@mysite.com",
  phone: "123-456-7890",
  address: ["500 Terry Francine St", "San Francisco, CA 94158"],
};
