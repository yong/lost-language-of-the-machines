import { motion } from 'framer-motion';
import Image from 'next/image';
import { TimelineItem } from '@/components/lab/shared/content';
import NarratorBubble from './NarratorBubble';
import FourSwitches from '@/components/chapter1/FourSwitches';
import Poem from '@/components/chapter1/Poem';
import FullscreenChat from '@/components/lab/shared/FullscreenChat';

import StarlaxImage from '../../../../public/starlaxverse_avatar.png';
import FlameyImage from '../../../../public/flamey_avatar.png';

interface ChatTimelineProps {
  items: TimelineItem[];
}

const ChatBubble: React.FC<{ role: string; content: string; index: number }> = ({ role, content, index }) => {
  const isUser = role === 'user';
  const isSystem = role === 'system';

  if (isSystem) {
    // Professor / system messages — centered, distinct style
    return (
      <motion.div
        className="mx-4 my-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-center text-sm text-amber-900"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-xs text-amber-600 font-medium block mb-1">Prof. Evergreen</span>
        {content}
      </motion.div>
    );
  }

  const avatar = isUser ? FlameyImage : StarlaxImage;
  const name = isUser ? 'Flamey' : 'Starlax';
  const bubbleColor = isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900';
  const alignment = isUser ? 'flex-row' : 'flex-row-reverse';

  return (
    <motion.div
      className={`flex ${alignment} items-end gap-2 mx-4 my-2`}
      initial={{ opacity: 0, y: 20, x: isUser ? -30 : 30 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex-shrink-0">
        <Image src={avatar} alt={name} className="w-8 h-8 rounded-full" />
      </div>
      <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${bubbleColor} text-sm`}>
        {content}
      </div>
    </motion.div>
  );
};

const GameCard: React.FC<{ component: string }> = ({ component }) => {
  return (
    <motion.div
      className="mx-4 my-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-blue-50 px-4 py-2 text-xs text-blue-600 font-medium border-b border-blue-100">
        Interactive: Try the switches!
      </div>
      <div className="p-2 bg-white">
        {component === 'FourSwitches' && <FourSwitches />}
      </div>
    </motion.div>
  );
};

const PoemCard: React.FC = () => {
  return (
    <motion.div
      className="mx-4 my-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <Poem />
    </motion.div>
  );
};

const ChatTimeline: React.FC<ChatTimelineProps> = ({ items }) => {
  return (
    <>
    <div className="py-6">
      {items.map((item, index) => {
        switch (item.type) {
          case 'heading':
            return (
              <motion.h2
                key={index}
                className="text-center text-xl font-bold py-6 text-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {item.content}
              </motion.h2>
            );

          case 'narrator':
            return (
              <NarratorBubble key={index}>
                {item.content}
              </NarratorBubble>
            );

          case 'chat':
            return (
              <ChatBubble
                key={index}
                role={item.role!}
                content={item.content!}
                index={index}
              />
            );

          case 'game':
            return <GameCard key={index} component={item.component!} />;

          case 'poem':
            return <PoemCard key={index} />;

          default:
            return null;
        }
      })}

    </div>

    {/* Fullscreen chat — immediate entry */}
    <div className="-mx-4 sm:-mx-6">
      <FullscreenChat theme="light" />
    </div>
    </>
  );
};

export default ChatTimeline;
