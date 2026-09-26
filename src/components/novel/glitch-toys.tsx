// glitch-toys.tsx — the toys for "A Glitch Is a Window" (/lab/level256).
//
// The Pac-Man kill screen, told true: the level lives in one byte, on level 256
// it runs out of room, and the game draws its own memory across half the maze.
// This chapter is about the second half of that sentence. The garbage is not
// noise — it is the cartridge's insides, shown by accident — so the reader
// searches it for a value they can see (the cat's orange), changes it, and
// the cat changes. Then they try the same trick on the level and hit the wall:
// a number can be changed; what the game DOES with it cannot, not from here.
//
// Thumb notes (CLAUDE.md): raw px below are TAP sizes and stay px on purpose.
// The zoomed memory grid is 8 tiles wide — about 41px each on a 390px phone —
// because a grid must stay a grid (the same exception as Chapter One's 8×8).
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const ORANGE = '#fb923c';

const Push: React.FC<{ onClick: () => void; children: React.ReactNode; tone?: 'amber' | 'ghost'; label?: string }> =
  ({ onClick, children, tone = 'amber', label }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex-1 touch-manipulation rounded-lg border px-3 text-[0.9375rem] font-semibold transition-colors active:brightness-125"
      style={{
        minHeight: 44,
        borderColor: tone === 'amber' ? '#fbbf24' : '#3f3a56',
        background: tone === 'amber' ? 'rgba(251,191,36,.16)' : '#15122a',
        color: tone === 'amber' ? '#fde68a' : '#a5a1bd',
      }}
    >
      {children}
    </button>
  );

// ── the maze and the memory ─────────────────────────────────────────────────

const MAZE_LEFT = [
  '########',
  '#.......',
  '#.##.##.',
  '#.......',
  '#.##.#..',
  '#....#..',
  '#.##.##.',
  '#.......',
  '#.##....',
  '########',
];
const MAZE = MAZE_LEFT.map((r) => r + r.split('').reverse().join(''));
/** a level nearly cleared: the last few dots Nova has not eaten yet */
const LAST_DOTS = new Set(['3,5', '5,12', '7,14']);

// Deterministic, so the server and the phone draw the same memory (CLAUDE.md:
// no Math.random at render). mulberry32 — small, and exact in 32-bit ints.
const mulberry32 = (a: number) => () => {
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
// Filler is symbols ONLY. With letters and digits in the noise, stray 3s and 5s
// buried the planted values — and finding them is the whole chapter.
const GLYPHS = '▓▒░█▚▞▙▟◆■▲●◢◣◤◥▌▐▀▄#%&@=+?$';
const JUNK = ['#fbbf24', '#f472b6', '#22d3ee', '#60a5fa', '#f5f5f4', '#a78bfa', '#f87171'];

type Tile = { ch: string; c: string; what?: string };
/** The right half of level 256: the cartridge's memory, drawn as if it were maze. */
export const MEMORY: Tile[][] = (() => {
  const rnd = mulberry32(256);
  const g: Tile[][] = Array.from({ length: 10 }, () =>
    Array.from({ length: 8 }, () => ({ ch: GLYPHS[Math.floor(rnd() * GLYPHS.length)], c: JUNK[Math.floor(rnd() * JUNK.length)] })));
  const put = (r: number, c0: number, s: string, c: string, what: string) =>
    [...s].forEach((ch, i) => { if (c0 + i < 8) g[r][c0 + i] = { ch, c, what }; });
  put(1, 0, 'FF 99 33', ORANGE, 'cat');          // the cat's orange
  put(3, 2, 'CATVENTURE', '#fde68a', 'title');   // runs off the edge: CATVEN
  put(5, 1, '65535', '#22d3ee', 'score');        // the high score's ceiling
  put(7, 0, '11111111', '#fbbf24', 'counter');   // the level byte, just before it ran out
  return g;
})();

const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');

/** The memory as it stands now. Row 1 IS the cat's colour, so once the reader
 *  turns her green it has to read 33 99 33 everywhere the memory is drawn —
 *  the picture and the numbers are the same thing, and a screen that still
 *  said FF 99 33 after she went green would be telling them otherwise. */
export const memoryFor = (rgb: number[]): Tile[][] => {
  const row = rgb.map(hex).join(' ');
  // drawn IN her colour — unless she is so dark the digits would vanish on black
  const ink = Math.max(...rgb) < 0x66 ? '#9ca3af' : `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  return MEMORY.map((r, i) => (i !== 1 ? r : r.map((t, c) => ({ ...t, ch: row[c] ?? ' ', c: ink }))));
};

// ── 1. level 255 → 256 ──────────────────────────────────────────────────────

export const LevelToy: React.FC<{ level: number; killed: boolean; rgb: number[]; onChange: (level: number, killed: boolean) => void }> =
  ({ level, killed, rgb, onChange }) => {
    const [tried, setTried] = useState(false);
    const memory = memoryFor(rgb);
    const showing = level > 255;
    const nova = showing ? '7,2' : '7,13';
    return (
      <div>
        <div
          className="grid w-full overflow-hidden rounded-md border border-blue-900 bg-black"
          style={{ gridTemplateColumns: 'repeat(16, 1fr)', aspectRatio: '16 / 10', containerType: 'inline-size' }}
          aria-label={showing ? 'the maze, with its right half full of garbage' : 'the maze, nearly cleared'}
          role="img"
        >
          {MAZE.flatMap((row, r) => [...row].map((cell, c) => {
            const key = `${r},${c}`;
            if (key === nova) return <div key={key} className="flex items-center justify-center" style={{ fontSize: '4.4cqw' }}>🐱</div>;
            if (showing && c >= 8) {
              const j = memory[r][c - 8];
              return (
                <div key={key} className="flex items-center justify-center" style={{ fontFamily: PIXEL_FONT, fontSize: '4.6cqw', color: j.c, lineHeight: 1 }}>
                  {j.ch === ' ' ? '' : j.ch}
                </div>
              );
            }
            if (cell === '#') return <div key={key} className="m-[0.5px] rounded-[2px] bg-blue-800" />;
            const dot = showing ? c < 8 : LAST_DOTS.has(key);
            return (
              <div key={key} className="flex items-center justify-center">
                {dot && <span className="rounded-full bg-amber-100" style={{ width: '1.1cqw', height: '1.1cqw' }} />}
              </div>
            );
          }))}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className={showing ? 'text-red-400' : 'text-amber-200'} style={{ fontFamily: PIXEL_FONT, fontSize: '1.5rem' }}>
            LEVEL {level}
          </span>
          <span className="text-[0.75rem] text-gray-500" style={{ fontFamily: MONO }}>
            counter {(level & 255).toString(2).padStart(8, '0')}
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          {showing ? (
            // Not a dead control: this is the level nobody has ever finished,
            // and a kid who tries deserves to be told so.
            <Push onClick={() => setTried(true)} label="try to clear level 256">try to clear it</Push>
          ) : (
            <Push onClick={() => onChange(level + 1, killed || level + 1 > 255)} label="let nova clear the level">let her clear it</Push>
          )}
          <Push tone="ghost" onClick={() => { setTried(false); onChange(254, killed); }} label="start again at level 254">back to 254</Push>
        </div>
        {showing && tried && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center text-[0.8125rem] text-red-300">
            not enough dots on the good half. nobody ever has.
          </motion.p>
        )}
      </div>
    );
  };

// ── the zoomed memory: the right half, big enough for a thumb ───────────────

const MemoryGrid: React.FC<{
  tile: (r: number, c: number) => Tile;
  onTap: (r: number, c: number) => void;
  lit?: (r: number, c: number) => boolean;
  /** tiles the reader has changed — marked, or the tap looks like it did nothing */
  touched?: (r: number, c: number) => boolean;
  label: string;
}> = ({ tile, onTap, lit, touched, label }) => (
  <div
    className="grid w-full overflow-hidden rounded-md border border-blue-900 bg-black"
    style={{ gridTemplateColumns: 'repeat(8, 1fr)', aspectRatio: '8 / 10', containerType: 'inline-size' }}
  >
    {Array.from({ length: 10 }).flatMap((_, r) => Array.from({ length: 8 }).map((__, c) => {
      const t = tile(r, c);
      const on = lit?.(r, c);
      const mine = touched?.(r, c);
      return (
        <button
          key={`${r},${c}`}
          onClick={() => onTap(r, c)}
          aria-label={`${label} row ${r + 1} column ${c + 1}`}
          className="flex touch-manipulation items-center justify-center"
          style={{
            fontFamily: PIXEL_FONT, fontSize: '8.5cqw', lineHeight: 1, color: t.c,
            outline: on ? `2px solid ${ORANGE}` : mine ? '2px dashed #e5e7eb' : 'none', outlineOffset: -2,
            background: on ? 'rgba(251,146,60,.16)' : mine ? 'rgba(229,231,235,.12)' : 'transparent',
          }}
        >
          {t.ch === ' ' ? '' : t.ch}
        </button>
      );
    }))}
  </div>
);

// ── 2. find the cat ─────────────────────────────────────────────────────────
// Search for a value you can see. The cat is orange; somewhere in her memory is
// the number that makes her orange. It is how Game Genie codes were found.

const SAID: Record<string, string> = {
  title: 'that is the title — letters, not a colour. close, though.',
  score: 'that is a score. big number, but not a colour.',
  counter: 'that is a byte with every switch on. not orange.',
};

export const FindToy: React.FC<{ found: boolean; rgb: number[]; onFound: () => void }> = ({ found, rgb, onFound }) => {
  const [said, setSaid] = useState<string | null>(null);
  const memory = memoryFor(rgb);
  const orange = rgb[0] === 0xff && rgb[1] === 0x99 && rgb[2] === 0x33;
  return (
    <div>
      <MemoryGrid
        label="memory"
        tile={(r, c) => memory[r][c]}
        lit={(r, c) => found && memory[r][c].what === 'cat' && memory[r][c].ch !== ' '}
        onTap={(r, c) => {
          const t = memory[r][c];
          if (t.what === 'cat') { onFound(); setSaid(null); return; }
          setSaid(t.what ? SAID[t.what] : `that is a ${t.ch}. just noise.`);
        }}
      />
      <p className="mt-2 min-h-[2.5rem] text-center text-[0.8125rem]" style={{ color: found ? ORANGE : '#a5a1bd' }}>
        {found
          ? `${rgb.map(hex).join(' ')} — that is her ${orange ? 'orange' : 'colour'}.`
          : said ?? 'tap the memory. the cat is orange — find her colour.'}
      </p>
    </div>
  );
};

// ── 3. make her green ───────────────────────────────────────────────────────
// Three numbers: how much red, how much green, how much blue. Change one and
// the cat changes. The memory row changes with her — the two are the same thing.

const CAT = [
  '.#....#.',
  '.##..##.',
  '.######.',
  '.#.##.#.',
  '.######.',
  '..#..#..',
  '..####..',
  '........',
];
const STEPS = [0xff, 0x99, 0x33, 0x00];

export const PaintToy: React.FC<{ rgb: number[]; onChange: (rgb: number[]) => void }> = ({ rgb, onChange }) => {
  const colour = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  const next = (i: number) => {
    const at = STEPS.indexOf(rgb[i]);
    const out = [...rgb]; out[i] = STEPS[(at + 1) % STEPS.length];
    onChange(out);
  };
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="grid w-[40%] shrink-0 gap-px rounded bg-black p-1" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }} role="img" aria-label="the cat">
          {CAT.flatMap((row, r) => [...row].map((p, c) => (
            <div key={`${r},${c}`} className="aspect-square" style={{ background: p === '#' ? colour : 'transparent' }} />
          )))}
        </div>
        <div className="flex-1">
          <div className="text-[0.625rem] uppercase tracking-widest text-gray-500">in memory</div>
          <div className="text-[1.375rem]" style={{ fontFamily: PIXEL_FONT, color: colour }}>
            {rgb.map(hex).join(' ')}
          </div>
          <div className="mt-1 text-[0.6875rem] text-gray-500">red · green · blue</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {['red', 'green', 'blue'].map((name, i) => (
          <Push key={name} tone="ghost" onClick={() => next(i)} label={`change the ${name} number`}>
            {/* the name ON the button: a row of three bare numbers made the
                kid map position to colour from a caption somewhere else */}
            <span className="block" style={{ fontFamily: MONO }}>{hex(rgb[i])}</span>
            <span className="block text-[0.625rem] font-normal uppercase tracking-wider"
              style={{ color: ['#fca5a5', '#86efac', '#93c5fd'][i] }}>{name}</span>
          </Push>
        ))}
      </div>
    </div>
  );
};

// ── 4. the wall ─────────────────────────────────────────────────────────────
// The same trick, on the level. It does not work, and the chapter is about why:
// you changed what a number IS. What the game DOES with it lives in the program.

export const WallToy: React.FC<{ pokes: number; tries: number; rgb: number[]; onChange: (pokes: number, tries: number) => void }> =
  ({ pokes, tries, rgb, onChange }) => {
    const [changed, setChanged] = useState<Record<string, number>>({});
    const memory = memoryFor(rgb);
    const tile = (r: number, c: number): Tile => {
      const n = changed[`${r},${c}`];
      if (n === undefined) return memory[r][c];
      return { ch: GLYPHS[(r * 7 + c * 3 + n * 5) % GLYPHS.length], c: JUNK[(r + c + n) % JUNK.length] };
    };
    const verdict =
      tries === 0 ? 'tap the memory to change a number, then try to clear the level.'
      : pokes === 0 ? 'nothing changed yet — tap the memory first.'
      : tries === 1 ? 'not enough dots on the good half.'
      : 'still not. it is a different kind of garbage now — the game does the same thing with it.';
    return (
      <div>
        <MemoryGrid
          label="change"
          tile={tile}
          touched={(r, c) => changed[`${r},${c}`] !== undefined}
          onTap={(r, c) => {
            setChanged((m) => ({ ...m, [`${r},${c}`]: (m[`${r},${c}`] ?? 0) + 1 }));
            onChange(pokes + 1, tries);
          }}
        />
        <div className="mt-3 flex gap-2">
          <Push onClick={() => onChange(pokes, tries + 1)} label="try to clear the changed level 256">try to clear it</Push>
        </div>
        <p className="mt-2 min-h-[2.5rem] text-center text-[0.8125rem]" style={{ color: tries > 0 && pokes > 0 ? '#fca5a5' : '#a5a1bd' }}>
          {verdict}
        </p>
      </div>
    );
  };
