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
              <h1 className="backdrop-blur-sm text-center text-3xl font-bold text-white z-50">
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
