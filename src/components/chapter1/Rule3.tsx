//Rule2.tsx
import Image from "next/image";
import Rule2Image from '../../../public/chapter1/rule2.jpg';

const Rule3 = () => {
  return (
      <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
          <div className="max-w-screen-md mx-auto flex items-center justify-center">
              <Image src={Rule2Image} alt="rule2" />
          </div>
      </div>
  )
}

export default Rule3;
