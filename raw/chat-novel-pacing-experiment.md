# Chat-novel pacing — experiment log

> ## ⭐ OVERRULED, AND THIS IS THE SETTLED ANSWER: **typing (`dots`)**
>
> This log picked `static`. Reading whole chapters in it then overruled that,
> and the pick is now **typing** — the messages arrive one at a time with a
> "typing…" indicator, on `/chapter1` **and** `/lab/novel`. The measurements
> below stand; the verdict line in the table does not. Keep reading for *why*
> each mode behaves as it does, not for what to default to.
>
> Typing is not a decoration here. It is what makes a thread read as a
> conversation instead of a transcript, and it also measured the **fastest**
> mode (75s vs 88s). The experiment's own finding — *animation competes with
> the content* — turned out to be about motion **while you read**, which is
> what `static`'s block structure and the toy gates already solve.
>
> **Three separate times** a reader was shown the whole block at once and it
> read as typing having been thrown away, while the mode itself was untouched:
> a saved cursor from a bad build restoring past block one, `/lab/novel`
> defaulting to `static`, and a remembered mode preference outliving the visit.
> Before defending the code, open both doors and count how the bubbles arrive.

> How should a chapter's conversation arrive on screen? Four reveal modes were
> built and read end to end on a 390×844 phone. This is what we learned and what
> we settled on, so it does not get re-litigated.
>
> Three of the four ship in `/lab/novel`, switchable from the header button or
> by URL (`?reveal=static|dots|stream`). Only `bubble` was deleted; its finding
> is kept below so it is not re-proposed.

## The four

| | Mode | How a message arrives | Verdict |
|---|---|---|---|
| 0 | static | the whole block appears at once; nothing moves | **kept, lab only** — `?reveal=static` |
| **1** | **dots** | "…" sized to the message, then the whole bubble | ⭐ **THE DEFAULT, everywhere** |
| 2 | bubble | bubble pops, then a silent reading pause | ❌ **dropped** — dead air |
| 3 | stream | word by word with a caret, like an LLM | ⭐ **kept** — `?reveal=stream` |

`static`, `dots` and `stream` all ship. **Only `bubble` was deleted** — a bubble
popping into silence is dead air, and it measured slowest. `stream` is kept
despite the objections below because **combining it with the dots** is the one
unexplored idea worth trying. An unknown `?reveal=` value falls back to **`dots`**, and so does everything
else: `?reveal=` is lab-only, and the mode is **not remembered between loads**,
so every arrival at either door starts in typing.

## Measured

Full chapter, 390×844, all delivering 75 messages with 4/4 gates and no errors:

| Mode | Time to read | Something moving |
|---|---|---|
| dots | **75s** | **42% of frames** |
| bubble | 88s | 5% |
| stream | 79s | 5% |

Counter-intuitive but consistent: **the liveliest mode was also the fastest.**
Popping whole bubbles into silence was both the deadest *and* the slowest.

## Verdicts

- **Mode 2 (bubble) is dead.** The gap between bubbles is dead air. This was the
  original complaint and the measurements agree with it.
- **Mode 1 (dots) is much better** and was the best of the animated three. The
  typing indicator is the texting-native way to say "someone is composing this",
  it fills the gap with motion that *belongs*, and it costs nothing in time.
- **Mode 3 (stream) has potential**, most likely **combined with dots** — dots
  while they "type", then the words arriving. Not pursued yet.
- **But animation of any kind competes with the content.** This is the finding
  that overrides the rest: motion pulls the eye to the *arrival* of the words
  rather than to the words. For a book whose whole job is comprehension, that is
  the wrong trade, however pleasant it feels in a demo.

## What we settled on

**Static blocks, gated by the toys.** The conversation is cut into segments at
each interactive beat. A segment renders **whole and still** — the reader reads
at their own speed, with nothing moving — and ends at its toy. Playing the toy
reveals the next segment.

The reader's attention is on the words, then on their hands, then on the words
again. Nothing ever competes for it.

Two details that matter:

- **Land the reader at the TOP of the new block**, not the bottom. With
  auto-play you follow the tail of the thread; with static blocks you want to
  begin reading at the start of what just appeared.
- **A single quick fade on the block, never per-message.** Enough to signal
  "this is new", not enough to animate the reading.

## Never scroll the page for the reader

The rule that came out of reading `dots` on a real phone, and the most
important one on this page:

> **A reader's speed and a playback clock cannot be kept in sync, so the machine
> must not try.** When the newest message falls below the fold, playback
> **stops** and waits. The reader continues when they are ready — and only then
> does the view move.

Auto-scrolling to follow the tail feels helpful and is not: it moves text the
reader is still reading. The correct shape is a **page turn the reader asked
for**, not a conveyor belt.

**The same rule covers finishing a toy.** Satisfying a gate must NOT launch the
next thing. The reader has just got their hands on something — they may want to
keep flipping switches or redraw the cat — and having the story barge in half a
second later is the identical violation: the machine moving on its own clock.
So the story **holds**, the toy stays live, and the footer offers "continue when
you're ready →". Nothing advances until the reader says so.

Implementation notes:

- Park the moment the newest beat is not fully visible from the reader's current
  scroll position; show a plain "keep reading ↓".
- Continuing scrolls the newest message to the **top**, giving a fresh screenful
  to fill. This needs a **bottom spacer of roughly a viewport** — without it the
  newest message can only be brought to the bottom of the view, not the top.
- If the reader scrolls down far enough themselves, resume without making them
  tap as well.
- **While the story waits, leave nothing below the content to scroll into.**
  The page-turn spacer must not render during a gate or a hold: scrolling into
  dead space while nothing happens reads as broken. With it gone the thread ends
  at the toy, so downward scrolling is bounded and only re-reading upward is
  left — which is the "lock" without taking re-reading away.
- **Anchor the thread to the BOTTOM, like every chat app** (`flex min-h-full
  flex-col justify-end`). Top-aligned content that is shorter than the thread
  leaves the toy stranded at the top under a screenful of blank. It is not
  scrollable — so a "can you scroll into dead space?" check passes — but it
  still reads as broken, and the taller the phone the worse it looks. Measured
  at the first hold: a 241px empty gap became 28px.
- **The waiting affordance is the one place motion belongs,** because the story
  has stopped and nothing is competing with reading. Make it a real pill, not a
  line of small text — a still line got missed. Pulse it a couple of times and
  then **stop**: animation that never ends is both a moving tap target
  (Playwright refuses to click one, and a thumb has the same problem) and a
  return of the distraction the static decision removed.
- Static mode does move the view once per block, but only in answer to a gate
  the reader just satisfied — the same "you asked for it" test.

Measured: 25 seconds of hands-free watching, **scrollTop never left 0**, and a
full chapter took 7 reader-initiated page turns.

## Why word-by-word is the wrong idiom here regardless

Worth recording so it is not re-proposed on instinct:

1. **It breaks the fiction.** ChatGPT streams because the text is genuinely
   being generated. Our characters are two kids texting on phones, and no phone
   shows a friend's message arriving letter by letter. It quietly turns a
   character into a terminal.
2. **It fights reading speed.** ChatGPT's paragraphs are long enough that you
   read while it generates. Our bubbles are 3–8 words — absorbed at a glance —
   so streaming makes the reader *wait* for text they already took in.

## Genre notes (Hooked, Yarn, Wattpad Tap)

Researched before building, and still true — just not what we chose:

- One tap per message is the genre standard; Wattpad has logged billions.
- The tap target is the **whole screen**, never a button to aim at. Putting a
  button in the footer felt sluggish at an identical tap count.
- Keep bubbles to one or two sentences; end beats on a question or surprise.
- Give each character a voice signature so speakers are identifiable unlabelled.

We tried tap-per-message properly (whole-screen target, rapid-fire lines merged
to ~66 stops) and it still tested badly **for this book specifically** — because
our toys already ask for the reader's hands, so the prose should not.

## Engineering traps found on the way

Cost real debugging; all fixed, all worth remembering:

- **The page must not scroll — only the thread.** A `flex-1 overflow-y-auto`
  column between a fixed header and footer. Page-level scrolling under sticky
  bars made the screen jump at the bottom.
- **Pin to `scrollHeight` inside `requestAnimationFrame`**, or you pin before
  the new bubble has laid out and the thread twitches backwards.
- **Give the footer a fixed height.** Ours grew 18px when a gate replaced the
  progress bar, which shrank the thread and clamped its scroll — the whole
  conversation jumped every time a toy appeared.
- **Never `setState` inside another `setState` updater.** The word counter was
  reset from inside a `setAt` updater; React is free to double-invoke or reorder
  those, and did — nothing ever streamed until it moved to its own effect.
- **Never yank a reader who scrolled up** to re-read. Only auto-follow when they
  are parked within ~80px of the bottom.
- **A block cannot always land at the top, and that is the spacer rule
  winning.** Measured 138px down instead of 12px. Both rules are ours: "land at
  the TOP of a new block" needs roughly a viewport of slack beneath it, and
  "leave nowhere pointless to scroll during a gate" deletes exactly that slack.
  When a block is shorter than the screen the scroll simply runs out. The
  block is fully visible either way, so the spacer rule wins — this is a
  resolved conflict, not an outstanding bug.
- **Restoring a reader's place must restore them HELD.** Persisting the toy
  state means the restored block's gate is already satisfied, so playback sees
  a clear road and runs — the reader opens the page and watches their chapter
  play itself. `held` renders only when no gate is outstanding, so setting it on
  every restore is invisible to someone who left mid-toy.

- **The footer is a control, not a message — space it like one.** At `py-2`
  with the toy card's border ending 16px above the rule, the blue pill read as
  the next thing Starlax said. Same bar, same button: `pb-7` on the thread and
  `py-3` on the footer (27px above the rule, 28px below) plus a slightly darker
  ground on both chrome bars, and it reads as a control. Nothing about it was
  measurable — every width and text-size check passed before and after.

- **A fixed footer height and a fixed *text* size are different promises.** The
  footer must not CHANGE height between states, but freezing it at `h-10` clips
  the button as soon as a reader raises their font size — measured at a 320px
  viewport, a 40px footer held a 68px button at a 20px root and an 81px one at
  24px. The fix is not shorter copy: RESERVE the height of the tallest state in
  **rem** (`min-h-[3.75rem]` = two wrapped lines + padding) so every state is
  identical at every text size. Verified constant across 16/20/24px roots.
- **px is right for thumbs and wrong for text.** A 44px tap target is a physical
  dimension and must not grow with the font setting; a 15px bubble is text and
  must. Every `text-[Npx]` on the page became rem; the `minHeight: 34/44` and
  `minWidth: 22` tap floors in the toys stayed px, with a comment saying why so
  they don't get "fixed" later.
- **Width sweeps do not catch this.** 320/360/390/430/768 all passed clean
  while the footer was clipping at larger text. Sweep the **root font size**
  as well as the viewport.

- **A mode switch is not a satisfied gate.** Changing reveal mode moves the
  live cursor between a block's toy and a per-message index, so the gate can go
  from set to null with nobody touching anything. Detecting "gate just
  satisfied" without excluding that fired a hold on the very first render,
  because the page defaults to `static` for one frame before `?reveal=` is read.
