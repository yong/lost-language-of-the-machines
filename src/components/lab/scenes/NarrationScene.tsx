import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NarrationSceneProps {
  paragraphs: string[];
  speaker?: string;
  speakerColor?: string;
  background?: string;
}

const NarrationScene: React.FC<NarrationSceneProps> = ({
  paragraphs,
  speaker,
  speakerColor = 'text-white',
  background = 'bg-gray-950',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalSteps = paragraphs.length;
    const stepDuration = 1 / totalSteps;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${totalSteps * 100}%`,
        pin: true,
        scrub: 1,
      },
    });

    textRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = i * stepDuration;
      // Fade in
      tl.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: stepDuration * 0.3 },
        start
      );
      // Fade out (except last)
      if (i < totalSteps - 1) {
        tl.to(el,
          { opacity: 0, y: -30, duration: stepDuration * 0.3 },
          start + stepDuration * 0.7
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [paragraphs]);

  return (
    <div ref={containerRef} className={`h-screen w-full relative ${background}`}>
      {speaker && (
        <div className={`absolute top-16 left-0 right-0 text-center text-sm font-medium ${speakerColor} opacity-60 uppercase tracking-widest`}>
          {speaker}
        </div>
      )}
      {/* Stacked absolutely positioned paragraphs, all centered in viewport */}
      {paragraphs.map((text, i) => (
        <div
          key={i}
          ref={(el) => { textRefs.current[i] = el; }}
          className="absolute inset-0 flex items-center justify-center px-8 opacity-0"
        >
          <p className="max-w-2xl text-center text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NarrationScene;
