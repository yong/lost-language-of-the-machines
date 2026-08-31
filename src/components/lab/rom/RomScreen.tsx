// RomScreen.tsx — the console, rendering whatever the bytes currently say.
// Nothing here is stored twice: every pixel on screen is read live out of the
// ROM, so a changed byte is visible in the same glance as the change.
import { motion } from 'framer-motion';
import { Cart } from './format';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const RomScreen: React.FC<{ cart: Cart }> = ({ cart }) => {
  if (!cart.ok) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-xl border-4 border-gray-800 bg-black px-4"
        style={{ aspectRatio: '4 / 3' }}
      >
        <p className="text-center text-base leading-snug text-red-400" style={{ fontFamily: PIXEL_FONT }}>
          ▲ CARTRIDGE ERROR
          <span className="mt-2 block text-sm text-red-300/80">{cart.fault}</span>
        </p>
      </div>
    );
  }

  const bg = cart.palette[0];
  // speed 0 reads as "stopped", not as a division by zero
  const bob = cart.speed > 0 ? 2.2 / cart.speed : 0;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border-4 border-gray-800"
      style={{ aspectRatio: '4 / 3', background: bg }}
    >
      <div
        className="absolute left-0 right-0 top-2 text-center text-amber-300"
        style={{ fontFamily: PIXEL_FONT, fontSize: 'clamp(14px, 4.4vw, 22px)' }}
      >
        {cart.title || ' '}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="grid"
          style={{ width: '46%', aspectRatio: '1', gridTemplateColumns: 'repeat(8, 1fr)' }}
          animate={bob ? { y: ['0%', '-7%', '0%'] } : { y: 0 }}
          transition={bob ? { duration: bob, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          {cart.sprite.map((idx, i) => (
            <div key={i} style={{ background: cart.palette[idx] ?? bg }} />
          ))}
        </motion.div>
      </div>

      <div
        className="absolute bottom-2 right-3 text-amber-300"
        style={{ fontFamily: PIXEL_FONT, fontSize: 'clamp(13px, 4vw, 20px)' }}
      >
        SCORE {String(cart.score).padStart(5, '0')}
      </div>
    </div>
  );
};

export default RomScreen;
