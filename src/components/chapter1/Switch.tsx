//Switch.tsx
import Image from 'next/image';
import CatImage from '../../../public/chapter1/cat.png'

const Switch = () => {
    return (
        <div className="mb-3 text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
            <div className="max-w-screen-md mx-auto flex items-center justify-center">
            <Image src={CatImage} alt="Cat" />
            </div>
        </div>
    )
}

export default Switch;