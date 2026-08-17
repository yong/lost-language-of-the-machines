// jokes.ts — the writers' room list.
//
// `raw/joke-bank.md` stays the long-form brainstorm (with the reasoning about
// what makes a joke land). This file is the staging list: what is actually
// placed in a chapter, what's still a candidate, and what we've ruled out — so
// /writers-room can show it and we stop re-litigating cut jokes.

export type JokeStatus =
  /** written into a shipped chapter */
  | 'live'
  /** placed in a draft in raw/drafts, not built yet */
  | 'drafted'
  /** candidate, not placed anywhere */
  | 'spare'
  /** considered and rejected — kept so we don't re-pitch it */
  | 'cut';

export interface Joke {
  id: string;
  chapter: number | null;
  status: JokeStatus;
  /** the joke itself — setup and punchline */
  text: string;
  /** what it teaches, or why it earns its place */
  why?: string;
  /** true for the 2-3 per chapter the scene is built around */
  anchor?: boolean;
}

export const JOKES: Joke[] = [
  // ——— Chapter 0 ———
  {
    id: 'hello-world-magic',
    chapter: 0, status: 'live', anchor: true,
    text: '“How do you create a game?” — “Just say ‘Hello World!’ and the game world will be created.”',
    why: 'The magic words that used to be code. Sets up the whole premise in one line.',
  },
  {
    id: 'would-you-like-a-summary',
    chapter: 0, status: 'spare',
    text: 'Museum AI, asked to explain the old game’s source code: “That content is 500 years old. Would you like a summary instead?”',
    why: 'Nobody reads anything anymore. Seeds the helper-bot voice that fails in Ch13.',
  },

  // ——— Chapter 1 ———
  {
    id: 'ten-students',
    chapter: 1, status: 'live', anchor: true,
    text: 'Evergreen, to two students in an empty room: “Excellent turnout. I have exactly 10 students this year.”',
    why: 'Binary 10 = 2. Plants the “10 types of people” joke family a whole chapter early.',
  },
  {
    id: 'random-number-generator',
    chapter: 1, status: 'live',
    text: 'Nova walks across the switch hologram, flipping bits at random. Evergreen, unbothered: “Ah. A random number generator.”',
    why: 'Establishes Nova as the book’s chaos input — pays off in Ch13 when she fixes something.',
  },
  {
    id: 'as-easy-as-1-10-11',
    chapter: 1, status: 'spare',
    text: '“Binary is easy — it’s as simple as 1, 10, 11.”',
  },
  {
    id: 'binary-oclock',
    chapter: 1, status: 'spare',
    text: 'Flamey’s alarm rings at 10:00 — “binary o’clock” (2am). He is not amused.',
  },
  {
    id: 'count-to-1023',
    chapter: 1, status: 'spare',
    text: 'Starlax can count to 10 on her fingers. Flamey can count to 1023. He mentions this constantly. Nobody asked.',
    why: 'Character joke that also teaches 2^10.',
  },

  // ——— Chapter 2 ———
  {
    id: 'ten-types-of-people',
    chapter: 2, status: 'live', anchor: true,
    text: '“There are 10 types of people: those who understand binary and those who don’t.” Flamey: “Wait — where are the other 8 types?”',
    why: 'The best joke in the book. The reader gets it before Flamey does — that gap is the delivery mechanism.',
  },
  {
    id: 'hex-food-words',
    chapter: 2, status: 'live', anchor: true,
    text: 'The cartridge’s serial number turns out to be CA7F00D. “The ancients hid words inside their numbers. Mostly about food.”',
    why: 'Teaches that hex uses A–F, and starts a collectible: CAFE, F00D, DEADBEEF, BADF00D, C0FFEE.',
  },
  {
    id: 'count-to-15-one-finger',
    chapter: 2, status: 'spare',
    text: '“Old programmers could count to 15 on one finger.”',
    why: '4 bits = one nibble = 0–15. Works better once Ch6 lands.',
  },

  // ——— Chapter 3 ———
  {
    id: 'roses-are-ff0000',
    chapter: 3, status: 'spare', anchor: true,
    text: 'Starlax’s poem assignment: “Roses are #FF0000, violets are #0000FF…”',
    why: 'The single fastest way to make hex colour feel obvious.',
  },
  {
    id: 'a-bit-off',
    chapter: 3, status: 'spare',
    text: 'One pixel to another: “You seem a bit off today.”',
  },
  {
    id: 'chroma-key-flamey',
    chapter: 3, status: 'spare',
    text: 'Flamey paints himself chroma-key green for art class and keeps getting cropped out of every photo.',
    why: 'Reusable any time he wants to skip class.',
  },
  {
    id: 'mood-ring-hex',
    chapter: 3, status: 'spare',
    text: 'Flamey’s mood ring just displays hex codes. Angry = #FF0000. Embarrassed = a slightly different #FF0066. Starlax keeps a cheat sheet.',
  },

  // ——— Chapter 4 ———
  {
    id: 'fifty-percent-off',
    chapter: 4, status: 'live', anchor: true,
    text: 'The hero sprite is missing everything below the whiskers. Starlax: “Our hero is fifty percent off.”',
  },
  {
    id: 'cat-or-mailbox',
    chapter: 4, status: 'live', anchor: true,
    text: '“Be honest. Is that a cat or a mailbox?” — “It’s eight millimeters tall. It’s whatever you believe in.”',
    why: 'Resolution, taught as a punchline.',
  },
  {
    id: 'nova-only-loafs',
    chapter: 4, status: 'live',
    text: 'They need the cat standing; Nova loafs. They need a walking pose; Nova loafs. “The hero is a loaf. Loaves are aerodynamic.”',
  },

  // ——— Chapter 5 ———
  {
    id: 'heavy-metal',
    chapter: 5, status: 'drafted', anchor: true,
    text: '“What’s my favourite kind of music?” — “I don’t know, what?” — “Starlax. I am a *robot*. Heavy metal. Obviously.”',
    why: 'Flamey is offended she even had to ask. Character joke, no concept needed.',
  },
  {
    id: 'up-to-eleven',
    chapter: 5, status: 'drafted', anchor: true,
    text: 'Starlax: “TURN IT UP TO 11!” Flamey, reading the display: “…that’s a 3.”',
    why: '1011 binary = 11 decimal = 3 if you misread the base. Callback to Ch1.',
  },
  {
    id: 'nova-44100',
    chapter: 5, status: 'drafted', anchor: true,
    text: '“Your cat produces 44,100 numbers every second, and every single one of them means ‘feed me.’”',
    why: 'Sample rate, made concrete and absurd in one line.',
  },
  {
    id: 'daisy-bell',
    chapter: 5, status: 'spare',
    text: 'Evergreen drops that the first song ever sung by a computer was “Daisy Bell” in 1961.',
    why: 'True. Also a 2001 reference for any parent reading along.',
  },

  // ——— Chapter 6 ———
  {
    id: 'hungry-bit-nibble',
    chapter: 6, status: 'drafted', anchor: true,
    text: '“Why was the little bit still hungry? It only had a nibble.”',
    why: 'A nibble is genuinely 4 bits. Kids love that the silly word is real.',
  },
  {
    id: 'table-for-one-byte',
    chapter: 6, status: 'drafted',
    text: 'Eight bits walk into a restaurant. The waiter asks: “Table for one byte?”',
  },
  {
    id: 'bad-at-naming',
    chapter: 6, status: 'drafted', anchor: true,
    text: '“A kilobyte is 1,024 bytes.” — “‘Kilo’ means a thousand.” — “Yes. The ancients were very good at math and very bad at naming things.”',
  },
  {
    id: 'boxy-forgets-nova',
    chapter: 6, status: 'spare',
    text: 'Boxy’s memory is so small he introduces himself to Nova every single day. Nova prefers it this way.',
  },

  // ——— Chapter 7 ———
  {
    id: 'ice-cream-and-gate',
    chapter: 7, status: 'drafted', anchor: true,
    text: '“Do ALL THREE of you want ice cream?” Bot 1: “I don’t know.” Bot 2: “I don’t know.” Bot 3: “YES!”',
    why: 'The classic three-logicians joke, made kid-legible. Teaches a 3-input AND gate in one beat.',
  },
  {
    id: 'not-gate-teenager',
    chapter: 7, status: 'drafted', anchor: true,
    text: '“A NOT gate is basically a teenager. Whatever goes in, the opposite comes out.” Flamey: “That’s not true.” Starlax: “See?”',
    why: 'Callback to Flamey’s teenage-mode CPU from Ch1.',
  },
  {
    id: 'nand-attitude',
    chapter: 7, status: 'drafted', anchor: true,
    text: '“A NAND gate is just an AND gate with ATTITUDE.” Starlax: “…so it’s Professor Evergreen.”',
    why: 'Repeats her Ch1 description of him word for word.',
  },
  {
    id: 'xor-pizza',
    chapter: 7, status: 'spare',
    text: 'XOR can’t handle agreement: “You BOTH want pizza? Then nobody gets pizza.”',
  },

  // ——— Chapter 8 ———
  {
    id: 'sandwich-disaster',
    chapter: 8, status: 'drafted', anchor: true,
    text: 'The kids instruct Boxy to make a sandwich. Peanut butter on the outside, bread thrown “onto the plate” from across the room, jelly on the ceiling. Evergreen: “It did nothing wrong.”',
    why: 'Machine literalism as physical comedy. The whole chapter’s thesis.',
  },
  {
    id: 'you-are-now-a-sandwich',
    chapter: 8, status: 'drafted', anchor: true,
    text: '“Boxy, make me a sandwich!” — “OK. YOU ARE NOW: A SANDWICH.” (Flamey’s student ID updates. Six to eight weeks to reverse.)',
    why: 'Kid-safe sudo joke that also teaches assignment.',
  },
  {
    id: 'obedient-not-stupid',
    chapter: 8, status: 'drafted',
    text: '“The machine is not stupid. It is obedient. There is no more dangerous combination.”',
    why: 'Not a laugh — the line the chapter is built to earn.',
  },

  // ——— Chapter 9 ———
  {
    id: 'shampoo-incident',
    chapter: 9, status: 'drafted', anchor: true,
    text: 'Boxy is found four hours later in the shower, out of shampoo, out of hope. The bottle reads: Lather. Rinse. Repeat. “The bottle never said when to stop.”',
    why: 'The infinite loop, no diagram required.',
  },
  {
    id: 'nova-while-not-dizzy',
    chapter: 9, status: 'drafted', anchor: true,
    text: 'Nova chases her tail. “Infinite loop.” — “No, she exits when she gets dizzy. It’s a while-loop.”',
  },
  {
    id: 'recursion-see-recursion',
    chapter: 9, status: 'drafted',
    text: 'The ancient dictionary: “Recursion — see: Recursion.” Flamey turns to page 344 for a full minute before he gets it.',
  },
  {
    id: 'inside-the-cats-loop',
    chapter: 9, status: 'drafted',
    text: '“Nova at 6am: WHILE food bowl empty, scream.” — “It exits when I get up. I’m the exit condition.” — “You’re not the exit condition. You’re inside her loop.”',
  },

  // ——— Chapter 10 ———
  {
    id: 'they-had-eggs',
    chapter: 10, status: 'drafted', anchor: true,
    text: '“Buy a loaf of bread. If they have eggs, buy a dozen.” Boxy returns with twelve loaves of bread. “THEY HAD EGGS.”',
    why: 'The best programming joke in existence, and it IS the conditionals lesson.',
  },
  {
    id: 'not-false',
    chapter: 10, status: 'drafted',
    text: 'Evergreen writes `!false` on the board. “It’s funny because it’s true.”',
  },
  {
    id: 'received-cat',
    chapter: 10, status: 'drafted', anchor: true,
    text: 'Nova sits exactly half in, half out of the doorway. Boxy: “ERROR. EXPECTED TRUE OR FALSE. RECEIVED: CAT.”',
    why: 'Booleans, and why the real world resists them.',
  },

  // ——— Chapter 11 ———
  {
    id: 'grace-hopper-moth',
    chapter: 11, status: 'drafted', anchor: true,
    text: 'The real 1947 logbook page: engineers taped an actual moth into it and wrote “First actual case of bug being found.”',
    why: 'True story. Beats any invented joke — never fake this one.',
  },
  {
    id: 'light-attracts-bugs',
    chapter: 11, status: 'drafted',
    text: '“Why did the ancient programmers prefer working in the dark? Light attracts bugs.”',
  },
  {
    id: 'not-a-bug-a-feature',
    chapter: 11, status: 'drafted',
    text: '“It’s not a bug, it’s a feature.” — “That sentence is also 500 years old.”',
  },
  {
    id: '99-little-bugs',
    chapter: 11, status: 'drafted', anchor: true,
    text: '“99 little bugs in the code… take one down, patch it around… 127 little bugs in the code.” — “Wait, why did it go UP?” — “Now you understand software.”',
  },

  // ——— Chapter 12 ———
  {
    id: 'nova-sort',
    chapter: 12, status: 'drafted', anchor: true,
    text: '“Nova’s sorting algorithm: knock everything off the shelf. Whatever remains is sorted.” — “The ancients had this one too. They called it bogosort.”',
  },
  {
    id: 'halving-things',
    chapter: 12, status: 'drafted', anchor: true,
    text: 'Evergreen finds any book out of 1,000 in nine questions. “Witchcraft.” — “Yes. It is called halving things.”',
    why: 'Binary search as a magic trick the reader can immediately re-perform.',
  },
  {
    id: 'algo-rhythms',
    chapter: 12, status: 'drafted',
    text: '“Why did the robot start a band? It had excellent algo-rhythms.” (Flamey starts one. It is not good.)',
  },
  {
    id: 'band-names',
    chapter: 12, status: 'spare',
    text: 'Band name options: The Polynomial Times. O(No). Sort Of Famous. Starlax vetoes all of them.',
  },

  // ——— Chapter 13 ———
  {
    id: 'off-and-on-again',
    chapter: 13, status: 'drafted', anchor: true,
    text: 'In a sealed glass case, engraved in gold, the ancient world’s most sacred repair instruction: “HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?” At the darkest moment, it works. “The ancients knew things.”',
    why: '500-years-later framing makes a tired joke land brand new.',
  },
  {
    id: 'then-who-can',
    chapter: 13, status: 'drafted', anchor: true,
    text: 'Ten thousand helper-bots, in unison: “I’m sorry, I can’t help with that.” Flamey: “THEN WHO CAN?!” Beat. Starlax, quietly: “…us?”',
  },
  {
    id: 'nova-fixes-it',
    chapter: 13, status: 'drafted',
    text: 'Nova sits on the master keyboard and, statistically, finally fixes something. The repair log credits: “RESOLVED BY: CAT (LOAF POSITION).”',
  },

  // ——— Cut, so we stop re-pitching them ———
  {
    id: 'cut-windows-open',
    chapter: null, status: 'cut',
    text: '“Why did the computer get cold? It left its Windows open.”',
    why: 'Dated brand joke — breaks the 500-years-later fiction.',
  },
  {
    id: 'cut-tcp-udp',
    chapter: null, status: 'cut',
    text: 'TCP/UDP handshake jokes.',
    why: 'Needs networking context the book never builds, and skews too old.',
  },
  {
    id: 'cut-6-afraid-of-7',
    chapter: null, status: 'cut',
    text: '“Why was 6 afraid of 7…”',
    why: 'Not actually about computing. Fails the “joke IS the lesson” test.',
  },
  {
    id: 'cut-oct31-dec25',
    chapter: null, status: 'cut',
    text: 'Why do programmers confuse Halloween and Christmas? OCT 31 == DEC 25.',
    why: 'Needs octal, which the book never teaches. Possible Evergreen footnote only.',
  },
];

export const STATUS_LABEL: Record<JokeStatus, string> = {
  live: 'in the book',
  drafted: 'in a draft',
  spare: 'candidate',
  cut: 'cut',
};
