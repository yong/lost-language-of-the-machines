//Chapter2.jsx
import NextButton from '../NextButton'
import Code from './Code'
import Hex from './Hex'
import Answer from './Answer'

const Chapter2 = () => {
    return (
        <article className="text-wrap p-6 md:p-12 lg:p-24">
            <h1 className="text-center text-2xl font-bold mb-4">Chapter 2 "ASCII"</h1>
<p className="mb-3 first-letter:text-7xl first-letter:font-bold first-letter:me-3 first-letter:float-start">
Despite a recent brush with overheating, Flamey spotted his friend Starlaxverse enthusiastically waving from the iconic blue steps of Literature Hall. "Flamey! Creative Writing too?"
</p>

<p className="mb-3">
"Indeed," Flamey replied, still climbing the stairs. "Running late again?"
</p>

<p className="mb-3">
"Not at all," Starlaxverse smiled. "But Mrs. Katseen's class is popular. Early arrival secures better seats."  
</p>

<p className="mb-3">
"True," Flamey agreed, recalling the lottery system implemented due to high demand. Entering the classroom, they were surprised to find Professor Evergreen behind a transparent carbon fiber desk, surrounded by empty chairs.  
</p>

<p className="mb-3">
"Apologies," Flamey started, unsure if they were in the right room.  
</p>

<p className="mb-3">
"This is Creative Writing," Professor Evergreen confirmed. "Sadly, a hybrid virus is sweeping the campus, striking many students and staff, including Mrs. Katseen. That’s why I’m here today as your substitute."
</p>

<p className="mb-3">
Flamey and Starlaxverse exchanged nervous glances. This wasn't exactly their planned adventure.  
</p>

<p className="mb-3">
"According to Mrs. Katseen's notes," Professor Evergreen continued, "we're to discuss ‘Aegis: Saga of Conflict, Idealism, and Identity’ a masterpiece penned by Edward Grant during the Third Human Robot War..." 
He paused. "You're familiar with it, I presume?"
</p>

<p className="mb-3">
"Yes," Starlaxverse replied. "Often called ASCII, this text laid the foundation for our harmonious coexistence."
</p>

<p className="mb-3">
"And I've done five book reports on it since kindergarten," Flamey added proudly.  
</p>

<p className="mb-3">
"ASCII, intriguing," Professor Evergreen murmured. "There's also an ancient text encoding method called ASCII, standing for American Standard Code for Information Interchange. Remember I mentioned binary representing anything? Have you considered how text can be encoded?"  
</p>


<p className="mb-3">
"No," Flamey confessed. "I thought binary was just for numbers."
</p>

<p className="mb-3">
"Precisely," Professor Evergreen said. "Since languages have finite letters and symbols, we can assign numbers to them. ASCII assigns 0-127 to represent English letters, both upper and lower case, along with special characters." Then he casted a chart in the air that showed the mapping.
</p>

<Hex/>

<p className="mb-3">
"Literature analysis is not  my area of expertise," he admitted, "and I would not want to give you a suboptimal experience. How about you two decipher a message using this ASCII together, then conclude our session?"
</p>

<p className="mb-3">
"Sure," Flamey and Starlaxverse agreed eagerly.  
</p>

<p className="mb-3">
"Here you go," Professor Evergreen projected a series of digits and letters. "Binary numbers can be lengthy, so we'll use hexadecimal, or hex, which is base 16. It uses 0-9 for values zero to nine, and A-F for ten to fifteen."
  
</p>

<p className="mb-3">He then presented the code:</p>

<Code/>

<p className="mb-3">
“So 54 is ‘T’, 68 is ‘h’, 65 is ‘e’....” The two friends started to translate. And the message slowly revealed itself: 
</p>

<Answer/>

<p className="mb-3">
“Wait a sec…”,  Flamey was puzzled, “The math does not seem right, where are the other 8 types?”
</p>

<p className="mb-3">
“Oh, Flamey….” Staverlax google, “now you are the one who doesn't understand binary”.
</p>

<p className="mb-3">
A beat of silence followed. Then, Flamey's metallic form vibrated with laughter. "This binary joke got me."
</p>

<NextButton url="/chapter3.html" />

</article>
    )
  }


export default Chapter2;