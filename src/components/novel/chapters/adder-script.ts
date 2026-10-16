// The chat script for "Two Doors Can Add" (/lab/adder).
//
// One sentence: a machine cannot count, but two doors can add — XOR writes the
// digit and AND carries the one, and the carries ripple like dominoes.
//
// The thing every kid already owns is CARRYING THE ONE from school sums. The
// want is Starlax's question — who is doing the adding in there? — and the win
// is the score counting because of doors she understands.
//
// THE DOORS ARE REAL CHIPS. The first telling had Starlax take the back off
// and see "thousands of tiny doors", which the author rightly called fake:
// gates are far too small to see. What IS true: the first arcade games had no
// program at all, only boards of small chips, each holding a few gates, each
// with its number printed on top. So she photographs the board, circles the
// chip under the score (7483, a 4-bit adder), and Flamey sends back the data
// sheet of the one beside it (7408, four AND gates). The doors are real, and
// the toys open the chips up. Real parts, real numbers, real pin layout.
//
// TEENAGERS SEND PHOTOS, they do not describe things. Both of those are
// pictures in the chat (kind: 'pic'), tappable full screen.
//
// Short on purpose (CLAUDE.md): three ideas, one joke each. AND gets Santa
// (the cover is his Naughty-or-Nice Machine), XOR gets the pizza, the adder gets "you just had a pencil", and the
// true story (the domino computer) closes it.
import type { Beat } from '@/components/novel/chapter-def';

export const ADDER_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'flamey. how does CATVENTURE add 🐟' },
  { kind: 'msg', who: 'starlax', text: 'the cat eats a fish and the score goes up one. something in there is doing sums', rush: true },
  { kind: 'msg', who: 'flamey', text: 'the program, obviously 🤖' },
  { kind: 'msg', who: 'starlax', text: 'there is no program. I took the back off' },
  { kind: 'pic', who: 'starlax', src: '/adder/board.svg', ratio: 4 / 3,
    alt: 'Starlax’s photo of the inside of the cabinet: a green circuit board with rows of black chips; a box printed SCORE round three of them, and her red marker circle round the one stamped SN7483N' },
  { kind: 'msg', who: 'starlax', text: 'no computer. no code. just little black chips with numbers on 🤷' },
  { kind: 'msg', who: 'flamey', text: '...', typing: true },
  { kind: 'msg', who: 'flamey', text: '7483 is a 4-bit adder. it adds. that is all it does.' },
  { kind: 'msg', who: 'flamey', text: 'the first arcade games had no program at all. just boards of chips like that.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'ok but what is INSIDE a chip' },
  { kind: 'msg', who: 'flamey', text: 'doors. here is the one next to it.' },
  { kind: 'pic', who: 'flamey', src: '/adder/datasheet-7408.svg', ratio: 600 / 740,
    alt: 'Flamey’s picture: the data sheet for the SN7408, quadruple 2-input AND gates — a 14-pin chip drawn from the top with four AND gate symbols inside, each wired to its pins' },
  { kind: 'msg', who: 'flamey', text: 'four tiny AND doors in one chip. far too small to see without a microscope.' },
  { kind: 'msg', who: 'starlax', text: 'let me try one 👀' },

  { kind: 'toy', toy: 'and', label: 'one door from the 7408' },

  { kind: 'msg', who: 'starlax', text: 'one marble: stuck. two marbles: OPEN 🔔', typing: true },
  { kind: 'msg', who: 'flamey', text: 'both, or nothing. that door is called AND' },
  { kind: 'msg', who: 'starlax', text: 'so santa’s naughty-or-nice machine is an AND door. one bad day and it’s coal 😤' },
  { kind: 'msg', who: 'flamey', text: 'he should use an OR door' },
  { kind: 'msg', who: 'starlax', text: 'then everyone is nice' },
  { kind: 'msg', who: 'flamey', text: '...that is the point of christmas 🎄', rush: true },
  { kind: 'msg', who: 'starlax', text: 'the chip on the other side says 7486' },

  { kind: 'toy', toy: 'xor', label: 'one door from the 7486' },

  { kind: 'msg', who: 'starlax', text: 'one marble goes through. two marbles and it SHUTS 😤', typing: true },
  { kind: 'msg', who: 'flamey', text: 'one or the other, not both. XOR' },
  { kind: 'msg', who: 'flamey', text: 'the "you BOTH want the last slice? then nobody gets pizza" door 🍕', rush: true },
  { kind: 'msg', who: 'starlax', text: 'ok but one door says BOTH and one says JUST ONE. how is that adding' },
  { kind: 'msg', who: 'flamey', text: 'what is 1 + 1' },
  { kind: 'msg', who: 'starlax', text: '2. in switches that is 10. one, zero.' },
  { kind: 'msg', who: 'flamey', text: 'the score is 1. feed the cat one fish and watch both doors.' },

  { kind: 'beat' },

  { kind: 'toy', toy: 'add', label: 'the 7483 — two doors in every column' },

  { kind: 'msg', who: 'starlax', text: 'XOR shut, so it wrote 0. AND opened, so a marble rolled over. 10!!', typing: true },
  { kind: 'msg', who: 'starlax', text: 'it CARRIED THE ONE 🤯', rush: true },
  { kind: 'msg', who: 'flamey', text: 'you have done that since second grade. you just had a pencil ✏️' },
  { kind: 'msg', who: 'flamey', text: 'XOR writes the digit. AND carries the one. the 7483 is four columns like that, side by side.' },
  { kind: 'msg', who: 'starlax', text: 'and bigger numbers?' },
  { kind: 'msg', who: 'flamey', text: 'the carry rolls into the next column. keep feeding the cat.' },

  { kind: 'toy', toy: 'ripple', label: 'feed the cat until the score says 1000' },

  { kind: 'msg', who: 'starlax', text: '0111 and ONE more fish and they ALL went 😱', typing: true },
  { kind: 'msg', who: 'starlax', text: 'click click click click. like dominoes', rush: true },
  { kind: 'msg', who: 'flamey', text: 'each carry knocks over the next column. a chain reaction.' },
  { kind: 'msg', who: 'flamey', text: 'true story. in 1937 a man built an adder like this on his kitchen table' },
  { kind: 'msg', who: 'flamey', text: 'two telephone switches, two torch bulbs, and strips cut from a tobacco tin', rush: true },
  { kind: 'msg', who: 'starlax', text: 'did it work?' },
  { kind: 'msg', who: 'flamey', text: '1 + 1 lit one bulb and not the other. 10. he called it the Model K.' },
  { kind: 'msg', who: 'starlax', text: 'K?' },
  { kind: 'msg', who: 'flamey', text: 'for kitchen 🍳', rush: true },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'so the game is not clever. it is just doors' },
  { kind: 'msg', who: 'flamey', text: 'very fast doors.' },
  { kind: 'msg', who: 'starlax', text: 'you are mostly doors flamey' },
  { kind: 'msg', who: 'flamey', text: '...doors that can count 🤖' },
  { kind: 'msg', who: 'starlax', text: 'nova wants to know why the cat in the game gets all the fish' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
