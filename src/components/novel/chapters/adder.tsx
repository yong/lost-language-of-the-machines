// "Two Doors Can Add" — a new chapter at /lab/adder.
//
// One sentence: a machine cannot count, but two doors can add — XOR writes the
// digit, AND carries the one, and carries ripple from column to column like
// dominoes. Logic IS maths; that is the whole message.
//
// GAME PIECE RESTORED: the score's adding. The last two cards are the same
// machine (CATVENTURE's score), so only the newest card is live.
import { AdderCover, AdderToy, DoorToy, tried } from '@/components/novel/adder-toys';
import { ADDER_SCRIPT } from '@/components/novel/chapters/adder-script';
import type { ChapterDef, ToyState } from '@/components/novel/chapter-def';

const b = (s: ToyState, k: string) => s[k] as boolean;
const n = (s: ToyState, k: string) => s[k] as number;

export const CHAPTER_ADDER: ChapterDef = {
  storageKey: 'gameforge.adder.v1',
  exitHref: '/lab',
  opening: {
    image: '',
    art: <AdderCover />,
    eyebrow: 'Logic Gates',
    title: 'Two Doors Can Add',
    paragraphs: [
      'The back of the CATVENTURE cabinet came off with four screws. Starlax had expected to find the part that does the maths — a little calculator, or a box of numbers. There wasn’t one.',
      'There were only switches: thousands of tiny ones, each letting a signal through or stopping it. Little doors. And every time the cat ate a fish, the score still went up by exactly one.',
    ],
    handoffLine: 'Starlax got out her phone.',
  },
  ending: {
    line: 'end of the chapter. two doors make a column, columns make an adder — and the score counts.',
    next: 'back to the lab →',
    href: '/lab',
  },
  script: ADDER_SCRIPT,
  toys: {
    initial: {
      andA: false, andB: false, andSeen: 0,
      xorA: false, xorB: false, xorSeen: 0,
      score: 1, best: 1, fell: false,
    },
    // Every gate names what to TOUCH.
    gate: (toy, s) => {
      switch (toy) {
        case 'and':
          return tried(n(s, 'andSeen'), true, true) ? null : b(s, 'andA') || b(s, 'andB') ? 'tap the other chute too' : 'tap a chute';
        case 'xor': {
          const one = tried(n(s, 'xorSeen'), true, false) || tried(n(s, 'xorSeen'), false, true);
          const both = tried(n(s, 'xorSeen'), true, true);
          return one && both ? null : !one ? 'tap one chute' : 'now fill both chutes';
        }
        case 'add': return n(s, 'best') >= 2 ? null : 'tap 🐟 +1';
        case 'ripple': return n(s, 'best') >= 8 ? null : 'tap 🐟 +1';
        default: return null;
      }
    },
    played: {
      and: { andA: true, andB: true, andSeen: 0b1010 },
      xor: { xorA: true, xorB: true, xorSeen: 0b1010 },
      add: { score: 2, best: 2 },
      ripple: { score: 8, best: 8 },
    },
    render: (toy, s, set, { live }) => {
      switch (toy) {
        case 'and':
        case 'xor': {
          const k = toy;
          return (
            <DoorToy
              kind={k}
              a={b(s, `${k}A`)} b={b(s, `${k}B`)} seen={n(s, `${k}Seen`)}
              done={CHAPTER_ADDER.toys.gate(k, s) === null}
              onChange={(a, bb, seen) => set({ [`${k}A`]: a, [`${k}B`]: bb, [`${k}Seen`]: seen })}
            />
          );
        }
        case 'add':
        case 'ripple':
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
