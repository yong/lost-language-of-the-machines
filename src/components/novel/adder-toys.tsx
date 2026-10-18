// adder-toys.tsx — the toys for "Two Doors Can Add" (/lab/adder).
//
// One idea: a machine cannot count, but two doors can add. XOR writes the
// digit, AND carries the one. Two toys:
//
//   AdderToy — CATVENTURE itself: the cat, the fish, the arcade score. `broken`
//              is the score with its AND chip burnt out, so it goes 1, 0, 1,
//              0. Fixed, it also shows the inside — four lights, and the +1
//              carried along them like dominoes: 0111 + 1.
//   SantaToy — the Naughty-or-Nice Machine (AND, NOT the cat), whose AND chip
//              the reader then takes for the score.
//
// Thumb notes: tap floors stay px (44+), all text is rem or cqw.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PixelCat } from '@/components/novel/maze-toys';
import { PIXEL_FONT } from '@/components/lab/world/theme';
import { Push, BeckonStyle } from '@/components/novel/push';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

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

const STEP_MS = 300;

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

// ── the game screen ─────────────────────────────────────────────────────────
// What the reader meets first is CATVENTURE, not its insides: the cat, fish
// coming down the corridor, an arcade score. The first build of this toy was
// the insides — four boxes of dashed circles labelled XOR / AND, a binary
// "0000" and its button below the fold — and the author's verdict on a phone
// was "what is this boring app here for?". A kid taps the fish, so the whole
// screen is a button; the glowing button under it is the same action.

const FISH = ['..##...#', '.####.##', '########', '.####.##', '..##...#'];
const PixelFish: React.FC<{ size: string }> = ({ size }) => (
  <svg viewBox="0 0 8 5" style={{ display: 'block', width: size, aspectRatio: '8 / 5' }} aria-hidden>
    {FISH.flatMap((row, r) => [...row].map((ch, c) => (ch === '#' ? <rect key={`${r},${c}`} x={c} y={r} width={1.02} height={1.02} fill="#7dd3fc" /> : null)))}
    <rect x={2} y={1} width={1} height={1} fill="#0c4a6e" />
  </svg>
);

const SLOTS = [40, 62, 84];          // where the fish wait, % from the left
const CAT_AT = 7;

const GameScreen: React.FC<{
  score: number | '…'; ate: number; eaten?: number; pop: { id: number; text: string; bad: boolean } | null; onFeed: () => void;
}> = ({ score, ate, eaten, pop, onFeed }) => {
  // the first fish are already waiting when the card appears; only the ones
  // that come after swim in from the right (all three flying in at once
  // piled up on the right edge)
  const mounted = useRef(false);
  useEffect(() => { mounted.current = true; }, []);
  return (
  <button
    onClick={onFeed}
    aria-label="feed the cat a fish"
    className="relative block w-full touch-manipulation select-none overflow-hidden rounded-lg border-2 border-blue-900 bg-black text-left"
    style={{ aspectRatio: '16 / 8', containerType: 'inline-size' }}
  >
    {/* the arcade's own score, in the corner where a game puts it */}
    <span className="absolute left-[3cqw] top-[2cqw] flex items-baseline gap-[2cqw]">
      <span style={{ fontFamily: PIXEL_FONT, fontSize: '5cqw', color: '#9ca3af', letterSpacing: '0.1em' }}>SCORE</span>
      <motion.span
        key={pop?.bad ? `bad${pop.id}` : 'ok'}
        initial={pop?.bad ? { color: '#f87171' } : false}
        animate={{ color: pop?.bad ? ['#f87171', '#f87171', '#fde68a'] : '#fde68a' }}
        transition={{ duration: 1.4 }}
        style={{ fontFamily: PIXEL_FONT, fontSize: '11cqw', lineHeight: 1 }}
      >{score}</motion.span>
    </span>
    {eaten !== undefined && (
      <span className="absolute right-[3cqw] top-[3cqw] flex items-center gap-[1.5cqw]" style={{ fontFamily: PIXEL_FONT, fontSize: '5.5cqw', color: '#bae6fd' }}>
        <PixelFish size="6cqw" /> × {eaten}
      </span>
    )}
    {/* the corridor */}
    <span className="absolute inset-x-0 top-[30%] h-[2.2cqw] rounded bg-blue-800" />
    <span className="absolute inset-x-0 bottom-[6%] h-[2.2cqw] rounded bg-blue-800" />
    {/* the hero, with a chomp every time it eats */}
    <motion.span
      key={`cat${ate}`}
      className="absolute top-[47%]"
      style={{ left: `${CAT_AT}%`, originY: 1 }}
      initial={false}
      animate={ate ? { scaleY: [1, 0.78, 1.06, 1], x: ['0cqw', '2cqw', '0cqw', '0cqw'] } : undefined}
      transition={{ duration: 0.32 }}
    >
      <PixelCat size="15cqw" />
    </motion.span>
    {/* the fish, sliding up to the cat one slot per tap */}
    {[ate - 1, ate, ate + 1, ate + 2].filter((k) => k >= 0).map((k) => {
      const slot = k - ate;
      return (
        <motion.span
          key={k}
          className="absolute top-[56%]"
          initial={mounted.current ? { left: '104%', opacity: 0 } : false}
          animate={slot < 0 ? { left: `${CAT_AT + 6}%`, opacity: 0, scale: 0.4 } : { left: `${SLOTS[slot]}%`, opacity: 1, scale: 1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <PixelFish size="10cqw" />
        </motion.span>
      );
    })}
    <AnimatePresence>
      {pop && (
        <motion.span
          key={pop.id}
          className="absolute"
          // beside the cat, not on it: on its head the "0?!" could not be read
          style={{ left: `${CAT_AT + 17}%`, top: '40%', fontFamily: PIXEL_FONT, fontSize: pop.bad ? '10cqw' : '8cqw', lineHeight: 1, color: pop.bad ? '#f87171' : '#fde68a' }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: '-4cqw', opacity: [1, 1, 0] }}
          transition={{ duration: pop.bad ? 1.3 : 0.8, ease: 'easeOut' }}
        >{pop.text}</motion.span>
      )}
    </AnimatePresence>
  </button>
  );
};

// ── the inside of the score ─────────────────────────────────────────────────
// Only on the fixed score, after the story has taken the back off: four
// lights (the score in binary), and the +1 rolling in from the right. On a
// lit light it writes 0 and carries the one on (the XOR and AND doors); on a
// dark one it writes 1 and stops. 0111 + 1 is the dominoes.

const Inside: React.FC<{ digits: number[]; frame: Frame | null }> = ({ digits, frame }) => {
  const carry = frame ? frame.carry : null;
  const did = frame?.did;
  return (
    <div className="mt-2 rounded-lg border border-[#2a2540] bg-[#0b0a14] px-2 pb-1.5 pt-1" style={{ containerType: 'inline-size' }}>
      <div className="text-[0.625rem] uppercase tracking-widest text-gray-400">inside the score</div>
      {/* the row the +1 rolls along */}
      <div className="relative grid grid-cols-4" style={{ height: '7cqw' }}>
        {Array.from({ length: COLS }, (_, i) => (
          <div key={i} className="flex items-end justify-center">
            {carry === i && (
              <motion.span layoutId="adder-carry" transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="rounded-full bg-amber-400 px-1.5 text-[0.6875rem] font-bold leading-snug text-black">
                {frame?.first ? '+1' : 'carry 1'}
              </motion.span>
            )}
          </div>
        ))}
        {carry === -1 && (
          <motion.span className="absolute left-0 top-0 rounded-full bg-amber-400 px-1.5 text-[0.6875rem] font-bold text-black"
            initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: '-6cqw', y: '14cqw', opacity: 0, rotate: -40 }} transition={{ duration: 0.9, ease: 'easeIn' }}>
            carry 1
          </motion.span>
        )}
      </div>
      <div className="grid grid-cols-4">
        {digits.map((b, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="rounded-full transition-all duration-200" style={{
              width: '9cqw', height: '9cqw',
              background: b ? 'radial-gradient(circle at 35% 30%, #fff7d6, #fbbf24 45%, #b45309)' : '#1f1d2e',
              boxShadow: b ? '0 0 12px rgba(251,191,36,.6)' : 'inset 0 1px 3px rgba(0,0,0,.6)',
              outline: did?.col === i ? '2px solid #38bdf8' : 'none', outlineOffset: 3,
            }} />
            <span className="mt-0.5 text-[0.75rem] text-gray-400" style={{ fontFamily: MONO }}>{b}</span>
          </div>
        ))}
      </div>
      <p className="min-h-[1.25rem] text-center text-[0.75rem] text-sky-200">
        {carry === -1 ? 'no light left — the carry fell out of bed 🛏️'
          : did ? (did.xor ? 'write 1 ✓' : '1 and 1: write 0, carry the 1 ←')
          : 'every fish rolls a +1 in from the right'}
      </p>
    </div>
  );
};

export const AdderToy: React.FC<{
  v: number; best: number; fell: boolean; want: boolean; live: boolean;
  onChange: (v: number, best: number, fell: boolean) => void;
  /** the score with its AND doors burnt out, and how many fish it has eaten */
  broken?: boolean; fish?: number;
}> = ({ v, best, fell, want, live, onChange, broken = false, fish }) => {
  const still = useReducedMotion();
  const [ate, setAte] = useState(0);
  const [pop, setPop] = useState<{ id: number; text: string; bad: boolean } | null>(null);
  // a kid taps faster than a carry rolls: taps made while one is rolling are
  // kept and played after it, never dropped
  const queued = useRef(0);
  const ripple = useRipple((nv, f) => {
    onChange(nv, Math.max(best, nv), fell || f);
    if (queued.current > 0) { queued.current -= 1; ripple.play(nv); }
  }, broken);
  const feed = () => {
    setAte((a) => a + 1);
    if (broken || still) {
      // the broken score has no inside on show, so it answers at once
      const fr = addOne(v, broken); const last = fr[fr.length - 1]; const nv = value(last.d);
      const dropped = nv < v;
      setPop({ id: Date.now(), text: dropped ? `${nv}?!` : '+1', bad: dropped });
      onChange(nv, Math.max(best, nv), fell || last.carry === -1);
      return;
    }
    setPop({ id: Date.now(), text: '+1', bad: false });
    if (ripple.busy) { queued.current += 1; return; }
    ripple.play(v);
  };

  if (!live) return <p className="py-1 text-center text-[0.8125rem] text-gray-400">🐱 the cat is still eating further down ↓</p>;

  const digits = ripple.frame ? ripple.frame.d : bits(v);
  // the arcade score changes the moment the carry lands — not a beat later.
  // It used to wait for the ripple to finish, and a cold read caught it: the
  // lights said 1 while SCORE still said 0. A number on screen agrees with
  // the number beside it.
  const f = ripple.frame;
  const shown = f && (f.carry === null || f.carry === -1) ? value(f.d) : v;
  return (
    <div>
      <GameScreen score={shown} ate={ate} eaten={broken ? fish : undefined} pop={pop} onFeed={feed} />
      {!broken && <Inside digits={digits} frame={ripple.frame} />}
      <div className="mt-2 flex">
        <Push onClick={feed} label="feed the cat a fish" beckon={want}>🐟 feed the cat</Push>
      </div>
      {broken && (
        <p className="mt-1.5 min-h-[1.25rem] text-center text-[0.8125rem] text-red-300">
          {(fish ?? 0) >= 2 && v === 0 ? `${fish} fish. score 0. 😾` : ''}
        </p>
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
