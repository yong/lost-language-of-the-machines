// B — STORIES. The Instagram/Snapchat treatment, and the one idea the others
// do not have: a SEGMENTED PROGRESS BAR. Three segments across the top say how
// many beats there are and which one you are on, before the reader has to
// wonder. Pages cross-dissolve with a small scale rather than sliding, and the
// left/right tap halves are the Stories convention — swipe still works.
//
// TESTING: is "how much is left" the thing the opening was actually missing?
// A kid who cannot see the end of a thing reads it differently from one who
// can, and this is the cheapest way in the world to show it.
import { useRef, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { PAGE } from '@/components/lab/world/theme';
import {
  BackArrow, COMMIT_FRACTION, COMMIT_VELOCITY, CoverArt, CoverTitle, DARKEN_MS, DARKROOM,
  NIGHT, Phone, Prose, useKeys, useProseOverflow, VariantProps,
} from './shared';

const Segments: React.FC<{ at: number; tone: 'light' | 'dark' }> = ({ at, tone }) => (
  <div className="absolute inset-x-0 top-0 z-30 flex gap-1 px-3 pt-3" aria-hidden>
    {[0, 1, 2].map((n) => (
      <div
        key={n}
        className="h-[3px] flex-1 overflow-hidden rounded-full"
        style={{ background: tone === 'light' ? 'rgba(44,36,22,.18)' : 'rgba(255,255,255,.18)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: tone === 'light' ? 'rgba(44,36,22,.75)' : 'rgba(253,230,138,.9)' }}
          initial={false}
          animate={{ width: n < at ? '100%' : n === at ? '100%' : '0%', opacity: n <= at ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
    ))}
  </div>
);

const Stories: React.FC<VariantProps> = ({
  phase, onAdvance, onEnter, onBack, image, eyebrow, title, paragraphs, handoffLine,
}) => {
  const [leaving, setLeaving] = useState(false);
  const dragging = useRef(false);
  const i = phase === 'cover' ? 0 : 1;
  const prose = useProseOverflow([phase]);

  const forward = () => {
    if (leaving) return;
    if (i === 0) { onAdvance('page'); return; }
    setLeaving(true); window.setTimeout(onEnter, DARKEN_MS);
  };
  const backward = () => { if (leaving) return; i === 0 ? onBack() : onAdvance('cover'); };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.y) > window.innerHeight * COMMIT_FRACTION;
    const fast = Math.abs(info.velocity.y) > COMMIT_VELOCITY;
    if (!far && !fast) return;
    (info.offset.y < 0 ? forward : backward)();
  };
  // Stories' own convention: the right of the screen is next, the left is back.
  const onTap = (e: React.MouseEvent) => {
    if (dragging.current) { dragging.current = false; return; }
    (e.clientX < window.innerWidth * 0.3 ? backward : forward)();
  };
  useKeys(forward, backward);

  const common = {
    drag: (leaving ? false : 'y') as 'y' | false,
    dragElastic: 0.2,
    dragConstraints: { top: 0, bottom: 0 },
    onDragStart: () => { dragging.current = true; },
    onDragEnd,
    onClick: onTap,
  };

  return (
    <motion.div
      data-phase={leaving ? 'leaving' : phase}
      className="relative select-none overflow-hidden"
      style={{ height: '100dvh', touchAction: 'none' }}
      animate={{ backgroundColor: phase === 'page' ? (leaving ? DARKROOM : PAGE.paper) : NIGHT }}
      transition={{ duration: leaving ? DARKEN_MS / 1000 : 0.4, ease: 'easeInOut' }}
    >
      <Segments at={leaving ? 2 : i} tone={phase === 'page' && !leaving ? 'light' : 'dark'} />
      <BackArrow onBack={backward} tone={phase === 'page' ? 'light' : 'dark'} />

      <AnimatePresence mode="wait">
        {phase === 'cover' ? (
          <motion.div
            key="cover" {...common}
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col justify-end overflow-hidden"
          >
            <CoverArt image={image} />
            <div className="pb-16"><CoverTitle eyebrow={eyebrow} title={title} /></div>
          </motion.div>
        ) : (
          <motion.div
            key="page" {...common}
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col justify-center px-6 pb-10 pt-12"
          >
            <div className="mx-auto flex w-full max-w-prose flex-col" style={{ maxHeight: '100%' }}>
              <Prose paragraphs={paragraphs} handoffLine={handoffLine} dim={leaving}
                     scrolls={prose.scrolls} boxRef={prose.ref} />
              <div className="mt-8 shrink-0"><Phone lit={leaving} onOpen={forward} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Stories;
