import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FourSwitches from '@/components/chapter1/FourSwitches';

interface GameStationProps {
  position: [number, number, number];
}

const GameStation: React.FC<GameStationProps> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html
        transform
        distanceFactor={6}
        style={{ width: '420px' }}
      >
        <div
          className="p-4 rounded-xl"
          style={{
            background: 'rgba(5, 20, 40, 0.9)',
            border: '1px solid rgba(79, 195, 247, 0.4)',
            boxShadow: '0 0 30px rgba(79, 195, 247, 0.15)',
          }}
        >
          <div className="text-cyan-400 text-xs uppercase tracking-widest text-center mb-3">
            Hologram: Binary Switches
          </div>
          <div className="bg-white rounded-lg p-2">
            <FourSwitches />
          </div>
        </div>
      </Html>
    </group>
  );
};

export default GameStation;
