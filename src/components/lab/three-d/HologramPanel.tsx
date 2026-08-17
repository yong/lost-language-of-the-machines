import { Html } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HologramPanelProps {
  position: [number, number, number];
  children: React.ReactNode;
  width?: number;
  flickerOnMount?: boolean;
}

const HologramPanel: React.FC<HologramPanelProps> = ({
  position,
  children,
  width = 350,
  flickerOnMount = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(!flickerOnMount);

  useEffect(() => {
    if (flickerOnMount) {
      // Flicker effect on mount
      const delays = [0, 100, 200, 350];
      const timers = delays.map((d, i) =>
        setTimeout(() => setVisible(i % 2 === 0), d)
      );
      const final = setTimeout(() => setVisible(true), 400);
      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(final);
      };
    }
  }, [flickerOnMount]);

  // Gentle float
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html
        transform
        distanceFactor={8}
        style={{
          width: `${width}px`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      >
        <div
          className="p-4 rounded-lg text-sm leading-relaxed"
          style={{
            background: 'rgba(5, 20, 40, 0.85)',
            border: '1px solid rgba(79, 195, 247, 0.3)',
            boxShadow: '0 0 20px rgba(79, 195, 247, 0.1), inset 0 0 20px rgba(79, 195, 247, 0.05)',
            color: 'rgba(200, 230, 255, 0.9)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {children}
        </div>
      </Html>
    </group>
  );
};

export default HologramPanel;
