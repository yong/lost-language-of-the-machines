import React, { useState } from "react";
import Image from "next/image";

import OnImage from '../../../public/chapter1/bulb-on.png'
import OffImage from '../../../public/chapter1/bulb-off.png'

interface ScrewProps {
    className: string;
}

const Screw: React.FC<ScrewProps> = ({ className }) => (
    <div
        className={`h-2 w-2 rounded-full ${className} bg-[#e3d4a5]`}
        style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,.15)" }}
    >
        <div
            className="h-full w-[1px] mx-auto bg-[rgba(0,0,0,0.2)]"
        ></div>
    </div>
);

interface SwitchProps {
    intialState: boolean;
}

const Switch: React.FC<SwitchProps> = ({intialState}) => {
    const [isOn, setIsOn] = useState(intialState);

    const handleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="flex flex-col items-center justify-center  w-1/4">
        <Image
          src={isOn ? OnImage : OffImage}
          alt="Light Bulb"
          className="w-1/2 md:w-1/3 lg:w-1/4"
        />
        <div
            onClick={handleSwitch}
            className={"flex flex-col justify-between items-center h-36 w-24 z-10 m-auto mt-16 bg-[#fff4d3] rounded-lg shadow-md"}
        >
            <Screw className="mt-4" />
            <div
                className="switch cursor-pointer h-18 w-12 bg-[#fffaea] rounded overflow-hidden flex flex-col justify-between"
                style={{
                    boxShadow: isOn
                        ? "0 10px 10px -5px rgba(233,219,176,1), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)"
                        : "0 10px 10px -5px rgba(233,219,176,0), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)",
                }}
            >
                <div
                    className={`block h-9 text-center leading-[38px] w-full ${isOn ? "mt-0 bg-[#fff4d3] text-[#64bf60]" : "mt-1 bg-[#efe0b1] text-[#bfa371]"}`}
                    style={{
                        textShadow: isOn ? "0 0 3px #38ff2e" : "none",
                        borderRadius: "5px 5px 0 0",
                    }}
                >
                    ON
                </div>
                <div
                    className={`block h-8 text-center leading-[35px] w-full ${isOn ? "mb-1 bg-[#fffaea] text-[#d7bf95]" : "mb-0 bg-[#fff4d3] text-[#a4441a]"}`}
                    style={{
                        boxShadow: isOn ? "0 5px 0 #d0b57b" : "none",
                        textShadow: isOn ? "0 0 0px transparent" : "0 0 3px #ff4e00",
                        borderRadius: "0 0 5px 5px",
                    }}
                >
                    OFF
                </div>
            </div>
            <Screw className="mb-4" />
        </div>
        </div>
    );
};

const FourSwitches: React.FC = () => {
    return (
        <div className="flex justify-between w-full">
            <Switch intialState={true} />
            <Switch intialState={true} />
            <Switch intialState={false} />
            <Switch intialState={true} />
        </div>
    );
};

export default FourSwitches;
