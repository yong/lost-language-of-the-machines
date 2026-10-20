#!/usr/bin/env node
// kid-pass.mjs — walk a chapter the way a reader does, and take the pictures
// a person (or a cold reviewer) needs to judge it.
//
//   npm run build && npx next start -p 3101      (the build the reader runs)
//   npm run kid-pass -- /lab/adder               (or: node scripts/kid-pass.mjs /lab/adder --h 640)
//
// It plays like a 10-year-old on a phone held in one hand: 390×640 (a phone
// INSIDE its browser — 844 is the screen, and a button that fits at 844 fell
// off the author's phone), real touch events, taps whatever glows, scrolls
// with a thumb when the story parks. It never hunts for a button.
//
// What comes out, in tmp/kid-pass/<page>/:
//   - a picture of every toy THE MOMENT IT ARRIVES, untouched — the screen a
//     kid has to make sense of with no help. These go to the cold reviewer
//     (.claude/agents/kid-reviewer.md) and to the top of the hand-back.
//   - one taken mid-motion just after the first tap, one when the toy is done
//     (the payoff — a reviewer who never sees it cannot judge it)
//   - report.txt: the mechanical checks. A ✗ is a bug; it does not prove the
//     chapter makes sense — only the pictures can show that.
//
// Published chapters ignore ?reveal=, so walk them through their lab door
// (/chapter1 → /lab/novel).
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const path = args.find((a) => a.startsWith('/')) ?? '/lab/adder';
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const H = +opt('--h', 640), BASE = opt('--base', 'http://localhost:3101');
const CHROME = process.env.CHROME ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = `tmp/kid-pass/${path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home'}-${H}`;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });
const ctx = await browser.newContext({ viewport: { width: 390, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
const cdp = await ctx.newCDPSession(page);
const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
const tap = async (x, y) => { await touch('touchStart', x, y); await touch('touchEnd'); };
const swipe = async (dy) => {
  const x = 200, y0 = H * 0.72;
  await touch('touchStart', x, y0);
  for (let i = 1; i <= 8; i++) await touch('touchMove', x, y0 - (dy * i) / 8);
  await touch('touchEnd');
};
let shot = 0;
const snap = async (name) => { shot += 1; const f = `${OUT}/${String(shot).padStart(2, '0')}-${name}.png`; await page.screenshot({ path: f }); return f; };
const report = [], pictures = [];
const bad = (m) => report.push(`✗ ${m}`), note = (m) => report.push(`  ${m}`);

// ── the way in: cover, then the paper ──────────────────────────────────────
const sep = path.includes('?') ? '&' : '?';
await page.goto(`${BASE}${path}${sep}restart=1`);
await page.waitForTimeout(2500);
pictures.push(await snap('cover'));
await swipe(H * 0.5);
await page.waitForTimeout(1200);
pictures.push(await snap('paper'));

// ── the chat ───────────────────────────────────────────────────────────────
await page.goto(`${BASE}${path}${sep}restart=1&reveal=dots`);
const look = () => page.evaluate(() => {
  const thread = document.querySelector('[data-thread]');
  const tr = thread?.getBoundingClientRect();
  const card = document.querySelector('[data-live-toy]');
  const glow = card?.querySelector('.beckon');
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, top: r.top, bottom: r.bottom }; };
  const hint = document.querySelector('[data-gate-hint]');
  return {
    done: !!document.querySelector('[data-done]'),
    waiting: thread?.hasAttribute('data-waiting') ?? false,
    gate: hint?.textContent?.replace(/[↑↓]/g, '').trim() ?? null,
    arrow: hint?.textContent?.includes('↓') ? 'down' : hint ? 'up' : null,
    label: card?.firstElementChild?.textContent?.trim() ?? '',
    glow: glow ? { ...box(glow), text: glow.innerText.replace(/\s+/g, ' ').trim().slice(0, 40), pad: glow.getAttribute('role') === 'group' } : null,
    cardSeen: card ? box(card).top < (tr?.bottom ?? 0) - 40 : false,
    view: tr ? { top: tr.top, bottom: tr.bottom } : { top: 0, bottom: 0 },
    held: box(document.querySelector('[data-held]')),
    // what a kid pokes when nothing glows (a puzzle): the toy's own buttons
    pokes: card ? [...card.querySelectorAll('button')].map(box).filter((b) => b && b.top >= (tr?.top ?? 0) && b.bottom <= (tr?.bottom ?? 0)) : [],
    // A maze toy ([data-maze] grid, [data-cell] squares): play it like a kid
    // would — head for the nearest fish (a breadth-first walk) and press the
    // arrow that starts that way.
    maze: (() => {
      const grid = card?.querySelector('[data-maze]');
      if (!grid) return null;
      const cols = +grid.getAttribute('data-maze');
      const cells = [...grid.querySelectorAll('[data-cell]')].map((c) => c.getAttribute('data-cell'));
      const rows = cells.length / cols, cat = cells.indexOf('cat');
      const steps = [[1, -cols], [2, 1], [3, cols], [4, -1]];
      const first = new Map([[cat, 0]]), queue = [cat];
      let dir = 0;
      while (queue.length && !dir) {
        const at = queue.shift();
        for (const [d, k] of steps) {
          const to = at + k;
          if (to < 0 || to >= cells.length || (k === 1 && to % cols === 0) || (k === -1 && at % cols === 0)) continue;
          if (first.has(to) || cells[to] === 'wall') continue;
          first.set(to, first.get(at) || d);
          if (cells[to] === 'fish') { dir = first.get(to); break; }
          queue.push(to);
        }
      }
      const name = { 1: 'up', 2: 'right', 3: 'down', 4: 'left' }[dir || 2];
      return { arrow: box(card.querySelector(`[aria-label="steer ${name}"]`)), rows };
    })(),
    wide: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  };
});

const doneShot = new Set();
let poke = 0, toy = 0, lastGate = null, lastLabel = null, firstTap = false, taps = 0, scrolls = 0, wide = false, stuck = 0;
for (let i = 0; i < 1500; i++) {
  await page.waitForTimeout(300);
  const s = await look();
  wide ||= s.wide;
  if (s.done) break;
  // the toy's last step was just taken: the payoff a kid plays for
  if (toy > 0 && !s.gate && !doneShot.has(toy)) {
    doneShot.add(toy);
    await page.waitForTimeout(700);
    pictures.push(await snap(`toy${toy}-done`));
  }

  if (s.gate && s.gate !== lastGate) {
    // a NEW toy (or the same toy asking for its next step)
    const sameToy = lastGate !== null && s.label === lastLabel;
    lastLabel = s.label;
    lastGate = s.gate;
    if (!sameToy) {
      toy += 1; firstTap = false;
      await page.waitForTimeout(500);        // let it land; a kid sees it settled
      const f = await snap(`toy${toy}-arrives`);
      pictures.push(f);
      note(`toy ${toy} "${s.label}" — hint: "${s.gate}" ${s.arrow === 'down' ? '↓' : '↑'}`);
      if (!s.glow) bad(`toy ${toy}: nothing on it glows — what does a kid press?`);
      else {
        const below = s.glow.bottom > s.view.bottom - 4;
        if (below) note(`toy ${toy}: its glowing button ("${s.glow.text}") is below the screen when it arrives`);
        if (below && s.arrow !== 'down') bad(`toy ${toy}: the hint points ↑ but the button is below the screen`);
        if (!s.cardSeen) note(`toy ${toy}: only the top of the card shows — is what peeks something to touch?`);
      }
    } else {
      // the same toy asking for its next step: photograph it, or a reviewer
      // never sees the moment in between (a cold read "never saw NICE")
      note(`   next step: "${s.gate}"`);
      await page.waitForTimeout(400);
      pictures.push(await snap(`toy${toy}-next-step`));
    }
  }

  if (s.waiting) { await swipe(H * 0.45); scrolls++; continue; }
  if (s.gate && s.maze?.arrow && (!s.glow || s.glow.pad)) {
    const a = s.maze.arrow;
    if (a.top < s.view.top || a.bottom > s.view.bottom) { await swipe(H * 0.3); scrolls++; continue; }
    stuck = 0;
    await tap(a.x, a.y); taps++;
    if (!firstTap) { firstTap = true; await page.waitForTimeout(1200); pictures.push(await snap(`toy${toy}-playing`)); }
    continue;
  }
  if (s.gate && s.glow) {
    const onScreen = s.glow.top >= s.view.top && s.glow.bottom <= s.view.bottom;
    if (!onScreen) { await swipe(H * 0.3); scrolls++; if (++stuck > 12) { bad(`stuck: "${s.gate}" — its button never came on screen`); break; } continue; }
    stuck = 0;
    await tap(s.glow.x, s.glow.y); taps++;
    if (!firstTap) { firstTap = true; await page.waitForTimeout(350); pictures.push(await snap(`toy${toy}-mid-motion`)); }
    continue;
  }
  // nothing glows: a puzzle that wants working out — poke its controls in
  // turn, the way a kid does. Or a game playing by itself: wait.
  if (s.gate && !s.glow) {
    if (++stuck > 80) { bad(`stuck: "${s.gate}" and nothing glows`); break; }
    if (!s.maze && s.pokes.length && stuck % 2 === 0) { const b = s.pokes[poke++ % s.pokes.length]; await tap(b.x, b.y); taps++; }
    continue;
  }
  if (s.held) { await tap(s.held.x, s.held.y); continue; }
  if (i === 1499) bad('never reached the end');
}
await page.waitForTimeout(2500);
pictures.push(await snap('end'));
if (wide) bad('the page scrolls sideways');
for (const e of errors) bad(`page error: ${e}`);

const summary = [
  `kid pass · ${path} · 390×${H} · real touch`,
  `${toy} toys · ${taps} taps · ${scrolls} thumb scrolls`,
  ...report,
  report.some((l) => l.startsWith('✗')) ? 'RESULT: bugs above' : 'RESULT: no mechanical bugs — now LOOK at the pictures',
  '',
  'pictures (give these to the kid-reviewer, and put them in the hand-back):',
  ...pictures,
].join('\n');
writeFileSync(`${OUT}/report.txt`, summary + '\n');
console.log(summary);
await browser.close();
