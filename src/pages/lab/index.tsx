// /lab — the workbench index.
//
// Everything here is unpublished design work. The live book at /chapter1 etc.
// is untouched by anything under /lab, and nothing in the book links here:
// this page exists so a developer can find the experiments without a reader
// ever stumbling into one. noindex, like /lab/writers-room.
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { PIXEL_FONT } from '@/components/lab/world/theme';

interface Entry {
  href: string;
  name: string;
  note: string;
}

const WORLD: Entry[] = [
  { href: '/lab/map', name: 'The Campus', note: 'open-world map — the new front door' },
  { href: '/lab/chapter0', name: 'Chapter 0 · Hello World!', note: 'the broken cabinet' },
  { href: '/lab/chapter1', name: 'Chapter 1 · A Number Is a Switch', note: 'restores the score counter' },
  { href: '/lab/chapter2', name: 'Chapter 2 · A Letter Is a Number', note: 'restores the title screen' },
  { href: '/lab/chapter3', name: 'Chapter 3 · A Color Is a Number', note: 'restores the palette' },
  { href: '/lab/chapter4', name: 'Chapter 4 · A Picture Is a Number', note: 'restores the hero sprite' },
  { href: '/lab/chapter4/chat', name: 'Chapter 4 · evening chat', note: 'texting scene' },
];

const EXPERIMENTS: Entry[] = [
  { href: '/lab/prototypes', name: '★ Prototypes to evaluate', note: 'five games from ground zero — start here' },
  { href: '/lab/forge-run', name: 'A · A puppet you program', note: 'it does exactly what you said' },
  { href: '/lab/forge-code', name: 'B · A file that grows', note: 'the game as a file a kid can read + edit' },
  { href: '/lab/proto-decode', name: 'C · The lens', note: 'the same bytes are letters, colours, or a picture' },
  { href: '/lab/proto-rules', name: 'D · The rules are things', note: 'you cannot win until you edit a rule' },
  { href: '/lab/proto-teach', name: 'E · You teach it words', note: '“call that a dance” — chat IS the program' },
  { href: '/lab/chat', name: 'Chat UI', note: 'phone frame + narrated timeline' },
  { href: '/lab/scenes', name: 'Scroll Scenes', note: 'GSAP scene-by-scene reading' },
  { href: '/lab/three-d', name: 'Hologram Classroom', note: 'react-three-fiber, 3D' },
  { href: '/lab/writers-room', name: "Writers' Room", note: 'every drafted joke, by chapter' },
];

const LIVE: Entry[] = [
  { href: '/', name: 'The published book', note: 'unchanged — /chapter0 … /chapter4' },
];

const Section: React.FC<{ title: string; entries: Entry[] }> = ({ title, entries }) => (
  <section className="mb-10">
    <h2 className="text-amber-300 text-2xl mb-3" style={{ fontFamily: PIXEL_FONT }}>{title}</h2>
    <ul className="space-y-1">
      {entries.map((e) => (
        <li key={e.href}>
          <Link
            href={e.href}
            className="group flex flex-wrap items-baseline gap-x-3 rounded px-3 py-2 hover:bg-white/5 transition"
          >
            <span className="text-indigo-300 group-hover:text-white text-lg">{e.name}</span>
            <span className="text-gray-500 text-sm">{e.note}</span>
            <code className="ml-auto text-gray-600 text-xs">{e.href}</code>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

const Lab: NextPage = () => (
  <>
    <Head>
      <title>[lab] Workbench - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className="min-h-screen bg-[#12101f] text-gray-300 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl text-white mb-2" style={{ fontFamily: PIXEL_FONT }}>
          🔧 The Lab
        </h1>
        <p className="text-gray-500 mb-10 text-sm leading-relaxed">
          Unpublished design work. Nothing here is linked from the book and every page is
          <code className="mx-1 text-gray-400">noindex</code>, so readers never arrive by accident.
          The published book is unaffected by anything in this folder.
        </p>

        <Section title="Campus world (redesign)" entries={WORLD} />
        <Section title="Experiments" entries={EXPERIMENTS} />
        <Section title="Live site" entries={LIVE} />
      </div>
    </main>
  </>
);

export default Lab;
