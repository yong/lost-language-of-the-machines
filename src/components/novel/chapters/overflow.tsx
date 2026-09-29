// "A Number Can Run Out of Room" — the integer-overflow chapter.
//
// GAME PIECE RESTORED: the score counter. The chapter's last toy is the
// cartridge's own high score rolling over at 255, and the repair is the reader
// giving it a second byte — so the concept and the restoration are the same
// action, which is the book's spine.
//
// The cover is the real hook: a fuel price sign with four windows, photographed
// at 9.99, one cent from having nowhere to put the answer. `public/overflow/
// cover.svg` draws it mid-roll, with the carry climbing off the top.
import { PumpToy, ByteToy, YearToy, ScoreToy } from '@/components/novel/overflow-toys';
import TwinkleCover from '@/components/novel/openings/TwinkleCover';
import { OVERFLOW_SCRIPT } from '@/components/novel/chapters/overflow-script';
import type { ChapterDef } from '@/components/novel/chapter-def';

export const CHAPTER_OVERFLOW: ChapterDef = {
  storageKey: 'gameforge.overflow.v1',
  exitHref: '/lab',
  opening: {
    image: '/overflow/cover.svg',
    // Twinkling stars, not snow — the author's call ("the snow screen is
    // overused"). Only in open sky: never over the sign, the drifting 1s or
    // the palms.
    art: (
      <TwinkleCover
        image="/overflow/cover.svg"
        // a phone shows only x 188–836 of the art, so the sky it can see is
        // two strips beside the sign and a band above it; fill those first
        sky={[[150, 0, 290, 900], [740, 0, 880, 680], [150, 0, 880, 60], [0, 0, 1024, 900]]}
        count={56}
        avoid={[[285, 50, 750, 1020], [680, 230, 840, 960], [740, 670, 1024, 1400], [80, 880, 290, 1400]]}
      />
    ),
    eyebrow: 'Chapter Six',
    title: 'A Number Can Run Out of Room',
    paragraphs: [
      // Short on purpose: everything stated here is something the toys no longer
      // get to reveal. The sign is the hook and the joke; the reason is theirs.
      'The price sign on the museum forecourt had four little windows — three digits and a dot. Regular climbed. Plus climbed. Premium climbed. And the bottom row, diesel, had read 9.99 through two shortages, one drought and an entire war: perfectly steady, the only price in the world that appeared to have made up its mind.',
      'Nobody had ever thought to ask what diesel actually cost.',
    ],
    handoffLine: 'Starlax got out her phone.',
  },
  ending: {
    line: 'end of chapter six. the score counter holds 65535 now — and the clocks have until 2038.',
    next: 'back to the lab →',
    href: '/lab',
  },
  script: OVERFLOW_SCRIPT,
  toys: {
    initial: { cents: 999, pumpWrapped: false, byte: 250, byteWrapped: false, year: 0, wideYear: false, score: 0, bytes: 1 },
    gate: (toy, s) => {
      switch (toy) {
        // Each gate asks for the moment the box overflows, never for an answer.
        // Failing is impossible; only stalling. (CLAUDE.md: the story never quizzes.)
        case 'pump': return s.pumpWrapped ? null : 'push it past 9.99';
        case 'byte': return s.byteWrapped ? null : 'keep going past 255';
        case 'year': return (s.year as number) >= 3 ? null : 'keep turning the year';
        case 'score': return s.bytes === 2 ? null : 'give it another byte';
        default: return null;
      }
    },
    render: (toy, s, set) => {
      switch (toy) {
        case 'pump': return (
          <PumpToy
            cents={s.cents as number}
            wrapped={s.pumpWrapped as boolean}
            onChange={(cents, pumpWrapped) => set({ cents, pumpWrapped })}
          />
        );
        case 'byte': return (
          <ByteToy
            value={s.byte as number}
            wrapped={s.byteWrapped as boolean}
            onChange={(byte, byteWrapped) => set({ byte, byteWrapped })}
          />
        );
        case 'year': return (
          <YearToy
            at={s.year as number}
            wide={s.wideYear as boolean}
            onChange={(year, wideYear) => set({ year, wideYear })}
          />
        );
        case 'score': return (
          <ScoreToy
            score={s.score as number}
            bytes={s.bytes as number}
            onChange={(score, bytes) => set({ score, bytes })}
          />
        );
        default: return null;
      }
    },
  },
};
