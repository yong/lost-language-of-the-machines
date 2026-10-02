// The cover of "Two Doors Can Add" (/lab/adder): a circuit board with a
// signal travelling through it.
//
// The author asked for "a signal travel through a circuit board" after the
// first cover (the score board counting to itself) was neither interesting nor
// beautiful. So: a dark green board, copper traces, and the chapter's own
// circuit in the middle — inputs A and B, an XOR chip and an AND chip. Every
// seven seconds two pulses of light leave A and B, run down the copper and
// into both chips. The XOR chip flashes red and stays dark (one AND one is not
// "just one"); the AND chip lights, fires, the CARRY lamp comes on and the
// carry runs off the edge of the board toward the next column. It shows the
// mechanism without saying the answer — the chapter says it.
//
// Around it, the rest of the board: traces routed on a grid (seeded, so the
// server render matches), some of them carrying their own faint pulses, so the
// whole board hums.
//
// Drawn in the cover art's 1024×1400 space with `slice`; a phone sees only
// x 188–836 and the title covers below y ≈ 935, so the circuit lives in that
// window. Pulses are CSS dash animations on SVG paths — no JS clock. Reduced
// motion: the board at rest, with the circuit shown in its finished state.

const W = 1024, H = 1400;
const CYCLE = 7; // seconds
const FADE = 90; // % of the cycle at which the lit circuit starts to fade

const mulberry32 = (a: number) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// ── the circuit: inputs A and B, XOR above AND ──────────────────────────────
const CHIP = { x: 402, w: 220, h: 92 };
const XOR_Y = 356, AND_Y = 598;
const LED_SUM = { x: 512, y: 512 }, LED_CARRY = { x: 512, y: 790 };

/** each wire, and when (in % of the cycle) a signal runs along it */
const WIRES: Array<{ id: string; d: string; s: number; e: number }> = [
  { id: 'a1', d: 'M300 172 V402 H402', s: 4, e: 20 },
  { id: 'b1', d: 'M724 172 V402 H622', s: 4, e: 20 },
  { id: 'a2', d: 'M300 402 V644 H402', s: 13, e: 30 },
  { id: 'b2', d: 'M724 402 V644 H622', s: 13, e: 30 },
  { id: 'ao', d: `M512 ${AND_Y + CHIP.h} V${LED_CARRY.y - 22}`, s: 33, e: 40 },
  { id: 'cy', d: `M512 ${LED_CARRY.y + 22} V860 H330 L282 908 H120`, s: 43, e: 64 },
];
const SUM_WIRE = `M512 ${XOR_Y + CHIP.h} V${LED_SUM.y - 22}`;

// ── the rest of the board: traces routed on a grid ──────────────────────────
const G = 22;
const COLS = Math.ceil(W / G), ROWS = Math.ceil(H / G);
// Only the circuit's own parts are kept clear — the first try cleared the
// whole rectangle round it, so on a phone the board looked bare.
const KEEPOUT: Array<[number, number, number, number]> = [
  [256, 100, 344, 200], [680, 100, 768, 200],       // pads A and B
  [282, 140, 318, 662], [706, 140, 742, 662],       // their wires down
  [300, 388, 402, 416], [622, 388, 724, 416],       // into XOR
  [300, 630, 402, 658], [622, 630, 724, 658],       // into AND
  [378, 330, 646, 466], [378, 572, 646, 708],       // the chips and pins
  [486, 440, 538, 880],                             // lamps and their wires
  [540, 488, 640, 536], [540, 766, 680, 814],       // SUM / CARRY labels
  [330, 228, 694, 300],                             // silkscreen title
  [100, 840, 540, 924],                             // the carry's road off the board
];
const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

interface Trace { pts: [number, number][]; pulse?: { dur: number; delay: number }; part?: 'r' | 'c' }

const route = (): Trace[] => {
  const rand = mulberry32(256);
  const used = new Uint8Array(COLS * ROWS);
  const at = (c: number, r: number) => r * COLS + c;
  const inside = (c: number, r: number) => c > 0 && r > 0 && c < COLS - 1 && r < ROWS - 1;
  for (const [x0, y0, x1, y1] of KEEPOUT)
    for (let r = Math.floor(y0 / G); r <= Math.ceil(y1 / G); r++)
      for (let c = Math.floor(x0 / G); c <= Math.ceil(x1 / G); c++) if (inside(c, r)) used[at(c, r)] = 1;
  // free, and not touching anything but the trace's own last cell
  const clear = (c: number, r: number, pc: number, pr: number) => {
    if (!inside(c, r) || used[at(c, r)]) return false;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      const nc = c + dc, nr = r + dr;
      if ((nc === pc && nr === pr) || !inside(nc, nr)) continue;
      if (used[at(nc, nr)] === 2) return false;
    }
    return true;
  };
  const traces: Trace[] = [];
  for (let n = 0; n < 900 && traces.length < 120; n++) {
    let c = 1 + Math.floor(rand() * (COLS - 2)), r = 1 + Math.floor(rand() * (ROWS - 2));
    if (!clear(c, r, -9, -9)) continue;
    let d = Math.floor(rand() * 4) * 2;        // start straight: H or V
    const cells: [number, number][] = [[c, r]];
    const want = 5 + Math.floor(rand() * 16);
    while (cells.length < want) {
      if (rand() < 0.16) d = (d + (rand() < 0.5 ? 1 : 7)) % 8; // a 45° bend
      const [dc, dr] = DIRS[d];
      const [pc, pr] = cells[cells.length - 1];
      if (!clear(pc + dc, pr + dr, pc, pr)) break;
      cells.push([pc + dc, pr + dr]);
    }
    if (cells.length < 5) continue;
    for (const [cc, rr] of cells) used[at(cc, rr)] = 2;
    // keep only the corners, so each trace is a few clean segments
    const pts: [number, number][] = cells
      .filter((p, i, a) => i === 0 || i === a.length - 1 ||
        (p[0] - a[i - 1][0] !== a[i + 1][0] - p[0] || p[1] - a[i - 1][1] !== a[i + 1][1] - p[1]))
      .map(([cc, rr]) => [cc * G + G / 2, rr * G + G / 2]);
    traces.push({
      pts,
      pulse: rand() < 0.34 ? { dur: 3.5 + rand() * 4.5, delay: -rand() * 9 } : undefined,
      part: rand() < 0.3 ? (rand() < 0.6 ? 'r' : 'c') : undefined,
    });
  }
  return traces;
};
const TRACES = route();
const poly = (pts: [number, number][]) => 'M' + pts.map(([x, y]) => `${x} ${y}`).join(' L');

// ── the timing, written once as keyframes ───────────────────────────────────
const kf = [
  // a comet: a short dash that runs the length of a wire, then is gone
  ...WIRES.map(({ id, s, e }) =>
    `@keyframes c-${id}{0%,${s}%{stroke-dashoffset:11;opacity:0}${s + 0.4}%{opacity:1}${e}%{stroke-dashoffset:-93;opacity:1}${e + 1.5}%,100%{stroke-dashoffset:-93;opacity:0}}`),
  // the wire it leaves energised behind it
  ...WIRES.map(({ id, s, e }) =>
    `@keyframes t-${id}{0%,${s}%{stroke-dashoffset:100;opacity:0}${s + 0.4}%{opacity:1}${e}%{stroke-dashoffset:0;opacity:1}${FADE}%{opacity:1}${FADE + 6}%,100%{stroke-dashoffset:0;opacity:0}}`),
  `@keyframes lit-in{0%,4%{opacity:0}6%,${FADE}%{opacity:1}${FADE + 6}%,100%{opacity:0}}`,
  `@keyframes lit-and{0%,30%{opacity:0}32%,${FADE}%{opacity:1}${FADE + 6}%,100%{opacity:0}}`,
  `@keyframes lit-carry{0%,40%{opacity:0}42%,${FADE}%{opacity:1}${FADE + 6}%,100%{opacity:0}}`,
  `@keyframes xor-no{0%,20%{opacity:0}21.5%{opacity:1}24%{opacity:.25}26%{opacity:1}31%,100%{opacity:0}}`,
  `@keyframes hum{from{stroke-dashoffset:4}to{stroke-dashoffset:-320}}`,
  // one class per animation, so reduced motion's \`.cc .run{animation:none}\`
  // outranks them (an inline animation-name would beat it and keep running)
  ...[...WIRES.flatMap((w) => [`c-${w.id}`, `t-${w.id}`]), 'lit-in', 'lit-and', 'lit-carry', 'xor-no']
    .map((n) => `.k-${n}{animation-name:${n}}`),
].join('\n');

const css = `
${kf}
.cc .run{animation-duration:${CYCLE}s;animation-iteration-count:infinite;animation-timing-function:linear}
.cc .hum{animation:hum linear infinite}
@media (prefers-reduced-motion: reduce){
  .cc .run,.cc .hum{animation:none}
  .cc .comet{opacity:0}
}`;

const Pad: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 6 }) => (
  <g><circle cx={x} cy={y} r={r} fill="#d6ad55" /><circle cx={x} cy={y} r={r * 0.42} fill="#05170f" /></g>
);

const Chip: React.FC<{ y: number; label: string; id: string }> = ({ y, label, id }) => {
  const { x, w, h } = CHIP;
  const pins = [0.3, 0.7];
  return (
    <g>
      {/* pins */}
      {pins.map((p) => <rect key={`l${p}`} x={x - 14} y={y + h * p - 5} width={16} height={10} rx={2} fill="#d6ad55" />)}
      {pins.map((p) => <rect key={`r${p}`} x={x + w - 2} y={y + h * p - 5} width={16} height={10} rx={2} fill="#d6ad55" />)}
      <rect x={x + w / 2 - 5} y={y + h - 2} width={10} height={16} rx={2} fill="#d6ad55" />
      {/* body */}
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#121519" stroke="#2a2f36" strokeWidth={2} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={10} rx={5} fill="#ffffff" opacity={0.05} />
      <circle cx={x + 18} cy={y + 18} r={5} fill="#262b31" />
      <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontWeight={700} fontSize={38} fill="#e9efe9" letterSpacing={4}>{label}</text>
      <text x={x + w - 10} y={y - 10} textAnchor="end" fontFamily="ui-monospace, Menlo, monospace" fontSize={15} fill="#cfe3d6" opacity={0.55}>{id}</text>
      {/* the chip deciding: AND lights green, XOR flashes red and stays dark */}
      {label === 'AND' ? (
        <rect className="run k-lit-and" x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={11}
              fill="none" stroke="#37f08a" strokeWidth={4} filter="url(#cc-glow)" />
      ) : (
        <rect className="run k-xor-no" style={{ opacity: 0 }} x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={11}
              fill="none" stroke="#f87171" strokeWidth={4} filter="url(#cc-glow)" />
      )}
    </g>
  );
};

const Lamp: React.FC<{ x: number; y: number; label: string; lit: boolean }> = ({ x, y, label, lit }) => (
  <g>
    {lit && (
      <circle className="run k-lit-carry" cx={x} cy={y} r={62} fill="url(#cc-lamp)" />
    )}
    <circle cx={x} cy={y} r={20} fill={lit ? '#3a2a08' : '#2a1012'} stroke="#d6ad55" strokeWidth={3} />
    {lit && <circle className="run k-lit-carry" cx={x} cy={y} r={15} fill="#fde68a" />}
    <text x={x + 36} y={y + 7} fontFamily="ui-monospace, Menlo, monospace" fontSize={20} fontWeight={700} fill="#cfe3d6" opacity={0.75} letterSpacing={2}>{label}</text>
  </g>
);

const CircuitCover: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="cc absolute inset-0 h-full w-full" aria-hidden>
    <style>{css}</style>
    <defs>
      <radialGradient id="cc-board" cx="50%" cy="34%" r="75%">
        <stop offset="0" stopColor="#11523f" />
        <stop offset="0.55" stopColor="#083326" />
        <stop offset="1" stopColor="#020b08" />
      </radialGradient>
      <radialGradient id="cc-lamp">
        <stop offset="0" stopColor="#fbbf24" stopOpacity="0.75" />
        <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="cc-in">
        <stop offset="0" stopColor="#67e8f9" stopOpacity="0.7" />
        <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
      </radialGradient>
      <filter id="cc-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /></filter>
      <filter id="cc-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2" /></filter>
      <pattern id="cc-weave" width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 6 L6 0" stroke="#ffffff" strokeOpacity="0.018" strokeWidth="1" />
      </pattern>
    </defs>

    {/* the board */}
    <rect width={W} height={H} fill="url(#cc-board)" />
    <rect width={W} height={H} fill="url(#cc-weave)" />

    {/* the rest of the board, and its own faint traffic */}
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {TRACES.map((t, i) => <path key={i} d={poly(t.pts)} stroke="#c79a42" strokeOpacity={0.55} strokeWidth={5} />)}
      {TRACES.map((t, i) => t.pulse && (
        <path key={`p${i}`} className="hum comet" d={poly(t.pts)} pathLength={100} stroke="#a5f3fc" strokeWidth={5} filter="url(#cc-soft)"
              strokeDasharray="5 320" strokeDashoffset={4}
              style={{ animationDuration: `${t.pulse.dur.toFixed(2)}s`, animationDelay: `${t.pulse.delay.toFixed(2)}s` }} />
      ))}
    </g>
    {/* a resistor or capacitor sitting on the first leg of some traces */}
    {TRACES.map((t, i) => {
      if (!t.part || t.pts.length < 2) return null;
      const [[x0, y0], [x1, y1]] = t.pts;
      if (Math.hypot(x1 - x0, y1 - y0) < G * 3) return null;
      const a = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      return (
        <g key={`k${i}`} transform={`translate(${cx} ${cy}) rotate(${a})`}>
          <rect x={-17} y={-8} width={34} height={16} rx={2} fill={t.part === 'r' ? '#1a1d1c' : '#8a6a3b'} />
          <rect x={-17} y={-8} width={7} height={16} fill="#d6ad55" /><rect x={10} y={-8} width={7} height={16} fill="#d6ad55" />
        </g>
      );
    })}
    {TRACES.map((t, i) => <g key={`e${i}`} opacity={0.85}><Pad x={t.pts[0][0]} y={t.pts[0][1]} r={5} /><Pad x={t.pts[t.pts.length - 1][0]} y={t.pts[t.pts.length - 1][1]} r={5} /></g>)}

    {/* silkscreen */}
    <g fontFamily="ui-monospace, Menlo, monospace" fill="#cfe3d6">
      <text x={512} y={254} textAnchor="middle" fontSize={22} fontWeight={700} letterSpacing={8} opacity={0.6}>CATVENTURE</text>
      <text x={512} y={284} textAnchor="middle" fontSize={15} letterSpacing={4} opacity={0.4}>SCORE ADDER · COLUMN 1</text>
      <text x={318} y={846} fontSize={15} letterSpacing={2} opacity={0.55}>← NEXT COLUMN</text>
    </g>

    {/* the circuit: copper first */}
    <g fill="none" stroke="#d6ad55" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.9}>
      {WIRES.map((w) => <path key={w.id} d={w.d} />)}
      <path d={SUM_WIRE} />
    </g>
    <Pad x={300} y={402} r={9} /><Pad x={724} y={402} r={9} />

    {/* inputs A and B, each holding a 1 */}
    {[{ x: 300, l: 'A' }, { x: 724, l: 'B' }].map(({ x, l }) => (
      <g key={l}>
        <circle className="run k-lit-in" cx={x} cy={150} r={58} fill="url(#cc-in)" />
        <circle cx={x} cy={150} r={24} fill="#d6ad55" />
        <circle cx={x} cy={150} r={12} fill="#05170f" />
        <text x={x} y={108} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize={22} fontWeight={700} fill="#cfe3d6" opacity={0.75}>{l}</text>
        <text className="run k-lit-in" x={x + (l === 'A' ? -44 : 44)} y={158} textAnchor="middle"
              fontFamily="ui-monospace, Menlo, monospace" fontSize={30} fontWeight={700} fill="#cffafe">1</text>
      </g>
    ))}

    {/* the signal: each wire lights behind a running pulse */}
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {WIRES.map((w) => (
        <g key={w.id}>
          <path className={`run k-t-${w.id}`} d={w.d} pathLength={100} filter="url(#cc-glow)"
                stroke="#22d3ee" strokeOpacity={0.5} strokeWidth={18} strokeDasharray="100 101" strokeDashoffset={0} />
          <path className={`run k-t-${w.id}`} d={w.d} pathLength={100}
                stroke="#67e8f9" strokeWidth={7} strokeDasharray="100 101" strokeDashoffset={0} />
          <path className={`run comet k-c-${w.id}`} d={w.d} pathLength={100}
                stroke="#22d3ee" strokeOpacity={0.8} strokeWidth={30} strokeDasharray="11 200" strokeDashoffset={11} filter="url(#cc-glow)" />
          <path className={`run comet k-c-${w.id}`} d={w.d} pathLength={100}
                stroke="#f4feff" strokeWidth={8} strokeDasharray="11 200" strokeDashoffset={11} />
        </g>
      ))}
    </g>

    <Chip y={XOR_Y} label="XOR" id="U1" />
    <Chip y={AND_Y} label="AND" id="U2" />
    <Lamp x={LED_SUM.x} y={LED_SUM.y} label="SUM" lit={false} />
    <Lamp x={LED_CARRY.x} y={LED_CARRY.y} label="CARRY" lit />
  </svg>
);

export default CircuitCover;
