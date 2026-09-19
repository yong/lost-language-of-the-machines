// Shared parts for the four ways into the chapter. Everything here is the
// SAME across variants on purpose — the same art, the same prose, the same
// phone — so that comparing them compares the TRANSITION and nothing else.
// See openings/index.ts for the four, and raw/opening-transition-experiment.md
// for what each one is testing.
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PIXEL_FONT, PAGE } from '@/components/lab/world/theme';
import BinarySnow from './BinarySnow';

export const NIGHT = '#12101f';
/** Darker than the chat's own ground, so the phone is plainly the lit thing. */
export const DARKROOM = '#08070f';
export const DARKEN_MS = 420;

export const SPRING = { type: 'spring' as const, stiffness: 320, damping: 34, mass: 0.9 };

/** Release past this much of the screen — or this much flick — commits. */
export const COMMIT_FRACTION = 0.18;
export const COMMIT_VELOCITY = 450;

export interface Content {
  image: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  handoffLine: string;
}

export interface VariantProps extends Content {
  phase: 'cover' | 'page';
  onAdvance: (next: 'cover' | 'page') => void;
  /** open the phone and hand over to the thread */
  onEnter: () => void;
  /** one beat back; from the cover this leaves the chapter */
  onBack: () => void;
}

/** The chapter's cover art, with the scrim that keeps the title legible over
 *  whatever the art happens to be doing. */
export const CoverArt: React.FC<{ image: string; kenBurns?: boolean; snow?: boolean }> = ({
  image, kenBurns = true, snow = true,
}) => (
  <>
    <motion.div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
      initial={kenBurns ? { scale: 1.08 } : false}
      animate={kenBurns ? { scale: 1 } : undefined}
      transition={{ duration: 6, ease: 'easeOut' }}
    />
    {/* under the scrim, so the title stays the brightest thing on the cover */}
    {snow && <BinarySnow />}
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(to top, rgba(8,7,15,.95) 18%, rgba(8,7,15,.35) 55%, rgba(8,7,15,.55))' }}
    />
  </>
);

export const CoverTitle: React.FC<{ eyebrow: string; title: string }> = ({ eyebrow, title }) => (
  <motion.div
    className="relative px-6"
    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.25 }}
  >
    <div className="text-[0.6875rem] uppercase tracking-[0.35em] text-amber-300/80">{eyebrow}</div>
    <h1 className="mt-2 text-5xl leading-none text-amber-100" style={{ fontFamily: PIXEL_FONT }}>{title}</h1>
  </motion.div>
);

/** The establishing prose. `scrolls` is measured by the caller, never assumed:
 *  a permanently-scrollable box inside a drag surface is a dead zone exactly
 *  where a thumb lands. */
export const Prose: React.FC<{
  paragraphs: string[]; handoffLine: string; dim: boolean;
  scrolls: boolean; boxRef: React.RefObject<HTMLDivElement | null>;
  tone?: 'ink' | 'light';
}> = ({ paragraphs, handoffLine, dim, scrolls, boxRef, tone = 'ink' }) => (
  <motion.div
    ref={boxRef}
    animate={{ opacity: dim ? 0 : 1 }}
    transition={{ duration: DARKEN_MS / 1000 }}
    className={`min-h-0 shrink ${scrolls ? 'overflow-y-auto' : 'overflow-visible'}`}
    style={{ color: tone === 'ink' ? PAGE.text : '#e7e2d4', touchAction: scrolls ? 'pan-y' : 'none' }}
  >
    {paragraphs.map((t, n) => (
      <p
        key={n}
        className={`text-[1.0625rem] leading-relaxed ${n ? 'mt-4' : ''} ${
          n === 0 ? '[&>span]:float-left [&>span]:pr-2 [&>span]:text-5xl [&>span]:leading-[0.85]' : ''
        }`}
      >
        {n === 0 ? (<><span style={{ fontFamily: PIXEL_FONT }}>{t.slice(0, 1)}</span>{t.slice(1)}</>) : t}
      </p>
    ))}
    <p className="mt-7 text-[1.0625rem] italic leading-relaxed">{handoffLine}</p>
  </motion.div>
);

/** Her phone, face up. The header inside it shares a layoutId with the chat's
 *  own header, so one BECOMES the other — the header is the right thing to
 *  share and the first bubble is not, because the reader IS Starlax and a
 *  notification of her own message would be a lie. */
export const Phone: React.FC<{ lit: boolean; onOpen: () => void; className?: string }> = ({
  lit, onOpen, className = '',
}) => (
  <motion.button
    layoutId="novel-chat-header-shell"
    onClick={(e) => { e.stopPropagation(); onOpen(); }}
    aria-label="open the conversation with Flamey"
    className={`relative w-full max-w-[260px] overflow-hidden rounded-[1.5rem] border text-left ${className}`}
    style={{ backgroundColor: NIGHT, borderColor: lit ? 'rgba(56,134,196,.55)' : 'rgba(44,36,22,.25)' }}
    initial={{ opacity: 0, y: 16 }}
    animate={{
      opacity: 1, y: 0,
      boxShadow: lit
        ? '0 0 55px rgba(56,134,196,.35), 0 16px 40px rgba(0,0,0,.55)'
        : '0 10px 30px rgba(44,36,22,.18)',
    }}
    transition={{ duration: lit ? DARKEN_MS / 1000 : 0.5, ease: 'easeOut' }}
  >
    <motion.div
      layoutId="novel-chat-header"
      className="flex items-center gap-3 border-b border-gray-800 px-3 py-2.5"
      style={{ backgroundColor: '#0d0b17' }}
    >
      <motion.div layoutId="novel-chat-avatar" className="h-8 w-8 rounded-full bg-sky-900/60 text-center text-lg leading-8">
        🤖
      </motion.div>
      <motion.div layout>
        <div className="text-sm text-gray-100">Flamey</div>
        <div className="text-[0.625rem] text-gray-400">online</div>
      </motion.div>
    </motion.div>
    <div className="flex flex-col gap-1.5 p-3" style={{ minHeight: 76 }}>
      {[62, 44, 78].map((w, n) => (
        <div key={n} className="h-2.5 rounded-full bg-[#26223a]" style={{ width: `${w}%` }} />
      ))}
    </div>
  </motion.button>
);

/** Says which way to go without being a control. */
export const Hint: React.FC<{ tone: 'light' | 'dark'; label: string; arrow?: string }> = ({
  tone, label, arrow = '︿',
}) => (
  <motion.div
    aria-hidden
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
    className={`flex flex-col items-center gap-1 text-[0.6875rem] uppercase tracking-[0.25em] ${
      tone === 'light' ? 'text-[#2c2416]/45' : 'text-amber-200/60'
    }`}
  >
    <motion.span
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 1.6, repeat: 4, ease: 'easeInOut', delay: 1.4 }}
      className="text-base leading-none"
    >{arrow}</motion.span>
    {label}
  </motion.div>
);

export const BackArrow: React.FC<{ onBack: () => void; tone: 'light' | 'dark' }> = ({ onBack, tone }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onBack(); }}
    aria-label="back to the page before"
    className={`absolute left-2 top-2 z-30 flex min-h-11 min-w-11 items-center justify-center rounded-full text-lg ${
      tone === 'light' ? 'text-[#2c2416]/55' : 'text-gray-400/80'
    }`}
  >←</button>
);

/** Measure whether the prose actually overflows. Never assume it: left
 *  permanently scrollable it swallows the gesture on a screen where it fits. */
export const useProseOverflow = (deps: unknown[] = []) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (el) setScrolls(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const t = window.setTimeout(check, 250);      // after fonts settle
    window.addEventListener('resize', check);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', check); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { ref, scrolls };
};

/** Arrow keys and space, as an unadvertised fallback so a keyboard is never
 *  stuck behind a swipe. */
export const useKeys = (forward: () => void, backward: () => void) => {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'PageUp') backward();
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') forward();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
};
