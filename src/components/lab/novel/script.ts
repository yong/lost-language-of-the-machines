// script.ts — Chapter One as a chat novel.
//
// The conversation IS the chapter, and the toys are embedded in it at the exact
// beat they are mentioned. Starlax says the cabinet has one switch; the switch
// appears in the thread; the story does not move until the reader flips it.
// That satisfies CLAUDE.md's "the story never quizzes" — the door doesn't open
// until the concept clicks, and failing is impossible, only stalling.
//
// Voice notes: Starlax is at the machine and the reader is on her side of the
// glass, so her messages sit right (the reader "sent" them). Flamey is one beat
// behind her the whole way — that is the delivery mechanism for letting the
// reader feel smart. His discomfort is the secret engine: he is a robot reading
// his own native language for the first time, like a native speaker asked to
// explain their own grammar.

export type Beat =
  | { kind: 'msg'; who: 'starlax' | 'flamey' | 'nova'; text: string }
  | { kind: 'beat' }
  | { kind: 'toy'; toy: 'switch' | 'row' | 'grid' | 'hex'; label: string };

export const SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'ok the dead cabinet. museum basement.' },
  { kind: 'msg', who: 'flamey', text: 'the one Evergreen says nobody can fix' },
  { kind: 'msg', who: 'starlax', text: 'that one' },
  { kind: 'msg', who: 'starlax', text: 'it has a switch' },
  { kind: 'msg', who: 'flamey', text: 'every machine has a switch' },
  { kind: 'msg', who: 'starlax', text: 'no. ONE switch. that is the entire control panel.' },

  { kind: 'toy', toy: 'switch', label: 'flip it' },

  { kind: 'msg', who: 'flamey', text: 'STARLAX' },
  { kind: 'msg', who: 'starlax', text: '🙂' },
  { kind: 'msg', who: 'flamey', text: '...did it work' },
  { kind: 'msg', who: 'starlax', text: 'five hundred years and nobody tried the switch' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'ok there is a panel behind it' },
  { kind: 'msg', who: 'starlax', text: 'a row of eight more' },
  { kind: 'msg', who: 'flamey', text: 'eight' },
  { kind: 'msg', who: 'starlax', text: 'eight' },
  { kind: 'msg', who: 'flamey', text: 'why eight' },
  { kind: 'msg', who: 'starlax', text: 'nobody alive knows why eight' },

  { kind: 'toy', toy: 'row', label: 'flip some of them' },

  { kind: 'msg', who: 'starlax', text: 'there is a little number under them' },
  { kind: 'msg', who: 'starlax', text: 'all down is 0' },
  { kind: 'msg', who: 'starlax', text: 'all up is 255' },
  { kind: 'msg', who: 'flamey', text: '255' },
  { kind: 'msg', who: 'starlax', text: '255' },
  { kind: 'msg', who: 'flamey', text: 'not eight. not a hundred. two hundred and fifty five.' },
  { kind: 'msg', who: 'starlax', text: 'is that bad' },
  { kind: 'msg', who: 'flamey', text: 'no it is' },
  { kind: 'msg', who: 'flamey', text: 'hang on' },
  { kind: 'msg', who: 'flamey', text: 'I know this number' },
  { kind: 'msg', who: 'starlax', text: 'you know a number??' },
  { kind: 'msg', who: 'flamey', text: 'I have never had to LOOK at it before' },
  { kind: 'msg', who: 'flamey', text: 'it is like if you asked me how you know where your own hand is' },
  { kind: 'msg', who: 'starlax', text: '...ok that was creepy' },
  { kind: 'msg', who: 'flamey', text: 'yeah' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'anyway I got bored' },
  { kind: 'msg', who: 'starlax', text: 'there are eight ROWS of eight' },
  { kind: 'msg', who: 'starlax', text: 'so I drew a cat' },
  { kind: 'msg', who: 'flamey', text: 'you drew a cat' },
  { kind: 'msg', who: 'flamey', text: 'on a five hundred year old machine' },
  { kind: 'msg', who: 'flamey', text: 'with switches' },
  { kind: 'msg', who: 'starlax', text: 'obviously' },

  { kind: 'toy', toy: 'grid', label: 'draw something' },

  { kind: 'msg', who: 'flamey', text: 'ok that is a cat' },
  { kind: 'msg', who: 'starlax', text: 'told you' },
  { kind: 'msg', who: 'flamey', text: 'starlax' },
  { kind: 'msg', who: 'flamey', text: 'what are the numbers down the side' },
  { kind: 'msg', who: 'starlax', text: 'what numbers' },
  { kind: 'msg', who: 'flamey', text: 'the ones next to every row' },
  { kind: 'beat' },
  { kind: 'msg', who: 'starlax', text: 'oh' },
  { kind: 'msg', who: 'starlax', text: 'oh no' },
  { kind: 'msg', who: 'starlax', text: 'the numbers ARE the cat' },
  { kind: 'msg', who: 'flamey', text: 'the numbers are the cat.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'ok I want to write this down but' },
  { kind: 'msg', who: 'starlax', text: '00111100 eight times' },
  { kind: 'msg', who: 'starlax', text: 'my thumbs hurt and I am not even the robot' },
  { kind: 'msg', who: 'flamey', text: 'cut it in half' },
  { kind: 'msg', who: 'starlax', text: 'cut WHAT in half' },
  { kind: 'msg', who: 'flamey', text: 'the eight. four and four.' },
  { kind: 'msg', who: 'flamey', text: 'four switches is only sixteen patterns. give each one a symbol.' },
  { kind: 'msg', who: 'starlax', text: 'there are not sixteen digits' },
  { kind: 'msg', who: 'flamey', text: 'so you run out of digits and start borrowing letters' },
  { kind: 'msg', who: 'starlax', text: 'you can DO that?' },
  { kind: 'msg', who: 'flamey', text: 'who is going to stop you. everyone who made this rule is dead.' },

  { kind: 'toy', toy: 'hex', label: 'cut one of your rows in half' },

  { kind: 'msg', who: 'starlax', text: 'that is it??' },
  { kind: 'msg', who: 'starlax', text: 'that is ALL that is??' },
  { kind: 'msg', who: 'flamey', text: 'that is all that is. somebody got tired of typing.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'nova just walked across the switches' },
  { kind: 'msg', who: 'flamey', text: 'what did she make' },
  { kind: 'msg', who: 'starlax', text: 'a number' },
  { kind: 'msg', who: 'flamey', text: 'what number' },
  { kind: 'msg', who: 'starlax', text: 'I am not repeating it' },
  { kind: 'msg', who: 'nova', text: '🐱' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'hey' },
  { kind: 'msg', who: 'starlax', text: 'the cat is a bit boring though' },
  { kind: 'msg', who: 'starlax', text: 'it is just on or off. lit or not lit.' },
  { kind: 'msg', who: 'starlax', text: 'I want her orange' },
  { kind: 'msg', who: 'flamey', text: '...' },
  { kind: 'msg', who: 'flamey', text: 'how many switches do you think orange is' },
  { kind: 'msg', who: 'starlax', text: 'oh no' },
];
