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

const FISH_AT = 56;                  // where the next fish waits, % from the left
const CAT_AT = 7;

const GameScreen: React.FC<{
  score: number; ate: number; eaten?: number; pop: { id: number; text: string; bad: boolean } | null;
  banner: string | null; onFeed: () => void;
}> = ({ score, ate, eaten, pop, banner, onFeed }) => (
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
        <PixelFish size="6cqw" /> eaten: {eaten}
      </span>
    )}
    {/* the corridor */}
    <span className="absolute inset-x-0 top-[30%] h-[2.2cqw] rounded bg-blue-800" />
    <span className="absolute inset-x-0 bottom-[6%] h-[2.2cqw] rounded bg-blue-800" />
    {/* ONE fish at a time. With three always waiting, a cold read saw
        "eaten: 1" beside three fish and called it broken — eating has to be
        something you can see: the cat lunges, the fish is gone, the next one
        swims in. */}
    <AnimatePresence>
      <motion.span
        key={`fish${ate}`}
        className="absolute top-[56%]"
        initial={ate === 0 ? false : { left: '104%', opacity: 0 }}
        animate={{ left: `${FISH_AT}%`, opacity: 1, transition: { delay: ate === 0 ? 0 : 0.3, duration: 0.35, ease: 'easeOut' } }}
        exit={{ left: `${CAT_AT + 14}%`, opacity: 0, scale: 0.3, transition: { duration: 0.16, ease: 'easeIn' } }}
      >
        <PixelFish size="11cqw" />
      </motion.span>
    </AnimatePresence>
    {/* the hero lunges at the fish and back */}
    <motion.span
      key={`cat${ate}`}
      className="absolute top-[47%]"
      style={{ left: `${CAT_AT}%` }}
      initial={false}
      animate={ate ? { x: ['0cqw', '30cqw', '30cqw', '0cqw'], scaleY: [1, 0.85, 1.05, 1] } : undefined}
      transition={{ duration: 0.42, times: [0, 0.35, 0.55, 1] }}
    >
      <PixelCat size="15cqw" />
    </motion.span>
    <AnimatePresence>
      {pop && (
        <motion.span
          key={pop.id}
          className="absolute"
          // beside the cat, not on it: on its head the "0?!" could not be read
          style={{ left: `${CAT_AT + 17}%`, top: '38%', fontFamily: PIXEL_FONT, fontSize: pop.bad ? '10cqw' : '8cqw', lineHeight: 1, color: pop.bad ? '#f87171' : '#fde68a' }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: '-4cqw', opacity: [1, 1, 0] }}
          transition={{ duration: pop.bad ? 2.2 : 0.8, ease: 'easeOut' }}
        >{pop.text}</motion.span>
      )}
    </AnimatePresence>
    {/* the fixed score's moment: what she wanted all chapter */}
    <AnimatePresence>
      {banner && (
        <motion.span
          key={banner}
          // in the top bar beside SCORE, where a game puts it — not over the cat and the fish
          className="absolute right-[3cqw] top-[4cqw]"
          style={{ fontFamily: PIXEL_FONT, fontSize: '8cqw', lineHeight: 1, color: '#fde047', textShadow: '0 0 12px rgba(253,224,71,.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 1, 0], transition: { duration: 2.2, times: [0, 0.1, 0.5, 0.85, 1] } }}
          exit={{ opacity: 0 }}
        >{banner}</motion.span>
      )}
    </AnimatePresence>
  </button>
);


// ── the inside of the score ─────────────────────────────────────────────────
// Only on the fixed score, after the story has taken the back off: four
// lights (the score in binary), and the +1 rolling in from the right. On a
// lit light it writes 0 and carries the one on (the XOR and AND doors); on a
// dark one it writes 1 and stops. 0111 + 1 is the dominoes.

const WORTH = [8, 4, 2, 1];
const Inside: React.FC<{ digits: number[]; frame: Frame | null; onFeed: () => void; chip: boolean }> = ({ digits, frame, onFeed, chip }) => {
  const carry = frame ? frame.carry : null;
  const did = frame?.did;
  // what the lit lights are worth, added up the way a kid adds — a cold read
  // saw SCORE 9 beside lights 1 0 0 1 and asked "why is that nine?"
  const lit = WORTH.filter((_, i) => digits[i]);
  return (
    // the lights look like something to touch, so touching them feeds the cat too
    <button onClick={onFeed} aria-label="feed the cat a fish"
      className="mt-2 block w-full touch-manipulation select-none rounded-lg border border-[#2a2540] bg-[#0b0a14] px-2 pb-1.5 pt-1 text-left" style={{ containerType: 'inline-size' }}>
      <div className="flex items-center justify-between">
        <span className="text-[0.625rem] uppercase tracking-widest text-gray-400">inside the score</span>
        {/* the two chips the title promises: one writes the digit (it was
            always fine), one carries the 1 — the socket Santa's chip goes
            into. No part numbers: "SN7408" was one more word to not know. */}
        <span className="flex gap-1.5">
        <span className="rounded border border-gray-500 px-1.5 text-[0.625rem] tracking-wider text-gray-200" style={{ fontFamily: MONO }}>writes ✓</span>
        <motion.span
          key={chip ? 'in' : 'out'}
          initial={chip ? { scale: 1.25, backgroundColor: '#fbbf24' } : false}
          animate={{ scale: 1, backgroundColor: chip ? '#141414' : '#0b0a14' }}
          transition={{ duration: 0.5 }}
          className="rounded px-1.5 text-[0.625rem] tracking-wider"
          style={{ fontFamily: MONO, border: chip ? '1px solid #9ca3af' : '1px dashed #4b5563', color: chip ? '#e5e7eb' : '#6b7280' }}
        >{chip ? 'carries ✓' : 'carries: empty'}</motion.span>
        </span>
      </div>
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
            <span className="mt-0.5 text-[0.75rem]" style={{ fontFamily: MONO, color: b ? '#fde68a' : '#4b5563' }}>{WORTH[i]}</span>
          </div>
        ))}
      </div>
      <p className="min-h-[1.25rem] text-center text-[0.75rem] text-sky-200">
        {carry === -1 ? 'no light left — the carry fell out of bed 🛏️'
          : did ? (did.dead ? 'already lit: off it goes… and the 1 is lost 💨' : did.xor ? 'it was off: light it up ✓' : 'already lit: switch it off, carry the 1 ←')
          : lit.length ? `lit lights add up: ${lit.join(' + ')}${lit.length > 1 ? ` = ${lit.reduce((a, n) => a + n, 0)}` : ''}`
          : 'no lights lit: 0'}
      </p>
    </button>
  );
};

export const AdderToy: React.FC<{
  v: number; best: number; fell: boolean; want: boolean; live: boolean;
  onChange: (v: number, best: number, fell: boolean) => void;
  /** the score with its AND doors burnt out, and how many fish it has eaten */
  broken?: boolean; fish?: number;
  /** the fixed score: is Santa's chip in yet? Until it is, the score is as
   *  broken as before; once it is, the score counts up by itself to 8 */
  chip?: boolean; onInstall?: () => void;
}> = ({ v, best, fell, want, live, onChange, broken: burnt = false, fish, chip, onInstall }) => {
  const broken = burnt || chip === false;
  const still = useReducedMotion();
  const [ate, setAte] = useState(0);
  const [pop, setPop] = useState<{ id: number; text: string; bad: boolean } | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  // Getting past 1 is what she wanted all chapter, so the game says so — a
  // cold read of the first fixed score "never saw the score getting fixed".
  const cheer = (nv: number) => {
    if (broken) return;
    // no number in it: by the time it shows, a fast thumb has the score past it
    const text = nv === 2 && best < 2 ? 'NEW HIGH SCORE!' : null;
    if (text) { setBanner(text); window.setTimeout(() => setBanner((b) => (b === text ? null : b)), 2200); }
  };
  // a kid taps faster than a carry rolls: taps made while one is rolling are
  // kept and played after it, never dropped
  const queued = useRef(0);
  const ripple = useRipple((nv, f) => {
    cheer(nv);
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
      cheer(nv);
      onChange(nv, Math.max(best, nv), fell || last.carry === -1);
      return;
    }
    setPop({ id: Date.now(), text: '+1', bad: false });
    if (ripple.busy) { queued.current += 1; return; }
    ripple.play(v);
  };

  // With the chip in, the score counts by itself: the cat eats a fish every
  // beat and the carries ripple, up to 8. The second toy that was "tap feed
  // nine times" read to a cold reviewer as the first toy again; the thing a
  // kid DOES here is the heist's payoff — put the chip in — and then they
  // get to watch it work.
  const feedRef = useRef(feed); feedRef.current = feed;
  const counting = !burnt && chip === true && v < 8;
  useEffect(() => {
    if (!live || !counting || ripple.busy) return;
    const t = window.setTimeout(() => feedRef.current(), 650);
    return () => window.clearTimeout(t);
  }, [live, counting, ripple.busy, v]);

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
      <GameScreen score={shown} ate={ate} eaten={burnt ? fish : chip ? ate : undefined} pop={pop} banner={banner} onFeed={feed} />
      {!burnt && <Inside digits={digits} frame={ripple.frame} onFeed={feed} chip={chip === true} />}
      <div className="mt-2 flex">
        {chip === false
          ? <Push onClick={() => onInstall?.()} label="put Santa's chip into the score" beckon solid>🔧 put the chip in</Push>
          : <Push onClick={feed} label="feed the cat a fish" beckon={want && !counting} solid>🐟 feed the cat</Push>}
      </div>
      {burnt && (
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
  // Each lamp asks a question a kid can answer, with the door's name as a
  // small tag. It read "NOT 🐱 · yes" — and a cold reviewer could not tell
  // whether yes meant the tail WAS pulled or was not.
  const lamp = (door: string, question: string, v: boolean, gone = false) => (
    // no border: a bordered box beside the switches read as one more button
    // ("can I tap yes?")
    <div className="flex flex-1 flex-col items-center px-1 py-0.5">
      <span className="text-[0.5625rem] tracking-widest text-gray-400" style={{ fontFamily: MONO }}>{door}</span>
      <span className="text-[0.75rem] text-gray-100">{gone ? 'empty socket' : question}</span>
      <span className="text-[0.75rem] font-bold" style={{ color: gone ? '#9ca3af' : v ? '#4ade80' : '#f87171' }}>
        {gone ? 'says yes to all' : v ? '✓ yes' : '✗ no'}
      </span>
    </div>
  );
  // After the heist the machine is dark: its chip is in Starlax's pocket.
  // It used to stay up, saying NICE with the tail pulled and its switches
  // dimmed, and a cold read called that broken, not funny — and it gave the
  // chapter's last joke away early. What it says without the chip is the
  // photo at the end.
  if (heist) return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-gray-600 bg-[#0c0a09] px-3 py-3">
      <span className="text-[1.75rem]" aria-hidden>🔧</span>
      <div>
        <div className="text-gray-500" style={{ fontFamily: PIXEL_FONT, fontSize: '1.5rem', lineHeight: 1, letterSpacing: '0.08em' }}>NO CHIP</div>
        <div className="text-[0.8125rem] text-amber-300">the AND chip is in Starlax’s pocket</div>
      </div>
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
        {lamp(heist ? 'AND · 7408' : 'AND', 'teeth and please?', and, heist)}
        {lamp('NOT', 'left the cat alone?', not)}
      </div>
      <div className="mt-2 rounded-xl border-2 py-2 text-center" style={{ borderColor: nice ? '#4ade80' : '#f87171', background: '#0c0a09' }}>
        <div style={{ fontFamily: PIXEL_FONT, fontSize: '13cqw', lineHeight: 1, color: nice ? '#4ade80' : '#f87171', letterSpacing: '0.1em' }}>
          {nice ? 'NICE 🎁' : 'NAUGHTY'}
        </div>
        <div className="mt-1 text-[0.625rem] uppercase tracking-[0.2em] text-amber-500/60">naughty-or-nice machine</div>
      </div>
      <div className="mt-2 flex">
        {heist ? (
          <p className="flex min-h-[44px] w-full items-center justify-center text-center text-[0.75rem] text-amber-300">🔧 the AND chip is in Starlax’s pocket</p>
        ) : (
          seenNice && seenNaughty ? (
            <div className="flex w-full">
              <Push onClick={() => onChange({ heist: true })} label="take the AND chip out of the machine" beckon={glow === 'chip'}>🔧 take the AND chip</Push>
            </div>
          ) : (
            // not a dimmed button: a cold read called the grey one "dead", and
            // a thing that looks pressable and does nothing is the worst answer
            <p className="flex min-h-[44px] w-full items-center justify-center text-center text-[0.75rem] text-gray-400">
              {seenNice ? 'now make it say NAUGHTY 😈' : 'make it say NICE 🎁'}
            </p>
          )
        )}
      </div>
    </div>
  );
};
