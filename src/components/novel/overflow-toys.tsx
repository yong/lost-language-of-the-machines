// overflow-toys.tsx — the four toys for "A Number Can Run Out of Room".
//
// Every one of them is the same move in a different costume: a box with a fixed
// number of windows, and a number pushed one past what fits. The reader never
// reads that sentence; they do it four times and it becomes obvious.
//
// Thumb notes (CLAUDE.md): the raw px below are TAP sizes and stay px on
// purpose — a 44px target is a physical dimension and must not move with the
// reader's font setting. Everything carrying text is rem or cqw.
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const RED = '#ff4d4d';
const GREEN = '#37f08a';

/** A push button big enough for a thumb. */
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

/** The lit window every toy in this chapter is really about: a fixed number of
 *  places, and nowhere to put a digit that does not fit. */
const Window: React.FC<{ text: string; colour: string; size?: number }> = ({ text, colour, size = 26 }) => (
  <div
    className="flex items-center justify-center rounded-md border border-black/60 bg-[#0a0c12] px-3"
    style={{ minHeight: 64, containerType: 'inline-size' }}
  >
    <span style={{ fontFamily: PIXEL_FONT, fontSize: `${size}cqw`, color: colour, letterSpacing: '0.06em' }}>
      {text}
    </span>
  </div>
);

// ── 1. the price sign ───────────────────────────────────────────────────────
// Four windows. Nine dollars ninety-nine is the largest thought it can have.

export const PumpToy: React.FC<{
  cents: number; wrapped: boolean; onChange: (cents: number, wrapped: boolean) => void;
}> = ({ cents, wrapped, onChange }) => {
  const bump = (n: number) => {
    const next = cents + n;
    onChange(next % 1000, wrapped || next > 999);
  };
  const shown = `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, '0')}`;
  const rolled = cents < 100 && wrapped;
  return (
    <div>
      <div className="mx-auto max-w-[260px]">
        <Window text={shown} colour={rolled ? GREEN : RED} size={30} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[0.6875rem] text-gray-500">
        <span>four windows: 9 · 9 · 9 and a dot</span>
        <span style={{ fontFamily: MONO }}>{cents}¢</span>
      </div>
      <div className="mt-3 flex gap-2">
        <Push onClick={() => bump(1)} label="put the price up one cent">+1¢</Push>
        <Push onClick={() => bump(10)} label="put the price up ten cents">+10¢</Push>
        <Push tone="ghost" onClick={() => onChange(990, wrapped)} label="set the price back to 9.90">9.90</Push>
      </div>
      {wrapped && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-[0.8125rem] text-amber-300">
          a <span style={{ fontFamily: MONO }}>1</span> fell off the end. there was no window for it.
        </motion.p>
      )}
    </div>
  );
};

// ── 2. the byte at the top of its range ─────────────────────────────────────
// Chapter One's row of eight, one tap from the edge of the world.

export const ByteToy: React.FC<{ value: number; wrapped: boolean; onChange: (v: number, wrapped: boolean) => void }> =
  ({ value, wrapped, onChange }) => {
    const carry = value === 0 && wrapped;
    return (
      <div>
        <div className="flex items-stretch gap-2">
          <div className="flex flex-1 gap-1">
            {[7, 6, 5, 4, 3, 2, 1, 0].map((bit) => {
              const on = ((value >> bit) & 1) === 1;
              return (
                <div
                  key={bit}
                  aria-label={`bit ${7 - bit} ${on ? 'on' : 'off'}`}
                  className="aspect-square flex-1 rounded border transition-colors"
                  style={{ minHeight: 30, background: on ? '#fbbf24' : '#0f0d1c', borderColor: on ? '#fbbf24' : '#374151' }}
                />
              );
            })}
          </div>
          {/* the switch that is not there. every byte has this missing ninth. */}
          <div
            className="flex w-8 items-center justify-center rounded border border-dashed"
            style={{ borderColor: carry ? '#f87171' : '#2b2740', background: carry ? 'rgba(248,113,113,.14)' : 'transparent' }}
          >
            <motion.span
              animate={carry ? { opacity: [0, 1, 0], y: [0, -14] } : { opacity: 0.25 }}
              transition={carry ? { duration: 1.1 } : undefined}
              className="text-[0.75rem]"
              style={{ fontFamily: MONO, color: carry ? '#f87171' : '#4b5563' }}
            >
              1
            </motion.span>
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between" style={{ fontFamily: MONO }}>
          <span className="text-amber-200">{value.toString(2).padStart(8, '0')}</span>
          <span className={`text-lg ${carry ? 'text-red-400' : 'text-gray-300'}`}>{value}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Push onClick={() => onChange((value + 1) & 255, wrapped || value === 255)} label="add one">+1</Push>
          <Push tone="ghost" onClick={() => onChange(250, wrapped)} label="go back to 250">back to 250</Push>
        </div>
        <p className="mt-2 text-center text-[0.6875rem] text-gray-500">
          eight switches, and no ninth to carry into
        </p>
      </div>
    );
  };

// ── 3. two digits for a year ────────────────────────────────────────────────
// The same box, wearing the most expensive costume in computing history.

const YEARS = [97, 98, 99, 0];

export const YearToy: React.FC<{ at: number; wide: boolean; onChange: (at: number, wide: boolean) => void }> =
  ({ at, wide, onChange }) => {
    const yy = YEARS[Math.min(at, YEARS.length - 1)];
    const full = wide ? 1900 + (yy < 50 ? 100 + yy : yy) : 1900 + yy;
    const age = full - 1985;
    const born = age >= 0;
    return (
      <div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-[128px]">
            <Window text={wide ? String(full) : String(yy).padStart(2, '0')} colour={born ? GREEN : RED} size={wide ? 22 : 34} />
          </div>
          <div className="text-left">
            <div className="text-[0.6875rem] uppercase tracking-wider text-gray-500">born &rsquo;85 &middot; age</div>
            <div className="text-2xl" style={{ fontFamily: MONO, color: born ? '#e5e7eb' : '#f87171' }}>{age}</div>
            {!born && <div className="text-[0.6875rem] text-red-400">NOT YET BORN</div>}
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Push onClick={() => onChange(Math.min(at + 1, YEARS.length - 1), wide)} label="next year">next year →</Push>
          <Push tone="ghost" onClick={() => onChange(0, false)} label="back to 1997">back to &rsquo;97</Push>
        </div>
        {at >= YEARS.length - 1 && (
          <button
            onClick={() => onChange(at, !wide)}
            className="mt-2 w-full touch-manipulation rounded-lg border border-sky-700 bg-sky-900/40 text-[0.875rem] text-sky-200"
            style={{ minHeight: 44 }}
          >
            {wide ? 'take the two digits back' : 'give the year four digits'}
          </button>
        )}
      </div>
    );
  };

// ── 4. the cartridge's score ────────────────────────────────────────────────
// The repair. Same bug, and this time the reader owns the machine.

export const ScoreToy: React.FC<{ score: number; bytes: number; onChange: (score: number, bytes: number) => void }> =
  ({ score, bytes, onChange }) => {
    const cap = bytes === 1 ? 256 : 65536;
    const shown = score % cap;
    const rolled = bytes === 1 && score >= 256;
    return (
      <div>
        <div className="rounded-md border border-amber-900/60 bg-[#08070f] p-3 text-center" style={{ containerType: 'inline-size' }}>
          <div className="text-[0.625rem] uppercase tracking-widest text-amber-500/70">catventure &middot; score</div>
          <div style={{ fontFamily: PIXEL_FONT, fontSize: '18cqw', color: rolled ? RED : '#fde68a' }}>
            {String(shown).padStart(bytes === 1 ? 3 : 5, '0')}
          </div>
          {rolled && shown < 50 && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[0.75rem] text-red-400">
              NEW RECORD
            </motion.div>
          )}
        </div>
        <div className="mt-2 flex items-baseline justify-between text-[0.6875rem] text-gray-500">
          <span>{bytes} byte{bytes > 1 ? 's' : ''} of room</span>
          <span style={{ fontFamily: MONO }}>holds up to {cap - 1}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Push onClick={() => onChange(score + 50, bytes)} label="score fifty points">+50 points</Push>
          <Push
            tone={bytes === 1 ? 'amber' : 'ghost'}
            onClick={() => onChange(score, bytes === 1 ? 2 : 1)}
            label={bytes === 1 ? 'give the score a second byte' : 'take the second byte away'}
          >
            {bytes === 1 ? 'add a byte' : 'back to 1 byte'}
          </Push>
        </div>
      </div>
    );
  };

// ── 5. level 256 ────────────────────────────────────────────────────────────
// The coda. Nova has been playing the cabinet all night and is on level 255.
// One more level and the counter — one byte — runs out of room, the game loses
// count of what to draw, and the right half of the maze fills with the
// cartridge's own insides. That is what happened to the most famous arcade
// game in the world, and it is true in both halves: the level is unwinnable
// (not enough dots left on the good side), and the "garbage" is the game's
// memory drawn as if it were maze tiles.
//
// The right half is NOT random. It is seeded with things the reader has already
// met — the cat's orange, the score's new ceiling, the full byte, the price on
// the sign — so the first time anyone in this book sees the cartridge's
// insides, they recognise their own numbers in it. And CATVENTURE is cut off at
// the edge of the screen, because of course it is.

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

// Deterministic, so the server and the phone draw the same garbage (CLAUDE.md:
// no Math.random at render). mulberry32 — small, and exact in 32-bit ints.
const mulberry32 = (a: number) => () => {
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
// Filler is symbols ONLY. With letters and digits in the noise, a stray "3 3" or
// "5 1" diluted the planted fragments until nobody could find them — and
// finding them is the point: it is the book's Act 1 move (search for a value
// you can see) arriving three chapters early.
const GLYPHS = '▓▒░█▚▞▙▟◆■▲●◢◣◤◥▌▐▀▄#%&@=+?$';
const JUNK = ['#fbbf24', '#f472b6', '#22d3ee', '#60a5fa', '#f5f5f4', '#a78bfa', '#f87171'];
const GARBAGE: { ch: string; c: string }[][] = (() => {
  const rnd = mulberry32(256);
  const g = Array.from({ length: 10 }, () =>
    Array.from({ length: 8 }, () => ({ ch: GLYPHS[Math.floor(rnd() * GLYPHS.length)], c: JUNK[Math.floor(rnd() * JUNK.length)] })));
  const put = (r: number, c0: number, s: string, c: string) =>
    [...s].forEach((ch, i) => { if (c0 + i < 8) g[r][c0 + i] = { ch, c }; });
  put(1, 0, 'FF 99 33', '#fb923c');    // the cat's orange
  put(3, 2, 'CATVENTURE', '#fde68a');  // runs off the edge: CATVEN
  put(5, 1, '65535', '#22d3ee');       // the score's new ceiling
  put(7, 0, '11111111', '#fbbf24');    // the byte that just ran out
  put(8, 3, '9.99', GREEN);            // the sign
  return g;
})();

export const LevelToy: React.FC<{ level: number; killed: boolean; onChange: (level: number, killed: boolean) => void }> =
  ({ level, killed, onChange }) => {
    const [tried, setTried] = useState(false);
    const showing = level > 255;
    const counter = level & 255;
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
            if (key === nova) {
              return <div key={key} className="flex items-center justify-center" style={{ fontSize: '4.4cqw' }}>🐱</div>;
            }
            if (showing && c >= 8) {
              const j = GARBAGE[r][c - 8];
              return (
                <div key={key} className="flex items-center justify-center"
                  style={{ fontFamily: PIXEL_FONT, fontSize: '4.6cqw', color: j.c, lineHeight: 1 }}>
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
            counter {counter.toString(2).padStart(8, '0')}
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          {showing ? (
            // Not a dead control: tapping it answers, because this is the
            // level nobody has ever finished and the kid deserves to be told.
            <Push onClick={() => setTried(true)} label="try to clear level 256">try to clear it</Push>
          ) : (
            <Push onClick={() => onChange(level + 1, killed || level + 1 > 255)} label="let nova clear the level">
              let her clear it
            </Push>
          )}
          <Push tone="ghost" onClick={() => { setTried(false); onChange(254, killed); }} label="start again at level 254">
            back to 254
          </Push>
        </div>
        {showing && tried && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center text-[0.8125rem] text-red-300">
            not enough dots on the good half. nobody ever has.
          </motion.p>
        )}
      </div>
    );
  };
