// The chat script for "A Number Can Run Out of Room".
//
// One idea, three costumes: a price sign, a year, and the cartridge's own
// score. Nobody ever says "integer overflow".
//
// SHORT ON PURPOSE. The first version showed the same trick four times in 109
// messages, with a history lecture after each; a kid who read it said it was
// too long and got repetitive fast. Now: the sign (the hook — the 1 falls out
// of bed), the year 2000 (the famous one, and the best joke), and the score
// (the repair, and the win). Each costume gets its joke and moves on.
//
// Emoji are part of the voice: Starlax texts like a kid (⛽😳😂🤯), Flamey
// is a dry robot who uses one when he is being dramatic about it (🤖😬🙄),
// and Nova only ever says 🐱.
//
// Voice, per CLAUDE.md: Starlax has her hands on the thing and gets there a
// beat before Flamey, so the reader (on her side of the glass) gets there
// before him too. Flamey supplies the history, always slightly too late to be
// useful and visibly unhappy about it — he is a machine describing a family
// illness. Every fact he states is real; none is bent for the joke.
import type { Beat } from '@/components/novel/chapter-def';

export const OVERFLOW_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'flamey look at the price sign ⛽' },
  { kind: 'msg', who: 'starlax', text: 'regular 8.99. plus 9.19. premium 9.39.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'diesel 9.99.', rush: true },
  { kind: 'msg', who: 'flamey', text: 'diesel is the dearest. that is normal 🤖' },
  { kind: 'msg', who: 'starlax', text: 'diesel has been 9.99 since before I was born 😳' },
  { kind: 'msg', who: 'flamey', text: 'so the sign is broken' },
  { kind: 'msg', who: 'starlax', text: 'I think it is working perfectly. watch 👀' },

  { kind: 'toy', toy: 'pump', label: 'put the price up one cent' },

  { kind: 'msg', who: 'flamey', text: 'what did you do', typing: true },
  { kind: 'msg', who: 'starlax', text: 'one more cent. that is TEN dollars 💵' },
  { kind: 'msg', who: 'starlax', text: 'and it says 0.00 😂', rush: true },
  { kind: 'msg', who: 'flamey', text: 'where did the ten go' },
  { kind: 'msg', who: 'starlax', text: 'it fell out of bed 🛏️' },
  { kind: 'msg', who: 'flamey', text: 'what' },
  { kind: 'msg', who: 'starlax', text: 'ten in the bed, and the little one said roll over 🎶' },
  { kind: 'msg', who: 'starlax', text: 'so they all rolled over, and one fell out', rush: true },
  { kind: 'msg', who: 'flamey', text: 'that is a song for babies 🙄' },
  { kind: 'msg', who: 'flamey', text: '...it is also what engineers really call it. a rollover.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'three windows. 9. 9. 9. no window for a ten.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'flamey', text: 'people did this with YEARS 😬' },
  { kind: 'msg', who: 'starlax', text: 'what??' },
  { kind: 'msg', who: 'flamey', text: 'for forty years computers wrote the year with two digits. 97. 98. 99.' },
  { kind: 'msg', who: 'starlax', text: 'and after 99...', rush: true },
  { kind: 'msg', who: 'starlax', text: 'oh no 👀', rush: true },

  { kind: 'toy', toy: 'year', label: 'turn it to the year 2000' },

  { kind: 'msg', who: 'starlax', text: 'she was born in 85 and now she is minus eighty-five 😂', typing: true },
  { kind: 'msg', who: 'flamey', text: 'not born yet. technically.' },
  { kind: 'msg', who: 'flamey', text: 'the computer disagrees, and the computer does the paperwork 📄', rush: true },
  { kind: 'msg', who: 'starlax', text: 'so what happened in the real year 2000' },
  { kind: 'msg', who: 'flamey', text: 'people spent years fixing every computer on earth first 💸' },
  { kind: 'msg', who: 'flamey', text: 'and on new year’s day almost nothing broke 🎆', rush: true },
  { kind: 'msg', who: 'starlax', text: 'so it was never a problem' },
  { kind: 'msg', who: 'flamey', text: 'that is exactly what everybody said 🙃' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'wait. CATVENTURE has a score 🕹️' },
  { kind: 'msg', who: 'flamey', text: 'one byte. eight switches. the most it can hold is 255.' },
  { kind: 'msg', who: 'starlax', text: 'I have 230 😬', rush: true },

  { kind: 'toy', toy: 'score', label: 'score past 255 — then give it room' },

  { kind: 'msg', who: 'starlax', text: 'it went back to zero and said NEW RECORD 😂', typing: true },
  { kind: 'msg', who: 'flamey', text: 'it was very proud of itself' },
  { kind: 'msg', who: 'starlax', text: 'and with two bytes it holds 65535 🤯' },
  { kind: 'msg', who: 'flamey', text: 'eight switches, and eight more. a box the cat will not fall out of 📦' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'hey. so what does diesel REALLY cost ⛽' },
  { kind: 'msg', who: 'flamey', text: 'more than the sign can say' },
  { kind: 'msg', who: 'flamey', text: 'nobody has checked in two hundred years. it says 9.99, so everybody believes it 😬', rush: true },
  { kind: 'msg', who: 'starlax', text: 'that is the scariest thing you have said all night' },
  { kind: 'msg', who: 'starlax', text: 'nova is asleep under it' },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
