import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const BounceButton = ({url}) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(url);
    };
  
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <LaterTonight/>
        <div onClick={handleClick} className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full">
          <svg className="w-6 h-6 text-violet-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    )
  }
  
  const LaterTonight = () => {
    return (
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Later tonight...',
          1000, // wait 1s
          'In the dormitory...',
          1000
        ]}
        className="text-2xl font-bold mb-4"
        wrapper="span"
        speed={50}
       
        repeat={Infinity}
      />
    );
  };

export default BounceButton;