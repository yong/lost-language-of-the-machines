// GameScreen.tsx — CATVENTURE as it currently stands, rendered live from a
// Cartridge. Every tier of the experiment points at one of these, so a change
// to a number is visible in the same glance as the number itself.
import { motion } from 'framer-motion';
import { Cartridge, SPRITE, spriteColors } from './cartridge';
import { PIXEL_FONT } from '@/components/lab/world/theme';

interface Props {
  cartridge: Cartridge;
  /** Shown across the screen when the source doesn't parse. */
  fault?: string;
}

const CELL = 7;

const GameScreen: React.FC<Props> = ({ cartridge, fault }) => {
  const colors = spriteColors(cartridge.catColor);
  // speed 0 reads as "stopped", not as a divide-by-zero.
  const bob = cartridge.speed > 0 ? 1.6 / cartridge.speed : 0;

  return (
    <div
      className="relative rounded-xl overflow-hidden border-4 border-gray-800 shadow-inner"
      style={{ background: cartridge.skyColor, aspectRatio: '4 / 3' }}
    >
      {/* score, in the cabinet's own font */}
      <div
        className="absolute top-2 left-3 text-amber-300 text-xl tracking-widest"
        style={{ fontFamily: PIXEL_FONT }}
      >
        SCORE {String(cartridge.score).padStart(4, '0')}
      </div>

      {/* the hero */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="grid"
          style={{ gridTemplateColumns: `repeat(16, ${CELL}px)` }}
          animate={bob ? { y: [0, -6, 0] } : { y: 0 }}
          transition={bob ? { duration: bob, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          {SPRITE.flatMap((row, y) =>
            row.split('').map((ch, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: CELL,
                  height: CELL,
                  backgroundColor: colors[ch] ?? 'transparent',
                }}
              />
            ))
          )}
        </motion.div>
      </div>

      {/* ground line, so the bob reads as a bob */}
      <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: '#1b1730' }} />

      {fault && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75 px-4">
          <div
            className="text-center text-red-300 text-lg leading-snug"
            style={{ fontFamily: PIXEL_FONT }}
          >
            {fault}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
