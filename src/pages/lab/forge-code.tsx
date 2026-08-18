// /lab/forge-code — an experiment in the open question from CLAUDE.md:
// what kind of game can a kid join without being overwhelmed, while still
// reading and changing real code?
//
// This is the alternative to building an open world. The bet: the game IS a
// short source file, and the thing that scales with the reader is not the size
// of the world but how much of the keyboard they're trusted with.
import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import GameScreen from '@/components/lab/forge/GameScreen';
import { TierTap, TierBlank, TierFree } from '@/components/lab/forge/CodeTiers';
import { Cartridge, DEFAULT_CARTRIDGE } from '@/components/lab/forge/cartridge';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const Panel: React.FC<{
  tier: string;
  title: string;
  chapters: string;
  premise: string;
  children: (c: Cartridge, set: (c: Cartridge) => void) => React.ReactNode;
  initial?: Partial<Cartridge>;
  fault?: string;
}> = ({ tier, title, chapters, premise, children, initial, fault }) => {
  const [cartridge, setCartridge] = useState<Cartridge>({ ...DEFAULT_CARTRIDGE, ...initial });
  return (
    <section className="mb-14">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3">
        <span className="rounded bg-amber-400/15 px-2 py-0.5 text-xs text-amber-300">{tier}</span>
        <h2 className="text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>{title}</h2>
        <span className="text-xs text-gray-500">{chapters}</span>
      </div>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-400">{premise}</p>
      <div className="grid gap-5 md:grid-cols-[1fr_280px]">
        <div className="rounded-xl border border-gray-800 bg-[#181528] p-4">
          {children(cartridge, setCartridge)}
        </div>
        <GameScreen cartridge={cartridge} fault={fault} />
      </div>
    </section>
  );
};

const ForgeCode: NextPage = () => {
  const [fault, setFault] = useState<string | undefined>();

  return (
    <>
      <Head>
        <title>[lab] Forge: readable source - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#12101f] px-6 py-12 text-gray-300">
        <div className="mx-auto max-w-4xl">
          <Link href="/lab" className="text-xs text-gray-600 hover:text-gray-400">← the lab</Link>

          <h1 className="mb-3 mt-4 text-4xl text-white" style={{ fontFamily: PIXEL_FONT }}>
            The game is a file you can read
          </h1>
          <p className="mb-3 max-w-2xl text-sm leading-relaxed text-gray-400">
            One idea, tested three ways. CATVENTURE isn&rsquo;t a black box the reader
            repairs from outside — it&rsquo;s a short source file that <em>grows by a
            line or two per chapter</em>. By the finale it&rsquo;s about thirty lines,
            and the reader watched every one of them arrive.
          </p>
          <p className="mb-12 max-w-2xl text-sm leading-relaxed text-gray-400">
            What scales with the reader isn&rsquo;t the size of the world. It&rsquo;s how
            much of the keyboard they&rsquo;re trusted with.
          </p>

          <Panel
            tier="TIER 1"
            title="Tap to change"
            chapters="chapters 0–3"
            premise="The reader sees real syntax from the very first chapter — but the only thing a tap can produce is a valid file. No blank page, no parse error, nothing to be afraid of. They are reading code months before they know they are."
            initial={{ catColor: '#F2A03D' }}
          >
            {(c, set) => <TierTap cartridge={c} onChange={set} upToChapter={3} />}
          </Panel>

          <Panel
            tier="TIER 2"
            title="Fill the blank"
            chapters="chapters 4–8"
            premise="One token is missing and the candidates are all plausible. Every wrong answer is wrong for a reason the chapter just taught — and the failure is a joke in the game, never a red underline. The story never quizzes."
            initial={{ catColor: '#8B8B8B' }}
          >
            {(c, set) => <TierBlank cartridge={c} onChange={set} />}
          </Panel>

          <Panel
            tier="TIER 3"
            title="Free edit"
            chapters="chapters 9–13"
            premise="Now every line is theirs, because they were there when each one was written. Break it on purpose — the machine complains in character, and the complaint is the lesson."
            fault={fault}
          >
            {(c, set) => <TierFree cartridge={c} onChange={set} onFault={setFault} />}
          </Panel>

          <hr className="my-10 border-gray-800" />
          <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>
            Why not an open world?
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
            An open world hands the kid the one thing a book already provides — a reason to
            go somewhere — and charges an enormous build cost for it. Worse, it has nowhere
            natural to put code. The campus map is already open-world <em>enough</em>: it
            makes progress visible and lets a kid poke things. Depth belongs in the file,
            not in the terrain.
          </p>
        </div>
      </main>
    </>
  );
};

export default ForgeCode;
