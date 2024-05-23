//Chapter1.tsx
import Poem from './Poem';
import Switch from './Switch';
import Rule1 from './Rule1';
import Rule2 from './Rule2';
import BounceButton from '../common/BounceButton';
import renderParagraphs from '../common/renderParagraphs';

const storyParts = [
`While it was still early in the morning, with fewer flying vehicles leaving traces in the sky, the only thing that disturbed the peaceful silence was Flamey’s footsteps rattling on the dark carbon-titanium floor of the History Hall. A quick glance at his time tracker confirmed his worst fear: there were only two minutes left before the start of the ‘Archaeology Principles: Controlled Silicon of the Past’ class. As he focused on getting there on time, he felt a tug on his arm and turned to see Starlax, his best human friend.

“Oh, Flamey, I’m so relieved you’re here!” Starlax exclaimed, dragging him along. “Professor Evergreen is known to be a person with ATTITUDE.”

Flamey groaned. He wouldn’t have signed up for this class if he had not missed the registration deadline for another history course. APCSP was known to be dull and perplexing. Why did he have to learn about the old languages from the Controlled Silicon Era that ancient computers used to speak? The textbook listed a lot of strange names like Binary, Assembly, C, Python, Javascript blah blah. They went extinct 500 years ago!

They entered the room through a glass bubble door, where Prof. Evergreen was sitting behind his desk with lots of empty chairs. As expected, they were the only two students today.

“Well,” Prof. Evergreen muttered. “I guess I have to adapt, otherwise this class will not be offered next year. As history has taught us, modern kids have no patience for long lectures. For today’s topic – Binary, how about I start with a poem?”`,

/////

`Flamey and Starlax looked at each other, not sure what to say. With the eager look of their professor waiting for feedback on his “new” style of teaching, Flamey slowly raised his hand and opened up: “Err… I want to know why Binary was invented? Why didn't ancient computers use NORMAL math, like 1,2,3,4,5…?”

“Convenience, young droid.” Prof. Evergreen elaborated, “Just like the fact that humans having ten fingers contributed to the popularity of the 10 based number system. Ancient computers used electric signals to communicate. So natually 1 represents On, 0 represents Off.” Professor gestured with his hand and a hologram of a cat flipping switch showed up. “By flipping the switch non stop, the cat generated the sequence of Ones and Zeros, which can be used to represent anything, including numbers”.`,

/////

`“Wow.” Starlax was instantly convinced. It was clear that the image of the cat had captured her imagination.
“So here is the first rule of a number system”, Prof. Evergreen projected a slide in the air:`,

/////

`“What if a number system’s base is larger than ten? Don’t we run out of numbers to use?” Flamey quickly found a way to argue - how can you blame him? As his brain cpu is set to teenage mode, argument is his specialty.

“You can invent more symbols beyond 0 to 9, or just reuse existing symbols, like letters.” Prof. Evergreen replied as he had heard of this question millions of times. “For example, the 16-based number system (Hex), which is also very popular, uses: A for ten, B for eleven, C for twelve, D for thirteen, E for fourteen and F for fifteen.”

“Oh…” Flamey was a little disappointed that his question was answered so easily.

“Once we run out of single symbols – whatever the number is - we are going to combine them to build more complicated numbers. “ Prof. Evergreen continued, “Remember Place Value that you learned at Elementary school? It is the value of each digit in a number based on its position. Here is the second rule of a number system,” Prof. Evergreen casted another slide in the air:`,

//////

`“Wow!” said Starlax, not sure she was complimenting the rule or the cats on the slides holding signs.

“Oh, it starts to make sense now.” As immune to any cuteness as he can be, Flamey found something: “So you can convert a binary number into decimal by adding up those parts.”

“Good find.” Nodded Prof. Evergreen, ”But we ran out of time. As science has shown, your attention must be depleted now.” Prof. Evergreen walked out of the room in a rush without even acknowledging his two students.

“Hmm…” Starlax looked at Flamey with a puzzled look, “He is definitely a man with character, but not the way I expected.”

“Yep.” Answered Flamey, “Don’t think he overused cats to make a point?”

“Nope”, Said Starlax, “There is no such thing as too many cats.”`
];

const Chapter1 = () => {
    return (
        <article className="text-wrap p-6 md:p-12 lg:p-24 lg:ml-36 lg:mr-36">
            <h1 className="text-center text-2xl font-bold mb-4">Chapter 1 "One and Zero"</h1>
            {renderParagraphs(storyParts[0], 0)}
            <Poem/>
            {renderParagraphs(storyParts[1], 1)}
            <Switch/>
            {renderParagraphs(storyParts[2], 2)}
            <Rule1/>
            {renderParagraphs(storyParts[3], 3)}
            <Rule2/>
            {renderParagraphs(storyParts[4], 4)}
            <BounceButton url='chapter1/chat'/>
        </article>
    )
}

export default Chapter1;
