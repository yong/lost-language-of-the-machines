//Chapter2.tsx
import BounceButton from '../common/BounceButton'
import Code from './Code'
import Hex from './Hex'
import Answer from './Answer'
import AsciiTable from './AsciiTable'
import renderParagraphs from '../common/renderParagraphs'

const storyParts = [
`Despite a recent brush with overheating, Flamey spotted his friend Starlax enthusiastically waving from the iconic blue steps of Literature Hall. "Flamey! Creative Writing too?"

"Indeed," Flamey replied, still climbing the stairs. "Running late again?"

"Not at all," Starlax smiled. "But Mrs. Katseen's class is popular. Early arrival secures better seats."  

"True," Flamey agreed, recalling the lottery system implemented due to high demand. Entering the classroom, they were surprised to find Professor Evergreen behind a transparent carbon fiber desk, surrounded by empty chairs.  

"Apologies," Flamey started, unsure if they were in the right room.  

"This is Creative Writing," Professor Evergreen confirmed. "Sadly, a hybrid virus is sweeping the campus, striking many students and staff, including Mrs. Katseen. That’s why I’m here today as your substitute."

Flamey and Starlax exchanged nervous glances. This wasn't exactly their planned adventure.  

"According to Mrs. Katseen's notes," Professor Evergreen continued, "we're to discuss 'Aegis: Saga of Conflict, Idealism, and Identity' a masterpiece penned by Edward Grant during the Third Human Robot War..." 
He paused. "You're familiar with it, I presume?"

"Yes," Starlax replied. "Often called ASCII, this text laid the foundation for our harmonious coexistence."

"And I've done five book reports on it since kindergarten," Flamey added proudly.  

"ASCII, intriguing," Professor Evergreen murmured. "There's also an ancient text encoding method called ASCII, standing for American Standard Code for Information Interchange. Remember I mentioned binary representing anything? Have you considered how text can be encoded?"  

"No," Flamey confessed. "I thought binary was just for numbers."

"Precisely," Professor Evergreen said. "Since languages have finite letters and symbols, we can assign numbers to them. ASCII assigns 0-127 to represent English letters, both upper and lower case, along with special characters." Then he casted a chart in the air that showed the mapping.`,
//////////////////

`Literature analysis is not  my area of expertise," he admitted, "and I would not want to give you a suboptimal experience. How about you two decipher a message using this ASCII together, then conclude our session?"

"Sure," Flamey and Starlax agreed eagerly.  `,

/////////////////
`"Before we do that, I have to teach you another thing," Professor Evergreen projected a slide. "Binary numbers can be lengthy, so we'll use hexadecimal, or hex, which is base 16. It uses 0-9 for values zero to nine, and A-F for ten to fifteen."

“What? When people discuss binary, they’re actually referring to hex?” Flamey’s instinct was to declare this as ‘cheating,’ but he halted mid-thought. Urgency tugged at him; he yearned to unravel the puzzle and slip out of class a little earlier.

"Yes, it happens a lot", Prof Evergrenn nodded. He then presented the code:`,

/////////////////
`“So 85 is ‘T’, 72 is ‘H’, 69 is ’E’....” The two friends started to translate. "And 20 is a whitespace..." 

And the message slowly revealed itself: `,

////////////////

`“Wait a sec…”,  Flamey was puzzled, “The math does not seem right, where are the other 8 types?”

“Oh, Flamey….” Starlax giggled, “You are the one who doesn't understand binary”.

A beat of silence followed. Then, Flamey's metallic form vibrated with laughter. "This binary joke got me."`
];

const Chapter2 = () => {
    return (
        <article className="text-wrap p-6 md:p-12 lg:p-24 lg:ml-36 lg:mr-36">
            <h1 className="text-center text-2xl font-bold mb-4">Chapter 2 "ASCII"</h1>
            {renderParagraphs(storyParts[0], 0)}
            <AsciiTable/>
            {renderParagraphs(storyParts[1], 1)}
            <Hex/>
            {renderParagraphs(storyParts[2], 2)}
            <Code/>
            {renderParagraphs(storyParts[3], 3)}
            <Answer/>
            {renderParagraphs(storyParts[4], 4)}
            <BounceButton url='chapter2/chat'/>
        </article>
    )
}

export default Chapter2;
