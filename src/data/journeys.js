// Single source of truth for the four journeys.
export const journeys = [
  {
    slug: 'the-inner-clearing',
    number: 'I',
    title: 'The Inner Clearing',
    tagline: 'Where letting go becomes possible',
    duration: '60 minutes',
    location: 'Ein Gedi Forest Reserve',
    sound: 'Analog synth & field recordings',
    teaser: '/images/teaser-inner-clearing.jpg',
    hero: '/images/inner-clearing-hero.jpg',
    supports: [
      '/images/inner-clearing-support-1.jpg',
      '/images/inner-clearing-support-2.jpg',
    ],
    intro:
      'A green oasis held inside dry desert cliffs. This journey begins where water still finds a way — a place that asks nothing of you but presence. The sound opens with the actual stream, then a slow analog warmth gathers beneath it until the mind loosens its grip.',
    movements: [
      {
        phase: 'Entry',
        text: 'You arrive at the water’s edge and simply sit. The stream carries the first sound layer — recorded here, unaltered. Nothing is asked of you yet.',
      },
      {
        phase: 'Immersion',
        text: 'An analog synth rises underneath the field recording, warm and low, meeting the emotional arc of the walk. This is where holding on becomes optional.',
      },
      {
        phase: 'Emergence',
        text: 'The terrain opens. The desert cliffs frame the green below, and the sound thins back to water and air — you leave lighter than you came.',
      },
    ],
  },
  {
    slug: 'undersong',
    number: 'II',
    title: 'Undersong',
    tagline: 'A descent beneath thought, into sensation',
    duration: '75 minutes',
    location: 'Yatir Forest',
    sound: 'Binaural layered ambience',
    teaser: '/images/teaser-undersong.jpg',
    hero: '/images/undersong-hero.jpg',
    supports: [
      '/images/undersong-support-1.jpg',
      '/images/undersong-support-2.jpg',
    ],
    intro:
      'Deep inside the pines, where the trunks recede into soft haze and the light arrives in shafts. Undersong is a descent — out of the thinking mind and into the body. The binaural layering wraps the forest around you until inside and outside stop being separate.',
    movements: [
      {
        phase: 'Entry',
        text: 'You walk in among tall, straight trunks. The recording is close and enveloping — the sound of this forest, breathing at the edge of hearing.',
      },
      {
        phase: 'Immersion',
        text: 'Binaural layers open beneath the canopy. Thought quiets; sensation widens. You feel the forest more than you observe it.',
      },
      {
        phase: 'Emergence',
        text: 'A shaft of light. The layers settle back into a single recorded voice of the woods, and you return to thought — but slower, and further down.',
      },
    ],
  },
  {
    slug: 'the-sky-reveal',
    number: 'III',
    title: 'The Sky Reveal',
    tagline: 'Where breakthrough finds you, not the other way around',
    duration: '50 minutes',
    location: 'Jerusalem Hills',
    sound: 'Resonant tone & wind harmonics',
    teaser: '/images/teaser-sky-reveal.jpg',
    hero: '/images/sky-reveal-hero.jpg',
    supports: [
      '/images/sky-reveal-support-1.jpg',
      '/images/sky-reveal-support-2.jpg',
    ],
    intro:
      'A hillside terrace opening onto rolling hills at golden hour. The Sky Reveal is the shortest journey and often the most sudden — a resonant tone and the harmonics of the wind carry you to an edge, and the view does the rest.',
    movements: [
      {
        phase: 'Entry',
        text: 'You climb to the terrace. Dry grass moves in the low light. A single resonant tone begins, tuned to the wind already moving through the hills.',
      },
      {
        phase: 'Immersion',
        text: 'The harmonics build as the land falls away below you. This is placed exactly where the terrain opens — the sound and the horizon arrive together.',
      },
      {
        phase: 'Emergence',
        text: 'Layered hills fade into golden haze. The tone releases. Whatever you came carrying has quietly rearranged itself.',
      },
    ],
  },
  {
    slug: 'nightfall-communion',
    number: 'IV',
    title: 'Nightfall Communion',
    tagline: 'Meeting the parts of yourself that only appear after dark',
    duration: '90 minutes',
    location: 'Negev high desert edge',
    sound: 'Low drone & night-forest field recordings',
    teaser: '/images/teaser-nightfall.jpg',
    hero: '/images/nightfall-hero.jpg',
    supports: [
      '/images/nightfall-support-1.jpg',
      '/images/nightfall-support-2.jpg',
    ],
    intro:
      'The longest journey, and the only one that waits for dark. At the high desert edge, the sky moves from amber to deep blue, and a low drone holds the ground while the night-forest recordings surface the parts of you that only come out after the light goes.',
    movements: [
      {
        phase: 'Entry',
        text: 'You sit facing the horizon as the last warm light leaves the stones. A low drone settles in — felt as much as heard.',
      },
      {
        phase: 'Immersion',
        text: 'Night-forest field recordings layer in as the sky deepens. In the dark, what the day kept quiet begins to speak. You are held, not exposed.',
      },
      {
        phase: 'Emergence',
        text: 'The first stars appear over the darkening desert. The drone thins to silence, and you meet the vastness on even terms.',
      },
    ],
  },
];

export const getJourney = (slug) => journeys.find((j) => j.slug === slug);
