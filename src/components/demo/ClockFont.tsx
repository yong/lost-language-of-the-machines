// ClockCharacter.tsx
import React from 'react';

interface ClockCharacterProps {
  char: string;
}

const ClockCharacter: React.FC<ClockCharacterProps> = ({ char }) => {
  return (
    <div className="block aspect-[0.71] w-[1em] relative text-black">
      <svg className="aspect-[0.71] absolute inset-0 z-30" fill="currentColor">
        <use href={`/font-sprite.svg#char-${char}`} />
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
}

const ClockFont: React.FC<ClockFontProps> = ({ chars }) => {
  const words = chars.split(' ');

  return (
    <div className="flex flex-wrap justify-center">
      {words.map((word, i) => (
        <div key={i} className="inline-flex mr-4">
          {word.split('').map((char) => (
            <ClockCharacter
              key={char}
              char={char}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ClockFont;
