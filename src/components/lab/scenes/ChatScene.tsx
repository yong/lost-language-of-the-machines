import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import StarlaxImage from '../../../../public/starlaxverse_avatar.png';
import FlameyImage from '../../../../public/flamey_avatar.png';

gsap.registerPlugin(ScrollTrigger);

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatSceneProps {
  messages: ChatMessage[];
  title?: string;
}

const ChatScene: React.FC<ChatSceneProps> = ({ messages, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${messages.length * 80}%`,
        pin: true,
        scrub: 0.8,
      },
    });

    messageRefs.current.forEach((el, i) => {
      if (!el) return;
      const role = messages[i].role;
      const fromX = role === 'user' ? -60 : role === 'assistant' ? 60 : 0;

      tl.fromTo(el,
        { opacity: 0, x: fromX, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.15,
          ease: 'back.out(1.4)',
        },
        i * 0.12
      );
    });

    return () => {
      tl.kill();
    };
  }, [messages]);

  return (
    <div ref={containerRef} className="h-screen w-full bg-gray-950 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-4">
        {title && (
          <h3 className="text-center text-gray-500 text-sm mb-6 uppercase tracking-widest">
            {title}
          </h3>
        )}
        <div className="bg-gray-900 rounded-2xl p-4 max-h-[70vh] overflow-hidden">
          {messages.map((msg, i) => {
            if (msg.role === 'system') {
              return (
                <div
                  key={i}
                  ref={(el) => { messageRefs.current[i] = el; }}
                  className="text-center text-amber-400/80 text-xs py-2 px-4 my-1 bg-amber-900/20 rounded-lg opacity-0"
                >
                  <span className="font-medium">Prof. Evergreen:</span> {msg.content}
                </div>
              );
            }

            const isUser = msg.role === 'user';
            const avatar = isUser ? FlameyImage : StarlaxImage;
            const alignment = isUser ? 'flex-row' : 'flex-row-reverse';
            const bubbleColor = isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-100';

            return (
              <div
                key={i}
                ref={(el) => { messageRefs.current[i] = el; }}
                className={`flex ${alignment} items-end gap-2 my-2 opacity-0`}
              >
                <Image src={avatar} alt="" className="w-7 h-7 rounded-full flex-shrink-0" />
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${bubbleColor}`}>
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatScene;
