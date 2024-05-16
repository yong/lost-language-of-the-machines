import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedFIFOList = () => {
  const [list, setList] = useState(Array(8).fill(0));

  const handleClick = (value) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList.shift();
      newList.push(value);
      return newList;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="p-2 m-2 bg-blue-500 text-white"
        onClick={() => handleClick(1)}
      >
        Add 1
      </button>
      <button
        className="p-2 m-2 bg-blue-500 text-white"
        onClick={() => handleClick(0)}
      >
        Add 0
      </button>
      <div className="flex space-x-2">
        <AnimatePresence>
          {list.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="p-2 bg-green-500 text-white"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedFIFOList;
