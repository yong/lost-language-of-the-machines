// "The Maze Is Made of Numbers" — a new chapter, at /lab/level256.
//
// The idea in one sentence: the game paints the maze by numbers; on level 256
// it scribbled over half the numbers; so we write them back, and Nova wins.
// Told through paint-by-numbers, which every kid already knows.
//
// GAME PIECE RESTORED: the maze. The reader literally writes it back, square
// by square — the concept and the restoration are the same action.
//
// History of this chapter, so nobody repeats it: the Pac-Man scene began as a
// coda bolted onto the approved overflow chapter (reverted — "do not ruin
// it"), then became "A Glitch Is a Window", which crammed in memory, colour
// hacking and "values vs behaviour" and could not be followed. This telling
// keeps the hook (Nova vs level 256) and exactly one idea.
import { BreakToy, SheetToy, FixToy, JUNK, DOTS_NEEDED } from '@/components/novel/maze-toys';
import { MAZE_SCRIPT } from '@/components/novel/chapters/maze-script';
import type { ChapterDef } from '@/components/novel/chapter-def';

const dots = (half: number[]) => half.filter((n) => n === 2).length;

export const CHAPTER_MAZE: ChapterDef = {
  // v2: the earlier telling saved a different set of toys; a reader carrying
  // that save must not be "restored" into the middle of a chapter that no
  // longer exists.
  storageKey: 'gameforge.level256.v2',
  exitHref: '/lab',
  opening: {
    image: '/level256/cover.svg',
    // Where the chapter number goes. It has not been given one yet.
    eyebrow: 'Level 256',
    title: 'The Maze Is Made of Numbers',
    paragraphs: [
      'It was past midnight, and the only light in the museum basement was the cabinet. Nova had found it three nights ago. She did not know what a level was, but the dots made a small noise when she stepped on them, and she had been stepping on them ever since.',
      'The counter in the corner of the screen said 255.',
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
    initial: { level: 255, broke: false, game: false, peeked: false, half: [...JUNK], won: false },
    gate: (toy, s) => {
      switch (toy) {
        // Each gate asks for a moment, never an answer (the story never quizzes).
        case 'break': return s.broke ? null : 'let her clear level 255';
        case 'sheet': return s.peeked ? null : 'look at what the game sees';
        case 'fix': return s.won ? null
          : dots(s.half as number[]) >= DOTS_NEEDED ? 'let her finish it'
          : `write ${DOTS_NEEDED} dots back`;
        default: return null;
      }
    },
    render: (toy, s, set) => {
      const half = s.half as number[];
      switch (toy) {
        case 'break': return (
          <BreakToy level={s.level as number} broke={s.broke as boolean} half={half}
            onChange={(level, broke) => set({ level, broke })} />
        );
        case 'sheet': return (
          <SheetToy game={s.game as boolean} half={half}
            onChange={(game) => set(game ? { game, peeked: true } : { game })} />
        );
        case 'fix': return (
          <FixToy half={half} won={s.won as boolean} onChange={(h, won) => set({ half: h, won })} />
        );
        default: return null;
      }
    },
    played: {
      break: { level: 256, broke: true },
      sheet: { game: true, peeked: true },
      fix: { half: JUNK.map((n, i) => (i < DOTS_NEEDED ? 2 : n)), won: true },
    },
  },
};
