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
// THE STORY IS A KID WHO GOT HOOKED. Starlax found CATVENTURE — the book's own
// legacy game, whose hero is a cat in a maze — in the museum basement, and has
// played nothing else all week. She has cleared 254 levels; one more and she
// has beaten it. She texts Flamey to watch. The reader plays that last level,
// and the strange thing happens to them: level 256 loads with half of it
// junk, and now she has something to SHOW him. (An earlier telling had the
// game PAUSED on 255 for two hundred years; nobody leaves a game paused for
// two hundred years, and a mystery about a stranger is weaker than your own
// week of playing going wrong at the very end.)
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
  { kind: 'msg', who: 'starlax', text: 'are you awake', rush: true },
  { kind: 'msg', who: 'flamey', text: 'I am always awake. I am a robot.' },
  { kind: 'msg', who: 'starlax', text: 'I have cleared 254 levels of CATVENTURE this week' },
  { kind: 'msg', who: 'starlax', text: 'you are the cat. you eat the dots. the dots come back. forever.', rush: true },
  { kind: 'msg', who: 'flamey', text: 'is that why you did not come to lunch' },
  { kind: 'msg', who: 'starlax', text: 'this is the last level. 255. then I have beaten it.' },
  { kind: 'msg', who: 'starlax', text: 'watch', rush: true },
  { kind: 'msg', who: 'flamey', text: 'go on then. I am watching.' },
  { kind: 'msg', who: 'flamey', text: 'the arrows move the cat.', rush: true },

  { kind: 'toy', toy: 'play', label: 'the last level — finish 255' },

  { kind: 'msg', who: 'starlax', text: 'FLAMEY', typing: true },
  { kind: 'msg', who: 'starlax', text: 'you have to see this', rush: true },
  { kind: 'msg', who: 'starlax', text: 'I finished 255 and there is a level 256. and half of it is junk.' },
  { kind: 'msg', who: 'flamey', text: '...', typing: true },
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
  { kind: 'msg', who: 'flamey', text: 'the first person ever. nobody could, until you wrote the dots back.' },
  { kind: 'msg', who: 'starlax', text: 'and now it says level 1' },
  { kind: 'msg', who: 'flamey', text: 'the level box ran out of room and went round again' },
  { kind: 'msg', who: 'starlax', text: 'a whole week. 256 levels. and my prize is level 1.' },
  { kind: 'msg', who: 'flamey', text: 'that is what winning looks like, on a machine' },
  { kind: 'msg', who: 'starlax', text: 'I am going to bed' },
  { kind: 'msg', who: 'flamey', text: 'good. level 1 will still be there.', rush: true },
];
