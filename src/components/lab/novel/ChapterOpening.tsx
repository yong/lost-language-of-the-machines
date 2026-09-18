// ChapterOpening — the way into a chat chapter, as a VERTICAL PAGER.
//
// Swipe UP for the next page, DOWN for the one before, and the page follows
// your thumb the whole way. This is the idiom every phone-native reader already
// knows (Reels, Shorts, Stories), and it is what "mobile" meant in the ask — a
// tap target is still a button with a bigger hit box, however invisible the
// button is.
//
// WHAT THE PAGES ARE. Some scenes cannot be established in dialogue. "The
// museum basement smelled of dust and old electricity" is not a text message,
// and faking it as one ("omg this basement smells insane") buys atmosphere by
// making a character stupid. So prose keeps the establishing beat:
//
//   0  the cover
//   1  the paragraph, with her phone lying on the page at the end of it
//   →  the thread
//
// THE LAST PAGE TURN IS NOT A SLIDE. Swiping up off the paper takes the room
// dark and morphs the phone open, because that transition IS the handoff:
// theme.ts calls PAGE "the warm page you read on" and the chat is a lit screen
// in a dark room, so the paper going out and the phone staying lit needs no
// explaining. The phone's header and the chat's header share a layoutId, so one
// BECOMES the other. The header is the right thing to share and the first
// bubble is not — the reader IS Starlax (her messages sit right), so a
// notification of her own message would be a lie.
//
// DRAG, DON'T DETECT, AND SHOW WHAT IS COMING. The pages live on one TRACK
// that moves with the finger, so the next page is already on screen, rising
// from below, before you have decided to go there. An AnimatePresence slide
// looks similar in a screenshot and feels nothing like it: the outgoing page
// moves but the space it leaves is empty, because the next page does not
// mount until you commit. Release past ~18% of the screen, or with real
// velocity, commits; anything less springs back.
//
// Tap and keyboard still work — they are unadvertised fallbacks, so a
// keyboard, a screen reader or a reader who does not think to swipe is never
// stuck, but nothing on screen is a pill any more.
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, PanInfo } from 'framer-motion';
import { PIXEL_FONT, PAGE } from '@/components/lab/world/theme';

export type OpeningPhase = 'cover' | 'page';
const PAGES: OpeningPhase[] = ['cover', 'page'];

const NIGHT = '#12101f';
/** Darker than the chat's own ground, so as the paper goes out the phone is
 *  plainly the only thing left lit. */
const DARKROOM = '#08070f';
const DARKEN_MS = 420;

/** Commit a page turn past this much of the screen, or this much flick. */
const COMMIT_FRACTION = 0.18;
const COMMIT_VELOCITY = 450;

const SPRING = { type: 'spring' as const, stiffness: 320, damping: 34, mass: 0.9 };

/** The phone, face up on the page. Still a real button underneath so a
 *  keyboard has something to press — it just does not look like one. */
const Phone: React.FC<{ leaving: boolean; onOpen: () => void }> = ({ leaving, onOpen }) => (
  <motion.button
    layoutId="novel-chat-header-shell"
    onClick={(e) => { e.stopPropagation(); onOpen(); }}
    aria-label="open the conversation with Flamey"
    className="relative mt-8 w-full max-w-[260px] overflow-hidden rounded-[1.5rem] border text-left"
    style={{ backgroundColor: NIGHT, borderColor: leaving ? 'rgba(56,134,196,.55)' : 'rgba(44,36,22,.25)' }}
    initial={{ opacity: 0, y: 16 }}
    animate={{
      opacity: 1,
      y: 0,
      boxShadow: leaving
        ? '0 0 55px rgba(56,134,196,.35), 0 16px 40px rgba(0,0,0,.55)'
        : '0 10px 30px rgba(44,36,22,.18)',
    }}
    transition={{ duration: leaving ? DARKEN_MS / 1000 : 0.5, ease: 'easeOut' }}
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
      {[62, 44, 78].map((w, i) => (
        <div key={i} className="h-2.5 rounded-full bg-[#26223a]" style={{ width: `${w}%` }} />
      ))}
    </div>
  </motion.button>
);

/** Says which way to go without being a control. Drifts upward, because that
 *  is the direction it is asking for. */
const SwipeHint: React.FC<{ tone: 'light' | 'dark'; label: string }> = ({ tone, label }) => (
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
    >︿</motion.span>
    {label}
  </motion.div>
);

export interface OpeningProps {
  phase: OpeningPhase;
  onAdvance: (next: OpeningPhase) => void;
  onEnter: () => void;
  image: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  handoffLine: string;
  onBack: () => void;
}

const ChapterOpening: React.FC<OpeningProps> = ({
  phase, onAdvance, onEnter, image, eyebrow, title, paragraphs, handoffLine, onBack,
}) => {
  /** the room going dark, phone still lit, just before the morph */
  const [leaving, setLeaving] = useState(false);
  /** one page's height in px — the track moves in whole screens */
  const [h, setH] = useState(0);
  const y = useMotionValue(0);
  // A drag is followed by a click, so every swipe also fired the tap fallback
  // — swiping DOWN went back a page and then straight forward again. Same
  // shape as the grid's pointerdown/click collision. framer only fires
  // onDragStart once past its threshold, so a real tap still gets through.
  const dragging = useRef(false);
  const i = PAGES.indexOf(phase);

  // The prose only becomes a scroll box WHEN IT ACTUALLY OVERFLOWS. Left
  // permanently scrollable it swallowed the gesture: on a 390x844 screen the
  // prose fits, so a swipe starting on the words scrolled nothing and the page
  // did not turn — a dead zone over the biggest target on the page, exactly
  // where a thumb lands.
  const prose = useRef<HTMLDivElement>(null);
  const [proseScrolls, setProseScrolls] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = prose.current;
      if (el) setProseScrolls(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const t = window.setTimeout(check, 250);   // after fonts settle
    window.addEventListener('resize', check);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', check); };
  }, [h, phase]);

  useEffect(() => {
    const measure = () => setH(window.innerHeight);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Keep the track under whatever page we are on, however we got here — a
  // swipe, the arrow, or coming back out of the thread.
  useEffect(() => {
    if (!h) return;
    animate(y, -i * h, SPRING);
  }, [i, h, y]);

  const openPhone = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onEnter, DARKEN_MS);
  };

  const goTo = (n: number) => {
    if (leaving) return;
    if (n > PAGES.length - 1) { openPhone(); return; }   // up off the last page
    if (n < 0) { onBack(); return; }                     // down off the front
    onAdvance(PAGES[n]);
  };

  /** the tap fallback, deaf to the click that trails a swipe */
  const tapForward = () => {
    if (dragging.current) { dragging.current = false; return; }
    goTo(i + 1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.y) > (h || 800) * COMMIT_FRACTION;
    const fast = Math.abs(info.velocity.y) > COMMIT_VELOCITY;
    if (!far && !fast) { animate(y, -i * h, SPRING); return; }  // springs back
    goTo(info.offset.y < 0 ? i + 1 : i - 1);
    animate(y, -i * h, SPRING);   // if goTo changed phase the effect re-aims it
  };

  // Unadvertised fallback, so a keyboard is never stuck on a swipe.
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goTo(i - 1);
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') goTo(i + 1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  return (
    <motion.div
      // Both pages live on the track and are therefore always in the DOM, so
      // "which page am I on" cannot be read off the text. State it outright.
      data-phase={leaving ? 'leaving' : phase}
      className="relative overflow-hidden"
      style={{ height: '100dvh', touchAction: 'none' }}
      animate={{ backgroundColor: phase === 'page' ? (leaving ? DARKROOM : PAGE.paper) : NIGHT }}
      transition={{ duration: leaving ? DARKEN_MS / 1000 : 0.45, ease: 'easeInOut' }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); goTo(i - 1); }}
        aria-label="back to the page before"
        className={`absolute left-2 top-2 z-30 flex min-h-11 min-w-11 items-center justify-center rounded-full text-lg ${
          phase === 'page' ? 'text-[#2c2416]/55' : 'text-gray-400/80'
        }`}
      >←</button>

      {/* ONE TRACK, both pages on it, moving as a unit under the thumb. */}
      <motion.div
        drag={leaving ? false : 'y'}
        dragConstraints={{ top: -(PAGES.length - 1) * h, bottom: 0 }}
        dragElastic={0.22}
        onDragStart={() => { dragging.current = true; }}
        onDragEnd={onDragEnd}
        onClick={tapForward}
        style={{ y }}
        className="absolute inset-x-0 top-0"
      >
        {/* ── the cover ───────────────────────────────────────────────── */}
        <div className="relative flex w-full flex-col justify-end overflow-hidden" style={{ height: h || '100dvh' }}>
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            initial={{ scale: 1.08 }} animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,7,15,.95) 18%, rgba(8,7,15,.35) 55%, rgba(8,7,15,.55))' }} />
          <motion.div
            className="relative px-6 pb-8"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="text-[0.6875rem] uppercase tracking-[0.35em] text-amber-300/80">{eyebrow}</div>
            <h1 className="mt-2 text-5xl leading-none text-amber-100" style={{ fontFamily: PIXEL_FONT }}>{title}</h1>
          </motion.div>
          <div className="relative pb-7"><SwipeHint tone="dark" label="swipe up to begin" /></div>
        </div>

        {/* ── the paragraph, on paper, her phone at the end of it ─────── */}
        <div className="relative flex w-full flex-col justify-center px-6 py-10" style={{ height: h || '100dvh' }}>
          {/* The PHONE must never fall off the bottom: it is the way out of
              this page. So the prose gets its own scroll box and the phone sits
              below it, rather than the page growing past the screen. Without
              this a 320x568 phone (or a bumped font size) pushed the phone out
              of view entirely — and the page itself cannot scroll, because the
              page IS the drag surface. Measured at 24px root on a 320px screen:
              1293px of content in a 568px page. */}
          <div className="mx-auto flex w-full max-w-prose flex-col" style={{ maxHeight: '100%' }}>
            {/* the words go out as the light does; the phone does not */}
            <motion.div
              animate={{ opacity: leaving ? 0 : 1 }}
              transition={{ duration: DARKEN_MS / 1000 }}
              ref={prose}
              // Only when the words overflow do they take the gesture; when
              // they fit, the drag belongs to the page.
              className={`min-h-0 shrink ${proseScrolls ? 'overflow-y-auto' : 'overflow-visible'}`}
              style={{ color: PAGE.text, touchAction: proseScrolls ? 'pan-y' : 'none' }}
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

            {/* …and there it is, face up on the page — and it stays on it. */}
            <div className="shrink-0"><Phone leaving={leaving} onOpen={tapForward} /></div>
          </div>
          {!leaving && (
            <div className="absolute inset-x-0 bottom-5"><SwipeHint tone="light" label="swipe up to open it" /></div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChapterOpening;
