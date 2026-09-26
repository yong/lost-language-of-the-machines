// The chat script for "A Glitch Is a Window" (/lab/level256).
//
// A new chapter, standing on its own — deliberately NOT a rerun of the overflow
// chapter. That one already teaches 255 + 1 = 0. This one starts where it
// stops: when a number runs out of room, the game draws whatever it finds
// next, and what it finds is its own memory. So the kill screen is not the
// lesson, it is the DOOR — the first time anyone in two hundred years has seen
// the cartridge's insides. The reader finds the cat's colour in there, changes
// it, and then tries the same trick on the level and hits the wall the whole
// book is built on: a number can be changed; what the game DOES with it is the
// program, and the program is in the language nobody speaks.
//
// Voice (CLAUDE.md): Starlax has her hands on the machine and gets there a beat
// before Flamey, so the reader does too. Flamey supplies the history, true in
// every detail. Nova does what cats do and is, as usual, the chaos input.
import type { Beat } from '@/components/novel/chapter-def';

export const GLITCH_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'are you awake' },
  { kind: 'msg', who: 'flamey', text: 'robots do not sleep. we idle.' },
  { kind: 'msg', who: 'starlax', text: 'nova is playing the cabinet' },
  { kind: 'msg', who: 'flamey', text: 'cats cannot play' },
  { kind: 'msg', who: 'starlax', text: 'three nights now. she is really good.' },
  { kind: 'msg', who: 'starlax', text: 'she is on level 255', rush: true },
  { kind: 'msg', who: 'flamey', text: '...', typing: true },
  { kind: 'msg', who: 'flamey', text: 'how many levels fit in one byte' },
  { kind: 'msg', who: 'starlax', text: '255' },
  { kind: 'msg', who: 'starlax', text: 'oh', rush: true },
  { kind: 'msg', who: 'flamey', text: 'do not let her finish that level' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },

  { kind: 'toy', toy: 'level', label: 'she is finishing level 255' },

  { kind: 'msg', who: 'starlax', text: 'FLAMEY', typing: true },
  { kind: 'msg', who: 'starlax', text: 'half the screen just turned to garbage', rush: true },
  { kind: 'msg', who: 'flamey', text: 'I know. it happened to the most famous arcade game in the world.' },
  { kind: 'msg', who: 'flamey', text: 'pac-man keeps its level in one byte. on level 256 the byte runs out of room.' },
  { kind: 'msg', who: 'flamey', text: 'the game loses count of how much fruit to draw, and draws it across half the maze', rush: true },
  { kind: 'msg', who: 'starlax', text: 'can she win it' },
  { kind: 'msg', who: 'flamey', text: 'nobody ever has. there are not enough dots left on the good half.' },
  { kind: 'msg', who: 'starlax', text: 'she is still trying' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },

  { kind: 'beat' },

  { kind: 'msg', who: 'flamey', text: 'look at the garbage though' },
  { kind: 'msg', who: 'starlax', text: 'it is garbage' },
  { kind: 'msg', who: 'flamey', text: 'it is not. when the game ran out of room it drew whatever it found next.' },
  { kind: 'msg', who: 'flamey', text: 'that is whatever it found next. that is its memory.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'so we are looking at the inside of the cabinet' },
  { kind: 'msg', who: 'flamey', text: 'by accident. the first time anyone has in two hundred years.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'wait. that says CATVEN' },
  { kind: 'msg', who: 'flamey', text: 'the rest of the word fell off the edge' },
  { kind: 'msg', who: 'starlax', text: 'so the title is in there' },
  { kind: 'msg', who: 'flamey', text: 'everything is in there. the title. the score. the cat.' },
  { kind: 'msg', who: 'starlax', text: 'the CAT is in there??' },
  { kind: 'msg', who: 'flamey', text: 'the cat is orange. somewhere in there is the number that makes her orange.' },

  { kind: 'toy', toy: 'find', label: 'find the cat’s orange' },

  { kind: 'msg', who: 'starlax', text: 'FF 99 33', typing: true },
  { kind: 'msg', who: 'flamey', text: 'that is her' },
  { kind: 'msg', who: 'starlax', text: 'that is a CAT?' },
  { kind: 'msg', who: 'flamey', text: 'that is her colour. three numbers: how much red, how much green, how much blue.' },
  { kind: 'msg', who: 'flamey', text: 'FF is all the way up.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'so all the red, some green, a little blue' },
  { kind: 'msg', who: 'flamey', text: 'which is orange' },
  { kind: 'msg', who: 'starlax', text: 'what if I change it' },
  { kind: 'msg', who: 'flamey', text: 'then she changes' },

  { kind: 'toy', toy: 'paint', label: 'make her green' },

  { kind: 'msg', who: 'starlax', text: 'SHE IS GREEN', typing: true },
  { kind: 'msg', who: 'starlax', text: 'I changed a number and the cat changed', rush: true },
  { kind: 'msg', who: 'flamey', text: 'everything on that screen is a number, and all the numbers are in there' },
  { kind: 'msg', who: 'starlax', text: 'is this how people used to cheat at games' },
  { kind: 'msg', who: 'flamey', text: 'exactly this. find a value you can see, and change it.' },
  { kind: 'msg', who: 'flamey', text: 'they sold a whole machine for it. you plugged it in between the game and the console.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'ok. then I am fixing level 256 the same way.' },
  { kind: 'msg', who: 'flamey', text: 'go on then' },

  { kind: 'toy', toy: 'wall', label: 'fix level 256' },

  { kind: 'msg', who: 'starlax', text: 'it did not work', typing: true },
  { kind: 'msg', who: 'starlax', text: 'I changed the numbers and it is just different garbage', rush: true },
  { kind: 'msg', who: 'flamey', text: 'you can change what a number IS' },
  { kind: 'msg', who: 'flamey', text: 'you cannot change what the game DOES with it', rush: true },
  { kind: 'msg', who: 'starlax', text: 'the colour was a number. the level is a number.' },
  { kind: 'msg', who: 'flamey', text: 'and the part that decides what to do with the level is not a number you can see' },
  { kind: 'msg', who: 'flamey', text: 'it is the program. it is written in the language.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'the one nobody speaks' },
  { kind: 'msg', who: 'flamey', text: 'the one nobody speaks.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'nova has given up' },
  { kind: 'msg', who: 'flamey', text: 'finally' },
  { kind: 'msg', who: 'starlax', text: 'on the dots. she is lying on the warm half of the screen.' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
