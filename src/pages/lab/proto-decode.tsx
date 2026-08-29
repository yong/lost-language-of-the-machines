// /lab/proto-decode — PROTOTYPE C: "the lens"
//
// The kid manipulates: RAW DATA. The code lives: nowhere — there is no code.
//
// The book's thesis is "everything is a number". This prototype makes that the
// entire mechanic: you are handed bytes off the broken cartridge and a set of
// LENSES. The same numbers are letters, or colours, or a picture, depending
// only on how you decide to read them.
//
// The real lesson underneath, and the reason this one is worth evaluating: the
// machine does not know what its own numbers mean. You do. That is a bigger
// idea than any single chapter and it is genuinely archaeology, which is the
// book's own premise.
import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

type Lens = 'numbers' | 'letters' | 'colors' | 'picture';

const LENSES: { id: Lens; label: string; hint: string }[] = [
  { id: 'numbers', label: 'AS NUMBERS', hint: 'what the machine actually stores' },
  { id: 'letters', label: 'AS LETTERS', hint: 'each number picks a character' },
  { id: 'colors', label: 'AS COLOURS', hint: 'three numbers make one colour' },
  { id: 'picture', label: 'AS A PICTURE', hint: 'lay them out in a grid' },
];

// Palette used by the picture lens.
const PAL = ['transparent', '#232323', '#F2A03D', '#FFFFFF', '#F27DA0', '#7CC94E'];

interface Block {
  id: string;
  found: string;
  bytes: number[];
  /** the one lens that makes this block mean something */
  answer: Lens;
  width?: number;
  reveal: string;
}

const str = (s: string) => Array.from(s, (c) => c.charCodeAt(0));

// prettier-ignore
const CAT8 = [
  0,1,0,0,0,0,1,0,
  1,2,1,0,0,1,2,1,
  1,2,2,1,1,2,2,1,
  1,2,5,2,2,5,2,1,
  1,2,2,2,2,2,2,1,
  1,2,2,4,4,2,2,1,
  0,1,2,2,2,2,1,0,
  0,0,1,1,1,1,0,0,
];

const BLOCKS: Block[] = [
  {
    id: 'block 1',
    found: 'recovered from the cartridge header',
    bytes: str('CATVENTURE'),
    answer: 'letters',
    reveal: 'The name of the game. It was never lost — nobody knew how to look at it.',
  },
  {
    id: 'block 2',
    found: 'recovered from address 0x40',
    bytes: [
      242, 160, 61, 43, 33, 88, 124, 201, 78,
      255, 255, 255, 242, 125, 160, 103, 232, 249,
    ],
    answer: 'colors',
    reveal: 'The palette. Six colours, three numbers each — the world had colour all along.',
  },
  {
    id: 'block 3',
    found: 'recovered from the sprite sheet',
    bytes: CAT8,
    answer: 'picture',
    width: 8,
    reveal: 'A cat. Sixty-four numbers, and somewhere in there, a cat happens.',
  },
];

const Cell: React.FC<{ children: React.ReactNode; wide?: boolean }> = ({ children, wide }) => (
  <span
    className={`inline-flex items-center justify-center rounded bg-black/40 text-amber-200 ${
      wide ? 'w-10' : 'w-7'
    } h-7`}
    style={{ fontFamily: MONO, fontSize: 12 }}
  >
    {children}
  </span>
);

const View: React.FC<{ block: Block; lens: Lens }> = ({ block, lens }) => {
  const { bytes } = block;

  if (lens === 'numbers') {
    return (
      <div className="flex flex-wrap gap-1">
        {bytes.map((b, i) => <Cell key={i} wide>{b}</Cell>)}
      </div>
    );
  }

  if (lens === 'letters') {
    return (
      <div className="flex flex-wrap gap-1">
        {bytes.map((b, i) => (
          <Cell key={i}>
            {b >= 32 && b < 127 ? String.fromCharCode(b) : <span className="text-gray-600">·</span>}
          </Cell>
        ))}
      </div>
    );
  }

  if (lens === 'colors') {
    const triples: number[][] = [];
    for (let i = 0; i < bytes.length; i += 3) triples.push(bytes.slice(i, i + 3));
    return (
      <div className="flex flex-wrap gap-1.5">
        {triples.map((t, i) => {
          const hex = `#${t.map((v) => (v ?? 0).toString(16).padStart(2, '0')).join('')}`;
          return (
            <span key={i} className="flex flex-col items-center gap-1">
              <span
                className="h-9 w-9 rounded border border-white/20"
                style={{ background: hex }}
              />
              <span className="text-[9px] text-gray-500" style={{ fontFamily: MONO }}>{hex}</span>
            </span>
          );
        })}
      </div>
    );
  }

  // picture
  const w = block.width ?? Math.ceil(Math.sqrt(bytes.length));
  return (
    <div
      className="grid w-fit rounded bg-black/30 p-1"
      style={{ gridTemplateColumns: `repeat(${w}, 18px)` }}
    >
      {bytes.map((b, i) => (
        <span
          key={i}
          className="h-[18px] w-[18px]"
          style={{ background: PAL[b] ?? `rgb(${b},${b},${b})` }}
        />
      ))}
    </div>
  );
};

const BlockCard: React.FC<{ block: Block }> = ({ block }) => {
  const [lens, setLens] = useState<Lens>('numbers');
  const solved = lens === block.answer;

  return (
    <section className="mb-8 rounded-xl border border-gray-800 bg-[#181528] p-5">
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
        <h3 className="text-xl text-white" style={{ fontFamily: PIXEL_FONT }}>{block.id}</h3>
        <span className="text-xs text-gray-500">{block.found}</span>
      </div>

      <div className="my-4 min-h-[92px]">
        <View block={block} lens={lens} />
      </div>

      <div className="flex flex-wrap gap-2">
        {LENSES.map((l) => (
          <button
            key={l.id}
            onClick={() => setLens(l.id)}
            className={`min-h-11 touch-manipulation rounded-md border px-3 text-xs transition ${
              lens === l.id
                ? 'border-amber-400 bg-amber-400/15 text-amber-200'
                : 'border-gray-700 bg-gray-800 text-gray-400 active:bg-gray-600 sm:hover:bg-gray-700'
            }`}
            style={{ fontFamily: MONO }}
          >
            {l.label}
          </button>
        ))}
      </div>
      {/* the hint used to live in a `title` — invisible on a touch screen */}
      <p className="mt-2 text-[11px] text-gray-600">
        {LENSES.find((l) => l.id === lens)?.hint}
      </p>

      <p className={`mt-3 min-h-[1.5rem] text-sm ${solved ? 'text-emerald-300' : 'text-gray-500'}`}>
        {solved ? block.reveal : 'Nothing here means anything yet. Try another lens.'}
      </p>
    </section>
  );
};

const ProtoDecode: NextPage = () => (
  <>
    <Head>
      <title>[lab] Prototype: the lens - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className="min-h-screen bg-[#12101f] px-6 py-12 text-gray-300">
      <div className="mx-auto max-w-3xl">
        <Link href="/lab/prototypes" className="text-xs text-gray-600 hover:text-gray-400">← all prototypes</Link>

        <div className="mb-1 mt-4 text-xs uppercase tracking-widest text-amber-400">prototype C · the lens</div>
        <h1 className="mb-3 text-4xl text-white" style={{ fontFamily: PIXEL_FONT }}>
          The machine doesn&rsquo;t know what its numbers mean
        </h1>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-gray-400">
          Three blocks of data pulled off the broken cartridge. Every block is just numbers. Each one becomes something only when you choose how to read it — and choosing is the whole game. There is no code here at all, which is exactly what makes this one worth arguing about.
        </p>

        {BLOCKS.map((b) => <BlockCard key={b.id} block={b} />)}

        <hr className="my-10 border-gray-800" />
        <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>What this is good at</h2>
        <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-gray-400">
          <li>▸ <strong className="text-gray-200">It is the book&rsquo;s thesis, playable.</strong> &ldquo;Everything is a number&rdquo; stops being a claim and becomes a thing you do with your hands.</li>
          <li>▸ <strong className="text-gray-200">Zero floor.</strong> Four buttons. A five-year-old can press them; the idea underneath is genuinely deep.</li>
          <li>▸ <strong className="text-gray-200">It is archaeology,</strong> which is already the premise — decoding a dead civilisation&rsquo;s artifacts.</li>
        </ul>
        <h2 className="mb-3 mt-8 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>What it is bad at</h2>
        <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-gray-400">
          <li>▸ <strong className="text-gray-200">No code, so no code reading.</strong> It cannot carry your &ldquo;change it yourself&rdquo; goal on its own.</li>
          <li>▸ <strong className="text-gray-200">It runs out.</strong> Once a kid gets the idea, more blocks are just more of the same trick.</li>
          <li>▸ Probably a <strong className="text-gray-200">recurring lens</strong> the reader always carries, not the main game.</li>
        </ul>
      </div>
    </main>
  </>
);

export default ProtoDecode;
