import { useState, useEffect } from 'react';

interface SceneNavProps {
  scenes: string[];
}

const SceneNav: React.FC<SceneNavProps> = ({ scenes }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      const progress = scrollY / (docHeight - windowHeight);
      const index = Math.min(
        Math.floor(progress * scenes.length),
        scenes.length - 1
      );
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scenes.length]);

  const scrollToScene = (index: number) => {
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const targetScroll = (index / scenes.length) * docHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {scenes.map((label, i) => (
        <button
          key={i}
          onClick={() => scrollToScene(i)}
          className="group relative flex items-center justify-end"
          aria-label={label}
        >
          <span className="absolute right-6 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {label}
          </span>
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-white scale-125 shadow-lg shadow-white/30'
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default SceneNav;
