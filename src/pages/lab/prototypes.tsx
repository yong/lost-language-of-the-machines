// /lab/prototypes — the evaluation board.
//
// Five directions for what the book's game could be, built far enough to play.
// Nothing here assumes the current 13-chapter structure, the campus map, or
// CATVENTURE: this is the ground-zero question, which is what does a kid
// actually DO.
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { PIXEL_FONT } from '@/components/lab/world/theme';

interface Proto {
  key: string;
  href: string;
  name: string;
  line: string;
  manipulates: string;
  codeLives: string;
  floor: 'lowest' | 'low' | 'medium' | 'high';
  ceiling: 'low' | 'medium' | 'high' | 'highest';
  build: 'small' | 'medium' | 'large';
  best: string;
  worst: string;
}

const PROTOS: Proto[] = [
  {
    key: 'A',
    href: '/lab/forge-run',
    name: 'A puppet you program',
    line: 'Write four lines, press RUN, watch it obey you literally.',
    manipulates: 'instructions',
    codeLives: 'a panel beside the world',
    floor: 'medium',
    ceiling: 'high',
    build: 'medium',
    best: 'The failure is the joke, which is the book’s own comic engine.',
    worst: 'Typing syntax is a real barrier for the youngest readers.',
  },
  {
    key: 'B',
    href: '/lab/forge-code',
    name: 'A file that grows',
    line: 'One source file, gaining a line per chapter; tap values early, type them later.',
    manipulates: 'values',
    codeLives: 'the file, which is the whole artifact',
    floor: 'lowest',
    ceiling: 'medium',
    build: 'small',
    best: 'Impossible to break early on, so nobody is ever afraid of the page.',
    worst: 'Changing values is not really programming. It plateaus.',
  },
  {
    key: 'C',
    href: '/lab/proto-decode',
    name: 'The lens',
    line: 'The same bytes are letters, or colours, or a picture. You choose how to read them.',
    manipulates: 'raw data',
    codeLives: 'nowhere — there is no code',
    floor: 'lowest',
    ceiling: 'low',
    build: 'small',
    best: 'It IS the book’s thesis, made playable in four buttons.',
    worst: 'No code at all, and the trick runs out fast.',
  },
  {
    key: 'D',
    href: '/lab/proto-rules',
    name: 'The rules are things',
    line: 'The fish is sealed in a wall. You cannot win — until you edit WALL IS SOLID.',
    manipulates: 'the rules',
    codeLives: 'in the world, as objects',
    floor: 'lowest',
    ceiling: 'high',
    build: 'large',
    best: 'The only solution is changing a rule, so the lesson cannot be skipped.',
    worst: 'Toggling a word teaches the idea of code more than the practice.',
  },
  {
    key: 'E',
    href: '/lab/proto-teach',
    name: 'You teach it words',
    line: '“Call that a dance” — and dance becomes a word the machine knows.',
    manipulates: 'a vocabulary',
    codeLives: 'the conversation itself',
    floor: 'medium',
    ceiling: 'highest',
    build: 'medium',
    best: 'Chat and game are one object, and it teaches functions in one sentence.',
    worst: 'Append-only: you cannot see or edit the whole program at once.',
  },
];

const BAR: Record<string, number> = {
  lowest: 100, low: 35, medium: 60, high: 85, highest: 100, small: 30, large: 95,
};

const Meter: React.FC<{ label: string; value: string; good?: boolean }> = ({ label, value, good }) => (
  <div>
    <div className="mb-0.5 flex justify-between text-[10px] uppercase tracking-wider text-gray-500">
      <span>{label}</span><span className="text-gray-400">{value}</span>
    </div>
    <div className="h-1 rounded bg-gray-800">
      <div
        className={`h-1 rounded ${good ? 'bg-emerald-500' : 'bg-amber-500'}`}
        style={{ width: `${BAR[value] ?? 50}%` }}
      />
    </div>
  </div>
);

const Card: React.FC<{ p: Proto }> = ({ p }) => (
  <Link
    href={p.href}
    className="group block rounded-xl border border-gray-800 bg-[#181528] p-5 transition hover:border-amber-500/50 hover:bg-[#1d1930]"
  >
    <div className="mb-2 flex items-baseline gap-3">
      <span className="rounded bg-amber-400/15 px-2 py-0.5 text-xs text-amber-300">{p.key}</span>
      <h2 className="text-2xl text-white group-hover:text-amber-200" style={{ fontFamily: PIXEL_FONT }}>
        {p.name}
      </h2>
    </div>
    <p className="mb-4 text-sm leading-relaxed text-gray-400">{p.line}</p>

    <dl className="mb-4 space-y-1 text-xs">
      <div className="flex gap-2">
        <dt className="w-24 shrink-0 text-gray-600">manipulates</dt>
        <dd className="text-gray-300">{p.manipulates}</dd>
      </div>
      <div className="flex gap-2">
        <dt className="w-24 shrink-0 text-gray-600">code lives</dt>
        <dd className="text-gray-300">{p.codeLives}</dd>
      </div>
    </dl>

    <div className="mb-4 grid grid-cols-3 gap-3">
      <Meter label="ease of entry" value={p.floor} good />
      <Meter label="ceiling" value={p.ceiling} good />
      <Meter label="build cost" value={p.build} />
    </div>

    <p className="text-xs leading-relaxed text-emerald-300/90">+ {p.best}</p>
    <p className="mt-1 text-xs leading-relaxed text-rose-300/80">− {p.worst}</p>
  </Link>
);

const Prototypes: NextPage = () => (
  <>
    <Head>
      <title>[lab] Prototypes to evaluate - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className="min-h-screen bg-[#12101f] px-6 py-12 text-gray-300">
      <div className="mx-auto max-w-5xl">
        <Link href="/lab" className="text-xs text-gray-600 hover:text-gray-400">← the lab</Link>

        <h1 className="mb-3 mt-4 text-4xl text-white" style={{ fontFamily: PIXEL_FONT }}>
          Five games, from ground zero
        </h1>
        <p className="mb-3 max-w-2xl text-sm leading-relaxed text-gray-400">
          None of these assume the current chapter structure, the campus map, or CATVENTURE. They assume only the thing worth keeping: a kid, a machine that can be understood, and a cast that is funny about failure.
        </p>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-gray-400">
          They differ on two axes that actually matter — <strong className="text-gray-200">what the kid manipulates</strong> and <strong className="text-gray-200">where the code lives</strong>. Play them in any order. They are all real; none are mockups.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {PROTOS.map((p) => <Card key={p.key} p={p} />)}
        </div>

        <section className="mt-12 rounded-xl border border-gray-800 bg-[#181528] p-6">
          <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>
            How I&rsquo;d judge them
          </h2>
          <ol className="max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-400">
            <li><strong className="text-gray-200">Can a kid do the first thing without being told?</strong> If the first action needs an instruction, the floor is too high.</li>
            <li><strong className="text-gray-200">Is the kid changing behaviour, or just appearance?</strong> Only behaviour is programming.</li>
            <li><strong className="text-gray-200">Is failure funnier than success?</strong> If not, it will feel like homework by chapter three.</li>
            <li><strong className="text-gray-200">Does it still have something to teach in a year?</strong> Ceiling matters more than floor for a book that runs thirteen chapters.</li>
            <li><strong className="text-gray-200">Could one person actually build all of it?</strong> The best design you never finish loses to the good one you ship.</li>
          </ol>
        </section>

        <section className="mt-6 rounded-xl border border-amber-500/25 bg-amber-400/5 p-6">
          <h2 className="mb-2 text-2xl text-amber-300" style={{ fontFamily: PIXEL_FONT }}>
            If you want my read
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-gray-300">
            <strong>D and E are the two with real ceilings</strong>, and they fail in opposite directions — D has no floor at all but struggles to grow past &ldquo;toggle a word&rdquo;; E asks a kid to type but then goes all the way to functions and composition.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300">
            They also compose unusually well. <strong>Open with D</strong> (tap a rule, break the world, no typing) and <strong>graduate into E</strong> (teach the machine words) once the kid trusts the thing. <strong>C is not a game</strong> — it is a lens the reader should carry the entire book, poking at any number to see what else it could be. <strong>A and B are the safe build</strong>, and if the goal is shipping thirteen chapters this year rather than finding the best possible toy, that is not a criticism.
          </p>
        </section>
      </div>
    </main>
  </>
);

export default Prototypes;
