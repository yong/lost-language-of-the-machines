//Hex.jsx
import React from 'react';

const Hex = () => {
  const mapping = [
      { binary: '0000', hex: '0' },
      { binary: '0001', hex: '1' },
      { binary: '0010', hex: '2' },
      { binary: '0011', hex: '3' },
      { binary: '0100', hex: '4' },
      { binary: '0101', hex: '5' },
      { binary: '0110', hex: '6' },
      { binary: '0111', hex: '7' },
      { binary: '1000', hex: '8' },
      { binary: '1001', hex: '9' },
      { binary: '1010', hex: 'A' },
      { binary: '1011', hex: 'B' },
      { binary: '1100', hex: 'C' },
      { binary: '1101', hex: 'D' },
      { binary: '1110', hex: 'E' },
      { binary: '1111', hex: 'F' },
  ];

  return (
      <div className="mb-3 text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
          <div className="text-2xl font-bold">HEX - human friendly ‘binary’</div><br/>
          Since 16 is a power of 2, it is very easy to convert binary to hex. Just split them in to group of 4:<br/>

          Step 1: Divide the binary number into groups of 4 digits, starting from the rightmost digit. You can add leading zeros if the number of digits isn't evenly divisible by 4.<br/>
          Step 2: Convert each group of 4 binary digits to its corresponding hexadecimal digit using the following mapping:<br/>

          <div className="grid grid-cols-4 lg:grid-cols-8  gap-4 mx-auto">
              {mapping.map((item, index) => (
                  <div key={index}>{item.binary}={item.hex}</div>    
              ))}
          </div>
      </div>
  )
}

export default Hex;
