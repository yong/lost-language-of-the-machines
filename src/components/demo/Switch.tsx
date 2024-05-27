import React, { useState } from "react";

interface ScrewProps {
  className: string;
}

const Screw: React.FC<ScrewProps> = ({ className }) => (
  <div
    className={`absolute h-4 w-4 rounded-full left-1/2 -translate-x-1/2 ${className} bg-[#e3d4a5]`}
    style={{ boxShadow: "inset 0 2px 0 rgba(0,0,0,.15)" }}
  >
    <div
      className="absolute h-full w-[2px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.2)]"
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
      style={{
        position: "relative",
        display: "block",
        height: "300px",
        width: "200px",
        zIndex: 1,
        margin: "100px auto 0 auto",
        backgroundColor: "#fff4d3",
        borderRadius: "10px",
        boxShadow: isChecked ? "0 2px 2px #d0b57b" : "none",
      }}
    >
      <Screw className="top-8" />
      <div
        className="switch"
        style={{
          cursor: "pointer",
          height: "150px",
          width: "100px",
          background: "#fffaea",
          position: "absolute",
          top: "50%",
          left: "50%",
          margin: "-75px 0 0 -50px",
          borderRadius: "5px",
          overflow: "hidden",
          boxShadow: isChecked
            ? "0 10px 10px -5px rgba(233,219,176,1), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)"
            : "0 10px 10px -5px rgba(233,219,176,0), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)",
        }}
      >
        <div
          style={{
            display: "block",
            position: "absolute",
            height: "75px",
            textAlign: "center",
            lineHeight: "75px",
            width: "100px",
            top: isChecked ? "0px" : "5px",
            left: "0",
            background: isChecked ? "#fff4d3" : "#efe0b1",
            color: isChecked ? "#64bf60" : "#bfa371",
            textShadow: isChecked ? "0 0 3px #38ff2e" : "none",
            borderRadius: "5px 5px 0 0",
          }}
        >
          ON
        </div>
        <div
          style={{
            display: "block",
            position: "absolute",
            height: "70px",
            textAlign: "center",
            lineHeight: "70px",
            width: "100px",
            bottom: "5px",
            left: "0",
            background: isChecked ? "#fffaea" : "#fff4d3",
            boxShadow: isChecked ? "0 5px 0 #d0b57b" : "none",
            color: isChecked ? "#d7bf95" : "#a4441a",
            textShadow: isChecked ? "0 0 0px transparent" : "0 0 3px #ff4e00",
            borderRadius: "0 0 5px 5px",
          }}
        >
          OFF
        </div>
      </div>
      <Screw className="bottom-8" />
    </div>
  );
};

export default Switch;
