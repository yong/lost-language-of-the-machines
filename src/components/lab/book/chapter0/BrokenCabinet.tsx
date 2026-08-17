// BrokenCabinet.tsx — the broken arcade machine that starts the whole book.
// It reflects the reader's real progress: once they've painted the hero in
// Chapter 4, the cat on this screen is whole. Coming back here and finding
// your own repairs is the point.
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';
import { useSprite, SpriteChip } from '@/components/lab/world/CartridgeHud';
import { useProgress } from '@/components/lab/world/progress';

const BrokenCabinet: React.FC = () => {
  const sprite = useSprite();
  const progress = useProgress();
  const scoreFixed = !!progress.score;
  const anyRepairs = scoreFixed || !!sprite;

  return (
    <figure className="my-7">
      <div className="mx-auto max-w-sm rounded-2xl bg-gradient-to-b from-purple-900 to-purple-950 border-4 border-purple-700 p-3 shadow-2xl">
        {/* screen */}
        <div className="relative rounded-lg bg-black overflow-hidden border-2 border-gray-800 aspect-[4/3] flex flex-col items-center justify-center">
          {/* scanline flicker */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.05) 0px,transparent 2px,transparent 4px)' }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* half a title */}
          <motion.div
            className="text-pink-400 text-2xl tracking-widest"
            style={{ fontFamily: PIXEL_FONT }}
            animate={{ opacity: [1, 0.3, 1, 0.9] }}
            transition={{ duration: 2.6, repeat: Infinity }}
          >
            CATV<span className="text-gray-700">▓▚▓▞</span>
          </motion.div>

          {/* a score made of garbage */}
          <div className="text-green-500/70 text-sm mt-1" style={{ fontFamily: PIXEL_FONT }}>
            SCORE {scoreFixed ? '0013' : '▚▓▞▚'}
          </div>

          {/* the hero: half a cat, unless the reader has painted one */}
          <div className="mt-5 h-16 flex items-end justify-center">
            {sprite ? (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                title="your hero"
              >
                <SpriteChip sprite={sprite} px={3} />
              </motion.div>
            ) : (
              <div className="relative">
                {/* only the top half renders — the rest was erased */}
                <div className="overflow-hidden" style={{ height: 24 }}>
                  <div className="text-4xl leading-none">🐱</div>
                </div>
                <motion.div
                  className="text-gray-700 text-xs text-center mt-1"
                  style={{ fontFamily: PIXEL_FONT }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  ▚▓ DATA MISSING ▓▚
                </motion.div>
              </div>
            )}
          </div>

          <div className="absolute bottom-2 text-gray-600 text-xs" style={{ fontFamily: PIXEL_FONT }}>
            {sprite ? 'INSERT COIN' : 'ERR 0x1F — CARTRIDGE DAMAGED'}
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-lg"
            style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)' }} />
        </div>

        {/* cabinet controls */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="w-4 h-4 rounded-full bg-gray-900 border-2 border-gray-600" />
          <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-red-800" />
          <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-800" />
        </div>
      </div>

      <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
        {anyRepairs
          ? 'Your CATVENTURE — repaired this far by you.'
          : 'CATVENTURE, 200 years old. Nobody left alive can read it.'}
      </figcaption>
    </figure>
  );
};

export default BrokenCabinet;
