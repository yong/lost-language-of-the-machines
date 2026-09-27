// The chat script for "The Maze Is Made of Numbers" (/lab/level256).
//
// One sentence: the game paints the maze by numbers; on level 256 it scribbles
// over half the numbers; so we write them back — and Nova wins.
//
// PLAY FIRST, THEN LOOK. The reader is handed a real game (Nova fell asleep on
// level 255, so they finish it for her) and only then flips "what the game
// sees" — while still playing, so the lesson lands under their own thumb:
// when she eats a dot, the 2 under her turns into a 0. They are told to keep
// the numbers on and watch the right side before finishing the level, so the
// bug happens IN FRONT of them, to numbers they saw healthy a moment ago.
//
// Every number a character says comes from the game's data (CLAUDE.md,
// writing principle 8): the dots a level needs, how many survive on the good
// side, and the junk Starlax reads off the screen.
import type { Beat } from '@/components/novel/chapter-def';
import { JUNK, DOTS, LEFT_DOTS } from '@/components/novel/maze-toys';

const [J0, J1, J2] = JUNK;

export const MAZE_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'flamey' },
  { kind: 'msg', who: 'starlax', text: 'nova fell asleep on the cabinet', rush: true },
  { kind: 'msg', who: 'flamey', text: 'on it?' },
  { kind: 'msg', who: 'starlax', text: 'on the controls. she got to level 255 and fell asleep.' },
  { kind: 'msg', who: 'flamey', text: 'then finish it for her' },
  { kind: 'msg', who: 'starlax', text: 'I have never played it' },
  { kind: 'msg', who: 'flamey', text: 'the arrows move her. eat the dots.' },

  { kind: 'toy', toy: 'play', label: 'finish it for her — eat two dots' },

  { kind: 'msg', who: 'starlax', text: 'ok this is fun', typing: true },
  { kind: 'msg', who: 'starlax', text: `what does "dots / ${DOTS}" mean`, rush: true },
  { kind: 'msg', who: 'flamey', text: `a level ends when she has eaten ${DOTS} dots` },
  { kind: 'msg', who: 'flamey', text: 'want to see what the game sees?' },
  { kind: 'msg', who: 'starlax', text: 'what does that mean' },
  { kind: 'msg', who: 'flamey', text: 'flip the switch. keep playing.' },

  { kind: 'toy', toy: 'look', label: 'flip the switch and keep playing' },

  { kind: 'msg', who: 'starlax', text: 'IT IS NUMBERS', typing: true },
  { kind: 'msg', who: 'starlax', text: 'the whole maze is numbers', rush: true },
  { kind: 'msg', who: 'flamey', text: '1 is a wall. 2 is a dot. 0 is nothing.' },
  { kind: 'msg', who: 'starlax', text: 'and when she eats a dot, the 2 turns into a 0!' },
  { kind: 'msg', who: 'flamey', text: 'that is all eating is. a 2 becoming a 0.' },
  { kind: 'msg', who: 'starlax', text: 'so the maze is just a sheet of numbers' },
  { kind: 'msg', who: 'starlax', text: 'and the picture is the game colouring it in', rush: true },
  { kind: 'msg', who: 'flamey', text: 'paint-by-numbers. sixty times a second.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'ok. finishing level 255 for her.' },
  { kind: 'msg', who: 'flamey', text: 'keep the numbers on' },
  { kind: 'msg', who: 'flamey', text: 'and watch the right side', rush: true },

  { kind: 'toy', toy: 'clear', label: 'finish level 255 — watch the right side' },

  { kind: 'msg', who: 'starlax', text: 'FLAMEY', typing: true },
  { kind: 'msg', who: 'starlax', text: 'the right side just turned into junk', rush: true },
  { kind: 'msg', who: 'flamey', text: 'level 256.' },
  { kind: 'msg', who: 'flamey', text: 'this happens in the real pac-man too. the most famous arcade game ever.' },
  { kind: 'msg', who: 'flamey', text: 'on level 256 the game gets muddled and scribbles over half the maze’s numbers', rush: true },
  { kind: 'msg', who: 'starlax', text: `the right side says ${J0}. ${J1}. ${J2}.` },
  { kind: 'msg', who: 'starlax', text: 'those are not walls or dots', rush: true },
  { kind: 'msg', who: 'flamey', text: 'the game has a picture for every number. letters, fruit, bits of scenery. so it paints them anyway.' },
  { kind: 'msg', who: 'starlax', text: 'can she still finish' },
  { kind: 'msg', who: 'flamey', text: `she needs ${DOTS} dots. there are only ${LEFT_DOTS} left on the good side.` },
  { kind: 'msg', who: 'flamey', text: 'in pac-man, nobody has ever finished level 256. not once.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'then I am writing the dots back' },
  { kind: 'msg', who: 'flamey', text: 'a dot is a 2.' },

  { kind: 'toy', toy: 'fix', label: 'paint dots over the junk, then eat them' },

  { kind: 'msg', who: 'starlax', text: 'LEVEL 256 CLEARED', typing: true },
  { kind: 'msg', who: 'flamey', text: 'the first ever' },
  { kind: 'msg', who: 'starlax', text: 'nova is still asleep' },
  { kind: 'msg', who: 'flamey', text: 'she beat the level nobody can beat, and slept through it' },
  { kind: 'msg', who: 'starlax', text: 'and now it says level 1' },
  { kind: 'msg', who: 'flamey', text: 'the level counter ran out of room and went round again' },
  { kind: 'msg', who: 'starlax', text: 'her prize for the impossible level is level 1' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
