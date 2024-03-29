import transition from "../transition";
import NextButton from '../NextButton';

const Homework = () => {
    return (
        <div className="flex justify-center min-h-screen w-full bg-yellow-300">
        <h1>Homework</h1>
        <NextButton url="/chapter2.html" />
        </div>
    );
}

export default transition(Homework);