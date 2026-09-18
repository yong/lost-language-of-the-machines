// /lab/openings — the four ways into a chat chapter, side by side.
//
// Built because the argument could not be settled by describing them. Same
// method as the reveal-mode experiment: build them all, read them end to end
// on the device they are for, then pick. The log is
// raw/opening-transition-experiment.md.
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { OPENINGS } from '@/components/lab/novel/openings';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const Openings: NextPage = () => (
  <>
    <Head>
      <title>[lab] Four ways into a chapter - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className="min-h-dvh bg-[#12101f] px-5 py-8 text-gray-300">
      <div className="mx-auto max-w-lg">
        <Link href="/lab" className="-ml-2 inline-flex min-h-11 min-w-11 items-center text-gray-500">←</Link>
        <h1 className="mt-2 text-4xl leading-none text-amber-100" style={{ fontFamily: PIXEL_FONT }}>
          Four ways in
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-gray-400">
          The same cover, the same paragraph, the same phone, the same morph into the
          thread. <strong className="text-gray-200">Only the transition differs.</strong>{' '}
          Read each one on a phone and pick the winner — you can also cycle between them
          from the chip on the cover.
        </p>

        <ul className="mt-7 space-y-3">
          {OPENINGS.map((o) => (
            <li key={o.id}>
              <Link
                href={`/lab/novel?opening=1&open=${o.id}`}
                className="block rounded-2xl border border-gray-800 bg-[#181528] p-4 active:bg-[#1e1b30]"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-amber-200" style={{ fontFamily: PIXEL_FONT }}>{o.name}</span>
                  <span className="text-[0.625rem] uppercase tracking-[0.2em] text-gray-500">{o.from}</span>
                </div>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-gray-400">{o.asks}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-7 text-[0.8125rem] leading-relaxed text-gray-500">
          Each link forces the opening even if you have read the chapter before, and
          none of them wipes your place or your cat.
        </p>
      </div>
    </main>
  </>
);

export default Openings;
