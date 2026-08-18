// puppet.ts — the interpreter behind the "a puppet you program" experiment.
//
// The bet: the most kid-native programming game is a character that obeys a
// short instruction list LITERALLY, and is funny when it goes wrong. That is
// already this book's comic engine — "if they have eggs, buy a dozen" coming
// back with twelve loaves of bread is exactly this mechanic.
//
// The interpreter is deliberately unhelpful in one specific way: it never
// guesses what you meant. It does what you said. That is the whole joke and
// the whole lesson.

export type Cmd =
  | { kind: 'move'; n: number; line: number }
  | { kind: 'turn'; dir: 'left' | 'right'; line: number }
  | { kind: 'say'; text: string; line: number }
  | { kind: 'repeat'; n: number; body: Cmd[]; line: number };

export interface ParseError {
  line: number;
  message: string;
}

// ── the world ───────────────────────────────────────────────────────────────

export const COLS = 10;
export const ROWS = 7;

/** '#' wall, 'f' fish, '.' floor. The cat starts bottom-left facing right. */
export const LEVEL = [
  '..........',
  '.......f..',
  '..........',
  '..####....',
  '..........',
  '..........',
  '..........',
];

export const START = { x: 1, y: 5, dir: 0 }; // 0=right 1=down 2=left 3=up

const DELTA = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const isWall = (x: number, y: number) =>
  x < 0 || y < 0 || x >= COLS || y >= ROWS || LEVEL[y][x] === '#';

const fishAt = (() => {
  for (let y = 0; y < ROWS; y++) {
    const x = LEVEL[y].indexOf('f');
    if (x !== -1) return { x, y };
  }
  return { x: -1, y: -1 };
})();

export const FISH = fishAt;

// ── parsing ─────────────────────────────────────────────────────────────────

const indentOf = (s: string) => s.length - s.trimStart().length;

/**
 * Indentation-scoped `repeat`. Everything else is one verb per line.
 * Small enough that a kid can hold the entire grammar in their head — which is
 * the point. A language you can read all of is not a toy, it's a foothold.
 */
export const parse = (src: string): { cmds: Cmd[]; errors: ParseError[] } => {
  const errors: ParseError[] = [];
  const rows = src.split('\n')
    .map((text, line) => ({ text, line, indent: indentOf(text), body: text.trim() }))
    .filter((r) => r.body && !r.body.startsWith('--'));

  let i = 0;

  const block = (minIndent: number): Cmd[] => {
    const out: Cmd[] = [];
    while (i < rows.length && rows[i].indent >= minIndent) {
      const row = rows[i];
      i++;

      const [verb, ...rest] = row.body.split(/\s+/);
      const arg = rest.join(' ');

      switch (verb) {
        case 'move': {
          const n = Number(arg);
          if (!Number.isInteger(n) || n < 0) {
            errors.push({ line: row.line, message: `move needs a whole number of steps, not "${arg}".` });
            break;
          }
          out.push({ kind: 'move', n, line: row.line });
          break;
        }
        case 'turn': {
          if (arg !== 'left' && arg !== 'right') {
            errors.push({ line: row.line, message: `turn goes left or right. Not "${arg}".` });
            break;
          }
          out.push({ kind: 'turn', dir: arg, line: row.line });
          break;
        }
        case 'say': {
          const m = arg.match(/^"(.*)"$/);
          if (!m) {
            // Quotes are how you tell a machine "these are letters, not orders".
            // Getting that wrong is Chapter 2's lesson arriving as a punchline.
            errors.push({
              line: row.line,
              message: `say ${arg} — say WHAT? Put letters in quotes: say "${arg}". Without them I think you're naming something.`,
            });
            break;
          }
          out.push({ kind: 'say', text: m[1], line: row.line });
          break;
        }
        case 'repeat': {
          const n = Number(arg);
          if (!Number.isInteger(n) || n < 0) {
            errors.push({ line: row.line, message: `repeat needs a count, not "${arg}".` });
            break;
          }
          const body = i < rows.length && rows[i].indent > row.indent
            ? block(rows[i].indent)
            : [];
          if (body.length === 0) {
            errors.push({ line: row.line, message: `repeat ${n} — repeat WHAT? Indent the lines underneath.` });
          }
          out.push({ kind: 'repeat', n, body, line: row.line });
          break;
        }
        default:
          errors.push({ line: row.line, message: `I don't know the word "${verb}".` });
      }
    }
    return out;
  };

  const cmds = block(0);
  return { cmds, errors };
};

// ── running ─────────────────────────────────────────────────────────────────

export interface Step {
  x: number;
  y: number;
  dir: number;
  /** speech bubble shown at this step */
  bubble?: string;
  /** walked into a wall on this step */
  bonk?: boolean;
  /** landed on the fish */
  gotFish?: boolean;
  /** which source line produced this step */
  line: number;
}

const MAX_STEPS = 400;

export const run = (cmds: Cmd[]): { steps: Step[]; overran: boolean } => {
  const steps: Step[] = [];
  const state = { ...START };
  let gotFish = false;
  let overran = false;

  const push = (extra: Partial<Step>, line: number) => {
    if (steps.length >= MAX_STEPS) { overran = true; return false; }
    steps.push({ x: state.x, y: state.y, dir: state.dir, line, ...extra });
    return true;
  };

  const exec = (list: Cmd[]): boolean => {
    for (const c of list) {
      if (overran) return false;
      switch (c.kind) {
        case 'move':
          for (let s = 0; s < c.n; s++) {
            const d = DELTA[state.dir];
            const nx = state.x + d.x;
            const ny = state.y + d.y;
            if (isWall(nx, ny)) {
              // It does not stop politely. It keeps trying.
              if (!push({ bonk: true }, c.line)) return false;
            } else {
              state.x = nx;
              state.y = ny;
              if (state.x === FISH.x && state.y === FISH.y) gotFish = true;
              if (!push({ gotFish }, c.line)) return false;
            }
          }
          if (c.n === 0 && !push({}, c.line)) return false;
          break;
        case 'turn':
          state.dir = (state.dir + (c.dir === 'right' ? 1 : 3)) % 4;
          if (!push({}, c.line)) return false;
          break;
        case 'say':
          if (!push({ bubble: c.text }, c.line)) return false;
          break;
        case 'repeat':
          for (let r = 0; r < c.n; r++) {
            if (!exec(c.body)) return false;
          }
          break;
      }
    }
    return true;
  };

  exec(cmds);
  return { steps, overran };
};

// ── what the characters make of it ──────────────────────────────────────────
// The reaction is the feedback channel. Not a score, not a checkmark — the cast
// watching, and being funnier about failure than about success.

export interface Reaction {
  who: 'flamey' | 'starlax' | 'nova';
  text: string;
}

export const reactTo = (
  steps: Step[],
  errors: ParseError[],
  overran: boolean,
  lineCount = 0
): Reaction[] => {
  if (errors.length) {
    return [
      { who: 'flamey', text: `It stopped. "${errors[0].message}"` },
      { who: 'starlax', text: 'It only knows four words. Be gentle with it.' },
    ];
  }
  if (overran) {
    return [
      { who: 'starlax', text: "It's still going." },
      { who: 'flamey', text: 'It will be still going tomorrow. That is what you asked for.' },
      { who: 'nova', text: '🐱 (has fallen asleep)' },
    ];
  }
  if (steps.length === 0) {
    return [
      { who: 'flamey', text: 'It did exactly what you told it to do.' },
      { who: 'starlax', text: 'Which was nothing.' },
    ];
  }

  const bonks = steps.filter((s) => s.bonk).length;
  const won = steps.some((s) => s.gotFish);
  const out: Reaction[] = [];

  if (won) {
    out.push({ who: 'starlax', text: 'FISH! 🐟' });
    out.push({
      who: 'flamey',
      text: lineCount === 1
        ? 'One line. One. I want that noted.'
        : `${lineCount} lines. I want it noted that I read all ${lineCount}.`,
    });
  }
  if (bonks >= 6) {
    out.push({ who: 'flamey', text: `It walked into the wall ${bonks} times.` });
    out.push({ who: 'starlax', text: 'It never once considered stopping. Honestly? Respect.' });
  } else if (bonks > 0) {
    out.push({ who: 'flamey', text: `${bonks} wall${bonks > 1 ? 's' : ''}. It did not mind.` });
  }
  const said = steps.find((s) => s.bubble !== undefined);
  if (said) {
    out.push({
      who: 'nova',
      text: said.bubble?.trim()
        ? `🐱 repeated "${said.bubble}" back at you, word for word.`
        : '🐱 said nothing, extremely loudly.',
    });
  }
  if (!won && bonks === 0) {
    out.push({ who: 'starlax', text: 'No crash, no fish. It just... went somewhere.' });
  }
  return out.slice(0, 3);
};
