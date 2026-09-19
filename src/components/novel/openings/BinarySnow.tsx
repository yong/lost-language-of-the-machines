// BinarySnow — the lost language falling on the city.
//
// Ones and zeroes drifting down over the cover art. It is decoration that
// happens to be the premise: five hundred years after programming was
// forgotten, the language is still coming down on the place and nobody can
// read it. By the end of the chapter the reader can.
//
// THE ENGINE IS THE BOOK'S OWN `react-snowfall`, the one already falling on
// /lab/scenes — a canvas simulation with per-flake speed, wind that changes
// over time, rotation and depth. A hand-rolled CSS version was tried and
// binned: linear `translateY` loops read as a screensaver, because what makes
// snow look real is that no two flakes agree about anything. Do not rewrite
// this; feed the existing engine different images.
//
// The only change from snow is the flakes: instead of the snowflake PNGs in
// `useSnowImages`, the glyphs 0 and 1 are drawn to small canvases in the
// book's pixel font and handed over as the images.
import { useEffect, useState } from 'react';
import Snowfall from '../../../react-snowfall/index.js';
import { PIXEL_FONT } from '@/components/lab/world/theme';

/** Draw "0" and "1" as flake images.
 *
 *  They have to be real `HTMLImageElement`s, NOT canvases: Snowflake.draw()
 *  gates on `this.image.complete`, which only an <img> has, so a canvas fails
 *  the check silently and every flake falls back to the default grey circle.
 *  That is why the first attempt rendered snow-coloured blobs. Canvas → data
 *  URL → Image, exactly the shape `useSnowImages` hands it.
 *
 *  Client-side only, and only once the pixel font has actually loaded —
 *  drawn too early the browser substitutes a system face and the digits fall
 *  in the wrong typeface. */
const useBinaryFlakes = () => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;

    const draw = () => {
      if (cancelled) return;
      const size = 64;                       // drawn big, scaled down per flake
      const urls = (['0', '1'] as const).flatMap((bit) =>
        // two weights of each, so some digits read as nearer than others
        [1, 0.62].map((alpha) => {
          const c = document.createElement('canvas');
          c.width = c.height = size;
          const ctx = c.getContext('2d');
          if (!ctx) return '';
          ctx.font = `${size * 0.9}px ${PIXEL_FONT}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(253, 230, 138, ${alpha})`;
          ctx.fillText(bit, size / 2, size / 2);
          return c.toDataURL();
        }),
      ).filter(Boolean);

      let pending = urls.length;
      const loaded: HTMLImageElement[] = [];
      urls.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded.push(img);
          if (--pending === 0 && !cancelled) setImages(loaded);
        };
        img.src = src;
      });
    };

    // document.fonts may be missing in older engines; draw anyway rather than
    // showing nothing.
    if (typeof document !== 'undefined' && document.fonts?.load) {
      document.fonts.load(`48px ${PIXEL_FONT}`).then(draw).catch(draw);
    } else {
      draw();
    }
    return () => { cancelled = true; };
  }, []);

  return images;
};

const BinarySnow: React.FC<{ count?: number }> = ({ count = 150 }) => {
  const images = useBinaryFlakes();
  const [still, setStill] = useState(false);

  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!m) return;
    setStill(m.matches);
    const on = () => setStill(m.matches);
    m.addEventListener?.('change', on);
    return () => m.removeEventListener?.('change', on);
  }, []);

  if (!images.length || still) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Snowfall
        images={images}
        // The density and physics the deployed cover used (200 flakes, engine
        // defaults) — that is the version that looked right. Two deliberate
        // departures: a larger radius, because a glyph needs more pixels than
        // a snowflake PNG to read as a DIGIT rather than a speck; and gentler
        // rotation, because tumbling 0s and 1s stop looking like numbers.
        snowflakeCount={count}
        radius={[9, 24]}
        speed={[1, 3]}
        wind={[-0.5, 2]}
        rotationSpeed={[-0.5, 0.5]}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default BinarySnow;
