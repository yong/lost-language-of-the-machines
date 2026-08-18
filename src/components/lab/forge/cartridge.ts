// cartridge.ts — the model behind the "readable source" Forge experiment.
//
// The idea under test: CATVENTURE is not a black box the reader repairs from
// the outside. It is a SHORT SOURCE FILE the reader can read end to end, which
// grows by a line or two per chapter. By the finale the file is ~30 lines and
// the reader watched every one of them arrive.
//
// See CLAUDE.md → "Status: mid-reconstruction" for why this exists.

/** Everything the little game knows about itself. One flat bag of values. */
export interface Cartridge {
  skyColor: string;
  catColor: string;
  speed: number;
  score: number;
}

export const DEFAULT_CARTRIDGE: Cartridge = {
  skyColor: '#2B2158',
  catColor: '#F2A03D',
  speed: 3,
  score: 13,
};

/** Which chapter first wrote each line — the file grows, it never appears whole. */
export type SourceKey = keyof Cartridge;

export const WRITTEN_IN: Record<SourceKey, number> = {
  score: 1,
  skyColor: 3,
  catColor: 3,
  speed: 8,
};

/** The name each value goes by in the lost language. */
export const LABEL: Record<SourceKey, string> = {
  skyColor: 'sky.color',
  catColor: 'cat.color',
  speed: 'cat.speed',
  score: 'score',
};

// ── the hero ────────────────────────────────────────────────────────────────
// 16x16, same pixel vocabulary as the Chapter 4 SpriteForge: K outline, O fur,
// D stripe, W snow, P nose, G eyes. Kept here so the preview can recolour O and
// D live — proving "a colour is a number" by moving one number.

export const SPRITE: string[] = [
  '................',
  '..KK......KK....',
  '.KOOK....KOOK...',
  '.KOOOKKKKOOOK...',
  '.KOOOOOOOOOOK...',
  '.KOGGOOOOGGOK...',
  '.KOGGOWWOGGOK...',
  '.KOOOWPPWOOOK...',
  '.KOOOOOOOOOOK...',
  '.KOOOOOOOOOOKK..',
  '.KOOOOOOOOOOOOK.',
  'KOOOOOOOOOOOOOK.',
  'KOODDOOOODDOOOK.',
  'KOODDOOOODDOODK.',
  '.KOOOOOOOOOOOK..',
  '..KKKKKKKKKKK...',
];

/** Darken a hex colour — used so the stripe follows the fur the reader picks. */
export const shade = (hex: string, amount: number): string => {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((n >> 16) & 255) * amount);
  const g = clamp(((n >> 8) & 255) * amount);
  const b = clamp((n & 255) * amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

export const spriteColors = (catColor: string): Record<string, string> => ({
  K: '#232323',
  O: catColor,
  D: shade(catColor, 0.78),
  W: '#FFFFFF',
  P: '#F27DA0',
  G: '#7CC94E',
});

// ── the tiny language ───────────────────────────────────────────────────────
// Deliberately small enough to hold in your head, in the spirit of Canon's
// "Cant". Every line is `name = value`. That is the whole grammar.
//
// Unlike Cant it is not invented for its own sake: the book's premise is a real
// language that was FORGOTTEN, so a fragmentary surviving syntax is the plot,
// not a shortcut. Sparse documentation is diegetic.

export interface ParseResult {
  cartridge: Cartridge;
  /** In-world complaints, keyed to the 0-indexed line that caused them. */
  errors: { line: number; message: string }[];
}

const BY_LABEL = Object.fromEntries(
  (Object.keys(LABEL) as SourceKey[]).map((k) => [LABEL[k], k])
) as Record<string, SourceKey>;

const parseValue = (key: SourceKey, raw: string): number | string | null => {
  if (key === 'skyColor' || key === 'catColor') {
    return /^#[0-9a-f]{6}$/i.test(raw) ? raw.toUpperCase() : null;
  }
  if (/^0b[01]+$/i.test(raw)) return parseInt(raw.slice(2), 2);
  if (/^\d+$/.test(raw)) return parseInt(raw, 10);
  return null;
};

/** Parse the whole file. Never throws — a broken line is a joke, not a crash. */
export const parse = (text: string): ParseResult => {
  const cartridge = { ...DEFAULT_CARTRIDGE };
  const errors: ParseResult['errors'] = [];

  text.split('\n').forEach((line, i) => {
    const src = line.trim();
    if (!src || src.startsWith('--')) return;

    const eq = src.indexOf('=');
    if (eq === -1) {
      errors.push({ line: i, message: `"${src}" — I don't know what to DO with that.` });
      return;
    }

    const name = src.slice(0, eq).trim();
    const raw = src.slice(eq + 1).trim();
    const key = BY_LABEL[name];

    if (!key) {
      errors.push({ line: i, message: `Nothing here is called "${name}".` });
      return;
    }

    const value = parseValue(key, raw);
    if (value === null) {
      errors.push({
        line: i,
        message:
          key === 'skyColor' || key === 'catColor'
            ? `"${raw}" is not a colour. Colours look like #FF9933.`
            : `"${raw}" is not a number I can count to.`,
      });
      return;
    }

    (cartridge as Record<string, unknown>)[key] = value;
  });

  return { cartridge, errors };
};

/** Render a cartridge back out as source — how each tier hands off to the next. */
export const toSource = (c: Cartridge, upToChapter = 99): string =>
  (Object.keys(LABEL) as SourceKey[])
    .filter((k) => WRITTEN_IN[k] <= upToChapter)
    .sort((a, b) => WRITTEN_IN[a] - WRITTEN_IN[b])
    .map((k) => {
      const value =
        k === 'score' ? `0b${c.score.toString(2)}` : String(c[k]);
      return `${LABEL[k].padEnd(9)} = ${value}`;
    })
    .join('\n');
