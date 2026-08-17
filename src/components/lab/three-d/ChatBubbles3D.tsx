import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Message {
  role: string;
  content: string;
}

interface ChatBubbles3DProps {
  messages: Message[];
  startPosition: [number, number, number];
}

const ChatBubbles3D: React.FC<ChatBubbles3DProps> = ({ messages, startPosition }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        startPosition[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={startPosition}>
      {messages.map((msg, i) => {
        if (msg.role === 'system') return null;

        const isUser = msg.role === 'user';
        const xOffset = isUser ? -0.8 : 0.8;
        const yOffset = -i * 0.5;

        return (
          <Html
            key={i}
            position={[xOffset, yOffset, 0]}
            transform
            distanceFactor={8}
            style={{ width: '220px' }}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-xs ${
                isUser
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-gray-700 text-gray-100 mr-auto'
              }`}
              style={{
                maxWidth: '180px',
                boxShadow: isUser
                  ? '0 0 12px rgba(59, 130, 246, 0.3)'
                  : '0 0 12px rgba(100, 100, 100, 0.2)',
                width: 'fit-content',
                marginLeft: isUser ? 'auto' : undefined,
              }}
            >
              <div className="text-[10px] opacity-50 mb-0.5">
                {isUser ? 'Flamey' : 'Starlax'}
              </div>
              {msg.content}
            </div>
          </Html>
        );
      })}
    </group>
  );
};

export default ChatBubbles3D;
