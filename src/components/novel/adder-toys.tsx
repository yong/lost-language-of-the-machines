// adder-toys.tsx — the toys for "Two Doors Can Add" (/lab/adder).
//
// One idea: a machine cannot count, but two doors can add. XOR writes the
// digit, AND carries the one. Two toys:
//
//   AdderToy — CATVENTURE's score as four columns of two doors. `broken` is
//              the score with its AND chip burnt out: XOR writes 0 and the
//              carry vanishes, so it goes 1, 0, 1, 0. Fixed, a carry knocks
//              into the next column like a domino: 0111 + 1 is a chain.
//   SantaToy — the Naughty-or-Nice Machine (AND, NOT the cat), whose AND chip
//              the reader then takes for the score.
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

// ── the adder ────────────────────────────────────────────────────────────
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
  /** the column whose two doors just decided, and what each said — `dead`
   *  when its AND door is burnt out and the carry is simply lost */
  did?: { col: number; xor: number; and: number; dead?: boolean };
  /** the marble on its way in is the fish's +1 until a column passes it on */
  first?: boolean;
}

/** `broken`: the AND doors are burnt out. XOR still writes the digit, but
 *  the carry has nowhere to go — so 1 + 1 is 0, and the score never gets
 *  past 1. That is the bug the chapter opens on. */
export const addOne = (v: number, broken = false): Frame[] => {
  const d = bits(v);
  const frames: Frame[] = [{ d: [...d], carry: COLS - 1, first: true }];
  for (let col = COLS - 1; ; ) {
    if (d[col] === 1 && broken) {
      d[col] = 0;            // XOR: 1 and 1 — the digit is 0 …
      frames.push({ d: [...d], carry: null, did: { col, xor: 0, and: 0, dead: true } }); // … and the carry is lost
      break;
    }
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
export const useRipple = (onDone: (v: number, fell: boolean) => void, broken = false) => {
  const [frame, setFrame] = useState<Frame | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const play = (v: number) => {
    const frames = addOne(v, broken);
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
const Doors: React.FC<{ xor?: number; and?: number; dead?: boolean }> = ({ xor, and, dead }) => {
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
      {dead ? (
        <span className="rounded px-1 text-[0.5625rem] leading-tight" style={{ fontFamily: MONO, color: '#fbbf24', background: 'rgba(120,53,15,.5)' }}>
          AND 💀
        </span>
      ) : chip('AND', and, and ? 'carry' : '—')}
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
          {did?.col === i ? <Doors xor={did.xor} and={did.and} dead={did.dead} /> : <Doors />}
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
  /** the score with its AND doors burnt out, and how many fish it has eaten */
  broken?: boolean; fish?: number;
}> = ({ v, best, fell, want, live, onChange, broken = false, fish }) => {
  const still = useReducedMotion();
  const { frame, busy, play } = useRipple((nv, f) => onChange(nv, Math.max(best, nv), fell || f), broken);
  const feed = () => {
    if (busy) return;
    if (still) {               // reduced motion: the sum, without the ride
      const fr = addOne(v, broken); const last = fr[fr.length - 1];
      onChange(value(last.d), Math.max(best, value(last.d)), fell || last.carry === -1);
      return;
    }
    play(v);
  };
  const digits = frame ? frame.d : bits(v);
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between px-1 text-[0.625rem] uppercase tracking-widest text-amber-500/70">
        <span>catventure · score</span>
        {fish !== undefined && <span className="normal-case tracking-normal text-gray-400">🐟 eaten: {fish}</span>}
      </div>
      <Board digits={digits} carry={frame ? frame.carry : null} did={frame?.did} first={frame?.first} />
      {live ? (
        <>
          <div className="mt-3 flex gap-2">
            <div className="flex flex-[2]" style={{ opacity: busy ? 0.5 : 1 }}>
              <Push onClick={feed} label="feed the cat a fish — add one" beckon={want && !busy}>🐟 +1</Push>
            </div>
            {!broken && <div className="flex flex-1"><Push tone="ghost" onClick={() => !busy && onChange(1, best, fell)} label="start the score again at 1">↺ 1</Push></div>}
          </div>
          <p className="mt-2 min-h-[2.5rem] text-center text-[0.75rem] text-gray-400">
            {broken ? (frame?.did?.dead ? 'XOR wrote 0 … and the carry just vanished 💨' : 'every fish should add one')
              : frame?.carry === -1 ? 'the last carry had no column to go to — it fell out of bed 🛏️'
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

// ── the Naughty-or-Nice Machine ─────────────────────────────────────────────
// The museum's old toy-shop Santa machine, built from the same chips as the
// score: brushed teeth AND said please AND NOT pulled the cat's tail. It is
// the only spare AND chip in the museum, so the reader plays with it — and
// then takes it. With the chip gone the socket is empty, and an empty input
// on these old chips reads as a 1 (true of real TTL chips), so afterwards the
// machine says NICE to everybody — the chapter's punchline.

export const SantaToy: React.FC<{
  teeth: boolean; please: boolean; cat: boolean; seenNice: boolean; seenNaughty: boolean; heist: boolean;
  onChange: (p: { teeth?: boolean; please?: boolean; cat?: boolean; seenNice?: boolean; seenNaughty?: boolean; heist?: boolean }) => void;
}> = ({ teeth, please, cat, seenNice, seenNaughty, heist, onChange }) => {
  const and = teeth && please, not = !cat;
  const nice = heist ? true : and && not;
  const flip = (k: 'teeth' | 'please' | 'cat') => {
    if (heist) return;
    const next = { teeth, please, cat, [k]: !{ teeth, please, cat }[k] };
    const v = next.teeth && next.please && !next.cat;
    // NAUGHTY only counts once the CAT causes it — the first try had the reader
    // "see" naughty on their very first tap (teeth only) and never pull the
    // tail, so the NOT door and the funniest switch were skipped
    onChange({ [k]: next[k], ...(v ? { seenNice: true } : next.cat && seenNice ? { seenNaughty: true } : {}) });
  };
  // one thing glows at a time: whatever gets the reader to the next verdict
  const glow: 'teeth' | 'please' | 'cat' | 'chip' | null =
    heist ? null
      : !seenNice ? (!teeth ? 'teeth' : !please ? 'please' : cat ? 'cat' : null)
      : !seenNaughty ? 'cat'
      : 'chip';
  const sw = (k: 'teeth' | 'please' | 'cat', emoji: string, label: string) => {
    const on = { teeth, please, cat }[k];
    return (
      <button
        onClick={() => flip(k)}
        aria-label={`${label}: ${on ? 'yes' : 'no'}`}
        className={`flex flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 rounded-xl border bg-[#100e1c] py-1.5 ${glow === k ? 'beckon' : ''}`}
        style={{ minHeight: 64, borderColor: on ? '#fbbf24' : '#3f3a56', opacity: heist ? 0.55 : 1 }}
      >
        <span className="text-[1.375rem] leading-none">{emoji}</span>
        <span className="text-[0.625rem] text-gray-400">{label}</span>
        <span className="mt-0.5 inline-block h-2.5 w-2.5 rounded-full" style={{ background: on ? '#fbbf24' : '#374151', boxShadow: on ? '0 0 8px #fbbf24' : 'none' }} />
      </button>
    );
  };
  const lamp = (lbl: string, v: boolean, gone = false) => (
    <div className="flex flex-1 flex-col items-center rounded-lg border px-2 py-1.5"
         style={{ borderColor: gone ? '#6b7280' : v ? '#4ade80' : '#f87171', borderStyle: gone ? 'dashed' : 'solid', background: '#0b0a14' }}>
      <span className="text-[0.6875rem] font-bold tracking-widest text-gray-200" style={{ fontFamily: MONO }}>{lbl}</span>
      <span className="text-[0.625rem]" style={{ color: gone ? '#9ca3af' : v ? '#4ade80' : '#f87171' }}>
        {gone ? 'empty socket' : v ? 'yes' : 'no'}
      </span>
    </div>
  );
  return (
    <div style={{ containerType: 'inline-size' }}>
      {glow && <BeckonStyle />}
      <div className="flex gap-2">
        {sw('teeth', '🪥', 'brushed teeth')}
        {sw('please', '🙏', 'said please')}
        {sw('cat', '🐱', 'pulled its tail')}
      </div>
      <div className="mt-2 flex items-center gap-2">
        {lamp(heist ? 'AND · 7408' : '🪥 AND 🙏', and, heist)}
        {lamp('NOT 🐱', not)}
      </div>
      <div className="mt-2 rounded-xl border-2 py-2 text-center" style={{ borderColor: nice ? '#4ade80' : '#f87171', background: '#0c0a09' }}>
        <div style={{ fontFamily: PIXEL_FONT, fontSize: '13cqw', lineHeight: 1, color: nice ? '#4ade80' : '#f87171', letterSpacing: '0.1em' }}>
          {nice ? 'NICE 🎁' : 'NAUGHTY'}
        </div>
        <div className="mt-1 text-[0.625rem] uppercase tracking-[0.2em] text-amber-500/60">naughty-or-nice machine</div>
      </div>
      <div className="mt-2 flex">
        {heist ? (
          <p className="w-full text-center text-[0.75rem] text-amber-300">🔧 the AND chip is in Starlax’s pocket</p>
        ) : (
          <div className="flex w-full" style={{ opacity: seenNice && seenNaughty ? 1 : 0.4 }}>
            <Push onClick={() => seenNice && seenNaughty && onChange({ heist: true })} label="take the AND chip out of the machine"
                  tone={seenNice && seenNaughty ? 'amber' : 'ghost'} beckon={glow === 'chip'}>🔧 take the AND chip</Push>
          </div>
        )}
      </div>
    </div>
  );
};
