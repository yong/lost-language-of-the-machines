import transition from "../transition";
import NextButton from '../NextButton';
import Chat from "./Chat";

const Homework = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen w-full bg-yellow-300">
        <Chat/>
        <NextButton url="/chapter2.html" />
        </div>
    );
}

export default transition(Homework);