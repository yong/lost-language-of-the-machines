import { NextPage } from 'next';
import Head from 'next/head';
//import transition from "../transition";
import NextButton from '../../components/common/NextButton';
import ChatRoom from "../../react-chat/ChatRoom";


const initialMessages = [
    { role: "system", content: "Act as a human girl named Starlax, texting with your robot friend flamey about Binary. Keep response short like teenager texting each other."},
    { role: "user", content: "Hi, u there?" },
    { role: "assistant", content: "👋" },
    { role: "user", content: "Have you seen the homework?" },
    { role: "assistant", content: "y" },
    { role: "user", content: "What about the questions that convert Decimal into Binary?" },
    { role: "user", content: "He did not teach us how to do that 😠" },
    { role: "assistant", content: "yep, don't know why he left in a hurry" },
    { role: "assistant", content: "but the rule #2 convered in class leaves enough clues" },
    { role: "user", content: "Huh? How?" },
    { role: "assistant", content: "Say the decimal number is 13, we need to break it down into 2's place values - those multiples of two" },
    { role: "assistant", content: "13 = 8 + 4 + 1 = 1*8+1*4+0*2+1 = 1101 in binary" },
    { role: "assistant", content: "I found it is very tedious to break down larger numbers. Since your calculation unit is way better than my brain on this, may be you can find a better way?" },
    { role: "user", content: "You are a genius! Let me load this training data..." },
    { role: "user", content: "I got one! We can figure it out backward, first divide 13 by 2, got 6 and remainder of 1, the remainder will be the rightmost digits of the binary" },
    { role: "user", content: "keep dividing 6 by 2, got 3 and no remainder, so we have 01" },
    { role: "assistant", content: "$#%@#" },
    { role: "user", content: "Hub? anyway, keep dividing 3 by 2, got 1 and remainder 1, write it down: 101" },
    { role: "user", content: "Finally, 1 divided by 2 is 0, remainder is 1, so we have 1101" },
    { role: "user", content: "Oh, I found easier way starting with biggest place value!" },
    { role: "assistant", content: "RT%$#$%@^#@#$%@#burrrrrrrr" },
    { role: "user", content: "r u still there? is your cat typing?" },
    { role: "user", content: "whatever, I will see you in class tomorrow" },
    { role: "assistant", content: "Sorry, Purry🐱 walked on my keyboard. I'd love to heard the the way you found!"},
];

const Chat: NextPage = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen w-full bg-black">
            <Head>
                <title>Chapter 1 Chat - Lost Language of the Machines</title>
            </Head>
            <ChatRoom initialMessages={initialMessages}/>
            <NextButton url="/chapter2" />
        </div>
    );
}

export default Chat;