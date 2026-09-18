# The way into a chapter — transition experiment

> Cover → paragraph → chat. Four transitions, built to be compared rather than
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

## The four

| | Variant | Borrowed from | What it is actually testing |
|---|---|---|---|
| A | **Track** | Reels, Shorts | Pages on one rail that moves with the thumb. Does a feed-native pager make a book feel modern, or make the prose feel like something to flick past? |
| B | **Stories** | Instagram, Snapchat | Three segments across the top say how many beats there are and which one you are on. **Is "how much is left" the thing the opening was missing?** |
| C | **Depth** | App Store, Apple Books | Nothing slides; everything is z-axis. You go *through* the cover and the phone grows until it is the screen. Going IN rather than going DOWN. |
| D | **Cinema** | film titles | No pages at all. The art never leaves: the title lifts, the prose rises over it, the scene dims, the phone comes up out of the dark. **Was the page boundary the problem?** |

Each is a different *idea*, not a different easing curve. B is the only one that
answers "where am I"; C is the only one that says a book is a place you enter;
D is the only one where the cover art earns more than four seconds.

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

## Notes that cost something

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
