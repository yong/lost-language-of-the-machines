// RomScreen.tsx — the console, rendering whatever the bytes currently say.
// Nothing is stored twice: every pixel is read live out of the ROM, so a
// changed byte is visible in the same glance as the change.
//
// Each of the eight FLAGS bits does something you can SEE. That is the whole
// bet of the binary chapter: flipping bit 2 has to visibly put a hat on the
// cat, or "a number is a switch" stays a sentence in a book.
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
  const bob = cart.speed > 0 ? 2.2 / cart.speed : 0;

  const lights = cart.on('LIGHTS');
  const big = cart.on('BIG');
  const ghost = cart.on('GHOST');
  const mirror = cart.on('MIRROR');
  const rainbow = cart.on('RAINBOW');
  const debug = cart.on('DEBUG');

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border-4 border-gray-800"
      style={{
        aspectRatio: '4 / 3',
        background: bg,
        filter: lights ? undefined : 'brightness(0.42)',
        transition: 'filter .3s',
      }}
    >
      {/* DEBUG — the grid the builders used */}
      {debug && (
        <svg viewBox="0 0 8 6" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 7 }, (_, r) => (
            <line key={`h${r}`} x1={0} y1={r} x2={8} y2={r} stroke="#22c55e55" strokeWidth={0.02} />
          ))}
          {Array.from({ length: 9 }, (_, c) => (
            <line key={`v${c}`} x1={c} y1={0} x2={c} y2={6} stroke="#22c55e55" strokeWidth={0.02} />
          ))}
        </svg>
      )}

      <div
        className="absolute left-0 right-0 top-2 text-center text-amber-300"
        style={{ fontFamily: PIXEL_FONT, fontSize: 'clamp(14px, 4.4vw, 22px)' }}
      >
        {cart.title || ' '}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          style={{
            width: big ? '68%' : '46%',
            opacity: ghost ? 0.42 : 1,
            transform: mirror ? 'scaleX(-1)' : undefined,
            transition: 'width .3s, opacity .3s',
          }}
          animate={bob ? { y: ['0%', '-7%', '0%'] } : { y: 0 }}
          transition={bob ? { duration: bob, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          {/* HAT — bit 2, and nobody knows why it is in the cartridge */}
          {cart.on('HAT') && (
            <div className="absolute -top-[26%] left-1/2 h-[26%] w-[62%] -translate-x-1/2">
              <div className="absolute bottom-0 h-[26%] w-full rounded-sm bg-[#c0392b]" />
              <div className="absolute bottom-[22%] left-1/2 h-[80%] w-[62%] -translate-x-1/2 rounded-sm bg-[#e74c3c]" />
            </div>
          )}
          <motion.div
            className="grid"
            style={{ aspectRatio: '1', gridTemplateColumns: 'repeat(8, 1fr)' }}
            animate={rainbow ? { filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] } : { filter: 'hue-rotate(0deg)' }}
            transition={rainbow ? { duration: 3, repeat: Infinity, ease: 'linear' } : undefined}
          >
            {cart.sprite.map((idx, i) => (
              <div key={i} style={{ background: cart.palette[idx] ?? bg }} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* SOUND — bit 0 */}
      {cart.on('SOUND') && (
        <motion.div
          className="absolute left-3 top-2 text-amber-300"
          style={{ fontFamily: PIXEL_FONT, fontSize: 'clamp(13px, 4vw, 20px)' }}
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          ♪
        </motion.div>
      )}

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
