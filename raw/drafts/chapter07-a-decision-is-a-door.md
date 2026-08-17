# Chapter 7 — "A Decision Is a Door"

**Learning goal:** Logic gates — AND, OR, NOT — as the atoms of machine
decision-making. XOR and NAND as bonus gags that secretly teach too.

**Game piece restored:** ⭐ collision. "Did the cat touch the fish?" =
(overlap in X) AND (overlap in Y). The game's sense of touch is literally an
AND gate — gates stop being abstract forever.

**Core jokes:** the AND-gate ice cream joke ("I don't know / I don't know /
YES!") · the NOT gate is a teenager · "a NAND gate is an AND gate with ATTITUDE."

---

## Story draft

The cafeteria was the newest building on campus, which meant everything in it
was old. "Retro dining experience," the brochure said. What it meant was: the
doors were five hundred years old, salvaged from a Controlled Silicon Era
facility, and they had *opinions* about letting you in.

Flamey and Starlax stood in line behind three delivery-bots and watched the
first door refuse a professor for the third time.

"There's a trick to it," said a voice behind them. They didn't even turn around
anymore.

"Hello, Professor," they said together.

"You're not going to ask why I'm here?" said Prof. Evergreen, sounding almost
disappointed.

"Sixth tally," said Starlax, marking her screenbook. "We've moved past asking.
We're collecting data now."

"The doors," said Prof. Evergreen, gesturing with his lunch card, "are guarded
by the three oldest doorkeepers in the world. Learn their names and you will
never wait in line again. Watch the first one."

The first door had two card slots.

[SLIDE: The AND gate. Two inputs, one output. Both ON → ON. Anything else → OFF.
Cat sitting firmly on the gate in every diagram.]

"The AND door," said Prof. Evergreen. "It opens only if BOTH slots have a valid
card. One card? Stays shut. This is how the ancients made machines *strict*."

As if to demonstrate, the three delivery-bots ahead of them approached the ice
cream counter beyond the door, and the vendor called out: "Do ALL THREE of you
want ice cream?"

The first bot hummed. "I don't know."

The second bot hummed. "I don't know."

The third bot lit up: "YES!"

Starlax blinked. "How did the third one know what the other two wanted?"

"Think about it," said Prof. Evergreen, watching her the way you watch a kettle.

"...The question was do ALL of you want it," Starlax said slowly. "If the first
bot DIDN'T want ice cream, it would know the answer to 'all of you' was no. So
'I don't know' means 'I want it, but I can't speak for the others.' Same for the
second. So when it got to the third bot—"

"—it wanted ice cream, and it knew the other two did," Flamey finished. "So
'all of us' was finally answerable. YES."

"That," said Prof. Evergreen, "is an AND gate with three inputs. You now
understand it better than most of the ancients did."

[SLIDE: The OR gate. Either input ON → ON. The generous door.]

The second door opened for anyone with *any* valid card — student, staff,
delivery, or, apparently, a cat, because Nova strolled through it like she owned
the building.

"OR is generous," said Prof. Evergreen. "AND is picky. Which brings us to the
third doorkeeper. The strangest one." He stopped before the last door, which
was small, dented, and had a sign that said STAFF ONLY. "The NOT gate. One
input, one output. Whatever goes in, the *opposite* comes out. On becomes off.
Off becomes on. Yes becomes no."

"So it's basically a teenager," said Starlax.

"That's not true," said Flamey.

"See?" said Starlax.

Flamey opened his mouth, located the trap, and closed it again. His brain CPU's
teenage mode filed a formal objection.

"The ancients," Prof. Evergreen went on, and there was real reverence in his
voice now, "discovered something with these three doorkeepers. Something
enormous. If you chain them — the output of one into the input of the next —
you can build ANY decision a machine could ever need to make. Any rule. Any
choice. Any *thought.* Three tiny doors, repeated billions of times." He tapped
Flamey's chest plate, gently. "You are mostly doors, young droid."

They ate lunch. The ice cream, all three bots agreed, was excellent.

Halfway through dessert, Flamey froze mid-bite, which for a robot is very
dramatic and slightly alarming.

"The game," he said. "CATVENTURE. It looks perfect now — colors, sprite,
music — but the cat walks straight THROUGH the fish. Nothing happens. It can't
*feel* anything."

"And how would a machine feel a touch?" asked Prof. Evergreen, in the voice of
a man who had been waiting all lunch for this.

Starlax grabbed a napkin and sketched. "The cat is here. The fish is here.
They're touching if... the cat overlaps the fish left-to-right..."

"...AND top-to-bottom," said Flamey. "AND. It's an AND door. Touching IS an
AND door!"

At the next table, a delivery-bot politely began to applaud.

[GAME FORGE: wire the collision circuit — X-overlap and Y-overlap feed an AND
gate; output rings the "mao." COLLISION: RESTORED ✓. The cat can finally catch
the fish. The fish, having been safe for 200 years, files no complaint.]

"One more," said Prof. Evergreen, as they cleared their trays. "A bonus
doorkeeper. Take an AND gate and flip its answer — snap a NOT on its exit. The
ancients called it NAND."

"An AND gate that says the opposite of what it means," said Starlax. "So... an
AND gate with ATTITUDE."

There was a pause.

"Professor," said Flamey carefully, "she once described you as—"

"As science has shown," announced Prof. Evergreen, standing up with great
dignity, "your attention must be depleted. Class dismissed."

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey about logic gates. Short teenage texts.
Flamey: ok doorkeeper quiz. I'll be the door, you guess my gate
Starlax: go
Flamey: input: pizza=yes, movie=no. my answer: YES
Starlax: OR door. generous. lets anything in
Flamey: correct. next: pizza=yes, movie=yes. my answer: NO
Starlax: umm
Starlax: both on but says no??
Starlax: NAND. the attitude door
Flamey: 2 for 2. last one, hard mode
Flamey: pizza=yes movie=no → YES. pizza=yes movie=yes → NO. pizza=no movie=no → NO
Starlax: wait wait
Starlax: it likes ONE thing on but not BOTH and not NEITHER
Starlax: that's the "you can't have everything" door
Flamey: official name is XOR. exclusive or
Starlax: so if we BOTH want the last slice of pizza, XOR door says nobody gets pizza
Flamey: correct and that is why XOR is the fairest and cruelest gate
Starlax: new rule: all decisions about pizza go through the OR door
Flamey: motion passed 🍕
```

---

## Mini-game spec: "The Gate Dungeon"

- **World:** top-down snack-quest. Power flows from batteries through wires to
  doors. Each door is a gate (AND/OR/NOT, later NAND/XOR).
- **Play:** flip wall switches to make each door's inputs satisfy its gate.
  Early rooms = single gates. Later rooms = chained gates (output of one feeds
  another).
- **Boss room (the sneaky part):** the final door needs a circuit that is —
  though the game never says so — a half-adder. The player builds real CPU
  hardware to reach the snack machine. Chapter 13's repair reveals what they
  built (the campus core's score-adder is the same circuit).
- **Fail state is funny:** wrong logic doesn't just block the door — it opens
  the WRONG door, releasing a Roomba full of confetti, Nova, or both.
- **Star ratings:** fewest switch-flips; hidden achievement for solving a room
  using only NAND doors ("The Attitude Award" — real CS: NAND is universal).
