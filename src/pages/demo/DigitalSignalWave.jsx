import React, { useState, useEffect } from 'react';

const DigitalSignalWave = () => {
  // Simulated data for the signal (1s and 0s)
  const initialSignalData = [1, 0, 1, 0, 1, 1, 0, 0, 1, 0];
  const [signalData, setSignalData] = useState(initialSignalData);

  useEffect(() => {
    // Shift the bars to the left every second
    const interval = setInterval(() => {
      setSignalData((prevData) => {
        const newData = [...prevData];
        newData.shift(); // Remove the first element
        const randomBit = Math.random() < 0.5 ? 0 : 1; // Generate a random 0 or 1
        newData.push(randomBit); // Add the new random bit at the end
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <div className="relative">
      {/* Signal bars */}
      {signalData.map((bit, index) => (
        <div
          key={index}
          className={`absolute bottom-0 h-${bit === 1 ? '10' : '4'} w-4 ${
            bit === 1 ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ left: `${index * 20}px` }} // Adjust spacing between bars
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

export default DigitalSignalWave;
