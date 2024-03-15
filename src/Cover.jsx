import React from 'react';
import Snowfall from './react-snowfall/index.js';

const snowflake1 = document.createElement('img')
snowflake1.src = './one.png'
const snowflake2 = document.createElement('img')
snowflake2.src = './zero.png'

const images = [snowflake1, snowflake2]

const Cover = () => {
  return (
    <div className="h-screen w-screen relative bg-cover bg-center" 
         style={{backgroundImage: `url('./cover.jpg')`}}>
      <Snowfall color="white" snowflakeCount={200} images={images} />
      <h1 className="backdrop-blur-sm text-center text-3xl font-bold text-white z-50">
        Lost Language of the Machines
      </h1>
    </div>
  );
};

export default Cover;

