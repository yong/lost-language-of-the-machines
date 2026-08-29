// DPad.tsx — on-screen movement for touch.
//
// Required by the mobile-first rule in CLAUDE.md: arrow keys are an
// accelerator, never the only way through. A kid on a phone has no keyboard,
// so any world you can walk around in needs this.
//
// Buttons are 56px — comfortably past the 44px thumb minimum.

interface Props {
  onMove: (dx: number, dy: number) => void;
  /** shown under the pad, e.g. a hint about what else is tappable */
  hint?: string;
}

const BTN =
  'flex h-14 w-14 items-center justify-center rounded-xl border border-gray-700 ' +
  'bg-[#1d1930] text-2xl text-amber-300 select-none touch-manipulation ' +
  'active:bg-amber-400/25 active:border-amber-400';

const DPad: React.FC<Props> = ({ onMove, hint }) => (
  <div className="flex flex-col items-center">
    <div className="grid grid-cols-3 gap-1.5" style={{ width: 'max-content' }}>
      <span />
      <button type="button" aria-label="move up" className={BTN} onClick={() => onMove(0, -1)}>↑</button>
      <span />
      <button type="button" aria-label="move left" className={BTN} onClick={() => onMove(-1, 0)}>←</button>
      <span />
      <button type="button" aria-label="move right" className={BTN} onClick={() => onMove(1, 0)}>→</button>
      <span />
      <button type="button" aria-label="move down" className={BTN} onClick={() => onMove(0, 1)}>↓</button>
      <span />
    </div>
    {hint && <p className="mt-2 text-center text-[11px] text-gray-600">{hint}</p>}
  </div>
);

export default DPad;
