# Lost Language of the Machines

A children's book that teaches how computers really work, 500 years after
programming was forgotten. Flamey (a teenage robot), Starlax (his human friend),
and Prof. Evergreen (the last person who speaks the lost language) restore a
broken 200-year-old arcade game called CATVENTURE.

## ⚠️ Status: mid-reconstruction — explore, don't settle

The book is being rebuilt and **the interaction model is an open question**. Do not
treat the current chapters as the target shape; treat them as the thing being
replaced. When in doubt, prototype an option rather than commit to one.

**All new work goes under `/lab`** — `src/pages/lab/*` and `src/components/lab/*`.
The published book (`/chapter0` … `/chapter4`) stays untouched until a direction
is chosen. Lab pages are `noindex` and reachable only from `/lab`, so no reader
arrives by accident. (The shared world lives at `src/components/lab/world/`
during the rebuild — the paths named under Architecture below are the
post-reconstruction destination, not where the files are today.)

### The open question: what kind of game?

Chapters are moving from story-style prose toward **chat + game**. The hard part
is the game: it must be **easy for a kid to join and not overwhelming**, and the
kid should be able to **read the code and make small adjustments** — hands-on, not
just clicking. Candidates on the table:

- **Open-world / Minecraft-ish campus** — big agency, high build cost, and code
  reading has to be bolted on somewhere.
- **Canon-style clone-and-edit** ([tau.dev/2026/08/07/canon](https://tau.dev/2026/08/07/canon))
  — a text-and-image world where *every* item has a clone button, anything you own
  is editable, and every toy another player made doubles as a tutorial. Its
  scripting language (Cant) is deliberately limited, and sparse docs are part of
  the game. Built so the author's kid could learn the View Source way.

The View Source instinct is the one to protect: **small, readable, tweakable, and
the tweak visibly changes the world.**

## The spine: build-a-game

**Every chapter teaches one concept AND restores one piece of the game.** This is
the book's organising idea — hold onto it when adding anything.

Chapter titles state the concept as a fact a kid can hold: *"A Colour Is a
Number," "A Decision Is a Door," "A Heartbeat Is a Loop."* Chapter 0 shows the
machine broken; Chapter 13 boots it, and the same skills save the campus.

Full structure, per-chapter jokes and mini-game specs live in `raw/`:

- `raw/book-structure.md` — the whole book, chapter by chapter (v2, build-a-game)
- `raw/joke-bank.md` — placed jokes plus spares, and what makes one land
- `raw/drafts/` — full prose drafts for chapters 4–13 and the epilogue
- `raw/open-world-design.md` — the campus map design and its roadmap

Read these before proposing new chapter content. Cast, running gags and the
finale's reveals are all tracked there.

**`/writers-room`** is an internal page listing every drafted joke by chapter,
filterable by status (in the book / in a draft / candidate / cut) with anchors
flagged. It reads `src/data/jokes.ts` — keep that file updated when a joke gets
placed in or cut from a chapter. Cut jokes stay in the list on purpose so we
stop re-pitching them. The page is `noindex` and deliberately unlinked from the
campus map; it's a tool, not part of the book.

## Writing principles

1. **The joke IS the lesson.** The best material teaches while it's being funny —
   "*If they have eggs, buy a dozen*" returning twelve loaves of bread *is* the
   conditionals lesson. Prefer load-bearing jokes to decorative puns.
2. **Let the kid feel smart.** The reader should get there a beat before the
   character does. Flamey being one step behind Starlax is the delivery mechanism.
3. **Never explain a joke.** If it needs explaining, let the mini-game explain it
   by accident. A `<Beat />` — white space — is how a punchline gets its timing.
4. **Callbacks over one-liners.** A gag planted in Chapter 1 that pays off in
   Chapter 7 makes the book feel like a world instead of a textbook with stickers.
5. **The story never quizzes.** The door doesn't open, or Boxy won't move, until
   the concept clicks. Failure should always be funny.
6. **Say true things.** Grace Hopper's moth, silicon being sand, 1024-not-1000 —
   kids love that these are real. Never fake a fact for a gag.

## How content is represented

Content types have distinct shapes on the page so a kid can tell them apart
without being told. Use these primitives from `src/components/world/prose.tsx`
rather than raw `<p>` tags:

| Primitive | For |
|---|---|
| `<Story>` | narration (`opening` adds the drop cap) |
| `<Line who="flamey\|starlax\|evergreen\|boxy\|nova">` | dialogue, colour-coded per speaker |
| `<Slide>` | anything Evergreen projects — this is where rules live |
| `<Beat>` | the pause before a punchline |
| `<Play>` | something to fiddle with |
| `<Forge>` | a mini-game that repairs the reader's real cartridge |
| `<TrueStory>` | real history |

**The Game Forge is the reward loop.** Each Forge stage produces a real,
persisted piece of the reader's own copy of CATVENTURE (localStorage). The sprite
they paint in Chapter 4 shows up in the map's HUD and in Chapter 0's cabinet.
Their game visibly assembles as they read — so new Forge stages must persist and
be surfaced elsewhere, not just play locally.

## Architecture

- `src/components/world/` — the shared world: `theme.ts` (palette/fonts),
  `buildings.tsx`, `prose.tsx`, `ChapterShell.tsx`, `CampusMap.tsx`, `CartridgeHud.tsx`
- **`CHAPTERS` in `buildings.tsx` is the single source of truth** for what exists,
  what's readable, where it sits on the map and what it restores. The map, chapter
  headers and next-chapter nav all read from it — adding a chapter is one entry
  plus a page.
- `src/pages/chapterN/index.tsx` wraps its chapter component in `<ChapterShell id="chapterN">`.
- Chapters not yet written stay in `CHAPTERS` with `open: false` — they render on
  the map behind "under restoration" tape. The roadmap is part of the fiction.
- `src/pages/chapterN/chat.tsx` holds the evening texting scene (`ChatRoom`).

## Conventions

- Pixel font is `VT323` (`PIXEL_FONT` in `theme.ts`), loaded in `_document.tsx`.
- Animation is `framer-motion`. Any generated art (stars, etc.) must be
  **deterministic** — no `Math.random()` at render, it causes hydration mismatch.
- Interactive components own their own state and persist to localStorage under
  `gameforge.*` keys.

## Working agreements

- Temp files (screenshots, dev logs, scratch scripts) go in the repo's `tmp/`
  folder — e.g. `agent-browser screenshot tmp/foo.png`, `npm run dev > tmp/dev.log`.
  Never `/tmp` or a system scratchpad. `tmp/` is gitignored.
- Use relative paths in bash commands — absolute paths trigger permission prompts
  via the iMessage bridge.
- Verify visual work in a real browser (`agent-browser`) before calling it done.

## Deployment

Deployed via AWS Amplify. Pushing to `main` triggers an automatic build and deploy.

- Live URL: https://main.du90m19521itr.amplifyapp.com/
- Amplify console: https://console.aws.amazon.com/amplify/apps/du90m19521itr/branches/main?region=us-east-1

## Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes

Note: SVG `<g>` elements with React `onClick` aren't reachable by role/name —
click them via `eval` with `dispatchEvent(new MouseEvent('click',{bubbles:true}))`.
