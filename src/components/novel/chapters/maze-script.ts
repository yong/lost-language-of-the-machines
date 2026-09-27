// The chat script for "The Maze Is Made of Numbers" (/lab/level256).
//
// One sentence: the game paints the maze by numbers; on level 256 it scribbles
// over half the numbers; so we write them back.
//
// THE STORY FOLLOWS THE PLAYER. The first card is simply the game: finish level
// 255. When the player does, level 256 loads with its right half turned to junk
// — because of what they did — and Starlax reacts at once (the chapter lists
// its game cards as `events`, so a level ending is not held behind a button).
// Only then: "is it a picture?" — flip what the game sees, eat a dot on the good
// side, and watch the 2 under the cat turn into a 0.
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

  { kind: 'toy', toy: 'play', label: 'unpause it — finish level 255' },

  { kind: 'msg', who: 'starlax', text: 'FLAMEY', typing: true },
  { kind: 'msg', who: 'starlax', text: 'I finished 255 and the right side turned into junk', rush: true },
  { kind: 'msg', who: 'flamey', text: 'level 256. that is what they knew.' },
  { kind: 'msg', who: 'starlax', text: 'what happened to it' },
  { kind: 'msg', who: 'flamey', text: 'the game scribbled over it' },
  { kind: 'msg', who: 'starlax', text: 'you cannot scribble over a maze. it is a picture.' },
  { kind: 'msg', who: 'flamey', text: 'is it?' },
  { kind: 'msg', who: 'flamey', text: 'flip the switch. eat a dot.', rush: true },

  { kind: 'toy', toy: 'look', label: 'flip the switch — eat a dot' },

  { kind: 'msg', who: 'starlax', text: 'IT IS NUMBERS', typing: true },
  { kind: 'msg', who: 'starlax', text: 'the whole maze is numbers', rush: true },
  { kind: 'msg', who: 'flamey', text: '1 is a wall. 2 is a dot. 0 is nothing.' },
  { kind: 'msg', who: 'starlax', text: 'and when the cat ate that dot, the 2 turned into a 0!' },
  { kind: 'msg', who: 'flamey', text: 'that is all eating is. a 2 becoming a 0.' },
  { kind: 'msg', who: 'starlax', text: 'so the maze is a sheet of numbers' },
  { kind: 'msg', who: 'starlax', text: 'and the picture is the game colouring it in', rush: true },
  { kind: 'msg', who: 'flamey', text: 'paint-by-numbers. sixty times a second.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'the left side is the maze I just played. walls and dots. 1s and 2s.' },
  { kind: 'msg', who: 'starlax', text: `the right side says ${J0}. ${J1}. ${J2}.`, rush: true },
  { kind: 'msg', who: 'starlax', text: 'those are not walls or dots', rush: true },
  { kind: 'msg', who: 'flamey', text: 'the game keeps the level in a box that only counts to 255' },
  { kind: 'msg', who: 'flamey', text: 'at 256 it gets muddled and scribbles over half the maze’s numbers', rush: true },
  { kind: 'msg', who: 'flamey', text: 'it has a picture for every number. letters, fruit, bits of scenery. so it paints the junk anyway.' },
  { kind: 'msg', who: 'starlax', text: 'can I still finish' },
  { kind: 'msg', who: 'flamey', text: `you need ${DOTS} dots. there are only ${LEFT_DOTS} on the good side.` },
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
