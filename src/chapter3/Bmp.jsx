import React, { useState, useEffect } from 'react';
import { buildBmpHexCode } from './imageUtils';

// New component to display hex code with color
function HexCode({ code, color, backgroundColor='#FFFFFF'}) {
  return <span style={{ color, backgroundColor, fontFamily: 'Courier New', fontSize: '0.8em' }}>{code}</span>;
}


function Bmp() {
  const colors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#FFA500', '#800080', '#FFC0CB'];
  const [grid, setGrid] = useState(Array(16).fill().map(() => Array(16).fill('#FFFFFF')));
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  const handleCellClick = (x, y) => {
    const newGrid = grid.slice();
    newGrid[y][x] = selectedColor;
    setGrid(newGrid);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  // Change white to light gray
  const displayColor = selectedColor === '#FFFFFF' ? '#D3D3D3' : selectedColor;

  // Convert grid to BMP hex code
  const hexCode = buildBmpHexCode(grid);
  console.log(hexCode)
  const bmpHexCode = hexCode.map((row, i) => (
    <div key={i}>
      {row.map((code, j) => (
        <HexCode key={j} code={code.text} backgroundColor={code.backgroundColor} color={code.color === '#FFFFFF' ? '#D3D3D3' : code.color} />
      ))}
    </div>
  ));

  // Convert hex code to Blob and create object URL
  const hexString = hexCode.flat().map(code => code.text).join('');
  console.log(hexString)
  const byteArray = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const blob = new Blob([byteArray], { type: 'image/bmp' });
  console.log("blob", blob)
  const url = URL.createObjectURL(blob);
  console.log("url", url)

  // Clean up object URL
  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>BMP Image Creator</h1>
      <p>Select a color and click on the grid to paint. The grid represents a 16x16 BMP image.</p>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        {colors.map((color, i) => (
          <div key={i} onClick={() => handleColorClick(color)} style={{ backgroundColor: color, width: '20px', height: '20px', border: selectedColor === color ? '2px solid #000' : '1px solid #000' }}>
            {selectedColor === color && <span>✔️</span>}
          </div>
        ))}
      </div>
      <a href={url} download="image.bmp">Download BMP</a> {/* Download link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
        <div>
          {grid.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
              {row.map((color, x) => (
                <div key={`${x}-${y}`} onClick={() => handleCellClick(x, y)} style={{ backgroundColor: color, width: '20px', height: '20px', border: '1px solid #000' }} />
              ))}
            </div>
          ))}
        </div>
        <div>{bmpHexCode}</div> {/* Display hex code in rows */}
      </div>
    </div>
  );
}

export default Bmp;
