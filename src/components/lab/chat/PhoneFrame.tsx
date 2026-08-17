import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PhoneFrameProps {
  coverImage: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ coverImage, title, subtitle, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ['start start', 'end start'],
  });

  // Cover image transforms as user scrolls
  const coverScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const coverBorderRadius = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const coverOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 0.7]);

  return (
    <div ref={containerRef} className="bg-gray-950 min-h-screen">
      {/* Cover section */}
      <div ref={coverRef} className="h-screen relative flex items-center justify-center sticky top-0 z-10">
        <motion.div
          className="w-full h-full overflow-hidden relative"
          style={{
            scale: coverScale,
            borderRadius: coverBorderRadius,
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay for transition */}
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />

          {/* Title */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl"
              style={{ fontFamily: 'VT323' }}
            >
              {title}
            </h1>
            <p
              className="text-2xl sm:text-3xl md:text-4xl text-gray-200 mt-4 drop-shadow-lg"
              style={{ fontFamily: 'VT323' }}
            >
              {subtitle}
            </p>
            <motion.div
              className="mt-12 text-white/60 text-sm"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to begin
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Chat timeline content */}
      <div className="relative z-20 -mt-[50vh]">
        {/* Phone bezel frame */}
        <div className="max-w-lg mx-auto">
          {/* Status bar */}
          <div className="bg-gray-900 rounded-t-3xl pt-4 px-6 pb-2 flex justify-between items-center text-gray-400 text-xs sticky top-0 z-30">
            <span>Flamey & Starlax</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Online</span>
            </div>
          </div>

          {/* Chat content area */}
          <div className="bg-white min-h-screen pb-24">
            {children}
          </div>

          {/* Bottom bar */}
          <div className="bg-gray-900 rounded-b-3xl h-8" />
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
