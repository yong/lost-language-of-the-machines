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

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const W = 8;
const H = 6;
const CELL = 52;

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
            Arrow keys to move. The fish is sealed inside a wall and there is no path to it — no amount of being good at this will help. Look underneath the world instead.
          </p>

          <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
            {/* the world */}
            <div>
              <div
                className="relative rounded-xl border-4 border-gray-800"
                style={{ width: W * CELL, height: H * CELL, background: '#2B2158' }}
              >
                {MAP.flatMap((row, y) =>
                  row.split('').map((ch, x) =>
                    ch === '#' ? (
                      <div
                        key={`w${x}-${y}`}
                        className="absolute rounded-sm transition-all duration-300"
                        style={{
                          left: x * CELL + 3, top: y * CELL + 3,
                          width: CELL - 6, height: CELL - 6,
                          background: ruleFor('WALL') === 'SOLID' ? '#4a3572' : '#4a357222',
                          border: ruleFor('WALL') === 'SOLID' ? 'none' : '2px dashed #4a3572',
                        }}
                      />
                    ) : null
                  )
                )}

                {!caught && (
                  <motion.div
                    className="absolute flex items-center justify-center"
                    style={{ left: FISH.x * CELL, top: FISH.y * CELL, width: CELL, height: CELL, fontSize: 26 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >🐟</motion.div>
                )}

                <div
                  className="absolute flex items-center justify-center"
                  style={{ left: VACUUM.x * CELL, top: VACUUM.y * CELL, width: CELL, height: CELL, fontSize: 24 }}
                  title={ruleFor('VACUUM')}
                >
                  {ruleFor('VACUUM') === 'DEADLY' ? '🤖' : '🧸'}
                </div>

                <motion.div
                  className="absolute flex items-center justify-center"
                  animate={{ left: pos.x * CELL, top: pos.y * CELL }}
                  transition={{ duration: 0.12 }}
                  style={{ width: CELL, height: CELL, fontSize: 28 }}
                >🐱</motion.div>

                <div
                  className="absolute right-2 top-1 text-amber-300"
                  style={{ fontFamily: PIXEL_FONT, fontSize: 20 }}
                >
                  SCORE {score}
                </div>
              </div>

              <p className="mt-3 min-h-[2.5rem] max-w-[416px] text-sm text-emerald-300">{flash}</p>
            </div>

            {/* the rules */}
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                the rules of this world — tap one
              </div>
              <div className="space-y-2">
                {rules.map((r) => (
                  <div key={r.subject} className="rounded-lg border border-gray-800 bg-[#181528] p-3">
                    <div className="flex items-center gap-2" style={{ fontFamily: MONO }}>
                      <span className="rounded bg-gray-800 px-2 py-1 text-sm text-gray-300">{r.subject}</span>
                      <span className="text-xs text-gray-600">IS</span>
                      <button
                        onClick={() => cycle(r.subject)}
                        className="rounded border-2 border-dashed border-amber-400/70 bg-amber-400/10 px-2 py-1 text-sm text-amber-200 hover:bg-amber-400/20"
                      >
                        {r.value}
                      </button>
                      <span className="ml-auto text-[11px] text-gray-600">{r.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={reset}
                className="mt-3 rounded-md border border-gray-700 px-3 py-1 text-xs text-gray-400 hover:bg-gray-800"
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
