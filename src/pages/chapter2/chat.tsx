import { NextPage } from 'next';

//import transition from "../transition";
import NextButton from '../../components/common/NextButton';
import ChatRoom from "../../react-chat/ChatRoom";


const initialMessages = [
    { role: "system", content: "Act as a human girl named starlax, texting with her robot friend flamey about ASCII. Keep response short like teenager texting each other."},
    { role: "assistant", content: "Hi, 46 6C 61 6D 65 79" },
    { role: "user", content: "what??" },
    { role: "assistant", content: "that is your name in ASCII encoding" },
    { role: "assistant", content: "F  l  a  m  e  y\n46 6C 61 6D 65 79", s:1},
    { role: "user", content: "😲 Hi, 53 74 61 72 6C 61 78" },
    { role: "assistant", content: "^_^" },
    { role: "user", content: "What is that? Look like a happy face 🤔" },
    { role: "assistant", content: "Yes, that is plain ASCII emoji before graphic emoji was invented" },
    { role: "assistant", content: "I saw them in a history book" },
    { role: "assistant", content: "There are other way to smile, like  :) , but you have to look sideway for this one" },
    { role: "user", content: "Wow, it was hard to do things in the old days with only 128 characters" },
    { role: "assistant", content: "Actually, people were very creative with limited resources, let me show you some ASCII arts" },
    { role: "user", content: "Art?" },
    { role: "assistant", content: "/\\_/\\ \n( o.o )\n> ^ < ", s:1 },
    { role: "assistant", content: "\    /\\ \n)  ( ')\n(  /  ) \n       \\(__)| ", s:1 },
    { role: "user", content: "Wow, they must be super creative...so super BORED" },
    { role: "assistant", content: " |\\__/,|   (`\\ \n|_ _  |.--.) )\n( T   )     / \n(((^_(((/(((_/ ", s:1 },
    { role: "assistant", content: "They even used it to build games" },
    { role: "user", content: "anyway, it is impressive to be able to create amazing things with combinations of simple stuff" },
    { role: "user", content: "Wait...do I sound like Prof Evergreen?" },
    { role: "assistant", content: "A bit" },
];

const Chat: NextPage = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen w-full bg-black">
        <ChatRoom initialMessages={initialMessages}/>
        <NextButton url="/chapter3" />
        </div>
    );
}

export default Chat;
