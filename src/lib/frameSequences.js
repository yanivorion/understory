// Registry of available scroll-scrubbed frame sequences. Add new entries
// here after dropping a frame set into public/frames/<id>/frame_0001.webp...
// — they'll then show up as selectable "scrub" backgrounds in /studio for
// any section.
export const FRAME_SEQUENCES = {
  ascent: {
    id: "ascent",
    label: "Golden-Hour Cairn Ascent",
    path: "/frames/ascent/frame_",
    frameCount: 289,
    thumbnail: "/frames/ascent/frame_0001.webp",
  },
};

export const DEFAULT_SEQUENCE_ID = "ascent";

export function getSequence(id) {
  return FRAME_SEQUENCES[id] || FRAME_SEQUENCES[DEFAULT_SEQUENCE_ID];
}
