// ClockCharacter.tsx
import React, { useState, useEffect } from 'react';

interface ClockCharacterProps {
  char: string;
  settleTime: number;
  start: boolean;
}

const ClockCharacter: React.FC<ClockCharacterProps> = ({ char, settleTime, start }) => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  const [currentChar, setCurrentChar] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const easeOutQuad = (t: number) => t * (2 - t);
    let startTime: number;
    let duration: number;
    let hasRun = false;

    const updateChar = (firstCall = false) => {
      if (firstCall) {
        startTime = Date.now();
        duration = settleTime;
        hasRun = true;
      }
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / duration;
      if (progress < 1) {
        const easedTime = easeOutQuad(progress);
        const randomIndex = Math.floor(Math.random() * chars.length);
        setCurrentChar(chars[randomIndex]);
        const nextUpdate = Math.round(easedTime * 100);
        setTimeout(updateChar, nextUpdate);
      } else {
        setCurrentChar(char);
        setFinished(true);
      }
    };

    if (start && !hasRun) {
      updateChar(true);
    }
  }, [char, settleTime, start]);

  return (
    <div className="block aspect-[0.71] w-[1em] relative">
      <svg className="aspect-[0.71] absolute inset-0 z-20 opacity-0 dark:text-fuchsia-500 dark:blur-[12px] dark:opacity-100" fill="currentColor">
        <use href={`/font-sprite.svg#char-${currentChar}`} className={`transition-all ${finished ? '' : ' opacity-20'}`} />
      </svg>
      <svg className="aspect-[0.71] absolute inset-0 z-30 text-sky-600 dark:text-violet-50" fill="currentColor">
        <use href={`/font-sprite.svg#char-${currentChar}`} className={`transition-all ${finished ? '' : ' opacity-20'}`} />
      </svg>
      <svg className="aspect-[0.71] absolute inset-0 z-0 text-slate-400 opacity-10 dark:text-gray-950 dark:opacity-30" fill="currentColor">
        <use href="/font-sprite.svg#char-8" />
        <use href="/font-sprite.svg#char-i" />
      </svg>
    </div>
  );
};

interface ClockFontProps {
  chars: string;
  delay: number;
  start: boolean;
}

const ClockFont: React.FC<ClockFontProps> = ({ chars, delay, start }) => {
  return (
    <div className="inline-flex">
      {chars.split('').map((char, i) => (
        <ClockCharacter
          key={char}
          char={char}
          start={start}
          settleTime={delay + i * (delay / 2)}
        />
      ))}
    </div>
  );
};

export default ClockFont;


