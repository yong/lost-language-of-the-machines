// CodeTiers.tsx — three ways to let a kid change the same source file.
//
// The question this is built to answer: how do you put real code in front of a
// nine-year-old without handing them a blank page and a parse error? The answer
// under test is a LADDER — the file stays the same, the editing affordance opens
// up as the reader earns it.
//
//   Tier 1  tap-to-change   they read real syntax, they cannot produce invalid syntax
//   Tier 2  fill the blank  one token missing, chosen from a few candidates
//   Tier 3  free edit       any line, any value — errors are in-world jokes
//
import { useState } from 'react';
import {
  Cartridge,
  LABEL,
  SourceKey,
  WRITTEN_IN,
  parse,
  toSource,
} from './cartridge';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** One numbered line of the cartridge source. */
const SrcLine: React.FC<{ n: number; children: React.ReactNode; dim?: boolean }> = ({
  n, children, dim,
}) => (
  <div className={`flex items-center gap-3 py-1 ${dim ? 'opacity-40' : ''}`}>
    <span className="w-5 text-right text-xs text-gray-500 select-none">{n}</span>
    <span className="flex items-center gap-2" style={{ fontFamily: MONO, fontSize: 14 }}>
      {children}
    </span>
  </div>
);

const Name: React.FC<{ k: SourceKey }> = ({ k }) => (
  <>
    <span className="text-sky-300">{LABEL[k]}</span>
    <span className="text-gray-500">=</span>
  </>
);

// ── Tier 1 ──────────────────────────────────────────────────────────────────

const SWATCHES = ['#F2A03D', '#F27DA0', '#7CC94E', '#67E8F9', '#C084FC', '#FFFFFF'];
const SKIES = ['#2B2158', '#0E0B2A', '#4A3572', '#1E3A5F', '#3B1F2B', '#123524'];

/** A hex value you change by tapping, never by typing. */
const ColorChip: React.FC<{
  value: string;
  options: string[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 border border-dashed border-amber-400/60 hover:bg-white/10"
      >
        <span
          className="w-3.5 h-3.5 rounded-sm border border-black/40"
          style={{ background: value }}
        />
        <span className="text-amber-300">{value}</span>
      </button>
      {open && (
        <span className="absolute z-10 left-0 top-full mt-1 flex gap-1 rounded-lg bg-gray-900 p-1.5 border border-gray-700 shadow-xl">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className="w-6 h-6 rounded border-2 hover:scale-110 transition"
              style={{ background: o, borderColor: o === value ? '#fbbf24' : 'transparent' }}
            />
          ))}
        </span>
      )}
    </span>
  );
};

/** A number you change with two arrows. Cannot become "banana". */
const NumberChip: React.FC<{
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  render?: (v: number) => string;
}> = ({ value, min, max, onChange, render }) => (
  <span className="inline-flex items-center rounded border border-dashed border-amber-400/60">
    <button
      onClick={() => onChange(Math.max(min, value - 1))}
      className="px-1.5 text-gray-400 hover:text-white hover:bg-white/10"
    >−</button>
    <span className="px-1.5 text-amber-300">{render ? render(value) : value}</span>
    <button
      onClick={() => onChange(Math.min(max, value + 1))}
      className="px-1.5 text-gray-400 hover:text-white hover:bg-white/10"
    >+</button>
  </span>
);

export const TierTap: React.FC<{
  cartridge: Cartridge;
  onChange: (c: Cartridge) => void;
  upToChapter: number;
}> = ({ cartridge, onChange, upToChapter }) => {
  const set = <K extends SourceKey>(k: K, v: Cartridge[K]) =>
    onChange({ ...cartridge, [k]: v });

  const keys = (Object.keys(LABEL) as SourceKey[])
    .filter((k) => WRITTEN_IN[k] <= upToChapter)
    .sort((a, b) => WRITTEN_IN[a] - WRITTEN_IN[b]);

  return (
    <div>
      {keys.map((k, i) => (
        <SrcLine key={k} n={i + 1}>
          <Name k={k} />
          {k === 'catColor' && (
            <ColorChip value={cartridge.catColor} options={SWATCHES} onChange={(v) => set('catColor', v)} />
          )}
          {k === 'skyColor' && (
            <ColorChip value={cartridge.skyColor} options={SKIES} onChange={(v) => set('skyColor', v)} />
          )}
          {k === 'speed' && (
            <NumberChip value={cartridge.speed} min={0} max={9} onChange={(v) => set('speed', v)} />
          )}
          {k === 'score' && (
            <NumberChip
              value={cartridge.score}
              min={0}
              max={31}
              onChange={(v) => set('score', v)}
              render={(v) => `0b${v.toString(2)}`}
            />
          )}
        </SrcLine>
      ))}
      <p className="mt-3 text-xs text-gray-500 leading-relaxed">
        Every character on screen is real syntax — but the only thing a tap can produce
        is a <em>valid</em> file. There is no way to break it, so there is nothing to be
        afraid of.
      </p>
    </div>
  );
};

// ── Tier 2 ──────────────────────────────────────────────────────────────────

const CANDIDATES = ['#FF9933', 'orange', '255,153,51', 'FF9933'];
const CORRECT = '#FF9933';

export const TierBlank: React.FC<{
  cartridge: Cartridge;
  onChange: (c: Cartridge) => void;
}> = ({ cartridge, onChange }) => {
  const [picked, setPicked] = useState<string | null>(null);
  const right = picked === CORRECT;

  return (
    <div>
      <SrcLine n={1}>
        <Name k="skyColor" />
        <span className="text-amber-300">{cartridge.skyColor}</span>
      </SrcLine>
      <SrcLine n={2}>
        <Name k="catColor" />
        {picked && right ? (
          <span className="inline-flex items-center gap-1.5 text-amber-300">
            <span className="w-3.5 h-3.5 rounded-sm border border-black/40" style={{ background: CORRECT }} />
            {CORRECT}
          </span>
        ) : (
          <span
            className={`px-2 rounded border-2 border-dashed ${
              picked ? 'border-red-400 text-red-300' : 'border-gray-600 text-gray-600'
            }`}
          >
            {picked ?? '▯▯▯▯▯▯▯'}
          </span>
        )}
      </SrcLine>

      <div className="mt-3 flex flex-wrap gap-2">
        {CANDIDATES.map((c) => (
          <button
            key={c}
            onClick={() => {
              setPicked(c);
              if (c === CORRECT) onChange({ ...cartridge, catColor: CORRECT });
            }}
            className="rounded-md border border-gray-600 bg-gray-800 px-2.5 py-1 text-xs hover:bg-gray-700"
            style={{ fontFamily: MONO }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3 min-h-[2.5rem] text-sm">
        {picked && !right && (
          <p className="text-rose-300">
            The cat stays grey. <span className="text-gray-400">
              {picked === 'orange' && 'The machine has never heard the word “orange.” It only counts.'}
              {picked === '255,153,51' && 'Right three numbers. Wrong shape — it wants them stuck together, in hex.'}
              {picked === 'FF9933' && 'So close. Without the # it thinks you are naming something.'}
            </span>
          </p>
        )}
        {right && <p className="text-emerald-300">The cat warms up. 🐱</p>}
      </div>
    </div>
  );
};

// ── Tier 3 ──────────────────────────────────────────────────────────────────

export const TierFree: React.FC<{
  cartridge: Cartridge;
  onChange: (c: Cartridge) => void;
  onFault: (f: string | undefined) => void;
}> = ({ cartridge, onChange, onFault }) => {
  const [text, setText] = useState(() => toSource(cartridge));
  const { errors } = parse(text);

  const run = () => {
    const result = parse(text);
    onChange(result.cartridge);
    onFault(result.errors.length ? result.errors[0].message : undefined);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        rows={5}
        className="w-full rounded-lg bg-black/50 border border-gray-700 p-3 text-amber-200 outline-none focus:border-amber-500"
        style={{ fontFamily: MONO, fontSize: 14, lineHeight: 1.7 }}
      />
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={run}
          className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm text-white hover:bg-emerald-500"
          style={{ fontFamily: PIXEL_FONT, fontSize: 18 }}
        >
          RUN ▶
        </button>
        <span className="text-xs text-gray-500">
          {errors.length === 0
            ? 'reads clean'
            : `${errors.length} line${errors.length > 1 ? 's' : ''} the machine can't follow`}
        </span>
      </div>

      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-rose-300">
          {errors.map((e, i) => (
            <li key={i}>
              <span className="text-gray-500">line {e.line + 1}:</span> {e.message}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 text-xs text-gray-500 leading-relaxed">
        By now the reader has watched every one of these lines get written, one chapter
        at a time. A blank page would have been terrifying in Chapter 1. Here it is just
        a page they already know.
      </p>
    </div>
  );
};
