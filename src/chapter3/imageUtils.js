export function rgbToHex(color) {
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
  
  
export function buildBmpHexCode(grid) {
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
  