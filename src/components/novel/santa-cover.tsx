// The cover of "Two Doors Can Add" (/lab/adder): Santa's Naughty-or-Nice
// Machine. The author's idea — "a logic gate for Santa to check if a kid is
// naughty or not" — and the funniest way into a chapter about doors.
//
// A letter to Santa slides into the machine. Three lamps on it read the
// three things that matter: 🪥 brushed teeth, 🙏 said please, 🐱 pulled the
// cat's tail. Teeth AND please go into one AND door; the cat goes through a
// NOT door, because pulling the cat's tail has to count AGAINST you; both
// answers go into a second AND door, and the chimney says the verdict.
//
//   Mia      teeth ✓  please ✓  cat ✗   →  🎁 NICE
//   Leo      teeth ✓  please ✓  cat ✓   →  coal (the NOT door shuts)
//   STARLAX  teeth ✓  please ✓  cat ✗ … a 🐾 lands on the switch → coal.
//            "NAUGHTY?!" — "(it was nova)"
//
// The picture is the lesson: Santa's machine is an AND door — one bad thing
// and it's coal — which is the chapter's first joke ("he should use an OR
// door." "then everyone is nice." "...that is the point of christmas").
//
// No snow (snow is Chapter One's): fairy lights twinkle along the top, and the
// wires are candy canes. Drawn in the cover art's 1024×1400 space; a phone
// sees x 188–836 and the title covers below y ≈ 935. A small timer steps the
// letters; every movement inside a step is CSS. Reduced motion: Starlax's
// verdict, at rest.
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const W = 1024, H = 1400;
const MONO = 'ui-monospace, Menlo, monospace';

interface Letter { name: string; teeth: boolean; please: boolean; cat: boolean; paw?: boolean }
const LETTERS: Letter[] = [
  { name: 'MIA', teeth: true, please: true, cat: false },
  { name: 'LEO', teeth: true, please: true, cat: true },
  { name: 'STARLAX', teeth: true, please: true, cat: false, paw: true },
];

type Phase = 'arrive' | 'lights' | 'paw' | 'signal' | 'verdict' | 'leave';
const STEPS: Array<[Phase, number]> = [['arrive', 900], ['lights', 900], ['paw', 1100], ['signal', 1800], ['verdict', 2600], ['leave', 450]];
const ORDER: Phase[] = STEPS.map(([p]) => p);
const after = (p: Phase, q: Phase) => ORDER.indexOf(p) >= ORDER.indexOf(q);

// ── the machine's layout ────────────────────────────────────────────────────
const COL = { teeth: 360, please: 512, cat: 664 };
const LAMP_Y = 268;
const AND1 = { x: 330, y: 400, w: 210, h: 70 };
const NOT = { x: COL.cat, y: 398 };
const AND2 = { x: 400, y: 562, w: 224, h: 70 };
const CHIMNEY = { x: 760, top: 735 };

const WIRE = {
  teeth: `M${COL.teeth} ${LAMP_Y + 18} V${AND1.y}`,
  please: `M${COL.please} ${LAMP_Y + 18} V${AND1.y}`,
  cat: `M${COL.cat} ${LAMP_Y + 18} V${NOT.y}`,
  x: `M435 ${AND1.y + AND1.h} V${AND2.y}`,
  y: `M${COL.cat} ${NOT.y + 86} V515 H590 V${AND2.y}`,
  n: `M512 ${AND2.y + AND2.h} V668 H${CHIMNEY.x} V${CHIMNEY.top}`,
};
/** when each wire's signal runs, in seconds into the signal step */
const STAGE: Record<keyof typeof WIRE, number> = { teeth: 0, please: 0, cat: 0, x: 0.55, y: 0.55, n: 1.1 };

const css = `
@keyframes sc-draw { from { stroke-dashoffset: 100 } to { stroke-dashoffset: 0 } }
@keyframes sc-comet { 0% { stroke-dashoffset: 12; opacity: 1 } 92% { opacity: 1 } 100% { stroke-dashoffset: -90; opacity: 0 } }
@keyframes sc-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes sc-flash { 0% { opacity: 0 } 25% { opacity: 1 } 50% { opacity: .2 } 75% { opacity: 1 } 100% { opacity: 0 } }
@keyframes sc-card-in { from { transform: translateX(-640px) rotate(-8deg) } to { transform: translateX(0) rotate(-2deg) } }
@keyframes sc-card-out { from { transform: translateX(0) rotate(-2deg) } to { transform: translateX(760px) rotate(6deg) } }
@keyframes sc-pop { 0% { transform: translateY(70px) scale(.4); opacity: 0 } 55% { transform: translateY(-14px) scale(1.08); opacity: 1 } 75% { transform: translateY(4px) scale(.98) } 100% { transform: translateY(0) scale(1) } }
@keyframes sc-paw { 0% { transform: translateY(-120px); opacity: 0 } 45% { transform: translateY(6px); opacity: 1 } 60% { transform: translateY(0) } 100% { transform: translateY(0); opacity: 1 } }
@keyframes sc-twinkle { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.sc .draw { animation: sc-draw .42s ease-out both }
.sc .comet { animation: sc-comet .5s linear both }
.sc .in { animation: sc-in .3s ease-out both }
.sc .flash { animation: sc-flash .7s ease-in-out both }
.sc .card-in { animation: sc-card-in .8s cubic-bezier(.2,.8,.3,1.1) both }
.sc .card-out { animation: sc-card-out .45s ease-in both }
.sc .pop { animation: sc-pop .7s cubic-bezier(.3,.7,.4,1) both; transform-box: fill-box; transform-origin: 50% 100% }
.sc .paw { animation: sc-paw .7s ease-out both }
.sc .bulb { animation: sc-twinkle ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .sc .draw, .sc .in, .sc .card-in, .sc .pop, .sc .paw { animation: none }
  .sc .comet, .sc .flash { display: none }
  .sc .bulb { animation: none; opacity: .85 }
}`;

// ── pieces ──────────────────────────────────────────────────────────────────

/** a candy-cane wire, and its signal when it carries one */
const Wire: React.FC<{ d: string; on: boolean; delay: number; run: boolean }> = ({ d, on, delay, run }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} stroke="#f5efe6" strokeWidth={10} />
    <path d={d} stroke="#d62839" strokeWidth={10} strokeDasharray="10 12" />
    {run && on && (
      <>
        <path className="draw" style={{ animationDelay: `${delay}s` }} d={d} pathLength={100} strokeDasharray="100 101"
              stroke="#ffd166" strokeOpacity={0.55} strokeWidth={24} filter="url(#sc-glow)" />
        <path className="draw" style={{ animationDelay: `${delay}s` }} d={d} pathLength={100} strokeDasharray="100 101"
              stroke="#fff3b0" strokeWidth={5} />
        <path className="comet" style={{ animationDelay: `${delay}s` }} d={d} pathLength={100} strokeDasharray="12 200"
              stroke="#ffffff" strokeWidth={9} filter="url(#sc-soft)" />
      </>
    )}
  </g>
);

const Chip: React.FC<{ x: number; y: number; w: number; h: number; label: string; ins: number[]; out: number;
  result: 'on' | 'no' | null; delay: number }> = ({ x, y, w, h, label, ins, out, result, delay }) => (
  <g>
    {ins.map((px) => <rect key={px} x={px - 6} y={y - 12} width={12} height={14} rx={2} fill="#e0b85a" />)}
    <rect x={out - 6} y={y + h - 2} width={12} height={14} rx={2} fill="#e0b85a" />
    <rect x={x} y={y} width={w} height={h} rx={10} fill="#16110f" stroke="#3b2e26" strokeWidth={2} />
    <rect x={x + 3} y={y + 3} width={w - 6} height={9} rx={4} fill="#ffffff" opacity={0.06} />
    <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={34} fill="#fdf6e3" letterSpacing={4}>{label}</text>
    {result === 'on' && (
      <rect className="in" style={{ animationDelay: `${delay}s` }} x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx={14}
            fill="none" stroke="#4ade80" strokeWidth={5} filter="url(#sc-glow)" />
    )}
    {result === 'no' && (
      <rect className="flash" style={{ animationDelay: `${delay}s` }} x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx={14}
            fill="none" stroke="#f87171" strokeWidth={5} filter="url(#sc-glow)" />
    )}
  </g>
);

const NotGate: React.FC<{ result: 'on' | 'no' | null; delay: number }> = ({ result, delay }) => {
  const { x, y } = NOT;
  const tri = `M${x - 46} ${y} H${x + 46} L${x} ${y + 64} Z`;
  return (
    <g>
      <rect x={x - 6} y={y - 12} width={12} height={14} rx={2} fill="#e0b85a" />
      <path d={tri} fill="#16110f" stroke="#3b2e26" strokeWidth={2} strokeLinejoin="round" />
      <circle cx={x} cy={y + 75} r={10} fill="#16110f" stroke="#e0b85a" strokeWidth={3} />
      <text x={x} y={y + 30} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={22} fill="#fdf6e3" letterSpacing={2}>NOT</text>
      {result === 'on' && <path className="in" style={{ animationDelay: `${delay}s` }} d={tri} fill="none" stroke="#4ade80" strokeWidth={5} filter="url(#sc-glow)" />}
      {result === 'no' && <path className="flash" style={{ animationDelay: `${delay}s` }} d={tri} fill="none" stroke="#f87171" strokeWidth={5} filter="url(#sc-glow)" />}
    </g>
  );
};

/** the letter to Santa, with its three lamps */
const Card: React.FC<{ l: Letter; phase: Phase; still: boolean }> = ({ l, phase, still }) => {
  const lit = (k: 'teeth' | 'please' | 'cat') => after(phase, 'lights') && (k !== 'cat' ? l[k] : l.cat || (!!l.paw && after(phase, 'signal')));
  const items: Array<['teeth' | 'please' | 'cat', string, string]> = [
    ['teeth', '🪥', 'brushed teeth'], ['please', '🙏', 'said please'], ['cat', '🐱', 'pulled its tail'],
  ];
  return (
    <g className={still ? '' : phase === 'leave' ? 'card-out' : phase === 'arrive' ? 'card-in' : ''}
       style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', transform: 'rotate(-2deg)' }}>
      <rect x={292} y={112} width={440} height={200} rx={10} fill="#000" opacity={0.3} transform="translate(6 8)" />
      <rect x={292} y={112} width={440} height={200} rx={10} fill="#fdf6e3" stroke="#d62839" strokeWidth={5} strokeDasharray="18 10" />
      <text x={316} y={152} fontFamily="Georgia, serif" fontStyle="italic" fontSize={24} fill="#5b2a1a">Dear Santa,</text>
      <text x={708} y={152} textAnchor="end" fontFamily={MONO} fontWeight={700} fontSize={22} fill="#7f1d1d">from {l.name}</text>
      {items.map(([k, emoji, label], i) => (
        <g key={k}>
          <text x={COL[k]} y={206} textAnchor="middle" fontSize={34}>{emoji}</text>
          <text x={COL[k]} y={236} textAnchor="middle" fontFamily={MONO} fontSize={14} fill="#5b2a1a">{label}</text>
          <circle cx={COL[k]} cy={LAMP_Y} r={16} fill="#3a2a22" stroke="#e0b85a" strokeWidth={3} />
          {lit(k) && (
            <circle className="in" style={{ animationDelay: k === 'cat' && l.paw ? '0s' : `${i * 0.22}s` }}
                    cx={COL[k]} cy={LAMP_Y} r={12} fill="#ffd166" filter="url(#sc-soft)" />
          )}
        </g>
      ))}
      {/* Nova's paw, landing on the cat switch */}
      {l.paw && after(phase, 'paw') && (
        <text className={still ? '' : 'paw'} x={COL.cat + 4} y={LAMP_Y + 14} textAnchor="middle" fontSize={40}>🐾</text>
      )}
    </g>
  );
};

/** the verdict: a present, or a lump of coal, out of the chimney */
const Verdict: React.FC<{ nice: boolean }> = ({ nice }) => (
  <g className="pop">
    {nice ? (
      <text x={CHIMNEY.x} y={712} textAnchor="middle" fontSize={68}>🎁</text>
    ) : (
      <g>
        {/* a pile of coal: faceted lumps, warm at the edges, so it cannot be
            mistaken for a stone or a mouse */}
        <ellipse cx={CHIMNEY.x} cy={692} rx={58} ry={30} fill="url(#sc-ember)" />
        {[[-26, 700, 1], [24, 702, 0.9], [0, 680, 1.15]].map(([dx, cy, k], j) => {
          const cx = CHIMNEY.x + dx, r = 20 * k;
          const pts = [[-1, 0.2], [-0.6, -0.8], [0.3, -1], [1, -0.3], [0.8, 0.7], [-0.3, 0.9]]
            .map(([px, py]) => `${(cx + px * r).toFixed(1)},${(cy + py * r * 0.85).toFixed(1)}`).join(' ');
          return (
            <g key={j}>
              <polygon points={pts} fill="#18181b" stroke="#3f3f46" strokeWidth={2} strokeLinejoin="round" />
              <polygon points={`${cx - r * 0.6},${cy - r * 0.68} ${cx + r * 0.3},${cy - r * 0.85} ${cx + r * 0.1},${cy - r * 0.1}`} fill="#3f3f46" opacity={0.8} />
              <circle cx={cx + r * 0.55} cy={cy + r * 0.35} r={3} fill="#fb923c" opacity={0.85} />
            </g>
          );
        })}
      </g>
    )}
  </g>
);

const SantaCover: React.FC = () => {
  const still = useReducedMotion();
  const [i, setI] = useState(still ? 2 : 0);
  const [phase, setPhase] = useState<Phase>(still ? 'verdict' : 'arrive');

  useEffect(() => {
    if (still) { setI(2); setPhase('verdict'); return; }
    let k = ORDER.indexOf(phase);
    const l = LETTERS[i];
    // a letter without a paw skips the paw step
    const dur = STEPS[k][1];
    const id = window.setTimeout(() => {
      k += 1;
      if (ORDER[k] === 'paw' && !l.paw) k += 1;
      if (k >= ORDER.length) { setI((i + 1) % LETTERS.length); setPhase('arrive'); }
      else setPhase(ORDER[k]);
    }, dur);
    return () => clearTimeout(id);
  }, [i, phase, still]);

  const l = LETTERS[i];
  const cat = l.cat || !!l.paw;            // after the paw, the cat switch is ON
  const x = l.teeth && l.please, y = !cat, nice = x && y;
  const run = after(phase, 'signal') && phase !== 'leave';
  const done = still || after(phase, 'verdict');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="sc absolute inset-0 h-full w-full" aria-hidden>
      <style>{css}</style>
      <defs>
        <radialGradient id="sc-board" cx="50%" cy="36%" r="78%">
          <stop offset="0" stopColor="#14523a" />
          <stop offset="0.55" stopColor="#0b3424" />
          <stop offset="1" stopColor="#04130d" />
        </radialGradient>
        <radialGradient id="sc-ember"><stop offset="0" stopColor="#f97316" stopOpacity="0.55" /><stop offset="1" stopColor="#f97316" stopOpacity="0" /></radialGradient>
        {/* userSpaceOnUse: a filter sized to its path's bounding box gets ZERO
            width on a perfectly vertical wire, and the glow and the pulse on
            the wires that start the signal simply vanished */}
        <filter id="sc-glow" filterUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="sc-soft" filterUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}><feGaussianBlur stdDeviation="1.6" /></filter>
        <pattern id="sc-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1.6" fill="#e0b85a" opacity="0.14" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#sc-board)" />
      <rect width={W} height={H} fill="url(#sc-dots)" />

      {/* fairy lights, not snow */}
      {[[120, 512], [512, 904]].map(([a, b], s) => (
        <g key={s}>
          <path d={`M${a} 56 Q${(a + b) / 2} 120 ${b} 56`} fill="none" stroke="#1f2a22" strokeWidth={3} />
          {Array.from({ length: 9 }, (_, k) => {
            const t = (k + 0.5) / 9, bx = a + (b - a) * t, by = 56 + 64 * 2 * t * (1 - t) + 8;
            const c = ['#f87171', '#4ade80', '#fde047', '#60a5fa'][(k + s) % 4];
            return (
              <g key={k}>
                <circle cx={bx} cy={by + 8} r={16} fill={c} opacity={0.18} />
                <circle className="bulb" style={{ animationDuration: `${1.4 + ((k * 7 + s * 3) % 5) * 0.35}s`, animationDelay: `${-((k * 3 + s) % 7) * 0.3}s` }}
                        cx={bx} cy={by + 8} r={8} fill={c} />
              </g>
            );
          })}
        </g>
      ))}

      {/* the wires; each carries a signal only if it is a 1 */}
      <Wire d={WIRE.teeth} on={l.teeth} delay={STAGE.teeth} run={run} key={`t${i}${run}`} />
      <Wire d={WIRE.please} on={l.please} delay={STAGE.please} run={run} key={`p${i}${run}`} />
      <Wire d={WIRE.cat} on={cat} delay={STAGE.cat} run={run} key={`c${i}${run}`} />
      <Wire d={WIRE.x} on={x} delay={STAGE.x} run={run} key={`x${i}${run}`} />
      <Wire d={WIRE.y} on={y} delay={STAGE.y} run={run} key={`y${i}${run}`} />
      <Wire d={WIRE.n} on={nice} delay={STAGE.n} run={run} key={`n${i}${run}`} />

      <g key={`g${i}${run}`}>
        <Chip {...AND1} label="AND" ins={[COL.teeth, COL.please]} out={435} delay={0.45}
              result={run ? (x ? 'on' : 'no') : null} />
        <NotGate result={run ? (y ? 'on' : 'no') : null} delay={0.45} />
        <Chip {...AND2} label="AND" ins={[435, 590]} out={512} delay={1.0}
              result={run ? (nice ? 'on' : x || y ? 'no' : null) : null} />
      </g>

      {/* the chimney */}
      <g>
        <rect x={CHIMNEY.x - 48} y={CHIMNEY.top + 20} width={96} height={150} fill="#8b2a1e" />
        {Array.from({ length: 6 }, (_, r) => (
          <g key={r}>
            <line x1={CHIMNEY.x - 48} x2={CHIMNEY.x + 48} y1={CHIMNEY.top + 20 + r * 25} y2={CHIMNEY.top + 20 + r * 25} stroke="#5c1a12" strokeWidth={3} />
            <line x1={CHIMNEY.x + (r % 2 ? -10 : 18)} x2={CHIMNEY.x + (r % 2 ? -10 : 18)} y1={CHIMNEY.top + 20 + r * 25} y2={CHIMNEY.top + 45 + r * 25} stroke="#5c1a12" strokeWidth={3} />
          </g>
        ))}
        <rect x={CHIMNEY.x - 60} y={CHIMNEY.top} width={120} height={24} rx={4} fill="#f5efe6" />
      </g>
      {done && <Verdict nice={nice} key={`v${i}`} />}

      {/* the read-out */}
      <g>
        <rect x={228} y={720} width={430} height={150} rx={16} fill="#0c0a09" stroke={done ? (nice ? '#4ade80' : '#f87171') : '#3b2e26'} strokeWidth={4} />
        <text x={443} y={792} textAnchor="middle" fontFamily={PIXEL_FONT} fontSize={done ? 64 : 40}
              fill={done ? (nice ? '#4ade80' : '#f87171') : '#6b7280'} letterSpacing={6}>
          {done ? (nice ? 'NICE' : l.paw ? 'NAUGHTY?!' : 'NAUGHTY') : 'CHECKING…'}
        </text>
        <text x={443} y={834} textAnchor="middle" fontFamily={MONO} fontSize={18} fill="#d6cfc4" opacity={0.8}>
          {done && l.paw ? '(it was nova)' : `${l.name}${done ? (nice ? ' · present' : ' · coal') : ''}`}
        </text>
        <text x={443} y={860} textAnchor="middle" fontFamily={MONO} fontSize={12} letterSpacing={3} fill="#e0b85a" opacity={0.6}>
          SANTA’S NAUGHTY-OR-NICE MACHINE · MK II
        </text>
      </g>

      <Card l={l} phase={phase} still={!!still} key={`card${i}`} />
    </svg>
  );
};

export default SantaCover;
