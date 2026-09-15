// /lab/novel — Chapter One as a chat novel with the toys inside the thread.
//
// This is the synthesis the whole /lab exploration was circling: chat + game,
// where the game is not a panel beside the conversation but a beat IN it.
// Starlax says the cabinet has one switch, and the switch is right there, and
// nothing continues until the reader flips it.
//
// THREE REVEAL MODES survive the pacing experiment (log:
// raw/chat-novel-pacing-experiment.md). Only "whole bubble" was dropped: a
// bubble popping into silence is dead air, and it measured slowest.
//
//   static  the default. The script is cut into blocks at each toy; a block
//           renders whole and still, ends at its toy, and playing the toy
//           reveals the next. Nothing moves, so nothing competes with the words.
//   dots    a typing indicator sized to the message, then the whole bubble.
//   stream  word by word with a caret. Kept because combining it WITH the dots
//           is the one unexplored idea worth trying; a tap completes the
//           message instantly.
//
// THE PAGE IS NEVER SCROLLED FOR THE READER. A reader's speed and a playback
// clock cannot be kept in sync, so the machine must not try: when the newest
// message would fall below the fold, playback STOPS and waits. The reader
// continues when they are ready, and only then does the view move — a page
// turn they asked for, not an interruption.
import { useCallback, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { SCRIPT, Beat } from '@/components/lab/novel/script';
import { SwitchToy, RowToy, GridToy, HexToy } from '@/components/lab/novel/toys';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const STORAGE_KEY = 'gameforge.novel.v1';
const MODE_KEY = 'gameforge.novel.reveal';

type Reveal = 'static' | 'dots' | 'stream';
const MODES: Reveal[] = ['static', 'dots', 'stream'];
const MODE_LABEL: Record<Reveal, string> = {
  static: 'static',
  dots: '••• typing',
  stream: 'word by word',
};

const WORD_MS = 55;

/** In static mode the script is cut into blocks at each toy. `BLOCK_ENDS[i]` is
 *  the index of the last beat to show while block `i` is the live one. */
const BLOCK_ENDS: number[] = (() => {
  const ends = SCRIPT.map((b, i) => (b.kind === 'toy' ? i : -1)).filter((i) => i >= 0);
  ends.push(SCRIPT.length - 1); // the tail after the final toy
  return ends;
})();

const WHO = {
  starlax: { name: 'Starlax', cls: 'bg-sky-600 text-white', side: 'right' as const },
  flamey: { name: 'Flamey', cls: 'bg-[#26223a] text-gray-100', side: 'left' as const },
  nova: { name: 'Nova', cls: 'bg-[#26223a] text-amber-200', side: 'left' as const },
};

/** Time to sit on a beat once it has arrived — reading rate, not a fixed tick. */
const dwellFor = (b: Beat | undefined): number => {
  if (!b) return 0;
  if (b.kind === 'toy') return 450;
  if (b.kind === 'beat') return 650;
  if (b.rush) return 320;
  return Math.min(1400, 380 + b.text.length * 18);
};

/** How long "…" shows before a bubble lands — how long they'd take to thumb it. */
const dotsFor = (b: Beat) =>
  b.kind === 'msg' && b.typing ? 800 : Math.min(1100, 320 + (b.kind === 'msg' ? b.text.length : 0) * 13);

const Novel: NextPage = () => {
  const [at, setAt] = useState(0);
  const [switchOn, setSwitchOn] = useState(false);
  const [row, setRow] = useState(0);
  const [rows, setRows] = useState<number[]>(Array(8).fill(0));
  const [cut, setCut] = useState(false);
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<Reveal>('static');
  const [block, setBlock] = useState(0);
  /** dots mode: playback is parked because the newest message is below the fold */
  const [waiting, setWaiting] = useState(false);
  /** stream mode: words of the newest bubble revealed so far; Infinity = done */
  const [words, setWords] = useState(Infinity);
  /** a gate was just satisfied and the story is HELD until the reader says go */
  const [held, setHeld] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const blockTop = useRef<HTMLDivElement>(null);
  const newest = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(STORAGE_KEY);
      if (s) {
        const d = JSON.parse(s);
        if (Array.isArray(d?.rows) && d.rows.length === 8) setRows(d.rows);
      }
      // ?reveal=static|dots gives each experience its own shareable URL and
      // wins over whatever was last used on this device.
      const q = new URLSearchParams(window.location.search).get('reveal');
      const m = q ?? window.localStorage.getItem(MODE_KEY);
      if (m && (MODES as string[]).includes(m)) setMode(m as Reveal);
    } catch { /* a bad save just means defaults */ }
  }, []);
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows })); } catch { /* private mode */ }
  }, [rows]);
  useEffect(() => {
    try { window.localStorage.setItem(MODE_KEY, mode); } catch { /* private mode */ }
  }, [mode]);

  const head = mode === 'static' ? BLOCK_ENDS[block] : at;
  const shown = SCRIPT.slice(0, head + 1);
  const current = SCRIPT[head];
  const pending = current?.kind === 'toy' ? current : null;
  const blockStart = mode === 'static' ? (block === 0 ? 0 : BLOCK_ENDS[block - 1] + 1) : -1;

  const gate = (() => {
    if (!pending) return null;
    switch (pending.toy) {
      case 'switch': return switchOn ? null : 'flip the switch';
      case 'row': return row !== 0 ? null : 'flip some of them';
      case 'grid': return rows.reduce((n, r) => n + r.toString(2).replace(/0/g, '').length, 0) >= 8
        ? null : 'draw something first';
      case 'hex': return cut ? null : 'cut it in half';
    }
  })();

  const done = mode === 'static'
    ? block >= BLOCK_ENDS.length - 1 && !gate
    : at >= SCRIPT.length - 1;

  const step = useCallback(() => {
    setAt((v) => {
      const next = SCRIPT[v + 1];
      if (!next) return v;
      const theirs = next.kind === 'msg' && next.who !== 'starlax';
      if (next.kind === 'msg' && (next.typing || theirs)) {
        setTyping(true);
        window.setTimeout(() => { setTyping(false); setAt((x) => x + 1); }, dotsFor(next));
        return v;
      }
      return v + 1;
    });
  }, []);

  const wordCount = current?.kind === 'msg' ? current.text.split(' ').length : 0;
  const streaming = mode === 'stream' && wordCount > 0 && words < wordCount;

  // Reset the word counter whenever a new beat lands. This has to be its own
  // effect: setting it from inside the setAt updater is a side effect in a
  // reducer, which React is free to double-invoke or reorder — and did, so
  // nothing ever streamed.
  useEffect(() => {
    const b = SCRIPT[at];
    setWords(mode === 'stream' && b?.kind === 'msg' ? 0 : Infinity);
  }, [at, mode]);

  useEffect(() => {
    if (!streaming) return;
    const t = window.setTimeout(() => setWords((w) => w + 1), WORD_MS);
    return () => window.clearTimeout(t);
  }, [streaming, words]);

  /** Is the newest beat fully on screen from where the reader currently is? */
  const newestVisible = () => {
    const el = scroller.current, m = newest.current;
    if (!el || !m) return true;
    return m.offsetTop + m.offsetHeight <= el.scrollTop + el.clientHeight - 4;
  };

  // Any timed mode: the moment a message lands below the fold, park. This is
  // the whole rule — the reader's eyes set the pace, never the clock.
  useEffect(() => {
    if (mode === 'static' || done) return;
    const id = requestAnimationFrame(() => { if (!newestVisible()) setWaiting(true); });
    return () => cancelAnimationFrame(id);
  }, [at, typing, words, mode, done]);

  // Satisfying a gate must NOT launch the next thing. The reader has just got
  // their hands on a toy; they may want to keep flipping switches or redraw the
  // cat, and having the story barge in 500ms later is the same violation as
  // scrolling the page for them — the machine moving on its own clock.
  // So: hold, and wait to be told.
  const prevGate = useRef<string | null>(null);
  const prevMode = useRef<Reveal>(mode);
  useEffect(() => {
    // Changing mode moves `head` between a block's toy and a per-message
    // cursor, so `gate` can go from set to null without the reader touching
    // anything. That is not a satisfied gate and must not hold the story —
    // it fired on the very first render, because the page defaults to `static`
    // for one frame before ?reveal= is read.
    const modeChanged = prevMode.current !== mode;
    if (modeChanged) setHeld(false);
    else if (prevGate.current && !gate) setHeld(true);
    prevGate.current = gate ?? null;
    prevMode.current = mode;
  }, [gate, mode]);

  // Playback. Static has no clock at all. Dots and stream play on until a gate,
  // until a hold, or until the fold parks them.
  useEffect(() => {
    if (held) return;
    if (mode === 'static') {
      if (gate || done) return;
      const t = window.setTimeout(() => setBlock((b) => Math.min(b + 1, BLOCK_ENDS.length - 1)), 260);
      return () => window.clearTimeout(t);
    }
    if (done || gate || typing || waiting || streaming) return;
    const t = window.setTimeout(step, dwellFor(SCRIPT[at + 1]));
    return () => window.clearTimeout(t);
  }, [at, gate, typing, done, waiting, streaming, held, step, mode, block]);

  // The ONLY two times the view moves, and both are answers to something the
  // reader did: a block they unlocked, or a page they asked to turn.
  useEffect(() => {
    const el = scroller.current;
    if (!el || mode !== 'static') return;
    const id = requestAnimationFrame(() => {
      const top = blockTop.current;
      if (block === 0 || !top) { el.scrollTop = 0; return; }
      el.scrollTop = Math.max(0, top.offsetTop - 12);
    });
    return () => cancelAnimationFrame(id);
  }, [mode, block]);

  /** Reader scrolled far enough themselves — no need to make them tap as well. */
  const onScroll = () => { if (waiting && newestVisible()) setWaiting(false); };

  const turnPage = () => {
    const el = scroller.current, m = newest.current;
    if (el && m) el.scrollTop = Math.max(0, m.offsetTop - 12);
    setWaiting(false);
  };

  /** A tap means "more": turn the page if parked, finish the message if it is
   *  still arriving, else skip the current wait. */
  const tap = () => {
    if (gate || done) return;
    if (held) { setHeld(false); return; }
    if (mode === 'static') return;
    if (waiting) { turnPage(); return; }
    if (streaming) { setWords(Infinity); return; }
    if (typing) return;
    step();
  };

  const cycleMode = () => setMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);

  const renderToy = (b: Extract<Beat, { kind: 'toy' }>, live: boolean) => (
    <div
      onClick={(e) => e.stopPropagation()}
      role="presentation"
      className="my-3 cursor-auto rounded-2xl border border-amber-500/30 bg-[#181528] p-3"
    >
      <div className="mb-2 text-center text-[10px] uppercase tracking-widest text-amber-400/80">{b.label}</div>
      {b.toy === 'switch' && <SwitchToy on={switchOn} onChange={live ? setSwitchOn : () => {}} />}
      {b.toy === 'row' && <RowToy value={row} onChange={live ? setRow : () => {}} />}
      {b.toy === 'grid' && <GridToy rows={rows} onChange={live ? setRows : () => {}} />}
      {b.toy === 'hex' && (
        <HexToy value={rows.find((r) => r !== 0) ?? row ?? 0b00111100} cut={cut} onCut={() => setCut(true)} />
      )}
    </div>
  );

  const renderBeat = (b: Beat, i: number, animated: boolean) => {
    const ref = i === head ? newest : undefined;
    if (b.kind === 'beat') return <div key={i} ref={ref} className="h-5" />;
    if (b.kind === 'toy') return <div key={i} ref={ref}>{renderToy(b, i === head)}</div>;
    const w = WHO[b.who];
    const row = `mb-1.5 flex ${w.side === 'right' ? 'justify-end' : 'justify-start'}`;
    const partial = i === at && mode === 'stream' && words < b.text.split(' ').length;
    const bubble = (
      <span className={`max-w-[82%] rounded-2xl px-3 py-1.5 text-[15px] leading-snug ${w.cls}`}>
        {partial ? b.text.split(' ').slice(0, words).join(' ') : b.text}
        {partial && <span className="ml-0.5 opacity-50">▍</span>}
      </span>
    );
    return animated ? (
      <motion.div
        key={i} ref={ref}
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className={row}
      >
        {bubble}
      </motion.div>
    ) : (
      <div key={i} ref={ref} className={row}>{bubble}</div>
    );
  };

  const progress = Math.round((head / (SCRIPT.length - 1)) * 100);

  return (
    <>
      <Head>
        <title>[lab] Chapter One, as a chat novel - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {/* h-dvh, not h-screen: on a phone the browser chrome changes the visual
          viewport, and vh units leave the footer under it. */}
      <main
        className="flex h-screen flex-col overflow-hidden bg-[#12101f] text-gray-300"
        style={{ height: '100dvh' }}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-800 px-4 py-3">
          <Link href="/lab" className="text-xs text-gray-600 hover:text-gray-400">←</Link>
          <div className="h-8 w-8 rounded-full bg-sky-900/60 text-center text-lg leading-8">🤖</div>
          <div>
            <div className="text-sm text-gray-100">Flamey</div>
            <div className="text-[10px] text-gray-500">{done ? 'read' : typing ? 'typing…' : 'online'}</div>
          </div>
          <button
            onClick={cycleMode}
            className="ml-auto min-h-11 rounded-full border border-gray-700 px-3 text-[11px] text-gray-400 active:bg-gray-800"
          >
            {MODE_LABEL[mode]}
          </button>
        </div>

        {/* the only thing that scrolls, and only the reader moves it */}
        <div
          ref={scroller}
          onScroll={onScroll}
          onClick={tap}
          role="presentation"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
        >
          <div className="mx-auto max-w-lg">
            {mode === 'static' ? (
              <>
                {SCRIPT.slice(0, blockStart).map((b, i) => renderBeat(b, i, false))}
                {/* the block that just appeared: ONE fade for the whole block,
                    never per message — staggered bubbles are exactly the
                    distraction we removed. */}
                <motion.div key={block} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <div ref={blockTop} />
                  {SCRIPT.slice(blockStart, head + 1).map((b, i) => renderBeat(b, blockStart + i, false))}
                </motion.div>
              </>
            ) : (
              shown.map((b, i) => renderBeat(b, i, true))
            )}

            <AnimatePresence>
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mb-1.5 flex justify-start"
                >
                  <span className="rounded-2xl bg-[#26223a] px-3 py-2">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="mx-0.5 inline-block h-1.5 w-1.5 rounded-full bg-gray-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* room to turn a page: without it the newest message cannot be
                brought to the top of the viewport, only to the bottom. */}
            {mode !== 'static' && !done && <div style={{ height: '62vh' }} />}
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-800 px-4 py-2">
          <div className="mx-auto max-w-lg">
            {done ? (
              <div className="py-1 text-center">
                <p className="mb-2 text-sm text-gray-500">
                  end of chapter one. she is going to need twenty four switches.
                </p>
                <Link
                  href="/lab/proto-rom"
                  className="inline-flex min-h-11 items-center rounded-full bg-amber-500/20 px-5 text-sm text-amber-200"
                >
                  chapter two →
                </Link>
              </div>
            ) : (
              // Fixed height on purpose: when this swapped between a progress
              // bar and a line of text it changed the footer's height, which
              // shrank the thread and clamped its scroll — the whole
              // conversation twitched every time a toy appeared.
              <div className="flex h-10 items-center justify-center">
                {gate ? (
                  <p className="text-center text-sm text-amber-300">{gate} ↑</p>
                ) : held ? (
                  // The toy above is still live. Play with it as long as you
                  // like; the story waits.
                  <button onClick={() => setHeld(false)} className="text-sm text-sky-300">
                    continue when you&rsquo;re ready →
                  </button>
                ) : waiting ? (
                  <button onClick={turnPage} className="text-sm text-sky-300">keep reading ↓</button>
                ) : (
                  <div className="h-0.5 w-full overflow-hidden rounded bg-gray-800">
                    <motion.div className="h-full bg-sky-600" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Novel;
