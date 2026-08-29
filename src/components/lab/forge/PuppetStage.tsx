// PuppetStage.tsx — the board the programmed puppet walks around on.
// Deliberately tiny: 10x7. A world you can see all of, like a language you can
// read all of.
import { motion } from 'framer-motion';
import { COLS, ROWS, LEVEL, FISH, Step, START } from './puppet';
import { SPRITE, spriteColors } from './cartridge';
import { PIXEL_FONT } from '@/components/lab/world/theme';

// The board is fluid: it fills the width it is given, up to a comfortable max,
// and everything inside is positioned in percentages. Fixed pixel cells used to
// push a 460px board onto a 390px phone. See CLAUDE.md → mobile first.
const MAX_W = COLS * 46;
const PCT_X = 100 / COLS;
const PCT_Y = 100 / ROWS;

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
      className="relative w-full rounded-xl border-4 border-gray-800 overflow-hidden"
      style={{ maxWidth: MAX_W, aspectRatio: `${COLS} / ${ROWS}`, background: '#2B2158' }}
    >
      {/* floor grid — viewBox scales with the board */}
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: ROWS + 1 }, (_, r) => (
          <line key={`h${r}`} x1={0} y1={r} x2={COLS} y2={r} stroke="#ffffff10" strokeWidth={0.02} />
        ))}
        {Array.from({ length: COLS + 1 }, (_, c) => (
          <line key={`v${c}`} x1={c} y1={0} x2={c} y2={ROWS} stroke="#ffffff10" strokeWidth={0.02} />
        ))}
      </svg>

      {/* walls */}
      {LEVEL.flatMap((row, y) =>
        row.split('').map((ch, x) =>
          ch === '#' ? (
            <div
              key={`w${x}-${y}`}
              className="absolute"
              style={{
                left: `${x * PCT_X + 0.4}%`, top: `${y * PCT_Y + 0.6}%`,
                width: `${PCT_X - 0.8}%`, height: `${PCT_Y - 1.2}%`,
                borderRadius: 3,
                background: '#4a3572', boxShadow: 'inset 0 -4px 0 #00000040',
              }}
            />
          ) : null
        )
      )}

      {/* the fish */}
      {!caught && (
        <motion.div
          className="absolute flex items-center justify-center text-[4.5vw] sm:text-2xl"
          style={{ left: `${FISH.x * PCT_X}%`, top: `${FISH.y * PCT_Y}%`, width: `${PCT_X}%`, height: `${PCT_Y}%` }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🐟
        </motion.div>
      )}

      {/* the puppet */}
      <motion.div
        className="absolute flex items-center justify-center"
        animate={{ left: `${at.x * PCT_X}%`, top: `${at.y * PCT_Y}%` }}
        transition={{ duration: (stepMs * 0.9) / 1000, ease: 'linear' }}
        style={{ width: `${PCT_X}%`, height: `${PCT_Y}%` }}
      >
        <motion.div
          animate={at.bonk ? { x: [0, 5, -3, 0] } : { x: 0 }}
          transition={{ duration: 0.22 }}
          className="h-[86%] w-[86%]"
        >
          <div
            className="grid h-full w-full"
            style={{
              gridTemplateColumns: 'repeat(16, 1fr)',
              gridTemplateRows: 'repeat(16, 1fr)',
              // dir 2 = facing left; mirror the sprite so it looks where it walks
              transform: at.dir === 2 ? 'scaleX(-1)' : 'none',
            }}
          >
            {SPRITE.flatMap((row, y) =>
              row.split('').map((ch, x) => (
                <div
                  key={`${x}-${y}`}
                  style={{ backgroundColor: colors[ch] ?? 'transparent' }}
                />
              ))
            )}
          </div>
        </motion.div>

        {at.bonk && (
          <div
            className="absolute -top-3 left-[70%] whitespace-nowrap text-base text-amber-300 sm:text-lg"
            style={{ fontFamily: PIXEL_FONT }}
          >
            BONK
          </div>
        )}

        {at.bubble !== undefined && (
          <div className="absolute -top-5 left-[55%] whitespace-nowrap rounded-lg bg-white px-2 py-0.5 text-[10px] text-gray-900 shadow sm:text-xs">
            {at.bubble.trim() || '…'}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PuppetStage;
