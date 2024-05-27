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
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "300px",
        width: "200px",
        zIndex: 1,
        margin: "100px auto 0 auto",
        backgroundColor: "#fff4d3",
        borderRadius: "10px",
        boxShadow: isChecked ? "0 2px 2px #d0b57b" : "none",
      }}
    >
      <Screw className="mt-8" />
      <div
        className="switch"
        style={{
          cursor: "pointer",
          height: "150px",
          width: "100px",
          background: "#fffaea",
          borderRadius: "5px",
          overflow: "hidden",
          boxShadow: isChecked
            ? "0 10px 10px -5px rgba(233,219,176,1), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)"
            : "0 10px 10px -5px rgba(233,219,176,0), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "block",
            height: "75px",
            textAlign: "center",
            lineHeight: "75px",
            width: "100%",
            marginTop: isChecked ? "0px" : "5px",
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
            height: "70px",
            textAlign: "center",
            lineHeight: "70px",
            width: "100%",
            marginBottom: isChecked ? "5px" : "0px",
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
      <Screw className="mb-8" />
    </div>
  );
};

export default Switch;
