//Cover.jsx
import React from 'react';
import Snowfall from '../react-snowfall/index.js';
import { ParallaxBanner } from 'react-scroll-parallax';
import {motion} from 'framer-motion';

const snowflake1 = document.createElement('img')
snowflake1.src = '/chapter1/one.png'
const snowflake2 = document.createElement('img')
snowflake2.src = '/chapter1/zero.png'

const images = [snowflake1, snowflake2]

const Title = () => {
  return (
    <motion.div
      variants={{
        hidden: {opacity: 0, y:75},
        visible: {opacity: 1, y: 0},
      }}
      initial="hidden"
      animate="visible"
      transition={{duration: 0.5, delay: 0.25}}
    >
    <h1 className="backdrop-blur-sm text-center font-bold text-white z-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
      Lost Language of the Machines
    </h1>
    </motion.div>
  )
}

const Cover = () => {
  return (
    <ParallaxBanner
      layers={[
        { image: '/chapter1/cover.jpg' },
        {
          speed: -20,
          children: (
            <div className="absolute inset-0 flex items-center justify-center">
              <Snowfall color="white" snowflakeCount={200} images={images} />
              <Title/>
            </div>
          ),
        },
      ]}
      style={{ height: '100vh' }}
    />
  );
};

export default Cover;
