// /lab/forge-run — "a puppet you program".
//
// The proposed answer to the open question in CLAUDE.md: what kind of game can
// a kid join without drowning, while genuinely reading and changing code?
//
// A character that obeys a short instruction list LITERALLY. The program is
// always already working when handed over, so nobody starts from a blank page;
// the kid changes one thing and watches. When it goes wrong it is funny, and
// the funny is the feedback — which is the only way to satisfy both "the story
// never quizzes" and "failure should always be funny".
import { useCallback, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import PuppetStage from '@/components/lab/forge/PuppetStage';
import { parse, run, reactTo, Step, Reaction, ParseError } from '@/components/lab/forge/puppet';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// Handed to the reader already working — it runs clean, it just doesn't reach
// the fish yet. Nobody starts from a blank page; you always start from a thing
// that works and change it.
const STARTER = `move 4
turn left
move 1
say "meow"`;

const SPEAKER = {
  flamey: { name: 'Flamey', color: 'text-sky-300' },
  starlax: { name: 'Starlax', color: 'text-rose-300' },
  nova: { name: 'Nova', color: 'text-amber-300' },
};

// Breaking has no floor to fall off. It takes the same understanding as fixing,
// it's funnier, and it sets up Chapter 11 — ten chapters of making bugs on
// purpose, then one chapter hunting one.
const MISCHIEF = [
  'Make it walk into the wall on purpose. How many times can you get it to try?',
  'Delete the quotes around "meow" and run it. What does it say now?',
  'Change a move to repeat, and forget to indent underneath.',
  'Make it spin forever without going anywhere.',
  'Get the fish — but make it BONK at least three times on the way.',
];

const ForgeRun: NextPage = () => {
  const [src, setSrc] = useState(STARTER);
  const [steps, setSteps] = useState<Step[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [stepMs, setStepMs] = useState(180);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // A long program must not mean a long wait. Playback speeds up as the trace
  // grows so the whole run always lands in a few seconds — a kid who wrote
  // `repeat 99` should see the joke, not a loading bar.
  const paceFor = (n: number) => Math.max(28, Math.min(180, Math.round(3600 / Math.max(n, 1))));

  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setPlaying(false);
  }, []);

  useEffect(() => stop, [stop]);

  const start = () => {
    stop();
    const parsed = parse(src);
    const { steps: trace, overran } = run(parsed.cmds);
    const lines = src.split('\n').filter((l) => l.trim() && !l.trim().startsWith('--')).length;
    const pace = paceFor(trace.length);
    setErrors(parsed.errors);
    setSteps(trace);
    setStepMs(pace);
    setCursor(-1);
    setReactions([]);
    if (trace.length) {
      setPlaying(true);
      // reactions land after the run finishes — the cast watched it happen
      timer.current = setTimeout(
        () => setReactions(reactTo(trace, parsed.errors, overran, lines)),
        trace.length * pace + 250
      );
    } else {
      setReactions(reactTo(trace, parsed.errors, overran, lines));
    }
  };

  useEffect(() => {
    if (!playing) return;
    if (cursor >= steps.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setCursor((c) => c + 1), stepMs);
    return () => clearTimeout(t);
  }, [playing, cursor, steps.length, stepMs]);

  const current = cursor >= 0 ? steps[cursor] : undefined;
  const caught = steps.slice(0, cursor + 1).some((s) => s.gotFish);
  const activeLine = current?.line ?? -1;

  return (
    <>
      <Head>
        <title>[lab] Forge: a puppet you program - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#12101f] px-6 py-12 text-gray-300">
        <div className="mx-auto max-w-5xl">
          <Link href="/lab" className="text-xs text-gray-600 hover:text-gray-400">← the lab</Link>

          <h1 className="mb-3 mt-4 text-4xl text-white" style={{ fontFamily: PIXEL_FONT }}>
            It does exactly what you said
          </h1>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-gray-400">
            The program is already working when the reader gets it. They change one line and press RUN. The machine never guesses what they meant — it does what they said, and that is both the joke and the lesson.
          </p>

          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            {/* the controller — which is just the code */}
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">the controller</div>
              <div className="rounded-xl border border-gray-800 bg-[#181528] p-3">
                <div className="relative">
                  {/* the line the puppet is executing right now */}
                  <div className="pointer-events-none absolute inset-0 p-2" aria-hidden>
                    {src.split('\n').map((_, i) => (
                      <div
                        key={i}
                        className={`h-[24px] rounded ${i === activeLine ? 'bg-amber-400/15' : ''}`}
                      />
                    ))}
                  </div>
                  <textarea
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    spellCheck={false}
                    rows={9}
                    className="relative w-full resize-none rounded-lg bg-transparent p-2 text-amber-200 outline-none"
                    style={{ fontFamily: MONO, fontSize: 14, lineHeight: '24px' }}
                  />
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={playing ? stop : start}
                    className="rounded-md bg-emerald-600 px-4 py-1.5 text-white hover:bg-emerald-500"
                    style={{ fontFamily: PIXEL_FONT, fontSize: 18 }}
                  >
                    {playing ? 'STOP ■' : 'RUN ▶'}
                  </button>
                  <span className="text-xs text-gray-500">
                    {steps.length > 0 && `${steps.length} things it did`}
                  </span>
                </div>

                {errors.length > 0 && (
                  <ul className="mt-3 space-y-1 text-xs text-rose-300">
                    {errors.map((e, i) => (
                      <li key={i}>
                        <span className="text-gray-500">line {e.line + 1}:</span> {e.message}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 border-t border-gray-800 pt-3">
                  <div className="mb-1.5 text-[11px] uppercase tracking-wider text-gray-500">
                    every word it knows
                  </div>
                  <ul className="space-y-0.5 text-xs text-gray-500" style={{ fontFamily: MONO }}>
                    <li><span className="text-sky-300">move</span> 3</li>
                    <li><span className="text-sky-300">turn</span> left · right</li>
                    <li><span className="text-sky-300">say</span> &quot;hello&quot;</li>
                    <li><span className="text-sky-300">repeat</span> 4 <span className="text-gray-600">(indent underneath)</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* the stage */}
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">the puppet</div>
              <PuppetStage step={current} catColor="#F2A03D" caught={caught} stepMs={stepMs} />

              {/* the cast, watching */}
              <div className="mt-4 min-h-[104px] rounded-xl border border-gray-800 bg-[#181528] p-4">
                {reactions.length === 0 ? (
                  <p className="text-sm text-gray-600">…</p>
                ) : (
                  <ul className="space-y-2">
                    {reactions.map((r, i) => (
                      <li key={i} className="text-sm">
                        <span className={`${SPEAKER[r.who].color} mr-2`} style={{ fontFamily: PIXEL_FONT, fontSize: 16 }}>
                          {SPEAKER[r.who].name}
                        </span>
                        <span className="text-gray-300">{r.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* the mischief card */}
          <section className="mt-10 rounded-xl border border-amber-500/25 bg-amber-400/5 p-5">
            <h2 className="mb-1 text-2xl text-amber-300" style={{ fontFamily: PIXEL_FONT }}>
              Try to break it
            </h2>
            <p className="mb-3 max-w-2xl text-sm text-gray-400">
              Breaking has no floor to fall off — you cannot fail at it. It takes exactly the same understanding as fixing, it is funnier, and after ten chapters of making bugs on purpose, Chapter 11 asks them to hunt one.
            </p>
            <ul className="space-y-1.5">
              {MISCHIEF.map((m) => (
                <li key={m} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-amber-400">▸</span>{m}
                </li>
              ))}
            </ul>
          </section>

          <hr className="my-10 border-gray-800" />
          <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>
            How this lasts thirteen chapters
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
            The program does not just get longer — it learns <em>one new word per chapter</em>, and each word is that chapter&rsquo;s concept made executable. Right now the machine knows four. By Chapter 9 it knows <code className="text-sky-300">repeat</code>; by Chapter 7, <code className="text-sky-300">if</code>. The file the reader has been poking at all along turns out to be CATVENTURE — so the book&rsquo;s promise is kept by the machine, not by narration.
          </p>
        </div>
      </main>
    </>
  );
};

export default ForgeRun;
