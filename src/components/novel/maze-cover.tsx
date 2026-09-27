// The cover of /lab/level256 is the game itself, in ATTRACT MODE — the demo an
// arcade cabinet plays to itself when nobody is at the controls.
//
// It tells the premise before a word is read: the cat clears LEVEL 253, then
// 254, and the maze comes back each time; then it reaches LEVEL 255 and stops
// on READY?. A whole week of playing, and one level left — which is the one the
// reader is about to play. The maze is the chapter's own sheet, so the cover
// is the same game the thread hands them, not a picture of one.
//
// Binary snow belongs to Chapter One. A chapter whose subject MOVES should move
// on its cover in its own way; snow on everything stops meaning anything.
//
// Deterministic (no Math.random): a breadth-first walk to the nearest dot with
// a fixed tie-break, so the server render and every replay are identical.
// Drawn in the cover art's own 1024×1400 space and cropped the same way
// (`slice` = background-size: cover), over an empty cabinet.
import { useEffect, useState } from 'react';
import { FRESH, START, W, CAT, DOTS, move } from '@/components/novel/maze-toys';

const FIRST = 253, LAST = 255;
const STEP_MS = 110;

// the screen inside the cabinet art (see public/level256/cabinet.svg)
const CELL = 68, X0 = 240, Y0 = 290;
const cx = (i: number) => X0 + (i % W) * CELL;
const cy = (i: number) => Y0 + Math.floor(i / W) * CELL;

interface Attract { level: number; sheet: number[]; pos: number }
const fresh = (level: number): Attract => ({ level, sheet: [...FRESH], pos: START });

/** One step toward the nearest dot (walls are 1; dots 2; nothing 0). */
const stepToward = (sheet: number[], from: number): number => {
  const prev = new Map<number, number>([[from, -1]]);
  const queue = [from];
  while (queue.length) {
    const at = queue.shift()!;
    if (sheet[at] === 2) {
      let p = at;
      while (prev.get(p) !== from && prev.get(p) !== -1) p = prev.get(p)!;
      return p;
    }
    for (const d of [1, 2, 3, 4]) {
      const n = move(at, d);
      if (n >= 0 && sheet[n] !== 1 && !prev.has(n)) { prev.set(n, at); queue.push(n); }
    }
  }
  return from;
};

const advance = (s: Attract): Attract => {
  if (s.level >= LAST) return s;
  const pos = stepToward(s.sheet, s.pos);
  const sheet = s.sheet[pos] === 2 ? s.sheet.map((n, i) => (i === pos ? 0 : n)) : s.sheet;
  return sheet.includes(2) ? { ...s, pos, sheet } : fresh(s.level + 1);
};

const MazeCover: React.FC = () => {
  const [s, setS] = useState<Attract>(() => fresh(FIRST));

  useEffect(() => {
    // Reduced motion: go straight to the still it ends on.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setS(fresh(LAST)); return; }
    const id = window.setInterval(() => setS((p) => advance(p)), STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  const ready = s.level >= LAST;
  const px = CELL / 8; // the cat is 8 pixels wide

  return (
    <svg viewBox="0 0 1024 1400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <image href="/level256/cabinet.svg" x="0" y="0" width="1024" height="1400" />
      <defs>
        <clipPath id="attract-screen"><rect x="226" y="176" width="572" height="770" rx="22" /></clipPath>
        <radialGradient id="attract-glow"><stop offset="0" stopColor="#ff9933" stopOpacity="0.45" /><stop offset="1" stopColor="#ff9933" stopOpacity="0" /></radialGradient>
      </defs>
      <g clipPath="url(#attract-screen)">
        <text x="256" y="250" fontFamily="'Courier New',monospace" fontSize="46" fontWeight="700" fill="#fde68a">LEVEL {s.level}</text>
        {s.sheet.map((n, i) => n === 1
          ? <rect key={i} x={cx(i) + 2} y={cy(i) + 2} width={CELL - 4} height={CELL - 4} rx="7" fill="#1e40af" />
          : n === 2 ? <circle key={i} cx={cx(i) + CELL / 2} cy={cy(i) + CELL / 2} r="6" fill="#fef3c7" /> : null)}
        {/* the same counter the playable card shows */}
        <text x="784" y="904" textAnchor="end" fontFamily="'Courier New',monospace" fontSize="34" fill="#e5e7eb">
          dots {DOTS - s.sheet.filter((n) => n === 2).length} / {DOTS}
        </text>
        {/* keyed by level so a new maze puts the cat back without gliding it through the walls */}
        <g key={s.level} style={{ transform: `translate(${cx(s.pos)}px, ${cy(s.pos) + px / 2}px)`, transition: `transform ${STEP_MS}ms linear` }}>
          <circle cx={CELL / 2} cy={CELL / 2 - px / 2} r={CELL * 0.8} fill="url(#attract-glow)" />
          {CAT.flatMap((row, r) => [...row].map((ch, c) => (ch === '#'
            ? <rect key={`${r},${c}`} x={c * px} y={r * px} width={px + 0.3} height={px + 0.3} fill="#ff9933" /> : null)))}
        </g>
        {ready && (
          <g>
            <rect x="226" y={Y0 + 3 * CELL + 6} width="572" height={CELL * 2 - 12} fill="#000" opacity="0.6" />
            <text x="512" y={Y0 + 4 * CELL + 24} textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="72" fontWeight="700" fill="#fde68a" letterSpacing="8">
              READY?
              <animate attributeName="opacity" values="1;1;0.15;1" dur="1.4s" repeatCount="indefinite" />
            </text>
          </g>
        )}
        {/* scanlines, over everything on the glass */}
        {Array.from({ length: 154 }, (_, k) => <rect key={k} x="226" y={176 + k * 5} width="572" height="1.4" fill="#000" opacity="0.28" />)}
      </g>
      <path d="M246,196 L520,196 L360,520 L246,700 Z" fill="#fff" opacity="0.035" />
      {/* Starlax's note, stuck on the glass */}
      <g transform="translate(690 146) rotate(6)" fontFamily="'Comic Sans MS','Marker Felt',cursive" fontWeight="700" textAnchor="middle">
        <rect x="-6" y="4" width="132" height="116" fill="#000" opacity="0.35" />
        <rect x="-10" y="0" width="132" height="116" fill="#fde047" />
        <rect x="26" y="-10" width="60" height="20" fill="#e5e7eb" opacity="0.75" />
        <text x="56" y="44" fontSize="25" fill="#1e1b4b">MY GAME</text>
        <text x="56" y="74" fontSize="14" fill="#b91c1c">DO NOT TOUCH</text>
        <text x="92" y="102" fontSize="20" fontWeight="400" fill="#1e1b4b">— S</text>
      </g>
    </svg>
  );
};

export default MazeCover;
