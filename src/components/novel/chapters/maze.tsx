// "The Maze Is Made of Numbers" — a new chapter, at /lab/level256.
//
// One sentence: the game paints the maze by numbers; on level 256 it scribbles
// over half the numbers; so we write them back, and Nova wins. Told through
// paint-by-numbers — and, since the third telling, through PLAYING: the reader
// finishes Nova's level for her, looks underneath while playing, watches the
// bug happen to numbers they saw healthy, and fixes it.
//
// GAME PIECE RESTORED: the maze.
//
// All four cards are the same cabinet (see maze-toys.tsx): one live game, and
// the older cards step aside so there is only ever one Nova and one clock.
//
// History, so nobody repeats it: a coda on the approved overflow chapter
// (reverted); "A Glitch Is a Window" (too many ideas); a paint-by-numbers
// telling you could not play, which showed numbers only on a maze that was
// already broken — so left and right never meant anything.
import { Cabinet, INITIAL, DOTS, type Stage } from '@/components/novel/maze-toys';
import { MAZE_SCRIPT } from '@/components/novel/chapters/maze-script';
import type { ChapterDef, ToyState } from '@/components/novel/chapter-def';

const dotsWithin = (s: ToyState) => (s.eaten as number) + (s.sheet as number[]).filter((n) => n === 2).length;

export const CHAPTER_MAZE: ChapterDef = {
  // v3: each telling saved a different set of toys, and a reader of an old one
  // must not be restored into the middle of a chapter that no longer exists.
  storageKey: 'gameforge.level256.v3',
  exitHref: '/lab',
  opening: {
    image: '/level256/cover.svg',
    eyebrow: 'Level 256',
    title: 'The Maze Is Made of Numbers',
    paragraphs: [
      'It was past midnight, and the only light in the museum basement was the cabinet. Nova had found it three nights ago. She did not know what a level was, but the dots made a small noise when she stepped on them, and she had been stepping on them ever since.',
      'The counter in the corner of the screen said 255, and Nova was asleep on the controls.',
    ],
    handoffLine: 'Starlax got out her phone.',
  },
  ending: {
    line: 'end of level 256. the maze was a sheet of numbers all along — and you wrote it back.',
    next: 'back to the lab →',
    href: '/lab',
  },
  script: MAZE_SCRIPT,
  toys: {
    initial: INITIAL,
    gate: (toy, s) => {
      const level = s.level as number;
      switch (toy) {
        case 'play': return level !== 255 || (s.eaten as number) >= DOTS - 4 ? null : 'eat two dots';
        // A reader who kept playing through the hold may have eaten every dot
        // on 255 already; then there is nothing left to eat while looking, and
        // flipping the switch has to be enough — or the story could never go on.
        case 'look': {
          const none = !(s.sheet as number[]).includes(2);
          return s.peeked || (s.numbers && none) ? null : s.numbers ? 'eat a dot while you look' : 'flip to what the game sees';
        }
        case 'clear': return level !== 255 ? null : 'finish level 255';
        case 'fix': return s.won ? null : dotsWithin(s) < DOTS ? 'paint dots over the junk' : 'now eat every dot';
        default: return null;
      }
    },
    render: (toy, s, set, { live }) => <Cabinet stage={toy as Stage} live={live} s={s} set={set} />,
  },
};
