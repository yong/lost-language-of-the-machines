import { useDragAndDrop } from "@formkit/drag-and-drop/react";

const brickStyle = (color: string) => ({
  color: color,
  backgroundColor: 'currentColor',
  boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, 0.2), inset 1px 1px 0 rgba(255, 255, 255, 0.2)',
  backgroundImage: 'radial-gradient(currentColor 7.5px, transparent 8.5px), radial-gradient(rgba(255, 255, 255, 0.6) 7.5px, transparent 8.5px), radial-gradient(rgba(0, 0, 0, 0.2) 7.5px, transparent 10.5px), radial-gradient(rgba(0, 0, 0, 0.2) 7.5px, transparent 10.5px)',
  backgroundSize: '27px 27px',
  backgroundPosition: '0px 0px, -0.5px -0.5px, 0px 0px, 3px 3px',
  backgroundRepeat: 'repeat'
});

const TwoByFour = () => <div className="p-1.5 w-14 h-28" style={brickStyle('#f63')}></div>;
const TwoByTwo = () => <div className="p-1.5 w-14 h-14" style={brickStyle('#43a047')}></div>;
const OneByTwo = () => <div className="p-1.5 w-7 h-14" style={brickStyle('#039be5')}></div>;
const OneByOne = () => <div className="p-1.5 w-7 h-7" style={brickStyle('#757575')}></div>;

const componentMap = new Map([
  ['TwoByFour', TwoByFour],
  ['TwoByTwo', TwoByTwo],
  ['OneByTwo', OneByTwo],
  ['OneByOne', OneByOne]
]);

const Legos = () => {
  const [parentRef, items] = useDragAndDrop<HTMLDivElement, string>(
    Array.from(componentMap.keys())
  );

  return (
    <div ref={parentRef} className='flex flex-wrap justify-between filter drop-shadow-2xl p-10'>
      {items.map(item => {
        const Component = componentMap.get(item);
        return Component ? <Component key={item} /> : null;
      })}
    </div>
  );
}

export default Legos;
