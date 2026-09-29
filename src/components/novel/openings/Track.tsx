// A — TRACK. The Reels/Shorts idiom: both pages on one track that moves with
// the thumb, so the next page is already rising from below before you commit.
//
// TESTING: does a feed-native pager make a book feel modern, or does it make
// the prose feel like a post you are meant to flick past?
//
// PARALLAX. A flat track read as two screenshots swapping. Now the paper is a
// SHEET laid over the cover: the art moves at half the thumb's speed and dims
// as it recedes, the title lifts away a little faster and fades, and the
// paper — opaque, with a shadow on its top edge — slides over the lot. Every
// layer is a transform of the one `y` the finger already drives, so it tracks
// the thumb frame for frame, springs back with it on a short swipe, and runs
// in reverse on the way back. Reduced motion: the flat slide it used to be.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform, PanInfo } from 'framer-motion';
import { PAGE } from '@/components/lab/world/theme';
import {
  BackArrow, COMMIT_FRACTION, COMMIT_VELOCITY, CoverArt, CoverTitle, DARKEN_MS, DARKROOM,
  Hint, NIGHT, Phone, Prose, SPRING, useKeys, useProseOverflow, VariantProps,
} from './shared';

const PAGES: Array<'cover' | 'page'> = ['cover', 'page'];

const Track: React.FC<VariantProps> = ({
  phase, onAdvance, onEnter, onBack, image, art, eyebrow, title, paragraphs, handoffLine,
}) => {
  const [leaving, setLeaving] = useState(false);
  const [h, setH] = useState(0);
  const y = useMotionValue(0);
  const dragging = useRef(false);
  const i = PAGES.indexOf(phase);
  const prose = useProseOverflow([h, phase]);

  // Parallax layers, all derived from the track's own `y` (0 on the cover,
  // -h on the paper). `hRef` because a transformer reads it on every frame.
  const hRef = useRef(0);
  hRef.current = h;
  const still = useReducedMotion();
  const depth = (v: number) => Math.min(Math.max(-v / (hRef.current || 1), 0), 1); // 0 cover → 1 paper
  const artY = useTransform(y, (v) => (still || v > 0 ? 0 : -v * 0.5));           // half speed
  const titleY = useTransform(y, (v) => (still || v > 0 ? 0 : v * 0.15));          // a little faster
  // gone by a fifth of the way: any later and it slides across the art at a
  // different speed and the two tangle ("CHAPTER SIX" over "PREMIUM GASOLINE")
  const titleFade = useTransform(y, (v) => 1 - Math.min(depth(v) * 5, 1));
  const hintFade = useTransform(y, (v) => 1 - Math.min(depth(v) * 5, 1));          // gone at once
  const coverDim = useTransform(y, (v) => depth(v) * 0.6);                         // recedes into dark

  // COMING BACK FROM THE THREAD, THE TRACK MUST ALREADY BE UNDER THE RIGHT
  // PAGE. `h` used to start at 0, so the first layout put the track at
  // -i*0 = 0 — the COVER — and it then animated down to the paper. Measured at
  // +150ms the track was at -633 heading for -844: a visible flash of the
  // cover on the way back, which reads as "swiping back goes to the cover".
  // useLayoutEffect measures before paint, and the first positioning is a jump
  // rather than an animation; only later moves are sprung.
  const settled = useRef(false);
  useLayoutEffect(() => {
    const m = () => setH(window.innerHeight);
    m(); window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  useLayoutEffect(() => {
    if (!h) return;
    if (!settled.current) { y.set(-i * h); settled.current = true; return; }
    animate(y, -i * h, SPRING);
  }, [i, h, y]);

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
          <motion.div className="absolute inset-0" style={{ y: artY }}>
            <CoverArt image={image} art={art} />
          </motion.div>
          <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: coverDim }} />
          <motion.div className="relative pb-8" style={{ y: titleY, opacity: titleFade }}>
            <CoverTitle eyebrow={eyebrow} title={title} />
          </motion.div>
          <motion.div className="relative pb-7" style={{ opacity: hintFade }}>
            <Hint tone="dark" label="swipe up to begin" />
          </motion.div>
        </div>

        {/* The paper is a sheet, not a hole: opaque (it used to be see-through
            to the room behind, which only worked while nothing moved under
            it) and shadowed along its top edge so it reads as lying OVER the
            cover. It darkens with the room when the phone is opened. */}
        <motion.div
          className="relative flex w-full flex-col justify-center px-6 py-10"
          style={{ height: h || '100dvh', boxShadow: '0 -14px 36px rgba(0,0,0,.55)' }}
          animate={{ backgroundColor: leaving ? DARKROOM : PAGE.paper }}
          transition={{ duration: leaving ? DARKEN_MS / 1000 : 0, ease: 'easeInOut' }}
        >
          {/* the phone must never fall off: it is the way out of this page */}
          <div className="mx-auto flex w-full max-w-prose flex-col" style={{ maxHeight: '100%' }}>
            <Prose paragraphs={paragraphs} handoffLine={handoffLine} dim={leaving}
                   scrolls={prose.scrolls} boxRef={prose.ref} />
            <div className="mt-8 shrink-0"><Phone lit={leaving} onOpen={tapForward} /></div>
          </div>
          {!leaving && <div className="absolute inset-x-0 bottom-5"><Hint tone="light" label="swipe up to open it" /></div>}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Track;
