import React from 'react';
import Snowfall from './react-snowfall/index.js';

const snowflake1 = document.createElement('img')
snowflake1.src = './one.png'
const snowflake2 = document.createElement('img')
snowflake2.src = './zero.png'

const images = [snowflake1, snowflake2]

const Cover = () => {
  return (
    <div class="app" style={{ height: '100vh', width: '100vw',
        background: `url('./cover.jpg') no-repeat center center / cover`,
        display: 'flex', // Added for centering content vertically
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
     }}>
      <Snowfall color="white" snowflakeCount={200} images={images} />
      <h1 className="backdrop-blur-sm" style={{
        marginTop: "20vmin",
        textAlign: "center",
        color: 'rgb(222, 228, 253)',
        zIndex: 50,
        fontWeight: "600",
        fontSize: "10vmin",}}>Lost Language of the Machines</h1>
    </div>
  );
};

export default Cover;

