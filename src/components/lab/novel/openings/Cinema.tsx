// D — CINEMA. There are no pages at all. The cover art stays on screen the
// whole way in: the title lifts, the paragraph rises over the art like a
// film's opening titles over its first scene, the art dims to night, and the
// phone comes up out of the dark. One continuous shot from art to thread.
//
// TESTING: whether the PAGE BOUNDARY was the problem all along. Every other
// variant argues about how a page should leave; this one asks whether the
// reader should ever have been made to feel they left something. It is also
// the only one where the cover art earns its keep for more than four seconds.
import { useRef, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import {
  BackArrow, COMMIT_FRACTION, COMMIT_VELOCITY, CoverArt, CoverTitle, DARKEN_MS,
  Hint, Phone, Prose, useKeys, useProseOverflow, VariantProps,
} from './shared';

const Cinema: React.FC<VariantProps> = ({
  phase, onAdvance, onEnter, onBack, image, eyebrow, title, paragraphs, handoffLine,
}) => {
  const [leaving, setLeaving] = useState(false);
  const dragging = useRef(false);
  const onPage = phase === 'page';
  const prose = useProseOverflow([phase]);

  const forward = () => {
    if (leaving) return;
    if (!onPage) { onAdvance('page'); return; }
    setLeaving(true); window.setTimeout(onEnter, DARKEN_MS);
  };
  const backward = () => { if (leaving) return; onPage ? onAdvance('cover') : onBack(); };
  const tap = () => { if (dragging.current) { dragging.current = false; return; } forward(); };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.y) > window.innerHeight * COMMIT_FRACTION;
    const fast = Math.abs(info.velocity.y) > COMMIT_VELOCITY;
    if (!far && !fast) return;
    (info.offset.y < 0 ? forward : backward)();
  };
  useKeys(forward, backward);

  return (
    <motion.div
      data-phase={leaving ? 'leaving' : phase}
      drag={leaving ? false : 'y'}
      dragElastic={0.2}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragStart={() => { dragging.current = true; }}
      onDragEnd={onDragEnd}
      onClick={tap}
      className="relative overflow-hidden bg-[#08070f]"
      style={{ height: '100dvh', touchAction: 'none' }}
    >
      {/* ONE scene, never replaced — only lit differently */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: leaving ? 'brightness(0.12)' : onPage ? 'brightness(0.32)' : 'brightness(1)',
          scale: onPage ? 1.06 : 1,
        }}
        transition={{ duration: leaving ? DARKEN_MS / 1000 : 1.1, ease: 'easeInOut' }}
      >
        <CoverArt image={image} />
      </motion.div>

      <BackArrow onBack={backward} tone="dark" />

      {/* the title rides up and out of the way rather than being replaced */}
      <motion.div
        className="absolute inset-x-0"
        animate={{ bottom: onPage ? '82%' : '16%', opacity: onPage ? 0 : 1, scale: onPage ? 0.86 : 1 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        <CoverTitle eyebrow={eyebrow} title={title} />
      </motion.div>

      {/* A SCRIM THE TEXT CAN RELY ON. Prose over artwork is a contrast bet you
          lose somewhere — here it is the moon. This band is ~72% black, so
          however bright the art behind it gets, the worst case is white → rgb
          ~82 → about 5.8:1 against the #e7e2d4 text, over AA by construction
          rather than by luck. It fades out top and bottom so the scene is
          still plainly there. */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ opacity: onPage ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        style={{ background: 'linear-gradient(to bottom, rgba(8,7,15,0) 0%, rgba(8,7,15,.72) 16%, rgba(8,7,15,.72) 86%, rgba(8,7,15,0) 100%)' }}
      />

      {/* the paragraph comes up over the scene, like opening titles */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center px-6 py-10"
        initial={false}
        animate={{ opacity: onPage ? 1 : 0, y: onPage ? 0 : 40 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: onPage ? 0.25 : 0 }}
        style={{ pointerEvents: onPage ? 'auto' : 'none' }}
      >
        <div className="mx-auto flex w-full max-w-prose flex-col" style={{ maxHeight: '100%' }}>
          <Prose paragraphs={paragraphs} handoffLine={handoffLine} dim={leaving}
                 scrolls={prose.scrolls} boxRef={prose.ref} tone="light" />
          <div className="mt-8 shrink-0"><Phone lit={leaving} onOpen={forward} /></div>
        </div>
      </motion.div>

      {!leaving && (
        <div className="absolute inset-x-0 bottom-6">
          <Hint tone="dark" label={onPage ? 'swipe up to open it' : 'swipe up to begin'} />
        </div>
      )}
    </motion.div>
  );
};

export default Cinema;
