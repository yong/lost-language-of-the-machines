
import { NextPage } from 'next';

//import Bmp from '@/components/demo/Bmp';

import React, { FC } from 'react';

/*
const ThousandCube2: FC<{transparent: boolean}> = (transparent) => {
  return (
    <div className="w-24 h-24" style={{ perspective: '600px' }}>
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(-15deg)', backgroundColor: '#BA8C63' }}>
        <div className="absolute w-24 h-24 grid grid-cols-10 grid-rows-10" style={{ transform: 'translateZ(48px)', backgroundColor: '#BA8C63' }}>{Array(100).fill(<div className="border border-black"></div>)}</div>
        <div className="absolute w-24 h-24 grid grid-cols-10 grid-rows-10" style={{ transform: 'rotateY(90deg) translateZ(48px)', backgroundColor: '#BA8C63' }}>{Array(100).fill(<div className="border border-black"></div>)}</div>
        <div className="absolute w-24 h-24 grid grid-cols-10 grid-rows-10" style={{ transform: 'rotateX(90deg) translateZ(48px)', backgroundColor: '#BA8C63' }}>{Array(100).fill(<div className="border border-black"></div>)}</div>
      </div>
    </div>
  );
}*/

interface PlaceValueProps {
  cols: number;
  rows: number;
  depth: number;
  transparent?: boolean;
}

const PlaceValue: FC<PlaceValueProps> = ({ cols, rows, depth, transparent }) => {
  const color = transparent ? 'rgba(255, 255, 255, 0.3)' : '#BA8C63';
  const borderColor = transparent ? 'rgba(0, 0, 0, 0.3)' : 'black';

  return (
    <div style={{ width: `${cols * 10}px`, height: `${rows * 10}px`, perspective: '600px' }}>
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(-15deg)', backgroundColor: color }}>
        {Array(depth).fill(0).map((_, i) => (
          <div key={i} className="absolute border-black" style={{ width: `${cols * 10}px`, height: `${rows * 10}px`, transform: `translateZ(${i * 10}px)`, backgroundColor: color, borderColor: borderColor, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>{Array(cols * rows).fill(<div className="border border-black"></div>)}</div>
        ))}
      </div>
    </div>
  );
}

export const ThousandCube: FC<{ transparent?: boolean }> = ({ transparent }) => <PlaceValue cols={10} rows={10} depth={10} transparent={transparent} />;
export const HundredBoard: FC<{ transparent?: boolean }> = ({ transparent }) => <PlaceValue cols={10} rows={10} depth={1} transparent={transparent} />;
export const TenBead: FC<{ transparent?: boolean }> = ({ transparent }) => <PlaceValue cols={1} rows={10} depth={1} transparent={transparent} />;
export const OneUnit: FC<{ transparent?: boolean }> = ({ transparent }) => <PlaceValue cols={1} rows={1} depth={1} transparent={transparent} />;


const brickStyle = (color: string) => ({
  color: color,
  backgroundColor: 'currentColor',
  boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, 0.2), inset 1px 1px 0 rgba(255, 255, 255, 0.2)',
  backgroundImage: 'radial-gradient(currentColor 7.5px, transparent 8.5px), radial-gradient(rgba(255, 255, 255, 0.6) 7.5px, transparent 8.5px), radial-gradient(rgba(0, 0, 0, 0.2) 7.5px, transparent 10.5px), radial-gradient(rgba(0, 0, 0, 0.2) 7.5px, transparent 10.5px)',
  backgroundSize: '27px 27px',
  backgroundPosition: '0px 0px, -0.5px -0.5px, 0px 0px, 3px 3px',
  backgroundRepeat: 'repeat'
});

const Legos = () => {
  return (
    <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
      <div className='flex flex-wrap justify-between filter drop-shadow-2xl'>
        <div className="p-1.5 w-14 h-28" style={brickStyle('#f63')}></div>
        <div className="p-1.5 w-14 h-14" style={brickStyle('#43a047')}></div>
        <div className="p-1.5 w-7 h-14" style={brickStyle('#039be5')}></div>
        <div className="p-1.5 w-7 h-7" style={brickStyle('#fdd835')}></div>
      </div>

      <div className='flex flex-wrap justify-between filter drop-shadow-2xl'>
        <ThousandCube transparent={false}/><HundredBoard transparent={false}/><TenBead transparent={false}/><OneUnit transparent={false}/>
      </div>
      
    </div>
  );
}

const App: NextPage = () => {
  return <Legos />
}

export default App;
