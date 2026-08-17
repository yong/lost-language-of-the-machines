# Chapter 11 — "A Bug Is a Moth"

**Learning goal:** Debugging — reading symptoms, forming hypotheses, changing
ONE thing at a time. Also: the true story of the first bug.

**Game piece restored:** ⭐ playability. The rebuilt game is haunted — walk
through walls, score counts DOWN, pausing speeds things up. One glitch traces
into Flamey himself; the stakes turn personal (rehearsal for the finale).

**Core jokes:** ancient programmers worked in the dark because light attracts
bugs · "it's not a bug, it's a feature" — "that sentence is also 500 years
old" · the 99-bugs song ("why did it go UP?" — "now you understand software").

---

## Story draft

The game was finished.

They had said those words out loud, which every builder of every thing since
the dawn of time will tell you is the mistake. The game had rules, a heartbeat,
a hero, music, color. They invited Prof. Evergreen to the lab for the first
official playthrough of CATVENTURE in two hundred years.

It went like this: the cat walked through a solid wall. It caught a fish and
the score went DOWN, from zero to -1, which Starlax argued was philosophically
interesting and Flamey argued was AN ABOMINATION. Starlax pressed pause; the
game ran faster. She pressed pause again; faster still. Boxy, watching,
displayed `:O` and quietly backed out of the room.

"It's haunted," said Flamey.

"It is *software*," said Prof. Evergreen, with the peace of a man on home
soil. "Congratulations. You have built something real enough to be broken.
Now I will teach you the oldest hunt in the world." He dimmed the lights.

"Why the dark?" whispered Starlax.

"Tradition. The ancients preferred debugging in the dark." A pause the length
of a grin. "Light attracts bugs."

He told them the story then — and this part, he said, tapping the table, was
TRUE, and they could look it up. Four hundred years before the Controlled
Silicon Era even ended, in 1947, engineers found their giant computer failing.
Inside it — an actual moth, trapped in a relay. They taped the moth into the
logbook and wrote beneath it: *First actual case of bug being found.*

[SLIDE: photograph of the real Harvard Mark II logbook page, real moth, real
handwriting. No cats. This one's sacred.]

"The word was already old," said Prof. Evergreen, "but the moth made it
immortal. And it teaches the only rule of debugging that matters: the bug is
always REAL. Not a ghost. Not a curse. A moth in a relay. A wrong number in a
right place. Find the moth."

They hunted all afternoon. He taught them the method like a marital art:

One: make the bug happen on purpose. A bug you can summon is a bug you own.
Two: guess where the moth is. Three: change ONE thing. One. Not five. Four:
look again.

The score bug fell first — one flipped sign, `score - 1` where a plus should
be. ("It's not a bug," Flamey attempted, "it's a feature. Hard mode."
"That sentence," said Prof. Evergreen, "is also five hundred years old, and
it was never true.") The wall bug was a collision gate wired to the wrong
sprite — the cat had been checking collisions against the FISH's walls, a
sentence which made everyone's head hurt but whose fix was one line. Starlax
sang the ancient debugging song as they worked, off a slide Evergreen swore
was educational:

*"99 little bugs in the code, 99 little bugs — take one down, patch it
around — 127 little bugs in the code."*

She stopped. "Wait. Why did it go UP?"

"Now you understand software," said Prof. Evergreen.

Only the pause bug remained. And the pause bug was strange, because the pause
bug wasn't in the game.

Flamey traced it — through the loop, through the button reader, down into the
controller wiring, and the trail ended at his own hand on the ancient
controller. His diagnostic port had been leaking clock signals into the
console — HIS heartbeat, spilling into the game's, speeding it up with every
touch. The game wasn't haunted.

He was.

"There is a loose relay in your wrist," said Prof. Evergreen, quietly, the way
you tell someone a moth landed on them and you don't want it to fly. "It has
likely been there for years. May I?"

It took him four minutes. He worked the way the kids now recognized from the
inside: one thing at a time, look again. When he closed the panel, the pause
button just paused, and Flamey flexed his fingers, feeling — as far as anyone
could tell — nothing different, and also completely different.

"You debugged me," said Flamey.

"You found it," said Prof. Evergreen. "I only reached the moth." He turned
off the slide. "Remember this one, young droid. Someday something much bigger
than a game will break, and everyone will call it a ghost, and you will be
the one who knows: it is always a moth. Find the moth."

[GAME FORGE: BUGS: 0 — the status screen's heartbeat runs clean and steady.
PLAYABLE ✓. Deep in the code, one moth-shaped easter egg sleeps in a comment.]

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey after the debugging day. Short teenage texts.
Starlax: hey. you ok?
Starlax: the wrist thing
Flamey: yeah
Flamey: weird day. I was the bug
Starlax: no!! the bug was IN you. big difference
Starlax: the moth isn't the computer. evergreen said
Flamey: ...that's actually helping. annoyingly
Starlax: also can we talk about how he LAUGHED at the eggs joke but went full priest about the moth
Flamey: the moth is his religion. did you see him TAPE a picture of it in his notes
Starlax: like the ancients taped the real one 🥹
Flamey: ok debugging quiz bc I need normalcy
Flamey: Nova's food bowl is full but she's screaming. find the moth
Starlax: hypothesis 1: bowl is full of the WRONG food
Flamey: change one thing
Starlax: swapped to fish flavor. still screaming
Flamey: hypothesis 2?
Starlax: ...the screaming was never about food
Starlax: checked. door was closed. she wanted the door open
Flamey: THE BUG WAS IN A DIFFERENT MODULE
Starlax: it always is 😭 it ALWAYS is
```

---

## Mini-game spec: "The Moth Hunt"

- **Setup:** the player's own game (their sprite, their rules) with ONE line
  sabotaged per level. The symptom shows in play; the code sits below, five to
  ten lines, one wrong.
- **Play:** reproduce the bug (game rewards making it happen on purpose —
  unusual and true to real debugging), then tap the guilty line and fix it
  from three choices. Changing a non-guilty line is allowed — and produces a
  NEW symptom, teaching "change one thing" by consequence.
- **Level design mirrors the story:** flipped sign, wrong-sprite collision,
  off-by-one lives counter, a `REPEAT` that runs once too many.
- **Final level (the foreshadow):** the bug isn't in the code at all — the
  code is perfect. The console's clock line is glitching. The fix button for
  THAT is grayed out, labeled: "requires: Chapter 13."
- **Easter egg:** every level's background has a moth somewhere. Tapping it
  does nothing. It's a moth. It's just real. Collect all and unlock the 1947
  logbook photo with a kid-friendly history card.
