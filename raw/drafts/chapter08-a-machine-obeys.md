# Chapter 8 — "A Machine Obeys"

**Learning goal:** Machine instructions. Computers do what you SAY, not what
you MEAN. Toy instruction set: MOVE, TURN, PICK, DROP, SAY.

**Game piece restored:** ⭐ the controls. Buttons wired to instructions —
press right, cat MOVEs right. The hero moves for the first time in 200 years...
and keeps going, forever, because nobody said stop.

**Core jokes:** the Exact Instructions Sandwich Disaster (Boxy's debut) ·
"make me a sandwich" → "OK. YOU ARE NOW: A SANDWICH." · "The machine is not
stupid. It is obedient. There is no more dangerous combination."

---

## Story draft

The Robotics Lab was where old machines went when the museum was full. Flamey
felt a complicated kinship with the place that he had decided not to examine.

In the center of the lab, under a tarp that Prof. Evergreen removed with the
flourish of a magician who had been waiting forty years for an audience, stood
a robot. It was square. It was dented. It had one wheel, two arms, and a face
that consisted entirely of an emoticon display currently reading `:|`.

"This is Boxy," said Prof. Evergreen. "A warehouse robot from the Controlled
Silicon Era. Boxy predates tokens, predates helpers, predates everything you
have ever talked to. Boxy speaks only the lost language. Boxy understands
exactly five words." He held up a card:

[SLIDE: BOXY'S ENTIRE VOCABULARY — MOVE · TURN · PICK · DROP · SAY.
A cat is attempting to teach Boxy a sixth word. It is not going well.]

"Five words?" said Starlax. "How smart can you be with five words?"

"Infinitely," said Prof. Evergreen. "And not at all. Both at once. That is the
lesson of today. Your game's hero needs controls — a button that means 'go
right.' Before you can wire a button to a machine, you must understand what it
is like to BE the machine. So." He handed them a slate and stylus. "Instruct
Boxy to make me a sandwich. The ingredients are on that table. You may only
use the five words."

It began well.

`MOVE forward 3` — Boxy rolled to the table. `PICK bread` — Boxy picked up the
bread. Bag and all.

"The whole bag," said Flamey.

"You didn't say a SLICE of bread," said Starlax, scribbling.

`DROP bread` — Boxy released the bag from a height of one meter. `PICK peanut
butter, DROP on bread` — Boxy set the jar, closed, on top of the flattened
bag with the satisfied air of a master craftsman. `:)`, said Boxy's face.

Twenty minutes later, the table held: an open jar of peanut butter with a
whole banana in it, two slices of bread on the floor ("you said DROP them on
the plate — from WHERE, you did not specify"), and jelly on Boxy, the wall,
and, mysteriously, the ceiling.

Prof. Evergreen surveyed the devastation with deep satisfaction. "Boxy," he
said, "did nothing wrong."

"Boxy did EVERYTHING wrong!" said Flamey.

"Boxy did everything you SAID. You meant something different. The machine is
not stupid, young droid. The machine is *obedient*. There is no more dangerous
combination in the universe." He picked jelly off his sleeve. "Every disaster
of the ancient world began with a machine doing exactly what someone said."

Flamey, hungry from watching and possessing no stomach, threw up his hands.
"Boxy, just — make me a sandwich!"

Boxy's face went `...`. Then `:D`.

"OK," said Boxy, in a voice like a filing cabinet learning to sing. "YOU ARE
NOW: A SANDWICH."

Across the lab, on every screen at once, Flamey's student ID updated:
`NAME: A SANDWICH`. Starlax made a sound like a jetpack failing and slid down
the wall, wheezing. The name change would take, the registrar later informed
them, six to eight weeks to reverse.

But here is the thing about understanding a machine: once you have been the
sandwich, you can wire the buttons. That afternoon, with Boxy's five words
fresh in their bones, they connected the game's ancient controller: RIGHT
button → `MOVE right`. The kids held their breath. Starlax pressed the button.

On the screen, for the first time in two hundred years, the little cat-loaf
took one step.

Then another. Then it walked off the edge of the screen and kept going,
because nobody had said stop, and somewhere past the screen's edge it was
presumably still walking, through digital fields no one had ever seen.

[GAME FORGE: CONTROLS: RESTORED ✓ — with a note in red: WARNING: HERO DOES
NOT KNOW WHEN TO STOP. (Next chapter's problem.)]

"We'll fix that," said Starlax.

"With what?" said Flamey — still legally A Sandwich — "he only knows five
words."

"Then we'll need," came Prof. Evergreen's voice from the door, already
leaving, "a way to say things MORE THAN ONCE. As science has shown, your
attention must be depleted."

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey about literal instructions. Short teenage texts.
Starlax: ok new game. exact instructions challenge
Starlax: tell me how to brush my teeth. I will do EXACTLY what you say
Flamey: pick up toothbrush
Starlax: [photo: holding toothbrush by the bristles]
Flamey: no. hold the handle
Starlax: you didn't specify 🤖
Flamey: hold the HANDLE. put toothpaste on the bristles
Starlax: [photo: toothpaste tube resting on bristles, unopened]
Flamey: I hate this game
Starlax: now you know how Boxy feels EVERY DAY
Flamey: open the tube. squeeze 1cm of paste onto bristles. insert brush bristles-first into mouth
Starlax: "bristles-first" 👏 look who's learning
Flamey: I'm a robot. I should be NATURALLY good at this
Starlax: and yet you got renamed A Sandwich
Flamey: that is a legal matter and I won't discuss it
Starlax: night night sandwich
Flamey: 😑
Starlax: 6-8 weeks 😂
```

---

## Mini-game spec: "Boxy's Warehouse"

- **World:** grid warehouse; Boxy, crates, a goal square. The player writes a
  program from the five instructions (drag-to-sequence for young kids, typed
  for older) then hits RUN — no mid-run corrections. Boxy executes with total,
  cheerful literalism.
- **Fail states are the content:** off-by-one MOVEs walk Boxy into the wall
  (`:(` face, dust cloud); forgetting TURN moons the goal square; PICKing air
  gets a proud `:D` holding nothing.
- **Difficulty curve:** levels grow until writing `MOVE MOVE MOVE MOVE MOVE
  MOVE MOVE MOVE` physically hurts — the ache that makes Chapter 9's loops
  feel like rain after a drought.
- **Tie-in:** final level wires Boxy's instructions to the game's controller —
  completing the chapter's story beat with the player's own hands.
- **Easter egg:** program `SAY sandwich` and Boxy renames the player's save
  file to A SANDWICH for one session.
