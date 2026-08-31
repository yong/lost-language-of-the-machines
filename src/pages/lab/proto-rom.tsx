// /lab/proto-rom — PROTOTYPE F: "no source, just bytes"
//
// The kid manipulates: THE BINARY ITSELF. The code lives: nowhere they can read
// — it is a compiled cartridge and the language it was written in is lost.
//
// This is the one mechanic the book's premise actually forces. Nobody alive has
// CATVENTURE's source, so of course you patch the ROM. Every other direction
// had to invent a reason for code to be present; this one doesn't.
//
// The core move is real technique, not a teaching metaphor: SEARCH FOR A VALUE
// YOU CAN SEE. You can see the cat is orange, so look for FF 99 33 in the
// bytes. That is how Game Genie codes were found and how Cheat Engine works.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import RomScreen from '@/components/lab/rom/RomScreen';
import HexGrid from '@/components/lab/rom/HexGrid';
import {
  Cart, REGIONS, ROM_SIZE, findBytes, freshRom, hexToBytes, readCart, regionAt, toHex,
} from '@/components/lab/rom/format';
import { PIXEL_FONT } from '@/components/lab/world/theme';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const STORAGE_KEY = 'gameforge.rom.v1';

const ProtoRom: NextPage = () => {
  const [rom, setRom] = useState<Uint8Array>(freshRom);
  const [selected, setSelected] = useState<number | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [hits, setHits] = useState<number[]>([]);
  const [note, setNote] = useState<string>();
  const [perRow, setPerRow] = useState(8);

  // The reader's own cartridge, persisted like every other Forge piece.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const bytes = Uint8Array.from(JSON.parse(saved));
        if (bytes.length === ROM_SIZE) setRom(bytes);
      }
    } catch { /* a corrupt save just means a fresh cartridge */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(rom))); }
    catch { /* private mode — the cartridge just won't persist */ }
  }, [rom]);

  // 8 bytes/row on a phone, 16 where there's room.
  useEffect(() => {
    const fit = () => setPerRow(window.innerWidth >= 640 ? 16 : 8);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const cart: Cart = useMemo(() => readCart(rom), [rom]);

  const poke = useCallback((offset: number, value: number) => {
    setRom((prev) => {
      const next = prev.slice();
      next[offset] = ((value % 256) + 256) % 256;
      return next;
    });
  }, []);

  const search = (needle: number[], label: string) => {
    const where = findBytes(rom, needle);
    setHits(where);
    if (where.length === 0) {
      setNote(`No ${label} anywhere in the cartridge. Did you already change it?`);
      return;
    }
    // A search can match in more than one place, and that is the interesting
    // case: "CAT" appears in the MAGIC number AND in the TITLE. Same three
    // bytes, two completely different jobs. Reveal every region it touched.
    const regs = where.map(regionAt).filter((r): r is NonNullable<typeof r> => !!r);
    const names = [...new Set(regs.map((r) => r.label))];
    setFound((f) => {
      const next = new Set(f);
      regs.forEach((r) => next.add(r.id));
      return next;
    });
    setSelected(where[0]);
    const at = where.map((o) => `0x${o.toString(16).padStart(4, '0')}`).join(', ');
    setNote(
      where.length === 1
        ? `Found ${label} at ${at}${names.length ? ` — that region is the ${names[0]}.` : '.'}`
        : `Found ${label} in ${where.length} places (${at}). The same bytes do different jobs: ${names.join(' and ')}.`
    );
  };

  const reset = () => {
    setRom(freshRom());
    setSelected(null); setHits([]); setFound(new Set());
    setNote('Cartridge restored.');
  };

  const sel = selected;
  const selRegion = sel !== null ? regionAt(sel) : undefined;
  const selKnown = selRegion && found.has(selRegion.id);
  const value = sel !== null ? rom[sel] : 0;

  return (
    <>
      <Head>
        <title>[lab] Prototype: no source, just bytes - Lost Language of the Machines</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#12101f] px-4 py-10 text-gray-300 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <Link href="/lab/prototypes" className="text-xs text-gray-600 hover:text-gray-400">← all prototypes</Link>

          <div className="mb-1 mt-4 text-xs uppercase tracking-widest text-amber-400">prototype F · no source, just bytes</div>
          <h1 className="mb-3 text-3xl text-white sm:text-4xl" style={{ fontFamily: PIXEL_FONT }}>
            Nobody has the source. Change it anyway.
          </h1>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-400">
            This is the whole cartridge — 128 bytes, the entire game. The language it was written in has been extinct for 500 years, so there is nothing to read and nothing to recompile. There are only numbers, and you can change them.
          </p>

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            {/* the dump */}
            <div className="order-2 lg:order-1">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-gray-500">cartridge dump — tap any byte</span>
                <button onClick={reset} className="min-h-11 touch-manipulation rounded px-2 text-[11px] text-gray-500 active:text-gray-300">
                  restore
                </button>
              </div>
              <div className="rounded-xl border border-gray-800 bg-[#181528] p-2 sm:p-3">
                <HexGrid
                  rom={rom} selected={selected} onSelect={(o) => { setSelected(o); setHits([]); }}
                  found={found} hits={hits} perRow={perRow}
                />
              </div>

              {/* the byte editor — a byte is one number wearing four costumes */}
              {sel !== null && (
                <div className="mt-3 rounded-xl border border-amber-500/30 bg-[#181528] p-4">
                  <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-lg text-white" style={{ fontFamily: PIXEL_FONT }}>
                      byte 0x{sel.toString(16).padStart(4, '0')}
                    </span>
                    {selKnown && (
                      <span className="rounded px-1.5 py-0.5 text-[11px]" style={{ background: `${selRegion!.hue}33`, color: selRegion!.hue }}>
                        {selRegion!.label}
                      </span>
                    )}
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4" style={{ fontFamily: MONO }}>
                    {[
                      ['hex', `0x${toHex(value)}`],
                      ['number', String(value)],
                      ['binary', value.toString(2).padStart(8, '0')],
                      ['letter', value >= 32 && value < 127 ? String.fromCharCode(value) : '—'],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded bg-black/30 p-2">
                        <div className="text-[10px] uppercase text-gray-600">{k}</div>
                        <div className="text-sm text-amber-200">{v}</div>
                      </div>
                    ))}
                  </div>

                  <input
                    type="range" min={0} max={255} value={value}
                    onChange={(e) => poke(sel, Number(e.target.value))}
                    className="mb-3 h-11 w-full accent-amber-400"
                    aria-label="byte value"
                  />
                  <div className="flex flex-wrap gap-2">
                    {[-16, -1, 1, 16].map((d) => (
                      <button
                        key={d}
                        onClick={() => poke(sel, value + d)}
                        className="min-h-11 flex-1 touch-manipulation rounded border border-gray-700 bg-gray-800 px-2 text-sm active:bg-gray-600"
                        style={{ fontFamily: MONO }}
                      >
                        {d > 0 ? `+${d}` : d}
                      </button>
                    ))}
                    {[0x00, 0xff].map((v) => (
                      <button
                        key={v}
                        onClick={() => poke(sel, v)}
                        className="min-h-11 touch-manipulation rounded border border-gray-700 bg-gray-800 px-3 text-sm active:bg-gray-600"
                        style={{ fontFamily: MONO }}
                      >
                        {toHex(v)}
                      </button>
                    ))}
                  </div>
                  {selKnown && <p className="mt-3 text-xs leading-relaxed text-gray-500">{selRegion!.blurb}</p>}
                </div>
              )}
            </div>

            {/* console + the search move */}
            <div className="order-1 lg:order-2">
              <RomScreen cart={cart} />

              <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-400/5 p-4">
                <h2 className="mb-1 text-xl text-amber-300" style={{ fontFamily: PIXEL_FONT }}>
                  Search for what you can see
                </h2>
                <p className="mb-3 text-xs leading-relaxed text-gray-400">
                  You can <em>see</em> the cat is orange. So look for orange in the bytes. This is genuinely how people find things in a program they have no source for.
                </p>

                <div className="mb-2 text-[11px] uppercase tracking-wider text-gray-500">
                  colours {cart.ok ? 'on screen' : 'still in the bytes'}
                </div>
                {/* Shown even when the cartridge won't boot: the palette bytes are
                    still readable, and taking the search tools away from someone
                    who just broke their ROM is exactly when they need them. */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {cart.palette.map((hex, i) => (
                    <button
                      key={i}
                      onClick={() => search(hexToBytes(hex), hex)}
                      className="h-11 w-11 touch-manipulation rounded border-2 border-white/20 active:scale-95"
                      style={{ background: hex }}
                      aria-label={`search for ${hex}`}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => search([(cart.score >> 8) & 255, cart.score & 255], `the score (${cart.score})`)}
                    className="min-h-11 touch-manipulation rounded border border-gray-700 bg-gray-800 px-3 text-xs active:bg-gray-600"
                  >
                    find the score
                  </button>
                  <button
                    onClick={() => search([0x43, 0x41, 0x54], 'the letters C A T')}
                    className="min-h-11 touch-manipulation rounded border border-gray-700 bg-gray-800 px-3 text-xs active:bg-gray-600"
                  >
                    find “CAT”
                  </button>
                </div>

                {note && <p className="mt-3 text-xs leading-relaxed text-emerald-300">{note}</p>}
              </div>

              {/* the map fills in as the reader uncovers it */}
              <div className="mt-4 rounded-xl border border-gray-800 bg-[#181528] p-4">
                <div className="mb-2 text-[11px] uppercase tracking-wider text-gray-500">
                  what you&rsquo;ve worked out ({found.size}/{REGIONS.length})
                </div>
                <ul className="space-y-1">
                  {REGIONS.map((r) => (
                    <li key={r.id} className="flex items-center gap-2 text-xs" style={{ fontFamily: MONO }}>
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: found.has(r.id) ? r.hue : '#374151' }} />
                      {found.has(r.id) ? (
                        <>
                          <span className="text-gray-300">{r.label}</span>
                          <span className="text-gray-600">
                            {r.start.toString(16).padStart(4, '0')}–{r.end.toString(16).padStart(4, '0')}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-700">????????</span>
                      )}
                    </li>
                  ))}
                </ul>
                {found.size < REGIONS.length && (
                  <button
                    onClick={() => { setFound(new Set(REGIONS.map((r) => r.id))); setNote('Map revealed. Half the fun was finding them.'); }}
                    className="mt-3 min-h-11 touch-manipulation rounded border border-gray-700 px-3 text-[11px] text-gray-500 active:bg-gray-700"
                  >
                    give me the map
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* mischief */}
          <section className="mt-10 rounded-xl border border-amber-500/25 bg-amber-400/5 p-5">
            <h2 className="mb-1 text-2xl text-amber-300" style={{ fontFamily: PIXEL_FONT }}>Try to break it</h2>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li>▸ Find the orange and make the cat bright green.</li>
              <li>▸ Change the title. The letters are in the right-hand column — 0x43 is C.</li>
              <li>▸ Set the score to 9999. You will need <em>both</em> score bytes.</li>
              <li>▸ Set byte 0x05 to 0. What stops?</li>
              <li>▸ Break byte 0x00 and watch the console refuse the cartridge entirely.</li>
            </ul>
          </section>

          <hr className="my-10 border-gray-800" />
          <h2 className="mb-3 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>Why this one fits the book</h2>
          <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-gray-400">
            <li>▸ <strong className="text-gray-200">The premise forces it.</strong> The source language is lost — patching the binary is the only thing the characters could do. No other direction gets its motivation for free.</li>
            <li>▸ <strong className="text-gray-200">&ldquo;Everything is a number&rdquo; stops being a claim.</strong> The program <em>is</em> numbers, and changing one changes the program.</li>
            <li>▸ <strong className="text-gray-200">Zero typing.</strong> Tap a byte, drag a slider — the best mobile story of any prototype so far.</li>
            <li>▸ <strong className="text-gray-200">It is real.</strong> Game Genie codes and Cheat Engine both work by searching for a value you can see.</li>
          </ul>
          <h2 className="mb-3 mt-8 text-2xl text-white" style={{ fontFamily: PIXEL_FONT }}>And where it runs out</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
            You can change <em>values</em>, not <em>behaviour</em>. You can recolour the cat; you cannot make it jump. That ceiling is not a flaw to fix — it is the plot. Let the reader hack bytes happily for several chapters until they hit a wall they badly want past, and <em>that</em> is the moment the story hands them the lost language. The frustration is earned, and Act 2 begins.
          </p>
        </div>
      </main>
    </>
  );
};

export default ProtoRom;
