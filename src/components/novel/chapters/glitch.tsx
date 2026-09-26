// "A Glitch Is a Window" — a new chapter, at /lab/level256.
//
// Its own chapter, not an ending bolted onto another one: the overflow chapter
// was approved as it stood, and the first attempt at this scene was a coda on
// its last page, which both crowded a finished chapter and hid the scene 110
// messages deep. Here it is the whole point.
//
// GAME PIECE RESTORED: the cat's colour. The reader finds FF 99 33 in the
// leaked memory and changes it — the Act 1 move from CLAUDE.md, "find the
// orange, make it green", arriving through a glitch rather than a hex editor.
// And it ends on the wall the book is built on: values, not behaviour.
import { LevelToy, FindToy, PaintToy, WallToy } from '@/components/novel/glitch-toys';
import { GLITCH_SCRIPT } from '@/components/novel/chapters/glitch-script';
import type { ChapterDef } from '@/components/novel/chapter-def';

const green = (rgb: number[]) => rgb[1] > rgb[0] && rgb[1] > rgb[2];

export const CHAPTER_GLITCH: ChapterDef = {
  storageKey: 'gameforge.level256.v1',
  exitHref: '/lab',
  opening: {
    image: '/level256/cover.svg',
    // Where the chapter number goes. It has not been given one yet, and this
    // is the only number that matters here anyway.
    eyebrow: 'Level 256',
    title: 'A Glitch Is a Window',
    paragraphs: [
      'It was past midnight, and the only light in the museum basement was the cabinet. Nova had found it three nights ago. She did not know what a level was, but the dots made a small noise when she stepped on them, and she had been stepping on them ever since.',
      'The counter in the corner of the screen said 255.',
    ],
    handoffLine: 'Starlax got out her phone.',
  },
  ending: {
    line: 'end of level 256. you can change what a number is. changing what the game does takes the language.',
    next: 'back to the lab →',
    href: '/lab',
  },
  script: GLITCH_SCRIPT,
  toys: {
    initial: { level: 255, killed: false, found: false, rgb: [0xff, 0x99, 0x33], pokes: 0, tries: 0 },
    gate: (toy, s) => {
      switch (toy) {
        // Every gate asks for a moment, never an answer (CLAUDE.md: the story
        // never quizzes). The wall's gate asks you to FAIL — that is the lesson.
        case 'level': return s.killed ? null : 'let her clear level 255';
        case 'find': return s.found ? null : 'find the cat’s orange';
        case 'paint': return green(s.rgb as number[]) ? null : 'make her green';
        case 'wall': return (s.pokes as number) > 0 && (s.tries as number) > 0 ? null : 'change a number, then try to clear it';
        default: return null;
      }
    },
    render: (toy, s, set) => {
      switch (toy) {
        case 'level': return (
          <LevelToy level={s.level as number} killed={s.killed as boolean} rgb={s.rgb as number[]} onChange={(level, killed) => set({ level, killed })} />
        );
        case 'find': return <FindToy found={s.found as boolean} rgb={s.rgb as number[]} onFound={() => set({ found: true })} />;
        case 'paint': return <PaintToy rgb={s.rgb as number[]} onChange={(rgb) => set({ rgb })} />;
        case 'wall': return (
          <WallToy pokes={s.pokes as number} tries={s.tries as number} rgb={s.rgb as number[]} onChange={(pokes, tries) => set({ pokes, tries })} />
        );
        default: return null;
      }
    },
    played: {
      level: { level: 256, killed: true },
      find: { found: true },
      paint: { rgb: [0x33, 0x99, 0x33] },
      wall: { pokes: 1, tries: 2 },
    },
  },
};
