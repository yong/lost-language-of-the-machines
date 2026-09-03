// /lab/novel — Chapter One as a chat novel with the toys inside the thread.
//
// This is the synthesis the whole /lab exploration was circling: chat + game,
// where the game is not a panel beside the conversation but a beat IN it.
// Starlax says the cabinet has one switch, and the switch is right there, and
// nothing continues until the reader flips it.
//
// The reader stands on Starlax's side of the glass — her messages are on the
// right, as if the reader sent them — because she is the one with her hands on
// the machine, and the reader's thumb is doing what her hands are doing.
import { useEffect, useMemo, useRef, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { SCRIPT, Beat } from '@/components/lab/novel/script';
import { SwitchToy, RowToy, GridToy, HexToy, bin8 } from '@/components/lab/novel/toys';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const STORAGE_KEY = 'gameforge.novel.v1';

const WHO = {
  starlax: { name: 'Starlax', cls: 'bg-sky-600 text-white', side: 'right' as const },
  flamey: { name: 'Flamey', cls: 'bg-[#26223a] text-gray-100', side: 'left' as const },
  nova: { name: 'Nova', cls: 'bg-[#26223a] text-amber-200', side: 'left' as const },
};

const Novel: NextPage = () => {
  // how far down the script we've read
  const [at, setAt] = useState(0);
  // toy state
  const [switchOn, setSwitchOn] = useState(false);
  const [row, setRow] = useState(0);
  const [rows, setRows] = useState<number[]>(Array(8).fill(0));
  const [cut, setCut] = useState(false);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // The drawing is the reader's own — persist it like every other Forge piece.
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

  // the toy currently blocking the story, if any
  const pending = useMemo(() => {
    const b = SCRIPT[at];
    return b?.kind === 'toy' ? b : null;
  }, [at]);

  // what still needs doing before the thread moves on
  const gate = useMemo(() => {
    if (!pending) return null;
    switch (pending.toy) {
      case 'switch': return switchOn ? null : 'flip the switch';
      case 'row': return row !== 0 ? null : 'flip at least one';
      case 'grid': return rows.reduce((n, r) => n + r.toString(2).replace(/0/g, '').length, 0) >= 8
        ? null : 'draw something first';
      case 'hex': return cut ? null : 'cut it in half';
    }
  }, [pending, switchOn, row, rows, cut]);

  const done = at >= SCRIPT.length - 1;

  const advance = () => {
    // `typing` must gate this too: during the pause `at` has not moved yet, so
    // a second tap would queue a second advance and skip a beat — sometimes a
    // whole toy. An impatient reader taps faster than 420ms.
    if (gate || done || typing) return;
    const next = SCRIPT[at + 1];
    // a message gets a typing pause; a toy appears at once
    if (next?.kind === 'msg' && next.who !== 'starlax') {
      setTyping(true);
      setTimeout(() => { setTyping(false); setAt((v) => v + 1); }, 420);
    } else {
      setAt((v) => v + 1);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [at, typing, pending]);

  // the row the hex toy cuts up — one of the reader's own if they drew
  const hexRow = rows.find((r) => r !== 0) ?? row ?? 0b00111100;

  const renderToy = (b: Extract<Beat, { kind: 'toy' }>, live: boolean) => (
    <div className="my-3 rounded-2xl border border-amber-500/30 bg-[#181528] p-3">
      <div className="mb-2 text-center text-[10px] uppercase tracking-widest text-amber-400/80">{b.label}</div>
      {b.toy === 'switch' && <SwitchToy on={switchOn} onChange={live ? setSwitchOn : () => {}} />}
      {b.toy === 'row' && <RowToy value={row} onChange={live ? setRow : () => {}} />}
      {b.toy === 'grid' && <GridToy rows={rows} onChange={live ? setRows : () => {}} />}
      {b.toy === 'hex' && <HexToy value={hexRow} cut={cut} onCut={() => setCut(true)} />}
    </div>
  );

  return (
    <>
      <Head>
        <title>[lab] Chapter One, as a chat novel - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="flex min-h-screen flex-col bg-[#12101f] text-gray-300">
        {/* thread header */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-800 bg-[#12101f]/95 px-4 py-3 backdrop-blur">
          <Link href="/lab" className="text-xs text-gray-600 hover:text-gray-400">←</Link>
          <div className="h-8 w-8 rounded-full bg-sky-900/60 text-center text-lg leading-8">🤖</div>
          <div>
            <div className="text-sm text-gray-100">Flamey</div>
            <div className="text-[10px] text-gray-500">{done ? 'read' : 'online'}</div>
          </div>
          <span className="ml-auto text-[10px] text-gray-600" style={{ fontFamily: PIXEL_FONT, fontSize: 14 }}>
            CH 1 · A NUMBER IS A SWITCH
          </span>
        </div>

        {/* the thread */}
        <div className="mx-auto w-full max-w-lg flex-1 px-4 py-4">
          {shown.map((b, i) => {
            if (b.kind === 'beat') return <div key={i} className="h-5" />;
            if (b.kind === 'toy') return <div key={i}>{renderToy(b, i === at)}</div>;
            const w = WHO[b.who];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
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
          <div ref={endRef} />
        </div>

        {/* the only control: keep reading. It refuses while a toy is unplayed. */}
        <div className="sticky bottom-0 border-t border-gray-800 bg-[#12101f]/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto max-w-lg">
            {done ? (
              <div className="text-center">
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
              <button
                onClick={advance}
                disabled={!!gate}
                className={`min-h-12 w-full rounded-full text-sm transition ${
                  gate
                    ? 'cursor-not-allowed bg-[#1c1930] text-gray-600'
                    : 'bg-sky-600 text-white active:bg-sky-700'
                }`}
              >
                {gate ?? 'next'}
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Novel;
