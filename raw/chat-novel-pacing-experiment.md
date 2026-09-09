# Chat-novel pacing — experiment log

> How should a chapter's conversation arrive on screen? Four reveal modes were
> built and read end to end on a 390×844 phone. This is what we learned and what
> we settled on, so it does not get re-litigated.
>
> All four survive in `/lab/novel`, switchable from the header button or by URL
> (`?reveal=static|dots|bubble|stream`), because two of them are still worth
> stealing from later.

## The four

| | Mode | How a message arrives | URL |
|---|---|---|---|
| **0** | **static** ⭐ **chosen** | the whole block appears at once; nothing moves | `?reveal=static` |
| 1 | dots | "…" sized to the message, then the whole bubble | `?reveal=dots` |
| 2 | bubble | bubble pops, then a silent reading pause | `?reveal=bubble` |
| 3 | stream | word by word with a caret, like an LLM | `?reveal=stream` |

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
