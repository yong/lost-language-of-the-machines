// /lab/proto-bit — the opening. Binary you draw with.
//
// The problem this solves: colour is the most fun thing in the cartridge, but
// colour needs hex, and hex is meaningless until you have binary. Meanwhile
// binary on its own is eight digits that do nothing you can touch.
//
// The way out is to stop treating binary as a NOTATION to be taught and treat a
// bit as a LIGHT to be tapped. The reader draws a picture by switching lights
// on and off; the binary is something they PRODUCED, not something they were
// shown. Then a byte is discovered ("one row of my drawing"), and hex arrives
// last, as relief from writing eight digits.
//
// Order is: one bit → eight bits → a picture → hex as shorthand → colour.
// Nothing is explained before it has been felt.
import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const bin8 = (n: number) => n.toString(2).padStart(8, '0');
const hex2 = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();

// ── 1 ── one bit ────────────────────────────────────────────────────────────

const OneBit: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
      <button
        onClick={() => setOn((v) => !v)}
        className="flex h-32 w-24 flex-col items-center justify-center rounded-2xl border-4 transition-colors touch-manipulation"
        style={{
          borderColor: on ? '#fbbf24' : '#374151',
          background: on ? 'rgba(251,191,36,0.18)' : '#181528',
        }}
        aria-label="the only switch"
      >
        <span className="text-5xl" style={{ fontFamily: MONO, color: on ? '#fbbf24' : '#4b5563' }}>
          {on ? '1' : '0'}
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-wider text-gray-500">
          {on ? 'on' : 'off'}
        </span>
      </button>

      <div
        className="flex w-full max-w-[260px] items-center justify-center rounded-xl border-4 border-gray-800"
        style={{ aspectRatio: '4/3', background: on ? '#2B2158' : '#08070f' }}
      >
        {on ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-amber-300"
            style={{ fontFamily: PIXEL_FONT, fontSize: 26 }}
          >
            CATVENTURE
          </motion.span>
        ) : (
          <span className="text-xs text-gray-700" style={{ fontFamily: PIXEL_FONT, fontSize: 18 }}>
            — no signal —
          </span>
        )}
      </div>
    </div>
  );
};

// ── 2 ── eight bits ─────────────────────────────────────────────────────────

const OneRow: React.FC = () => {
  const [row, setRow] = useState(0b00111100);
  const flip = (bit: number) => setRow((r) => r ^ (1 << bit));
  return (
    <div>
      <div className="flex gap-1">
        {[7, 6, 5, 4, 3, 2, 1, 0].map((bit) => {
          const on = ((row >> bit) & 1) === 1;
          return (
            <button
              key={bit}
              onClick={() => flip(bit)}
              aria-label={`pixel ${7 - bit}`}
              className="aspect-square flex-1 rounded border touch-manipulation transition-colors"
              style={{
                minHeight: 36,
                background: on ? '#fbbf24' : '#12101f',
                borderColor: on ? '#fbbf24' : '#374151',
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ fontFamily: MONO }}>
        <span className="text-lg text-amber-200">{bin8(row)}</span>
        <span className="text-sm text-gray-500">= {row} in the counting you already know</span>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Eight lights in a row. The machine has a word for eight of anything: a <strong className="text-gray-300">byte</strong>.
      </p>
    </div>
  );
};

// ── 3 ── a picture ──────────────────────────────────────────────────────────

type Notation = 'binary' | 'number' | 'hex';

const CHALLENGES = [
  { label: 'all lights on', want: 255, hint: 'every switch up' },
  { label: 'all off', want: 0, hint: 'every switch down' },
  { label: 'just the leftmost', want: 128, hint: 'one light, worth the most' },
  { label: 'just the rightmost', want: 1, hint: 'one light, worth the least' },
];

const Drawing: React.FC = () => {
  const [rows, setRows] = useState<number[]>(Array(8).fill(0));
  const [notation, setNotation] = useState<Notation>('binary');
  const [target, setTarget] = useState<number | null>(null);

  const flip = (r: number, bit: number) =>
    setRows((prev) => prev.map((v, i) => (i === r ? v ^ (1 << bit) : v)));

  const show = (v: number) =>
    notation === 'binary' ? bin8(v) : notation === 'hex' ? hex2(v) : String(v);

  const solved = target !== null && rows.some((v) => v === target);

  return (
    <div>
      <div className="flex flex-col gap-1">
        {rows.map((row, r) => (
          <div key={r} className="flex items-center gap-1">
            {[7, 6, 5, 4, 3, 2, 1, 0].map((bit) => {
              const on = ((row >> bit) & 1) === 1;
              return (
                <button
                  key={bit}
                  onClick={() => flip(r, bit)}
                  aria-label={`row ${r} pixel ${7 - bit}`}
                  className="aspect-square flex-1 rounded-sm border touch-manipulation transition-colors"
                  style={{
                    minWidth: 26,
                    background: on ? '#fbbf24' : '#12101f',
                    borderColor: on ? '#fbbf24' : '#2c2a3d',
                  }}
                />
              );
            })}
            <span
              className={`w-[74px] shrink-0 pl-1 text-right text-[11px] ${
                target !== null && row === target ? 'text-emerald-300' : 'text-gray-500'
              }`}
              style={{ fontFamily: MONO }}
            >
              {show(row)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(['binary', 'number', 'hex'] as Notation[]).map((n) => (
          <button
            key={n}
            onClick={() => setNotation(n)}
            className={`min-h-11 touch-manipulation rounded-md border px-3 text-xs ${
              notation === n
                ? 'border-amber-400 bg-amber-400/15 text-amber-200'
                : 'border-gray-700 bg-gray-800 text-gray-400 active:bg-gray-600'
            }`}
            style={{ fontFamily: MONO }}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => setRows(Array(8).fill(0))}
          className="min-h-11 touch-manipulation rounded-md border border-gray-700 px-3 text-xs text-gray-500 active:bg-gray-700"
        >
          clear
        </button>
      </div>

      {notation === 'hex' && (
        <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-400/5 p-3">
          <p className="text-xs leading-relaxed text-amber-200/90">
            Tired of writing eight digits? Cut the byte down the middle. <span style={{ fontFamily: MONO }}>1111</span>{' '}
            and <span style={{ fontFamily: MONO }}>1011</span> — four lights each, sixteen possible patterns each, so
            each half gets one symbol: <span style={{ fontFamily: MONO }}>F</span> and{' '}
            <span style={{ fontFamily: MONO }}>B</span>. <strong>That is all hex is.</strong> Shorthand for binary,
            invented by people who got tired of writing eight digits.
          </p>
        </div>
      )}

      <div className="mt-4">
        <div className="mb-2 text-[11px] uppercase tracking-wider text-gray-500">make a row that reads…</div>
        <div className="flex flex-wrap gap-2">
          {CHALLENGES.map((c) => (
            <button
              key={c.want}
              onClick={() => setTarget(c.want)}
              className={`min-h-11 touch-manipulation rounded-md border px-3 text-xs ${
                target === c.want
                  ? 'border-amber-400 bg-amber-400/15 text-amber-200'
                  : 'border-gray-700 bg-gray-800 text-gray-400 active:bg-gray-600'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        {target !== null && (
          <p className={`mt-2 text-sm ${solved ? 'text-emerald-300' : 'text-gray-500'}`}>
            {solved
              ? `Got it — that row is ${bin8(target)}.`
              : `Target: ${show(target)}. ${CHALLENGES.find((c) => c.want === target)?.hint}`}
          </p>
        )}
      </div>
    </div>
  );
};

// ── page ────────────────────────────────────────────────────────────────────

const Section: React.FC<{ n: string; title: string; lead: string; children: React.ReactNode }> = ({
  n, title, lead, children,
}) => (
  <section className="mb-12">
    <div className="mb-1 flex items-baseline gap-3">
      <span className="rounded bg-amber-400/15 px-2 py-0.5 text-xs text-amber-300">{n}</span>
      <h2 className="text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>{title}</h2>
    </div>
    <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-400">{lead}</p>
    <div className="rounded-xl border border-gray-800 bg-[#181528] p-4">{children}</div>
  </section>
);

const ProtoBit: NextPage = () => (
  <>
    <Head>
      <title>[lab] The opening: binary you draw with - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className="min-h-screen bg-[#12101f] px-4 py-10 text-gray-300 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/lab/prototypes" className="text-xs text-gray-600 hover:text-gray-400">← all prototypes</Link>

        <div className="mb-1 mt-4 text-xs uppercase tracking-widest text-amber-400">the opening</div>
        <h1 className="mb-3 text-3xl text-white sm:text-4xl" style={{ fontFamily: PIXEL_FONT }}>
          A bit is a light
        </h1>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-gray-400">
          Binary is usually taught as a notation, which is why it is boring: eight digits that do nothing. But a bit is not a digit. It is a <em>light</em>, and a light is something you can reach out and touch. Nothing here is explained before it has been felt.
        </p>

        <Section
          n="1"
          title="One switch"
          lead="The machine is dead. There is exactly one thing you can do to it. This is a whole number system and it fits on one button."
        >
          <OneBit />
        </Section>

        <Section
          n="2"
          title="Eight switches in a row"
          lead="One light is not much of a picture. Put eight in a row and tap them. The number underneath is not a lesson — it is a read-out of what you just did."
        >
          <OneRow />
        </Section>

        <Section
          n="3"
          title="Eight rows is a picture"
          lead="Draw something. A face, a heart, a cat, a rude word — the machine does not care. Then look at the column on the right: those eight numbers ARE your drawing. You wrote binary without being taught it. Switch the read-out to hex when the eight digits start to annoy you — which is exactly why hex was invented."
        >
          <Drawing />
        </Section>

        <hr className="my-10 border-gray-800" />
        <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>Why this order</h2>
        <ol className="mb-8 max-w-2xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-400">
          <li><strong className="text-gray-200">One bit</strong> — a switch. No notation at all, and the machine visibly wakes up.</li>
          <li><strong className="text-gray-200">Eight bits</strong> — a row of lights. &ldquo;Byte&rdquo; gets discovered as <em>one row of my drawing</em>, not defined.</li>
          <li><strong className="text-gray-200">A picture</strong> — the reader produces binary instead of receiving it.</li>
          <li><strong className="text-gray-200">Hex</strong> — arrives as <em>relief</em>, once eight digits per row is genuinely annoying. Cut the byte in half; each half gets a symbol. That is the whole idea, and it is the real reason hex exists.</li>
          <li><strong className="text-gray-200">Colour</strong> — three bytes. Now hex is worth having, and the cartridge hack from <Link href="/lab/proto-rom" className="text-amber-300 underline">proto-rom</Link> can begin.</li>
        </ol>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
          {'This is also why hex cannot come first. Hex is not a rival notation to binary, it is compression of it — exactly four bits per symbol. Taught first, “why sixteen?” has no answer. Taught fourth, it answers a question the reader has already started asking with their thumbs.'}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
          {'And it is all true: 1-bit sprites like this are how Game Boy tiles, early Mac icons and every bitmap font actually worked. One row, one byte, one number.'}
        </p>
      </div>
    </main>
  </>
);

export default ProtoBit;
