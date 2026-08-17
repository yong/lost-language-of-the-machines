# Open-World Campus — Design Doc

> The book's home is no longer a redirect to Chapter 1. It is a WORLD: the
> academy campus at dusk, drawn as one living scene. Chapters are buildings.
> Reading the book = exploring the campus. Restoring the game = watching the
> world light up.

## Why open world fits this book

1. **The story already IS a campus.** Every chapter happens in a building we
   named: History Hall, Literature Hall, Art Studio, Music Hall, the Vault,
   the Cafeteria, the Robotics Lab, the Library, the Core. The map is not
   decoration — it's the table of contents wearing a costume.
2. **Open world = kid agency.** Kids don't read forewords; they poke things.
   Buildings they can enter glow. Buildings still being written stand behind
   "UNDER RESTORATION 🚧" tape — which is diegetic: the campus is literally
   being restored as the book is written. The roadmap is part of the fiction.
3. **Progress lives in the world.** The reader's painted sprite (Chapter 4's
   Game Forge) appears in the HUD cartridge. As more Forge pieces are
   restored, more chips light up. Long-term: the world itself reacts (see
   roadmap).

## The scene (v1, shipped)

One SVG, 1200×800, dusk palette (deep indigo sky → warm windows):

- **Sky:** deterministic starfield, full moon, two flying vehicles drifting
  by on loops (the Ch1 opening line, visualized).
- **Campus:** layered lawns and a winding path connecting the buildings.
- **Nova** walks the front path on an endless loop. She cannot be caught.
  That's canon.
- **The Core:** a faint pulsing glow in the lawn, unlabeled except "???".
  Readers who finish Chapter 13 will know. New readers will wonder. Both
  correct.

### Locations → chapters

| Building | Chapter | Status |
|---|---|---|
| Museum (arcade cabinet inside) | Ch0 Hello World! | open |
| History Hall (binary clock tower) | Ch1 A Number Is a Switch | open |
| Literature Hall (blue steps) | Ch2 A Letter Is a Number | open |
| Art Studio (paint-splash skylight) | Ch3 A Color Is a Number | open |
| Prof. Evergreen's Office (cat in window) | Ch4 A Picture Is a Number | open |
| Music Hall | Ch5 A Sound Is a Number | 🚧 |
| Storage Vault (hatch in the lawn) | Ch6 A Memory Is a Shelf | 🚧 |
| Cafeteria (the three doors) | Ch7 A Decision Is a Door | 🚧 |
| Robotics Lab (Boxy parked outside) | Ch8 A Machine Obeys | 🚧 |
| Library of Physical Books | Ch12 A Trick Is an Algorithm | 🚧 |
| ??? (glow in the ground) | Ch13 | hidden |

Interaction: open buildings glow warm and scale up on hover/tap → navigate.
Taped buildings are dimmed, wiggle on tap, and tease their chapter name.

### HUD

Bottom bar, styled as the CATVENTURE cartridge status:
`CARTRIDGE // SCORE ✓ TEXT ✓ COLOR ✓ SPRITE [reader's actual sprite] SOUND …`
— chips light as chapters ship; the sprite chip renders the reader's own
16×16 painting from localStorage (`gameforge.sprite.v1`).

## Roadmap (v2+)

- **Walkable hero:** arrow-keys/tap-to-walk the reader's own sprite around
  the map; entering a door loads the chapter. (The map becomes the first
  screen of the game the book builds — the loop closes completely.)
- **World reacts to progress:** finish Ch3 → the campus gains color; finish
  Ch5 → ambient music; finish Ch13 → dawn breaks over the campus, every
  window lights, helper-bots wave.
- **Hex-word treasure hunt:** the per-chapter hidden hex words (`CA7F00D`…)
  are collectible on the map; collecting all unlocks the cheat code.
- **Nova interactions:** tapping Nova N times triggers loaf. Statistically,
  she was due.
- **Day/night by real clock**, snow in December (snow system already exists).
