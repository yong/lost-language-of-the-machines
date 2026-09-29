// overflow-toys.tsx — the three toys for "A Number Can Run Out of Room".
//
// Every one of them is the same move in a different costume: a box with a fixed
// number of windows, and a number pushed one past what fits. The reader never
// reads that sentence; they do it four times and it becomes obvious.
//
// Thumb notes (CLAUDE.md): the raw px below are TAP sizes and stay px on
// purpose — a 44px target is a physical dimension and must not move with the
// reader's font setting. Everything carrying text is rem or cqw.
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const RED = '#ff4d4d';
const GREEN = '#37f08a';

/** A push button big enough for a thumb.
 *
 *  `beckon` makes it GLOW until it has been pressed — the button the story is
 *  waiting on. A kid who tried the chapter did not realise the +1¢ button was
 *  something to press: an amber box sitting beside two others says nothing.
 *  Only one button beckons at a time, and it stops the moment it has done its
 *  job, so it never becomes a moving target. Reduced motion: a steady glow. */
const Push: React.FC<{ onClick: () => void; children: React.ReactNode; tone?: 'amber' | 'ghost'; label?: string; beckon?: boolean }> =
  ({ onClick, children, tone = 'amber', label, beckon = false }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex-1 touch-manipulation rounded-lg border px-3 text-[0.9375rem] font-semibold transition-colors active:brightness-125 ${beckon ? 'beckon' : ''}`}
      style={{
        minHeight: 44,
        borderColor: tone === 'amber' ? '#fbbf24' : '#3f3a56',
        background: beckon ? 'rgba(251,191,36,.30)' : tone === 'amber' ? 'rgba(251,191,36,.16)' : '#15122a',
        color: tone === 'amber' ? '#fde68a' : '#a5a1bd',
      }}
    >
      {beckon && (
        <style>{`
          @keyframes beckon { 0%, 100% { box-shadow: 0 0 0 0 rgba(251,191,36,.0), 0 0 8px 2px rgba(251,191,36,.45) }
                              50% { box-shadow: 0 0 0 5px rgba(251,191,36,.4), 0 0 28px 10px rgba(251,191,36,.75) } }
          .beckon { animation: beckon 1.4s ease-in-out infinite }
          @media (prefers-reduced-motion: reduce) { .beckon { animation: none; box-shadow: 0 0 14px 4px rgba(251,191,36,.5) } }
        `}</style>
      )}
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
//
// One more cent is TEN dollars, and ten needs a window the sign does not have.
// So the picture is the nursery song: ten in the bed, the little one said
// "roll over", they all rolled over and one fell out. The leading 1 squeezes
// in at the edge, tips over and drops out of the sign, and it stays lying on
// the floor under it — the lost digit is something you can SEE, not a
// sentence. ("Roll over" is also what engineers really call this.)

export const PumpToy: React.FC<{
  cents: number; wrapped: boolean; onChange: (cents: number, wrapped: boolean) => void;
}> = ({ cents, wrapped, onChange }) => {
  // Counts roll-overs seen in THIS visit, so each one replays the fall. A
  // restored reader who already rolled it over finds the 1 lying there, still.
  const [falls, setFalls] = useState(0);
  const still = useReducedMotion();
  const bump = (n: number) => {
    const next = cents + n;
    if (next > 999) setFalls((f) => f + 1);
    onChange(next % 1000, wrapped || next > 999);
  };
  const shown = `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, '0')}`;
  const rolled = cents < 100 && wrapped;
  return (
    <div>
      {/* the floor under the sign is always reserved, so nothing jumps when
          the 1 lands on it */}
      <div className="relative mx-auto max-w-[260px] pb-[16cqw]" style={{ containerType: 'inline-size' }}>
        <Window text={shown} colour={rolled ? GREEN : RED} size={30} />
        <div className="absolute inset-x-2 bottom-[5cqw] h-px bg-white/10" />
        {wrapped && (
          <motion.span
            key={falls}
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: '2cqw', top: '1cqw', fontFamily: PIXEL_FONT, fontSize: '30cqw', lineHeight: 1, color: '#fbbf24', transformOrigin: '50% 90%' }}
            initial={falls === 0 || still ? false : { x: '0cqw', y: '0cqw', rotate: 0 }}
            animate={{ x: ['0cqw', '-1cqw', '1cqw', '14cqw'], y: ['0cqw', '-3cqw', '-3cqw', '28cqw'], rotate: [0, -6, -14, -90] }}
            transition={{ duration: 1.1, times: [0, 0.2, 0.45, 1], ease: 'easeIn' }}
          >
            1
          </motion.span>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-[0.6875rem] text-gray-500">
        <span>four windows: 9 · 9 · 9 and a dot</span>
        <span style={{ fontFamily: MONO }}>{cents}¢</span>
      </div>
      <div className="mt-3 flex gap-2">
        <Push onClick={() => bump(1)} label="put the price up one cent" beckon={!wrapped}>+1¢</Push>
        <Push onClick={() => bump(10)} label="put the price up ten cents">+10¢</Push>
        <Push tone="ghost" onClick={() => onChange(990, wrapped)} label="set the price back to 9.90">9.90</Push>
      </div>
      {wrapped && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-[0.8125rem] text-amber-300">
          roll over! the <span style={{ fontFamily: MONO }}>1</span> fell out. there was no window for it.
        </motion.p>
      )}
    </div>
  );
};

// ── 2. two digits for a year ────────────────────────────────────────────────
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
          <Push onClick={() => onChange(Math.min(at + 1, YEARS.length - 1), wide)} label="next year" beckon={at < YEARS.length - 1}>next year →</Push>
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

// ── 3. the cartridge's score ────────────────────────────────────────────────
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
          <Push onClick={() => onChange(score + 50, bytes)} label="score fifty points" beckon={score < 256}>+50 points</Push>
          <Push
            tone={bytes === 1 ? 'amber' : 'ghost'}
            beckon={score >= 256 && bytes === 1}
            onClick={() => onChange(score, bytes === 1 ? 2 : 1)}
            label={bytes === 1 ? 'give the score a second byte' : 'take the second byte away'}
          >
            {bytes === 1 ? 'add a byte' : 'back to 1 byte'}
          </Push>
        </div>
      </div>
    );
  };
