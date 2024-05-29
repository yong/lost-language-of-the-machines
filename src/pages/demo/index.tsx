
import { NextPage } from 'next';

//import Bmp from '@/components/demo/Bmp';

const ThousandCube = () => {
  return (
    <div className="w-24 h-24" style={{ perspective: '600px' }}>
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(-15deg)', backgroundColor: '#BA8C63' }}>
        <div className="absolute w-24 h-24 grid grid-cols-10 grid-rows-10" style={{ transform: 'translateZ(50px)', backgroundColor: '#BA8C63' }}>{Array(100).fill(<div className="border border-black"></div>)}</div>
        <div className="absolute w-24 h-24 grid grid-cols-10 grid-rows-10" style={{ transform: 'rotateY(90deg) translateZ(48px)', backgroundColor: '#BA8C63' }}>{Array(100).fill(<div className="border border-black"></div>)}</div>
        <div className="absolute w-24 h-24 grid grid-cols-10 grid-rows-10" style={{ transform: 'rotateX(90deg) translateZ(48px)', backgroundColor: '#BA8C63' }}>{Array(100).fill(<div className="border border-black"></div>)}</div>
      </div>
    </div>
  );
}

const HundredBoard = () => {
  return (
    <div className="w-24 h-24" style={{ perspective: '600px' }}>
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(-15deg)', backgroundColor: '#BA8C63' }}>
        <div className="absolute w-24 h-24 grid grid-cols-10 grid-rows-10 border-black" style={{ transform: 'translateZ(5px)', backgroundColor: '#BA8C63' }}>{Array(100).fill(<div className="border border-black"></div>)}</div>
      </div>
    </div>
  );
}

const TenBead = () => {
  return (
    <div className="w-2.5 h-24" style={{ perspective: '600px' }}>
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(-15deg)', backgroundColor: '#BA8C63' }}>
        <div className="absolute w-2.5 h-24 grid grid-cols-1 grid-rows-10 border-black" style={{ transform: 'translateZ(5px)', backgroundColor: '#BA8C63' }}>{Array(10).fill(<div className="border border-black"></div>)}</div>
      </div>
    </div>
  );
}

const OneUnit = () => {
  return (
    <div className="w-2.5 h-2.5" style={{ perspective: '600px', backgroundColor: '#BA8C63' }}>
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(-15deg)', backgroundColor: '#BA8C63' }}>
        <div className="absolute w-2.5 h-2.5 border-2 border-black" style={{ backgroundColor: '#BA8C63' }}></div>
      </div>
    </div>
  );
}

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
        <ThousandCube/><HundredBoard/><TenBead/><OneUnit/>
      </div>
      
    </div>
  );
}

const App: NextPage = () => {
  return <Legos />
}

export default App;
