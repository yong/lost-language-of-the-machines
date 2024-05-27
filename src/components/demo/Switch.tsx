import React, { useState } from "react";

interface ScrewProps {
  className: string;
}

const Screw: React.FC<ScrewProps> = ({ className }) => (
  <div
    className={`h-4 w-4 rounded-full ${className} bg-[#e3d4a5]`}
    style={{ boxShadow: "inset 0 2px 0 rgba(0,0,0,.15)" }}
  >
    <div
      className="h-full w-[2px] mx-auto bg-[rgba(0,0,0,0.2)]"
    ></div>
  </div>
);

const Switch: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      onClick={handleSwitch}
      className={`flex flex-col justify-between items-center h-72 w-48 z-10 m-auto mt-24 bg-[#fff4d3] rounded-lg ${isChecked ? "shadow-md" : ""}`}
    >
      <Screw className="mt-2" />
      <div
        className={`switch cursor-pointer h-36 w-24 bg-[#fffaea] rounded overflow-hidden ${isChecked ? "shadow-lg" : ""} flex flex-col justify-between`}
        style={{
          boxShadow: isChecked
            ? "0 10px 10px -5px rgba(233,219,176,1), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)"
            : "0 10px 10px -5px rgba(233,219,176,0), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)",
        }}
      >
        <div
          className={`block h-18 text-center leading-18 w-full ${isChecked ? "bg-[#fff4d3] text-[#64bf60]" : "bg-[#efe0b1] text-[#bfa371]"} rounded-t-lg`}
          style={{
            marginTop: isChecked ? "0px" : "5px",
            textShadow: isChecked ? "0 0 3px #38ff2e" : "none",
          }}
        >
          ON
        </div>
        <div
          className={`block h-16 text-center leading-16 w-full ${isChecked ? "bg-[#fffaea] text-[#d7bf95]" : "bg-[#fff4d3] text-[#a4441a]"} rounded-b-lg`}
          style={{
            marginBottom: isChecked ? "5px" : "0px",
            boxShadow: isChecked ? "0 5px 0 #d0b57b" : "none",
            textShadow: isChecked ? "0 0 0px transparent" : "0 0 3px #ff4e00",
          }}
        >
          OFF
        </div>
      </div>
      <Screw className="mb-2" />
    </div>
  );
};

export default Switch;
