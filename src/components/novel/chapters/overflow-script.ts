// The chat script for "A Number Can Run Out of Room".
//
// The chapter has one idea and shows it four times in four costumes: a price
// sign, a byte, a year, and the cartridge's own score. Nobody ever says the
// words "integer overflow" — by the fourth costume the reader has met the shape
// often enough that naming it would be a spoiler of their own conclusion.
//
// Voice, per CLAUDE.md: Starlax has her hands on the thing and gets there a
// beat before Flamey, so the reader (on her side of the glass) gets there
// before him too. Flamey supplies the history, always slightly too late to be
// useful and visibly unhappy about it — he is a machine describing a family
// illness. Every fact he states is real; none is bent for the joke.
import type { Beat } from '@/components/novel/chapter-def';

export const OVERFLOW_SCRIPT: Beat[] = [
  { kind: 'msg', who: 'starlax', text: 'the price sign on the forecourt' },
  { kind: 'msg', who: 'starlax', text: 'regular 8.99. plus 9.19. premium 9.39.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'diesel 9.99.', rush: true },
  { kind: 'msg', who: 'flamey', text: 'diesel is dearest. that is normal.' },
  { kind: 'msg', who: 'starlax', text: 'diesel has been 9.99 since before I was born' },
  { kind: 'msg', who: 'flamey', text: 'nothing holds still that long' },
  { kind: 'msg', who: 'starlax', text: 'the other three move every week. that one has never moved once.' },
  { kind: 'msg', who: 'flamey', text: 'so the sign is broken' },
  { kind: 'msg', who: 'starlax', text: 'that is the thing. I think it is working perfectly.' },

  { kind: 'toy', toy: 'pump', label: 'put the price up' },

  { kind: 'msg', who: 'flamey', text: 'what did you do', typing: true },
  { kind: 'msg', who: 'starlax', text: 'I put it up one penny' },
  { kind: 'msg', who: 'starlax', text: 'nine ninety-nine, and one more cent', rush: true },
  { kind: 'msg', who: 'flamey', text: 'ten dollars' },
  { kind: 'msg', who: 'starlax', text: '0.00' },
  { kind: 'msg', who: 'flamey', text: 'that is not ten dollars' },

  { kind: 'beat' },

  { kind: 'msg', who: 'flamey', text: 'where did the ten go' },
  { kind: 'msg', who: 'starlax', text: 'nowhere. count the windows.' },
  { kind: 'msg', who: 'starlax', text: 'nine. nine. nine. and a dot.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'there is no window for a ten.', rush: true },
  { kind: 'msg', who: 'flamey', text: 'so it cannot think a bigger number' },
  { kind: 'msg', who: 'starlax', text: 'it can think it' },
  { kind: 'msg', who: 'starlax', text: 'it cannot HOLD it', rush: true },

  { kind: 'beat' },

  { kind: 'msg', who: 'flamey', text: 'oh no', typing: true },
  { kind: 'msg', who: 'flamey', text: 'I know this one', rush: true },
  { kind: 'msg', who: 'flamey', text: 'in 2008 the price of fuel went past 3.99 and the pumps could not print a 4' },
  { kind: 'msg', who: 'flamey', text: 'two windows for the dollars. nobody had ever needed a third.' },
  { kind: 'msg', who: 'starlax', text: 'what did they do' },
  { kind: 'msg', who: 'flamey', text: 'sold it half a gallon at a time, so the number stayed small' },
  { kind: 'msg', who: 'starlax', text: 'they LIED to the sign' },
  { kind: 'msg', who: 'flamey', text: 'they lied to the sign.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'ok but the cabinet is not a sign' },
  { kind: 'msg', who: 'flamey', text: 'the cabinet is a row of eight switches' },
  { kind: 'msg', who: 'flamey', text: 'what is the biggest number that row can hold', rush: true },
  { kind: 'msg', who: 'starlax', text: '255. all eight up.' },
  { kind: 'msg', who: 'flamey', text: 'add one.' },

  { kind: 'toy', toy: 'byte', label: 'count it up past 255' },

  { kind: 'msg', who: 'starlax', text: 'they all went out', typing: true },
  { kind: 'msg', who: 'starlax', text: 'ALL of them. at once.', rush: true },
  { kind: 'msg', who: 'flamey', text: 'each one carried into the next' },
  { kind: 'msg', who: 'flamey', text: 'and the last one carried into nothing', rush: true },
  { kind: 'msg', who: 'starlax', text: 'because there is no ninth switch' },
  { kind: 'msg', who: 'flamey', text: 'there is never a ninth switch. that is what a byte IS.' },
  { kind: 'msg', who: 'starlax', text: 'so 255 and one more is zero' },
  { kind: 'msg', who: 'flamey', text: 'in a box that size, yes.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'that seems like it would cause problems' },
  { kind: 'msg', who: 'flamey', text: 'it caused the year 2000' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'the whole year??' },
  { kind: 'msg', who: 'flamey', text: 'for about forty years people wrote the year with two digits', typing: true },
  { kind: 'msg', who: 'starlax', text: 'why' },
  { kind: 'msg', who: 'flamey', text: 'because two cost half as much as four, and there are a lot of years to keep' },
  { kind: 'msg', who: 'starlax', text: 'ok so 97. 98. 99.' },
  { kind: 'msg', who: 'starlax', text: 'oh', rush: true },
  { kind: 'msg', who: 'starlax', text: 'OH', rush: true },

  { kind: 'toy', toy: 'year', label: 'turn it to the year 2000' },

  { kind: 'msg', who: 'starlax', text: 'she is minus eighty-five years old', typing: true },
  { kind: 'msg', who: 'flamey', text: 'she is not born yet. technically.' },
  { kind: 'msg', who: 'starlax', text: 'she is NINETY ONE' },
  { kind: 'msg', who: 'flamey', text: 'the machine disagrees, and the machine is the one doing the paperwork' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'what happened' },
  { kind: 'msg', who: 'flamey', text: 'everybody spent about five years going through every machine on the planet' },
  { kind: 'msg', who: 'flamey', text: 'hundreds of billions of dollars. giving the year two more digits.', rush: true },
  { kind: 'msg', who: 'starlax', text: 'did it work' },
  { kind: 'msg', who: 'flamey', text: 'almost nothing broke' },
  { kind: 'msg', who: 'starlax', text: 'so there was never a problem' },
  { kind: 'msg', who: 'flamey', text: 'that is exactly what everyone said.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'flamey', text: 'do the work and it looks like there was nothing to do' },
  { kind: 'msg', who: 'starlax', text: 'that is the worst prize I have ever heard of' },
  { kind: 'msg', who: 'flamey', text: 'it is the only prize this job gives out' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'ok. the cabinet is doing the sign thing.' },
  { kind: 'msg', who: 'flamey', text: 'doing it where' },
  { kind: 'msg', who: 'starlax', text: 'the score. I got 255 points and it said 000.' },
  { kind: 'msg', who: 'starlax', text: 'and then it said NEW RECORD', rush: true },
  { kind: 'msg', who: 'flamey', text: 'the score is one byte' },
  { kind: 'msg', who: 'starlax', text: 'so give it another one' },

  { kind: 'toy', toy: 'score', label: 'give the score another byte' },

  { kind: 'msg', who: 'starlax', text: '65535', typing: true },
  { kind: 'msg', who: 'flamey', text: 'two bytes. eight switches, and then eight more.' },
  { kind: 'msg', who: 'starlax', text: 'that is a lot of cat' },
  { kind: 'msg', who: 'flamey', text: 'it is not forever though' },
  { kind: 'msg', who: 'starlax', text: 'nothing is' },
  { kind: 'msg', who: 'flamey', text: 'nothing is. you pick a box you will not fall out of.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'flamey', text: 'true one. a song called Gangnam Style broke a video counter in 2014.' },
  { kind: 'msg', who: 'flamey', text: 'it went past 2,147,483,647 views and the number gave up', rush: true },
  { kind: 'msg', who: 'starlax', text: 'what kind of number is that' },
  { kind: 'msg', who: 'flamey', text: 'the biggest one that fits in four bytes when a switch is spent on the minus sign' },
  { kind: 'msg', who: 'starlax', text: 'so they gave it more switches' },
  { kind: 'msg', who: 'flamey', text: 'eight bytes. that one holds nine quintillion.' },
  { kind: 'msg', who: 'starlax', text: 'is nine quintillion enough' },
  { kind: 'msg', who: 'flamey', text: 'for a song, yes.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'is anything still counting toward an edge' },
  { kind: 'msg', who: 'flamey', text: 'the clocks' },
  { kind: 'msg', who: 'starlax', text: 'which clocks' },
  { kind: 'msg', who: 'flamey', text: 'most of them counted seconds in four bytes', typing: true },
  { kind: 'msg', who: 'flamey', text: 'they run out on the 19th of January, 2038', rush: true },
  { kind: 'msg', who: 'starlax', text: 'that is soon' },
  { kind: 'msg', who: 'flamey', text: 'it was always soon. that is the job.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'hey' },
  { kind: 'msg', who: 'starlax', text: 'so what does diesel actually cost', rush: true },
  { kind: 'msg', who: 'flamey', text: 'more than the sign can say' },
  { kind: 'msg', who: 'starlax', text: 'how much more' },
  { kind: 'msg', who: 'flamey', text: 'nobody has checked in two hundred years', typing: true },
  { kind: 'msg', who: 'flamey', text: 'the sign kept saying 9.99 and everybody believed it', rush: true },
  { kind: 'msg', who: 'starlax', text: 'that is the scariest thing you have said all night' },
  { kind: 'msg', who: 'flamey', text: 'that is the other half of the job.' },

  // ── CODA. The chapter looks finished here, and that is the point: the
  // reader has just been told Nova is asleep under the sign. She is not.
  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'hang on' },
  { kind: 'msg', who: 'starlax', text: 'where is nova', rush: true },
  { kind: 'msg', who: 'flamey', text: 'asleep under the sign. you said.' },
  { kind: 'msg', who: 'starlax', text: 'she is not under the sign' },
  { kind: 'msg', who: 'starlax', text: 'the cabinet is on', rush: true },
  { kind: 'msg', who: 'starlax', text: 'she is PLAYING it', typing: true },
  { kind: 'msg', who: 'flamey', text: 'cats cannot play' },
  { kind: 'msg', who: 'starlax', text: 'she has been on it all night. she is on level 255.' },
  { kind: 'msg', who: 'flamey', text: '...', typing: true },
  { kind: 'msg', who: 'flamey', text: 'do not let her finish that level' },
  { kind: 'msg', who: 'starlax', text: 'why' },
  { kind: 'msg', who: 'flamey', text: 'how many levels fit in one byte' },

  { kind: 'toy', toy: 'level', label: 'let her finish level 255' },

  { kind: 'msg', who: 'starlax', text: 'FLAMEY', typing: true },
  { kind: 'msg', who: 'starlax', text: 'half the screen is gibberish', rush: true },
  { kind: 'msg', who: 'flamey', text: 'I know. it happened to the most famous arcade game in the world.' },
  { kind: 'msg', who: 'flamey', text: 'pac-man keeps its level in one byte. on level 256 the byte runs out of room.' },
  { kind: 'msg', who: 'flamey', text: 'the game loses count of how much fruit to draw, and draws so much it spills across half the maze', rush: true },
  { kind: 'msg', who: 'starlax', text: 'can you win it' },
  { kind: 'msg', who: 'flamey', text: 'nobody ever has. there are not enough dots left on the good half.' },
  { kind: 'msg', who: 'starlax', text: 'so it is the last level' },
  { kind: 'msg', who: 'flamey', text: 'the last level of the most famous game in the world. nobody built it on purpose.' },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'wait' },
  { kind: 'msg', who: 'starlax', text: 'the gibberish says CATVEN', rush: true },
  { kind: 'msg', who: 'flamey', text: 'the rest of the word fell off the edge' },
  { kind: 'msg', who: 'starlax', text: 'and 65535. and 11111111.' },
  { kind: 'msg', who: 'starlax', text: 'and FF 99 33 — that is the cat', rush: true },
  { kind: 'msg', who: 'starlax', text: 'and 9.99. of COURSE it says 9.99', rush: true },
  { kind: 'msg', who: 'flamey', text: 'it is not gibberish' },
  { kind: 'msg', who: 'flamey', text: 'it is the inside of the game, drawn as if it were the maze', rush: true },
  { kind: 'msg', who: 'starlax', text: 'so that is what the lost language looks like' },
  { kind: 'msg', who: 'flamey', text: 'that is what it looks like when it spills out.', typing: true },

  { kind: 'beat' },

  { kind: 'msg', who: 'starlax', text: 'nobody built level 256' },
  { kind: 'msg', who: 'starlax', text: 'nova built it', rush: true },
  { kind: 'msg', who: 'nova', text: '🐱', rush: true },
];
