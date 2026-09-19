// A — TRACK. The Reels/Shorts idiom: both pages on one track that moves with
// the thumb, so the next page is already rising from below before you commit.
//
// TESTING: does a feed-native pager make a book feel modern, or does it make
// the prose feel like a post you are meant to flick past?
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, PanInfo } from 'framer-motion';
import { PAGE } from '@/components/lab/world/theme';
import {
  BackArrow, COMMIT_FRACTION, COMMIT_VELOCITY, CoverArt, CoverTitle, DARKEN_MS, DARKROOM,
  Hint, NIGHT, Phone, Prose, SPRING, useKeys, useProseOverflow, VariantProps,
} from './shared';

const PAGES: Array<'cover' | 'page'> = ['cover', 'page'];

const Track: React.FC<VariantProps> = ({
  phase, onAdvance, onEnter, onBack, image, eyebrow, title, paragraphs, handoffLine,
}) => {
  const [leaving, setLeaving] = useState(false);
  const [h, setH] = useState(0);
  const y = useMotionValue(0);
  const dragging = useRef(false);
  const i = PAGES.indexOf(phase);
  const prose = useProseOverflow([h, phase]);

  useEffect(() => {
    const m = () => setH(window.innerHeight);
    m(); window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  useEffect(() => { if (h) animate(y, -i * h, SPRING); }, [i, h, y]);

  const goTo = (n: number) => {
    if (leaving) return;
    if (n > PAGES.length - 1) { setLeaving(true); window.setTimeout(onEnter, DARKEN_MS); return; }
    if (n < 0) { onBack(); return; }
    onAdvance(PAGES[n]);
  };
  // A drag fires a click on release, so a swipe would also trip the tap
  // fallback and undo itself.
  const tapForward = () => { if (dragging.current) { dragging.current = false; return; } goTo(i + 1); };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.y) > (h || 800) * COMMIT_FRACTION;
    const fast = Math.abs(info.velocity.y) > COMMIT_VELOCITY;
    if (!far && !fast) { animate(y, -i * h, SPRING); return; }
    goTo(info.offset.y < 0 ? i + 1 : i - 1);
    animate(y, -i * h, SPRING);
  };
  useKeys(() => goTo(i + 1), () => goTo(i - 1));

  return (
    <motion.div
      data-phase={leaving ? 'leaving' : phase}
      className="relative select-none overflow-hidden"
      style={{ height: '100dvh', touchAction: 'none' }}
      animate={{ backgroundColor: phase === 'page' ? (leaving ? DARKROOM : PAGE.paper) : NIGHT }}
      transition={{ duration: leaving ? DARKEN_MS / 1000 : 0.45, ease: 'easeInOut' }}
    >
      <BackArrow onBack={() => goTo(i - 1)} tone={phase === 'page' ? 'light' : 'dark'} />
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
        <div className="relative flex w-full flex-col justify-end overflow-hidden" style={{ height: h || '100dvh' }}>
          <CoverArt image={image} />
          <div className="pb-8"><CoverTitle eyebrow={eyebrow} title={title} /></div>
          <div className="relative pb-7"><Hint tone="dark" label="swipe up to begin" /></div>
        </div>

        <div className="relative flex w-full flex-col justify-center px-6 py-10" style={{ height: h || '100dvh' }}>
          {/* the phone must never fall off: it is the way out of this page */}
          <div className="mx-auto flex w-full max-w-prose flex-col" style={{ maxHeight: '100%' }}>
            <Prose paragraphs={paragraphs} handoffLine={handoffLine} dim={leaving}
                   scrolls={prose.scrolls} boxRef={prose.ref} />
            <div className="mt-8 shrink-0"><Phone lit={leaving} onOpen={tapForward} /></div>
          </div>
          {!leaving && <div className="absolute inset-x-0 bottom-5"><Hint tone="light" label="swipe up to open it" /></div>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Track;
