import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import StarlaxImage from '../../../../public/starlaxverse_avatar.png';
import FlameyImage from '../../../../public/flamey_avatar.png';
import { fullChatMessages } from './content';

interface FullscreenChatProps {
  theme?: 'dark' | 'light';
  showTimeLabel?: boolean;
  /** Number of messages to show instantly (no scroll animation) */
  instantCount?: number;
  /** When true, instant messages start hidden for parent-driven GSAP entrance */
  deferInstant?: boolean;
}

const FullscreenChat: React.FC<FullscreenChatProps> = ({ theme = 'dark', showTimeLabel = true, instantCount = 0, deferInstant = false }) => {
  const isDark = theme === 'dark';
  const exitRef = useRef<HTMLDivElement>(null);
  const exitInView = useInView(exitRef, { once: true, margin: '-100px' });

  const bg = isDark ? 'bg-black' : 'bg-white';
  const headerBg = isDark ? 'bg-gray-900/95' : 'bg-gray-100/95';
  const headerText = isDark ? 'text-white' : 'text-gray-900';
  const subText = isDark ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDark ? 'bg-gray-900/95' : 'bg-gray-100/95';
  const inputFieldBg = isDark ? 'bg-gray-800' : 'bg-gray-200';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const dotBorder = isDark ? 'border-black' : 'border-white';

  return (
    <div className={`${bg} w-full`}>
      {/* Sticky phone-style header */}
      <div data-chat-header className={`sticky top-0 z-20 ${headerBg} backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b ${borderColor}`}>
        <div className="relative">
          <Image src={StarlaxImage} alt="Starlax" className="w-10 h-10 rounded-full" />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 ${dotBorder}`} />
        </div>
        <div>
          <div className={`font-semibold text-sm ${headerText}`}>Starlax</div>
          <div className={`text-xs ${subText}`}>online</div>
        </div>
      </div>

      {/* Messages — fast entry, minimal animation delay */}
      <div className="px-3 py-4 max-w-lg mx-auto">
        {showTimeLabel && (
          <div className={`text-center text-xs ${subText} mb-4`}>
            Later that evening
          </div>
        )}

        {fullChatMessages.map((msg, i) => {
          const isUser = msg.role === 'user';
          const avatar = isUser ? FlameyImage : StarlaxImage;
          const name = isUser ? 'Flamey' : 'Starlax';

          const prevRole = i > 0 ? fullChatMessages[i - 1].role : null;
          const isFirstInGroup = prevRole !== msg.role;
          const isInstant = i < instantCount;

          return (
            <motion.div
              key={i}
              data-chat-msg={i}
              {...(isInstant ? { 'data-instant': true } : {})}
              className={`flex ${isUser ? 'flex-row' : 'flex-row-reverse'} items-end gap-2 ${isFirstInGroup ? 'mt-3' : 'mt-0.5'}`}
              {...(isInstant
                ? { initial: { opacity: deferInstant ? 0 : 1, y: 0 } }
                : {
                    initial: { opacity: 0, y: 8 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: '50px' },
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }
              )}
            >
              <div className="flex-shrink-0 w-8">
                {isFirstInGroup && (
                  <Image src={avatar} alt={name} className="w-8 h-8 rounded-full" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-500 text-white rounded-2xl rounded-bl-md'
                    : isDark
                      ? 'bg-gray-800 text-gray-100 rounded-2xl rounded-br-md'
                      : 'bg-gray-200 text-gray-900 rounded-2xl rounded-br-md'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Exit transition — notification card that fades in as you scroll past the last message */}
      <div ref={exitRef} className="px-4 py-16 max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={exitInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-100'} shadow-lg`}
        >
          {/* Notification style card */}
          <div className="px-5 py-4 flex items-center gap-3">
            <Image src={StarlaxImage} alt="Starlax" className="w-11 h-11 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${headerText}`}>Starlax</div>
              <div className={`text-xs ${subText} mt-0.5`}>See you in class tomorrow!</div>
            </div>
            <div className={`text-[10px] ${subText}`}>now</div>
          </div>
          <div className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
          <a
            href="/chapter2"
            className="block px-5 py-3 text-center text-blue-500 text-sm font-medium hover:bg-blue-500/10 transition-colors"
          >
            Continue to Chapter 2 &rarr;
          </a>
        </motion.div>
      </div>

      {/* Sticky input bar */}
      <div data-chat-input className={`sticky bottom-0 z-20 ${inputBg} backdrop-blur-md px-4 py-3 border-t ${borderColor}`}>
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <div className={`flex-1 ${inputFieldBg} rounded-full px-4 py-2.5 text-sm ${subText}`}>
            Type a message...
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenChat;
