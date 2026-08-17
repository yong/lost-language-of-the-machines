# Chapter 5 — "A Sound Is a Number"

**Learning goal:** Sound is a wave; a wave can be measured at regular moments
(sampling); measurements are numbers — so music is numbers too. Completes the
"everything is numbers" arc.

**Game piece restored:** ⭐ the theme song + the "collect fish" blip. The
game's sound bank is simply *gone* (why it's gone is next chapter's mystery);
the kids re-sample replacements — including Nova's actual meow as the
collect-fish sound.

**Core jokes:** heavy metal · "turn it up to 11" → "that's 3" · Nova's 44,100
numbers per second, all meaning "feed me."

---

## Story draft

The Music Hall was the oldest building on campus, which meant it was only two
hundred years old and had real doors that you had to push with your hands. Flamey
liked it immediately.

"Same class again?" said a familiar voice. Starlax landed beside him, her jetpack
sighing as it powered down. "Music History. I heard the teacher is amazing."

"I heard the teacher is out with the hybrid virus," Flamey said.

They looked at each other.

"No," said Starlax.

"It can't be," said Flamey.

They pushed open the doors. Behind the conductor's podium, arranging his notes
with terrible patience, stood Prof. Evergreen.

Starlax pulled out her screenbook and drew a small tally mark next to three others.
"Four," she whispered. "That's four classes in a row. This is officially a
phenomenon."

"Ah, my 10 favorite students," said Prof. Evergreen, without looking up. "Today
we study the music of the Controlled Silicon Era. Or we would, if this thing
worked." He gestured at the machine beside him: a huge, dusty slab of keys and
sliders and blinking lights, like a piano that had swallowed a spaceship.

"What is it?" asked Starlax.

"A synthesizer. Five hundred years old. It made music out of electricity." He
pressed a key. The machine made a sound like a whale apologizing. "Out of
*numbers*, to be precise."

"Numbers?" Flamey said. "Music isn't numbers. Music is..." he searched his
knowledge unit for the right word, "...vibes."

"Vibes," Prof. Evergreen repeated, in the exact tone of a man filing a complaint
with the universe. "Let me show you what a 'vibe' looks like." He snapped his
fingers and a hologram appeared in the air: a smooth, rolling wave, wiggling as
he spoke, jumping when Starlax laughed.

"Sound is a wave in the air," he said. "Your ears surf it. So do Flamey's
microphones. Now — a wave is smooth, and computers, as you know by now, only
speak in numbers. So how do you turn a smooth wave into numbers?"

[INTERACTIVE: WaveSampler — a sine wave; a slider adds measurement dots at
regular intervals; another slider controls how many. Low = blocky staircase,
high = nearly smooth.]

"You *measure* it," said Starlax slowly, dragging the slider. "Again and again.
Really fast. Then the list of measurements IS the sound."

"Sampling," nodded Prof. Evergreen. "The ancients measured sound 44,100 times
every second. High enough that human ears can't tell the difference."

Flamey stared at the wave. Then at Nova, who had smuggled herself into Starlax's
bag again and was now purring in a patch of sunlight.

"Wait," Flamey said. "So right now, Nova's purr is..."

"44,100 numbers every second," Prof. Evergreen confirmed. "And every single one
of them means 'feed me.'"

They got the synthesizer working an hour later — the problem was a loose wire,
which Flamey found and Prof. Evergreen took credit for. Starlax immediately
claimed the keyboard.

"What should we play?" she asked.

"Something loud," said Flamey. "What's my favorite kind of music?"

"I don't know, what?"

Flamey looked at her with disappointment. "Starlax. I am a *robot.* Heavy metal.
Obviously."

Starlax found the volume slider and shoved it up. "TURN IT UP TO 11!"

Flamey glanced at the display, where the volume glowed: `1011`. "That's eleven
in decimal," he said. "You've turned it up to eleven-in-binary, which is three."

"Then turn it up to eleven-in-eleven!"

"That's not—" Flamey began, but the first chord came out of the ancient speakers
and shook two hundred years of dust off the ceiling, and for a while, nobody
argued about number systems at all.

Prof. Evergreen watched from the podium, and if the dust and the noise bothered
him, he hid it well.

"Professor," Starlax said suddenly, hands still on the keys, "the game. CATVENTURE.
It's still silent — the whole sound bank is empty. But if a sound is just a list
of numbers..."

"...then you can make new ones," Prof. Evergreen finished, and for once he
almost smiled. "The synthesizer has a sampling port. You will need a theme song.
And a sound for collecting fish."

They recorded the theme that afternoon — heavy metal, at Flamey's insistence,
volume eleven-in-binary, at Starlax's. For the fish sound, they held the
microphone up to Nova, who looked at it, looked at them, and produced a single,
perfect, extremely judgmental *"mao."*

44,100 numbers per second. Every one of them exactly right.

[GAME FORGE: the cartridge status screen — SOUND: RESTORED ✓. The title screen
now plays the kids' theme; collecting a fish goes "mao."]

"As science has shown," Prof. Evergreen announced finally, packing his notes,
"your attention must be depleted. And my hearing certainly is."

---

## Chat scene draft

```
system: Act as Starlax, texting with Flamey about sound and sampling. Short teenage texts.
Flamey: I sampled my own singing
Flamey: [voice memo 🔊]
Starlax: ...
Starlax: flamey
Starlax: what did I just listen to
Flamey: technically perfect pitch. every note is mathematically exact
Starlax: it's TERRIFYING. it sounds like a haunted calculator
Flamey: rude. anyway look what happens when I lower the sample rate
Flamey: [voice memo 🔊] 44,100/sec
Flamey: [voice memo 🔊] 8,000/sec
Flamey: [voice memo 🔊] 800/sec
Starlax: the last one sounds like you're singing underwater. in a bucket. of gravel
Flamey: that's what losing numbers sounds like! fewer measurements = crunchier wave
Starlax: so old phones sounded bad bc they used fewer samples to save space?
Flamey: exactly. 8000/sec. enough for words, terrible for music
Starlax: wait so when Nova purrs at my face at 6am
Starlax: that's 44 thousand numbers a second
Flamey: yes. all of them mean feed me
Starlax: checks out. she also sends the same message at 6:01
Flamey: that's called a retry loop. we'll get there
```

---

## Mini-game spec: "The Bit Crusher"

- **Screen:** a short familiar melody plays; its waveform scrolls by.
- **Control:** one big slider — the sample rate (44,100 down to 100).
- **Goal 1 (play):** slide down and *hear* the song fall apart into crunch.
- **Goal 2 (challenge):** find the LOWEST rate where a friend (or the game's
  helper-bot) can still name the tune. Score = bytes saved.
- **Teachable accident:** kids discover the tradeoff at the heart of all media —
  quality vs. size — without either word appearing on screen.
- **Easter egg:** crush Nova's purr low enough and it becomes a Game-Boy-style
  chiptune meow. Nova, in the corner of the screen, approves.
