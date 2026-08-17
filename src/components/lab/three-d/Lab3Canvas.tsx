import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import FourSwitches from '@/components/chapter1/FourSwitches';
import FullscreenChat from '@/components/lab/shared/FullscreenChat';

// ---- 3D Background Scene (just visuals, no Html) ----

const GridFloor: React.FC = () => (
  <gridHelper args={[100, 60, '#1a3a5c', '#0a1929']} position={[0, -2, 0]} />
);

const Particles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50;
      arr[i * 3 + 1] = Math.random() * 20 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return arr;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.position.z = -scrollProgress * 50;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#4fc3f7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// Scroll progress shared between 3D and DOM
let scrollProgress = 0;

const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const currentZ = useRef(5);

  useFrame(() => {
    const target = 5 - scrollProgress * 60;
    currentZ.current += (target - currentZ.current) * 0.1;
    camera.position.z = currentZ.current;
    camera.position.y = 1 + Math.sin(scrollProgress * Math.PI * 0.5) * 0.5;
  });

  return null;
};

const Background3D: React.FC = () => (
  <Canvas camera={{ position: [0, 1, 5], fov: 60 }} style={{ background: '#050a15' }}>
    <CameraRig />
    <ambientLight intensity={0.2} />
    <pointLight position={[0, 10, 0]} intensity={0.4} color="#4fc3f7" />
    <pointLight position={[-5, 3, -10]} intensity={0.2} color="#7c3aed" />
    <fog attach="fog" args={['#050a15', 3, 25]} />
    <GridFloor />
    <Particles />
  </Canvas>
);

// ---- DOM Content Overlay ----

const holoStyle: React.CSSProperties = {
  background: 'rgba(5, 20, 40, 0.88)',
  border: '1px solid rgba(79, 195, 247, 0.3)',
  boxShadow: '0 0 30px rgba(79, 195, 247, 0.1), inset 0 0 20px rgba(79, 195, 247, 0.04)',
  color: 'rgba(200, 230, 255, 0.92)',
  borderRadius: '12px',
  padding: '24px',
  fontSize: '15px',
  lineHeight: '1.8',
  backdropFilter: 'blur(8px)',
};

interface ContentSection {
  id: string;
  type: 'panel' | 'chat' | 'game';
  align?: 'center' | 'left' | 'right';
}

const sections: ContentSection[] = [
  { id: 'title', type: 'panel', align: 'center' },
  { id: 'story1', type: 'panel', align: 'center' },
  { id: 'story2', type: 'panel', align: 'left' },
  { id: 'poem', type: 'panel', align: 'right' },
  { id: 'professor', type: 'panel', align: 'left' },
  { id: 'game', type: 'game', align: 'center' },
  { id: 'chat', type: 'chat', align: 'center' },
  { id: 'closing', type: 'panel', align: 'center' },
];

const HoloPanel: React.FC<{ children: React.ReactNode; align?: string }> = ({ children, align = 'center' }) => {
  const alignClass = align === 'left' ? 'mr-auto' : align === 'right' ? 'ml-auto' : 'mx-auto';
  return (
    <div className={`max-w-lg ${alignClass}`} style={holoStyle}>
      {children}
    </div>
  );
};

const ChatBubble: React.FC<{ role: string; content: string; name: string }> = ({ role, content, name }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-start' : 'justify-end'} my-2`}>
      <div
        className="max-w-[240px] px-4 py-2 rounded-2xl text-sm"
        style={{
          background: isUser ? 'rgba(37, 99, 235, 0.9)' : 'rgba(55, 65, 81, 0.9)',
          color: 'white',
          boxShadow: isUser ? '0 0 15px rgba(59, 130, 246, 0.3)' : '0 0 15px rgba(100, 100, 100, 0.15)',
        }}
      >
        <div className="text-[10px] opacity-50 mb-0.5">{name}</div>
        {content}
      </div>
    </div>
  );
};

const ContentOverlay: React.FC = () => {
  return (
    <div className="relative z-10">
      {/* Each section is a full viewport height for scroll pacing */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <HoloPanel align="center">
          <div className="text-center">
            <h1 style={{ fontFamily: 'VT323', fontSize: '32px', color: '#4fc3f7', margin: 0 }}>
              Lost Language of the Machines
            </h1>
            <div className="text-cyan-400/50 text-xs mt-2">Chapter 1: &ldquo;One and Zero&rdquo;</div>
            <div className="text-cyan-400/30 text-xs mt-6 animate-bounce">&darr; Scroll to enter</div>
          </div>
        </HoloPanel>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <HoloPanel align="center">
          <div className="text-cyan-400 text-[11px] uppercase tracking-[3px] mb-3">The History Hall</div>
          <p className="m-0">While it was still early in the morning, with fewer flying vehicles leaving traces in the sky, Flamey&apos;s footsteps rattled on the dark carbon-titanium floor of the History Hall. Only two minutes left before class.</p>
        </HoloPanel>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <HoloPanel align="left">
          <p className="m-0">They entered the room through a glass bubble door, where Prof. Evergreen was sitting behind his desk with lots of empty chairs. As expected, they were the only two students today.</p>
        </HoloPanel>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <HoloPanel align="right">
          <div className="text-amber-400 text-[11px] mb-2">Prof. Evergreen recites</div>
          <p className="text-center italic text-cyan-300/90 m-0">
            Oh, Binary, the language of simplicity,<br />
            With only 1 and 0, you create infinite possibilities.<br />
            From two digits, a power grows<br />
            Of logic, number, art, and code.
          </p>
        </HoloPanel>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <HoloPanel align="left">
          <div className="text-amber-400 text-[11px] mb-2">Prof. Evergreen</div>
          <p className="m-0">&ldquo;Convenience, young droid. Ancient computers used electric signals to communicate. So naturally 1 represents On, 0 represents Off.&rdquo;</p>
        </HoloPanel>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl mx-auto" style={{
          ...holoStyle,
          border: '1px solid rgba(79, 195, 247, 0.45)',
          boxShadow: '0 0 40px rgba(79, 195, 247, 0.18)',
        }}>
          <div className="text-cyan-400 text-[11px] uppercase tracking-[3px] text-center mb-3">
            Hologram: Binary Switches
          </div>
          <div className="bg-white rounded-lg p-2">
            <FourSwitches />
          </div>
        </div>
      </section>

      {/* Fullscreen chat — breaks out of hologram style for immersion */}
      <section className="relative z-20">
        <FullscreenChat theme="dark" />
      </section>
    </div>
  );
};

// ---- Main Component ----

const Lab3Canvas: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (barRef.current) {
        barRef.current.style.height = `${scrollProgress * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#050a15' }}>
      {/* Fixed 3D background */}
      <div className="fixed inset-0 z-0">
        <Background3D />
      </div>

      {/* Scrollable DOM content */}
      <ContentOverlay />

      {/* HUD */}
      <div className="fixed top-4 left-4 z-50 text-cyan-400/40 text-xs">
        <span style={{ fontFamily: 'VT323' }}>HOLOGRAM CLASSROOM v1.0</span>
      </div>

      {/* Progress bar */}
      <div className="fixed left-0 top-0 bottom-0 w-1 z-50 bg-cyan-900/30">
        <div ref={barRef} className="w-full bg-cyan-400/60" style={{ height: '0%' }} />
      </div>
    </div>
  );
};

export default Lab3Canvas;
