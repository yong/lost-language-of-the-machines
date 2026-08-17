// ScoreCounter.tsx — Chapter 1's Game Forge stage.
// The arcade's score display is stuck showing raw binary. The reader reads it
// back in decimal to repair the counter. Three rounds, then SCORE: RESTORED.
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';
import { markRestored } from '@/components/lab/world/progress';

const ROUNDS = [0b1101, 0b10110, 0b101010];

const bits = (n: number, width: number) => n.toString(2).padStart(width, '0').split('');

const ScoreCounter: React.FC = () => {
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState('');
  const [wrong, setWrong] = useState(false);

  const done = round >= ROUNDS.length;

  useEffect(() => {
    if (done) markRestored('score');
  }, [done]);

  const target = done ? 0 : ROUNDS[round];
  const width = done ? 0 : Math.max(4, target.toString(2).length);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(guess, 10) === target) {
      setGuess('');
      setWrong(false);
      setRound((r) => r + 1);
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="text-center" style={{ fontFamily: PIXEL_FONT }}>
      {/* The arcade cabinet's score display */}
      <div className="mx-auto max-w-sm rounded-xl bg-black border-4 border-gray-700 p-4">
        <div className="text-gray-500 text-sm mb-1">CATVENTURE // HIGH SCORE</div>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-2"
          >
            <div className="text-green-400 text-4xl">SCORE: RESTORED ✓</div>
            <div className="text-gray-400 text-sm mt-2">the counter reads numbers again</div>
          </motion.div>
        ) : (
          <>
            {/* the raw bits, as bulbs */}
            <div className="flex justify-center gap-1.5 my-3">
              {bits(target, width).map((b, i) => (
                <div
                  key={i}
                  className={`w-8 h-11 rounded flex items-center justify-center text-2xl border-2 ${
                    b === '1'
                      ? 'bg-amber-400 text-black border-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.7)]'
                      : 'bg-gray-900 text-gray-600 border-gray-700'
                  }`}
                >
                  {b}
                </div>
              ))}
            </div>
            <div className="text-gray-500 text-sm mb-2">
              place values:{' '}
              {bits(target, width)
                .map((_, i) => 2 ** (width - 1 - i))
                .join(' · ')}
            </div>

            <form onSubmit={submit} className="flex justify-center gap-2 mt-2">
              <input
                value={guess}
                onChange={(e) => { setGuess(e.target.value); setWrong(false); }}
                inputMode="numeric"
                placeholder="in decimal…"
                aria-label="the score in decimal"
                className="w-32 px-3 py-1.5 rounded bg-gray-800 text-amber-300 text-xl text-center border-2 border-gray-600 focus:border-amber-400 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xl"
              >
                FIX
              </button>
            </form>

            <motion.div
              key={wrong ? 'w' : 'ok'}
              animate={wrong ? { x: [0, -6, 6, -4, 0] } : {}}
              className={`text-sm mt-2 h-5 ${wrong ? 'text-red-400' : 'text-gray-600'}`}
            >
              {wrong ? 'the machine disagrees. add the lit place values.' : `repair ${round + 1} of ${ROUNDS.length}`}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreCounter;
