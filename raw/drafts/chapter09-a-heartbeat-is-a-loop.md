# Chapter 9 — "A Heartbeat Is a Loop"

**Learning goal:** Loops — repeat N times, repeat-while, and infinite loops.
Then the twist: the game loop, the one infinite loop that SHOULD never end.

**Game piece restored:** ⭐ THE GAME LOOP. Check buttons → move world → draw
screen → repeat forever. The game gets a heartbeat.

**Core jokes:** the shampoo incident ("the bottle never said when to stop") ·
Nova's tail = `while (not dizzy)` · Evergreen's dictionary: "Recursion — see:
Recursion."

---

## Story draft

Boxy was missing.

They found him — four hours after anyone had last seen him — in the lab's
equipment shower, surrounded by seventeen empty bottles, methodically working
a soap dispenser that had long since given up. Water everywhere. Suds to the
ceiling. Boxy's face: a very tired `:|`.

On the floor lay the ancient shampoo bottle that had started it all. Starlax
picked it up and read the label aloud.

"Lather. Rinse." She paused. "*Repeat.*"

"The bottle never said when to stop," said Prof. Evergreen, arriving with a
towel and no visible surprise. "So Boxy did not stop. He would have washed his
hair until the sun burned out." He considered. "Boxy does not have hair. This
did not deter him. That is rather the point."

[SLIDE: THE LOOP. "Do a thing. Again. Again. Again..." — a cat batting a ball
of yarn in a perfect circle, forever. Caption: WITHOUT AN EXIT, FOREVER IS THE
DEFAULT.]

"A loop," he continued, as Boxy drip-dried, "is the machine's mightiest trick
and deadliest trap. You felt the might last week — MOVE MOVE MOVE MOVE, eight
times, your hands hurt. `REPEAT 8: MOVE` — one line. The machine never gets
bored, never gets tired, never wonders if this is a good use of its life."

"And the trap is the shampoo," said Flamey.

"The trap is the shampoo. A loop must know when to stop. REPEAT a NUMBER of
times. Or repeat WHILE something is true." He pointed out the window, where
Nova was chasing her tail on the lawn in tight, professional circles.

"Infinite loop," said Flamey.

"Incorrect," said Starlax. "Watch." Nova wobbled, sat down abruptly, and
stared at the horizon with dignity. "She exits when she's dizzy. That's a
while-loop. `WHILE not dizzy: chase tail.`"

"Your cat," said Prof. Evergreen, "is better documented than most ancient
software." He almost smiled, then remembered himself. "One more danger. Look
up 'recursion' in the ancient dictionary. Page 344."

Flamey found page 344. "*Recursion,*" he read. "*See: Recursion.*"

He looked at page 344 again. He looked up. He looked down. He turned to page
344, which he was already on. A full minute passed.

"Oh," said Flamey. "OH."

"He gets there," said Starlax fondly.

That afternoon they returned to the real problem: their hero, who still walked
off the edge of the world every time someone pressed a button, and their game,
which sat frozen between button-presses like a photograph. Something was
missing — something that made a game a *game* instead of a picture that
occasionally twitched.

Prof. Evergreen wrote three lines on the board. Just three.

```
FOREVER:
  read the buttons
  move the world
  draw the screen
```

"But that's—" Flamey stopped. "That's an infinite loop. You JUST spent all
morning teaching us infinite loops are the trap. The shampoo. The sun burning
out. Boxy in the SHOWER."

"Yes," said Prof. Evergreen, and now he did smile, and it was the smile of a
man handing over the keys to something. "And here is the secret the ancients
knew: every game that ever mattered — every world your ancestors got lost in —
was an infinite loop *on purpose.* Read the buttons. Move the world. Draw the
screen. Again. Again. Sixty times a second, forever, until someone pulls the
plug. It is not a trap if you build it a heart." He tapped the board. "This
loop IS the game. Everything else is furniture."

They typed it in — three lines in the lost language — and pressed RUN.

The screen came alive. Not a picture: a *place.* The cat-loaf stood breathing
at the center (two frames, alternating — a loop), the fish shimmered (a loop),
and when Starlax pressed right, the hero walked, and when she let go, it
stopped, because the loop checked the buttons sixty times a second and sixty
times a second found nothing pressed.

[GAME FORGE: GAME LOOP: RUNNING ♥ — a tiny heartbeat monitor appears on the
cartridge status screen and never turns off again for the rest of the book.]

Nobody said anything for a while. There was nothing to say. The game had a
heartbeat, and everyone in the room could hear it.

"As science has shown—" began Prof. Evergreen, quietly.

"Attention depleted," said both kids together, not looking away from the screen.

He left them there, playing.

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey about loops. Short teenage texts.
Flamey: I can't stop thinking about the three lines
Flamey: everything is loops now. I see them everywhere
Starlax: like what
Flamey: your heart. beats until exit. that's a forever loop
Starlax: mildly disturbing but continue
Flamey: school year. REPEAT 180: wake up, class, homework, sleep
Starlax: with a break statement called summer
Flamey: 😂 exactly
Flamey: brushing teeth: REPEAT 30 per tooth region
Starlax: nobody does 30 per region
Flamey: I do. I count.
Starlax: of course u do
Starlax: ok here's one. Nova at 6am: WHILE food bowl empty: scream
Flamey: that loop has no mercy and no timeout
Starlax: it exits when I get up. I'm the exit condition
Flamey: you're not the exit condition, you're INSIDE her loop
Starlax: ...
Starlax: I'm inside the cat's loop
Flamey: we all are
Starlax: this is the deepest thing you've ever said and it's about cat breakfast
```

---

## Mini-game spec: "Loop Golf"

- **Setup:** Chapter 8's warehouse, but huge — 40-step corridors, spiral paths,
  crate stacks. Boxy's five instructions plus two new blocks: `REPEAT n:` and
  `WHILE <condition>:`.
- **Scoring is golf:** every instruction written costs a stroke; par is
  impossible without loops. A 40-step corridor is 40 strokes by hand or 2 with
  a loop — the point makes itself.
- **The trap level:** one level's obvious loop has no exit; Boxy marches into
  the wall forever, suds rising slowly in the background (shampoo callback)
  until the player adds the condition. Failure is the funniest 10 seconds in
  the game.
- **Finale:** the last hole IS the game loop — the player assembles
  read-buttons / move-world / draw-screen in order inside a FOREVER block,
  and their actual game (their sprite, their sounds) starts running live as
  the reward screen.
- **Easter egg:** name a loop variable `nova` and it occasionally exits early,
  dizzy.
