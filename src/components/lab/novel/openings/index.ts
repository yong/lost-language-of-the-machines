// The four ways into a chat chapter, built to be compared rather than argued
// about — the same method that settled the reveal modes (see
// raw/chat-novel-pacing-experiment.md). Switch with ?open=, or cycle from the
// chip on the cover; the choice is remembered per device.
//
// Everything except the transition is held constant: same art, same prose,
// same phone, same morph into the thread. Only the way in differs.
import Track from './Track';
import Stories from './Stories';
import Depth from './Depth';
import Cinema from './Cinema';
import type { VariantProps } from './shared';

export type OpeningId = 'track' | 'stories' | 'depth' | 'cinema';

export const OPENINGS: Array<{
  id: OpeningId;
  name: string;
  from: string;
  asks: string;
  Component: React.FC<VariantProps>;
}> = [
  {
    id: 'track', name: 'Track', from: 'Reels · Shorts',
    asks: 'Pages on one rail that moves with your thumb. Does a feed-native pager make a book feel modern, or make the prose feel like something to flick past?',
    Component: Track,
  },
  {
    id: 'stories', name: 'Stories', from: 'Instagram · Snapchat',
    asks: 'Three segments across the top say how many beats there are and which one you are on. Is "how much is left" what the opening was actually missing?',
    Component: Stories,
  },
  {
    id: 'depth', name: 'Depth', from: 'App Store · Apple Books',
    asks: 'Nothing slides; everything is z-axis. You go through the cover, and the phone grows until it is the screen. Going IN rather than going DOWN.',
    Component: Depth,
  },
  {
    id: 'cinema', name: 'Cinema', from: 'film titles',
    asks: 'No pages at all. The art never leaves: the title lifts, the prose rises over it like opening titles, the scene dims, the phone comes up out of the dark. Was the page boundary the problem?',
    Component: Cinema,
  },
];

export const DEFAULT_OPENING: OpeningId = 'track';
export const isOpeningId = (v: string | null): v is OpeningId =>
  !!v && OPENINGS.some((o) => o.id === v);
