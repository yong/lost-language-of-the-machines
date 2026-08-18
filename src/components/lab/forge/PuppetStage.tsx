// PuppetStage.tsx — the board the programmed puppet walks around on.
// Deliberately tiny: 10x7. A world you can see all of, like a language you can
// read all of.
import { motion } from 'framer-motion';
import { COLS, ROWS, LEVEL, FISH, Step, START } from './puppet';
import { SPRITE, spriteColors } from './cartridge';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const CELL = 46;
const PX = 2.5; // sprite pixel size — 16 * 2.5 = 40, sits inside a 46 cell

interface Props {
  step?: Step;
  catColor: string;
  caught: boolean;
  /** playback pace in ms — the walk animation must not lag behind the trace */
  stepMs?: number;
}

const PuppetStage: React.FC<Props> = ({ step, catColor, caught, stepMs = 180 }) => {
  const at = step ?? { ...START, line: -1 };
  const colors = spriteColors(catColor);

  return (
    <div
      className="relative rounded-xl border-4 border-gray-800 overflow-hidden"
      style={{ width: COLS * CELL, height: ROWS * CELL, background: '#2B2158' }}
    >
      {/* floor grid */}
      <svg width={COLS * CELL} height={ROWS * CELL} className="absolute inset-0">
        {Array.from({ length: ROWS + 1 }, (_, r) => (
          <line key={`h${r}`} x1={0} y1={r * CELL} x2={COLS * CELL} y2={r * CELL} stroke="#ffffff10" />
        ))}
        {Array.from({ length: COLS + 1 }, (_, c) => (
          <line key={`v${c}`} x1={c * CELL} y1={0} x2={c * CELL} y2={ROWS * CELL} stroke="#ffffff10" />
        ))}
      </svg>

      {/* walls */}
      {LEVEL.flatMap((row, y) =>
        row.split('').map((ch, x) =>
          ch === '#' ? (
            <div
              key={`w${x}-${y}`}
              className="absolute rounded-sm"
              style={{
                left: x * CELL + 3, top: y * CELL + 3,
                width: CELL - 6, height: CELL - 6,
                background: '#4a3572', boxShadow: 'inset 0 -4px 0 #00000040',
              }}
            />
          ) : null
        )
      )}

      {/* the fish */}
      {!caught && (
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ left: FISH.x * CELL, top: FISH.y * CELL, width: CELL, height: CELL, fontSize: 26 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🐟
        </motion.div>
      )}

      {/* the puppet */}
      <motion.div
        className="absolute"
        animate={{ left: at.x * CELL + 3, top: at.y * CELL + 3 }}
        transition={{ duration: (stepMs * 0.9) / 1000, ease: 'linear' }}
      >
        <motion.div
          animate={at.bonk ? { x: [0, 5, -3, 0] } : { x: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(16, ${PX}px)`,
              // dir 2 = facing left; mirror the sprite so it looks where it walks
              transform: at.dir === 2 ? 'scaleX(-1)' : 'none',
            }}
          >
            {SPRITE.flatMap((row, y) =>
              row.split('').map((ch, x) => (
                <div
                  key={`${x}-${y}`}
                  style={{ width: PX, height: PX, backgroundColor: colors[ch] ?? 'transparent' }}
                />
              ))
            )}
          </div>
        </motion.div>

        {at.bonk && (
          <div
            className="absolute -top-4 left-8 text-amber-300 text-lg whitespace-nowrap"
            style={{ fontFamily: PIXEL_FONT }}
          >
            BONK
          </div>
        )}

        {at.bubble !== undefined && (
          <div className="absolute -top-7 left-6 rounded-lg bg-white px-2 py-0.5 text-xs text-gray-900 whitespace-nowrap shadow">
            {at.bubble.trim() || '…'}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PuppetStage;
