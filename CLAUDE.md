# Lost Language of the Machines

A children's book that teaches how computers really work, 500 years after
programming was forgotten. Flamey (a teenage robot), Starlax (his human friend),
and Prof. Evergreen (the last person who speaks the lost language) restore a
broken 200-year-old arcade game called CATVENTURE.

**The reader is a 10-year-old on a phone, held in one hand, reading alone.**
Every decision in this file serves that reader. When a rule below and that
reader disagree, the reader wins — and the rule gets fixed.

## ✅ Done means a kid can do it — the kid pass

Nearly every UX mistake in this project passed its tests and was caught by the
author or their son instead. The tests *knew the answers*: a script that clicks
a button by its label cannot be confused, so it can never find the moment a
kid does not know what to do. Tests prove it **works**. The kid pass is what
proves it **makes sense**. Nothing is handed back until both are done.

**Before building — borrow before inventing.** Ask what an app the reader
already uses does here (WhatsApp, Roblox, YouTube Shorts, any phone game). Chat
apps have no "keep reading" button; games glow the next thing to press; a
feed slides a sheet over the last one. If no app a kid knows does it, you need
a very good reason — and inventing a control to satisfy a rule in this file is
not one.

**After building, before handing back — walk it as the kid, on a phone
(390×844, production build, real touch):**

1. **What will they touch first, and does it work?** At every place the story
   waits, list everything that *looks* tappable — amber text, pills, cards,
   anything glowing or bouncing — and check each one does something. A
   tappable-looking thing that does nothing is the worst answer a kid can get.
2. **Is the thing to press obvious without reading?** The button the story is
   waiting on glows; the hint names it ("tap +1¢", not "push it past 9.99").
3. **Can they get stuck?** A state with no way on (an empty maze waiting on a
   button), a toy whose second go costs 999 taps, a story held back by a game
   or a game held back by a story.
4. **Would a 10-year-old ask "why?"** of any premise fact — and would they be
   bored yet? Read the chapter start to finish at their speed. If the same
   idea comes round a fourth time, cut.
5. **Critique every screenshot — name three things wrong before calling it
   right.** Look for what is empty, what repeats, what is cramped, what reads
   as something it is not (a control 16px from a message reads as a message).
   Anything that moves: capture it **mid-motion**, not just start and end.
6. **Then the numbers:** no sideways scroll, 44px targets, contrast measured
   against the rendered background, text sizes swept 16/20/24px.

**Taste is the author's call — offer, don't default.** Covers, motion,
premise, voice: show two options or ask, and never reuse something just
because it already exists (snow on every cover, a new idea bolted onto an
old chapter). When you do pick, say which one you picked.

**Rules here are defaults, not laws.** They record what worked last time. If
following one makes you invent UI, confuses the reader, or contradicts the
author's latest word, the rule is wrong — fix it here, don't obey it. The
incidents behind the rules live in **`raw/lessons-log.md`**; read the relevant
one before overturning a rule, because the incident is usually the argument.

## ⚠️ Status: mid-reconstruction — explore, don't settle

The book is being rebuilt and **the interaction model is an open question**.
Treat the current chapters as the thing being replaced; when in doubt,
prototype an option rather than commit to one.

**All new work goes under `/lab`** — `src/pages/lab/*` and
`src/components/lab/*` (the novel engine lives at `src/components/novel/*`).
The published book (`/chapter0` … `/chapter4`) stays untouched until a direction
is chosen. Lab pages are `noindex` and reachable only from `/lab`.

### 🔒 The direction: hack the binary first, earn the language second

**Act 1 — no source, just bytes.** The reader is handed the CATVENTURE
cartridge as *128 bytes* and a hex editor. The language it was written in has
been extinct for 500 years, so there is nothing to read and nothing to
recompile. There are only numbers, and changing one changes the game. This is
the one mechanic **the premise forces**, it makes "everything is a number"
literal, and it costs **zero typing** on a phone.

The core move is real technique, not a teaching metaphor: **search for a value
you can see.** The cat is orange, so look for `FF 99 33`. That is how Game
Genie codes were found and how Cheat Engine works. It escalates: a value you can
see → one you can't (the score) → change something and search for *what
changed*.

**The wall is the plot.** Byte-poking changes *values*, never *behaviour* — you
can recolour the cat, you cannot make it jump. Do not fix that ceiling. Let the
reader hack happily until they hit a wall they badly want past; **that** is
when the story hands them the lost language.

**Act 2 — the language.** Source arrives having been earned. Write a line, run
it, see the bytes change. Target language is **JavaScript** (runs in a browser
with no install; the book's own source becomes the final sandbox). Not Java:
no browser runtime, too much ceremony for an 11-year-old, and close enough to
JS that it transfers anyway. Real WASM is the **finale's** reveal — "what your
browser runs is a binary too" — not a teaching language. `/lab/proto-rom` is
the working prototype of Act 1.

**Notation order is forced: binary → byte → hex → colour.** Hex is
*compression* of binary (four bits per symbol), so taught first "why sixteen?"
has no answer. It is also only a typing convention — a reader can use `FF` as
a label meaning "all the way up". The way to reach colour early is that **a bit
is not a digit, it is a light**, and a light is something a thumb can touch
(`/lab/proto-bit`): one switch → eight switches in a row (a byte, discovered,
never defined) → eight rows is a picture (real: Game Boy tiles, bitmap fonts)
→ hex arrives as relief → colour. Nothing is explained before it has been felt.

**Chapter 1 opens with the hack; binary is the payoff.** Make the orange cat
green forty seconds in; rename the game; set the score; then byte `0x18` turns
out to be eight switches, each doing something *visible* (hat, mirror,
rainbow…) — which is why binary is necessary, and how real hardware flags and
Game Genie codes work. Invent a combination: you just wrote a cheat code.

**The other directions** (`/lab/prototypes`): a programmable puppet, a file
that grows, a decoding lens, rules-as-objects, teaching it words, and
Canon-style clone-and-edit ([tau.dev/2026/08/07/canon](https://tau.dev/2026/08/07/canon)).
F (`proto-rom`) was chosen; judge any new one on: can a kid do the first thing
unprompted · does it work with a thumb · is it behaviour or just appearance ·
is failure funnier than success · could one person build it. Anything that
needs typing on a touch keyboard pays a heavy tax. Protect the View Source
instinct: **small, readable, tweakable, and the tweak visibly changes the
world.**

## The spine: build-a-game

**Every chapter teaches one concept AND restores one piece of the game.**
Titles state the concept as a fact a kid can hold — *"A Colour Is a Number,"
"A Number Can Run Out of Room."* Chapter 0 shows the machine broken; Chapter 13
boots it.

Read before proposing chapter content: `raw/book-structure.md` (the whole book),
`raw/joke-bank.md`, `raw/drafts/`, `raw/open-world-design.md`,
`raw/chat-novel-pacing-experiment.md`, `raw/opening-transition-experiment.md`.

**`/writers-room`** lists every joke by chapter and status, from
`src/components/lab/data/jokes.ts`. Update it when a joke is placed or cut; cut
jokes stay listed on purpose, so nobody re-pitches them. Internal and unlinked.

## ⭐ Settled — the author's calls

Changing any of these needs the author's say-so. Each was a correction, so
defaulting back to the old way is the likeliest mistake.

- **Typing is how a chat arrives** (`dots`). `/chapter1` and every lab door
  open on it; `dots` is first in `MODES`; the mode is **not** remembered between
  loads (a stale `gameforge.novel.reveal` key is removed on sight). Static and
  stream stay behind the lab's toggle and `?reveal=`.
- **The way in is Track**: cover → paper → phone, a vertical pager, with
  **parallax** — the paper slides over the cover like a sheet.
- **Chapter One is `/chapter1`**, with binary snow on its cover. **Snow is
  Chapter One's only**: other chapters get their own living cover (Level 256:
  the game in attract mode; overflow: twinkling stars; the adder: a signal
  running through a circuit board).
- **The reader scrolls; nothing scrolls for them.** No "keep reading" button.
- **`/lab/overflow` is approved** — the only chapter so far eligible to
  graduate — and **locked**: no additions or codas without sign-off. Signed-off
  changes since approval: twinkling stars instead of snow; the drifting 1s
  removed from the cover; the *Ten in the Bed* roll-over; cut from 109
  messages and four toys to 44 and three after a kid found it long and
  repetitive; buttons that glow; gate hints that name the button.
- **An approved chapter is finished — a new idea gets a new chapter.** (Level
  256 began as a coda on overflow; it now lives at `/lab/level256`.)
- **Model on real games, never name them** (trademark worries): a borrowed bug
  becomes CATVENTURE's own. **Cats are heroes in the game, not players at it.**

## Writing a chapter

1. **One idea, one sentence a kid can hold**, told through something they
   already own (paint-by-numbers, *Ten in the Bed*). Give a character a
   **want**, make the toys the steps toward it, end on a **win**.
2. **Short.** Around 45 messages and three toys. Each costume of the idea gets
   **one** joke and moves on; a true, funny fact that is the fourth example of
   the same thing is a cut. What an adult finds thorough, a kid finds done.
3. **Play before you explain.** When the idea is about a game, let them play
   it healthy before showing how it works.
4. **Ask "why?" of every premise the way a kid would.** "Paused for 200 years"
   did not survive the question; "she got hooked and hit something weird on
   the last level" did.
5. **The joke IS the lesson.** Load-bearing jokes over decorative puns; let
   the kid get there a beat before the character; never explain a joke; plant
   callbacks; the story never quizzes, and failure is funny.
6. **Say true things.** Never fake a fact for a gag.
7. **A number a character reads out is the number on the screen** — build it
   from the same data the card draws.
8. **Voices.** Bubbles of one or two sentences. Starlax texts like a kid
   (lowercase, CAPS when excited, ⛽😳😂🤯); Flamey is a dry robot who uses an
   emoji when he is being dramatic (🤖😬🙄🙃); Nova only ever says 🐱. A
   handful of emoji per block, on the lines with a feeling in them.
9. **Prose only for what dialogue cannot do** — the establishing beat on the
   paper page, kept short: anything stated there is something the toys no
   longer get to reveal. Faking atmosphere as a text message makes a
   character stupid.

## Interaction principles

These are the reasoning; the code gotchas that implement them are further down.

1. **Tapping, never typing.** Keys and gestures are accelerators; every core
   action has something on screen to press. A swipe is invisible, so it can
   carry navigation (the opening pager) but never the only way through —
   tap and arrow keys still work there.
2. **Everything that looks tappable does something.** Hints the reader might
   tap are buttons (the footer's gate hint brings the toy into view and
   flashes its button). In the opening the whole screen is the target, so its
   hints are labels on something that works.
3. **The next thing to press is obvious.** The button the story waits on
   **glows** until pressed (`Push beckon`), one at a time. Gate hints name
   what to touch.
4. **Motion is allowed to call for attention if it stops when the reader
   acts** — a glow that ends on press, a pill that pulses twice. It changes
   **glow or colour, never size or position**: a swelling button is a moving
   target. Scene transitions and covers may move freely; messages arriving
   while you read may not compete with the words (hence one fade per block).
5. **The reader sets the pace.** Nothing scrolls for them. The story never
   starts the next thing for them after they play (the toy stays live;
   "continue when you're ready →") — **except a game event** (a level ends, a
   win): then the story follows the player at once, and the game is never held
   back for the story.
6. **Nothing is one-way, and nothing costs progress.** Every forward step has a
   back (swipe down, or the ← that steps back one beat and only leaves the book
   from the cover). A reload returns the reader to their place, held.
7. **The thing you change and the thing that changes are on screen together.**

## Mobile rules — sizes and layout

- Assume **390×844**, touch, no hover. Verify in a real mobile viewport, not
  a resized desktop window; `scrollWidth > clientWidth` is the one-line
  overflow check. The page never scrolls sideways — wide things get their own
  `overflow-x: auto`.
- **Tap targets ≥ 44px.** One exception: a row that must stay a row (a byte is
  eight switches in one row, 38px on a phone; an 8×8 grid, 29px). Nowhere else.
- **px for thumbs, rem for text.** Tap floors stay px (comment why); every font
  size is rem. Text inputs ≥ 16px or iOS zooms the page.
- **Reserve a height, never freeze one**: `min-h-[Nrem]` sized to the tallest
  state, so a bar does not twitch between states and does not clip at larger
  text.
- **Stages scale**: `width: min(100%, …)` + `aspect-ratio`, positions in %,
  text inside a stage in `cqw` (`container-type: inline-size`) — never `vw`,
  never a fixed `CELL = 52`.
- On a phone, pin the stage (`sticky top-0`) and let controls scroll under it.
- Contrast is measured against the **rendered** background — Tailwind v4 emits
  `oklch()`, so resolve colours through a canvas. White on `sky-600` fails AA.

## The chat-novel engine

**A chapter is data; `src/components/novel/Chapter.tsx` is the engine.** One
`ChapterDef` per chapter in `src/components/novel/chapters/*`: `opening`,
`script`, `ending`, and `toys` — `initial`, `gate(toy, state)` (what the reader
still has to do, phrased as what to tap), `render(toy, s, set, { live })`,
optional `played` states and `events`.

- **Never fork the engine for a chapter** — a copy inherits today's fixes and
  none of tomorrow's. `/chapter1` and `/lab/novel` render the same component
  with a `lab` flag (variant chip, reveal toggle, `?open=`, `?reveal=`,
  `noindex`).
- **Blocks and gates.** The script is cut at each toy; playing the toy releases
  the next block. Land the reader at the top of a new block.
- **`live`** is true only for the newest toy card, so a chapter whose cards are
  one game runs one clock and one cat.
- **Parking at the fold.** When the newest message lands below the fold,
  playback stops (`[data-waiting]` on the thread); the next bubble peeks from
  under a bottom fade; the moment it is scrolled on screen the story carries
  on. A tap on the thread also turns the page.
- **Layout.** Only the thread scrolls, never the page. Anchor the thread to the
  bottom (`flex min-h-full flex-col justify-end`). While a gate or hold is up
  there is no spacer (nothing pointless to scroll into); otherwise a ~viewport
  spacer lets the newest message reach the top. Pin to `scrollHeight` inside
  `requestAnimationFrame`; never yank a reader who scrolled up; never
  `setState` inside another `setState` updater.
- **Saving and restoring.** Toys are saved flat beside the cursor
  (`{...toys, block, at}`) under the chapter's own `storageKey`; bump the key
  when a chapter's script changes shape. Static counts blocks and timed modes
  count beats — reconcile by taking the furthest and deriving the other, with
  a saved block of 0 meaning no progress. **The toys prove progress, not the
  cursor**: a save with every toy untouched (`toysTouched` vs `initial`) counts
  as none. Restore **held**, or the restored toys satisfy the gate and the
  story plays itself. The maths must be idempotent (StrictMode runs it twice in
  dev).
- **URL doors.** `?restart=1` clears this chapter's save and reads from the
  top. `?opening=1` replays the opening and keeps your place. `?reveal=` (lab)
  picks a thread mode and skips the opening. `?from=<mark>` (lab) plays every
  earlier toy and lands on a `{ kind: 'beat', mark }`, at the top of the screen.
- Playback is gated on being in the thread — never behind the cover.

### The opening (cover → paper → phone)

`src/components/novel/ChapterOpening.tsx` with the Track variant
(`openings/Track.tsx`; Stories and Cinema stay switchable in the lab).

- **Cover**: art, eyebrow, title, a "swipe up" hint. **Paper**: the short
  paragraph with a drop cap, ending on the line that puts the phone in
  Starlax's hand — and the phone lying on the page. Tapping it darkens the room
  (`#08070f`) and morphs the phone into the chat: the phone card's header and
  the chat header share a `layoutId`. A screen nobody acts on is not a screen;
  an object beats a label; warm is the story, blue is the machine.
- **The pager**: both pages on one track that follows the thumb (drag, don't
  detect); release past ~18% or with velocity commits, less springs back.
  **Parallax** is a `useTransform` of the same `y`: art at half speed and
  dimming, title gone by a fifth of the way (later and it tangles with the
  art), paper opaque with a top shadow. Reduced motion: the flat slide.
- **Covers**: `opening.art` replaces the image and the snow. Draw in the art's
  1024×1400 space with `preserveAspectRatio="xMidYMid slice"`; a phone only
  shows x 188–836, so put what matters there. Deterministic, and settle to a
  still (reduced motion: jump to it).
- Let the morph land (~430ms) before the thread fades in, and drive that fade
  with a **CSS transition on state** — framer's `animate` inside the
  `LayoutGroup` gets overridden and the thread stays invisible.

### Gesture gotchas (each one cost a debugging round)

- **Test with real touch** — CDP `Input.dispatchTouchEvent`. Playwright's
  `mouse.*` passes cases a thumb fails.
- Fighting the browser for a scroll direction needs **touch events with a
  non-passive `touchmove` calling `preventDefault()`**: the browser claims a
  vertical drag after ~27px and fires `pointercancel`. Keep the pointer path for
  the mouse and bail on `pointerType === 'touch'`.
- **Swallow the click that trails a drag**, or a swipe also fires the tap.
- A scroll box inside a drag surface is a dead zone — make it scrollable only
  when it measurably overflows. Nothing load-bearing may fall off a page that
  cannot scroll.
- Drag surfaces get `select-none`. Leave the left 24px alone (Safari's back).
- A pager must sit under the right page **before first paint**:
  `useLayoutEffect`, and a jump rather than an animation for the first position.
- The pull-to-leave at the top of the thread is **revealed, not detected**:
  the thread follows the finger and a pill flips from "pull" to "release".
- Painting a grid by dragging: `touch-action: pan-y`, paint a **value** decided
  by the first cell, swallow one `click` per pointer press, find cells with
  `elementFromPoint`.

## Conventions

- Next.js 16, React 19, TypeScript, Tailwind v4, `framer-motion`. Pixel font
  `VT323` (`PIXEL_FONT` in `src/components/lab/world/theme.ts`).
- Generated art is **deterministic** (seeded PRNG) — `Math.random()` at render
  breaks hydration.
- Falling things use the book's own `react-snowfall` (`src/react-snowfall/`,
  see `BinarySnow.tsx`) fed with real `HTMLImageElement`s — a canvas fails
  `image.complete` silently and every flake becomes a grey circle.
- Interactive state persists to localStorage under `gameforge.*` keys. Forge
  stages build the reader's own CATVENTURE and must show up elsewhere, not
  just play locally.
- The shared world (palette, prose primitives `<Story> <Line> <Slide> <Beat>
  <Play> <Forge> <TrueStory>`, `CHAPTERS` in `buildings.tsx` as the single
  source of truth for the old campus map) lives at `src/components/lab/world/`
  during the rebuild.

## Testing and handing back

- **Test what the reader runs**: `npm run build && npx next start -p 3101`, a
  390×844 touch context, the saved state they actually have. A dev-server
  number is not a baseline (StrictMode doubles effects).
- **Seed localStorage from a page that does not mount the chapter**, and assert
  the seed stuck — or its own save effect overwrites the seed and the test
  measures a fresh reader.
- Walkthrough tests play like a reader: tap what the gate names, scroll with a
  thumb when `[data-waiting]` is set, never hunt for a button. Then **open the
  link and touch nothing**, and look at what is on screen.
- **When a report repeats after a fix, assume a new cause.** "Everything
  arrives at once" had four different causes over three rounds (see the log);
  count the ways a symptom can happen and rule each out on the reporter's
  terms.
- Kill servers with `for pid in $(pgrep -f "[n]ext-server"); do kill $pid; done`
  — `pkill -f` matching your own command line kills your shell.
- Temp files go in the repo's `tmp/` (gitignored), never `/tmp`. Use relative
  paths in bash.
- **Hand back with the link last — nothing after it.** Everything the author
  needs goes above it: what changed, what was verified, how to tell the new
  build from the old. Deep-link the page that changed, and remember the
  reviewer has read it before: `?restart=1` to read a chapter again,
  `?opening=1` to see the opening, `?from=<mark>` for a moment deep inside.
- **Never claim the deploy succeeded.** Pushing to `main` triggers Amplify, and
  `amplifyapp.com` is unreachable from here (the proxy answers 403).

## Deployment

AWS Amplify builds `main` on every push.

- Live: https://main.du90m19521itr.amplifyapp.com/
- Console: https://console.aws.amazon.com/amplify/apps/du90m19521itr/branches/main?region=us-east-1

## Browser automation

`agent-browser` (`--help`): `open <url>`, `snapshot -i` for refs, `click @e1`,
`fill @e2 "text"`, re-snapshot after changes. SVG `<g>` elements with React
`onClick` are not reachable by role — click them via `eval` with
`dispatchEvent(new MouseEvent('click',{bubbles:true}))`. Playwright-core with
the Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` works for
scripted touch tests.
