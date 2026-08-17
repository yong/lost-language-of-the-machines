// ChapterShell.tsx — the frame every chapter page sits in, so walking from the
// campus into a building feels like the same world. Dusk sky and the building
// you just entered up top; a warm lamplit page to read on below.
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PIXEL_FONT, PAGE } from './theme';
import { mapHref, chapterHref } from './routes';
import { chapterById, nextChapter } from './buildings';
import CartridgeHud from './CartridgeHud';

// Deterministic stars — no server/client hydration drift.
const STARS = Array.from({ length: 44 }, (_, i) => ({
  x: (i * 173 + 29) % 1200,
  y: ((i * 71 + 11) % 150) + 6,
  r: (i % 3) * 0.4 + 0.6,
}));

interface ChapterShellProps {
  /** route segment, e.g. 'chapter1' */
  id: string;
  children: React.ReactNode;
}

const ChapterShell: React.FC<ChapterShellProps> = ({ id, children }) => {
  const meta = chapterById(id);
  const next = meta ? nextChapter(id) : undefined;

  return (
    <div className="min-h-screen bg-[#151238]">
      {/* Sky + the building you just walked into */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <svg viewBox="0 0 1200 260" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="chSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e0b2a" />
              <stop offset="65%" stopColor="#2b2158" />
              <stop offset="100%" stopColor="#4a3572" />
            </linearGradient>
          </defs>
          <rect width="1200" height="260" fill="url(#chSky)" />
          {STARS.map((s, i) => (
            <motion.circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#e2e8f0"
              animate={{ opacity: [0.25, 0.9, 0.25] }}
              transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.12 }} />
          ))}
          <circle cx={1080} cy={62} r={26} fill="#ffe9a8" opacity={0.95} />
          {/* ground */}
          <path d="M 0 215 Q 300 198 600 210 T 1200 205 V 260 H 0 Z" fill="#2e5d49" />
          {/* the building, standing on the ground line */}
          {meta && (
            <g transform="translate(600,214)">
              <meta.art />
            </g>
          )}
        </svg>

        <Link
          href={mapHref()}
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gray-900/80 border border-gray-600 text-amber-200 hover:text-white hover:border-amber-300 transition text-lg"
          style={{ fontFamily: PIXEL_FONT }}
        >
          ← campus
        </Link>
      </div>

      {/* Title plate */}
      <div className="text-center -mt-2 pb-4" style={{ fontFamily: PIXEL_FONT }}>
        {meta && (
          <>
            <div className="text-indigo-300 text-lg">{meta.building}</div>
            <h1 className="text-white text-3xl sm:text-5xl leading-tight">
              Chapter {meta.n} · {meta.title}
            </h1>
            <div className="text-emerald-300/80 text-base mt-1">
              restores ⭐ {meta.restores}
            </div>
          </>
        )}
      </div>

      {/* The lamplit page */}
      <div className="max-w-3xl mx-auto px-3 sm:px-6 pb-32">
        <article
          className="rounded-t-3xl rounded-b-xl shadow-2xl px-5 py-8 sm:px-10 sm:py-12 leading-relaxed"
          style={{ backgroundColor: PAGE.paper, color: PAGE.text, borderBottom: `6px solid ${PAGE.paperEdge}` }}
        >
          {children}
        </article>

        {/* Where to go next */}
        {next && (
          <div className="mt-6 text-center" style={{ fontFamily: PIXEL_FONT }}>
            {next.open ? (
              <Link
                href={chapterHref(next.id)}
                className="inline-block px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xl transition shadow-lg"
              >
                Next: Chapter {next.n} · {next.title} →
              </Link>
            ) : (
              <div className="inline-block px-6 py-3 rounded-2xl bg-gray-800/80 border border-dashed border-yellow-600 text-yellow-200 text-lg">
                🚧 Next: Chapter {next.n} · {next.title} — under restoration
              </div>
            )}
            <div className="mt-3">
              <Link href={mapHref()} className="text-indigo-300 hover:text-white text-lg">← back to the campus</Link>
            </div>
          </div>
        )}
      </div>

      <CartridgeHud />
    </div>
  );
};

export default ChapterShell;
