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
  starlax: { name: 'Starlax', cls: 'bg-sky-700 text-white', side: 'right' as const },
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
        // Everything the reader did, not just the drawing. A kid who takes a
        // phone call four blocks in was being dropped back at "flip the
        // switch" — the chapter restarted and their cat was gone.
        if (Array.isArray(d?.rows) && d.rows.length === 8) setRows(d.rows);
        if (typeof d?.switchOn === 'boolean') setSwitchOn(d.switchOn);
        if (typeof d?.row === 'number') setRow(d.row);
        if (typeof d?.cut === 'boolean') setCut(d.cut);
        if (typeof d?.block === 'number') setBlock(Math.min(Math.max(d.block, 0), BLOCK_ENDS.length - 1));
        if (typeof d?.at === 'number') setAt(Math.min(Math.max(d.at, 0), SCRIPT.length - 1));
        // Come back HELD. Restoring the toys can satisfy the block's gate, and
        // without this the story would notice and race off on its own the
        // instant the page loaded — the reader would watch their chapter play
        // itself. Held renders only when there is no gate outstanding, so this
        // is invisible to a reader who left mid-toy.
        if (d?.block > 0 || d?.at > 0) setHeld(true);
      }
      // ?reveal=static|dots gives each experience its own shareable URL and
      // wins over whatever was last used on this device.
      const q = new URLSearchParams(window.location.search).get('reveal');
      const m = q ?? window.localStorage.getItem(MODE_KEY);
      if (m && (MODES as string[]).includes(m)) setMode(m as Reveal);
    } catch { /* a bad save just means defaults */ }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows, switchOn, row, cut, block, at }));
    } catch { /* private mode */ }
  }, [rows, switchOn, row, cut, block, at]);
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

  // Every toy stays LIVE for the rest of the chapter. They used to go read-only
  // the moment their block was done, while still rendering at full opacity with
  // pointer events on — so a kid tapping the switch again got a silent no-op,
  // which is the worst answer a control can give. It is also the same rule we
  // already keep during a hold ("the toy stays live, the story waits"); having
  // it die one beat later was that rule with an expiry date.
  const renderToy = (b: Extract<Beat, { kind: 'toy' }>) => (
    <div
      onClick={(e) => e.stopPropagation()}
      role="presentation"
      className="my-3 cursor-auto rounded-2xl border border-amber-500/30 bg-[#181528] p-3"
    >
      <div className="mb-2 text-center text-[0.625rem] uppercase tracking-widest text-amber-400/80">{b.label}</div>
      {b.toy === 'switch' && <SwitchToy on={switchOn} onChange={setSwitchOn} />}
      {b.toy === 'row' && <RowToy value={row} onChange={setRow} />}
      {b.toy === 'grid' && <GridToy rows={rows} onChange={setRows} />}
      {b.toy === 'hex' && (
        <HexToy value={rows.find((r) => r !== 0) ?? row ?? 0b00111100} cut={cut} onCut={() => setCut(true)} />
      )}
    </div>
  );

  const renderBeat = (b: Beat, i: number, animated: boolean) => {
    const ref = i === head ? newest : undefined;
    if (b.kind === 'beat') return <div key={i} ref={ref} className="h-5" />;
    if (b.kind === 'toy') return <div key={i} ref={ref}>{renderToy(b)}</div>;
    const w = WHO[b.who];
    const row = `mb-1.5 flex ${w.side === 'right' ? 'justify-end' : 'justify-start'}`;
    const partial = i === at && mode === 'stream' && words < b.text.split(' ').length;
    const bubble = (
      <span className={`max-w-[82%] rounded-2xl px-3 py-1.5 text-[0.9375rem] leading-snug ${w.cls}`}>
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
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-800 bg-[#0d0b17] px-4 py-3">
          {/* was 10x16px at 2.58:1 — a rule the page states and broke. The
              negative margin keeps the 44px target from padding the header. */}
          <Link
            href="/lab"
            aria-label="back to the lab"
            className="-m-2 flex min-h-11 min-w-11 items-center justify-center text-gray-400"
          >←</Link>
          <div className="h-8 w-8 rounded-full bg-sky-900/60 text-center text-lg leading-8">🤖</div>
          <div>
            <div className="text-sm text-gray-100">Flamey</div>
            <div className="text-[0.625rem] text-gray-400">{done ? 'read' : typing ? 'typing…' : 'online'}</div>
          </div>
          <button
            onClick={cycleMode}
            className="ml-auto min-h-11 rounded-full border border-gray-700 px-3 text-[0.6875rem] text-gray-400 active:bg-gray-800"
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
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-7"
        >
          {/* Anchored to the BOTTOM, like every chat app. Top-aligned content
              that is shorter than the thread left the toy stranded at the top
              with a screenful of blank beneath it — unscrollable, but it reads
              as broken all the same. Short conversations now sit just above the
              footer and the empty space goes above, where it belongs. */}
          <div className="mx-auto flex min-h-full max-w-lg flex-col justify-end">
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
            {/* Room to turn a page — but ONLY while the story is actually
                running. While it waits on the reader (a gate to play, or a
                hold to release) there must be nothing below the content to
                scroll into: scrolling into dead space while nothing happens
                reads as broken. With the spacer gone the thread ends at the
                toy, so down is locked and only re-reading upward is left. */}
            {mode !== 'static' && !done && !gate && !held && <div style={{ height: '62dvh' }} />}
          </div>
        </div>

        {/* The footer is a CONTROL, not part of the conversation, so it needs
            air on both sides of its rule: the thread's pb-7 above it and py-3
            here below. At py-2 with the toy card's border ending 16px away,
            the button read as the next thing Starlax said. */}
        <div className="shrink-0 border-t border-gray-800 bg-[#0d0b17] px-4 py-3">
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
              // Every measurement here is in rem, never px, so the whole
              // footer scales with the reader's font size instead of clipping.
              // The height is RESERVED at the tallest state (a button whose
              // label has wrapped to two lines) rather than frozen at one
              // value: the footer must not CHANGE height between states --
              // that shrank the thread, clamped its scroll and twitched the
              // conversation every time a toy appeared -- but a hard height
              // clips the text as soon as a reader bumps their font size.
              // 2 lines (2.5rem) + button padding (0.75rem) + py-1 (0.5rem).
              <div className="flex min-h-[3.75rem] items-center justify-center py-1">
                {/* The one place motion belongs: the story has STOPPED and is
                    waiting on the reader, so nothing is competing with reading.
                    A still line of small text here got missed. */}
                {gate ? (
                  <p className="flex items-center gap-1.5 text-center text-sm text-amber-300">
                    {gate}
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 1.1, repeat: 3, ease: 'easeInOut' }}
                    >↑</motion.span>
                  </p>
                ) : held ? (
                  // The toy above is still live. Play with it as long as you
                  // like; the story waits.
                  <motion.button
                    onClick={() => setHeld(false)}
                    className="min-h-11 rounded-full bg-sky-700 px-5 py-1.5 text-center text-sm leading-tight text-white"
                    animate={{ scale: [1, 1.045, 1] }}
                    // A few pulses to catch the eye, then still. Motion that
                    // never stops is both a moving tap target and the exact
                    // distraction the static decision removed.
                    transition={{ duration: 1.4, repeat: 2, ease: 'easeInOut' }}
                  >
                    continue when you&rsquo;re ready →
                  </motion.button>
                ) : waiting ? (
                  <motion.button
                    onClick={turnPage}
                    className="min-h-11 rounded-full bg-sky-700 px-5 py-1.5 text-center text-sm leading-tight text-white"
                    animate={{ scale: [1, 1.045, 1] }}
                    // A few pulses to catch the eye, then still. Motion that
                    // never stops is both a moving tap target and the exact
                    // distraction the static decision removed.
                    transition={{ duration: 1.4, repeat: 2, ease: 'easeInOut' }}
                  >
                    keep reading ↓
                  </motion.button>
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
