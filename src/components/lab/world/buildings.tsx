// buildings.tsx — the campus locations, drawn once and shared by the map and
// each chapter's header. CHAPTERS is the single source of truth for what
// exists, what's readable, and what comes next.
import { motion } from 'framer-motion';
import { PIXEL_FONT, WORLD } from './theme';

const Window: React.FC<{ x: number; y: number; w?: number; h?: number; lit?: boolean }> = ({
  x, y, w = 10, h = 12, lit = true,
}) => <rect x={x} y={y} width={w} height={h} rx={1.5} fill={lit ? WORLD.window : WORLD.windowDark} />;

// Each art piece draws from origin, sitting on the ground line at y=0.

export const MuseumArt: React.FC = () => (
  <>
    <rect x={-70} y={-55} width={140} height={55} fill={WORLD.stone} rx={3} />
    <path d="M -70 -55 A 70 45 0 0 1 70 -55 Z" fill={WORLD.roof} />
    <rect x={-74} y={-58} width={148} height={6} fill="#6d5aa8" rx={3} />
    {[-52, -30, 22, 44].map((wx) => <Window key={wx} x={wx} y={-40} />)}
    <rect x={-11} y={-30} width={22} height={30} fill={WORLD.door} rx={2} />
    <motion.rect x={-11} y={-30} width={22} height={30} fill={WORLD.window} rx={2}
      animate={{ opacity: [0.25, 0.6, 0.25] }} transition={{ duration: 2.4, repeat: Infinity }} />
    <text x={0} y={-64} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={13} fill="#f9a8d4">◐ ARCADE ◑</text>
  </>
);

export const HistoryHallArt: React.FC = () => (
  <>
    <rect x={-60} y={-60} width={120} height={60} fill={WORLD.stone} rx={3} />
    <rect x={-16} y={-130} width={32} height={70} fill="#453d66" />
    <path d="M -20 -130 L 0 -152 L 20 -130 Z" fill="#6d5aa8" />
    <rect x={-12} y={-122} width={24} height={16} rx={2} fill={WORLD.ink} />
    <text x={0} y={-110} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={12} fill="#4ade80">10:01</text>
    {[-48, -30, 34].map((wx) => <Window key={wx} x={wx} y={-44} />)}
    <rect x={-9} y={-26} width={18} height={26} fill={WORLD.door} rx={2} />
    <Window x={-48} y={-20} lit={false} />
  </>
);

export const LiteratureHallArt: React.FC = () => (
  <>
    <rect x={-65} y={-70} width={130} height={70} fill={WORLD.stone} rx={3} />
    <path d="M -70 -70 L 0 -95 L 70 -70 Z" fill={WORLD.roof} />
    {[-50, -28, 16, 38].map((wx) => <Window key={wx} x={wx} y={-52} />)}
    {[-50, -28, 16, 38].map((wx) => <Window key={`b${wx}`} x={wx} y={-30} lit={wx !== 16} />)}
    <rect x={-10} y={-24} width={20} height={24} fill={WORLD.door} rx={2} />
    <rect x={-30} y={0} width={60} height={5} fill="#3b82f6" />
    <rect x={-24} y={5} width={48} height={5} fill="#2563eb" />
    <text x={0} y={-102} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={12} fill="#93c5fd">41 53 43 49 49</text>
  </>
);

export const ArtStudioArt: React.FC = () => (
  <>
    <rect x={-55} y={-58} width={110} height={58} fill={WORLD.stone} rx={3} />
    <path d="M -58 -58 L 20 -88 L 58 -58 Z" fill={WORLD.roof} />
    <rect x={-8} y={-84} width={36} height={22} fill="#a5f3fc" opacity={0.85} transform="rotate(-21 -8 -84)" />
    <circle cx={-34} cy={-66} r={6} fill="#ef4444" />
    <circle cx={-22} cy={-72} r={5} fill="#22c55e" />
    <circle cx={-12} cy={-64} r={4} fill="#3b82f6" />
    {[-40, 24].map((wx) => <Window key={wx} x={wx} y={-40} />)}
    <rect x={-10} y={-26} width={20} height={26} fill={WORLD.door} rx={2} />
    <text x={0} y={-96} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={12} fill="#fca5a5">#FF0000 #00FF00 #0000FF</text>
  </>
);

export const OfficeArt: React.FC = () => (
  <>
    <rect x={-45} y={-45} width={90} height={45} fill="#43395f" rx={3} />
    <path d="M -50 -45 L 0 -72 L 50 -45 Z" fill="#7c5f3b" />
    <rect x={20} y={-66} width={8} height={16} fill="#5a4630" />
    <Window x={-30} y={-32} w={16} h={14} />
    {/* Nova in the lit window */}
    <circle cx={-22} cy={-23} r={3.4} fill={WORLD.ink} />
    <path d="M -24.5 -25.5 l 1 -2.5 l 1.5 2 z M -21.5 -26 l 1.5 -2 l 1 2.5 z" fill={WORLD.ink} />
    <rect x={12} y={-30} width={14} height={30} fill={WORLD.door} rx={2} />
    <motion.circle cx={26} cy={-52} r={2} fill="#94a3b8"
      animate={{ cy: [-52, -60], opacity: [0.6, 0] }} transition={{ duration: 3, repeat: Infinity }} />
  </>
);

export const MusicHallArt: React.FC = () => (
  <>
    <rect x={-55} y={-55} width={110} height={55} fill={WORLD.stoneDim} rx={3} />
    <path d="M -55 -55 A 55 35 0 0 1 55 -55 Z" fill={WORLD.roofDim} />
    {[-38, -14, 24].map((wx) => <Window key={wx} x={wx} y={-38} lit={false} />)}
    <text x={0} y={-64} textAnchor="middle" fontSize={14} fill={WORLD.subDim}>♪ ♫</text>
  </>
);

export const LibraryArt: React.FC = () => (
  <>
    <rect x={-58} y={-52} width={116} height={52} fill={WORLD.stoneDim} rx={3} />
    <path d="M -62 -52 L 0 -74 L 62 -52 Z" fill={WORLD.roofDim} />
    {[-42, -20, 10, 32].map((wx) => <Window key={wx} x={wx} y={-36} lit={false} />)}
  </>
);

export const CafeteriaArt: React.FC = () => (
  <>
    <rect x={-50} y={-45} width={100} height={45} fill={WORLD.stoneDim} rx={3} />
    <rect x={-54} y={-50} width={108} height={7} fill={WORLD.roofDim} rx={3} />
    {[-34, -8, 18].map((wx) => (
      <rect key={wx} x={wx} y={-30} width={14} height={30} fill={WORLD.door} rx={2} />
    ))}
  </>
);

export const RoboticsLabArt: React.FC = () => (
  <>
    <rect x={-48} y={-42} width={96} height={42} fill={WORLD.stoneDim} rx={3} />
    <path d="M -48 -42 A 48 24 0 0 1 48 -42 Z" fill={WORLD.roofDim} />
    {/* Boxy, parked */}
    <g transform="translate(62,-8)">
      <rect x={-8} y={-14} width={16} height={14} fill="#4b5563" rx={2} />
      <text x={0} y={-4} textAnchor="middle" fontSize={8} fill="#a3e635" fontFamily={PIXEL_FONT}>:|</text>
      <circle cx={0} cy={2} r={3.5} fill="#1f2937" />
    </g>
  </>
);

export const VaultArt: React.FC = () => (
  <>
    <ellipse cx={0} cy={-4} rx={38} ry={13} fill={WORLD.stoneDim} />
    <ellipse cx={0} cy={-8} rx={38} ry={13} fill={WORLD.roofDim} />
    <ellipse cx={0} cy={-8} rx={26} ry={8} fill={WORLD.door} />
    <rect x={-4} y={-14} width={8} height={5} fill="#94a3b8" rx={1} />
  </>
);

export interface ChapterMeta {
  /** route segment, e.g. 'chapter1' */
  id: string;
  n: number;
  /** the concept title, e.g. 'A Number Is a Switch' */
  title: string;
  building: string;
  /** what this chapter restores on the cartridge */
  restores: string;
  /** where it sits on the campus map */
  x: number;
  y: number;
  labelY?: number;
  art: React.FC;
  /** false = under restoration (not yet written) */
  open: boolean;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'chapter0', n: 0, title: 'Hello World!', building: 'The Museum', restores: 'the quest', x: 220, y: 605, art: MuseumArt, open: true },
  { id: 'chapter1', n: 1, title: 'A Number Is a Switch', building: 'History Hall', restores: 'the score counter', x: 585, y: 420, art: HistoryHallArt, open: true },
  { id: 'chapter2', n: 2, title: 'A Letter Is a Number', building: 'Literature Hall', restores: 'the title screen', x: 880, y: 400, labelY: 32, art: LiteratureHallArt, open: true },
  { id: 'chapter3', n: 3, title: 'A Color Is a Number', building: 'Art Studio', restores: 'the palette', x: 1180, y: 420, art: ArtStudioArt, open: true },
  { id: 'chapter4', n: 4, title: 'A Picture Is a Number', building: "Evergreen's Office", restores: 'the hero sprite', x: 1430, y: 590, art: OfficeArt, open: true },
  { id: 'chapter5', n: 5, title: 'A Sound Is a Number', building: 'Music Hall', restores: 'the theme song', x: 300, y: 415, art: MusicHallArt, open: false },
  { id: 'chapter6', n: 6, title: 'A Memory Is a Shelf', building: 'Storage Vault', restores: 'the cartridge fit', x: 330, y: 705, art: VaultArt, open: false },
  { id: 'chapter7', n: 7, title: 'A Decision Is a Door', building: 'Cafeteria', restores: 'collision', x: 1030, y: 605, art: CafeteriaArt, open: false },
  { id: 'chapter8', n: 8, title: 'A Machine Obeys', building: 'Robotics Lab', restores: 'the controls', x: 1260, y: 700, art: RoboticsLabArt, open: false },
  { id: 'chapter12', n: 12, title: 'A Trick Is an Algorithm', building: 'Library', restores: 'the enemy brain', x: 720, y: 625, art: LibraryArt, open: false },
];

export const chapterById = (id: string) => CHAPTERS.find((c) => c.id === id);

/** The next chapter in reading order — open or not, so the reader sees what's coming. */
export const nextChapter = (id: string): ChapterMeta | undefined => {
  const here = chapterById(id);
  if (!here) return undefined;
  return [...CHAPTERS].sort((a, b) => a.n - b.n).find((c) => c.n > here.n);
};
