import React, { useState, useEffect } from 'react';

function rgbToHex(color) {
  // Remove the # from the start of the color
  color = color.slice(1);

  // Convert the color to a number
  const num = parseInt(color, 16);

  // Extract the RGB values
  const r = num >> 16;
  const g = (num >> 8) & 255;
  const b = num & 255;

  // Convert the RGB values to a BMP hex color
  return ((b << 16) | (g << 8) | r).toString(16).padStart(6, '0');
}

function buildBmpHexCode(grid) {
  // Reverse the grid so the first row becomes the last
  const reversedGrid = [...grid].reverse();

  // BMP file header
  const header = [
    { text: '424d', color: '#000000', backgroundColor: '#b184eb', label: 'BM' },
    { text: '46020000', color: '#000000', label: 'file size (70,000 bytes)' },
    { text: '00000000', color: '#000000', label: 'reserved' },
    { text: '36000000', color: '#000000', label: 'offset to pixel data' }
  ];

  // DIB header
  const dibHeader = [
    { text: '28000000', color: '#000000', label: 'DIB header size' },
    { text: '10000000', color: '#000000', backgroundColor: '#b184eb', label: 'width (16 pixels)' },
    { text: '10000000', color: '#000000', backgroundColor: '#b184eb', label: 'height (16 pixels)' },
    { text: '0100', color: '#000000', label: 'color planes' },
    { text: '1800', color: '#000000', label: 'bits per pixel' },
    { text: '00000000', color: '#000000', label: 'compression method' },
    { text: '10020000', color: '#000000', label: 'image size (69,632 bytes)' },
    { text: '130b0000', color: '#000000', label: 'horizontal resolution' },
    { text: '130b0000', color: '#000000', label: 'vertical resolution' },
    { text: '00000000', color: '#000000', label: 'color palette' },
    { text: '00000000', color: '#000000', label: 'important colors' }
  ];

  // Pixel data
  let pixelData = [[]];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const color = reversedGrid[y][x];
      if (typeof color !== 'string' || !/^#[0-9a-f]{6}$/i.test(color)) {
        return [[]];
      }
      pixelData[pixelData.length - 1].push({ text: rgbToHex(color), color });
    }
    pixelData.push([]); // New row after each row
  }

  return [header, dibHeader, ...pixelData];
}  

// New component to display hex code with color
function HexCode({ code, color, backgroundColor='white'}) {
  return <span style={{ color, backgroundColor }} className="font-mono text-sm">{code}</span>;
}

function ColorPicker({selectedColor, onColorClick }) {
  const colors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#FFA500', '#800080', '#FFC0CB'];
  return (
    <div className="flex mb-5">
      {colors.map((color, i) => (
        <div 
          key={i} 
          onClick={() => onColorClick(color)} 
          style={{ 
            backgroundColor: color, 
            border: selectedColor === color ? '2px solid #000' : '1px solid #000' 
          }}
          className="w-5 h-5"
        >
          {selectedColor === color && <span className="text-white">✔️</span>}
        </div>
      ))}
    </div>
  );
}

function Bmp() {
  
  const [grid, setGrid] = useState(Array(16).fill().map(() => Array(16).fill('#FFFFFF')));
  const [selectedColor, setSelectedColor] = useState('#FFFF00');

  const handleCellClick = (x, y) => {
    const newGrid = grid.slice();
    newGrid[y][x] = selectedColor;
    setGrid(newGrid);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  // Convert grid to BMP hex code
  const hexCode = buildBmpHexCode(grid);
  const bmpHexCode = hexCode.map((row, i) => (
    <div key={i} className="flex">
      {row.map((code, j) => (
        <HexCode key={j} code={code.text} backgroundColor={code.backgroundColor} color={code.color === '#FFFFFF' ? 'gray-300' : code.color} />
      ))}
    </div>
  ));

  // Convert hex code to Blob and create object URL
  const hexString = hexCode.flat().map(code => code.text).join('');
  const byteArray = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const blob = new Blob([byteArray], { type: 'image/bmp' });
  const url = URL.createObjectURL(blob);

  // Clean up object URL
  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">BMP Image Creator</h1>
      <p className="mb-4">Select a color and click on the grid to paint. The grid represents a 16x16 BMP image.</p>
      <ColorPicker selectedColor={selectedColor} onColorClick={setSelectedColor} />

      <a href={url} download="image.bmp" className="mb-5">Download BMP</a> {/* Download link */}
      <div className="flex flex-col md:flex-row justify-between w-full md:w-4/5">
        <div className="flex flex-wrap">
        {grid.map((row, y) => (
          <div key={y} className="flex">
            {row.map((color, x) => (
              <div 
                key={`${x}-${y}`} 
                onClick={() => handleCellClick(x, y)} 
                style={{ backgroundColor: color }} 
                className="w-5 h-5 border border-black"
              />
            ))}
          </div>
        ))}
        </div>
        <div className="flex flex-col">{bmpHexCode}</div> {/* Display hex code in rows */}
      </div>
    </div>
  );
}

export default Bmp;
