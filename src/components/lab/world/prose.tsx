// prose.tsx — the book's content primitives.
//
// The story is made of a small number of recurring things: narration, three
// speakers talking, Evergreen projecting a slide into the air, a joke that
// needs a beat before the punchline, an interactive to play with, and a Game
// Forge stage that repairs the cartridge. Each gets its own shape on the page
// so a kid can tell them apart at a glance without being told.
import { motion } from 'framer-motion';
import { PIXEL_FONT } from './theme';

/** Narration. First paragraph of a chapter gets the drop cap. */
export const Story: React.FC<{ children: React.ReactNode; opening?: boolean }> = ({ children, opening }) => (
  <p className={`mb-4 text-[17px] sm:text-lg leading-8 ${opening ? 'first-letter:text-6xl first-letter:font-bold first-letter:me-2 first-letter:float-start first-letter:leading-none first-letter:mt-1' : ''}`}>
    {children}
  </p>
);

type Speaker = 'flamey' | 'starlax' | 'evergreen' | 'boxy' | 'nova';

const SPEAKER: Record<Speaker, { name: string; tint: string; bar: string; emoji: string }> = {
  flamey:    { name: 'Flamey',         tint: 'bg-sky-50',    bar: 'border-sky-400',    emoji: '🤖' },
  starlax:   { name: 'Starlax',        tint: 'bg-rose-50',   bar: 'border-rose-400',   emoji: '👧' },
  evergreen: { name: 'Prof. Evergreen', tint: 'bg-amber-50', bar: 'border-amber-500',  emoji: '🎓' },
  boxy:      { name: 'Boxy',           tint: 'bg-lime-50',   bar: 'border-lime-500',   emoji: '📦' },
  nova:      { name: 'Nova',           tint: 'bg-purple-50', bar: 'border-purple-400', emoji: '🐱' },
};

/** Someone speaks. Colour-coded so kids track who's talking without re-reading. */
export const Line: React.FC<{ who: Speaker; children: React.ReactNode; action?: string }> = ({ who, children, action }) => {
  const s = SPEAKER[who];
  return (
    <div className={`my-3 border-l-4 ${s.bar} ${s.tint} rounded-r-lg px-4 py-2.5`}>
      <div className="text-xs font-semibold tracking-wide text-gray-500 mb-0.5">
        {s.emoji} {s.name}
      </div>
      <p className="text-[17px] sm:text-lg leading-7">“{children}”</p>
      {action && <p className="text-sm text-gray-500 italic mt-1">{action}</p>}
    </div>
  );
};

/**
 * Evergreen casts a slide into the air. Everything he teaches lands in this
 * frame, so the reader learns to recognise "this is the rule, remember it."
 */
export const Slide: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.figure
    className="my-6 rounded-2xl overflow-hidden border-2 border-cyan-400/70 shadow-[0_0_25px_rgba(34,211,238,0.25)] bg-slate-900"
    initial={{ opacity: 0, y: 14, rotateX: -8 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
  >
    <figcaption
      className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500/15 text-cyan-200 text-sm border-b border-cyan-400/30"
      style={{ fontFamily: PIXEL_FONT }}
    >
      <motion.span
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >▮</motion.span>
      {title ?? 'PROJECTED SLIDE'}
    </figcaption>
    <div className="p-3 bg-white">{children}</div>
  </motion.figure>
);

/**
 * A comic beat. Use for the pause before a punchline — the white space IS the
 * joke's timing. Never explain the joke after one of these.
 */
export const Beat: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="my-6 text-center text-gray-400 select-none" style={{ fontFamily: PIXEL_FONT }}>
    {children ? <span className="text-lg italic text-gray-500">{children}</span> : '· · ·'}
  </div>
);

/** Something to play with, framed as part of the world rather than a textbox. */
export const Play: React.FC<{ label?: string; children: React.ReactNode }> = ({ label = 'Try it yourself', children }) => (
  <motion.div
    className="my-6 rounded-2xl overflow-hidden border-2 border-indigo-300 shadow-lg"
    initial={{ opacity: 0, scale: 0.97 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.4 }}
  >
    <div className="px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center gap-2">
      <span>🎮</span> {label}
    </div>
    <div className="p-3 bg-white">{children}</div>
  </motion.div>
);

/**
 * A Game Forge stage — the mini-game that repairs one real piece of the
 * reader's CATVENTURE cartridge. Deliberately louder than a Play block:
 * this is the one that changes their game.
 */
export const Forge: React.FC<{ restores: string; children: React.ReactNode }> = ({ restores, children }) => (
  <motion.div
    className="my-8 rounded-2xl overflow-hidden border-4 border-emerald-400 shadow-2xl"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
  >
    <div
      className="px-4 py-2 bg-emerald-500 text-white flex items-center justify-between"
      style={{ fontFamily: PIXEL_FONT }}
    >
      <span className="text-lg">⭐ GAME FORGE</span>
      <span className="text-sm opacity-90">restores: {restores}</span>
    </div>
    <div className="p-3 bg-white">{children}</div>
    <div className="px-4 py-1.5 bg-emerald-50 text-emerald-800 text-xs">
      Your work here is saved into your own copy of CATVENTURE.
    </div>
  </motion.div>
);

/** A true bit of history. Kids love that these actually happened. */
export const TrueStory: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <aside className="my-6 rounded-xl border-2 border-dashed border-stone-400 bg-stone-50 px-4 py-3">
    <div className="text-xs font-bold tracking-widest text-stone-500 mb-1">📜 THIS REALLY HAPPENED</div>
    <div className="text-[16px] leading-7 text-stone-800">{children}</div>
  </aside>
);
