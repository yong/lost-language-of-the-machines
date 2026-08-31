// format.ts — the CATVENTURE cartridge, as bytes.
//
// 128 bytes, laid out so that EVERY region means something visible. That
// density is the whole point: a real .wasm binary for a toy program is mostly
// type tables and section headers, so a kid scrolling it finds nothing. Here,
// almost any byte you poke changes something you can see.
//
// The shape is not invented for convenience — it mirrors how real cartridges
// were laid out (magic number, header fields, a palette table, a sprite table),
// so the late-book reveal that real binaries look like this is honest.

export const ROM_SIZE = 0x80;

export interface Region {
  id: string;
  label: string;
  start: number;
  end: number; // inclusive
  hue: string;
  blurb: string;
}

export const REGIONS: Region[] = [
  { id: 'magic',   label: 'MAGIC',   start: 0x00, end: 0x03, hue: '#64748b',
    blurb: 'Four letters that say what kind of file this is. Break these and nothing loads at all.' },
  { id: 'version', label: 'VERSION', start: 0x04, end: 0x04, hue: '#64748b',
    blurb: 'Which version of the cartridge format this is.' },
  { id: 'speed',   label: 'SPEED',   start: 0x05, end: 0x05, hue: '#f59e0b',
    blurb: 'How fast the cat bobs. One byte. One number.' },
  { id: 'score',   label: 'SCORE',   start: 0x06, end: 0x07, hue: '#22c55e',
    blurb: 'Two bytes make one bigger number. 0x00 0x0D is 13.' },
  { id: 'title',   label: 'TITLE',   start: 0x08, end: 0x17, hue: '#38bdf8',
    blurb: 'Text. Each byte is one letter — 0x43 is C, 0x41 is A. You can read it in the right-hand column.' },
  { id: 'palette', label: 'PALETTE', start: 0x20, end: 0x31, hue: '#f472b6',
    blurb: 'Six colours, three bytes each: red, green, blue. A colour really is just a number.' },
  { id: 'sprite',  label: 'SPRITE',  start: 0x40, end: 0x7f, hue: '#a78bfa',
    blurb: '64 bytes, one per pixel of an 8x8 picture. Each byte picks a colour from the palette.' },
];

export const regionAt = (offset: number): Region | undefined =>
  REGIONS.find((r) => offset >= r.start && offset <= r.end);

// ── the shipped cartridge ───────────────────────────────────────────────────

const PALETTE_RGB = [
  [0x2b, 0x21, 0x58], // 0 background
  [0x23, 0x23, 0x23], // 1 outline
  [0xff, 0x99, 0x33], // 2 fur
  [0xff, 0xff, 0xff], // 3 white
  [0xf2, 0x7d, 0xa0], // 4 nose
  [0x7c, 0xc9, 0x4e], // 5 eyes
];

// prettier-ignore
const SPRITE_8 = [
  0,1,0,0,0,0,1,0,
  1,2,1,0,0,1,2,1,
  1,2,2,1,1,2,2,1,
  1,2,5,2,2,5,2,1,
  1,2,2,2,2,2,2,1,
  1,2,2,4,4,2,2,1,
  0,1,2,2,2,2,1,0,
  0,0,1,1,1,1,0,0,
];

export const freshRom = (): Uint8Array => {
  const b = new Uint8Array(ROM_SIZE);
  b.set([0x43, 0x41, 0x54, 0x56], 0x00);        // "CATV"
  b[0x04] = 0x01;                                // version
  b[0x05] = 0x03;                                // speed
  b[0x06] = 0x00; b[0x07] = 0x0d;                // score = 13
  const title = 'CATVENTURE      ';              // 16 bytes
  for (let i = 0; i < 16; i++) b[0x08 + i] = title.charCodeAt(i);
  PALETTE_RGB.flat().forEach((v, i) => { b[0x20 + i] = v; });
  SPRITE_8.forEach((v, i) => { b[0x40 + i] = v; });
  return b;
};

// ── reading the cartridge back out ──────────────────────────────────────────

export interface Cart {
  ok: boolean;
  fault?: string;
  speed: number;
  score: number;
  title: string;
  palette: string[];
  sprite: number[];
}

const hex2 = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();

/** Decode the ROM the way the console would. Refuses a bad magic number, the
 *  way a real machine refuses a cartridge it doesn't recognise. */
export const readCart = (b: Uint8Array): Cart => {
  const magic = String.fromCharCode(b[0], b[1], b[2], b[3]);
  const palette: string[] = [];
  for (let i = 0; i < 6; i++) {
    palette.push(`#${hex2(b[0x20 + i * 3])}${hex2(b[0x21 + i * 3])}${hex2(b[0x22 + i * 3])}`);
  }
  const cart: Cart = {
    ok: magic === 'CATV',
    speed: b[0x05],
    score: (b[0x06] << 8) | b[0x07],
    title: String.fromCharCode(...b.slice(0x08, 0x18)).replace(/\0/g, ' ').trimEnd(),
    palette,
    sprite: Array.from(b.slice(0x40, 0x80)),
  };
  if (!cart.ok) {
    cart.fault = `This is not a cartridge. The first four bytes should spell CATV. They spell "${magic.replace(/[^\x20-\x7e]/g, '?')}".`;
  } else if (b[0x04] !== 0x01) {
    cart.ok = false;
    cart.fault = `Cartridge version ${b[0x04]}. This console only knows version 1.`;
  }
  return cart;
};

/** Printable character for the ASCII column — the gutter where TITLE gives
 *  itself away without any search tool at all. */
export const asciiOf = (byte: number) =>
  byte >= 32 && byte < 127 ? String.fromCharCode(byte) : '·';

export const toHex = hex2;

/** Find every offset where these bytes appear — "search for what you can see". */
export const findBytes = (rom: Uint8Array, needle: number[]): number[] => {
  const hits: number[] = [];
  outer: for (let i = 0; i <= rom.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) if (rom[i + j] !== needle[j]) continue outer;
    hits.push(i);
  }
  return hits;
};

export const hexToBytes = (hex: string): number[] => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
