// LightBulb.js
import React, { useState, useEffect } from 'react';

const LightBulb = () => {
  const [isOn, setIsOn] = useState(false);
  const [sequence, setSequence] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the sequence based on light bulb state
      setSequence(prevSequence => {
        const newBit = isOn ? '1' : '0';
        const truncatedSequence = (prevSequence + newBit).slice(-20); // Keep the last 20 characters
        return truncatedSequence;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOn]);

  const toggleBulb = () => {
    // Immediately add "1" or "0" to the sequence
    const newBit = isOn ? '0' : '1';
    setSequence(prevSequence => (prevSequence + newBit));

    // Toggle the light bulb state
    setIsOn(!isOn);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      

      {/* Left div */}
      <div id="left" className="md:w-1/2">
        <img src="/chapter1/cat.png" alt="Cat" />
      </div>

      {/* Right div */}
      <div id="right" className="md:w-1/2 flex flex-col items-center justify-center">
        {/* Display sequence */}
      <div className="md:w-1/2 p-4 overflow-hidden">
        <p className="text-lg font-bold text-center">{sequence}</p>
      </div>
        <img
          src={isOn ? '/chapter1/light-on.svg' : '/chapter1/light-off.svg'}
          alt="Light Bulb"
          className="w-1/2 md:w-1/4 lg:w-1/6"
        />
        <button
          onClick={toggleBulb}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:animate-bounce"
          style={{ margin: 0 }} // Remove the button's margin
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
      </div>
    </div>
  );
};

export default LightBulb;
