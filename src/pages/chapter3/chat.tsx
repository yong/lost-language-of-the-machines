import { NextPage } from 'next';

//import transition from "../transition";
import NextButton from '../../components/common/NextButton';
import ChatRoom from "../../react-chat/ChatRoom";


const initialMessages = [
    { d: 1, m: "How's your art project going?" },
    { d: 0, m: "Not very well😞" },
    { d: 1, m: "Why not?" },
    { d: 0, m: "Somehow I cann't stop thinking about the image encoding thing" },
    { d: 1, m: "😲 Oh no, I think Prof Evergreen has found a way to get into your mind!" },
    { d: 0, m: "Yep. It seems easy at the begining. The image can be represently by a collection of small colorful dots called pixels" },
    { d: 0, m: "For the jump man image, there are 16*16=256 pixels in total, each pixel can be encoding with RGB" },
    { d: 0, m: "so it is FFFFFF FFFFFF FFFFFF FFFFFF FFFFFF FF0000 FF0000 FF0000 FF0000 FF0000..." },
    { d: 1, m: "Yes, isn't that all? We got an image encoded in Binary! 🎉🎉🎉" },
    { d: 0, m: "But there is a problem! how to tell the computer this picture has 16 rows? Currently everyhing is in one big row!" },
    { d: 1, m: "Err... how about you put a note at the begining saying 'Dear computer, this image is 16*16, please start a new row after each 16 pixels'😜" },
    { d: 0, m: "Come on! I am really bother by this, can you find some real-world image format for reference? Better be OLD as they tend to be simpler" },
    { d: 1, m: "Sure, let me check my history book" },
    { d: 1, m: "Oh, here it is, BMP, the Bitmap Image File Format. 1985, pretty old huh?" },
    { d: 0, m: "OK, let me load its data..." },
    { d: 0, m: "ok, the data part is pretty the same ... RGB encoding... except they order the pixels upside down" },
    { d: 0, m: "Aha! Starlax, I think you are a true genius, they do put a note at the front" },
    { d: 1, m: "What? I was joking🥴" },
    { d: 0, m: "They call it header, bascially it starts with BM in ASCII (42 4D) to tell this is a bitmap format, then followed by some information about the file, like size of the file, and the width and height of the image (10 10)" },
    { d: 1, m: "Oh...too bad we didn't invent a new file format...I thought we can name it after my cat if we did. like 'Purry Nova Graphics', PNG for short " },
    { d: 0, m: "Come on😒...btw that name PNG was taken...Portable Network Graphics, 1996" }
];

const Chat: NextPage = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen w-full bg-black">
        <ChatRoom initialMessages={initialMessages}/>
        <NextButton url="/chapter4" />
        </div>
    );
}

export default Chat;