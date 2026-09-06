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

  /** How far one tap carries: past the next beat, plus any `rush` messages
   *  riding along with it. A three-part joke is one beat, not three taps. */
  const landing = (from: number) => {
    let i = from + 1;
    while (SCRIPT[i + 1]?.kind === 'msg' && (SCRIPT[i + 1] as { rush?: true }).rush) i += 1;
    return i;
  };

  const advance = () => {
    // `typing` must gate this too: during the pause `at` has not moved yet, so
    // a second tap would queue a second advance and skip a beat — sometimes a
    // whole toy. An impatient reader taps faster than the pause.
    if (gate || done || typing) return;
    const next = SCRIPT[at + 1];
    // A typing indicator only where the script asks for one. Shown on every
    // message it is just dead time; shown four times a chapter it is suspense.
    if (next?.kind === 'msg' && next.typing) {
      setTyping(true);
      setTimeout(() => { setTyping(false); setAt(landing(at)); }, 650);
    } else {
      setAt(landing(at));
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [at, typing, pending]);

  // the row the hex toy cuts up — one of the reader's own if they drew
  const hexRow = rows.find((r) => r !== 0) ?? row ?? 0b00111100;

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
      {b.toy === 'hex' && <HexToy value={hexRow} cut={cut} onCut={() => setCut(true)} />}
    </div>
  );

  return (
    <>
      <Head>
        <title>[lab] Chapter One, as a chat novel - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {/* The whole page is the tap target — chat-fiction readers tap anywhere,
          never a button they must aim at. Putting this on the thread div was
          not enough: on a nearly-empty first screen most of the page is empty
          space BELOW the messages, and taps there did nothing. */}
      <main
        onClick={advance}
        role="presentation"
        className="flex min-h-screen cursor-pointer select-none flex-col bg-[#12101f] text-gray-300"
      >
        {/* thread header */}
        <div
          onClick={(e) => e.stopPropagation()}
          role="presentation"
          className="sticky top-0 z-20 flex cursor-auto items-center gap-3 border-b border-gray-800 bg-[#12101f]/95 px-4 py-3 backdrop-blur"
        >
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

        {/* The thread — and the tap target. Chat fiction readers tap ANYWHERE,
            never a button they have to aim at; that is the whole difference
            between "mindless" and "slow". The toys stop propagation so playing
            with a switch doesn't also advance the story. */}
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
          {/* only the end-of-chapter link needs to swallow the tap */}
          <div className="mx-auto max-w-lg" onClick={(e) => done && e.stopPropagation()} role="presentation">
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
            ) : gate ? (
              // The one time the footer speaks up: the story is waiting on the
              // reader's hands, and it should say so plainly.
              <p className="py-3 text-center text-sm text-amber-300">{gate} ↑</p>
            ) : (
              // Not a button — the whole screen is the button. This is a hint,
              // and it fades once the reader has obviously got it.
              <p className={`py-3 text-center text-xs text-gray-600 transition-opacity ${at > 3 ? 'opacity-40' : ''}`}>
                tap anywhere to keep reading
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Novel;
