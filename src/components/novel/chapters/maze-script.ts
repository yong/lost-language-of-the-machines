// The chat script for "The Maze Is Made of Numbers" (/lab/level256).
//
// One sentence: the game paints the maze by numbers; on level 256 it scribbles
// over half the numbers; so we write them back.
//
// THE STORY IS A DISCOVERY. Starlax finds CATVENTURE — the book's own legacy
// game, whose hero is a cat in a maze — PAUSED on level 255 for two hundred
// years. Somebody got that far and never pressed a button again. "Maybe they
// knew." The reader unpauses it, plays, looks underneath while playing (the 2
// under the cat turns into a 0), watches level 256 scribble over numbers they
// saw healthy a moment ago, and wins the level its last player walked away
// from.
//
// The bug is CATVENTURE's own. It is modelled on a real one in a famous 1980
// maze game, which Flamey mentions once, truthfully, without naming it.
//
// Every number a character says comes from the game's data (CLAUDE.md, writing
// principle 8).
import type { Beat } from '@/components/novel/chapter-def';
import { JUNK, DOTS, LEFT_DOTS } from '@/components/novel/maze-toys';

const [J0, J1, J2] = JUNK;

export const MAZE_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'flamey' },
  { kind: 'msg', who: 'starlax', text: 'I found a game in the museum basement', rush: true },
  { kind: 'msg', who: 'starlax', text: 'it is still switched on', rush: true },
  { kind: 'msg', who: 'flamey', text: 'which game' },
  { kind: 'msg', who: 'starlax', text: 'CATVENTURE. you are a cat in a maze. you eat the dots.' },
  { kind: 'msg', who: 'starlax', text: 'and it says PAUSED', rush: true },
  { kind: 'msg', who: 'flamey', text: 'paused since when' },
  { kind: 'msg', who: 'starlax', text: 'since whoever was playing it walked away. two hundred years ago.' },
  { kind: 'msg', who: 'starlax', text: 'they got to level 255', rush: true },
  { kind: 'msg', who: 'flamey', text: '...', typing: true },
  { kind: 'msg', who: 'flamey', text: 'maybe they knew' },
  { kind: 'msg', who: 'starlax', text: 'knew what' },
  { kind: 'msg', who: 'flamey', text: 'unpause it and see. the arrows move the cat.' },

  { kind: 'toy', toy: 'play', label: 'unpause it — eat two dots' },

  { kind: 'msg', who: 'starlax', text: 'ok this is fun', typing: true },
  { kind: 'msg', who: 'starlax', text: `what does "dots / ${DOTS}" mean`, rush: true },
  { kind: 'msg', who: 'flamey', text: `a level ends when the cat has eaten ${DOTS} dots` },
  { kind: 'msg', who: 'flamey', text: 'want to see what the game sees?' },
  { kind: 'msg', who: 'starlax', text: 'what does that mean' },
  { kind: 'msg', who: 'flamey', text: 'flip the switch. keep playing.' },

  { kind: 'toy', toy: 'look', label: 'flip the switch and keep playing' },

  { kind: 'msg', who: 'starlax', text: 'IT IS NUMBERS', typing: true },
  { kind: 'msg', who: 'starlax', text: 'the whole maze is numbers', rush: true },
  { kind: 'msg', who: 'flamey', text: '1 is a wall. 2 is a dot. 0 is nothing.' },
  { kind: 'msg', who: 'starlax', text: 'and when the cat eats a dot, the 2 turns into a 0!' },
  { kind: 'msg', who: 'flamey', text: 'that is all eating is. a 2 becoming a 0.' },
  { kind: 'msg', who: 'starlax', text: 'so the maze is just a sheet of numbers' },
  { kind: 'msg', who: 'starlax', text: 'and the picture is the game colouring it in', rush: true },
  { kind: 'msg', who: 'flamey', text: 'paint-by-numbers. sixty times a second.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'ok. finishing level 255.' },
  { kind: 'msg', who: 'flamey', text: 'keep the numbers on' },
  { kind: 'msg', who: 'flamey', text: 'and watch the right side', rush: true },

  { kind: 'toy', toy: 'clear', label: 'finish level 255 — watch the right side' },

  { kind: 'msg', who: 'starlax', text: 'FLAMEY', typing: true },
  { kind: 'msg', who: 'starlax', text: 'the right side just turned into junk', rush: true },
  { kind: 'msg', who: 'flamey', text: 'level 256. that is what they knew.' },
  { kind: 'msg', who: 'flamey', text: 'the game keeps the level in a box that only counts to 255' },
  { kind: 'msg', who: 'flamey', text: 'at 256 it gets muddled and scribbles over half the maze’s numbers', rush: true },
  { kind: 'msg', who: 'starlax', text: `the right side says ${J0}. ${J1}. ${J2}.` },
  { kind: 'msg', who: 'starlax', text: 'those are not walls or dots', rush: true },
  { kind: 'msg', who: 'flamey', text: 'the game has a picture for every number. letters, fruit, bits of scenery. so it paints them anyway.' },
  { kind: 'msg', who: 'starlax', text: 'can I still finish' },
  { kind: 'msg', who: 'flamey', text: `you need ${DOTS} dots. there are only ${LEFT_DOTS} left on the good side.` },
  { kind: 'msg', who: 'flamey', text: 'the most famous maze game ever had this exact bug. nobody has ever beaten its level 256.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'then I am writing the dots back' },
  { kind: 'msg', who: 'flamey', text: 'a dot is a 2.' },

  { kind: 'toy', toy: 'fix', label: 'paint dots over the junk, then eat them' },

  { kind: 'msg', who: 'starlax', text: 'LEVEL 256 CLEARED', typing: true },
  { kind: 'msg', who: 'flamey', text: 'the first ever' },
  { kind: 'msg', who: 'starlax', text: 'whoever paused it knew they could not win' },
  { kind: 'msg', who: 'starlax', text: 'so they stopped at 255 and walked away', rush: true },
  { kind: 'msg', who: 'flamey', text: 'and two hundred years later, you won' },
  { kind: 'msg', who: 'starlax', text: 'and now it says level 1' },
  { kind: 'msg', who: 'flamey', text: 'the level box ran out of room and went round again' },
  { kind: 'msg', who: 'starlax', text: 'two hundred years of waiting, and my prize is level 1' },
  { kind: 'msg', who: 'flamey', text: 'that is what winning looks like, on a machine' },
];
