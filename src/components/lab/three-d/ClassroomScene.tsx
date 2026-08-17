import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GridFloor: React.FC = () => {
  return (
    <gridHelper
      args={[100, 60, '#1a3a5c', '#0a1929']}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const FloatingParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = Math.random() * 20 - 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4fc3f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ClassroomScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#4fc3f7" />
      <fog attach="fog" args={['#050a15', 5, 30]} />
      <GridFloor />
      <FloatingParticles />
    </>
  );
};

export default ClassroomScene;
