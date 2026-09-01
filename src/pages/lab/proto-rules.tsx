// /lab/proto-rules — PROTOTYPE D: "the rules are things"
//
// The kid manipulates: THE RULES. The code lives: in the world, as objects.
//
// Nothing is typed. The rules governing the world sit underneath it as tiles,
// and changing a tile changes the world instantly. The level is deliberately
// IMPOSSIBLE to solve by skill — the fish is sealed inside a wall — so the
// only way through is to notice that "WALL IS SOLID" was a decision somebody
// made, and that decisions can be unmade.
//
// That moment is the book's whole argument in one interaction: the machine has
// no opinions. Everything it does, somebody chose.
import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';
import DPad from '@/components/lab/forge/DPad';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const W = 8;
const H = 6;
// Everything inside the board is positioned in PERCENTAGES so the world scales
// to whatever width the phone gives it (see CLAUDE.md → mobile first).
const PCT_X = 100 / W;
const PCT_Y = 100 / H;

// The fish is sealed in. No path exists. That is the point.
const MAP = [
  '........',
  '..####..',
  '..#F.#..',
  '..####..',
  '........',
  '.C....V.',
];

const START = { x: 1, y: 5 };
const FISH = { x: 3, y: 2 };
const VACUUM = { x: 6, y: 5 };

// ── the rules, as data ──────────────────────────────────────────────────────

interface Rule {
  subject: string;
  options: string[];
  value: string;
  note: string;
}

const INITIAL_RULES: Rule[] = [
  { subject: 'WALL', options: ['SOLID', 'OPEN'], value: 'SOLID', note: 'can you walk through it?' },
  { subject: 'FISH', options: ['POINTS', 'SOLID'], value: 'POINTS', note: 'what happens when you touch it?' },
  { subject: 'VACUUM', options: ['DEADLY', 'FRIENDLY'], value: 'DEADLY', note: 'and this one?' },
  { subject: 'CAT', options: ['SLOW', 'FAST'], value: 'SLOW', note: 'one step, or two?' },
];

const ProtoRules: NextPage = () => {
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [pos, setPos] = useState(START);
  const [score, setScore] = useState(0);
  const [caught, setCaught] = useState(false);
  const [flash, setFlash] = useState<string | undefined>();

  const ruleFor = (s: string) => rules.find((r) => r.subject === s)!.value;

  const cycle = (subject: string) =>
    setRules((rs) =>
      rs.map((r) =>
        r.subject === subject
          ? { ...r, value: r.options[(r.options.indexOf(r.value) + 1) % r.options.length] }
          : r
      )
    );

  const blocked = useCallback(
    (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= W || y >= H) return true;
      const ch = MAP[y][x];
      if (ch === '#') return ruleFor('WALL') === 'SOLID';
      if (x === FISH.x && y === FISH.y && !caught) return ruleFor('FISH') === 'SOLID';
      return false;
    },
    // ruleFor reads `rules`; caught gates the fish
    [rules, caught] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const step = useCallback(
    (dx: number, dy: number) => {
      const distance = ruleFor('CAT') === 'FAST' ? 2 : 1;
      setPos((p) => {
        let { x, y } = p;
        for (let i = 0; i < distance; i++) {
          const nx = x + dx;
          const ny = y + dy;
          if (blocked(nx, ny)) break;
          x = nx;
          y = ny;
        }
        return { x, y };
      });
    },
    [blocked, rules] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // reaching things
  useEffect(() => {
    if (pos.x === FISH.x && pos.y === FISH.y && !caught && ruleFor('FISH') === 'POINTS') {
      setCaught(true);
      setScore((s) => s + 1);
      setFlash('FISH! You did not get better at the game. You changed the game.');
    }
    if (pos.x === VACUUM.x && pos.y === VACUUM.y) {
      if (ruleFor('VACUUM') === 'DEADLY') {
        setPos(START);
        setFlash('The vacuum ate you. It was told to.');
      } else {
        setFlash('The vacuum purrs at you. It was told to do that instead.');
      }
    }
  }, [pos]); // eslint-disable-line react-hooks/exhaustive-deps

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
      };
      const m = map[e.key];
      if (m) { e.preventDefault(); step(m[0], m[1]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  const reset = () => {
    setRules(INITIAL_RULES);
    setPos(START);
    setScore(0);
    setCaught(false);
    setFlash(undefined);
  };

  return (
    <>
      <Head>
        <title>[lab] Prototype: the rules are things - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#12101f] px-6 py-12 text-gray-300">
        <div className="mx-auto max-w-4xl">
          <Link href="/lab/prototypes" className="text-xs text-gray-600 hover:text-gray-400">← all prototypes</Link>

          <div className="mb-1 mt-4 text-xs uppercase tracking-widest text-amber-400">prototype D · the rules are things</div>
          <h1 className="mb-3 text-4xl text-white" style={{ fontFamily: PIXEL_FONT }}>
            You can&rsquo;t reach the fish
          </h1>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-400">
            Tap the arrows to move (or use the arrow keys). The fish is sealed inside a wall and there is no path to it — no amount of being good at this will help. Look underneath the world instead.
          </p>

          <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
            {/* the world — pinned on a phone. The rule tiles sit ~900px down
                the page, so without this you tap WALL IS SOLID and cannot see
                the wall change. See CLAUDE.md mobile rule 7. */}
            <div className="w-full">
              <div className="sticky top-0 z-30 -mx-4 bg-[#12101f]/95 px-4 py-2 backdrop-blur lg:static lg:mx-0 lg:bg-transparent lg:p-0">
              <div
                className="relative mx-auto w-full rounded-xl border-4 border-gray-800 lg:mx-0"
                style={{ maxWidth: 300, aspectRatio: `${W} / ${H}`, background: '#2B2158' }}
              >
                {MAP.flatMap((row, y) =>
                  row.split('').map((ch, x) =>
                    ch === '#' ? (
                      <div
                        key={`w${x}-${y}`}
                        className="absolute transition-all duration-300"
                        style={{
                          left: `${x * PCT_X + 0.4}%`, top: `${y * PCT_Y + 0.6}%`,
                          width: `${PCT_X - 0.8}%`, height: `${PCT_Y - 1.2}%`,
                          borderRadius: 3,
                          background: ruleFor('WALL') === 'SOLID' ? '#4a3572' : '#4a357222',
                          border: ruleFor('WALL') === 'SOLID' ? 'none' : '2px dashed #4a3572',
                        }}
                      />
                    ) : null
                  )
                )}

                {!caught && (
                  <motion.div
                    className="absolute flex items-center justify-center text-[5vw] sm:text-2xl"
                    style={{ left: `${FISH.x * PCT_X}%`, top: `${FISH.y * PCT_Y}%`, width: `${PCT_X}%`, height: `${PCT_Y}%` }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >🐟</motion.div>
                )}

                <div
                  className="absolute flex items-center justify-center text-[5vw] sm:text-2xl"
                  style={{ left: `${VACUUM.x * PCT_X}%`, top: `${VACUUM.y * PCT_Y}%`, width: `${PCT_X}%`, height: `${PCT_Y}%` }}
                >
                  {ruleFor('VACUUM') === 'DEADLY' ? '🤖' : '🧸'}
                </div>

                <motion.div
                  className="absolute flex items-center justify-center text-[5.5vw] sm:text-3xl"
                  animate={{ left: `${pos.x * PCT_X}%`, top: `${pos.y * PCT_Y}%` }}
                  transition={{ duration: 0.12 }}
                  style={{ width: `${PCT_X}%`, height: `${PCT_Y}%` }}
                >🐱</motion.div>

                <div
                  className="absolute right-2 top-1 text-amber-300"
                  style={{ fontFamily: PIXEL_FONT, fontSize: 20 }}
                >
                  SCORE {score}
                </div>
              </div>

              </div>

              <p className="mt-3 min-h-[2.5rem] max-w-[416px] text-sm text-emerald-300">{flash}</p>

              <div className="mt-1 max-w-[416px]">
                <DPad onMove={step} hint="or use the arrow keys" />
              </div>
            </div>

            {/* the rules */}
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                the rules of this world — tap one
              </div>
              <div className="space-y-2">
                {rules.map((r) => (
                  <div key={r.subject} className="rounded-lg border border-gray-800 bg-[#181528] p-3">
                    <div className="flex flex-wrap items-center gap-2" style={{ fontFamily: MONO }}>
                      <span className="rounded bg-gray-800 px-2 py-1 text-sm text-gray-300">{r.subject}</span>
                      <span className="text-xs text-gray-600">IS</span>
                      <button
                        onClick={() => cycle(r.subject)}
                        // min-h-11 = 44px, the thumb minimum
                        className="min-h-11 touch-manipulation rounded border-2 border-dashed border-amber-400/70 bg-amber-400/10 px-4 text-sm text-amber-200 active:bg-amber-400/30 sm:hover:bg-amber-400/20"
                      >
                        {r.value}
                      </button>
                    </div>
                    {/* was hover-only via ml-auto crowding; on touch it must simply be visible */}
                    <p className="mt-1.5 text-[11px] text-gray-600">{r.note}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={reset}
                className="mt-3 min-h-11 touch-manipulation rounded-md border border-gray-700 px-4 text-xs text-gray-400 active:bg-gray-700 sm:hover:bg-gray-800"
              >
                put everything back
              </button>

              <div className="mt-6 rounded-xl border border-amber-500/25 bg-amber-400/5 p-4">
                <h2 className="mb-1 text-xl text-amber-300" style={{ fontFamily: PIXEL_FONT }}>Try to break it</h2>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>▸ Walk through a wall.</li>
                  <li>▸ Make the fish impossible to pick up.</li>
                  <li>▸ Befriend the thing that&rsquo;s trying to eat you.</li>
                  <li>▸ Make the cat too fast to control.</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-10 border-gray-800" />
          <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>What this is good at</h2>
          <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-gray-400">
            <li>▸ <strong className="text-gray-200">The floor is on the ground.</strong> No typing, no syntax, no spelling. Tap a word.</li>
            <li>▸ <strong className="text-gray-200">It teaches the deepest idea in the book</strong> — rules are data somebody chose, not laws of nature.</li>
            <li>▸ <strong className="text-gray-200">The puzzle can only be solved by changing the rules,</strong> so the kid cannot skip the lesson by being good at games.</li>
            <li>▸ Breaking things is the <em>intended</em> solution, not a naughty side path.</li>
          </ul>
          <h2 className="mb-3 mt-8 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>What it is bad at</h2>
          <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-gray-400">
            <li>▸ <strong className="text-gray-200">Tapping a toggle isn&rsquo;t really writing code.</strong> It teaches the <em>idea</em> of code more than the <em>practice</em>.</li>
            <li>▸ Authoring cost is real — every rule needs hand-built consequences.</li>
            <li>▸ Hard to grow into sequence, loops or functions; it is declarative all the way down.</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default ProtoRules;
