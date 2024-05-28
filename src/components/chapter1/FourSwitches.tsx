import React, { useState } from "react";
import Image from "next/image";

import OnImage from '../../../public/chapter1/bulb-on.png'
import OffImage from '../../../public/chapter1/bulb-off.png'
import CatImage from '../../../public/chapter1/cat_reaching.png'

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
    isOn: boolean;
    handleSwitch: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleSwitch }) => {
    return (
        <div className="flex flex-col items-center justify-center w-1/4 border-t border-black mt-4">
            <Image
                src={isOn ? OnImage : OffImage}
                alt="Light Bulb"
                className="w-1/2 md:w-1/3 lg:w-1/4"
            />
            <div
                onClick={handleSwitch}
                className={"flex flex-col justify-between items-center h-28 w-20 m-auto mt-12 bg-[#fff4d3] rounded-lg shadow-md"}
            >
                <Screw className="mt-2" />
                <div
                    className="switch cursor-pointer h-14 w-10 bg-[#fffaea] rounded overflow-hidden flex flex-col justify-between"
                    style={{
                        boxShadow: isOn
                            ? "0 10px 10px -5px rgba(233,219,176,1), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)"
                            : "0 10px 10px -5px rgba(233,219,176,0), 0 0 0 1px rgba(0,0,0,.1), 0 0 0 4px #fff4d3,0 0 0 5px rgba(0,0,0,.1)",
                    }}
                >
                    <div
                        className={`block h-7 text-center leading-[19px] w-full ${isOn ? "mt-0 bg-[#fff4d3] text-[#64bf60]" : "mt-1 bg-[#fffaea] text-[#bfa371]"}`}
                        style={{
                            boxShadow: isOn ? "none" : "0 -5px 0 #d0b57b",
                            textShadow: isOn ? "0 0 3px #38ff2e" : "none",
                            borderRadius: "5px 5px 0 0",
                        }}
                    >
                        ON
                    </div>
                    <div
                        className={`block h-6 text-center leading-[16px] w-full ${isOn ? "mb-1 bg-[#fffaea] text-[#d7bf95]" : "mb-0 bg-[#fff4d3] text-[#a4441a]"}`}
                        style={{
                            boxShadow: isOn ? "0 5px 0 #d0b57b" : "none",
                            textShadow: isOn ? "0 0 0px transparent" : "0 0 3px #ff4e00",
                            borderRadius: "0 0 5px 5px",
                        }}
                    >
                        OFF
                    </div>
                </div>
                <Screw className="mb-2" />
            </div>
        </div>
    );
};

const FourSwitches: React.FC = () => {
    const [switchStates, setSwitchStates] = useState([true, true, false, true]);

    const handleSwitch = (index: number) => {
        setSwitchStates(switchStates.map((state, i) => i === index ? !state : state));
    };

    return (
        <div className="mb-3 flex flex-col items-center w-full bg-blue-200 border-4 border-dashed border-blue-500 rounded-lg">
            <div className="flex justify-between w-full">
                {switchStates.map((state, index) => (
                    <Switch key={index} isOn={state} handleSwitch={() => handleSwitch(index)} />
                ))}
            </div>
            <div className="flex justify-between w-full pt-12">
                <p className="flex-grow px-4 pb-4 font-mono">
                    <b>Switches Speak Binary!</b> When we look at them, they create a binary code: <b className="text-blue-500">{switchStates.map(state => state ? '1' : '0').join('')}</b>. 
                    Ancient computers use billions of tiny "switches" like these to store information.
                </p>
                <Image src={CatImage} alt="cat" layout="responsive" className="w-1/8 md:w-1/10 lg:w-1/12 animate-bounce"/>
            </div>

        </div>
    );
};

export default FourSwitches;
