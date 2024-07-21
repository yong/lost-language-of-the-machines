//Chapter0.tsx
import BounceButton from '../common/BounceButton';
import renderParagraphs from '../common/renderParagraphs';

const storyParts = [
`“This is interesting” Flamey was impressed by the 200 years old video game in front of him. 

“How do you create a game like that?” Flamey asked, his circuits buzzing with curiosity.
“It’s quite simple,” the young assistant replied proudly. “Just say ‘Hello World!’ and the game world will be created.”
“I mean, how do you create a game from scratch, using computer languages?” Flamey persisted.
The assistant looked puzzled. “Computer languages? You know, everything runs on tokens now. That’s as low-level as it gets.”
“Can you go even lower?” Flamey asked, still unconvinced.
The assistant scratched his head. “Well… I’ve heard there’s a way, but nobody does it anymore. It’s… the lost language of the machines.”
“Where can I learn it?” Flamey’s excitement was palpable.
“You might want to talk to Professor Evergreen,” the assistant suggested. “He’s probably the only one who still understands it. But  be careful about it…” He added with a bit of hesitation. “There is rumor that he can make any topic into a long lecture.”
`,
]

const Chapter0 = () => {
    return (
        <article className="text-wrap p-6 md:p-12 lg:p-24 lg:ml-36 lg:mr-36">
            <h1 className="text-center text-2xl font-bold mb-4">Chapter 0 "Hello World!"</h1>
            {renderParagraphs(storyParts[0], 0)}
            <BounceButton url='chapter1'/>
        </article>
    )
}

export default Chapter0;