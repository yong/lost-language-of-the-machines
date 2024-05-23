//Hex.tsx
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
          <div className="text-2xl font-bold"><span className='text-blue-500'>HEX</span> - human friendly ‘<span className='text-green-700'>binary</span>’</div><br/>
          Since <span className='text-blue-500'>16</span> is a multiple of <span className='text-green-700'>2</span> (2<sup>4</sup>), it is very easy to convert <span className='text-green-700'>binary</span> to <span className='text-blue-500'>hex</span> and back.<br/>

          <b>Step 1</b>: Just divide the <span className='text-green-700'>binary</span> number into groups of 4 digits, starting from the rightmost digit. You can add leading zeros if the number of digits isn't evenly divisible by 4.<br/>
          <b>Step 2</b>: Convert each group of 4 <span className='text-green-700'>binary</span> digits to its corresponding <span className='text-blue-500'>hexadecimal</span> digit using the following mapping:<br/>

          <div className="grid grid-cols-4 lg:grid-cols-8  gap-4 mx-auto">
              {mapping.map((item, index) => (
                  <div key={index}><span className='text-green-700'>{item.binary}</span>=<b className='text-blue-500'>{item.hex}</b></div>    
              ))}
          </div>
          <br/>
          <b>For example</b>: <span className='text-green-700'>00000000</span> becomes <b className='text-blue-500'>00</b>, 
          <span className='text-green-700'>11111111</span> becomes <b className='text-blue-500'>FF</b> - much easier to read and write!
      </div>
  )
}

export default Hex;
