// /lab/novel — Chapter One as a chat novel with the toys inside the thread.
//
// This is the synthesis the whole /lab exploration was circling: chat + game,
// where the game is not a panel beside the conversation but a beat IN it.
// Starlax says the cabinet has one switch, and the switch is right there, and
// nothing continues until the reader flips it.
//
// PACING: the conversation plays ITSELF at a reading rate and stops only where
// the reader's hands are needed. The genre standard (Hooked, Yarn, Wattpad Tap)
// is one tap per message, but tapping ~66 times to read a chapter tested badly
// here — the toys already ask for the reader's hands, so the prose should not.
// A tap still works: it skips the wait for anyone impatient.
//
// LAYOUT: the page itself never scrolls. The thread is a flex-1 overflow
// container between a fixed header and footer. Page-level scrolling fought the
// sticky bars and every new message interrupted the previous smooth-scroll
// animation, which is what made the screen jump around at the bottom.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { SCRIPT, Beat } from '@/components/lab/novel/script';
import { SwitchToy, RowToy, GridToy, HexToy } from '@/components/lab/novel/toys';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const STORAGE_KEY = 'gameforge.novel.v1';

const WHO = {
  starlax: { name: 'Starlax', cls: 'bg-sky-600 text-white', side: 'right' as const },
  flamey: { name: 'Flamey', cls: 'bg-[#26223a] text-gray-100', side: 'left' as const },
  nova: { name: 'Nova', cls: 'bg-[#26223a] text-amber-200', side: 'left' as const },
};

/** How long to sit on a beat before the next one arrives. Reading rate, not a
 *  fixed tick: a long bubble gets longer, a rapid-fire line comes straight in. */
const delayFor = (b: Beat | undefined): number => {
  if (!b) return 0;
  if (b.kind === 'toy') return 450;
  if (b.kind === 'beat') return 650;
  if (b.rush) return 420;
  return Math.min(2300, 620 + b.text.length * 34);
};

const Novel: NextPage = () => {
  const [at, setAt] = useState(0);
  const [switchOn, setSwitchOn] = useState(false);
  const [row, setRow] = useState(0);
  const [rows, setRows] = useState<number[]>(Array(8).fill(0));
  const [cut, setCut] = useState(false);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const stick = useRef(true); // is the reader parked at the bottom?

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(STORAGE_KEY);
      if (s) {
        const d = JSON.parse(s);
        if (Array.isArray(d?.rows) && d.rows.length === 8) setRows(d.rows);
      }
    } catch { /* a bad save just means a blank grid */ }
  }, []);
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows })); } catch { /* private mode */ }
  }, [rows]);

  const shown = SCRIPT.slice(0, at + 1);
  const pending = useMemo(() => {
    const b = SCRIPT[at];
    return b?.kind === 'toy' ? b : null;
  }, [at]);

  const gate = useMemo(() => {
    if (!pending) return null;
    switch (pending.toy) {
      case 'switch': return switchOn ? null : 'flip the switch';
      case 'row': return row !== 0 ? null : 'flip some of them';
      case 'grid': return rows.reduce((n, r) => n + r.toString(2).replace(/0/g, '').length, 0) >= 8
        ? null : 'draw something first';
      case 'hex': return cut ? null : 'cut it in half';
    }
  }, [pending, switchOn, row, rows, cut]);

  const done = at >= SCRIPT.length - 1;

  const step = useCallback(() => {
    setAt((v) => {
      const next = SCRIPT[v + 1];
      if (!next) return v;
      if (next.kind === 'msg' && next.typing) {
        // the four places a typing indicator earns its delay
        setTyping(true);
        window.setTimeout(() => { setTyping(false); setAt((x) => x + 1); }, 700);
        return v;
      }
      return v + 1;
    });
  }, []);

  // The conversation plays itself. It halts on a gate and resumes the moment
  // the reader satisfies it, because `gate` is a dependency.
  useEffect(() => {
    if (done || gate || typing) return;
    const t = window.setTimeout(step, delayFor(SCRIPT[at + 1]));
    return () => window.clearTimeout(t);
  }, [at, gate, typing, done, step]);

  // Follow the conversation only while the reader is parked at the bottom —
  // never yank them back down if they scrolled up to re-read something.
  useEffect(() => {
    const el = scroller.current;
    if (!el || !stick.current) return;
    // after paint, not during: pinning to scrollHeight before the new bubble has
    // laid out lands slightly short and the thread twitches backwards.
    const id = requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    return () => cancelAnimationFrame(id);
  }, [at, typing]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const hurry = () => { if (!gate && !done && !typing) step(); };

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

  const progress = Math.round((at / (SCRIPT.length - 1)) * 100);

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
          <span className="ml-auto text-gray-600" style={{ fontFamily: PIXEL_FONT, fontSize: 14 }}>
            CH 1 · A NUMBER IS A SWITCH
          </span>
        </div>

        {/* the only thing that scrolls */}
        <div
          ref={scroller}
          onScroll={onScroll}
          onClick={hurry}
          role="presentation"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
        >
          <div className="mx-auto max-w-lg">
            {shown.map((b, i) => {
              if (b.kind === 'beat') return <div key={i} className="h-5" />;
              if (b.kind === 'toy') return <div key={i}>{renderToy(b, i === at)}</div>;
              const w = WHO[b.who];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`mb-1.5 flex ${w.side === 'right' ? 'justify-end' : 'justify-start'}`}
                >
                  <span className={`max-w-[82%] rounded-2xl px-3 py-1.5 text-[15px] leading-snug ${w.cls}`}>
                    {b.text}
                  </span>
                </motion.div>
              );
            })}

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
              // bar and a line of gate text it changed the footer's height,
              // which shrank the thread and clamped its scroll — the whole
              // conversation twitched 18px every time a toy appeared.
              <div className="flex h-10 items-center justify-center">
                {gate ? (
                  <p className="text-center text-sm text-amber-300">{gate} ↑</p>
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
