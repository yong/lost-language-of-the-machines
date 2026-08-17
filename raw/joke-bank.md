# Joke Bank — spares, variants, and quality notes

> The best 2–3 jokes per chapter are already placed in `book-structure.md`.
> This file holds the overflow, plus notes on what makes them land for kids.
> Chapter numbers follow the **v2 structure** (build-a-game spine): 4=picture,
> 5=sound, 6=memory, 7=gates, 8=instructions, 9=loops, 10=ifs, 11=bugs,
> 12=algorithms, 13=finale.

## What makes a joke "high quality" for this book

1. **It's true.** The best CS jokes are load-bearing — they teach the concept while
   being funny ("they had eggs" IS the if-statement lesson). Prefer these over puns.
2. **The kid gets to feel smart.** The reader should decode the joke slightly before
   the character does. Flamey being one beat behind Starlax is the delivery mechanism.
3. **Callbacks beat one-liners.** A joke planted in Ch1 that pays off in Ch6 makes
   the book feel like a world, not a textbook with decorations.
4. **Characters never explain the joke.** If it needs explaining, the mini-game or
   chat scene explains it by accident.

## Tier 1 — placed anchors (do not cut)

| Chapter | Joke | Why it works |
|---|---|---|
| 2 | "10 types of people" + missing-8-types payoff | Already in the book; the whole joke family grows from it |
| 7 | Three bots / "Do ALL of you want ice cream?" "I don't know / I don't know / YES!" | The AND gate, taught in one beat |
| 8 | Exact Instructions Sandwich Disaster | Machine literalism as physical comedy |
| 8 | "Make me a sandwich" → "YOU ARE NOW: A SANDWICH" | Kid-safe sudo joke; also a naming/assignment gag |
| 9 | Shampoo bottle: Lather. Rinse. Repeat. | The infinite loop, no diagram needed |
| 10 | "If they have eggs, buy a dozen" → 12 loaves → "THEY HAD EGGS." | The single best programming joke in existence |
| 11 | Grace Hopper's real 1947 moth | True story beats any invented joke |
| 13 | "HAVE YOU TRIED TURNING IT OFF AND ON AGAIN" as sacred ancient ritual | 500-years-later framing makes an old joke new |

## Spares & variants by topic

### Binary / numbers
- Evergreen's age: "I am 101010 years old." (42 — double joke for parents who know
  Hitchhiker's Guide)
- "Why do robots always split the bill evenly? Everything is divisible by 2."
- Flamey's alarm clock rings at 10:00: "Binary o'clock" (2am). He is not amused.
- Counting on fingers: Starlax can count to 10 on her fingers; Flamey can count
  to 1023. He mentions this constantly. Nobody asked.

### Hex
- Hex words treasure hunt: `CAFE`, `BEE5`, `FACE`, `F00D`, `C0FFEE`, `BADF00D`,
  `DEADBEEF`. Could hide one per chapter as an easter egg for re-readers.
- "Old programmers could count to 15 on one finger."
- Halloween/Christmas classic (OCT 31 == DEC 25) needs octal — probably skip, or
  keep as an Evergreen footnote: "The ancients had a third number system just for
  this one joke."

### Color / images
- Flamey's mood ring just displays hex codes. Angry = `#FF0000`. Embarrassed =
  slightly different `#FF0066`. Starlax keeps a cheat sheet.
- "Why couldn't the pixel find its friends? Low resolution."
- Green-screen invisibility gag (placed Ch3) can recur any time Flamey wants
  to skip class.

### Sound
- Flamey's singing voice is technically perfect and emotionally terrifying.
- "The first song ever sung by a computer was 'Daisy Bell' (1961)" — true, and a
  great Evergreen history drop (also a 2001 reference for parents).
- Nova hears the sample rate: high-pitched artifacts only she reacts to. Plot-useful
  in Ch13 (she hears the failing system before anyone).

### Memory / bytes
- "Why did the computer keep a photo of every cat it ever met? For its cache."
  (cache/cash — decent, but the nibble joke is stronger; keep as spare)
- Flamey forgets things when embarrassed: "I archive them. It's different."
- Boxy's memory is so small he introduces himself to Nova every single day.
  Nova prefers it this way. (also a running gag candidate)

### Logic
- OR gate is generous, AND gate is picky, NOT gate is a teenager, XOR can't handle
  agreement: "You BOTH want pizza? Then nobody gets pizza." (XOR taught in one line —
  use if XOR makes the cut in Ch7)
- Boolean cat (placed Ch10) variants: Nova on the fence, Nova in the box
  (Schrödinger adjacent — probably too old a reference, skip the label, keep the cat).

### Programming / bugs
- "A program is a recipe written for the world's fastest, most obedient,
  least imaginative cook."
- Flamey comments his own actions out loud when nervous. "// walking to class.
  // pretending that was on purpose."
- "It works on MY circuits" (kid version of "works on my machine") — good for Ch11.
- Rubber duck debugging with Nova (placed Ch11): the joke is she walks away
  mid-explanation and THAT's when Flamey solves it. True to life.
- "99 little bugs" song (placed Ch11) — could be an actual audio easter egg
  in the app.

### Algorithms
- Bogosort/Nova-sort (placed Ch12).
- "Why do librarians love binary search? They only have to be wrong 10 times."
  (log₂(1000) ≈ 10 — Evergreen footnote material)
- Flamey's band name options: "The Polynomial Times", "O(No)", "Sort of Famous".
  Starlax vetoes all of them. The band is never mentioned again. (or IS it —
  epilogue cameo?)

### AI / tokens (world jokes)
- Helper-bots' catchphrase "I'm sorry, I can't help with that" (placed Ch13) —
  seed it earlier: one bot says it in Ch6 when asked where the archives went.
- "Would you like a summary instead?" (placed Ch0) — the museum AI can recur:
  by Ch13 it offers "a summary of the apocalypse."
- Nobody in the future types; they gesture. Keyboards are museum pieces. Flamey
  learning to type is treated like learning calligraphy.

## Jokes considered and rejected (so we don't re-litigate)

- "Why did the computer get cold? Left its Windows open" — dated brand joke,
  breaks the 500-years-later fiction.
- UDP/TCP jokes — too old for the audience, need networking context we never build.
- "Why was 6 afraid of 7" variants — not actually about computing.
- Anything requiring English wordplay that won't survive translation — the
  eggs/bread joke works in any language; "byte/bite" barely does (kept anyway,
  it's too on-theme to cut — but never stack two English-only puns in one chapter).
