//Chapter3.jsx
import BounceButton from '../common/BounceButton'
import renderParagraphs from '../common/renderParagraphs';
import RGB from './RGB';
import RGB2 from './RGB2';

const storyParts = [
`Fall is always Flamey’s favorite season. The trees of green and skies of blue always put his mind at ease. On his way to the Art Studio, his mind was filled with thoughts about the art project he was going to do that day.

“Hi Flamey!” A familiar, cheerful voice came from behind. His friend, Starlax, approached him quickly on her jetpack. “Are we in the same class again?”
“Apparently,” Flamey said. “Art is my favorite subject.”
The two friends entered the studio together. It was still early, and the room was quite empty - except for Prof. Evergreen, who was sitting behind a painting and working on something.
“Oops,” Flamey exchanged a quick look with Starlax, calculating the possibility of having Evergreen as a substitute for their art teacher.
“Oh, you two,” Prof. Evergreen noticed them. “Did you get the notice that the art class has been moved to 3pm? I am borrowing this room to finish a piece of art of mine before the class starts.”
“No,” Flamey and Starlax shook their heads. Apparently, the notification system on the campus had malfunctioned again. Now they had one extra hour in the studio.
Starlax pulled out her screenbook and started to do some sketching. Meanwhile, Flamey’s attention was drawn to a fighting scene that Prof. Evergreen was drawing.
“What are they fighting with?” Flamey couldn’t hold back his curiosity any longer.
“Oh, that is a scene from an old movie named Star Wars. They are fighting with Lightsabers, a sword-like weapon made of lasers,” Prof. Evergreen answered. “It is a fascinating idea, but scientists nowadays still can’t find a way to make light stop mid-air,” he added.`,

///////

`“Cool,” Flamey was more interested now. He quickly loaded movie-related information into his knowledge unit. “So the guy with the red one is the bad guy, and the good guy has the green lightsaber. When the two lightsabers cross, it becomes yellow – that makes sense, just like when we mix red paint with green paint, it becomes yellow paint.”
“Good find,” nodded Prof. Evergreen, “Do you know how color is encoded in binary?” 
“Err…Just assign a number? I guess we do not have infinite colors, so that should work,” Flamey answered. He kind of regretted turning the conversation into a teaching moment.
“Right,” Prof. Evergreen paused his work and became eloquent. “Let’s start with one color, red. There are actually lots of different reds, light red, dark red, you can think of it as light, and we can assign 256 levels of brightness to it, which is 00 to FF in Hex, with FF being the brightest.” He showed a slide in the air:`,

//////

`“You can do more or less, but 256 levels are good enough in real life,” he added. “With those three primary colors assigned to a number, you can mix them to get any other colors, just like you can do with real paints.” Prof. Evergreen moved on. “One common way is called RGB (red, green, and blue) encoding, as in put the previous numbers in red, green, blue order, for example.” He cast another slide in the air:`,

//////

`“How do you encode a whole picture?” Starlax stopped her work and joined the conversation.
"There are lots of ways to do that,” Prof. Evergreen replied. But he paused as lots of other students started to enter the studio. “It seems I have to exit now. I will leave this picture as a clue. I am sure you can figure it out.”`

];

const Chapter3 = () => {
    return (
        <article className="text-wrap p-6 md:p-12 lg:p-24 lg:ml-36 lg:mr-36">
            <h1 className="text-center text-2xl font-bold mb-4">Chapter 3 "Color and Image"</h1>
            
            {renderParagraphs(storyParts[0], 0)}

            <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
                <div className="max-w-screen-md mx-auto flex items-center justify-center">
                    <img src="/chapter3/starwar.png" alt="starwar" />
                </div>
            </div>

            {renderParagraphs(storyParts[1], 1)}

            <RGB/>

            {renderParagraphs(storyParts[2], 2)}

            <RGB2/>

            {renderParagraphs(storyParts[3], 3)}

            <div className="mb-3 font-mono text-center bg-blue-200 border-4 border-dashed border-blue-500 p-4 rounded-lg">
                <div className="max-w-screen-md mx-auto flex items-center justify-center">
                    <img src="/chapter3/mario.png" alt="mario" />
                </div>
            </div>

            <BounceButton url='chapter3/chat'/>

        </article>
    )
  }


export default Chapter3;