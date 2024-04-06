import transition from "../transition";
import NextButton from '../common/NextButton';
import ChatRoom from "../react-chat/ChatRoom";


const initialMessages = [
    { d: 1, m: "Hi, 70 108 97 109 101 121" },
    { d: 0, m: "what??" },
    { d: 1, m: "that is your name in ASCII encoding" },
    { d: 1, m: "F l a m e y" },
    { d: 0, m: "😲 Hi,  83 116 97 114 108 97 120 118 101 114 115 101" },
    { d: 1, m: "^_^" },
    { d: 0, m: "What is that? Look like a happy face 🤔" },
    { d: 1, m: "Yes, that is plain ASCII emoji before graphic emoji was inverted" },
    { d: 1, m: "I saw them in a history book" },
    { d: 1, m: "There are other way to smile, like  :) , but you have to look sideway for this one" },
    { d: 0, m: "Wow, it is hard to do things in the old days with only 128 characters" },
    { d: 1, m: "Actually, they were very creative with limited resources, let me show you some ASCII arts" },
    { d: 0, m: "Art?" },
    { d: 1, m: "/\\_/\\ \n( o.o )\n> ^ < ", s:1 },
    { d: 1, m: "\    /\\ \n)  ( ')\n(  /  ) \n       \\(__)| ", s:1 },
    { d: 0, m: "Wow, they must be super creative...so super BORED" },
    { d: 1, m: " |\\__/,|   (`\\ \n|_ _  |.--.) )\n( T   )     / \n(((^_(((/(((_/ ", s:1 },
    { d: 0, m: "anyway, it is impressive to be able to create amazing things with simple stuff" },
    { d: 0, m: "Wait...do I sound like Prof Evergreen?" },
];

const Homework = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen w-full bg-black">
        <ChatRoom initialMessages={initialMessages}/>
        <NextButton url="/chapter3.html" />
        </div>
    );
}

export default Homework;