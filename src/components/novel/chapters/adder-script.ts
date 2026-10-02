// The chat script for "Two Doors Can Add" (/lab/adder).
//
// One sentence: a machine cannot count, but two doors can add — XOR writes the
// digit and AND carries the one, and the carries ripple like dominoes.
//
// The thing every kid already owns is CARRYING THE ONE from school sums. The
// want is Starlax's question — who is doing the adding in there? — and the win
// is the score counting because of doors she understands.
//
// Short on purpose (CLAUDE.md): three ideas, one joke each. AND gets the ice
// cream, XOR gets the pizza, the adder gets "you just had a pencil", and the
// true story (the domino computer) closes it.
import type { Beat } from '@/components/novel/chapter-def';

export const ADDER_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'flamey. how does CATVENTURE add 🐟' },
  { kind: 'msg', who: 'starlax', text: 'the cat eats a fish and the score goes up one. something in there is doing sums', rush: true },
  { kind: 'msg', who: 'flamey', text: 'I do sums all day. I have no idea how 🤖' },
  { kind: 'msg', who: 'starlax', text: 'I took the back off. there is no calculator. just thousands of tiny doors' },
  { kind: 'msg', who: 'flamey', text: 'doors cannot count' },
  { kind: 'msg', who: 'starlax', text: 'that is what I said. look at this one 👀' },

  { kind: 'toy', toy: 'and', label: 'the first door' },

  { kind: 'msg', who: 'starlax', text: 'one marble: stuck. two marbles: OPEN 🔔', typing: true },
  { kind: 'msg', who: 'flamey', text: 'both, or nothing. that door is called AND' },
  { kind: 'msg', who: 'flamey', text: 'like asking three robots "do ALL of you want ice cream?" 🍦' },
  { kind: 'msg', who: 'flamey', text: 'robot 1: I don’t know. robot 2: I don’t know. robot 3: YES!', rush: true },
  { kind: 'msg', who: 'starlax', text: '...that took me a second 😂' },
  { kind: 'msg', who: 'starlax', text: 'the door next to it is weirder' },

  { kind: 'toy', toy: 'xor', label: 'the second door' },

  { kind: 'msg', who: 'starlax', text: 'one marble goes through. two marbles and it SHUTS 😤', typing: true },
  { kind: 'msg', who: 'flamey', text: 'one or the other, not both. XOR' },
  { kind: 'msg', who: 'flamey', text: 'the "you BOTH want the last slice? then nobody gets pizza" door 🍕', rush: true },
  { kind: 'msg', who: 'starlax', text: 'ok but one door says BOTH and one says JUST ONE. how is that adding' },
  { kind: 'msg', who: 'flamey', text: 'what is 1 + 1' },
  { kind: 'msg', who: 'starlax', text: '2. in switches that is 10. one, zero.' },
  { kind: 'msg', who: 'flamey', text: 'the score is 1. feed the cat one fish and watch both doors.' },

  { kind: 'beat' },

  { kind: 'toy', toy: 'add', label: 'the score — two doors in every column' },

  { kind: 'msg', who: 'starlax', text: 'XOR shut, so it wrote 0. AND opened, so a marble rolled over. 10!!', typing: true },
  { kind: 'msg', who: 'starlax', text: 'it CARRIED THE ONE 🤯', rush: true },
  { kind: 'msg', who: 'flamey', text: 'you have done that since second grade. you just had a pencil ✏️' },
  { kind: 'msg', who: 'flamey', text: 'XOR writes the digit. AND carries the one. two doors, and they add.' },
  { kind: 'msg', who: 'starlax', text: 'and bigger numbers?' },
  { kind: 'msg', who: 'flamey', text: 'one pair of doors per column. the carry rolls into the next one. keep feeding the cat.' },

  { kind: 'toy', toy: 'ripple', label: 'feed the cat until the score says 1000' },

  { kind: 'msg', who: 'starlax', text: '0111 and ONE more fish and they ALL went 😱', typing: true },
  { kind: 'msg', who: 'starlax', text: 'click click click click. like dominoes', rush: true },
  { kind: 'msg', who: 'flamey', text: 'each carry knocks over the next column. a chain reaction.' },
  { kind: 'msg', who: 'flamey', text: 'true story: people once built an adding machine out of 10,000 real dominoes. it did exactly that.' },
  { kind: 'msg', who: 'starlax', text: 'did it work?' },
  { kind: 'msg', who: 'flamey', text: 'once. then somebody had to stand all 10,000 back up 🙃' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'so the game is not clever. it is just doors' },
  { kind: 'msg', who: 'flamey', text: 'very fast doors. millions of sums a second.' },
  { kind: 'msg', who: 'starlax', text: 'you are mostly doors flamey' },
  { kind: 'msg', who: 'flamey', text: '...doors that can count 🤖' },
  { kind: 'msg', who: 'starlax', text: 'nova wants to know why the cat in the game gets all the fish' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
