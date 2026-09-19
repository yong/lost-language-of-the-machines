# The way into a chapter — transition experiment

> Cover → paragraph → chat. Transitions built to be compared rather than
> argued about, because describing them settled nothing. Same method that
> settled the reveal modes (`raw/chat-novel-pacing-experiment.md`).
>
> Live: **`/lab/openings`**, or `/lab/novel?opening=1&open=<id>`, or cycle with
> the chip on the cover. The choice is remembered per device.

## Why this and not something else

The chat UI itself is **not** in scope — it works and it is staying. The seam
is the problem: a reader crosses from a cinematic full-bleed opening into a
chat app, and everything the opening establishes has to survive that crossing.

**Held constant across all four,** so the comparison is only ever about the
transition: the same art, the same two paragraphs, the same phone lying on the
page, and the same morph into the thread (the phone's header and the chat's
header share one `layoutId`, so one becomes the other).

## The three that survive

| | Variant | Borrowed from | What it is actually testing |
|---|---|---|---|
| A | **Track** | Reels, Shorts | Pages on one rail that moves with the thumb. Does a feed-native pager make a book feel modern, or make the prose feel like something to flick past? |
| B | **Stories** | Instagram, Snapchat | Three segments across the top say how many beats there are and which one you are on. **Is "how much is left" the thing the opening was missing?** |
| C | **Cinema** | film titles | No pages at all. The art never leaves: the title lifts, the prose rises over it, the scene dims, the phone comes up out of the dark. **Was the page boundary the problem?** |

Each is a different *idea*, not a different easing curve. Stories is the only
one that answers "where am I"; Cinema the only one where the cover art earns
more than four seconds.

### ❌ Cut: Depth (App Store / Apple Books zoom-through)

Nothing slid; every move was along the z-axis — you went *through* the cover,
and the phone grew until it was the screen. The idea it was testing was a real
one: **a book is a place you enter, not a feed you advance.**

**Read on a phone and judged bad, so it is gone** rather than left in the list
to be re-pitched. My own read of why, for whoever considers it again: scaling a
page of *prose* makes the text swim on the way in and out, and zoom-through is
the idiom phones use for **modals** — a thing you open and dismiss — not for
pages you travel between. It promised depth and delivered a dialog.

A cut variant can still be in someone's `localStorage` or a bookmarked URL, so
an unknown `?open=` falls back to the first variant rather than rendering
nothing.

## What to judge them on

1. **Does it make you want to read the paragraph,** or hurry past it?
2. **Does the crossing into the chat still feel like one story?**
3. **Would an eleven-year-old know what to do** without being told?
4. Does it survive a second and third read, when the novelty is gone?
5. Does the cover art still matter by the time you reach the thread?

## Measured, all four

Cover → paragraph → thread on a 390×844 phone: **~1.35s** hands-off into the
thread, 6 bubbles, no sideways scroll, no page errors. They are within 15ms of
each other, so **speed is not the tiebreaker** — feel is.

### The one back question still open

Swipe down goes to **the previous page**, one step at a time — verified
`chat → page → cover` in all three, with the reader's place kept. It does not
jump to the cover.

But **pulling down out of the THREAD is the risky one**, and it is a different
action from the other two:

- `scrollTop 0` is exactly where a **re-reading** reader lives. They scroll up
  to look at the start of the conversation, flick out of habit, and get ejected
  from the chat.
- In almost every app a pull-down at the top means **refresh**, not *leave*.
  The gesture already has a learned meaning and it is not this one.
- The chat is a **destination, not page 3 of a pager.** The morph told the
  reader they went *inside* something; "up a level" is not the same action as
  "previous page", which is why phones use an edge-swipe or a nav bar for it
  rather than a pull.

Paper → cover is unambiguous and stays. For the thread, **A was chosen: keep
the pull, but reveal it.** It now behaves like pull-to-refresh —

- the thread **follows the finger**, damped 0.55 and capped at 132px, so the
  finger travels further than the thread does and the gesture has to be meant;
- a pill says **"pull to go back"**, and only flips to **"release to go back"**
  once the gesture has actually committed (84px of travel ≈ 153px of finger);
- it **arms only at `scrollTop 0`**, so a reader scrolling mid-thread never
  sees it at all.

Measured: at rest the pill is at opacity 0; a 90px pull warns and stays; a
240px pull moves the thread 132px, flips the wording and goes back; and a pull
from 60px down a scrollable thread is plain scrolling with the pill never
appearing.

**Dragging was also selecting the text it passed over** — the gesture left the
conversation smeared in blue highlight. `select-none` on the thread and on all
three opening surfaces; verified 0 characters selected after a drag in both.

**Back works the same in all of them, and it is not the arrow.** Verified per
variant: swipe DOWN on the paper returns to the cover, and pulling down at the
top of the thread returns to the paper. The arrow is a *visible fallback*, kept
because a gesture is invisible and rule 1 says one can accelerate a core action
but never carry it alone — not because back needs a button.

## Notes that cost something

- **A long pull did LESS than a short one.** `onPointerUp` was on the thread's
  scroller, but a 500px pull ends with the finger over the footer, so the event
  never reached the handler: 150px went back, 500px did nothing. Listen on the
  **window** for the release, not on the element the gesture started in.

- **Cinema needs a scrim it can rely on.** Prose over artwork is a contrast bet
  you lose somewhere, and here it is the moon. The band behind the text is ~72%
  black, so the worst case — white art — lands around rgb 82, about 5.8:1
  against the `#e7e2d4` text. Over AA by construction rather than by luck.
- **The variant chip lives on the cover only.** Mid-read is no place to change
  the rules, and an experiment nobody can flip between does not get compared,
  it gets guessed at. Switching by URL on a phone is miserable.
- Everything the pager rules already cost stands (see CLAUDE.md § mobile):
  swallow the click that trails a drag, measure prose overflow rather than
  assuming it, and never let the phone fall off the page — it is the way out.

## Verdict

*Unfilled — waiting on a read-through of all four on a real phone.*
