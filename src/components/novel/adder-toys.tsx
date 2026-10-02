// adder-toys.tsx — the toys for "Two Doors Can Add" (/lab/adder).
//
// One idea: a machine cannot count, but doors can add. Three steps, each
// handing the next one its reason to exist:
//
//   1. the AND door — opens only if BOTH chutes have a marble
//   2. the XOR door — opens for ONE marble, shuts for two
//   3. the adder    — put the two side by side and they are one column of a
//                     sum: XOR writes the digit, AND carries the one. Line up
//                     four columns and a carry knocks into the next like a
//                     domino: 0111 + 1 is a chain reaction.
//
// The truth table is never shown as a lesson. Each door keeps a little row of
// the four ways in (○○ ○● ●○ ●●) and fills one in each time the reader tries
// it, so the table is something they MADE.
//
// Thumb notes: tap floors stay px (44+), all text is rem or cqw.
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';
import { Push, BeckonStyle } from '@/components/novel/push';

const AMBER = '#fbbf24';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// ── a marble ────────────────────────────────────────────────────────────────

const Marble: React.FC<{ size?: string; dim?: boolean }> = ({ size = '9cqw', dim }) => (
  <span
    className="inline-block rounded-full"
    style={{
      width: size, height: size,
      background: 'radial-gradient(circle at 35% 30%, #fff7d6, #fbbf24 45%, #b45309)',
      boxShadow: dim ? 'none' : '0 0 10px rgba(251,191,36,.55)',
      opacity: dim ? 0.35 : 1,
    }}
  />
);

const Hole: React.FC<{ size?: string }> = ({ size = '9cqw' }) => (
  <span className="inline-block rounded-full border-2 border-dashed border-gray-600" style={{ width: size, height: size }} />
);

// ── 1 & 2. a door with two chutes ───────────────────────────────────────────

export type DoorKind = 'and' | 'xor';
export const doorOpens = (kind: DoorKind, a: boolean, b: boolean) => (kind === 'and' ? a && b : a !== b);
/** which of the four ways in (○○ ○● ●○ ●●) have been tried — bit (a*2+b) */
export const tried = (seen: number, a: boolean, b: boolean) => (seen >> (Number(a) * 2 + Number(b))) & 1;

export const DoorToy: React.FC<{
  kind: DoorKind; a: boolean; b: boolean; seen: number; done: boolean;
  onChange: (a: boolean, b: boolean, seen: number) => void;
}> = ({ kind, a, b, seen, done, onChange }) => {
  const open = doorOpens(kind, a, b);
  const flip = (na: boolean, nb: boolean) => onChange(na, nb, seen | (1 << (Number(na) * 2 + Number(nb))));
  const name = kind === 'and' ? 'AND' : 'XOR';

  // The chute that should glow: for AND, any empty one until both have been
  // filled; for XOR, an empty one (first try one marble, then both).
  // Only one thing glows at a time: the first empty chute.
  const glow: 'a' | 'b' | null = done ? null : !a ? 'a' : !b ? 'b' : null;
  const chute = (side: 'a' | 'b') => {
    const full = side === 'a' ? a : b;
    return (
      <button
        onClick={() => (side === 'a' ? flip(!a, b) : flip(a, !b))}
        aria-label={`${full ? 'take the marble out of' : 'drop a marble in'} the ${side === 'a' ? 'left' : 'right'} chute`}
        className={`flex flex-1 touch-manipulation flex-col items-center justify-center gap-1 rounded-xl border bg-[#100e1c] ${glow === side ? 'beckon' : ''}`}
        style={{ minHeight: 64, borderColor: full ? AMBER : '#3f3a56' }}
      >
        {full ? <Marble /> : <Hole />}
        <span className="text-[0.625rem] uppercase tracking-widest text-gray-500">{full ? 'tap to take out' : 'tap to drop'}</span>
      </button>
    );
  };

  return (
    <div style={{ containerType: 'inline-size' }}>
      {!done && <BeckonStyle />}
      <div className="flex gap-3">{chute('a')}{chute('b')}</div>

      {/* the funnel into the door */}
      <div className="relative mx-auto" style={{ height: '7cqw', width: '60%' }}>
        <div className="absolute left-0 top-0 h-full w-1/2 border-r-2 border-gray-700" style={{ transform: 'skewX(-35deg)', transformOrigin: 'bottom' }} />
        <div className="absolute right-0 top-0 h-full w-1/2 border-l-2 border-gray-700" style={{ transform: 'skewX(35deg)', transformOrigin: 'bottom' }} />
      </div>

      {/* the door */}
      <div className="mx-auto flex flex-col items-center rounded-lg border border-gray-600 bg-[#0b0a14] px-4 py-2" style={{ width: '46%' }}>
        <span style={{ fontFamily: PIXEL_FONT, fontSize: '8cqw', color: '#e5e7eb', lineHeight: 1 }}>{name}</span>
        <div className="mt-1 flex h-3 w-full items-center justify-center">
          <motion.div
            className="h-2 rounded"
            animate={{ width: open ? '0%' : '100%', backgroundColor: open ? '#37f08a' : '#f87171' }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          />
        </div>
        <span className="mt-1 text-[0.6875rem]" style={{ color: open ? '#37f08a' : '#f87171' }}>{open ? 'open' : 'shut'}</span>
      </div>

      {/* what comes out */}
      <div className="flex items-center justify-center" style={{ height: '16cqw' }}>
        {open ? (
          <motion.span key={`${a}${b}`} initial={{ y: '-8cqw', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }} className="flex items-center gap-2">
            <Marble size="11cqw" />
            {kind === 'and' && <span style={{ fontSize: '8cqw' }}>🔔</span>}
          </motion.span>
        ) : (
          <span className="text-[0.75rem] text-gray-500">{a || b ? 'the marble is stuck at the door' : 'nothing in, nothing out'}</span>
        )}
      </div>

      {/* the four ways in, filled in as they are tried — a truth table they made */}
      <div className="mt-1 grid grid-cols-4 gap-1.5">
        {[[false, false], [false, true], [true, false], [true, true]].map(([x, y]) => {
          const t = tried(seen, x, y);
          const out = doorOpens(kind, x, y);
          return (
            <div key={`${x}${y}`} className="rounded-md border border-gray-700/70 py-1 text-center" style={{ opacity: t ? 1 : 0.45 }}>
              <div className="text-[0.75rem] text-gray-300" style={{ fontFamily: MONO }}>{x ? '●' : '○'}{y ? '●' : '○'}</div>
              <div className="text-[0.6875rem]" style={{ fontFamily: MONO, color: t ? (out ? '#37f08a' : '#f87171') : '#6b7280' }}>
                {t ? (out ? '→ ●' : '→ ○') : '?'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── 3. the adder ────────────────────────────────────────────────────────────
// Four columns, worth 8 4 2 1. Each column is one XOR door and one AND door.
// Adding one drops a marble on the 1s column; if a marble is already there,
// XOR shuts (the digit becomes 0) and AND opens (a carry rolls into the next
// column) — and again, and again: the chain reaction.

export const COLS = 4;
const bits = (v: number) => Array.from({ length: COLS }, (_, i) => (v >> (COLS - 1 - i)) & 1);
const value = (d: number[]) => d.reduce((n, b) => n * 2 + b, 0);

/** One step of a carry rippling through: the digits, and where the carry
 *  marble is (a column index, -1 once it has fallen off the end, or null when
 *  it has landed). */
interface Frame {
  d: number[]; carry: number | null;
  /** the column whose two doors just decided, and what each said */
  did?: { col: number; xor: number; and: number };
  /** the marble on its way in is the fish's +1 until a column passes it on */
  first?: boolean;
}

export const addOne = (v: number): Frame[] => {
  const d = bits(v);
  const frames: Frame[] = [{ d: [...d], carry: COLS - 1, first: true }];
  for (let col = COLS - 1; ; ) {
    if (d[col] === 1) {
      d[col] = 0;            // XOR: one and one — the digit is 0
      frames.push({ d: [...d], carry: col - 1, did: { col, xor: 0, and: 1 } }); // AND: carry the one
      col -= 1;
      if (col < 0) break;    // no column left: it falls out of bed
    } else {
      d[col] = 1;            // XOR: just one — the digit is 1, and AND stays shut
      frames.push({ d: [...d], carry: null, did: { col, xor: 1, and: 0 } });
      break;
    }
  }
  return frames;
};

const STEP_MS = 420;

/** Plays a carry rippling through, frame by frame, then reports where it
 *  ended. Shared by the toy and the cover. */
export const useRipple = (onDone: (v: number, fell: boolean) => void) => {
  const [frame, setFrame] = useState<Frame | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const play = (v: number) => {
    const frames = addOne(v);
    frames.forEach((f, i) => timers.current.push(window.setTimeout(() => setFrame(f), i * STEP_MS)));
    timers.current.push(window.setTimeout(() => {
      const last = frames[frames.length - 1];
      setFrame(null);
      onDone(value(last.d), last.carry === -1);
    }, frames.length * STEP_MS + 250));
  };
  return { frame, busy: frame !== null, play };
};

/** The board itself: no buttons, so the cover can use it too. */
/** A column's two doors, lit while they decide. */
const Doors: React.FC<{ xor?: number; and?: number }> = ({ xor, and }) => {
  const lit = xor !== undefined;
  const chip = (name: string, v: number | undefined, say: string) => (
    <span
      className="rounded px-1 text-[0.5625rem] leading-tight"
      style={{
        fontFamily: MONO,
        color: !lit ? '#6b7280' : v ? '#37f08a' : '#f87171',
        background: !lit ? 'transparent' : v ? 'rgba(55,240,138,.12)' : 'rgba(248,113,113,.12)',
      }}
    >
      {name}{lit ? ` ${say}` : ''}
    </span>
  );
  return (
    <span className="flex flex-col items-center gap-0.5">
      {chip('XOR', xor, xor ? '→1' : '→0')}
      {chip('AND', and, and ? 'carry' : '—')}
    </span>
  );
};

export const Board: React.FC<{ digits: number[]; carry: number | null; did?: Frame['did']; first?: boolean }> = ({ digits, carry, did, first }) => (
  <div style={{ containerType: 'inline-size' }}>
    {/* the row the carry marble rolls along, above the columns */}
    <div className="relative grid grid-cols-4 gap-2" style={{ height: '13cqw' }}>
      {Array.from({ length: COLS }, (_, i) => (
        <div key={i} className="flex items-end justify-center">
          {carry === i && (
            <motion.span layoutId="adder-carry" transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="flex flex-col items-center">
              <span className="text-[0.625rem] text-amber-300">{first ? '+1 🐟' : 'carry'}</span>
              <Marble size="8cqw" />
            </motion.span>
          )}
        </div>
      ))}
      {carry === -1 && (
        // nowhere left to go: off the left edge and down
        <motion.span
          className="absolute left-0 top-[4cqw]"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: '-8cqw', y: '30cqw', opacity: 0, rotate: -40 }}
          transition={{ duration: 0.9, ease: 'easeIn' }}
        >
          <Marble size="8cqw" />
        </motion.span>
      )}
    </div>
    <div className="grid grid-cols-4 gap-2">
      {digits.map((b, i) => (
        <div
          key={i}
          className="flex flex-col items-center rounded-xl border bg-[#0b0a14] py-2 transition-colors"
          style={{ borderColor: did?.col === i ? '#38bdf8' : '#374151', boxShadow: did?.col === i ? '0 0 14px rgba(56,189,248,.45)' : 'none' }}
        >
          <span className="text-[0.625rem] text-gray-500">{[8, 4, 2, 1][i]}s</span>
          <span className="my-1.5 flex items-center justify-center" style={{ height: '12cqw' }}>
            {b ? <Marble size="11cqw" /> : <Hole size="11cqw" />}
          </span>
          {did?.col === i ? <Doors xor={did.xor} and={did.and} /> : <Doors />}
        </div>
      ))}
    </div>
    <div className="mt-2 flex items-baseline justify-between px-1">
      <span style={{ fontFamily: PIXEL_FONT, fontSize: '11cqw', color: '#fde68a', letterSpacing: '0.12em' }}>{digits.join('')}</span>
      {/* while a carry is still rolling the sum is not finished — 0100 halfway
          through 7 + 1 is not "4", so it does not say so */}
      <span className="text-[0.875rem] text-gray-300">= {carry === null ? value(digits) : '…'}</span>
    </div>
  </div>
);

export const AdderToy: React.FC<{
  v: number; best: number; fell: boolean; want: boolean; live: boolean;
  onChange: (v: number, best: number, fell: boolean) => void;
}> = ({ v, best, fell, want, live, onChange }) => {
  const still = useReducedMotion();
  const { frame, busy, play } = useRipple((nv, f) => onChange(nv, Math.max(best, nv), fell || f));
  const feed = () => {
    if (busy) return;
    if (still) {               // reduced motion: the sum, without the ride
      const fr = addOne(v); const last = fr[fr.length - 1];
      onChange(value(last.d), Math.max(best, value(last.d)), fell || last.carry === -1);
      return;
    }
    play(v);
  };
  const digits = frame ? frame.d : bits(v);
  return (
    <div>
      <div className="mb-1 text-center text-[0.625rem] uppercase tracking-widest text-amber-500/70">catventure · score</div>
      <Board digits={digits} carry={frame ? frame.carry : null} did={frame?.did} first={frame?.first} />
      {live ? (
        <>
          <div className="mt-3 flex gap-2">
            <div className="flex flex-[2]" style={{ opacity: busy ? 0.5 : 1 }}>
              <Push onClick={feed} label="feed the cat a fish — add one" beckon={want && !busy}>🐟 +1</Push>
            </div>
            <div className="flex flex-1"><Push tone="ghost" onClick={() => !busy && onChange(1, best, fell)} label="start the score again at 1">↺ 1</Push></div>
          </div>
          <p className="mt-2 min-h-[2.5rem] text-center text-[0.75rem] text-gray-400">
            {frame?.carry === -1 ? 'the last carry had no column to go to — it fell out of bed 🛏️'
              : frame ? 'XOR writes the digit · AND carries the one'
              : 'each column is two doors: XOR writes the digit, AND carries the one'}
          </p>
        </>
      ) : (
        <p className="mt-2 text-center text-[0.75rem] text-gray-500">the score keeps counting further down ↓</p>
      )}
    </div>
  );
};
