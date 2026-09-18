// ChapterOpening — the way into a chat chapter: a cover, a paragraph, and the
// phone she picks up at the end of it. Two pages, one tap each, no buttons.
//
// THE PROBLEM. Some scenes cannot be established in dialogue. "The museum
// basement smelled of dust and old electricity" is not a text message, and
// faking it as one ("omg this basement smells insane") buys atmosphere by
// making a character stupid. So the book keeps prose for the establishing beat
// and needs a way to hand off to the thread that is not a scene break.
//
// THE ANSWER IS IN THE PALETTE. theme.ts already calls PAGE "the warm page you
// read on"; the chat is a lit screen in a dark room. So the handoff is literal
// and needs no explaining: the paper darkens, and the phone lying on it is the
// only thing still lit. You were reading about Starlax; now you are holding
// what she is holding.
//
// THE PHONE IS NOT A PAGE OF ITS OWN. It used to be: a whole screen that
// appeared, sat for 1.2s and left again without the reader doing anything —
// 2.3 seconds of watching, every single read. The morph already carries the
// meaning, so the dwell bought nothing but a wait. The phone now lies ON THE
// PAPER, at the line where she picks it up, and tapping it darkens the room
// and opens it in ONE continuous motion. Same single tap, no middle page.
//
// AND IT IS WHY THE PHONE EXISTS AT ALL: it is the SIGN. There are no pills
// here. A sign says what happens next, which a gesture never can — but the
// whole screen is the tap target, so nobody has to aim at it. Both the cover's
// hint and the phone are real <button>s underneath, styled as objects rather
// than controls, so a keyboard or screen reader still has something to press.
//
// The morph is a real shared element — the phone's header card and the chat's
// own header share a layoutId, so one BECOMES the other. The header is the
// right thing to share and the first bubble is not: the reader IS Starlax (her
// messages sit right), so a notification of her own message would be a lie.
//
// Back is the caller's (novel.tsx): the arrow steps back a beat and swipe-right
// does the same. Reading is never one-way.
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIXEL_FONT, PAGE } from '@/components/lab/world/theme';

export type OpeningPhase = 'cover' | 'page';

const NIGHT = '#12101f';
/** Darker than the chat's own ground, so as the paper goes out the phone is
 *  plainly the only thing left lit. */
const DARKROOM = '#08070f';
/** How long the room takes to go dark before the thread takes over. Short: the
 *  morph is the point, and this is only the light going down behind it. */
const DARKEN_MS = 420;

/** The phone, face up on the page. A button, because it is the thing you press
 *  — it just does not look like one. */
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
      // it only starts glowing once the room starts going dark
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
    {/* unread, unreadable — the thread is behind the glass */}
    <div className="flex flex-col gap-1.5 p-3" style={{ minHeight: 76 }}>
      {[62, 44, 78].map((w, i) => (
        <div key={i} className="h-2.5 rounded-full bg-[#26223a]" style={{ width: `${w}%` }} />
      ))}
    </div>
  </motion.button>
);

/** A sign, not a control: it says what happens next without looking like a
 *  button, and is still a real button for anyone not using a thumb. */
const Hint: React.FC<{ onClick: () => void; children: React.ReactNode; tone: 'light' | 'dark' }> = ({
  onClick, children, tone,
}) => (
  <motion.button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.7 }}
    className={`flex min-h-11 items-center gap-2 text-[0.6875rem] uppercase tracking-[0.25em] ${
      tone === 'light' ? 'text-[#2c2416]/50' : 'text-amber-200/70'
    }`}
  >
    {children}
    <motion.span
      aria-hidden
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: 3, ease: 'easeInOut', delay: 1.2 }}
    >›</motion.span>
  </motion.button>
);

const Back: React.FC<{ onBack: () => void; tone: 'light' | 'dark' }> = ({ onBack, tone }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onBack(); }}
    aria-label="back to the page before"
    className={`absolute left-2 top-2 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full text-lg ${
      tone === 'light' ? 'text-[#2c2416]/55' : 'text-gray-400/80'
    }`}
  >←</button>
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
  onBack: () => void;
  swipeDown: (e: React.PointerEvent) => void;
  swipeUp: (e: React.PointerEvent) => void;
}

const ChapterOpening: React.FC<OpeningProps> = ({
  phase, onAdvance, onEnter, image, eyebrow, title, paragraphs, handoffLine, onBack, swipeDown, swipeUp,
}) => {
  /** the room going dark, with the phone still lit, just before the morph */
  const [leaving, setLeaving] = useState(false);

  const openIt = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onEnter, DARKEN_MS);
  };

  return (
    <motion.div
      onPointerDown={swipeDown}
      onPointerUp={swipeUp}
      className="relative flex flex-col overflow-hidden"
      style={{ height: '100dvh' }}
      animate={{ backgroundColor: phase === 'page' ? (leaving ? DARKROOM : PAGE.paper) : NIGHT }}
      transition={{ duration: leaving ? DARKEN_MS / 1000 : 0.5, ease: 'easeInOut' }}
    >
      <AnimatePresence mode="wait">
        {/* ── the cover ─────────────────────────────────────────────────── */}
        {phase === 'cover' && (
          <motion.div
            key="cover"
            onClick={() => onAdvance('page')}
            role="presentation"
            exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="relative flex h-full flex-col justify-end overflow-hidden"
          >
            <Back onBack={onBack} tone="dark" />
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              initial={{ scale: 1.08 }} animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,7,15,.95) 18%, rgba(8,7,15,.35) 55%, rgba(8,7,15,.55))' }} />
            <motion.div
              className="relative px-6 pb-10"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <div className="text-[0.6875rem] uppercase tracking-[0.35em] text-amber-300/80">{eyebrow}</div>
              <h1 className="mt-2 text-5xl leading-none text-amber-100" style={{ fontFamily: PIXEL_FONT }}>{title}</h1>
              <div className="mt-5"><Hint tone="dark" onClick={() => onAdvance('page')}>tap to begin</Hint></div>
            </motion.div>
          </motion.div>
        )}

        {/* ── the paragraph, on paper, with her phone at the end of it ──── */}
        {phase === 'page' && (
          <motion.div
            key="page"
            onClick={openIt}
            role="presentation"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex h-full flex-col justify-center overflow-y-auto px-6 py-10"
          >
            <Back onBack={onBack} tone="light" />
            <div className="mx-auto w-full max-w-prose">
              {/* the words go out as the light does; the phone does not */}
              <motion.div
                animate={{ opacity: leaving ? 0 : 1 }}
                transition={{ duration: DARKEN_MS / 1000 }}
                style={{ color: PAGE.text }}
              >
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
              </motion.div>

              {/* …and there it is, face up on the page. */}
              <Phone leaving={leaving} onOpen={openIt} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChapterOpening;
