import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  pin?: boolean;
  id: string;
}

const Scene: React.FC<SceneProps> = ({ children, className = '', pin = true, id }) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pin || !sceneRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
      id,
    });

    return () => {
      trigger.kill();
    };
  }, [pin, id]);

  return (
    <div
      ref={sceneRef}
      className={`min-h-screen w-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default Scene;
