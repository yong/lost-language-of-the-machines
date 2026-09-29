// A still cover with twinkling stars laid over its sky, for a chapter set at
// night. Snow is Chapter One's; this is the quieter motion for a cover whose
// art should stay the thing you look at.
//
// Drawn in the cover art's own 1024×1400 space and cropped the same way
// (`slice` = background-size: cover), so a star placed in the sky stays in the
// sky at every screen shape. Stars only land inside `sky` rectangles (each
// takes a turn, so a narrow strip is as full as a wide one) and never inside
// `avoid` ones — a star twinkling on top of a sign or a palm tree reads
// as a smudge, not a star.
//
// Deterministic (mulberry32, no Math.random) so the server render matches, and
// CSS-only motion: every star has its own period and phase, so no two agree,
// which is what makes a sky look alive rather than blinking in step. Reduced
// motion leaves them lit and still.
type Rect = [x0: number, y0: number, x1: number, y1: number];

const mulberry32 = (a: number) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const inside = (x: number, y: number, [x0, y0, x1, y1]: Rect) => x >= x0 && x <= x1 && y >= y0 && y <= y1;

interface Star { x: number; y: number; r: number; dur: number; delay: number; sparkle: boolean; warm: boolean }

const place = (sky: Rect[], avoid: Rect[], count: number, seed: number): Star[] => {
  const rand = mulberry32(seed);
  const stars: Star[] = [];
  for (let tries = 0; stars.length < count && tries < count * 60; tries++) {
    // each sky rectangle takes its turn, so a narrow strip gets as many stars
    // as a wide one — list the sky a phone can see first
    const [x0, y0, x1, y1] = sky[tries % sky.length];
    const x = x0 + rand() * (x1 - x0), y = y0 + rand() * (y1 - y0);
    if (avoid.some((r) => inside(x, y, r))) continue;
    // keep them apart, or two stars make one blob
    if (stars.some((s) => Math.hypot(s.x - x, s.y - y) < 36)) continue;
    const sparkle = stars.length % 6 === 0;
    stars.push({
      x, y, sparkle,
      r: sparkle ? 3.6 + rand() * 1.8 : 2 + rand() * 2.4,
      dur: 2.2 + rand() * 3.4,
      delay: -rand() * 6,
      warm: rand() < 0.18,
    });
  }
  return stars;
};

const TwinkleCover: React.FC<{ image: string; sky: Rect[]; avoid?: Rect[]; count?: number; seed?: number }> = ({
  image, sky, avoid = [], count = 44, seed = 1999,
}) => {
  const stars = place(sky, avoid, count, seed);
  return (
    <svg viewBox="0 0 1024 1400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <style>{`
        .twinkle { animation: twinkle var(--d) ease-in-out var(--delay) infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes twinkle { 0%, 100% { opacity: .15; transform: scale(.6) } 50% { opacity: 1; transform: scale(1) } }
        @media (prefers-reduced-motion: reduce) { .twinkle { animation: none; opacity: .8 } }
      `}</style>
      <image href={image} x="0" y="0" width="1024" height="1400" />
      {stars.map((s, i) => {
        const fill = s.warm ? '#fde68a' : '#e0e7ff';
        const style = { '--d': `${s.dur.toFixed(2)}s`, '--delay': `${s.delay.toFixed(2)}s` } as React.CSSProperties;
        return (
          <g key={i} className="twinkle" style={style}>
            {s.sparkle && (
              <path
                d={`M${s.x} ${s.y - s.r * 5} Q${s.x} ${s.y} ${s.x + s.r * 5} ${s.y} Q${s.x} ${s.y} ${s.x} ${s.y + s.r * 5} Q${s.x} ${s.y} ${s.x - s.r * 5} ${s.y} Q${s.x} ${s.y} ${s.x} ${s.y - s.r * 5} Z`}
                fill={fill} opacity="0.85"
              />
            )}
            <circle cx={s.x} cy={s.y} r={s.r} fill={fill} />
            <circle cx={s.x} cy={s.y} r={s.r * 2.4} fill={fill} opacity="0.07" />
          </g>
        );
      })}
    </svg>
  );
};

export default TwinkleCover;
