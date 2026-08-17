import { motion } from 'framer-motion';

interface NarratorBubbleProps {
  children: React.ReactNode;
  delay?: number;
}

const NarratorBubble: React.FC<NarratorBubbleProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      className="mx-4 my-3 px-5 py-3 bg-gray-100 border-l-4 border-gray-400 rounded-r-lg text-gray-700 italic text-sm leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export default NarratorBubble;
