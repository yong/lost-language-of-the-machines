//Rule1.tsx
import Image from "next/image";
import Rule1Image from '../../../public/chapter1/rule1.jpg';

const Rule1 = () => {
    return (
        <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
            <div className="text-2xl font-bold"> When we say “base-<span className="text-red-600">X</span>”, we’re talking about how many different symbols we use to represent numbers.</div><br />
            <div className="text-base">For example:</div>
            <div>In our everyday decimal system (base-<span className="text-red-600">10</span>), we have <span className="text-red-600">ten</span> symbols: <b className="text-blue-500">0,1,2,3,4,5,6,7,8,9</b><br />
                In a binary system (base-<span className="text-red-600">2</span>), we have only <span className="text-red-600">two</span> symbols: <b className="text-blue-500">1</b> and <b className="text-blue-500">0</b>.</div><br />
            <div className="max-w-screen-md mx-auto flex items-center justify-center">
                <Image src={Rule1Image} alt="rule1" />
            </div>
        </div>
    )
}

export default Rule1;
