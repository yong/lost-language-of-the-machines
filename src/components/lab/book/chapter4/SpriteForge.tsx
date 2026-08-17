// SpriteForge.tsx — the Chapter 4 "Game Forge" mini-game.
// The top half of the 16x16 hero sprite is "recovered data"; the reader paints
// the missing bottom half. The finished sprite persists in localStorage so
// later chapters can reuse it as the player's hero.
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { markRestored } from '@/components/lab/world/progress';

const GRID = 16;
export const STORAGE_KEY = 'gameforge.sprite.v1';

interface PaletteEntry {
  key: string;
  hex: string;
  label: string;
}

const PALETTE: PaletteEntry[] = [
  { key: 'K', hex: '#232323', label: 'OUTLINE' },
  { key: 'O', hex: '#F2A03D', label: 'FUR' },
  { key: 'D', hex: '#C97722', label: 'STRIPE' },
  { key: 'W', hex: '#FFFFFF', label: 'SNOW' },
  { key: 'P', hex: '#F27DA0', label: 'NOSE' },
  { key: 'G', hex: '#7CC94E', label: 'EYES' },
  { key: '.', hex: '', label: 'ERASE' },
];

export const COLOR_OF: Record<string, string> = Object.fromEntries(
  PALETTE.filter((p) => p.key !== '.').map((p) => [p.key, p.hex])
);

// Rows 0-7: the surviving half of the ancient sprite sheet.
const RECOVERED_TOP = [
  '................',
  '..KK......KK....',
  '.KOOK....KOOK...',
  '.KOOOKKKKOOOK...',
  '.KOOOOOOOOOOK...',
  '.KOGGOOOOGGOK...',
  '.KOGGOWWOGGOK...',
  '.KOOOWPPWOOOK...',
];

// Rows 8-15: Nova's suggested loaf, shown only as a ghost guide.
const GUIDE_BOTTOM = [
  '.KOOOOOOOOOOK...',
  '.KOOOOOOOOOOKK..',
  '.KOOOOOOOOOOOOK.',
  'KOOOOOOOOOOOOOK.',
  'KOODDOOOODDOOOK.',
  'KOODDOOOODDOODK.',
  '.KOOOOOOOOOOOK..',
  '..KKKKKKKKKKK...',
];

const freshCells = (): string[] => [
  ...RECOVERED_TOP.join('').split(''),
  ...Array(GRID * GRID / 2).fill('.'),
];

const loadCells = (): string[] => {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && saved.length === GRID * GRID) {
      return saved.split('');
    }
  }
  return freshCells();
};

const countPainted = (cells: string[], from: number, to: number) =>
  cells.slice(from, to).filter((c) => c !== '.').length;

// Enough bottom-half pixels to call the hero whole again.
const RESTORE_THRESHOLD = 40;

const CellGrid: React.FC<{ cells: string[]; cellPx: number }> = ({ cells, cellPx }) => (
  <div
    className="grid"
    style={{ gridTemplateColumns: `repeat(${GRID}, ${cellPx}px)` }}
  >
    {cells.map((c, i) => (
      <div
        key={i}
        style={{
          width: cellPx,
          height: cellPx,
          backgroundColor: COLOR_OF[c] ?? 'transparent',
        }}
      />
    ))}
  </div>
);

const SpriteForge: React.FC = () => {
  const [cells, setCells] = useState<string[]>(freshCells);
  const [selected, setSelected] = useState<string>('O');
  const [showGuide, setShowGuide] = useState(true);
  const [painting, setPainting] = useState(false);

  useEffect(() => {
    setCells(loadCells());
    const stop = () => setPainting(false);
    window.addEventListener('pointerup', stop);
    return () => window.removeEventListener('pointerup', stop);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, cells.join(''));
    }
  }, [cells]);

  const paint = (i: number) => {
    setCells((prev) => {
      if (prev[i] === selected) return prev;
      const next = [...prev];
      next[i] = selected;
      return next;
    });
  };

  const reset = () => setCells(freshCells());

  const bottomPainted = countPainted(cells, GRID * GRID / 2, GRID * GRID);
  const restored = bottomPainted >= RESTORE_THRESHOLD;

  useEffect(() => {
    if (restored) markRestored('sprite');
  }, [restored]);

  const selectedEntry = PALETTE.find((p) => p.key === selected)!;

  return (
    <div className="select-none">
      {/* Palette — every color is a number */}
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {PALETTE.map((p) => (
          <button
            key={p.key}
            onClick={() => setSelected(p.key)}
            className={`flex flex-col items-center px-2 py-1 rounded-lg border-2 text-[10px] font-mono
              ${selected === p.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
          >
            <span
              className="w-6 h-6 rounded border border-gray-300 mb-0.5"
              style={
                p.key === '.'
                  ? { background: 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 8px 8px' }
                  : { backgroundColor: p.hex }
              }
            />
            {p.label}
            <span className="text-gray-400">{p.hex || '——'}</span>
          </button>
        ))}
      </div>

      <div className="text-center font-mono text-xs text-gray-500 mb-2">
        brush = <span className="font-bold text-gray-800">{selectedEntry.hex || 'ERASER'}</span>
        {selectedEntry.hex && ' — a color is a number!'}
      </div>

      {/* Canvas */}
      <div className="flex justify-center">
        <div
          className="grid border-4 border-blue-500 border-dashed rounded-lg overflow-hidden touch-none bg-white"
          style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))`, width: 'min(100%, 320px)' }}
          onPointerDown={() => setPainting(true)}
        >
          {cells.map((c, i) => {
            const row = Math.floor(i / GRID);
            const col = i % GRID;
            const guideKey = row >= GRID / 2 ? GUIDE_BOTTOM[row - GRID / 2][col] : '.';
            const showGhost = showGuide && c === '.' && guideKey !== '.';
            return (
              <div
                key={i}
                onPointerDown={() => paint(i)}
                onPointerEnter={() => painting && paint(i)}
                className="aspect-square border border-gray-100 cursor-crosshair"
                style={{
                  backgroundColor:
                    COLOR_OF[c] ?? (showGhost ? `${COLOR_OF[guideKey]}33` : 'transparent'),
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mt-3">
        <button
          onClick={() => setShowGuide((g) => !g)}
          className="px-3 py-1 rounded-full text-xs font-mono bg-gray-100 border border-gray-300 hover:bg-gray-200"
        >
          {showGuide ? 'HIDE' : 'SHOW'} NOVA GUIDE 🐱
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 rounded-full text-xs font-mono bg-gray-100 border border-gray-300 hover:bg-gray-200"
        >
          RELOAD RECOVERED DATA
        </button>
      </div>

      {/* Cartridge status + actual-size preview */}
      <div className="mt-4 mx-auto max-w-xs rounded-xl bg-gray-900 p-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-500">CARTRIDGE // SPRITE SHEET</div>
            {restored ? (
              <div className="text-green-400">SPRITE: RESTORED ✓ (saved)</div>
            ) : (
              <div className="text-amber-400">
                MISSING PIXELS: {Math.max(RESTORE_THRESHOLD - bottomPainted, 0)}
              </div>
            )}
          </div>
          <motion.div
            animate={restored ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            title="actual size"
          >
            <CellGrid cells={cells} cellPx={3} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpriteForge;
