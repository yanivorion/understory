// Registry of available scroll-scrubbed frame sequences, selectable per
// section from the editor panel's Backgrounds tab. To add a new sequence,
// drop numbered frames (frame_0001.<ext>, frame_0002.<ext>, ...) into
// public/frames/<id>/ and add an entry here, or run:
//   npm run import:video-scrub
import videoSequences from "./videoFrameSequences.json";
import { resolveFrameAsset } from "./frameUrls";

const VIDEO_FRAME_SEQUENCES = Object.fromEntries(
  videoSequences.map((seq) => [seq.id, seq])
);

export const FRAME_SEQUENCES = {
  hike: {
    id: "hike",
    label: "Forest Walk (hike)",
    path: "/frames/hike/frame_",
    ext: "jpg",
    frameCount: 180,
    thumbnail: "/frames/hike/frame_0001.jpg",
  },
  ascent: {
    id: "ascent",
    label: "Golden-Hour Cairn Ascent",
    path: "/frames/ascent/frame_",
    ext: "webp",
    frameCount: 289,
    thumbnail: "/frames/ascent/frame_0001.webp",
  },
  "astronomy-cosmos": {
    id: "astronomy-cosmos",
    label: "Astronomy / Cosmos",
    path: "/frames/astronomy-cosmos/frame_",
    ext: "webp",
    frameCount: 225,
    thumbnail: "/frames/astronomy-cosmos/frame_0001.webp",
  },
  "slow-motion-bg": {
    id: "slow-motion-bg",
    label: "Slow Motion Ambient",
    path: "/frames/slow-motion-bg/frame_",
    ext: "webp",
    frameCount: 220,
    thumbnail: "/frames/slow-motion-bg/frame_0001.webp",
  },
  "leaf-cluster-dappled": {
    id: "leaf-cluster-dappled",
    label: "Dappled Leaf Cluster",
    path: "/frames/leaf-cluster-dappled/frame_",
    ext: "webp",
    frameCount: 121,
    thumbnail: "/frames/leaf-cluster-dappled/frame_0001.webp",
  },
  "plant-jungle": {
    id: "plant-jungle",
    label: "Jungle Plants",
    path: "/frames/plant-jungle/frame_",
    ext: "webp",
    frameCount: 187,
    thumbnail: "/frames/plant-jungle/frame_0001.webp",
  },
  ...VIDEO_FRAME_SEQUENCES,
};

export const DEFAULT_SEQUENCE_ID = "hike";

function withCdn(seq) {
  if (!seq) return seq;
  return {
    ...seq,
    // path is a frame_ prefix — keep local; ScrollFrameSequence resolves per frame
    thumbnail: resolveFrameAsset(seq.thumbnail),
  };
}

export function getSequence(id) {
  return withCdn(FRAME_SEQUENCES[id] || FRAME_SEQUENCES[DEFAULT_SEQUENCE_ID]);
}

export const SEQUENCE_OPTIONS = Object.values(FRAME_SEQUENCES).map(withCdn);
