// /writers-room — an internal tool, not part of the book.
// Every drafted joke in one place, so we can see what's placed, what's still a
// candidate, and what we already ruled out. Deliberately not linked from the
// campus map — kids shouldn't land here.
import { useMemo, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { JOKES, JokeStatus, STATUS_LABEL } from '@/components/lab/data/jokes';
import { CHAPTERS } from '@/components/lab/world/buildings';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const STATUS_STYLE: Record<JokeStatus, string> = {
  live: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  drafted: 'bg-sky-100 text-sky-800 border-sky-300',
  spare: 'bg-amber-100 text-amber-800 border-amber-300',
  cut: 'bg-gray-200 text-gray-500 border-gray-300',
};

const ORDER: JokeStatus[] = ['live', 'drafted', 'spare', 'cut'];

const chapterName = (n: number | null) => {
  if (n === null) return 'Not placed';
  const meta = CHAPTERS.find((c) => c.n === n);
  return meta ? `Chapter ${n} · ${meta.title}` : `Chapter ${n}`;
};

const WritersRoom: NextPage = () => {
  const [filter, setFilter] = useState<JokeStatus | 'all'>('all');
  const [anchorsOnly, setAnchorsOnly] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: JOKES.length };
    ORDER.forEach((s) => { c[s] = JOKES.filter((j) => j.status === s).length; });
    return c;
  }, []);

  const shown = useMemo(
    () => JOKES.filter((j) => (filter === 'all' || j.status === filter) && (!anchorsOnly || j.anchor)),
    [filter, anchorsOnly]
  );

  // Group by chapter, unplaced last.
  const groups = useMemo(() => {
    const byChapter = new Map<number | null, typeof shown>();
    shown.forEach((j) => {
      const list = byChapter.get(j.chapter) ?? [];
      list.push(j);
      byChapter.set(j.chapter, list);
    });
    return [...byChapter.entries()].sort((a, b) => {
      if (a[0] === null) return 1;
      if (b[0] === null) return -1;
      return a[0] - b[0];
    });
  }, [shown]);

  return (
    <>
      <Head>
        <title>Writers&rsquo; Room — Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#151238] text-gray-100 pb-20">
        <header className="px-5 pt-8 pb-6 max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h1 className="text-3xl sm:text-4xl text-white" style={{ fontFamily: PIXEL_FONT }}>
              ✎ Writers&rsquo; Room
            </h1>
            <Link href="/" className="text-indigo-300 hover:text-white text-lg" style={{ fontFamily: PIXEL_FONT }}>
              ← campus
            </Link>
          </div>
          <p className="text-indigo-200/80 mt-2 text-sm leading-6">
            Every joke we&rsquo;ve drafted, by chapter. ⭐ marks an anchor &mdash; the two or three per
            chapter the scene is actually built around. Cut jokes are kept on purpose, so we
            don&rsquo;t re-pitch them. Long-form reasoning lives in <code className="text-amber-200">raw/joke-bank.md</code>.
          </p>

          {/* filters */}
          <div className="flex flex-wrap gap-2 mt-5" style={{ fontFamily: PIXEL_FONT }}>
            {(['all', ...ORDER] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-full border text-base transition ${
                  filter === s
                    ? 'bg-white text-gray-900 border-white'
                    : 'bg-gray-800/60 text-gray-300 border-gray-600 hover:border-gray-400'
                }`}
              >
                {s === 'all' ? 'all' : STATUS_LABEL[s]} ({counts[s]})
              </button>
            ))}
            <button
              onClick={() => setAnchorsOnly((a) => !a)}
              className={`px-3 py-1 rounded-full border text-base transition ${
                anchorsOnly
                  ? 'bg-amber-400 text-gray-900 border-amber-300'
                  : 'bg-gray-800/60 text-gray-300 border-gray-600 hover:border-gray-400'
              }`}
            >
              ⭐ anchors only
            </button>
          </div>
        </header>

        <main className="px-5 max-w-4xl mx-auto space-y-8">
          {groups.map(([chapter, jokes]) => (
            <section key={String(chapter)}>
              <h2
                className="text-xl text-amber-200 border-b border-white/10 pb-1 mb-3"
                style={{ fontFamily: PIXEL_FONT }}
              >
                {chapterName(chapter)}
                <span className="text-gray-500 text-base ml-2">({jokes.length})</span>
              </h2>

              <ul className="space-y-3">
                {jokes.map((j) => (
                  <li
                    key={j.id}
                    className={`rounded-xl border p-4 ${
                      j.status === 'cut' ? 'bg-gray-800/40 border-gray-700' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLE[j.status]}`}>
                        {STATUS_LABEL[j.status]}
                      </span>
                      {j.anchor && (
                        <span className="text-xs px-2 py-0.5 rounded-full border bg-amber-400/20 text-amber-200 border-amber-400/40">
                          ⭐ anchor
                        </span>
                      )}
                    </div>
                    <p className={`leading-7 ${j.status === 'cut' ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
                      {j.text}
                    </p>
                    {j.why && (
                      <p className="text-sm text-indigo-200/70 mt-2 italic border-l-2 border-indigo-400/40 pl-3">
                        {j.why}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {groups.length === 0 && (
            <p className="text-gray-400 text-center py-10">Nothing matches that filter.</p>
          )}
        </main>
      </div>
    </>
  );
};

export default WritersRoom;
