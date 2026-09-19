// ChapterOpening — the way into a chat chapter.
//
// THE PROBLEM. Some scenes cannot be established in dialogue. "The museum
// basement smelled of dust and old electricity" is not a text message, and
// faking it as one ("omg this basement smells insane") buys atmosphere by
// making a character stupid. So prose keeps the establishing beat, and the
// problem becomes the handoff — which must not read as a format change.
//
// THE ANSWER IS IN THE PALETTE, and it is the same in all four variants:
// theme.ts calls PAGE "the warm page you read on" and the chat is a lit screen
// in a dark room, so the room goes out, the phone stays lit, and its header
// morphs into the chat's own header (one shared layoutId — the header is the
// right thing to share and the first bubble is not, because the reader IS
// Starlax and a notification of her own message would be a lie).
//
// FOUR WAYS IN, BUILT TO BE COMPARED rather than argued about — the method
// that settled the reveal modes. Everything but the transition is held
// constant. See openings/index.ts for what each one is testing, and
// raw/opening-transition-experiment.md for the log.
import { useEffect, useState } from 'react';
import { OPENINGS, OpeningId, DEFAULT_OPENING, isOpeningId } from './openings';
import type { Content } from './openings/shared';

export type OpeningPhase = 'cover' | 'page';
export const OPENING_KEY = 'gameforge.novel.opening';

export interface OpeningProps extends Content {
  /** lab only: offer the variant chip and honour ?open= */
  lab?: boolean;
  phase: OpeningPhase;
  onAdvance: (next: OpeningPhase) => void;
  onEnter: () => void;
  onBack: () => void;
}

/** Cycle the variant from the cover itself. Switching by URL is miserable on
 *  the device this is meant to be judged on, and an experiment nobody can flip
 *  between does not get compared — it gets guessed at. */
const VariantChip: React.FC<{ id: OpeningId; onPick: (id: OpeningId) => void }> = ({ id, onPick }) => {
  const i = OPENINGS.findIndex((o) => o.id === id);
  const next = OPENINGS[(i + 1) % OPENINGS.length];
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onPick(next.id); }}
      className="absolute right-2 top-2 z-40 flex min-h-11 items-center rounded-full border border-white/15 bg-black/35 px-3 text-[0.625rem] uppercase tracking-[0.2em] text-white/70 backdrop-blur"
    >
      way in: {OPENINGS[i]?.name ?? id} ›
    </button>
  );
};

const ChapterOpening: React.FC<OpeningProps> = (props) => {
  const [variant, setVariant] = useState<OpeningId>(DEFAULT_OPENING);

  useEffect(() => {
    // SETTLED: the official chapter is always Track. Only the lab reads a
    // variant out of the URL or off the device — a reader should never be
    // handed a different way in because of something poked at in an
    // experiment, and DEFAULT_OPENING is the winner, so it needs no lookup.
    if (!props.lab) return;
    try {
      const q = new URLSearchParams(window.location.search).get('open');
      const stored = window.localStorage.getItem(OPENING_KEY);
      const pick = isOpeningId(q) ? q : isOpeningId(stored) ? stored : DEFAULT_OPENING;
      setVariant(pick);
    } catch { /* a bad save just means the default */ }
  }, [props.lab]);

  const pick = (id: OpeningId) => {
    setVariant(id);
    try { window.localStorage.setItem(OPENING_KEY, id); } catch { /* private mode */ }
  };

  // A cut variant can still be sitting in someone's localStorage (or in a URL
  // they bookmarked), so fall back rather than render nothing.
  const entry = OPENINGS.find((o) => o.id === variant) ?? OPENINGS[0];
  const Variant = entry.Component;

  return (
    <div data-opening={entry.id}>
      {/* lab only, and only on the cover: mid-read is no place to change the
          rules, and a reader should never meet the experiment at all */}
      {props.lab && props.phase === 'cover' && <VariantChip id={entry.id} onPick={pick} />}
      <Variant {...props} />
    </div>
  );
};

export default ChapterOpening;
