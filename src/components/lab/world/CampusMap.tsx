// CampusMap.tsx — the open-world home of the book.
// The academy at dusk. Chapters are buildings; open ones glow, unwritten ones
// stand behind restoration tape. Locations come from CHAPTERS in buildings.tsx,
// so the map, the chapter headers and the nav can never disagree.
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { PIXEL_FONT, WORLD } from './theme';
import { CHAPTERS, ChapterMeta } from './buildings';
import { chapterHref } from './routes';
import CartridgeHud from './CartridgeHud';

// Deterministic starfield — same on server and client, no hydration drift.
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: (i * 197 + 41) % 1600,
  y: ((i * 89 + 13) % 230) + 8,
  r: (i % 3) * 0.5 + 0.7,
}));

const TREES: [number, number][] = [
  [90, 430], [1500, 410], [420, 345], [1310, 335], [80, 625],
  [1530, 610], [950, 360], [180, 760], [1400, 780],
];

/** A location on the map. Open ones navigate; taped ones just wiggle. */
const Site: React.FC<{ meta: ChapterMeta }> = ({ meta }) => {
  const router = useRouter();
  const { open } = meta;
  const labelY = meta.labelY ?? 22;

  return (
    <g transform={`translate(${meta.x},${meta.y})`}>
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', cursor: open ? 'pointer' : 'help' }}
        whileHover={open ? { scale: 1.07 } : { rotate: [0, -1.5, 1.5, 0] }}
        whileTap={open ? { scale: 0.96 } : { rotate: [0, -3, 3, 0] }}
        opacity={open ? 1 : 0.65}
        onClick={() => open && router.push(chapterHref(meta.id))}
        role={open ? 'link' : undefined}
        aria-label={open ? `Chapter ${meta.n}: ${meta.title}` : `${meta.building} — under restoration`}
      >
        <meta.art />
        {!open && (
          <g fontFamily={PIXEL_FONT}>
            <rect x={-46} y={-14} width={92} height={13} fill="#eab308" transform="rotate(-4)" rx={2} />
            <text x={0} y={-4} textAnchor="middle" fontSize={11} fill="#422006" transform="rotate(-4)">
              🚧 UNDER RESTORATION
            </text>
          </g>
        )}
      </motion.g>
      <text x={0} y={labelY} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={19}
        fill={open ? WORLD.label : WORLD.labelDim}>
        {meta.building}
      </text>
      <text x={0} y={labelY + 17} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={14}
        fill={open ? WORLD.sub : WORLD.subDim}>
        Ch {meta.n} · {meta.title}
      </text>
    </g>
  );
};

const Vehicle: React.FC<{ y: number; duration: number; delay?: number; flip?: boolean }> = ({
  y, duration, delay = 0, flip = false,
}) => (
  <motion.g
    initial={{ x: flip ? 1700 : -100 }}
    animate={{ x: flip ? -100 : 1700 }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
  >
    <g transform={`translate(0,${y}) ${flip ? 'scale(-1,1)' : ''}`}>
      <ellipse cx={0} cy={0} rx={16} ry={5} fill="#8b9dc3" />
      <ellipse cx={2} cy={-4} rx={7} ry={4} fill="#c7d4ee" />
      <circle cx={-14} cy={0} r={1.6} fill={WORLD.window} />
      <motion.line x1={-16} y1={0} x2={-30} y2={0} stroke={WORLD.window} strokeWidth={1}
        animate={{ opacity: [0.8, 0.1, 0.8] }} transition={{ duration: 0.6, repeat: Infinity }} />
    </g>
  </motion.g>
);

const Nova: React.FC = () => (
  <motion.g
    initial={{ x: -60 }}
    animate={{ x: 1660 }}
    transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
  >
    <g transform="translate(0,716)">
      <ellipse cx={0} cy={0} rx={13} ry={7} fill={WORLD.ink} />
      <circle cx={12} cy={-6} r={6} fill={WORLD.ink} />
      <path d="M 8.5 -10 l 2 -5 l 3 4 z" fill={WORLD.ink} />
      <path d="M 13 -11 l 2.5 -4.5 l 2.5 4.5 z" fill={WORLD.ink} />
      <ellipse cx={5} cy={2} rx={4} ry={2.6} fill="#f8fafc" />
      <motion.path
        d="M -12 -2 Q -22 -8 -20 -16"
        stroke={WORLD.ink} strokeWidth={3} fill="none" strokeLinecap="round"
        animate={{ rotate: [0, 12, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: '100% 100%' }}
      />
    </g>
  </motion.g>
);

const CampusMap: React.FC = () => (
  <div className="relative w-full h-screen bg-[#151238] overflow-x-auto overflow-y-hidden">
    <div className="fixed top-4 w-full text-center z-10 pointer-events-none" style={{ fontFamily: PIXEL_FONT }}>
      <h1 className="text-3xl sm:text-5xl text-white drop-shadow-lg">Lost Language of the Machines</h1>
      <p className="text-lg sm:text-xl text-indigo-300 mt-1">✦ explore the campus — glowing doors are open ✦</p>
    </div>

    <svg viewBox="0 0 1600 820" className="h-full w-full min-w-[1100px]" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e0b2a" />
          <stop offset="70%" stopColor="#2b2158" />
          <stop offset="100%" stopColor="#4a3572" />
        </linearGradient>
        <radialGradient id="moonGlow">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGlow">
          <stop offset="0%" stopColor={WORLD.core} stopOpacity="0.8" />
          <stop offset="100%" stopColor={WORLD.core} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="1600" height="820" fill="url(#sky)" />
      {STARS.map((s, i) => (
        <motion.circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#e2e8f0"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.1 }} />
      ))}
      <circle cx={1420} cy={100} r={90} fill="url(#moonGlow)" />
      <circle cx={1420} cy={100} r={38} fill="#ffe9a8" />
      <circle cx={1408} cy={90} r={7} fill="#f0d68a" />
      <circle cx={1432} cy={112} r={5} fill="#f0d68a" />
      <Vehicle y={150} duration={30} />
      <Vehicle y={205} duration={40} delay={8} flip />

      {/* Lawns */}
      <path d="M 0 330 Q 400 290 800 320 T 1600 310 V 820 H 0 Z" fill={WORLD.lawnBack} />
      <path d="M 0 470 Q 400 430 850 465 T 1600 450 V 820 H 0 Z" fill={WORLD.lawnMid} />
      <path d="M 0 630 Q 500 590 1050 625 T 1600 615 V 820 H 0 Z" fill={WORLD.lawnFront} />

      {/* Paths */}
      <path d="M 800 820 C 780 720 700 680 620 640 C 500 580 560 480 600 440"
        stroke={WORLD.path} strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.8} />
      <path d="M 800 820 C 820 720 900 680 990 640 C 1120 580 1060 500 1100 460"
        stroke={WORLD.path} strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.8} />
      <path d="M 600 440 Q 850 395 1100 460" stroke={WORLD.path} strokeWidth={12} fill="none" opacity={0.65} />
      <path d="M 60 714 Q 800 664 1540 714" stroke={WORLD.path} strokeWidth={10} fill="none" opacity={0.55} />

      {/* Trees */}
      {TREES.map(([tx, ty], i) => (
        <g key={i} transform={`translate(${tx},${ty})`}>
          <rect x={-3} y={-10} width={6} height={14} fill="#4a3728" />
          <circle cx={0} cy={-22} r={16} fill="#1e4634" />
          <circle cx={-10} cy={-14} r={10} fill="#1e4634" />
          <circle cx={10} cy={-14} r={10} fill="#1e4634" />
        </g>
      ))}

      {/* Locations — back to front so nearer buildings overlap correctly */}
      {[...CHAPTERS].sort((a, b) => a.y - b.y).map((c) => <Site key={c.id} meta={c} />)}

      {/* The Core — Chapter 13, unexplained on purpose */}
      <g transform="translate(870,728)">
        <motion.circle r={34} fill="url(#coreGlow)"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <path d="M -14 0 L -4 -4 L 4 2 L 14 -2" stroke={WORLD.core} strokeWidth={2} fill="none" opacity={0.8} />
        <text y={24} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={14} fill={WORLD.core} opacity={0.7}>???</text>
      </g>

      <Nova />
    </svg>

    <CartridgeHud />
  </div>
);

export default CampusMap;
