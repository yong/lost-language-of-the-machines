import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CatImage from "../../../../../public/chapter1/cat_reaching.png";

// The stud-gradient look, carried over from the old Legos component so the
// bricks still read as LEGO. `color` tints both the brick and its studs.
const brickStyle = (color: string) => ({
  color: color,
  backgroundColor: "currentColor",
  boxShadow:
    "inset -1px -1px 0 rgba(0, 0, 0, 0.2), inset 1px 1px 0 rgba(255, 255, 255, 0.2)",
  backgroundImage:
    "radial-gradient(currentColor 7.5px, transparent 8.5px), radial-gradient(rgba(255, 255, 255, 0.6) 7.5px, transparent 8.5px), radial-gradient(rgba(0, 0, 0, 0.2) 7.5px, transparent 10.5px), radial-gradient(rgba(0, 0, 0, 0.2) 7.5px, transparent 10.5px)",
  backgroundSize: "27px 27px",
  backgroundPosition: "0px 0px, -0.5px -0.5px, 0px 0px, 3px 3px",
  backgroundRepeat: "repeat" as const,
});

// Order left→right = high→low place. Colors match Rule2's intro text.
// cols×rows = value, so counting the studs gives the number — using real
// LEGO brick shapes (8 = 2×4, 4 = 2×2 square, 2 = 1×2, 1 = 1×1).
const PLACES = [
  { value: 8, color: "#f63", cols: 2, rows: 4 },
  { value: 4, color: "#43a047", cols: 2, rows: 2 },
  { value: 2, color: "#039be5", cols: 1, rows: 2 },
  { value: 1, color: "#757575", cols: 1, rows: 1 },
];

// STUD matches the gradient tile size so studs render crisply.
const STUD = 27;

// A random target 1..15 that differs from the current one.
const pickTarget = (current: number) => {
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * 15) + 1;
  }
  return next;
};

const Confetti = () => {
  const pieces = Array.from({ length: 14 });
  const emojis = ["🎉", "⭐", "✨", "🧱", "🎊"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 120;
        const delay = Math.random() * 0.2;
        const emoji = emojis[i % emojis.length];
        return (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ left: `${left}%`, top: "10%" }}
            initial={{ y: -20, opacity: 0, rotate: 0 }}
            animate={{ y: 260, x: drift, opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: 1.6, delay, ease: "easeOut" }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

const BinaryLegoGame = () => {
  const [bits, setBits] = useState<boolean[]>([false, false, false, false]);
  const [target, setTarget] = useState(13); // matches the story: 1101 = 13
  const [celebrate, setCelebrate] = useState(false);

  const total = PLACES.reduce((sum, p, i) => sum + (bits[i] ? p.value : 0), 0);
  const binary = bits.map((b) => (b ? "1" : "0")).join("");
  const solved = total === target;

  const toggle = (index: number) =>
    setBits((prev) => prev.map((b, i) => (i === index ? !b : b)));

  const clearBricks = () => setBits([false, false, false, false]);

  const nextChallenge = () => {
    setTarget(pickTarget(target));
    clearBricks();
  };

  // Fire the celebration once when the build matches the target.
  useEffect(() => {
    if (solved) {
      setCelebrate(true);
      const timer = setTimeout(() => setCelebrate(false), 1800);
      return () => clearTimeout(timer);
    }
    setCelebrate(false);
  }, [solved]);

  return (
    <div className="relative my-4 rounded-xl bg-white/70 p-4 shadow-inner">
      {celebrate && <Confetti />}

      {/* Challenge banner */}
      <div className="mb-2 text-lg font-bold">
        🧱 Flamey&apos;s challenge: build{" "}
        <span className="text-2xl text-blue-600">{target}</span>!
      </div>
      <div className="mb-4 text-sm text-gray-600">
        Tap the bricks to switch them on or off. Each brick is worth its number
        — count the dots!
      </div>

      {/* Bricks, sharing a bottom baseline so taller = bigger value */}
      <div
        className="flex items-end justify-center gap-4 sm:gap-8"
        style={{ minHeight: STUD * 4 + 40 }}
      >
        {PLACES.map((place, i) => {
          const on = bits[i];
          return (
            <div key={place.value} className="flex flex-col items-center justify-end px-2">
              {/* Value label above the brick so every stud stays countable */}
              <span
                className="mb-1 select-none text-lg font-extrabold"
                style={{ color: place.color, opacity: on ? 1 : 0.5 }}
              >
                {place.value}
              </span>
              <motion.button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                aria-label={`Brick worth ${place.value}, currently ${
                  on ? "on" : "off"
                }`}
                className="relative cursor-pointer rounded-sm outline-offset-4"
                style={{
                  width: place.cols * STUD,
                  height: place.rows * STUD,
                  ...(on
                    ? brickStyle(place.color)
                    : {
                        backgroundColor: "transparent",
                        border: `2px dashed ${place.color}`,
                        opacity: 0.5,
                      }),
                }}
                animate={{
                  y: on ? -6 : 0,
                  scale: on ? 1.04 : 1,
                  filter: on
                    ? `drop-shadow(0 8px 6px ${place.color}66)`
                    : "drop-shadow(0 0 0 transparent)",
                }}
                whileHover={{ scale: on ? 1.07 : 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />

              {/* Binary digit under each brick, like the light switches */}
              <span
                className="mt-2 font-mono text-2xl font-bold"
                style={{ color: on ? place.color : "#cbd5e1" }}
              >
                {on ? "1" : "0"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Live equation + total */}
      <div className="mt-3 text-center font-mono text-lg">
        {PLACES.map((place, i) => (
          <React.Fragment key={place.value}>
            {i > 0 && <span className="text-gray-400"> + </span>}
            <b style={{ color: bits[i] ? place.color : "#cbd5e1" }}>
              {bits[i] ? place.value : 0}
            </b>
          </React.Fragment>
        ))}
        <span className="text-gray-500"> = </span>
        <b className={solved ? "text-green-600" : "text-blue-600"}>{total}</b>
        <span className="ml-2 text-gray-400">
          (binary <b className="text-gray-600">{binary}</b>)
        </span>
      </div>

      {/* Feedback + controls */}
      <div className="mt-3 flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {solved ? (
            <motion.div
              key="win"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-lg font-bold text-green-600"
            >
              <Image
                src={CatImage}
                alt="cat"
                className={`w-12 ${celebrate ? "animate-bounce" : ""}`}
              />
              🎉 You got it! {target} it is! 🎉
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-500"
            >
              {total < target
                ? "Keep going — add more bricks!"
                : "Too big — take a brick off!"}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={clearBricks}
            className="rounded-full border border-gray-300 bg-white px-4 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={nextChallenge}
            className="rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Try another
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinaryLegoGame;
