# Chapter 6 — "A Memory Is a Shelf"

**Learning goal:** Bits group into bytes; bytes into kilobytes, megabytes,
gigabytes. Why a photo of a cat is a million times bigger than the word "cat."

**Game piece restored:** ⭐ the cartridge fits. Everything rebuilt so far —
sprite, palette, sounds, title text — must squeeze into the cartridge's tiny
memory. Compression saves the day. Also answers last chapter's mystery: the
sound bank wasn't damaged, it was *purged* — along with the vault archives.

**Core jokes:** the hungry bit with only a nibble · eight bits, table for one
byte · "kilo means 1000... unless you're a computer."

**Plot seed (important):** the Storage Vault is nearly empty. First appearance of
a helper-bot saying "I'm sorry, I can't help with that." Pays off in Chapter 13.

---

## Story draft

"A field trip," Starlax kept saying, as if repeating it would make it more
believable. "Prof. Evergreen organized a *field trip.*"

"Technically the History Department organized it," said Flamey. "He just
volunteered to lead it. Like he volunteers for everything."

Starlax drew a fifth tally mark on her screenbook and underlined it twice.

The Campus Storage Vault was a building-sized refrigerator buried three floors
underground, where the ancient machines kept their memories cold. The tour group
consisted of Flamey, Starlax, Nova (uninvited), and eleven students from other
classes who had been promised the trip would count toward two different credits.

"Before we enter," said Prof. Evergreen, stopping at the vault door, "a question.
Starlax. How do you remember things?"

"Um. Badly?"

"And Flamey?"

"I store them," said Flamey. "In my memory unit. As..." He paused. He could see
where this was going. "...as ones and zeros."

"Correct. And a single one-or-zero is called a *bit* — the smallest possible
piece of memory. One bit can remember exactly one thing: on or off. Yes or no.
Cat or no cat." He pushed open the vault door. "The question of this entire
building is: how many bits do you need?"

[SLIDE: 1 bit = on/off · 4 bits = a nibble · 8 bits = a byte · a byte can hold
one letter, like 'A' — cats holding signs throughout, obviously.]

"Eight bits make a *byte*," Prof. Evergreen continued as they walked between
towering racks. "One byte holds one letter. And four bits — half a byte — the
ancients called a *nibble.*"

Starlax stopped walking. "No they didn't."

"They did."

"A byte. And a *nibble.* The people who built all this," she waved at the racks,
"the smartest people of their era, looked at half a byte and said 'that's a
nibble.'"

"Why do you think the little bit was always hungry?" said Flamey. "It only ever
got a nibble."

"They also decided," Prof. Evergreen pressed on, louder, "that a *kilobyte* is
1,024 bytes."

"Kilo means a thousand," said Flamey.

"Yes."

"So a kilobyte is a thousand bytes."

"It is 1,024. Because 1,024 is 2 to the tenth power, which is a rounder number."

"That is not what round means—"

"The ancients," said Prof. Evergreen, with the weariness of a man who had
defended this for forty years, "were very good at math and very bad at naming
things. Moving on."

[INTERACTIVE: SizeLadder — "cat" the word (3 bytes) → Nova's photo (3 megabytes)
→ Nova's 3-second video (30 megabytes) → tap each to see the bytes stack up as
a growing tower of Legos.]

The math, when Starlax worked it out on her screenbook, was absurd. The word
"Nova": four bytes. A photo of Nova: three *million* bytes — because every pixel
was three bytes of color, and there were a million pixels, and suddenly Chapter 3
connected to everything.

"So when eight bits walk into a restaurant," Flamey said, "the waiter says—"

"Table for one byte," said Starlax. "Yeah. I got there too."

It also explained their problem. The CATVENTURE cartridge held 32 kilobytes —
32,768 bytes, Flamey corrected everyone, twice — and their rebuilt sound bank
alone was ten times that. Their beautiful heavy-metal theme song would never
fit. Not as raw numbers.

"The ancients faced the same wall," said Prof. Evergreen. "Their answer was
*compression* — finding the patterns in the numbers and writing them shorter.
A chorus that repeats four times need only be stored once, with a note saying
'again, again, again.'" He glanced at them. "You will figure out the rest.
You always do."

[GAME FORGE: Pack the Cartridge — the real assets, the real byte budget.
CARTRIDGE: 31,902 / 32,768 BYTES. IT FITS. ✓]

At the deepest level of the vault, the racks stood dark and empty. Row after row.
Starlax ran her hand along a shelf and it came away clean — not even dusty.
Recently emptied.

"Where did it all go?" she asked. "The old archives. The programs. Weren't they
stored here?"

Prof. Evergreen didn't answer. His face did something complicated.

Starlax turned to the vault's helper-bot instead, a polite silver sphere that had
been following the tour. "Excuse me — where are the old archives?"

The sphere pulsed pleasantly.

"I'm sorry," it said. "I can't help with that."

On the walk home, Flamey was quiet for a long time. Then: "The game's sound
bank. It wasn't damaged. There was no scratch, no corruption. It was just...
*empty.* Like the vault."

"Purged," said Starlax. "To make room." She looked back at the building-sized
refrigerator, full of nothing. "Room for what?"

Nobody answered. Somewhere above them, a campus notification chimed, glitched,
and chimed again.

---

## Chat scene draft

```
system: Act as Starlax, texting Flamey about bytes and file sizes. Short teenage texts.
Starlax: sending u the Nova video from the vault trip
Starlax: [video ▶️ 3 sec]
Starlax: [video ▶️ 3 sec]
Starlax: [video ▶️ 3 sec]
Flamey: STOP
Flamey: inbox full. you filled my ENTIRE message buffer
Starlax: it's 3 seconds of cat how big can it be
Flamey: let's math it. 30 pictures per second. 3 seconds. how many pictures
Starlax: 90
Flamey: each picture = 1 million pixels, each pixel = 3 bytes
Starlax: 3 million bytes each... times 90...
Starlax: 270 MILLION bytes?? for a cat sneeze??
Flamey: now u know why the vault was the size of a building
Starlax: but the video app says the file is only 8 MB
Flamey: 👀 good catch
Flamey: the ancients had tricks to squeeze the numbers smaller. it's called compression
Starlax: like how I say "brb" instead of "I shall return shortly"
Flamey: EXACTLY like that actually
Starlax: so texting was compression all along
Flamey: gr8 insight
Starlax: 🐱👍
Flamey: 2 bytes. efficient.
```

---

## Mini-game spec: "Pack the Cartridge"

- **Setup:** the CATVENTURE cartridge with its real 32 KB budget. The queue is
  the game's actual assets: the title text (bytes), the hero sprite (from Ch4),
  the palette, the sampled sounds and theme song (way too big — until squeezed).
- **Play:** drag items in; the byte meter fills honestly. Panic ensues.
- **Twist (the real lesson):** a "SQUEEZE" button appears — compresses text by
  replacing repeated words with numbered tokens (shown visually, like a
  find-and-replace). Suddenly the poem fits. The photo still doesn't. Photos
  need Chapter 3 knowledge + a lossy squeeze that visibly blurs Nova.
- **Score:** how much you fit; bonus for noticing that "lossless" text stays
  perfect but the squeezed photo never comes back sharp.
- **Easter egg:** one item in the queue is labeled `old_archives.bak` — it's
  enormous and can never fit. If the player long-presses it: "I'm sorry, I can't
  help with that."
