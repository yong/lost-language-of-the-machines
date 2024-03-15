//Chapter1.jsx
import Poem from './Poem';
import Rule1 from './Rule1';

const Chapter1 = () => {
    return (
        <article className="text-wrap p-6 md:p-12 lg:p-24">
            <h1 className="text-center text-2xl font-bold mb-4">Chapter 1 "One and Zero"</h1>
<p className="mb-3 first-letter:text-7xl first-letter:font-bold first-letter:me-3 first-letter:float-start">Flamey dashed into the History Hall, his metal feet rattling on the carbon-titanium floor. He quickly glanced at the displays on his time tracker, wondering if he was late for his first day of Archaeology: Programmatic and Computational Studies of the Past class. He felt a tug on his arm and turned to see Starlaxverse, his best human friend.</p>

<p className="mb-3">“Oh, Flamey, I’m so relieved you’re here!” Starlaxverse exclaimed, dragging him along. “Professor Evergreen is known to be a person with ATTITUDE.”</p>

<p className="mb-3">Flamey groaned. He wouldn’t have signed up for this class if he had a choice. It was known to be dull and perplexing. Why did he have to learn about the old languages from the Controlled Silicon Age that ancient computers used to speak? The textbook listed a lot of strange names like Binary, Assembly, C, Python, Javascript blah blah. They went extinct 500 years ago!</p>

<p className="mb-3">They entered the room through a glass door, where Prof. Evergreen was sitting behind his desk with lots of empty chairs. As expected, they were the only two students today.</p>

<p className="mb-3">“Well,” he muttered. “I guess I have to adapt, otherwise this class will not be offered next year. As history has taught us, modern kids have no patience for long lectures. For today’s topic –Binary, how about I start with a poem?”</p>

<Poem/>

<p className="mb-3">Flamey and Starlaxverse looked at each other, not sure what to say. With the eager look of their professor waiting for feedback on his “new” style of teaching, Flamey slowly raised his hand and opened up: “Err… I want to know why Binary was invented? Why didn't ancient computers use NORMAL math, like 1,2,3,4,5…?”</p>

<p className="mb-3">“Convenience, young droid.” Prof. Evergreen elaborated, “Just like the fact that humans having ten fingers contributed to the popularity of the 10 based number system. Ancient computers used electric signals to communicate. So 1 represents On, 0 represents Off.” Professor gestured with his hand and a hologram of a cat flipping switch showed up. “By flipping the switch non stop, the cat generated the sequence of Ones and Zeros, which can be used to represent anything, including numbers”.</p>


<img src="/chapter1/cat.png"/>

<p className="mb-3">“Wow.” Starlaxverse was instantly convinced. Cat pictures are ageless for little girls like her.</p>
<p className="mb-3">“So here is the first rule of a number system”, Prof. Evergreen projected a slide in the air.</p>

<Rule1/>


<p className="mb-3">“What if a number system’s base is larger than ten? Don’t we run out of numbers to use?” Flamey quickly found a way to argue - how can you blame him? As his brain cpu is set to teenage mode, argument is his specialty.</p>

<p className="mb-3">“You can invent more symbols beyond 0 to 9, or just reuse existing symbols, like letters.” Prof. Evergreen replied as he had heard of this question millions of times. “For example, the 16-based number system (Hex), which is also very popular, uses: A for ten, B for eleven, C for twelve, D for thirteen, E for fourteen and F for fifteen.”</p>

<p className="mb-3">“Oh…” Flamey was a little disappointed that his question was answered so easily.</p>

<p className="mb-3">“Once we run out of single symbols – whatever the number is - we are going to combine them to build more complicated numbers. “ Prof. Evergreen continued, “Remember Place Value that you learned at Elementary school? It is the value of each digit in a number based on its position. Here is the second rule of a number system,” Prof. Evergreen casted another slide in the air:</p>

<img/>

<p className="mb-3">“Wow!” said Starlaxverse, not sure she was complimenting the rule or the cats on the slides wearing place value shirts.</p>

<p className="mb-3">“Oh, it starts to make sense now.” As immune to any cuteness as he can be, Flamey found something: “So you can convert a binary number into decimal by adding up those parts.”</p>

<p className="mb-3">“Good find.” Nodded Prof. Evergreen, ”But we ran out of time. As science has shown, your attention must be depleted now.” Prof. Evergreen walked out of the room in a rush without even acknowledging his two students.</p>

<p className="mb-3">“Hmm…” Starlaxverse looked at Flamey with a puzzled look, “He is definitely a man with character, but not the way I expected.”</p>

<p className="mb-3">“Yep.” Answered Flamey, “Don’t think he overused cats to make a point?”</p>

<p className="mb-3">“Nope”, Said Starlaxverse, “There is no such thing as too many cats.”</p>



</article>
    )
  }


export default Chapter1;