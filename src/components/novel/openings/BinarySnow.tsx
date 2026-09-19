// BinarySnow — the lost language falling on the city.
//
// Ones and zeroes drifting down over the cover art. It is decoration that
// happens to be the premise: five hundred years after programming was
// forgotten, the language is still coming down on the place, and nobody can
// read it. By the end of the chapter the reader can.
//
// DETERMINISTIC BY CONSTRUCTION. Every flake's column, size, speed and delay
// comes from a seeded PRNG evaluated at module load, so the server and the
// client generate the identical array — `Math.random()` at render is a
// hydration mismatch (see CLAUDE.md § Conventions).
//
// CSS animations, not JS: ~34 glyphs on compositor-driven transforms cost a
// phone nothing, and there is no per-frame work. Honours
// `prefers-reduced-motion`, where the flakes simply hold still.
import { PIXEL_FONT } from '@/components/lab/world/theme';

/** mulberry32 — small, fast, and the same everywhere. */
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const COUNT = 34;
const FLAKES = (() => {
  const r = rng(20260919);
  return Array.from({ length: COUNT }, (_, i) => {
    const near = r() > 0.72;                       // a few closer, most distant
    return {
      bit: r() > 0.5 ? '1' : '0',
      left: (i / COUNT) * 100 + (r() - 0.5) * (100 / COUNT), // spread, not clumped
      size: near ? 20 + r() * 10 : 11 + r() * 6,
      opacity: near ? 0.26 + r() * 0.16 : 0.10 + r() * 0.12,
      duration: near ? 11 + r() * 6 : 17 + r() * 12,          // near falls faster
      delay: -r() * 26,                                        // already falling
      drift: (r() - 0.5) * 26,
    };
  });
})();

const BinarySnow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <style>{`
      @keyframes novel-snow {
        0%   { transform: translate3d(0, -12vh, 0); }
        100% { transform: translate3d(var(--drift), 112vh, 0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .novel-flake { animation: none !important; transform: translate3d(0, 40vh, 0); }
      }
    `}</style>
    {FLAKES.map((f, i) => (
      <span
        key={i}
        className="novel-flake absolute top-0 select-none"
        style={{
          left: `${f.left}%`,
          fontFamily: PIXEL_FONT,
          fontSize: f.size,
          color: '#fde68a',
          opacity: f.opacity,
          ['--drift' as string]: `${f.drift}px`,
          animation: `novel-snow ${f.duration}s linear ${f.delay}s infinite`,
          willChange: 'transform',
        }}
      >
        {f.bit}
      </span>
    ))}
  </div>
);

export default BinarySnow;
