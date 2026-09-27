// maze-toys.tsx — the cabinet for "The Maze Is Made of Numbers" (/lab/level256).
//
// A REAL, PLAYABLE little maze game, and the whole chapter happens inside it.
// The first telling showed the numbers only on a maze that was already broken,
// so the reader never saw a healthy maze as numbers, never played it, and could
// not tell why "left" and "right" mattered. Now:
//
//   play   — Starlax got hooked on CATVENTURE and cleared 254 levels in a
//            week; the reader plays the last one, 255 — and level 256 loads
//            with its right half turned to junk, because of what THEY did
//   look   — flip "what the game sees" and eat a dot: the good side is the
//            maze they just played, in 1s and 2s, and the 2 under the cat
//            turns into a 0. The junk side is numbers that are not on the key.
//   fix    — paint 2s over the junk, then eat them all; level 256 is beaten
//
// THE GAME IS NEVER HELD BACK FOR THE STORY. An earlier version would not let
// level 255 end until the story had shown the numbers — so a player who simply
// played on ate every dot and then stood in an empty maze with nothing
// happening, waiting on a button. The story follows the player now: the level
// ends when they finish it, and the chapter reacts.
//
// The game's state IS the number sheet — eating a dot literally writes a 0 —
// so the picture and the numbers can never disagree.
//
// One machine, several cards: every card draws the same live state, but only
// the newest one runs the clock and has controls. Older cards step aside to a
// one-line note, so there is never a second cat or a second clock.
//
// Thumb notes (CLAUDE.md): raw px are TAP sizes and stay px on purpose. The
// maze is 8 squares across, ~38px each on a phone; the D-pad buttons are 44px+.
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';
import type { ToyState } from '@/components/novel/chapter-def';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// ── the sheet ───────────────────────────────────────────────────────────────
// 0 nothing · 1 wall · 2 dot. Mirrored left to right, like the real maze.
const LEFT = ['####', '#...', '#.##', '#...', '##.#', '#...', '#.#.', '####'];
export const W = 8, H = 8, HALF = 4;
const FRESH: number[] = LEFT.flatMap((r) => {
  const half = [...r].map((ch) => (ch === '#' ? 1 : 2));
  return [...half, ...[...half].reverse()];
});
/** a level ends when this many dots have been eaten — the rule the counter shows */
export const DOTS = FRESH.filter((n) => n === 2).length;
/** how many of those are on the left half — all that survives level 256 */
export const LEFT_DOTS = FRESH.filter((n, i) => n === 2 && i % W < HALF).length;
const START = 5 * W + 1;

/** Level 255 — the last level of a week of playing — starts full, like any level. */
const SHEET_255 = [...FRESH];

// Deterministic junk (CLAUDE.md: no Math.random at render).
const mulberry32 = (a: number) => () => {
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
/** What level 256 writes over the right half: numbers that are not on the key. */
export const JUNK: number[] = (() => {
  const rnd = mulberry32(256);
  return Array.from({ length: H * HALF }, () => 3 + Math.floor(rnd() * 253));
})();
const SHEET_256 = FRESH.map((n, i) => {
  const c = i % W;
  return c < HALF ? n : JUNK[Math.floor(i / W) * HALF + (c - HALF)];
});

// The game has a picture for EVERY number, not just three — letters, fruit,
// scraps of scenery. That is why the junk looks like letters and fruit: the
// game is still painting by numbers, faithfully, from the wrong numbers.
const FRUIT = ['🍒', '🍓', '🍊', '🍎', '🍈', '🔔', '🔑'];
const BITS = '▓▒░▚▞▙▟◆■▲●◢◣◤◥▌▐▀▄';
const INK = ['#fbbf24', '#f472b6', '#22d3ee', '#60a5fa', '#f5f5f4', '#a78bfa', '#f87171'];

/** Squares the cat can walk into: nothing, or a dot. Walls and junk are solid. */
const open = (n: number) => n === 0 || n === 2;
const STEP: Record<number, [number, number]> = { 1: [-1, 0], 2: [0, 1], 3: [1, 0], 4: [0, -1] };
const move = (pos: number, d: number) => {
  const [dr, dc] = STEP[d] ?? [0, 0];
  const r = Math.floor(pos / W) + dr, c = (pos % W) + dc;
  return r < 0 || r >= H || c < 0 || c >= W ? -1 : r * W + c;
};

export const INITIAL: ToyState = {
  level: 255, sheet: [...SHEET_255], eaten: 0, pos: START, dir: 0, want: 0,
  numbers: false, peeked: false, won: false,
  // Every level starts on a READY screen, the way arcade games do; the
  // reader's first arrow press starts it.
  paused: true,
};

/** One tick of the game: turn if asked and able, step, eat, maybe end the level. */
const tick = (s: ToyState): ToyState | null => {
  if (s.paused) return null;
  const sheet = s.sheet as number[];
  let dir = s.dir as number;
  const want = s.want as number;
  const pos = s.pos as number;
  if (want) { const t = move(pos, want); if (t >= 0 && open(sheet[t])) dir = want; }
  const next = dir ? move(pos, dir) : -1;
  if (next < 0 || !open(sheet[next])) return dir || want ? { ...s, dir: 0 } : null;
  let out: ToyState = { ...s, pos: next, dir };
  if (sheet[next] === 2) {
    const sh = [...sheet]; sh[next] = 0;                 // eating a dot IS writing a 0
    out = { ...out, sheet: sh, eaten: (s.eaten as number) + 1, peeked: s.peeked || s.numbers };
  }
  return endLevel(out) ?? out;
};

/** The level ends after DOTS dots — and what comes next is the whole chapter. */
const endLevel = (s: ToyState): ToyState | null => {
  if ((s.eaten as number) < DOTS) return null;
  const level = s.level as number;
  if (level === 255) return { ...s, level: 256, sheet: [...SHEET_256], eaten: 0, pos: START, dir: 0, want: 0 };
  if (level === 256) return { ...s, level: 1, sheet: [...FRESH], eaten: 0, pos: START, dir: 0, want: 0, won: true };
  return { ...s, level: level + 1, sheet: [...FRESH], eaten: 0, pos: START, dir: 0, want: 0 };
};

// ── the hero ────────────────────────────────────────────────────────────────
// CATVENTURE's cat: orange, made of little squares — the same cat as the cover.
// Drawn as pixels rather than an emoji, so it looks like it lives in the game
// (and does not depend on a phone's emoji font).
const CAT = ['.#....#.', '.##..##.', '.######.', '.#.##.#.', '.######.', '..#..#..', '..####..'];
export const PixelCat: React.FC<{ size: string }> = ({ size }) => (
  <svg viewBox="0 0 8 7" width={size} height={size} style={{ display: 'block' }} aria-hidden>
    {CAT.flatMap((row, r) => [...row].map((ch, c) => (ch === '#' ? <rect key={`${r},${c}`} x={c} y={r} width={1.02} height={1.02} fill="#ff9933" /> : null)))}
  </svg>
);

// ── drawing a square ────────────────────────────────────────────────────────

const Square: React.FC<{ n: number; numbers: boolean; hero: boolean }> = ({ n, numbers, hero }) => {
  const cat = hero && (
    <span className="absolute inset-0 flex items-center justify-center"><PixelCat size="9cqw" /></span>
  );
  if (numbers) {
    const onKey = n <= 2;
    return (
      <div className="relative flex items-center justify-center" style={{
        outline: hero ? '2px solid #fbbf24' : 'none', outlineOffset: -2,
        fontFamily: MONO, lineHeight: 1, fontWeight: onKey ? 500 : 700,
        fontSize: n > 99 ? '4.2cqw' : '6cqw',
        color: onKey ? (n === 1 ? '#93c5fd' : n === 2 ? '#fef3c7' : '#6b7280') : '#f87171',
      }}>
        <span style={{ opacity: hero ? 0.9 : 1, transform: hero ? 'translate(-28%, -28%)' : undefined }}>{n}</span>
        {hero && <span className="absolute bottom-0.5 right-0.5"><PixelCat size="4.6cqw" /></span>}
      </div>
    );
  }
  if (n === 1) return <div className="relative m-[1px] rounded-[3px] bg-blue-800">{cat}</div>;
  if (n === 2) return (
    <div className="relative flex items-center justify-center">
      <span className="rounded-full bg-amber-100" style={{ width: '2.6cqw', height: '2.6cqw' }} />{cat}
    </div>
  );
  if (n === 0) return <div className="relative">{cat}</div>;
  const fruit = n >= 140 && n <= 160;
  return (
    <div className="relative flex items-center justify-center" style={{
      fontFamily: PIXEL_FONT, lineHeight: 1, fontSize: fruit ? '7cqw' : '9cqw', color: INK[n % INK.length],
    }}>
      {fruit ? FRUIT[n % FRUIT.length] : n >= 65 && n <= 90 ? String.fromCharCode(n) : BITS[n % BITS.length]}
    </div>
  );
};

const Pad: React.FC<{ onDir: (d: number) => void }> = ({ onDir }) => (
  <div className="mt-2 flex gap-2" role="group" aria-label="move the cat">
    {([[4, '◀', 'left'], [1, '▲', 'up'], [3, '▼', 'down'], [2, '▶', 'right']] as const).map(([d, glyph, name]) => (
      <button
        key={d}
        onPointerDown={(e) => { e.preventDefault(); onDir(d); }}
        onClick={() => onDir(d)}
        aria-label={`move ${name}`}
        className="flex-1 touch-manipulation select-none rounded-lg border border-amber-400/70 bg-amber-400/15 text-xl text-amber-200 active:bg-amber-400/35"
        style={{ minHeight: 48 }}
      >
        {glyph}
      </button>
    ))}
  </div>
);

// ── the cabinet ─────────────────────────────────────────────────────────────

export type Stage = 'play' | 'look' | 'fix';

export const Cabinet: React.FC<{
  stage: Stage; live: boolean; s: ToyState; set: (patch: ToyState) => void;
}> = ({ stage, live, s, set }) => {
  const canPaint = stage === 'fix' && s.level === 256;
  const sRef = useRef(s); sRef.current = s;

  // One clock, and only on the live card.
  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      const nextState = tick(sRef.current);
      if (nextState) set(nextState);
    }, 165);
    return () => window.clearInterval(id);
  }, [live, set]);

  const steer = useCallback((d: number) => set({ want: d, paused: false }), [set]);

  // Arrow keys are an accelerator for a keyboard, never the only way (CLAUDE.md).
  useEffect(() => {
    if (!live) return;
    const key: Record<string, number> = { ArrowUp: 1, ArrowRight: 2, ArrowDown: 3, ArrowLeft: 4 };
    const onKey = (e: KeyboardEvent) => { const d = key[e.key]; if (d) { e.preventDefault(); steer(d); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [live, steer]);

  // Painting 2s over the junk: a tap paints one square, a drag paints a stroke.
  // Same notes as Chapter One's grid: decide the value on the square you START
  // on, and swallow the click that trails a pointer press.
  const painting = useRef<number | null>(null);
  const handled = useRef(false);
  // A finger's pointer stays pinned to the square it started on, so "entered
  // the next square" never fires on a phone. Ask what is under the finger.
  const squareUnder = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const i = el?.closest<HTMLElement>('[data-square]')?.dataset.square;
    return i === undefined ? null : +i;
  };
  const paintAt = (i: number, value: number) => {
    const sheet = sRef.current.sheet as number[];
    if (i % W < HALF || i === sRef.current.pos || sheet[i] === value) return;
    const sh = [...sheet]; sh[i] = value; set({ sheet: sh });
  };

  if (!live) {
    return (
      <p className="py-1 text-center text-[0.8125rem] text-gray-400">
        🕹 the cabinet is still on — it carries on further down ↓
      </p>
    );
  }

  const sheet = s.sheet as number[];
  const level = s.level as number;
  const numbers = s.numbers as boolean;
  const eaten = s.eaten as number;
  const reachable = eaten + sheet.filter((n) => n === 2).length;
  const showSwitch = stage !== 'play';

  return (
    <div className="select-none">
      <div className="mb-2 flex min-h-[2.75rem] items-center justify-between gap-2">
        <span className={level === 256 ? 'text-red-400' : 'text-amber-200'} style={{ fontFamily: PIXEL_FONT, fontSize: '1.5rem' }}>
          LEVEL {level}
        </span>
        <span className="text-[0.8125rem]" style={{ fontFamily: MONO, color: reachable < DOTS && level === 256 ? '#fca5a5' : '#e5e7eb' }}>
          dots {eaten} / {DOTS}
        </span>
      </div>

      {s.won && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="mb-2 text-center text-amber-300" style={{ fontFamily: PIXEL_FONT, fontSize: '1.4rem' }}>
          LEVEL 256 — CLEARED
        </motion.div>
      )}

      <div
        className="relative grid w-full overflow-hidden rounded-md border border-blue-900 bg-black"
        style={{ gridTemplateColumns: `repeat(${W}, 1fr)`, aspectRatio: `${W} / ${H}`, containerType: 'inline-size', touchAction: canPaint ? 'pan-y' : undefined }}
        role="img"
        aria-label={numbers ? 'the maze as the game sees it: a sheet of numbers' : 'the maze'}
        onPointerDown={canPaint ? (e) => {
          const i = squareUnder(e.clientX, e.clientY);
          if (i === null || i % W < HALF) return;
          handled.current = true;
          painting.current = sheet[i] === 2 ? 0 : 2;       // decided by the square you start on
          paintAt(i, painting.current);
        } : undefined}
        onPointerMove={canPaint ? (e) => {
          if (painting.current === null) return;
          const i = squareUnder(e.clientX, e.clientY);
          if (i !== null) paintAt(i, painting.current);
        } : undefined}
        onPointerUp={() => { painting.current = null; }}
        onPointerCancel={() => { painting.current = null; }}
        onPointerLeave={() => { painting.current = null; }}
      >
        {s.paused && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/55">
            <span className="text-amber-200" style={{ fontFamily: PIXEL_FONT, fontSize: '12cqw', letterSpacing: '0.08em' }}>READY?</span>
            <span className="text-[0.75rem] text-gray-300">press an arrow</span>
          </div>
        )}
        {sheet.map((n, i) => (canPaint && i % W >= HALF ? (
          // In paint mode the broken half is real buttons, so a keyboard or a
          // screen reader can paint too; the drag is an accelerator.
          <button
            key={i}
            data-square={i}
            className="relative grid touch-manipulation"
            aria-label={`square ${i}, number ${n}${n === 2 ? ', a dot' : n > 2 ? ', junk' : ''}`}
            onClick={() => {
              if (handled.current) { handled.current = false; return; }
              paintAt(i, n === 2 ? 0 : 2);
            }}
          >
            <Square n={n} numbers={numbers} hero={i === s.pos} />
          </button>
        ) : (
          <div key={i} className="relative grid" data-square={i}>
            <Square n={n} numbers={numbers} hero={i === s.pos} />
          </div>
        )))}
      </div>

      {showSwitch && (
        <div className="mt-2 flex gap-2" role="group" aria-label="how to look at the maze">
          {([[false, 'what you see'], [true, 'what the game sees']] as const).map(([v, name]) => (
            <button
              key={name}
              onClick={() => set({ numbers: v })}
              aria-pressed={numbers === v}
              aria-label={name}
              className="flex-1 touch-manipulation rounded-lg border px-2 text-[0.875rem] font-semibold"
              style={{
                minHeight: 44,
                borderColor: numbers === v ? '#fbbf24' : '#3f3a56',
                background: numbers === v ? 'rgba(251,191,36,.16)' : '#15122a',
                color: numbers === v ? '#fde68a' : '#a5a1bd',
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <Pad onDir={steer} />

      <p className="mt-2 min-h-[2.5rem] text-center text-[0.75rem] text-gray-400">
        {canPaint
          ? reachable < DOTS
            ? `paint dots over the junk — tap or drag. she needs ${DOTS - reachable} more to reach ${DOTS}.`
            : 'enough dots. now eat them all.'
          : numbers
            ? <span><b className="text-gray-500">0</b> nothing · <b className="text-blue-300">1</b> wall · <b className="text-amber-100">2</b> dot{level === 256 ? <span className="text-red-300"> · red: not on the key</span> : null}</span>
            : level === 256 ? 'the junk is solid — the cat cannot get to that side.' : 'steer the cat into the dots.'}
      </p>
    </div>
  );
};
