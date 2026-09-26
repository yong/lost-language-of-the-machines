// Chapter One as data. The prose, the script and the four toys were already
// three separate files; this is the fourth thing that was only ever implicit —
// how the toys gate the story and what the reader's save looks like.
import { SCRIPT } from '@/components/novel/script';
import { OPENING } from '@/components/novel/opening';
import { SwitchToy, RowToy, GridToy, HexToy } from '@/components/novel/toys';
import type { ChapterDef, ToyState } from '@/components/novel/chapter-def';

const lit = (rows: number[]) => rows.reduce((n, r) => n + r.toString(2).replace(/0/g, '').length, 0);

export const CHAPTER_ONE: ChapterDef = {
  // The key Chapter One has always used. Changing it would orphan the place
  // and the drawing of every reader who has already been here.
  storageKey: 'gameforge.novel.v1',
  exitHref: '/lab',
  opening: OPENING,
  ending: {
    line: 'end of chapter one. she is going to need twenty four switches.',
    next: 'chapter two →',
    href: '/lab/proto-rom',
  },
  script: SCRIPT,
  toys: {
    initial: { switchOn: false, row: 0, rows: Array(8).fill(0), cut: false },
    gate: (toy, s) => {
      switch (toy) {
        case 'switch': return s.switchOn ? null : 'flip the switch';
        case 'row': return s.row !== 0 ? null : 'flip some of them';
        case 'grid': return lit(s.rows as number[]) >= 8 ? null : 'draw something first';
        case 'hex': return s.cut ? null : 'cut it in half';
        default: return null;
      }
    },
    render: (toy, s, set) => {
      const rows = s.rows as number[];
      switch (toy) {
        case 'switch': return <SwitchToy on={s.switchOn as boolean} onChange={(v) => set({ switchOn: v })} />;
        case 'row': return <RowToy value={s.row as number} onChange={(v) => set({ row: v })} />;
        case 'grid': return <GridToy rows={rows} onChange={(v) => set({ rows: v })} />;
        case 'hex': return (
          <HexToy
            value={rows.find((r) => r !== 0) ?? (s.row as number) ?? 0b00111100}
            cut={s.cut as boolean}
            onCut={() => set({ cut: true })}
          />
        );
        default: return null;
      }
    },
  },
};

export type { ToyState };
