import React, { FC } from 'react';
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

interface PlaceValueProps {
    cols: number;
    rows: number;
    depth: number;
}

const PlaceValue: FC<PlaceValueProps> = ({ cols, rows, depth }) => {
  const color = '#BA8C63';
  const borderColor = 'black';

  return (
    <div style={{ width: `${cols * 10}px`, height: `${rows * 10}px`, perspective: '600px' }}>
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(-15deg)', backgroundColor: color }}>
        {Array(depth).fill(0).map((_, i) => (
          <div key={i} className="absolute border-black" style={{ width: `${cols * 10}px`, height: `${rows * 10}px`, transform: `translateZ(${i * 10}px)`, backgroundColor: color, borderColor: borderColor, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
            {Array(cols * rows).fill(0).map((_, j) => ( <div key={j} className="border border-black"></div> ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const ThousandCube: FC = () => <PlaceValue cols={10} rows={10} depth={10} />;
export const HundredBoard: FC = () => <PlaceValue cols={10} rows={10} depth={1} />;
export const TenBead: FC = () => <PlaceValue cols={1} rows={10} depth={1} />;
export const OneUnit: FC = () => <PlaceValue cols={1} rows={1} depth={1} />;

const componentMap = new Map([
  ['ThousandCube', ThousandCube],
  ['HundredBoard', HundredBoard],
  ['TenBead', TenBead],
  ['OneUnit', OneUnit]
]);

const PlaceValues = () => {
  const [parentRef, items] = useDragAndDrop<HTMLDivElement, string>(
    Array.from(componentMap.keys())
  );

  return (
   <div ref={parentRef} className='flex flex-wrap justify-between filter drop-shadow-2xl pl-10 pb-10 pt-10'>
        {items.map(item => {
          const Component = componentMap.get(item);
          return Component ? <Component key={item} /> : null;
        })}
    </div>
  );
}

export default PlaceValues;
