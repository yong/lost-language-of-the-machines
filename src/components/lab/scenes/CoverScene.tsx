import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Snowfall from '../../../react-snowfall/index.js';
import { useSnowImages } from '@/components/lab/shared/useSnowImages';

gsap.registerPlugin(ScrollTrigger);

interface CoverSceneProps {
  image: string;
  title: string;
  subtitle: string;
}

const CoverScene: React.FC<CoverSceneProps> = ({ image, title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const snowImages = useSnowImages();

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const hintEl = scrollHintRef.current;
    if (!container || !img || !titleEl || !subtitleEl || !hintEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
      },
    });

    // Ken Burns zoom
    tl.to(img, { scale: 1.3, duration: 1 }, 0);
    // Title scatter
    tl.to(titleEl, { opacity: 0, y: -100, letterSpacing: '0.5em', duration: 0.6 }, 0.2);
    tl.to(subtitleEl, { opacity: 0, y: -60, duration: 0.4 }, 0.2);
    tl.to(hintEl, { opacity: 0, duration: 0.2 }, 0);
    // Darken
    tl.to(img, { filter: 'brightness(0.1)', duration: 0.6 }, 0.5);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Snowfall overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Snowfall color="white" snowflakeCount={150} images={snowImages} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl"
          style={{ fontFamily: 'VT323' }}
        >
          {title}
        </h1>
        <p
          ref={subtitleRef}
          className="text-2xl sm:text-3xl md:text-4xl text-gray-200 mt-4 drop-shadow-lg"
          style={{ fontFamily: 'VT323' }}
        >
          {subtitle}
        </p>
        <div ref={scrollHintRef} className="mt-16 text-white/60 text-sm animate-bounce">
          &#8595; Scroll to begin
        </div>
      </div>
    </div>
  );
};

export default CoverScene;
