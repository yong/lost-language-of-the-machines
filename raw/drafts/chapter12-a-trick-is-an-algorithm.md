# Chapter 12 — "A Trick Is an Algorithm"

**Learning goal:** Algorithms — the same problem has many recipes, and some
are famously, measurably better. Binary search; sorting; a taste of "the
enemy's brain."

**Game piece restored:** ⭐ the enemy's brain + the high-score table. The
robo-vacuum learns to chase (greedy pathfinding — funny because it's
beatable); the high-score table learns to sort itself.

**Core jokes:** "why did the robot start a band? excellent algo-rhythms"
(Flamey starts one; it is not good) · Nova-sort = bogosort · the binary-search
magic trick — "Witchcraft." "Yes. It is called halving things."

---

## Story draft

The Library of Physical Books was technically a museum, which meant Flamey
and Starlax were technically the only visitors, which meant the crash they
heard from three halls away was technically their problem.

They found Prof. Evergreen standing in Aisle 12 amid an avalanche. Every book
of shelf E — two hundred years of carefully alphabetized paper — lay in a
heap on the floor. On top of the heap, in a perfect loaf, entirely unrepentant,
sat Nova.

"Your cat," said Prof. Evergreen, "has invented an algorithm."

"That's a crime scene," said Starlax.

"It is BOTH. Observe: knock everything off the shelf. Whatever remains is
sorted." He gestured at the empty shelf, which was, indeed, in perfect order.
"The ancients had this algorithm too. They called it *bogosort*: shuffle
everything randomly, check if it happens to be in order, repeat. It works.
Eventually. Possibly after the heat death of the universe."

"So it's a bad recipe," said Flamey.

"It is a RECIPE. That is the word of the day. An *algorithm* is a recipe for
solving a problem — and the great secret of the ancients is that the same
problem has MANY recipes, and they are not equal. Watch." He picked up a
single book. "This library holds one thousand books, in order. I am thinking
of one. Find it, asking only 'is it before or after this one?' How many
questions do you need?"

"Worst case? A thousand," said Flamey. "Check every book."

"I will do it in ten."

"That's impossible—"

He did it in nine. Starlax picked *The Wind in the Willows*; Evergreen split
the library in half, then the half in half, then the quarter — each question
destroying five hundred, then two hundred fifty, then a hundred twenty-five
possibilities, cutting and cutting until one book stood alone.

"Witchcraft," said Flamey flatly.

"Yes," said Prof. Evergreen. "It is called *halving things.* The ancients
named it binary search — and there is your old friend binary again, hiding in
a library. Ten halvings covers a thousand books. Twenty covers a MILLION.
This is what a good recipe buys you: the difference between a thousand steps
and ten."

They spent the afternoon re-shelving Aisle E three different ways, timing
each: Flamey's insertion method, Starlax's pile-merging method (which
Evergreen, looking genuinely startled, informed her was merge sort, and had
made the ancients weep with its beauty), and, as scientific control, one more
round of Nova-sort. Nova-sort came last. Nova was not informed of her defeat.

Which left the game.

"CATVENTURE needs two things," said Starlax, ticking them off. "The
high-score table doesn't sort — every score just piles up in the order they
happened. That's easy now, we have recipes. But the vacuum..." She pulled up
the enemy on screen: the little robo-vacuum, the game's villain, currently
drifting in a mindless straight line, bonking gently off the walls. "The
vacuum is supposed to CHASE the cat. It has no brain. What's the recipe for
chasing?"

They wrote the simplest one on the board:

```
FOREVER:
  IF cat is left of me:  MOVE left
  IF cat is right of me: MOVE right
  IF cat is above me:    MOVE up
  IF cat is below me:    MOVE down
```

"That's it?" said Flamey. "Four IFs? That's a BRAIN?"

"Load it," said Prof. Evergreen.

They loaded it. On screen, the vacuum twitched — turned — and came for the
cat like a small square destiny. Starlax yelped and grabbed the controller,
and for two glorious minutes the lab was nothing but shrieking, mao sounds,
and the pounding of a heartbeat loop sixty times a second.

Then she discovered the flaw. She ran the cat behind a wall. The vacuum,
greedy and simple, drove itself straight into the wall, and stayed there,
grinding pathetically toward a cat it could see and never reach.

"It's dumb," said Flamey, delighted.

"It is *greedy,*" said Prof. Evergreen. "It takes the best step RIGHT NOW and
never thinks further. Good enough to be scary. Flawed enough to be beaten.
And that, children, is the entire secret of villains in games: a good enemy
is a bad algorithm." He gathered his coat. "The ancients had smarter chase
recipes. Someday, look up A-star. Not today. As science has shown—"

"—attention depleted," the kids chorused.

[GAME FORGE: ENEMY BRAIN: RESTORED ✓ (GREEDY) · HIGH SCORES: SORTING ✓ —
CATVENTURE is, for the first time, a complete game: playable, losable,
winnable.]

On the way out, Flamey announced he was starting a band, "because I have
excellent algo-rhythms," and Starlax walked into a bookshelf on purpose. The
band — THE POLYNOMIAL TIMES, vetoed; O(NO), vetoed; SORT OF FAMOUS, vetoed
harder — never played a show. The name deliberations continue to this day.

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey about algorithms. Short teenage texts.
Flamey: settle a debate. best sock sorting algorithm
Flamey: I pair each sock as it comes out of the dryer. one at a time
Starlax: dump ALL socks on bed. grab any sock. hunt its twin. repeat
Flamey: that's O(n²) sock time and you know it
Starlax: it's COZY
Flamey: mine is provably faster
Starlax: mine comes with hot chocolate. optimize THAT
Flamey: ok new topic. guess my number 1 to 100. I'll count your guesses
Starlax: 50
Flamey: lower
Starlax: 25
Flamey: higher
Starlax: 37... 43... 40... 42
Flamey: SIX GUESSES?? how
Starlax: I halve things 😌 evergreen taught us witchcraft, I USE the witchcraft
Flamey: I've created a monster
Starlax: btw Nova sorted your band's demo tracks
Flamey: we don't have demo tracks
Starlax: correct. she deleted them. whatever remains is sorted
Flamey: NOVA-SORT IS NOT A REAL ALGORITHM
Starlax: results speak for themselves 🐱
```

---

## Mini-game spec: "Sort-Off" (+ "Vacuum Brain" bonus stage)

- **Main event — the sorting dance battle:** a row of mixed-up items (books,
  scores, cat toys) on a stage with a beat. The player sorts by dragging,
  building an implicit strategy; the machine sorts beside them with a named
  recipe (bubble, insertion, merge — animated as dance moves, because
  algo-RHYTHM). Race, side by side, step counters ticking like a rap battle
  scoreboard.
- **Progression:** beat bubble sort (easy — everyone beats bubble sort; that's
  the lesson), lose to merge sort (also the lesson), then UNLOCK merge sort
  as your own dance style and re-match. Bogosort is a playable joke
  character: it shuffles wildly to the beat; the crowd (of cats) goes mild.
- **Bonus stage — Vacuum Brain:** the player assembles the four-IF greedy
  chase from Chapter 10-style rule pieces and then PLAYS AS THE CAT against
  their own creation. Beating your own villain by exploiting the wall flaw is
  the final exam of the whole Part II — and it goes straight into the real
  game as the enemy AI.
- **Scoring:** steps taken, not time — speed of thought, not thumbs.
- **Easter egg:** picking bogosort against a 4-item list occasionally wins
  instantly. The achievement is called "Eventually Means Sometimes."
