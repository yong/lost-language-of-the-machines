// CartridgeHud.tsx — the CATVENTURE cartridge status, shown on the campus map
// and inside every chapter. Chips light up only when the reader really did the
// repair, and the SPRITE chip renders their own painted hero — so the game they
// are building is visible everywhere they go.
import { useEffect, useState } from 'react';
import { COLOR_OF, STORAGE_KEY as SPRITE_KEY } from '@/components/lab/book/chapter4/SpriteForge';
import { PIXEL_FONT } from './theme';
import { ForgePiece, useProgress } from './progress';
import { chapterHref } from './routes';

interface Chip {
  piece: ForgePiece;
  name: string;
  chapter: number;
  /** false = this chapter's Forge stage isn't built yet */
  exists: boolean;
}

const CHIPS: Chip[] = [
  { piece: 'score', name: 'SCORE', chapter: 1, exists: true },
  { piece: 'text', name: 'TEXT', chapter: 2, exists: false },
  { piece: 'color', name: 'COLOR', chapter: 3, exists: false },
  { piece: 'sprite', name: 'SPRITE', chapter: 4, exists: true },
  { piece: 'sound', name: 'SOUND', chapter: 5, exists: false },
];

export const useSprite = () => {
  const [sprite, setSprite] = useState<string | null>(null);
  useEffect(() => {
    const saved = window.localStorage.getItem(SPRITE_KEY);
    if (saved && saved.length === 256) setSprite(saved);
  }, []);
  return sprite;
};

export const SpriteChip: React.FC<{ sprite: string; px?: number }> = ({ sprite, px = 2 }) => (
  <span
    className="grid border border-gray-700 rounded-sm overflow-hidden"
    style={{ gridTemplateColumns: `repeat(16, ${px}px)` }}
  >
    {sprite.split('').map((c, i) => (
      <span key={i} style={{ width: px, height: px, backgroundColor: COLOR_OF[c] ?? 'transparent' }} />
    ))}
  </span>
);

const CartridgeHud: React.FC<{ floating?: boolean }> = ({ floating = true }) => {
  const sprite = useSprite();
  const progress = useProgress();

  const shell = floating ? 'fixed bottom-3 left-1/2 -translate-x-1/2 z-30' : 'mx-auto';

  return (
    <div
      className={`${shell} flex items-center gap-2 sm:gap-3 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-2xl px-3 sm:px-5 py-2 text-sm whitespace-nowrap shadow-xl`}
      style={{ fontFamily: PIXEL_FONT }}
    >
      <span className="text-gray-500 hidden sm:inline">CATVENTURE CARTRIDGE //</span>

      {CHIPS.map((c) => {
        const done = !!progress[c.piece];
        const isSprite = c.piece === 'sprite';

        if (!c.exists) {
          return (
            <span key={c.piece} className="text-gray-600" title="this repair isn't built yet">
              {c.name} …
            </span>
          );
        }

        return (
          <a
            key={c.piece}
            href={chapterHref(`chapter${c.chapter}`)}
            className={`flex items-center gap-1 hover:opacity-80 ${done ? 'text-green-400' : 'text-amber-400'}`}
            title={done ? `${c.name} restored — chapter ${c.chapter}` : `go repair it in chapter ${c.chapter}`}
          >
            <span>{c.name}{done ? ' ✓' : '…'}</span>
            {isSprite && sprite && <SpriteChip sprite={sprite} />}
          </a>
        );
      })}
    </div>
  );
};

export default CartridgeHud;
