// "Two Doors Can Add" — a new chapter at /lab/adder.
//
// One sentence: Starlax's score can't count past 1, because its carry door
// has burnt out — and the only spare is inside Santa's Naughty-or-Nice
// Machine. Logic IS maths: XOR writes the digit, AND carries the one.
//
// GAME PIECE RESTORED: the score's adding. Three toys: the broken score
// (1, 0, 1, 0), the Santa machine (AND and NOT, then the heist), the fixed
// score (the carries ripple up to 1000).
import { AdderToy, SantaToy } from '@/components/novel/adder-toys';
import SantaCover from '@/components/novel/santa-cover';
import { ADDER_SCRIPT } from '@/components/novel/chapters/adder-script';
import type { ChapterDef, ToyState } from '@/components/novel/chapter-def';

const b = (s: ToyState, k: string) => s[k] as boolean;
const n = (s: ToyState, k: string) => s[k] as number;

export const CHAPTER_ADDER: ChapterDef = {
  // bump on every change to the script's shape (v6: the maze, and two new lines before the last toy); an old place points at the wrong line
  storageKey: 'gameforge.adder.v6',
  exitHref: '/lab',
  opening: {
    image: '',
    // Santa's Naughty-or-Nice Machine — the author's idea: see santa-cover.tsx
    art: <SantaCover />,
    eyebrow: 'Logic Gates',
    title: 'Two Chips Can Add',
    paragraphs: [
      // nothing here about WHAT the score does: a cold read said the paper
      // spoiled the 1, 0, 1, 0 before the reader got to play it
      'For a whole week, Starlax had fed the cat in CATVENTURE every fish in the maze.',
      'Something was wrong with her score. She had read the rules twice, and it still made no sense.',
    ],
    handoffLine: 'Starlax got out her phone.',
  },
  ending: {
    line: 'end of the chapter. the score counts again — and Santa’s machine says NICE to everyone.',
    next: 'back to the lab →',
    href: '/lab',
  },
  script: ADDER_SCRIPT,
  toys: {
    initial: {
      bscore: 0, bbest: 0, fish: 0,
      teeth: false, please: false, cat: false, seenNice: false, seenNaughty: false, heist: false,
      score: 0, best: 0, fell: false,
    },
    // Every gate names what to TOUCH.
    gate: (toy, s) => {
      switch (toy) {
        case 'broken': return n(s, 'fish') >= 6 ? null : 'tap the maze to steer the cat 🐱';
        case 'santa':
          return !b(s, 'seenNice') ? 'flip the switches until it says NICE'
            : !b(s, 'seenNaughty') ? 'now make it say NAUGHTY 😈'
            : !b(s, 'heist') ? 'tap the chip to pull it out 🔧' : null;
        case 'fixed': return n(s, 'best') >= 8 ? null : 'tap the maze to steer the cat 🐟';
        default: return null;
      }
    },
    // the fixed score reaching 8 is a game event: the story follows at once
    // and the game plays on
    events: ['fixed'],
    played: {
      broken: { bscore: 0, bbest: 1, fish: 6 },
      santa: { teeth: true, please: true, cat: false, seenNice: true, seenNaughty: true, heist: true },
      fixed: { score: 8, best: 8 },
    },
    render: (toy, s, set, { live }) => {
      switch (toy) {
        case 'broken':
          // one cat on screen at a time: an older card steps aside to a note
          return (
            <AdderToy
              broken v={n(s, 'bscore')} best={n(s, 'bbest')} fell={false} fish={n(s, 'fish')} live={live}
              want={CHAPTER_ADDER.toys.gate(toy, s) !== null}
              onChange={(v, best) => set({ bscore: v, bbest: best, fish: n(s, 'fish') + 1 })}
            />
          );
        case 'santa':
          return (
            <SantaToy
              teeth={b(s, 'teeth')} please={b(s, 'please')} cat={b(s, 'cat')}
              seenNice={b(s, 'seenNice')} seenNaughty={b(s, 'seenNaughty')} heist={b(s, 'heist')}
              onChange={(p) => set(p as ToyState)}
            />
          );
        case 'fixed':
          return (
            <AdderToy
              v={n(s, 'score')} best={n(s, 'best')} fell={b(s, 'fell')} live={live}
              want={CHAPTER_ADDER.toys.gate(toy, s) !== null}
              onChange={(score, best, fell) => set({ score, best, fell })}
            />
          );
        default: return null;
      }
    },
  },
};
