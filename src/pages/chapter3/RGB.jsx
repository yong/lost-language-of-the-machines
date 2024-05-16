//RGB.jsx

import React from 'react';

const ColorBar = ({ color, label }) => (
    <div className="flex items-center space-x-2 mb-4">
      <div>{label}</div>
      <div className="w-full h-6 bg-gradient-to-r relative" style={{ backgroundImage: `linear-gradient(to right, #000, ${color})` }}>
        <div className="absolute left-0 bottom-0 text-white">00</div>
        <div className="absolute right-0 bottom-0 text-white">FF</div>
      </div>
    </div>
  );
  

const RGB = () => {
  return (
      <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
        <ColorBar color="#FF0000" label="R" />
        <ColorBar color="#00FF00" label="G" />
        <ColorBar color="#0000FF" label="B" />
      </div>
  )
}

export default RGB;
