// "The Maze Is Made of Numbers" — a new chapter, at /lab/level256.
//
// One sentence: the game paints the maze by numbers; on level 256 it scribbles
// over half the numbers; so we write them back. Told through paint-by-numbers,
// and through PLAYING: Starlax has played CATVENTURE all week and is on its last
// level; the reader plays it, the strange thing happens to them, they look
// underneath, and they win the level nobody could.
//
// GAME PIECE RESTORED: the maze.
//
// All four cards are the same cabinet (see maze-toys.tsx): one live game, and
// the older cards step aside so there is only ever one cat and one clock.
//
// History, so nobody repeats it: a coda on the approved overflow chapter
// (reverted); "A Glitch Is a Window" (too many ideas); a paint-by-numbers
// telling you could not play, which showed numbers only on a maze that was
// already broken — so left and right never meant anything; a telling where
// Nova, the museum cat, played the game, which felt strange; and one where the
// game had sat PAUSED on 255 for two hundred years, which made no sense. The hero is now
// CATVENTURE's own cat, and the famous real game it echoes is not named.
import { Cabinet, INITIAL, DOTS, type Stage } from '@/components/novel/maze-toys';
import { MAZE_SCRIPT } from '@/components/novel/chapters/maze-script';
import type { ChapterDef, ToyState } from '@/components/novel/chapter-def';

const dotsWithin = (s: ToyState) => (s.eaten as number) + (s.sheet as number[]).filter((n) => n === 2).length;

export const CHAPTER_MAZE: ChapterDef = {
  // v3: each telling saved a different set of toys, and a reader of an old one
  // must not be restored into the middle of a chapter that no longer exists.
  storageKey: 'gameforge.level256.v6',
  exitHref: '/lab',
  opening: {
    image: '/level256/cover.svg',
    eyebrow: 'Level 256',
    title: 'The Maze Is Made of Numbers',
    paragraphs: [
      'On Monday, behind the boxes in the museum basement, Starlax found an old arcade game called CATVENTURE. You are a cat made of little squares. You eat the dots. The dots come back.',
      'By Thursday she had stopped going to lunch. By Saturday night she had cleared 254 levels, and there was one left.',
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
        case 'play': return level === 255 ? 'finish level 255' : null;
        // A reader who kept playing may have eaten every dot on the good side
        // already; then there is nothing left to eat while looking, and
        // flipping the switch has to be enough — or the story could never go on.
        case 'look': {
          const none = !(s.sheet as number[]).includes(2);
          return s.peeked || (s.numbers && none) ? null : s.numbers ? 'eat a dot while you look' : 'flip to what the game sees';
        }
        case 'fix': return s.won ? null : dotsWithin(s) < DOTS ? 'paint dots over the junk' : 'now eat every dot';
        default: return null;
      }
    },
    // Every card here is the game, and every gate is something HAPPENING in it
    // — the level ended, the 2 became a 0, the level was won. The story reacts
    // straight away instead of holding on a button (see chapter-def `events`).
    events: ['play', 'look', 'fix'],
    render: (toy, s, set, { live }) => <Cabinet stage={toy as Stage} live={live} s={s} set={set} />,
  },
};
