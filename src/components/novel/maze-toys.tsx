// maze-toys.tsx — the toys for "The Maze Is Made of Numbers" (/lab/level256).
//
// ONE IDEA, told the way a kid already knows it: PAINT-BY-NUMBERS. The game
// keeps a sheet of numbers and a key of little pictures, and paints the maze
// from the sheet, over and over. On level 256 it scribbles over half the sheet
// — so the reader writes the numbers back, and Nova wins.
//
// Three toys, one per step, and each is the SAME maze so nobody has to ask
// "which maze is this?":
//   1. the break   — let Nova clear 255; half the maze turns to junk
//   2. the reveal  — flip "what you see" ↔ "what the game sees"
//   3. the fix     — tap junk to write dots (2s) back; then let her finish
//
// Everything a kid touches is a picture AND its number at once, so the link
// between them is seen, never explained.
//
// Thumb notes (CLAUDE.md): raw px are TAP sizes and stay px on purpose. The
// fix grid is the broken half only — 6 tiles across, ~50px each on a phone,
// so it clears the 44px floor without needing the grid exception.
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Push: React.FC<{ onClick: () => void; children: React.ReactNode; tone?: 'amber' | 'ghost'; label?: string; pressed?: boolean }> =
  ({ onClick, children, tone = 'amber', label, pressed }) => (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
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

// ── the sheet ───────────────────────────────────────────────────────────────
// 0 empty · 1 wall · 2 dot. The key is the whole lesson, so it is only three
// entries long.

const LEFT = [
  '######',
  '#.....',
  '#.##.#',
  '#.....',
  '#.#.##',
  '#.#...',
  '#...#.',
  '###.#.',
  '#.....',
  '######',
];
const COLS = 12, ROWS = 10, HALF = 6;
/** the maze as the game stores it: a sheet of numbers, mirrored left to right */
const SHEET: number[][] = LEFT.map((r) => {
  const half = [...r].map((ch) => (ch === '#' ? 1 : 2));
  return [...half, ...[...half].reverse()];
});
/** the nearly-cleared level 255: only these dots are left */
const LAST_DOTS = new Set(['3,4', '5,8', '8,10']);

// Deterministic junk, so the server and the phone draw the same screen
// (CLAUDE.md: no Math.random at render).
const mulberry32 = (a: number) => () => {
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
/** What level 256 left on the right half of the sheet: numbers not on the key. */
export const JUNK: number[] = (() => {
  const rnd = mulberry32(256);
  return Array.from({ length: ROWS * HALF }, () => 3 + Math.floor(rnd() * 253));
})();

// The key the game ACTUALLY paints from has a picture for every number, not
// just three — letters, fruit, bits of scenery. That is why the junk looks
// like letters and fruit: the game is still painting by numbers, faithfully,
// from the wrong numbers.
const FRUIT = ['🍒', '🍓', '🍊', '🍎', '🍈', '🔔', '🔑'];
const BITS = '▓▒░▚▞▙▟◆■▲●◢◣◤◥▌▐▀▄';
const INK = ['#fbbf24', '#f472b6', '#22d3ee', '#60a5fa', '#f5f5f4', '#a78bfa', '#f87171'];
type Pic = { kind: 'empty' | 'wall' | 'dot' | 'glyph'; ch?: string; c?: string };
const pic = (n: number): Pic => {
  if (n === 0) return { kind: 'empty' };
  if (n === 1) return { kind: 'wall' };
  if (n === 2) return { kind: 'dot' };
  if (n >= 65 && n <= 90) return { kind: 'glyph', ch: String.fromCharCode(n), c: INK[n % INK.length] };
  if (n >= 140 && n <= 160) return { kind: 'glyph', ch: FRUIT[n % FRUIT.length] };
  return { kind: 'glyph', ch: BITS[n % BITS.length], c: INK[n % INK.length] };
};

/** One square of the maze, drawn from its number — and, if asked, showing it. */
const Cell: React.FC<{ n: number; nova?: boolean; asNumber?: boolean; size: string }> = ({ n, nova, asNumber, size }) => {
  if (nova) return <div className="flex items-center justify-center" style={{ fontSize: size }}>🐱</div>;
  if (asNumber) {
    const onKey = n <= 2;
    return (
      <div className="flex items-center justify-center" style={{
        fontFamily: MONO, fontSize: `calc(${size} * ${n > 99 ? 0.62 : 0.8})`, lineHeight: 1,
        color: onKey ? (n === 1 ? '#93c5fd' : n === 2 ? '#fef3c7' : '#6b7280') : '#f87171',
        fontWeight: onKey ? 400 : 700,
      }}>{n}</div>
    );
  }
  const p = pic(n);
  if (p.kind === 'wall') return <div className="m-[0.5px] rounded-[2px] bg-blue-800" />;
  if (p.kind === 'dot') return (
    <div className="flex items-center justify-center">
      <span className="rounded-full bg-amber-100" style={{ width: `calc(${size} * 0.25)`, height: `calc(${size} * 0.25)` }} />
    </div>
  );
  if (p.kind === 'empty') return <div />;
  return <div className="flex items-center justify-center" style={{ fontFamily: PIXEL_FONT, fontSize: size, color: p.c, lineHeight: 1 }}>{p.ch}</div>;
};

/** The whole screen: the sheet for the current level, as pictures or as numbers. */
const Screen: React.FC<{ numbers: (r: number, c: number) => number; nova: string; asNumbers?: boolean; label: string }> =
  ({ numbers, nova, asNumbers, label }) => (
    <div
      className="grid w-full overflow-hidden rounded-md border border-blue-900 bg-black"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, aspectRatio: `${COLS} / ${ROWS}`, containerType: 'inline-size' }}
      role="img" aria-label={label}
    >
      {SHEET.flatMap((row, r) => row.map((_, c) => (
        <Cell key={`${r},${c}`} n={numbers(r, c)} nova={!asNumbers && nova === `${r},${c}`} asNumber={asNumbers} size="5.6cqw" />
      )))}
    </div>
  );

/** Level 256's sheet: the left half fresh, the right half as it stands now —
 *  scribbled over, or with whatever numbers the reader has written back. Every
 *  card draws this same sheet, so a 2 the reader writes is a 2 everywhere. */
const broken = (half: number[]) => (r: number, c: number) => (c < HALF ? SHEET[r][c] : half[r * HALF + (c - HALF)]);

const Readout: React.FC<{ level: number; red?: boolean }> = ({ level, red }) => (
  <div className="mt-2 flex items-baseline justify-between">
    <span className={red ? 'text-red-400' : 'text-amber-200'} style={{ fontFamily: PIXEL_FONT, fontSize: '1.5rem' }}>LEVEL {level}</span>
    <span className="text-[0.75rem] text-gray-500" style={{ fontFamily: MONO }}>counter {(level & 255).toString(2).padStart(8, '0')}</span>
  </div>
);

// ── 1. the break ────────────────────────────────────────────────────────────

export const BreakToy: React.FC<{ level: number; broke: boolean; half: number[]; onChange: (level: number, broke: boolean) => void }> =
  ({ level, broke, half, onChange }) => {
    const [tried, setTried] = useState(false);
    const showing = level > 255;
    return (
      <div>
        <Screen
          label={showing ? 'the maze, with its right half turned to junk' : 'the maze, nearly cleared'}
          nova={showing ? '8,2' : '8,9'}
          numbers={(r, c) => (showing ? broken(half)(r, c) : SHEET[r][c] === 2 ? (LAST_DOTS.has(`${r},${c}`) ? 2 : 0) : SHEET[r][c])}
        />
        <Readout level={level} red={showing} />
        <div className="mt-3 flex gap-2">
          {showing ? (
            // Not a dead control: a kid who tries deserves to be told why not.
            <Push onClick={() => setTried(true)} label="try to finish level 256">try to finish it</Push>
          ) : (
            <Push onClick={() => onChange(level + 1, broke || level + 1 > 255)} label="let nova clear the level">let her clear it</Push>
          )}
          <Push tone="ghost" onClick={() => { setTried(false); onChange(254, broke); }} label="start again at level 254">back to 254</Push>
        </div>
        {showing && tried && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center text-[0.8125rem] text-red-300">
            the dots on that side got scribbled over. she can never eat them all.
          </motion.p>
        )}
      </div>
    );
  };

// ── 2. the reveal ───────────────────────────────────────────────────────────
// One switch. The same screen, as the reader sees it and as the game sees it.

export const SheetToy: React.FC<{ game: boolean; half: number[]; onChange: (game: boolean) => void }> = ({ game, half, onChange }) => (
  <div>
    <Screen asNumbers={game} nova="8,2" numbers={broken(half)}
      label={game ? 'the maze as the game sees it: a sheet of numbers' : 'the maze as you see it'} />
    <div className="mt-3 flex gap-2" role="group" aria-label="how to look at the maze">
      <Push tone={game ? 'ghost' : 'amber'} pressed={!game} onClick={() => onChange(false)} label="what you see">what you see</Push>
      <Push tone={game ? 'amber' : 'ghost'} pressed={game} onClick={() => onChange(true)} label="what the game sees">what the game sees</Push>
    </div>
    {/* the key — three entries, and the junk's numbers are not on it */}
    <div className="mt-3 flex items-center justify-center gap-4 text-[0.8125rem] text-gray-400" style={{ fontFamily: MONO }}>
      <span><b className="text-gray-500">0</b> empty</span>
      <span><b className="text-blue-300">1</b> wall</span>
      <span><b className="text-amber-100">2</b> dot</span>
    </div>
    {game && (
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-center text-[0.75rem] text-red-300">
        red numbers are not on the key
      </motion.p>
    )}
  </div>
);

// ── 3. the fix, and the win ─────────────────────────────────────────────────

export const DOTS_NEEDED = 10;

export const FixToy: React.FC<{ half: number[]; won: boolean; onChange: (half: number[], won: boolean) => void }> =
  ({ half, won, onChange }) => {
    const dots = half.filter((n) => n === 2).length;
    const ready = dots >= DOTS_NEEDED;
    if (won) {
      // The prize: a brand-new level, painted from a clean sheet — and the
      // counter, one byte, has gone round to 1.
      return (
        <div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-center text-amber-300" style={{ fontFamily: PIXEL_FONT, fontSize: '1.5rem' }}>
            LEVEL 256 — CLEARED
          </motion.div>
          {/* The punchline goes ABOVE the maze: below it, on a phone, it was
              under the fold and the reader saw "cleared" without the joke. */}
          <div className="mb-2 -mt-1"><Readout level={1} /></div>
          <Screen label="a fresh maze: level 1" nova="8,2" numbers={(r, c) => SHEET[r][c]} />
        </div>
      );
    }
    return (
      <div>
        {/* Counter ABOVE the grid, so the number you are chasing stays on
            screen while your thumb is in the maze (CLAUDE.md rule 10). */}
        <div className="mb-2 flex min-h-[2.75rem] items-center justify-between gap-2">
          <span className="text-[0.875rem]" style={{ fontFamily: MONO, color: ready ? '#86efac' : '#e5e7eb' }}>
            dots {Math.min(dots, DOTS_NEEDED)} / {DOTS_NEEDED}
          </span>
          {ready && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1" style={{ maxWidth: '60%' }}>
              <Push onClick={() => onChange(half, true)} label="let nova finish level 256">let her finish ▸</Push>
            </motion.div>
          )}
        </div>
        <div
          className="grid w-full overflow-hidden rounded-md border border-blue-900 bg-black"
          style={{ gridTemplateColumns: `repeat(${HALF}, 1fr)`, containerType: 'inline-size' }}
        >
          {half.map((n, i) => {
            const r = Math.floor(i / HALF), c = i % HALF;
            const onKey = n <= 2;
            return (
              <button
                key={i}
                onClick={() => {
                  // junk → 2 (a dot: what she needs) → 1 → 0 → 2 …
                  const next = n > 2 ? 2 : n === 2 ? 1 : n === 1 ? 0 : 2;
                  const out = [...half]; out[i] = next;
                  onChange(out, false);
                }}
                aria-label={`row ${r + 1} square ${c + 1}, number ${n}`}
                className="relative touch-manipulation"
                style={{ minHeight: 44, aspectRatio: '5 / 4' }}
              >
                <div className="absolute inset-0 grid"><Cell n={n} size="11cqw" /></div>
                {/* the number, always visible: you are changing THIS, and the picture follows */}
                <span className="absolute left-0.5 top-0.5 rounded px-0.5" style={{ fontFamily: MONO, fontSize: '0.625rem', color: onKey ? '#9ca3af' : '#f87171', fontWeight: onKey ? 400 : 700, background: 'rgba(0,0,0,.78)' }}>
                  {n}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[0.75rem] text-gray-400">tap a red number to write a 2 — a dot</p>
      </div>
    );
  };

