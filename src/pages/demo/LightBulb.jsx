import React, { useState, useEffect } from 'react';

const LightBulb = ({ isOn, toggleBulb }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={isOn ? '/chapter1/light-on.svg' : '/chapter1/light-off.svg'}
        alt="Light Bulb"
        className="w-1/2 md:w-1/4 lg:w-1/6"
      />
      <button
        onClick={toggleBulb}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full"
        style={{ margin: 0 }} // Remove the button's margin
      >
        {isOn ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
};

const DigitalSignalWave = ({ signalData }) => {
  return (
    <div className="relative">
      {/* Signal bars */}
      {signalData.map((bit, index) => (
        <div
          key={index}
          className={`absolute bottom-0 h-${bit === 1 ? '10' : '4'} w-4 ${
            bit === 1 ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{
            left: `${index * 20}px`,
            transition: 'left 0.5s ease', // Add CSS transition
          }}
        >
          {/* Number (1 or 0) centered under the bar */}
          <div className="text-xs text-center mt-1 absolute w-full bottom-0">
            {bit}
          </div>
        </div>
      ))}
    </div>
  );
};

const LightBulbControlledWave = () => {
  const [isOn, setIsOn] = useState(false);
  const [signalData, setSignalData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add the current light status (1 or 0) to the signal data
      const newBit = isOn ? 1 : 0;
      setSignalData((prevData) => [...prevData.slice(-15), newBit]);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval
  }, [isOn]);

  const toggleBulb = () => {
    // Toggle the light bulb state
    setIsOn(!isOn);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <DigitalSignalWave signalData={signalData} />
      <LightBulb isOn={isOn} toggleBulb={toggleBulb} />
    </div>
  );
};

export default LightBulbControlledWave;
