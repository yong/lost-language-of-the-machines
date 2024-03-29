//Cover.jsx
import React from 'react';
import Snowfall from './react-snowfall/index.js';
import { ParallaxBanner } from 'react-scroll-parallax';

const snowflake1 = document.createElement('img')
snowflake1.src = './one.png'
const snowflake2 = document.createElement('img')
snowflake2.src = './zero.png'

const images = [snowflake1, snowflake2]

const Cover = () => {
  return (
    <ParallaxBanner
      layers={[
        { image: './cover.jpg' },
        {
          speed: -20,
          children: (
            <div className="absolute inset-0 flex items-center justify-center">
              <Snowfall color="white" snowflakeCount={200} images={images} />
              <h1 className="backdrop-blur-sm text-center font-bold text-white z-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                Lost Language of the Machines
              </h1>
            </div>
          ),
        },
      ]}
      style={{ height: '100vh' }}
    />
  );
};

export default Cover;
