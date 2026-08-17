import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FourSwitches from '@/components/chapter1/FourSwitches';

gsap.registerPlugin(ScrollTrigger);

const GameScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    // Entrance animation
    gsap.fromTo(card,
      { opacity: 0, scale: 0.8, y: 60 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gray-950 flex items-center justify-center relative"
    >
      {/* Spotlight vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 70%)',
        }}
      />

      <div ref={cardRef} className="max-w-xl w-full mx-auto px-4 relative z-10">
        <h3 className="text-center text-white/60 text-sm uppercase tracking-widest mb-4">
          Interactive: Flip the switches
        </h3>
        <div className="bg-white rounded-2xl p-4 shadow-2xl shadow-blue-500/20">
          <FourSwitches />
        </div>
      </div>
    </div>
  );
};

export default GameScene;
