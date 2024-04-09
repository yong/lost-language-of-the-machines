//import transition from "../transition";
import NextButton from '../common/NextButton';
import ChatRoom from "../react-chat/ChatRoom";


const initialMessages = [
    { d: 1, m: "Hi, 46 6C 61 6D 65 79" },
    { d: 0, m: "what??" },
    { d: 1, m: "that is your name in ASCII encoding" },
    { d: 1, m: "F  l  a  m  e  y\n46 6C 61 6D 65 79", s:1},
    { d: 0, m: "😲 Hi, 53 74 61 72 6C 61 78" },
    { d: 1, m: "^_^" },
    { d: 0, m: "What is that? Look like a happy face 🤔" },
    { d: 1, m: "Yes, that is plain ASCII emoji before graphic emoji was invented" },
    { d: 1, m: "I saw them in a history book" },
    { d: 1, m: "There are other way to smile, like  :) , but you have to look sideway for this one" },
    { d: 0, m: "Wow, it was hard to do things in the old days with only 128 characters" },
    { d: 1, m: "Actually, people were very creative with limited resources, let me show you some ASCII arts" },
    { d: 0, m: "Art?" },
    { d: 1, m: "/\\_/\\ \n( o.o )\n> ^ < ", s:1 },
    { d: 1, m: "\    /\\ \n)  ( ')\n(  /  ) \n       \\(__)| ", s:1 },
    { d: 0, m: "Wow, they must be super creative...so super BORED" },
    { d: 1, m: " |\\__/,|   (`\\ \n|_ _  |.--.) )\n( T   )     / \n(((^_(((/(((_/ ", s:1 },
    { d: 1, m: "They even used it to build games" },
    { d: 0, m: "anyway, it is impressive to be able to create amazing things with combinations of simple stuff" },
    { d: 0, m: "Wait...do I sound like Prof Evergreen?" },
];

const Chat = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen w-full bg-black">
        <ChatRoom initialMessages={initialMessages}/>
        <NextButton url="/chapter3.html" />
        </div>
    );
}

export default Chat;