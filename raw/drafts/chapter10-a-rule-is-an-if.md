# Chapter 10 — "A Rule Is an If"

**Learning goal:** Conditionals and booleans — if/else, true/false, and why
precision matters more than intention.

**Game piece restored:** ⭐ the rules. IF cat touches fish → score+1. IF cat
touches vacuum → lose a life. The kids write the laws of their game's universe
and feel like tiny gods.

**Core jokes:** "if they have eggs, buy a dozen" → twelve loaves → "THEY HAD
EGGS." · `!false` — it's funny because it's true · Nova half-in-half-out:
"ERROR. EXPECTED TRUE OR FALSE. RECEIVED: CAT."

---

## Story draft

The game had a heartbeat now, and like everything with a heartbeat, it
immediately needed feeding.

"The loop runs," said Flamey, pacing Prof. Evergreen's office, "the cat walks,
the cat touches the fish, the collision gate fires, the 'mao' plays — and then
NOTHING HAPPENS. No points. The fish just sits there, eternally caught,
eternally uneaten. Our game has no *rules.*"

"Then today you learn the word IF," said Prof. Evergreen. "And because IF is
the most dangerous word in the lost language, we will practice somewhere
safe." He handed Boxy a shopping bag. "The campus market."

It was not somewhere safe.

The kids wrote Boxy's shopping instructions together, and they were proud of
them, and the instructions said:

```
Buy a loaf of bread.
IF they have eggs: buy a dozen.
```

Boxy returned forty minutes later, `:D`, glowing with accomplishment, and
placed on the desk, one by one, with ceremony:

Twelve loaves of bread.

Starlax looked at the bread. Flamey looked at the bread. A long silence looked
at the bread.

"Boxy," said Starlax carefully. "Why twelve loaves?"

Boxy's face went `:D`.

"THEY HAD EGGS," said Boxy.

Prof. Evergreen laughed. Actually laughed — a rusty, alarming sound, like a
door that hadn't been opened in decades. Both kids stared at him in fascinated
horror.

"Five hundred years," he wheezed, wiping his eye. "That joke is five hundred
years old. It was old when the ancients told it. And it will be true until the
last machine goes dark: the IF binds to what you SAID." He pulled the slate
over and marked it up like a crime scene. "Buy a dozen — a dozen WHAT? You
meant eggs. You wrote nothing. Boxy was already holding bread. The machine
filled your silence with its best guess, and a machine's best guess is
whatever is nearest."

"So the fix is..." Flamey took the slate. "IF they have eggs: buy a dozen
*EGGS.*"

"The fix is to say what you mean. All of it. Every time." He stood and went to
the board. "An IF asks one question, and the question must have exactly two
possible answers: TRUE or FALSE. The ancients called these *booleans.* Not
'sort of.' Not 'mostly.' Not—"

He stopped. Everyone followed his gaze.

Nova stood in the office doorway. Precisely in the doorway. Front half in the
office, back half in the corridor, motionless, gazing into the middle
distance with the serenity of a creature beyond human questions.

Boxy's sensors swiveled toward her. His face flickered through `:|`, `:?`,
and settled on `X(`.

"ERROR," Boxy announced. "DOOR STATUS QUERY: IS SUBJECT INSIDE. EXPECTED:
TRUE OR FALSE. RECEIVED: CAT."

"Yes," said Prof. Evergreen, as if this proved everything. "Cats predate
boolean logic and refuse to acknowledge it. Ignore her. She does it to teach."

On the board he wrote one final thing, small, in the corner — the ancients'
oldest logic joke, he said, and they would get it when they got it:

`!false`

"The exclamation mark means NOT," he said. "Read it aloud."

"Not false," said Starlax. "...so, true. It's — " she blinked — "it's funny
because it's true."

"OHHHH," said Flamey, four full seconds later.

Then they went home and became gods. That is not an exaggeration; that is
what writing rules feels like the first time. They sat at the screen with the
game loop beating and wrote the laws of a small universe:

```
IF cat touches fish:   score = score + 1, play "mao"
IF cat touches vacuum: lives = lives - 1, play "hiss"
IF lives == 0:         GAME OVER
IF score == 99:        ??? 
```

[GAME FORGE: RULES: RESTORED ✓ — the reader writes/orders the actual IFs;
the "???" slot is left for the reader to invent their own rule. Their law.
Their universe.]

"What happens at 99?" asked Starlax.

Flamey thought about it for a long time.

"Something good," he said finally. "Rule of the universe: something good."

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey about if/else. Short teenage texts.
Starlax: mom asked me to write a chore list for my little cousin
Starlax: I wrote it in IFs. full boxy style
Flamey: show me
Starlax: IF room is messy: clean room. ELSE: free time
Flamey: solid. what happened
Starlax: he moved everything under the bed and declared "room is not messy"
Flamey: 😂 the condition was too weak
Flamey: he didn't break the rule, he broke the DEFINITION
Starlax: exactly what evergreen said!! machines and little cousins are the same
Flamey: rewrite: IF nothing under bed AND floor visible AND bed made: free time
Starlax: he'll find a gap. they always find a gap
Flamey: that's why the ancients wrote tests 😌
Starlax: btw update on Nova doorway status
Flamey: in or out
Starlax: she has been 50% in for two hours. boxy has logged 400 errors
Flamey: RECEIVED: CAT
Starlax: RECEIVED: CAT 😭
```

---

## Mini-game spec: "The Rule Writer"

- **Format:** a branching sandbox — the chat-novel engine's perfect fit. Boxy
  runs errands (shopping, chores, cat-sitting); the player writes the IF/ELSE
  rules that steer him; the story plays out the consequences with total
  literalism.
- **Play:** each scenario offers condition and action pieces to assemble
  (young mode) or free-write (older mode). RUN → watch the disaster or the
  triumph as comic-panel scenes. Twelve loaves of bread is level one, played
  for laughs, then fixed by the player.
- **Boss level:** write the game's real rule table (fish/vacuum/lives/game
  over). The rules go live in the player's actual game — including one
  free "IF score == 99" slot where the player invents anything (rain of fish,
  cat turns gold, Boxy dances). Personal law of a personal universe.
- **Fail-forward:** there is no lose state; there are only increasingly funny
  wrong universes. The game quietly saves the funniest disaster to share.
- **Easter egg:** set any condition to `RECEIVED: CAT` and Nova wanders
  through the level, half-in, half-out, unjudgeable.
