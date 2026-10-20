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
export const useRipple = (onDone: (v: number, fell: boolean) => void, broken = false, stepMs = STEP_MS) => {
  const [frame, setFrame] = useState<Frame | null>(null);
  const timers = useRef<number[]>([]);
  const pending = useRef<{ v: number; fell: boolean } | null>(null);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const play = (v: number) => {
    const frames = addOne(v, broken);
    const last = frames[frames.length - 1];
    pending.current = { v: value(last.d), fell: last.carry === -1 };
    frames.forEach((f, i) => timers.current.push(window.setTimeout(() => setFrame(f), i * stepMs)));
    timers.current.push(window.setTimeout(() => {
      pending.current = null;
      setFrame(null);
      onDone(value(last.d), last.carry === -1);
    }, frames.length * stepMs + Math.min(250, stepMs * 2)));
  };
  /** Land the carry that is rolling NOW and return the sum. A fish eaten
   *  mid-ripple finishes the last one at once, so the score never falls
   *  behind the fish (a queue let "eaten: 8" sit beside SCORE 5). */
  const finish = (): number | null => {
    const p = pending.current;
    timers.current.forEach(clearTimeout); timers.current = [];
    if (!p) return null;
    pending.current = null;
    setFrame(null);
    onDone(p.v, p.fell);
    return p.v;
  };
  return { frame, busy: frame !== null, play, finish };
};

// ── the game: CATVENTURE is a maze ──────────────────────────────────────────
// The reader PLAYS it: steer the cat round a maze with a thumb pad (or by
// tapping the maze on the side you want to go), eat the fish, watch the score
// in the corner. Two earlier tellings failed on a phone: the score's insides
// shown as a diagram ("what is this boring app here for?"), then a feed
// button to tap over and over ("boring to death, just a button to click?").
// A clicker is not a game. Steering is: a kid picks the route, misses a fish,
// turns back for it — and the broken score goes 1, 0, 1, 0 WHILE they play.

const FISH = ['..##...#', '.####.##', '########', '.####.##', '..##...#'];
const PixelFish: React.FC<{ size: string }> = ({ size }) => (
  <svg viewBox="0 0 8 5" style={{ display: 'block', width: size, aspectRatio: '8 / 5' }} aria-hidden>
    {FISH.flatMap((row, r) => [...row].map((ch, c) => (ch === '#' ? <rect key={`${r},${c}`} x={c} y={r} width={1.02} height={1.02} fill="#7dd3fc" /> : null)))}
    <rect x={2} y={1} width={1} height={1} fill="#0c4a6e" />
  </svg>
);

// Wider than tall, so maze + pad + score fit a phone in its browser (390×640).
// Mirrored left to right, like the arcade mazes it is modelled on.
// Two layouts: the fixed score gets a new one, so the payoff is not "the same
// maze, second time" (a cold read was bored right there).
const LAYOUTS = [
  ['.....', '.##.#', '.#...', '...#.', '.#.#.', '.....'],
  ['.....', '.#.##', '.#...', '.##.#', '.....', '.#.#.'],
];
const MW = 10, MH = 6;
const mazeOf = (half: string[]): number[] => half.flatMap((r) => {
  const h = [...r].map((ch) => (ch === '#' ? 1 : 2));
  return [...h, ...[...h].reverse()];
});
const MSTART = 5 * MW + 4;
const MSTEP: Record<number, [number, number]> = { 1: [-1, 0], 2: [0, 1], 3: [1, 0], 4: [0, -1] };
const mmove = (pos: number, d: number) => {
  const [dr, dc] = MSTEP[d] ?? [0, 0];
  const r = Math.floor(pos / MW) + dr, c = (pos % MW) + dc;
  return r < 0 || r >= MH || c < 0 || c >= MW ? -1 : r * MW + c;
};
interface Run { sheet: number[]; pos: number; dir: number; want: number; face: 1 | -1; level: number; layout: number }
const freshRun = (level = 1, layout = 0): Run => {
  const sheet = mazeOf(LAYOUTS[layout]); sheet[MSTART] = 0;
  return { sheet, pos: MSTART, dir: 0, want: 0, face: 1, level, layout };
};
/** One tick: turn if asked and able, step, and say whether a fish was eaten. */
const stepRun = (r: Run): { run: Run; ate: boolean } => {
  let dir = r.dir;
  if (r.want) { const t = mmove(r.pos, r.want); if (t >= 0 && r.sheet[t] !== 1) dir = r.want; }
  const next = dir ? mmove(r.pos, dir) : -1;
  if (next < 0 || r.sheet[next] === 1) return { run: dir ? { ...r, dir: 0 } : r, ate: false };
  const face = dir === 2 ? 1 : dir === 4 ? -1 : r.face;
  if (r.sheet[next] !== 2) return { run: { ...r, pos: next, dir, face }, ate: false };
  const sheet = [...r.sheet]; sheet[next] = 0;
  // every fish gone: the next level fills the maze again, and play goes on
  if (!sheet.includes(2)) return { run: { ...freshRun(r.level + 1, r.layout), pos: next, face }, ate: true };
  return { run: { ...r, sheet, pos: next, dir, face }, ate: true };
};
const TICK_MS = 190;

const Pad: React.FC<{ onDir: (d: number) => void; beckon: boolean }> = ({ onDir, beckon }) => (
  <div className={`mt-2 flex gap-2 rounded-lg ${beckon ? 'beckon' : ''}`} role="group" aria-label="steer the cat">
    {beckon && <BeckonStyle />}
    {([[4, '◀', 'left'], [1, '▲', 'up'], [3, '▼', 'down'], [2, '▶', 'right']] as const).map(([d, glyph, name]) => (
      <button
        key={d}
        onPointerDown={(e) => { e.preventDefault(); onDir(d); }}
        onClick={() => onDir(d)}
        aria-label={`steer ${name}`}
        className="flex-1 touch-manipulation select-none rounded-lg border border-amber-400 bg-amber-400 text-xl text-stone-900 active:brightness-110"
        // a thumb target, so px: 48px tall, four across a phone is ~80px wide
        style={{ minHeight: 48 }}
      >
        {glyph}
      </button>
    ))}
  </div>
);

const MazeScreen: React.FC<{
  run: Run; ready: boolean; score: number; eaten: number; pop: { id: number; text: string; bad: boolean } | null;
  banner: string | null; onSteer: (d: number) => void; beckon: boolean; hist?: number[];
}> = ({ run, ready, score, eaten, pop, banner, onSteer, beckon, hist }) => {
  // Tapping the maze steers too: toward the side of the cat you tapped.
  // A kid touches the screen first, and it should answer.
  const tapMaze = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const c = Math.floor(((e.clientX - box.left) / box.width) * MW), r = Math.floor(((e.clientY - box.top) / box.height) * MH);
    const dc = c - (run.pos % MW), dr = r - Math.floor(run.pos / MW);
    if (!dc && !dr) return;
    onSteer(Math.abs(dc) >= Math.abs(dr) ? (dc > 0 ? 2 : 4) : (dr > 0 ? 3 : 1));
  };
  return (
    // the maze is what glows: on arrival the pad can be below the fold, and a
    // kid touches the screen first anyway — tapping the maze steers
    <div className={`select-none rounded-lg border-2 border-blue-900 bg-black px-[2%] pb-[2%] pt-1 ${beckon ? 'beckon' : ''}`} style={{ containerType: 'inline-size' }}>
      {beckon && <BeckonStyle />}
      {/* the arcade's own score, in the corner where a game puts it */}
      <div className="relative flex items-baseline justify-between" style={{ height: '10cqw' }}>
        <span className="flex items-baseline gap-[2cqw]">
          <span style={{ fontFamily: PIXEL_FONT, fontSize: '4.5cqw', color: '#9ca3af', letterSpacing: '0.1em' }}>SCORE</span>
          <motion.span
            key={pop?.bad ? `bad${pop.id}` : 'ok'}
            initial={pop?.bad ? { color: '#f87171' } : false}
            animate={{ color: pop?.bad ? ['#f87171', '#f87171', '#fde68a'] : '#fde68a' }}
            transition={{ duration: 1.6 }}
            style={{ fontFamily: PIXEL_FONT, fontSize: '9cqw', lineHeight: 1 }}
          >{score}</motion.span>
          <AnimatePresence>
            {pop && (
              <motion.span key={pop.id}
                style={{ fontFamily: PIXEL_FONT, fontSize: pop.bad ? '7cqw' : '5.5cqw', lineHeight: 1, color: pop.bad ? '#f87171' : '#fde68a' }}
                initial={{ opacity: 1, y: 0 }} animate={{ opacity: [1, 1, 0], y: '-2cqw' }} transition={{ duration: pop.bad ? 2 : 0.7 }}
              >{pop.text}</motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="flex items-center gap-[1.5cqw]" style={{ fontFamily: PIXEL_FONT, fontSize: '4.8cqw', color: '#bae6fd' }}>
          <PixelFish size="5cqw" /> eaten: {eaten}
        </span>
        <AnimatePresence>
          {banner && (
            // on a solid black plate: see-through, over the fish, it "looked broken"
            <motion.span key={banner} className="pointer-events-none absolute left-1/2 top-[12cqw] z-10 -translate-x-1/2 whitespace-nowrap rounded border-2 border-yellow-300 bg-black px-[3cqw] py-[1cqw]"
              style={{ fontFamily: PIXEL_FONT, fontSize: '8cqw', lineHeight: 1, color: '#fde047', textShadow: '0 0 10px rgba(253,224,71,.8)' }}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0], transition: { duration: 2.2, times: [0, 0.1, 0.8, 1] } }} exit={{ opacity: 0 }}
            >{banner}</motion.span>
          )}
        </AnimatePresence>
      </div>
      <div
        className="relative grid w-full cursor-pointer touch-manipulation"
        style={{ gridTemplateColumns: `repeat(${MW}, 1fr)`, aspectRatio: `${MW} / ${MH}` }}
        onClick={tapMaze}
        // data-* hooks let scripts/kid-pass.mjs steer like a player
        data-maze={MW}
        role="img" aria-label="the maze: the cat and the fish"
      >
        {run.sheet.map((n, i) => (
          <div key={i} className="relative flex items-center justify-center"
            data-cell={i === run.pos ? 'cat' : n === 1 ? 'wall' : n === 2 ? 'fish' : 'open'}>
            {n === 1 && <span className="absolute inset-[6%] rounded-[3px] bg-blue-800" />}
            {n === 2 && i !== run.pos && <PixelFish size="6.2cqw" />}
            {i === run.pos && (
              <span style={{ transform: `scaleX(${run.face})` }}><PixelCat size="8.4cqw" /></span>
            )}
          </div>
        ))}
        {ready && (
          <div className="pointer-events-none absolute inset-x-0 top-[22%] flex flex-col items-center justify-center bg-black/70 py-[2cqw]">
            <span className="text-amber-200" style={{ fontFamily: PIXEL_FONT, fontSize: '10cqw', letterSpacing: '0.08em' }}>READY?</span>
            <span className="text-[0.8125rem] text-gray-100">tap where the cat should go</span>
          </div>
        )}
        {run.level > 1 && (
          <span className="pointer-events-none absolute right-1 top-0 text-[0.625rem] text-gray-500" style={{ fontFamily: MONO }}>level {run.level}</span>
        )}
      </div>
      {/* the broken score's history, so 1 0 1 0 can be SEEN — a cold read
          caught it at 1 and said "I only ever saw it stuck at 1" */}
      {hist && (
        <div className="mt-1 flex min-h-[7cqw] items-baseline gap-[2.2cqw] overflow-hidden" style={{ fontFamily: PIXEL_FONT, fontSize: '5.5cqw', lineHeight: 1 }}>
          <span className="text-gray-500" style={{ fontSize: '4cqw' }}>SCORE WENT</span>
          {hist.map((h, k) => (
            <span key={k} style={{ color: k === hist.length - 1 ? (h ? '#fde68a' : '#f87171') : '#6b7280' }}>{h}</span>
          ))}
        </div>
      )}
    </div>
  );
};

// ── the inside of the score ─────────────────────────────────────────────────
// Only on the fixed score, after the story has taken the back off: four
// lights (the score in binary) worth 8 4 2 1, and the +1 rolling in from the
// right. On a lit light it switches it off and carries the 1 on; on a dark
// one it lights it and stops. 0111 + 1 is the dominoes. The empty socket is
// where Santa's chip goes — and it is the button that puts it in.

const WORTH = [8, 4, 2, 1];
const Inside: React.FC<{ digits: number[]; frame: Frame | null }> = ({ digits, frame }) => {
  const carry = frame ? frame.carry : null;
  const did = frame?.did;
  return (
    <div className="mt-2 rounded-lg border border-[#2a2540] bg-[#0b0a14] px-2 pb-1 pt-1" style={{ containerType: 'inline-size' }}>
      <div className="text-[0.625rem] uppercase tracking-widest text-gray-400">the score, in lights</div>
      <div className="relative grid grid-cols-4" style={{ height: '6cqw' }}>
        {Array.from({ length: COLS }, (_, i) => (
          <div key={i} className="flex items-end justify-center">
            {carry === i && (
              <motion.span layoutId="adder-carry" transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="rounded-full bg-amber-400 px-1.5 text-[0.625rem] font-bold leading-snug text-black">
                {frame?.first ? '+1' : 'carry 1'}
              </motion.span>
            )}
          </div>
        ))}
        {carry === -1 && (
          <motion.span className="absolute left-0 top-0 rounded-full bg-amber-400 px-1.5 text-[0.625rem] font-bold text-black"
            initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: '-6cqw', y: '12cqw', opacity: 0, rotate: -40 }} transition={{ duration: 0.9, ease: 'easeIn' }}>
            carry 1
          </motion.span>
        )}
      </div>
      <div className="grid grid-cols-4">
        {digits.map((b, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="rounded-full transition-all duration-150" style={{
              width: '8cqw', height: '8cqw',
              background: b ? 'radial-gradient(circle at 35% 30%, #fff7d6, #fbbf24 45%, #b45309)' : '#1f1d2e',
              boxShadow: b ? '0 0 12px rgba(251,191,36,.6)' : 'inset 0 1px 3px rgba(0,0,0,.6)',
              outline: did?.col === i ? '2px solid #38bdf8' : 'none', outlineOffset: 3,
            }} />
            <span className="text-[0.6875rem]" style={{ fontFamily: MONO, color: b ? '#fde68a' : '#4b5563' }}>{WORTH[i]}</span>
          </div>
        ))}
      </div>
      <p className="min-h-[1.25rem] text-center text-[0.75rem] text-sky-200">
        {/* it only speaks while a carry rolls — "8 + 2 = 10" under every
            fish read as homework */}
        {carry === -1 ? 'no light left — the carry fell out of bed 🛏️'
          : did && !did.xor ? 'carry the 1 ←' : ''}
      </p>
    </div>
  );
};

export const AdderToy: React.FC<{
  v: number; best: number; fell: boolean; want: boolean; live: boolean;
  onChange: (v: number, best: number, fell: boolean) => void;
  /** the score with its carry chip burnt out, and how many fish it has eaten */
  broken?: boolean; fish?: number;
}> = ({ v, best, fell, want, live, onChange, broken = false, fish }) => {
  const still = useReducedMotion();
  const [run, setRun] = useState<Run>(() => freshRun(1, broken ? 0 : 1));
  const runRef = useRef(run);
  const [ready, setReady] = useState(true);
  const [ate, setAte] = useState(0);
  const [hist, setHist] = useState<number[]>([]);
  const [pop, setPop] = useState<{ id: number; text: string; bad: boolean } | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  // Getting past 1 is what she wanted all chapter, so the game says so.
  const cheer = (nv: number) => {
    if (broken) return;
    const text = nv === 2 && best < 2 ? 'NEW HIGH SCORE!' : null;
    if (text) { setBanner(text); window.setTimeout(() => setBanner((b) => (b === text ? null : b)), 2200); }
  };
  const ripple = useRipple((nv, f) => {
    cheer(nv);
    onChange(nv, Math.max(best, nv), fell || f);
  }, broken, 110);
  const eat = () => {
    setAte((a) => a + 1);
    if (broken || still) {
      // the broken score has no carry to show, so it answers at once
      const fr = addOne(v, broken); const last = fr[fr.length - 1]; const nv = value(last.d);
      const dropped = nv < v;
      setPop({ id: Date.now(), text: dropped ? `${nv}?!` : '+1', bad: dropped });
      if (broken) setHist((h) => [...h, nv].slice(-9));
      cheer(nv);
      onChange(nv, Math.max(best, nv), fell || last.carry === -1);
      return;
    }
    setPop({ id: Date.now(), text: '+1', bad: false });
    ripple.play(ripple.finish() ?? v);
  };
  const eatRef = useRef(eat); eatRef.current = eat;

  // One clock, and only on the live card (one cat on screen at a time).
  useEffect(() => {
    if (!live || ready) return;
    const id = window.setInterval(() => {
      const { run: next, ate: got } = stepRun(runRef.current);
      if (next !== runRef.current) { runRef.current = next; setRun(next); }
      if (got) eatRef.current();
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [live, ready]);

  const steer = (d: number) => {
    const next = { ...runRef.current, want: d };
    runRef.current = next; setRun(next); setReady(false);
  };
  const steerRef = useRef(steer); steerRef.current = steer;
  // Arrow keys: an accelerator for a keyboard, never the only way.
  useEffect(() => {
    if (!live) return;
    const key: Record<string, number> = { ArrowUp: 1, ArrowRight: 2, ArrowDown: 3, ArrowLeft: 4 };
    const onKey = (e: KeyboardEvent) => { const d = key[e.key]; if (d) { e.preventDefault(); steerRef.current(d); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [live]);

  if (!live) return <p className="py-1 text-center text-[0.8125rem] text-gray-400">🐱 the cat is still eating further down ↓</p>;

  const digits = ripple.frame ? ripple.frame.d : bits(v);
  // The arcade score changes the moment the carry lands — a cold read once
  // caught the lights saying 1 while SCORE still said 0.
  const f = ripple.frame;
  const shown = f && (f.carry === null || f.carry === -1) ? value(f.d) : v;
  return (
    <div>
      <MazeScreen run={run} ready={ready} score={shown} eaten={broken ? fish ?? ate : ate} pop={pop} banner={banner} onSteer={steer}
        beckon={want && ready} hist={broken ? hist : undefined} />
      {!broken && <Inside digits={digits} frame={ripple.frame} />}
      <Pad onDir={steer} beckon={false} />
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
  // A puzzle glows WHERE to play, never the answer. It used to glow teeth,
  // then please, then the cat, one at a time, and a cold read said "I'm not
  // working anything out, I'm just following the yellow light". Now the row
  // of switches glows until the first poke, and only the chip glows itself.
  const touched = teeth || please || cat || seenNice;
  const glow: 'row' | 'chip' | null = heist ? null : seenNice && seenNaughty ? 'chip' : !touched ? 'row' : null;
  const sw = (k: 'teeth' | 'please' | 'cat', emoji: string, label: string) => {
    const on = { teeth, please, cat }[k];
    return (
      <button
        onClick={() => flip(k)}
        aria-label={`${label}: ${on ? 'yes' : 'no'}`}
        className="flex flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 rounded-xl border bg-[#100e1c] py-1.5"
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
      <div className={`flex gap-2 rounded-xl ${glow === 'row' ? 'beckon' : ''}`}>
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
            // the chip itself is what you grab — a "take the chip" button read
            // to a cold reviewer as "just a button to click"
            <button onClick={() => onChange({ heist: true })} aria-label="pull the AND chip out of the machine"
              className={`flex min-h-[56px] w-full touch-manipulation items-center justify-center gap-3 rounded-xl border border-amber-400/60 bg-[#14110a] ${glow === 'chip' ? 'beckon' : ''}`}>
              <span className="flex flex-col items-center" aria-hidden>
                <span className="flex gap-[3px]">{[0, 1, 2, 3, 4, 5, 6].map((k) => <span key={k} className="h-1.5 w-1 bg-gray-400" />)}</span>
                <span className="rounded-sm bg-[#111] px-2.5 py-0.5 text-[0.6875rem] font-bold tracking-widest text-gray-200" style={{ fontFamily: MONO }}>AND</span>
                <span className="flex gap-[3px]">{[0, 1, 2, 3, 4, 5, 6].map((k) => <span key={k} className="h-1.5 w-1 bg-gray-400" />)}</span>
              </span>
              <span className="text-[0.875rem] font-semibold text-amber-200">🔧 pull the chip out</span>
            </button>
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
