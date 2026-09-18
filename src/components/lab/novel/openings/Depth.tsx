// C — DEPTH. Nothing slides. Every move is along the z-axis: the cover zooms
// INTO the paper, and the phone opens the way an App Store card does — it
// grows until it is the screen. The App Store / Apple Books idiom.
//
// TESTING: "going in" against "going down". A book is a place you enter, not a
// feed you advance, and depth is the only one of the four that says so. If the
// reader should feel they have climbed inside the story rather than scrolled
// past it, this is the one.
import { useRef, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { PAGE } from '@/components/lab/world/theme';
import {
  BackArrow, COMMIT_FRACTION, COMMIT_VELOCITY, CoverArt, CoverTitle, DARKEN_MS, DARKROOM,
  Hint, NIGHT, Phone, Prose, useKeys, useProseOverflow, VariantProps,
} from './shared';

const Depth: React.FC<VariantProps> = ({
  phase, onAdvance, onEnter, onBack, image, eyebrow, title, paragraphs, handoffLine,
}) => {
  const [leaving, setLeaving] = useState(false);
  const dragging = useRef(false);
  const prose = useProseOverflow([phase]);

  const forward = () => {
    if (leaving) return;
    if (phase === 'cover') { onAdvance('page'); return; }
    setLeaving(true); window.setTimeout(onEnter, DARKEN_MS + 120);
  };
  const backward = () => { if (leaving) return; phase === 'cover' ? onBack() : onAdvance('cover'); };
  const tap = () => { if (dragging.current) { dragging.current = false; return; } forward(); };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.y) > window.innerHeight * COMMIT_FRACTION;
    const fast = Math.abs(info.velocity.y) > COMMIT_VELOCITY;
    if (!far && !fast) return;
    (info.offset.y < 0 ? forward : backward)();
  };
  useKeys(forward, backward);

  const common = {
    drag: (leaving ? false : 'y') as 'y' | false,
    dragElastic: 0.2,
    dragConstraints: { top: 0, bottom: 0 },
    onDragStart: () => { dragging.current = true; },
    onDragEnd,
    onClick: tap,
  };

  return (
    <motion.div
      data-phase={leaving ? 'leaving' : phase}
      className="relative overflow-hidden"
      style={{ height: '100dvh', touchAction: 'none', perspective: 1200 }}
      animate={{ backgroundColor: phase === 'page' ? (leaving ? DARKROOM : PAGE.paper) : NIGHT }}
      transition={{ duration: leaving ? DARKEN_MS / 1000 : 0.45, ease: 'easeInOut' }}
    >
      <BackArrow onBack={backward} tone={phase === 'page' ? 'light' : 'dark'} />

      <AnimatePresence mode="popLayout">
        {phase === 'cover' ? (
          <motion.div
            key="cover" {...common}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            // the cover does not leave sideways or upward — you go THROUGH it
            exit={{ opacity: 0, scale: 1.45 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex flex-col justify-end overflow-hidden"
          >
            <CoverArt image={image} />
            <div className="pb-8"><CoverTitle eyebrow={eyebrow} title={title} /></div>
            <div className="relative pb-7"><Hint tone="dark" label="tap to go in" arrow="⌄" /></div>
          </motion.div>
        ) : (
          <motion.div
            key="page" {...common}
            initial={{ opacity: 0, scale: 0.9 }}
            // and as the phone opens, the page you are standing on recedes
            animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.35 : 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: leaving ? (DARKEN_MS + 120) / 1000 : 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex flex-col justify-center px-6 py-10"
          >
            <div className="mx-auto flex w-full max-w-prose flex-col" style={{ maxHeight: '100%' }}>
              <Prose paragraphs={paragraphs} handoffLine={handoffLine} dim={leaving}
                     scrolls={prose.scrolls} boxRef={prose.ref} />
              {/* the phone is not dimmed with the page — it is what you fall into */}
              <motion.div
                className="mt-8 shrink-0"
                animate={{ opacity: 1, scale: leaving ? 1.1 : 1 }}
                transition={{ duration: (DARKEN_MS + 120) / 1000, ease: [0.4, 0, 0.2, 1] }}
              >
                <Phone lit={leaving} onOpen={forward} />
              </motion.div>
            </div>
            {!leaving && <div className="absolute inset-x-0 bottom-5"><Hint tone="light" label="tap the phone" arrow="⌄" /></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Depth;
