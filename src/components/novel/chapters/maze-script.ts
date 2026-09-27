// The chat script for "The Maze Is Made of Numbers" (/lab/level256).
//
// ONE sentence, and every line serves it:
//   the game paints the maze by numbers; on level 256 it scribbled over half
//   the numbers; so we write them back — and Nova wins.
//
// The telling leans on something every kid already knows, PAINT-BY-NUMBERS: a
// sheet of numbers, a key, and you colour it in. Starlax is the one who says
// it, a beat before Flamey — the reader, flipping the switch, gets there with
// her (CLAUDE.md: let the kid feel smart). Nothing is explained before the
// reader has seen it: the numbers appear under their thumb first, and only then
// does anyone put words to them.
//
// Three cards, one per step, in order: the break · the reveal · the fix.
// Deliberately NOT here any more: memory, colours, hex, "values vs behaviour"
// — an earlier telling crammed those in and nobody could follow it.
import type { Beat } from '@/components/novel/chapter-def';
import { JUNK } from '@/components/novel/maze-toys';

// Starlax reads the junk's numbers OFF THE SCREEN. A first draft had her say
// "203. 67. 148." while the screen showed 229, 97, 249 — a kid would hunt for
// 203 and never find it. Built from the same numbers the card draws, so the
// two can never disagree.
const [J0, J1, J2] = JUNK;

export const MAZE_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'flamey' },
  { kind: 'msg', who: 'starlax', text: 'nova is still playing the cabinet', rush: true },
  { kind: 'msg', who: 'flamey', text: 'cats cannot play' },
  { kind: 'msg', who: 'starlax', text: 'she has been on it for three nights. she is really good.' },
  { kind: 'msg', who: 'flamey', text: 'which level', typing: true },
  { kind: 'msg', who: 'starlax', text: '255. three dots left.' },
  { kind: 'msg', who: 'flamey', text: 'oh no' },
  { kind: 'msg', who: 'starlax', text: 'what' },
  { kind: 'msg', who: 'flamey', text: 'let her finish. you will see.' },

  { kind: 'toy', toy: 'break', label: 'let her clear level 255' },

  { kind: 'msg', who: 'starlax', text: 'FLAMEY', typing: true },
  { kind: 'msg', who: 'starlax', text: 'half the maze just turned to junk', rush: true },
  { kind: 'msg', who: 'flamey', text: 'level 256' },
  { kind: 'msg', who: 'flamey', text: 'the same thing happened to pac-man, the most famous arcade game ever' },
  { kind: 'msg', who: 'flamey', text: 'on level 256 the game gets muddled and scribbles over half the maze', rush: true },
  { kind: 'msg', who: 'starlax', text: 'can she still win' },
  { kind: 'msg', who: 'flamey', text: 'no. the dots on that side got scribbled over. she can never eat them all.' },
  { kind: 'msg', who: 'flamey', text: 'nobody has ever beaten level 256. not once.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'nova is going to be the first' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'wait. how do you scribble over a maze' },
  { kind: 'msg', who: 'starlax', text: 'it is a picture', rush: true },
  { kind: 'msg', who: 'flamey', text: 'is it' },

  { kind: 'toy', toy: 'sheet', label: 'look at what the game sees' },

  { kind: 'msg', who: 'starlax', text: 'IT IS NUMBERS', typing: true },
  { kind: 'msg', who: 'starlax', text: 'the whole maze is numbers', rush: true },
  { kind: 'msg', who: 'flamey', text: '0 is empty. 1 is a wall. 2 is a dot.' },
  { kind: 'msg', who: 'starlax', text: 'it is paint-by-numbers!' },
  { kind: 'msg', who: 'flamey', text: 'exactly paint-by-numbers. the game reads the sheet and paints the maze.' },
  { kind: 'msg', who: 'flamey', text: 'sixty times a second.', rush: true },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'and the junk side?' },
  { kind: 'msg', who: 'flamey', text: 'read its numbers' },
  { kind: 'msg', who: 'starlax', text: `they are red. and huge. ${J0}. ${J1}. ${J2}.` },
  { kind: 'msg', who: 'starlax', text: `there is no ${J0} on the key`, rush: true },
  { kind: 'msg', who: 'flamey', text: 'the game has a picture for every number. letters, fruit, bits of scenery.' },
  { kind: 'msg', who: 'flamey', text: 'so it paints whatever the number says. it does not know the number is wrong.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'so the junk is not broken' },
  { kind: 'msg', who: 'starlax', text: 'it is just the wrong numbers', rush: true },
  { kind: 'msg', who: 'flamey', text: 'that is all junk ever is.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'then I am writing the right ones back' },
  { kind: 'msg', who: 'flamey', text: 'she needs ten dots on that side' },
  { kind: 'msg', who: 'starlax', text: 'and a dot is a 2' },

  { kind: 'toy', toy: 'fix', label: 'write the dots back' },

  { kind: 'msg', who: 'starlax', text: 'SHE DID IT', typing: true },
  { kind: 'msg', who: 'starlax', text: 'nova beat level 256', rush: true },
  { kind: 'msg', who: 'flamey', text: 'the first ever' },
  { kind: 'msg', who: 'flamey', text: 'with ten 2s', rush: true },
  { kind: 'msg', who: 'starlax', text: 'the screen says LEVEL 1 now' },
  { kind: 'msg', who: 'flamey', text: 'the level counter ran out of room and went round again' },
  { kind: 'msg', who: 'starlax', text: 'she beat the level nobody can beat' },
  { kind: 'msg', who: 'starlax', text: 'and her prize is level 1', rush: true },
  { kind: 'msg', who: 'flamey', text: 'that is what winning looks like, on a machine' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
