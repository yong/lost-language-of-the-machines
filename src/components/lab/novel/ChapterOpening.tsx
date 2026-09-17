// ChapterOpening — the way into a chat chapter: cover, a paragraph, then the
// phone.
//
// THE PROBLEM. Some scenes cannot be established in dialogue. "The museum
// basement smelled of dust and old electricity" is not a text message, and
// faking it as one ("omg this basement smells insane") buys atmosphere by
// making a character stupid. So the book keeps prose for the establishing beat
// and needs a way to hand off to the thread that is not a scene break.
//
// THE ANSWER IS IN THE PALETTE. theme.ts already calls PAGE "the warm page you
// read on"; the chat is a lit screen in a dark room. So the handoff is literal
// and needs no explaining: the paper darkens, a phone lights up on it, and the
// conversation is already on the phone. You were reading about Starlax; now you
// are holding what she is holding.
//
// The morph is a real shared element — the little phone's header card and the
// chat's own header share a layoutId, so one becomes the other rather than one
// replacing the other. That is why the header is the handoff object and not,
// say, the first bubble: the reader IS Starlax (her messages sit right), so a
// notification of her own message would be a lie.
//
// THE WHOLE SCREEN IS THE TAP TARGET, on every phase. The pill is the SIGN —
// it says what happens next, which a gesture never can — but nobody has to aim
// at it. That is the chat-fiction standard (logged in the pacing experiment)
// and the thread already worked this way; the cover and the paragraph did not,
// so a reader learned "aim at the button" and then had it change under them.
//
// Deliberately NOT swipe. A swipe is invisible, so a young reader has to be
// told it exists; horizontal swipe collides with iOS Safari's edge-swipe-back
// and would throw the reader out of the book; and vertical swipe is scroll,
// which is the reader's own instrument here. The one gesture in the chapter is
// drag-to-paint on the grid, because that one is drawing, not navigating.
//
// THE PHONE IS A TRANSITION, NOT A SCREEN. It used to end in an "open it →"
// button, which made two taps in a row — the reader had already said continue,
// and the second tap bought nothing but a stop in the middle of the handoff.
// The darkening, the phone lighting up and the morph are now one answer to one
// tap. A tap anywhere during it skips to the end, so it never traps anyone.
//
// The cover and the paragraph still wait for a tap, because those are places a
// reader is READING. Nothing is being read here. And a reader returning
// mid-chapter never sees any of it; novel.tsx skips straight to the thread.
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIXEL_FONT, PAGE } from '@/components/lab/world/theme';

export type OpeningPhase = 'cover' | 'page' | 'phone';

/** How long the phone gets before it opens itself. The card lands at ~0.9s, so
 *  this is that plus a short hold — long enough to register as "her phone lit
 *  up", short enough that nobody is waiting on it. Measured end to end: tap to
 *  a readable conversation, hands off. */
const PHONE_MS = 1200;

const NIGHT = '#12101f';
/** Darker than the chat's own ground, so the phone reads as the lit thing in
 *  the room rather than a card on a surface of the same colour. */
const DARKROOM = '#08070f';
const CHROME = '#0d0b17';

/** The chat header, drawn once and shared. In `phone` it is a card on a dark
 *  screen; in the thread it is the real header. Same layoutId, so framer-motion
 *  moves and resizes the one element instead of cross-fading two. */
export const HandoffHeader: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <motion.div
    layoutId="novel-chat-header"
    className={`flex items-center gap-3 border-b border-gray-800 px-4 ${compact ? 'py-2.5' : 'py-3'}`}
    style={{ backgroundColor: CHROME }}
  >
    <motion.div layoutId="novel-chat-avatar" className="h-8 w-8 rounded-full bg-sky-900/60 text-center text-lg leading-8">
      🤖
    </motion.div>
    <motion.div layout>
      <div className="text-sm text-gray-100">Flamey</div>
      <div className="text-[0.625rem] text-gray-400">online</div>
    </motion.div>
  </motion.div>
);

/** A tap target that pulses twice and then stops. Perpetual motion is both a
 *  moving target for a thumb and the distraction the static decision removed. */
const TONES = {
  // The colour carries the handoff too: warm while we are in the story, and
  // the chat's own blue from the moment the phone is the thing on screen.
  amber: 'bg-amber-400/90 text-[#1a1408]',
  light: 'bg-[#2c2416] text-[#fdf6e3]',
  dark: 'bg-sky-700 text-white',
};
const Pill: React.FC<{ onClick: () => void; children: React.ReactNode; tone?: keyof typeof TONES }> = ({
  onClick, children, tone = 'dark',
}) => (
  <motion.button
    onClick={onClick}
    animate={{ scale: [1, 1.045, 1] }}
    transition={{ duration: 1.4, repeat: 2, ease: 'easeInOut', delay: 0.5 }}
    className={`min-h-11 rounded-full px-6 text-center text-sm leading-tight ${TONES[tone]}`}
  >
    {children}
  </motion.button>
);

export interface OpeningProps {
  phase: OpeningPhase;
  onAdvance: (next: OpeningPhase) => void;
  onEnter: () => void;
  image: string;
  eyebrow: string;
  title: string;
  /** The establishing prose. First paragraph gets the drop cap. */
  paragraphs: string[];
  /** The last line, set apart — it is what puts the phone in her hand. */
  handoffLine: string;
  /** One beat back. Reading is never one-way. */
  onBack: () => void;
  swipeDown: (e: React.PointerEvent) => void;
  swipeUp: (e: React.PointerEvent) => void;
}

/** The phone beat. Its own component so that MOUNTING it starts the clock —
 *  AnimatePresence mode="wait" holds the mount back until the paper has
 *  finished leaving, and a timer started at the tap instead fired while the
 *  card was still sliding in, so the phone opened before anyone had seen it.
 *  onEnter is held in a ref: callers pass an inline arrow, and a fresh identity
 *  every render would re-run the effect and restart the timer forever. */
const PhoneBeat: React.FC<{ onEnter: () => void; children: React.ReactNode }> = ({ onEnter, children }) => {
  const enter = useRef(onEnter);
  enter.current = onEnter;
  useEffect(() => {
    const t = window.setTimeout(() => enter.current(), PHONE_MS);
    return () => window.clearTimeout(t);
  }, []);
  return <>{children}</>;
};

/** The way back out of a phase, in the corner, 44px, and above the
 *  whole-screen tap so it never advances by accident. */
const Back: React.FC<{ onBack: () => void; tone: 'light' | 'dark' }> = ({ onBack, tone }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onBack(); }}
    aria-label="back to the page before"
    className={`absolute left-2 top-2 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full text-lg ${
      tone === 'light' ? 'text-[#2c2416]/55' : 'text-gray-400/80'
    }`}
  >←</button>
);

const ChapterOpening: React.FC<OpeningProps> = ({
  phase, onAdvance, onEnter, image, eyebrow, title, paragraphs, handoffLine, onBack, swipeDown, swipeUp,
}) => {
  return (
  // The ground animates paper -> night. That single colour carries the whole
  // transition: it is the room's lights going down, and the phone is the only
  // thing left lit.
  <motion.div
    onPointerDown={swipeDown}
    onPointerUp={swipeUp}
    className="relative flex flex-col overflow-hidden"
    style={{ height: '100dvh' }}
    animate={{ backgroundColor: phase === 'page' ? PAGE.paper : phase === 'phone' ? DARKROOM : NIGHT }}
    transition={{ duration: phase === 'phone' ? 0.8 : 0.5, ease: 'easeInOut' }}
  >
    <AnimatePresence mode="wait">
      {/* ── the cover ─────────────────────────────────────────────────── */}
      {phase === 'cover' && (
        <motion.div
          key="cover"
          onClick={() => onAdvance('page')}
          role="presentation"
          exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
          className="relative flex h-full flex-col justify-end overflow-hidden"
        >
          <Back onBack={onBack} tone="dark" />
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            initial={{ scale: 1.08 }} animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
          />
          {/* the title has to stay legible over whatever the art is doing */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,7,15,.95) 18%, rgba(8,7,15,.35) 55%, rgba(8,7,15,.55))' }} />
          <motion.div
            className="relative px-6 pb-10"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="text-[0.6875rem] uppercase tracking-[0.35em] text-amber-300/80">{eyebrow}</div>
            <h1 className="mt-2 text-5xl leading-none text-amber-100" style={{ fontFamily: PIXEL_FONT }}>{title}</h1>
            <div className="mt-7"><Pill tone="amber" onClick={() => onAdvance('page')}>begin →</Pill></div>
          </motion.div>
        </motion.div>
      )}

      {/* ── the paragraph, on paper ───────────────────────────────────── */}
      {phase === 'page' && (
        <motion.div
          key="page"
          onClick={() => onAdvance('phone')}
          role="presentation"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex h-full flex-col justify-center overflow-y-auto px-6 py-10"
        >
          <Back onBack={onBack} tone="light" />
          <div className="mx-auto w-full max-w-prose" style={{ color: PAGE.text }}>
            {paragraphs.map((t, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className={`text-[1.0625rem] leading-relaxed ${i ? 'mt-4' : ''} ${
                  i === 0 ? '[&>span]:float-left [&>span]:pr-2 [&>span]:text-5xl [&>span]:leading-[0.85]' : ''
                }`}
              >
                {i === 0 ? (<><span style={{ fontFamily: PIXEL_FONT }}>{t.slice(0, 1)}</span>{t.slice(1)}</>) : t}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + paragraphs.length * 0.12 }}
              className="mt-7 text-[1.0625rem] italic leading-relaxed"
            >
              {handoffLine}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + paragraphs.length * 0.12 }}
              className="mt-9"
            >
              <Pill tone="light" onClick={() => onAdvance('phone')}>continue →</Pill>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ── the phone, lit, in the dark ───────────────────────────────── */}
      {phase === 'phone' && (
        <motion.div
          key="phone"
          onClick={onEnter}
          role="presentation"
          className="relative flex h-full flex-col items-center justify-center px-8"
        >
        <PhoneBeat onEnter={onEnter}>
          {/* the light it is throwing into the room */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120vw,520px)] w-[min(120vw,520px)] -translate-x-1/2 -translate-y-[58%] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(56,134,196,.22) 0%, rgba(56,134,196,.07) 42%, transparent 70%)' }}
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          />
          <motion.button
            onClick={onEnter}
            aria-label="open the conversation with Flamey"
            className="relative w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-sky-900/70 text-left"
            style={{ backgroundColor: NIGHT, boxShadow: '0 0 60px rgba(56,134,196,.28), 0 18px 50px rgba(0,0,0,.6)' }}
            initial={{ opacity: 0, y: 34, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* the element that becomes the real header */}
            <HandoffHeader compact />
            <div className="flex flex-col gap-1.5 p-3" style={{ minHeight: 96 }}>
              {/* unread, unreadable — the thread is behind the glass */}
              {[62, 44, 78].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-2.5 rounded-full bg-[#26223a]"
                  style={{ width: `${w}%` }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.7 + i * 0.09 }}
                />
              ))}
            </div>
          </motion.button>
        </PhoneBeat>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
  );
};

export default ChapterOpening;
