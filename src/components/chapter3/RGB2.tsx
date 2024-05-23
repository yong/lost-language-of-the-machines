//RGB2.tsx
import React, { useState } from 'react';
import Block from '@uiw/react-color-block';

function ColorPicker() {
  const [hex, setHex] = useState("#800080");
  return (
      <Block
        color={hex}
        onChange={(color) => setHex(color.hex)}
      />
  );
}

const RGB2 = () => {
  return (
      <div className="mb-3 font-mono bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
        <b className="text-red-600">00</b><b className="text-green-600">00</b><b className="text-blue-600">00</b>
        <i className="fa-solid fa-cloud" style={{ color: '#000000' }}></i>
        : No red light, no green light, and no blue light. It is complete darkness (black). <br/>
        
        <b className="text-red-600">FF</b><b className="text-green-600">00</b><b className="text-blue-600">00</b>
        <i className="fa-solid fa-apple-whole" style={{ color: '#FF0000' }}></i>
        : Full brightness red, and nothing else. It is just as red as it can be. <br/>

        <b className="text-red-600">00</b><b className="text-green-600">80</b><b className="text-blue-600">00</b>
        <i className="fa-solid fa-tree" style={{ color: '#008000' }}></i>
        : Half brightness of green, and nothing else. I see tree of greens... <br/>

        <b className="text-red-600">FF</b><b className="text-green-600">FF</b><b className="text-blue-600">FF</b>
        <i className="fa-solid fa-lightbulb"  style={{ color: '#FFFFFF' }}></i>
        : Full brightness red, full brightness green, and full brightness blue. It is just white, just as Isaac Newton discovered that clear white light was composed of visible colors. <br/>
        
        <b className="text-red-600">FF</b><b className="text-green-600">FF</b><b className="text-blue-600">00</b>
        <i className="fa-solid fa-lemon"  style={{ color: '#FFFF00' }}></i>
        : Full red, full green, and no blue. This mix creates yellow. By lowering the brightness of red and green, you can get a different yellow.

        <br/>
        <div className='flex justify-center mt-4'>
          <ColorPicker/>
        </div>
      </div>
  )
}

export default RGB2;
