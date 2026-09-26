// chapter-def.ts — what a chat-novel chapter IS, so a second one does not mean
// a second engine.
//
// Chapter.tsx was written around Chapter One's four toys, its script and its
// one storage key. That is fine for one chapter and a fork waiting to happen
// for two — and CLAUDE.md already has the rule from the last time ("one
// implementation, two doors"): a copy drifts from the thing that was tested.
// So the chapter is data and the reader is the engine.
import type { ReactNode } from 'react';
import type { OpeningProps } from '@/components/novel/ChapterOpening';

export type Beat =
  | {
      kind: 'msg';
      who: 'starlax' | 'flamey' | 'nova';
      text: string;
      /** arrives together with the previous message — no extra tap */
      rush?: true;
      /** show a typing indicator before this one; reserve for real suspense */
      typing?: true;
    }
  | { kind: 'beat' }
  /** `toy` names one of the chapter's own toys; the chapter decides what it is */
  | { kind: 'toy'; toy: string; label: string };

/** Whatever a toy needs to remember. Kept to JSON-safe shapes: the reader's
 *  place and their toys go to localStorage together. */
export type ToyValue = number | boolean | number[];
export type ToyState = Record<string, ToyValue>;

export type OpeningCopy = Pick<OpeningProps, 'image' | 'eyebrow' | 'title' | 'paragraphs' | 'handoffLine'>;

export interface ChapterDef {
  /** localStorage key for this chapter's place and toys. Chapter One keeps the
   *  key it already shipped with, so nobody's progress is orphaned. */
  storageKey: string;
  /** where the reader goes when they step back off the cover */
  exitHref: string;
  opening: OpeningCopy;
  /** the last thing in the chapter: a line that lands the lesson, and the door
   *  out. Hard-coded to Chapter One's until there were two chapters. */
  ending: { line: string; next: string; href: string };
  script: Beat[];
  toys: {
    initial: ToyState;
    /** what the reader still has to do, or null once the story may go on */
    gate(toy: string, s: ToyState): string | null;
    render(toy: string, s: ToyState, set: (patch: ToyState) => void): ReactNode;
  };
}

/** Has the reader actually touched anything, or is this save just a cursor some
 *  earlier build wrote? (CLAUDE.md: progress is proven by the toys, not by the
 *  clock.) Generic version of the check Chapter One shipped: anything that
 *  differs from the starting state counts. */
export const toysTouched = (initial: ToyState, saved: Record<string, unknown>): boolean =>
  Object.entries(initial).some(([k, v]) => {
    const got = saved[k];
    if (Array.isArray(v)) return Array.isArray(got) && got.some((x, i) => x !== v[i]);
    return typeof got === typeof v && got !== v;
  });

/** Pull this chapter's toys out of a saved blob, ignoring anything whose shape
 *  has changed since it was written. */
export const readToys = (initial: ToyState, saved: Record<string, unknown>): ToyState => {
  const out: ToyState = { ...initial };
  for (const [k, v] of Object.entries(initial)) {
    const got = saved[k];
    if (Array.isArray(v)) { if (Array.isArray(got) && got.length === v.length) out[k] = got as number[]; }
    else if (typeof got === typeof v) out[k] = got as ToyValue;
  }
  return out;
};
