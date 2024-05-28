
import { NextPage } from 'next';

//import Bmp from '@/components/demo/Bmp';

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
      <div className='flex flex-wrap filter drop-shadow-2xl'>
        <div className="p-1.5 w-14 h-28" style={brickStyle('#f63')}></div>
        <div className="p-1.5 w-14 h-14" style={brickStyle('#43a047')}></div>
        <div className="p-1.5 w-7 h-14" style={brickStyle('#039be5')}></div>
        <div className="p-1.5 w-7 h-7" style={brickStyle('#fdd835')}></div>
      </div>
    </div>
  );
}

const App: NextPage = () => {
  return <Legos />
}

export default App;
