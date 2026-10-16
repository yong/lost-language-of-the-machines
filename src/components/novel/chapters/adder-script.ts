// The chat script for "Two Doors Can Add" (/lab/adder).
//
// One sentence: Starlax's score can't count past 1, because its carry door has
// burnt out — and the only spare is inside Santa's Naughty-or-Nice Machine.
//
// WHY IT IS TOLD THIS WAY. The telling before this one was accurate and dry:
// nothing was broken, nobody wanted anything, Flamey read out chip numbers and
// data sheets, and the toys were marbles in chutes. The author: "extremely
// boring and dry". So now there is a WANT (her score), a FUNNY FAILURE the
// reader plays before anyone explains it (1, 0, 1, 0 — "I have eaten all
// these fish and I have ONE point"), a HEIST (the only spare chip is in the
// museum's old Santa machine — which the reader plays with first), a WIN (the
// carries ripple and the score climbs) and a PAYOFF that ties back to the
// cover (without its AND door the machine says NICE to everybody — even
// Nova). One true fact carries it: an empty input on these old chips reads as
// a 1, so with the chip gone every check passes.
//
// The lesson is unchanged: XOR writes the digit, AND carries the one. The
// broken score proves it by subtraction — XOR alone gives 1, 0, 1, 0.
import type { Beat } from '@/components/novel/chapter-def';

export const ADDER_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'flamey my score is BROKEN 😭' },
  { kind: 'msg', who: 'starlax', text: 'the cat eats a fish and it goes up. the next fish and it goes back DOWN', rush: true },
  { kind: 'msg', who: 'flamey', text: 'scores do not go down. that is the whole point of a score 🤖' },
  { kind: 'msg', who: 'starlax', text: 'watch 👀' },

  { kind: 'toy', toy: 'broken', label: 'feed the cat' },

  { kind: 'msg', who: 'starlax', text: '1. 0. 1. 0.', typing: true },
  { kind: 'msg', who: 'starlax', text: 'I have fed it ALL these fish and I have ONE point 😤', rush: true },
  { kind: 'msg', who: 'flamey', text: '1 + 1 should be 10. it writes the 0 and then forgets the 1.' },
  { kind: 'msg', who: 'flamey', text: 'something in there is dropping the carry 🙃', rush: true },
  { kind: 'msg', who: 'starlax', text: 'I took the back off. LOOK' },
  { kind: 'pic', who: 'starlax', src: '/adder/burnt.svg', ratio: 4 / 3,
    alt: 'Starlax’s photo of the score section of the board: two black chips, SN7408N and SN7486N. The 7408 is scorched and cracked with a wisp of smoke, circled in red marker: “it smells like toast?!”' },
  { kind: 'msg', who: 'flamey', text: 'that one is the AND door. it carries the one.' },
  { kind: 'msg', who: 'flamey', text: 'and it is toast.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'can we get another one' },
  { kind: 'msg', who: 'flamey', text: 'nobody has made one in 200 years. there is exactly one more in the museum.', typing: true },
  { kind: 'msg', who: 'starlax', text: 'WHERE' },
  { kind: 'msg', who: 'flamey', text: 'inside the naughty-or-nice machine. in the old toy shop 🎅' },
  { kind: 'msg', who: 'starlax', text: 'SANTA’S MACHINE??' },
  { kind: 'msg', who: 'flamey', text: 'same chip. brushed teeth AND said please AND did not pull the cat’s tail.' },
  { kind: 'msg', who: 'flamey', text: 'try it before you rob it.', rush: true },

  { kind: 'toy', toy: 'santa', label: 'the naughty-or-nice machine' },

  { kind: 'msg', who: 'starlax', text: 'one bad thing and it’s NAUGHTY. it is SO strict 😤', typing: true },
  { kind: 'msg', who: 'flamey', text: 'that is an AND door. everything has to be yes.' },
  { kind: 'msg', who: 'starlax', text: 'well now it’s in my pocket 🔧' },
  { kind: 'msg', who: 'flamey', text: 'put it in the score. feed the cat.' },

  { kind: 'beat' },

  { kind: 'toy', toy: 'fixed', label: 'feed the cat · with santa’s AND door' },

  { kind: 'msg', who: 'starlax', text: 'IT COUNTS 🤯', typing: true },
  { kind: 'msg', who: 'starlax', text: '0111 and one more fish and they ALL went. like dominoes', rush: true },
  { kind: 'msg', who: 'flamey', text: 'XOR writes the digit. AND carries the one. two doors, and they add.' },
  { kind: 'msg', who: 'flamey', text: 'you have done that since second grade. you just had a pencil ✏️', rush: true },
  { kind: 'msg', who: 'starlax', text: 'wait. what is santa’s machine doing without its AND door' },
  { kind: 'msg', who: 'flamey', text: '...', typing: true },
  { kind: 'pic', who: 'starlax', src: '/adder/santa-nice.svg', ratio: 4 / 3,
    alt: 'Starlax’s photo of the Naughty-or-Nice Machine: its read-out says NICE — NOVA · present. The chip socket is empty with a sticky note, “borrowed — S”, and Nova’s orange paw is on the machine.' },
  { kind: 'msg', who: 'starlax', text: 'it says NICE to everybody. even NOVA 😂' },
  { kind: 'msg', who: 'flamey', text: 'true fact: on these old chips an empty socket reads as a yes. so everyone passes.' },
  { kind: 'msg', who: 'starlax', text: 'leo gets a present. nova gets a present.' },
  { kind: 'msg', who: 'flamey', text: '...that is the point of christmas 🎄', rush: true },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
