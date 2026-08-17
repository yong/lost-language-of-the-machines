# Chapter 4 — "A Picture Is a Number"

**Learning goal:** An image is a grid of numbers — one color number per pixel.
Resolution. Sprites. (Split from the old Chapter 3, which now ends at RGB;
the Mario pixel-grid puzzle moves here.)

**Game piece restored:** ⭐ the hero sprite. The cat-hero's sprite sheet is
half-erased; the kids repaint it, pixel by pixel, from a printout of raw hex.
Nova poses as the model. Reluctantly.

**Core jokes:** "your hero is 50% off" · "is that a cat or a mailbox?" —
"it's 8×8, it's whatever you believe in" · Nova refuses every pose except loaf.

---

## Story draft

The game was in color now.

That was the problem.

Because with the palette restored — every hex number back in its slot — Flamey
and Starlax could finally see, in crisp and vivid detail, exactly how broken
CATVENTURE still was. The title screen glowed. The music hummed... well, the
music was still silence, but the score counter worked, the text worked, the
colors worked. And in the middle of the screen stood the hero of the game:

The top half of a cat.

Ears. Eyes. A confident little smile. And below the whiskers — nothing. A
ragged edge of missing pixels, as if someone had erased the hero from the
whiskers down.

"Our hero," said Starlax, "is fifty percent off."

They took the cartridge to Prof. Evergreen's office, which they had learned to
find by following the smell of old electronics and disapproval. He plugged it
into a reader and studied the screen for a long moment.

"The sprite sheet is damaged," he said. "A sprite — the ancients' word for a
small picture that moves. Your hero, the fish, the enemy. Each one is stored
right here." He tapped the screen, and the cat-half dissolved into a grid of
tiny squares.

"Pixels," said Starlax. "We know pixels. Every pixel is a color, every color is
a number."

"Then you know everything," said Prof. Evergreen. "A picture IS a grid of
numbers. Nothing more. Sixteen pixels across, sixteen down. Two hundred
fifty-six numbers, in a very particular order. Half of yours are missing." He
produced, from a drawer that seemed to contain the entire Controlled Silicon
Era, a paper printout. Actual paper. Rows and rows of hex numbers — and halfway
down the page, a coffee-colored stain where the rest used to be.

"The original sprite data," he said. "Partially. The rest, you will have to
paint yourselves."

[INTERACTIVE: SpriteGrid — the 16×16 grid, top half filled from the hex
printout as the reader enters values; bottom half blank canvas.]

"Paint with WHAT?" said Flamey. "We don't know what the bottom of this cat
looked like!"

There was a soft thump. Nova, who had been asleep on the windowsill, stood up,
stretched into a shape that physics should not allow, and arranged herself on
Prof. Evergreen's desk in a perfect loaf: paws tucked, tail wrapped, entirely
smug.

"We have a model," said Starlax.

The modeling session did not go smoothly. They needed the cat standing; Nova
loafed. They needed a walking pose; Nova loafed. Starlax held up a fish-shaped
treat and Nova rose two centimeters into a taller, more alert loaf, which
Flamey captured in sixty-four pixels before she subsided again.

"It's fine," said Starlax, coloring in the last squares. "The hero is a loaf.
Loaves are aerodynamic."

Flamey squinted at the finished sprite. At sixteen-by-sixteen, their hero was
a beautiful, unmistakable cat. He zoomed out to how it would look on a real
screen, playing at full speed. "Be honest. Is that a cat or a mailbox?"

"It's eight millimeters tall," said Starlax. "It's whatever you believe in."

Prof. Evergreen loaded their numbers into the cartridge. On screen, the ragged
half-cat flickered — and became whole. Ears, eyes, smile, loaf. The hero of
CATVENTURE stood complete for the first time in two hundred years, wearing a
body designed by committee and modeled by a cat who was already asleep again.

[GAME FORGE: SPRITE: RESTORED ✓ — the reader's own painted sprite is saved and
becomes the hero in every later chapter.]

"It's beautiful," said Flamey, and meant it.

"It is adequate," said Prof. Evergreen, which everyone present understood to
mean the same thing.

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey about pixels and resolution. Short teenage texts.
Flamey: I keep thinking about the sprite
Flamey: 256 numbers and it's... a cat. how is it a cat
Starlax: bc your brain WANTS it to be a cat
Starlax: ok experiment. I'll send you a picture one pixel at a time
Starlax: ⬛
Flamey: that's a pixel
Starlax: ⬛⬛⬛⬛ (row 2)
Flamey: that's four pixels
Starlax: [image: 8x8 grid]
Flamey: mailbox
Starlax: [image: 16x16 grid]
Flamey: cat!! ok when did it become a cat
Starlax: EXACTLY. somewhere between 64 numbers and 256 numbers, a cat happens
Flamey: so a phone camera photo is the same thing but with 12 million numbers
Starlax: yep. more numbers = more cat
Flamey: "more numbers more cat" should be on evergreen's slides
Starlax: it basically already is
Flamey: btw I showed Nova her sprite
Starlax: did she love it
Flamey: she sat on the screen
Starlax: highest possible praise
```

---

## Mini-game spec: "Pixel Forge"

- **Canvas:** the real 16×16 hero sprite, top half pre-filled from "recovered
  data," bottom half empty.
- **Play:** paint by picking colors from the Chapter 3 palette — or hard mode:
  type the hex codes directly. A live preview shows the sprite at actual game
  size, walking.
- **Persistence (the whole point):** the finished sprite is SAVED. It is the
  player's hero for the rest of the book — every later mini-game and every
  "YOUR GAME SO FAR" screen uses it. Every reader's game looks different.
- **Guidance without rails:** a ghostly "suggested" outline (Nova's loaf) can
  be toggled; kids who want a dragon instead of a cat get a dragon. The game
  does not judge. Evergreen might.
- **Easter egg:** filling the entire grid with `CA7F00D`-brown produces a
  toast sprite. The achievement is called "Loaf, Actually."
