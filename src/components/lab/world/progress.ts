// progress.ts — what the reader has actually repaired.
//
// The book's reward loop depends on this being honest: a cartridge chip only
// lights up when the reader really did the work, and it stays lit everywhere
// (campus HUD, Chapter 0's broken cabinet) so their game visibly assembles.
import { useEffect, useState } from 'react';

const KEY = 'gameforge.progress.v1';

/** One entry per Game Forge stage. Keys are stable — don't rename them. */
export type ForgePiece = 'score' | 'text' | 'color' | 'sprite' | 'sound' | 'rules';

const read = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
};

export const markRestored = (piece: ForgePiece) => {
  if (typeof window === 'undefined') return;
  const next = { ...read(), [piece]: true };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('gameforge:progress'));
};

/** Live progress — updates when any Forge stage completes in this tab. */
export const useProgress = (): Record<string, boolean> => {
  const [state, setState] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const sync = () => setState(read());
    sync();
    window.addEventListener('gameforge:progress', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('gameforge:progress', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return state;
};
