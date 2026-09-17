// toys.tsx — the interactive beats, sized to sit inside a chat bubble stream.
//
// Each one is gated: the conversation cannot continue until the reader has
// actually done the thing. Failing is impossible — only stalling — which is how
// "the story never quizzes" and "failure should always be funny" coexist.
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// NOTE: the raw px below (minHeight 34/44, minWidth 22) are deliberate. They are
// thumb sizes, not text sizes -- a tap target is a physical dimension and must
// NOT grow or shrink with the reader's font setting. Everything that carries
// text is sized in rem, cqw or % instead.

export const bin8 = (n: number) => n.toString(2).padStart(8, '0');
export const nib = (n: number) => n.toString(16).toUpperCase();

// ── one switch ──────────────────────────────────────────────────────────────

export const SwitchToy: React.FC<{ on: boolean; onChange: (v: boolean) => void }> = ({ on, onChange }) => (
  <div className="flex items-center justify-center gap-5">
    <button
      onClick={() => onChange(!on)}
      aria-label="the only switch"
      className="flex h-24 w-16 flex-col items-center justify-center rounded-xl border-4 touch-manipulation transition-colors"
      style={{ borderColor: on ? '#fbbf24' : '#374151', background: on ? 'rgba(251,191,36,.18)' : '#0f0d1c' }}
    >
      <span className="text-3xl" style={{ fontFamily: MONO, color: on ? '#fbbf24' : '#4b5563' }}>
        {on ? '1' : '0'}
      </span>
      <span className="mt-0.5 text-[0.5625rem] uppercase tracking-wider text-gray-500">{on ? 'on' : 'off'}</span>
    </button>

    <div
      className="flex w-[150px] max-w-full shrink items-center justify-center rounded-lg border-4 border-gray-800"
      style={{ aspectRatio: '4/3', background: on ? '#2B2158' : '#08070f', containerType: 'inline-size' }}
    >
      {on ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
          className="text-amber-300" style={{ fontFamily: PIXEL_FONT, fontSize: '11cqw' }}
        >
          CATVENTURE
        </motion.span>
      ) : (
        <span className="text-gray-700" style={{ fontFamily: PIXEL_FONT, fontSize: '9cqw' }}>no signal</span>
      )}
    </div>
  </div>
);

// ── eight switches ──────────────────────────────────────────────────────────

export const RowToy: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
  <div>
    <div className="flex gap-1">
      {[7, 6, 5, 4, 3, 2, 1, 0].map((bit) => {
        const on = ((value >> bit) & 1) === 1;
        return (
          <button
            key={bit}
            onClick={() => onChange(value ^ (1 << bit))}
            aria-label={`switch ${7 - bit}`}
            className="aspect-square flex-1 rounded border touch-manipulation transition-colors"
            style={{ minHeight: 34, background: on ? '#fbbf24' : '#0f0d1c', borderColor: on ? '#fbbf24' : '#374151' }}
          />
        );
      })}
    </div>
    <div className="mt-2 flex items-baseline justify-between" style={{ fontFamily: MONO }}>
      <span className="text-amber-200">{bin8(value)}</span>
      <span className="text-sm text-gray-500">{value}</span>
    </div>
  </div>
);

// ── eight rows ──────────────────────────────────────────────────────────────

// The ONE gesture in the chapter, and it earns its place because it is drawing
// rather than navigating: dragging paints a stroke instead of costing eight
// separate taps on 29px cells. Tapping single cells still works exactly as
// before, so nothing has to be discovered.
//
// touch-action is `pan-y`, not `none`: a horizontal drag is a brush stroke and
// a vertical one still scrolls the thread. The grid is 305px tall on a 390px
// phone, so taking scrolling away over it would strand the reader. Cat shapes
// are mostly horizontal strokes anyway.
//
// It PAINTS A VALUE rather than toggling — the value is decided by the cell you
// start on, the way every paint tool works. Toggling per cell would flicker
// cells on and off as a wobbling finger crossed them twice.
export const GridToy: React.FC<{ rows: number[]; onChange: (rows: number[]) => void }> = ({ rows, onChange }) => {
  const paint = useRef<0 | 1 | null>(null);
  // pointerdown always precedes click, so a plain tap would paint the cell and
  // then the click would toggle it straight back — a tap would do nothing at
  // all. This swallows exactly one click per pointer press. Keyboard activation
  // fires click with NO pointerdown, so Enter/Space still works: the drag is an
  // accelerator, never the only way in.
  const handled = useRef(false);
  const live = useRef(rows);
  live.current = rows;

  const set = (r: number, bit: number, v: 0 | 1) => {
    const cur = (live.current[r] >> bit) & 1;
    if (cur === v) return;
    onChange(live.current.map((row, i) => (i === r ? row ^ (1 << bit) : row)));
  };

  const cellUnder = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const r = el?.dataset?.r, bit = el?.dataset?.bit;
    return r === undefined || bit === undefined ? null : { r: +r, bit: +bit };
  };

  return (
    <div
      className="flex flex-col gap-1"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={(e) => {
        const c = cellUnder(e.clientX, e.clientY);
        if (!c) return;
        handled.current = true;
        paint.current = ((live.current[c.r] >> c.bit) & 1) === 1 ? 0 : 1;
        set(c.r, c.bit, paint.current);
      }}
      onPointerMove={(e) => {
        if (paint.current === null) return;
        const c = cellUnder(e.clientX, e.clientY);
        if (c) set(c.r, c.bit, paint.current);
      }}
      onPointerUp={() => { paint.current = null; }}
      onPointerCancel={() => { paint.current = null; }}
      onPointerLeave={() => { paint.current = null; }}
    >
      {rows.map((row, r) => (
        <div key={r} className="flex items-center gap-1">
          {[7, 6, 5, 4, 3, 2, 1, 0].map((bit) => {
            const on = ((row >> bit) & 1) === 1;
            return (
              <button
                key={bit}
                data-r={r}
                data-bit={bit}
                // Keyboard and screen-reader users get a real button each; the
                // drag above is an accelerator, never the only way in.
                onClick={() => {
                  if (handled.current) { handled.current = false; return; }
                  set(r, bit, on ? 0 : 1);
                }}
                aria-label={`row ${r} pixel ${7 - bit}`}
                aria-pressed={on}
                className="aspect-square flex-1 rounded-sm border touch-manipulation transition-colors"
                style={{ minWidth: 22, background: on ? '#fbbf24' : '#0f0d1c', borderColor: on ? '#fbbf24' : '#2c2a3d' }}
              />
            );
          })}
          <span className="w-[4.5rem] shrink-0 pl-1 text-right text-[0.625rem] text-gray-500" style={{ fontFamily: MONO }}>
            {bin8(row)}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── cutting a byte in half ──────────────────────────────────────────────────

export const HexToy: React.FC<{ value: number; cut: boolean; onCut: () => void }> = ({ value, cut, onCut }) => {
  const hi = (value >> 4) & 0xf;
  const lo = value & 0xf;
  return (
    <div className="text-center">
      <button
        onClick={onCut}
        disabled={cut}
        className="mx-auto flex items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-400/10 px-3 py-2 touch-manipulation disabled:border-gray-700 disabled:bg-transparent"
        style={{ fontFamily: MONO, minHeight: 44 }}
      >
        <span className="text-lg text-amber-200">{bin8(value).slice(0, 4)}</span>
        <motion.span animate={{ opacity: cut ? 1 : [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: cut ? 0 : Infinity }} className="text-gray-500">
          {cut ? '|' : '✂'}
        </motion.span>
        <span className="text-lg text-amber-200">{bin8(value).slice(4)}</span>
      </button>

      {cut && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
          <div className="flex items-center justify-center gap-6" style={{ fontFamily: MONO }}>
            <div>
              <div className="text-xs text-gray-500">{bin8(value).slice(0, 4)}</div>
              <div className="text-2xl text-amber-300">{nib(hi)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">{bin8(value).slice(4)}</div>
              <div className="text-2xl text-amber-300">{nib(lo)}</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-emerald-300" style={{ fontFamily: MONO }}>
            {bin8(value)} = {nib(hi)}{nib(lo)}
          </div>
        </motion.div>
      )}
    </div>
  );
};
