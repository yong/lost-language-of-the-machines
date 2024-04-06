import transition from "../transition";
import NextButton from '../common/NextButton';
import ChatRoom from "../react-chat/ChatRoom";


const initialMessages = [
    { d: 0, m: "Hi, u there?" },
    { d: 1, m: "👋" },
    { d: 0, m: "Have you seen the homework?" },
    { d: 1, m: "y" },
    { d: 0, m: "What about the questions that convert Decimal into Binary?" },
    { d: 0, m: "He did not teach us how to do that 😠" },
    { d: 1, m: "yep, don't know why he left in a hurry" },
    { d: 1, m: "but the rule #2 convered in class leaves enough clues" },
    { d: 0, m: "Huh? How?" },
    { d: 1, m: "Say the decimal number is 13, we need to break it down into 2's place values - those multiples of two" },
    { d: 1, m: "13 = 8 + 4 + 1 = 1*8+1*4+0*2+1 = 1101 in binary" },
    { d: 1, m: "I found it is very tedious to break down larger numbers. Since your calculation unit is way better than my brain on this, may be you can find a better way?" },
    { d: 0, m: "You are a genius! Let me load this training data..." },
    { d: 0, m: "I got one! We can figure it out backward, first devide 13 by 2, got 6 and reminder of 1, the reminder will be the rightmost digits of the binary" },
    { d: 0, m: "keep deviding 6 by 2, got 3 and no reminder, so we have 01" },
    { d: 1, m: "$#%@#" },
    { d: 0, m: "Hub? anyway, keep deviding 3 by 2, got 1 and reminder of 1, write it down, 101" },
    { d: 0, m: "Finally, 1 divided by 2 is 0, reminder is 1, so we have 1101" },
    { d: 1, m: "RT%$^@#$%@#@##@^#@#$%@#burrrrrrrr" },
    { d: 0, m: "r u still there? is it your cat typing?" },
    { d: 0, m: "whatever, I will see you in class tomorrow" },
];

const Homework = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen w-full bg-black">
        <ChatRoom initialMessages={initialMessages}/>
        <NextButton url="/chapter2.html" />
        </div>
    );
}

export default Homework;