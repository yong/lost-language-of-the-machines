// HexGrid.tsx — the cartridge dump.
//
// Looks like a hex editor, because that look is half the thrill. Is NOT a real
// one: you never type hex. Tapping a byte opens a stepper/slider, so a kid on a
// phone can change any byte and can never enter something that isn't a byte.
//
// Mobile: 8 bytes per row (16 overflows 390px). Each cell carries its ASCII
// character underneath instead of using a separate right-hand gutter — which is
// how TITLE gives itself away with no search tool at all.
import { asciiOf, toHex, Region, regionAt, ROM_SIZE } from './format';

interface Props {
  rom: Uint8Array;
  selected: number | null;
  onSelect: (offset: number) => void;
  /** regions the reader has uncovered — undiscovered bytes stay anonymous */
  found: Set<string>;
  /** offsets flashing from a search hit */
  hits: number[];
  perRow: number;
}

const HexGrid: React.FC<Props> = ({ rom, selected, onSelect, found, hits, perRow }) => {
  const rows = Math.ceil(ROM_SIZE / perRow);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-fit font-mono">
        {Array.from({ length: rows }, (_, r) => {
          const base = r * perRow;
          return (
            <div key={r} className="flex items-stretch">
              <span className="flex w-11 shrink-0 items-center justify-end pr-2 text-[10px] text-gray-600">
                {base.toString(16).padStart(4, '0')}
              </span>
              {Array.from({ length: perRow }, (_, c) => {
                const off = base + c;
                if (off >= ROM_SIZE) return <span key={c} className="flex-1" />;
                const reg: Region | undefined = regionAt(off);
                const known = reg && found.has(reg.id);
                const isSel = selected === off;
                const isHit = hits.includes(off);
                return (
                  <button
                    key={c}
                    onClick={() => onSelect(off)}
                    // 44px tall: the thumb minimum from CLAUDE.md
                    className={`relative flex h-11 flex-1 flex-col items-center justify-center border transition
                      ${isSel ? 'border-amber-300 bg-amber-400/25' : isHit ? 'border-emerald-400 bg-emerald-400/25' : 'border-transparent'}
                      active:bg-white/20`}
                    style={{
                      minWidth: 34,
                      background: !isSel && !isHit && known ? `${reg!.hue}22` : undefined,
                      borderBottomColor: known && !isSel && !isHit ? reg!.hue : undefined,
                      borderBottomWidth: known && !isSel && !isHit ? 2 : undefined,
                    }}
                  >
                    <span className={`text-[13px] leading-none ${known ? 'text-gray-100' : 'text-gray-400'}`}>
                      {toHex(rom[off])}
                    </span>
                    <span className="mt-0.5 text-[9px] leading-none text-gray-600">
                      {asciiOf(rom[off])}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HexGrid;
