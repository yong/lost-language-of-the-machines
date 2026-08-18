// /lab/proto-teach — PROTOTYPE E: "you teach it words"
//
// The kid manipulates: A VOCABULARY. The code lives: in the conversation.
//
// There is no editor. You text Flamey, he does what you said, and then — the
// whole point — you can say "call that a dance", and `dance` becomes a word the
// machine knows. Say it again and it does the whole thing.
//
// That is a function. Definition, naming, reuse, composition: the kid does all
// four before anybody says the word "function" out loud. It is also exactly how
// a real vocabulary gets built, which fits a book about a language that was
// lost — you are not learning the lost language, you are re-growing it.
import { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PIXEL_FONT } from '@/components/lab/world/theme';
import { SPRITE, spriteColors } from '@/components/lab/forge/cartridge';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const W = 8;
const H = 5;
const CELL = 44;
const PX = 2.2;

const DELTA = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

interface Msg { who: 'kid' | 'flamey'; text: string }
interface Frame { x: number; y: number; dir: number; bubble?: string }

const START = { x: 1, y: 2, dir: 0 };

// The four words it is born knowing. Everything else, the kid teaches it.
const isPrimitive = (verb: string) => ['move', 'turn', 'say'].includes(verb);

const ProtoTeach: NextPage = () => {
  const [words, setWords] = useState<Record<string, string[]>>({});
  const [msgs, setMsgs] = useState<Msg[]>([
    { who: 'flamey', text: "ok I'm the machine. I know three words: move, turn, say. tell me something" },
  ]);
  const [recent, setRecent] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [frame, setFrame] = useState<Frame>({ ...START });
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  /** Expand learned words down to primitives. Depth-capped so a word that
   *  refers to itself is a joke, not a hung tab. */
  const expand = (cmds: string[], depth = 0): string[] => {
    if (depth > 8) return [];
    return cmds.flatMap((c) => {
      const verb = c.trim().split(/\s+/)[0];
      if (isPrimitive(verb)) return [c];
      const body = words[verb];
      return body ? expand(body, depth + 1) : [c];
    });
  };

  const runTrace = (cmds: string[]) => {
    const state = { ...START, ...frame };
    const frames: Frame[] = [];
    let bonks = 0;
    let said: string | undefined;

    for (const c of cmds) {
      const [verb, ...rest] = c.trim().split(/\s+/);
      const arg = rest.join(' ');
      if (verb === 'move') {
        const n = parseInt(arg, 10) || 0;
        for (let i = 0; i < n; i++) {
          const d = DELTA[state.dir];
          const nx = state.x + d.x;
          const ny = state.y + d.y;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) { bonks++; frames.push({ ...state }); }
          else { state.x = nx; state.y = ny; frames.push({ ...state }); }
        }
      } else if (verb === 'turn') {
        state.dir = (state.dir + (arg.startsWith('l') ? 3 : 1)) % 4;
        frames.push({ ...state });
      } else if (verb === 'say') {
        said = arg.replace(/^"|"$/g, '');
        frames.push({ ...state, bubble: said });
      }
    }
    return { frames, bonks, said };
  };

  const play = (frames: Frame[], then: () => void) => {
    setBusy(true);
    const pace = Math.max(40, Math.min(200, Math.round(2400 / Math.max(frames.length, 1))));
    frames.forEach((f, i) => setTimeout(() => setFrame(f), i * pace));
    setTimeout(() => { setBusy(false); then(); }, frames.length * pace + 120);
  };

  const reply = (text: string) => setMsgs((m) => [...m, { who: 'flamey', text }]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || busy) return;
    setInput('');
    setMsgs((m) => [...m, { who: 'kid', text: raw }]);

    // "call that a dance" — the move that turns a habit into a word
    const naming = raw.toLowerCase().match(/^call (?:that|it|this) (?:a |the )?([a-z][a-z0-9]*)/);
    if (naming) {
      const name = naming[1];
      if (recent.length === 0) return reply("call WHAT that? you haven't told me to do anything yet");
      if (isPrimitive(name)) return reply(`I already know "${name}". pick a word I don't have`);
      setWords((w) => ({ ...w, [name]: recent }));
      setRecent([]);
      // Careful not to suggest `say "hop"` here — `say` is a primitive, and a
      // kid following that advice literally would get the word spoken instead.
      return reply(
        `ok. "${name}" now means: ${recent.join(', ')}\n\ntype ${name} on its own and I'll do the whole thing`
      );
    }

    if (raw.toLowerCase() === 'forget everything') {
      setWords({});
      setRecent([]);
      return reply('...who are you');
    }

    const cmds = raw.toLowerCase().split(/\s*(?:,|\bthen\b)\s*/).filter(Boolean);
    const unknown = cmds.find((c) => {
      const v = c.split(/\s+/)[0];
      return !isPrimitive(v) && !words[v];
    });
    if (unknown) {
      const v = unknown.split(/\s+/)[0];
      const known = ['move', 'turn', 'say', ...Object.keys(words)];
      return reply(
        `I don't know "${v}".\n\nI know: ${known.join(', ')}\n\nyou could teach me — do the steps, then say "call that ${v}"`
      );
    }

    const flat = expand(cmds);
    if (flat.length === 0) return reply('that word means itself. I thought about it for a while and gave up');

    const { frames, bonks, said } = runTrace(flat);
    setRecent((r) => [...r, ...cmds]);

    play(frames, () => {
      if (bonks >= 4) reply(`I hit the edge ${bonks} times. I kept going. you didn't say stop`);
      else if (bonks > 0) reply(`bonk (${bonks}). anyway, done`);
      else if (said !== undefined) reply(`I said "${said}". exactly that. nothing more`);
      else reply('done');
    });
  };

  const colors = spriteColors('#F2A03D');
  const vocab = Object.keys(words);

  return (
    <>
      <Head>
        <title>[lab] Prototype: you teach it words - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#12101f] px-6 py-12 text-gray-300">
        <div className="mx-auto max-w-4xl">
          <Link href="/lab/prototypes" className="text-xs text-gray-600 hover:text-gray-400">← all prototypes</Link>

          <div className="mb-1 mt-4 text-xs uppercase tracking-widest text-amber-400">prototype E · you teach it words</div>
          <h1 className="mb-3 text-4xl text-white" style={{ fontFamily: PIXEL_FONT }}>
            Say it, then name it
          </h1>
          <p className="mb-2 max-w-2xl text-sm leading-relaxed text-gray-400">
            No editor. You text the machine and it does what you said. Then you say <em>&ldquo;call that a dance&rdquo;</em> — and <code className="text-sky-300">dance</code> becomes a word it knows.
          </p>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-500">
            That is a function: defined, named, reused, composed — before anyone says the word &ldquo;function&rdquo;. Try: <code className="text-gray-400">move 2</code> · <code className="text-gray-400">turn left</code> · <code className="text-gray-400">call that a hop</code> · <code className="text-gray-400">hop then hop</code>
          </p>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
            {/* the conversation, which is the program */}
            <div className="flex h-[430px] flex-col rounded-xl border border-gray-800 bg-[#181528]">
              <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4">
                {msgs.map((m, i) => (
                  <div key={i} className={m.who === 'kid' ? 'text-right' : ''}>
                    <span
                      className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-1.5 text-left text-sm ${
                        m.who === 'kid'
                          ? 'bg-sky-600 text-white'
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={submit} className="flex gap-2 border-t border-gray-800 p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={busy ? 'watching…' : 'move 2'}
                  disabled={busy}
                  className="flex-1 rounded-full bg-black/40 px-4 py-2 text-sm text-gray-100 outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
                  style={{ fontFamily: MONO }}
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-sky-600 px-4 text-sm text-white hover:bg-sky-500 disabled:opacity-40"
                >
                  send
                </button>
              </form>
            </div>

            {/* what it does, and what it knows */}
            <div>
              <div
                className="relative rounded-xl border-4 border-gray-800"
                style={{ width: W * CELL, height: H * CELL, background: '#2B2158' }}
              >
                <motion.div
                  className="absolute"
                  animate={{ left: frame.x * CELL + 4, top: frame.y * CELL + 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: `repeat(16, ${PX}px)`,
                      transform: frame.dir === 2 ? 'scaleX(-1)' : 'none',
                    }}
                  >
                    {SPRITE.flatMap((row, y) =>
                      row.split('').map((ch, x) => (
                        <div key={`${x}-${y}`} style={{ width: PX, height: PX, backgroundColor: colors[ch] ?? 'transparent' }} />
                      ))
                    )}
                  </div>
                  {frame.bubble !== undefined && (
                    <div className="absolute -top-6 left-5 whitespace-nowrap rounded-lg bg-white px-2 py-0.5 text-xs text-gray-900 shadow">
                      {frame.bubble.trim() || '…'}
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="mt-4 rounded-xl border border-gray-800 bg-[#181528] p-3">
                <div className="mb-2 text-[11px] uppercase tracking-wider text-gray-500">
                  words it knows
                </div>
                <div className="flex flex-wrap gap-1.5" style={{ fontFamily: MONO }}>
                  {['move', 'turn', 'say'].map((w) => (
                    <span key={w} className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">{w}</span>
                  ))}
                  {vocab.map((w) => (
                    <span
                      key={w}
                      title={words[w].join(', ')}
                      className="rounded bg-amber-400/15 px-2 py-0.5 text-xs text-amber-200"
                    >
                      {w}
                    </span>
                  ))}
                </div>
                {vocab.length > 0 && (
                  <p className="mt-2 text-[11px] text-gray-500">
                    {vocab.length} word{vocab.length > 1 ? 's' : ''} you taught it.
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="my-10 border-gray-800" />
          <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>What this is good at</h2>
          <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-gray-400">
            <li>▸ <strong className="text-gray-200">Chat and game are the same object,</strong> not two panels. The scrollback <em>is</em> the program.</li>
            <li>▸ <strong className="text-gray-200">It teaches abstraction by accident</strong> — naming a habit is the single most powerful idea in programming, and here it is one sentence.</li>
            <li>▸ <strong className="text-gray-200">Texting is a form kids already fluently use.</strong> Nobody has to be taught the interface.</li>
            <li>▸ The vocabulary the kid builds <em>is</em> their save file, and it is legible.</li>
          </ul>
          <h2 className="mb-3 mt-8 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>What it is bad at</h2>
          <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-gray-400">
            <li>▸ <strong className="text-gray-200">Typing is a real floor.</strong> Spelling and phrasing get in the way for younger kids.</li>
            <li>▸ You cannot see the whole program at once — the scrollback hides it.</li>
            <li>▸ Editing a word you already taught is awkward; conversation is append-only.</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default ProtoTeach;
