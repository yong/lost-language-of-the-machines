//Chapter3.tsx — rebuilt on the world's content primitives.
import Image from 'next/image';
import RGB from '@/components/chapter3/RGB';
import RGB2 from '@/components/chapter3/RGB2';
import { Story, Line, Slide } from '@/components/lab/world/prose';

import StarWarImage from '../../../../../public/chapter3/starwar.png';

const Chapter3 = () => (
  <>
    <Story opening>
      Fall is always Flamey&rsquo;s favorite season. The trees of green and skies of blue always put
      his mind at ease. On his way to the Art Studio, his mind was filled with thoughts about the art
      project he was going to do that day.
    </Story>

    <Story>
      &ldquo;Hi Flamey!&rdquo; A familiar, cheerful voice came from behind. His friend Starlax
      approached quickly on her jetpack.
    </Story>

    <Line who="starlax">Are we in the same class again?</Line>

    <Line who="flamey">Apparently. Art is my favorite subject.</Line>

    <Story>
      The two friends entered the studio together. It was still early, and the room was quite empty
      &mdash; except for Prof. Evergreen, who was sitting behind a painting and working on something.
    </Story>

    <Line who="evergreen">
      Oh, you two. Did you get the notice that the art class has been moved to 3pm? I am borrowing
      this room to finish a piece of art of mine before the class starts.
    </Line>

    <Story>
      They shook their heads. Apparently, the notification system on the campus had malfunctioned
      again. Now they had one extra hour in the studio.
    </Story>

    <Story>
      Starlax pulled out her screenbook and started sketching. Meanwhile, Flamey&rsquo;s attention was
      drawn to a fighting scene that Prof. Evergreen was drawing.
    </Story>

    <Line who="flamey">What are they fighting with?</Line>

    <Line who="evergreen">
      Oh, that is a scene from an old movie named Star Wars. They are fighting with Lightsabers, a
      sword-like weapon made of lasers. It is a fascinating idea, but scientists nowadays still
      can&rsquo;t find a way to make light stop mid-air.
    </Line>

    <figure className="my-6 rounded-xl overflow-hidden border-4 border-dashed border-blue-400 bg-blue-50 p-3">
      <div className="max-w-screen-md mx-auto flex items-center justify-center">
        <Image src={StarWarImage} alt="Two lightsabers crossing — red and green making yellow" />
      </div>
    </figure>

    <Line who="flamey">
      So the guy with the red one is the bad guy, and the good guy has the green lightsaber. When the
      two lightsabers cross, it becomes yellow &mdash; that makes sense, just like when we mix red
      paint with green paint.
    </Line>

    <Line who="evergreen" action="nodding">
      Good find. Do you know how color is encoded in binary?
    </Line>

    <Line who="flamey">
      Err&hellip; just assign a number? I guess we do not have infinite colors, so that should work.
    </Line>

    <Story>He kind of regretted turning the conversation into a teaching moment.</Story>

    <Line who="evergreen">
      Right. Let&rsquo;s start with one color: red. There are lots of different reds &mdash; light
      red, dark red. You can think of it as light, and we can assign 256 levels of brightness to it,
      which is 00 to FF in hex, with FF being the brightest.
    </Line>

    <Slide title="256 LEVELS OF ONE COLOR">
      <RGB />
    </Slide>

    <Line who="evergreen">
      You can do more or less, but 256 levels are good enough in real life. With those three primary
      colors assigned to a number, you can mix them to get any other color, just like you can with
      real paints. One common way is called RGB encoding &mdash; red, green, and blue, in that order.
    </Line>

    <Slide title="RGB — THREE NUMBERS, ANY COLOR">
      <RGB2 />
    </Slide>

    <Line who="starlax">How do you encode a whole picture?</Line>

    <Line who="evergreen">
      There are lots of ways to do that&hellip;
    </Line>

    <Story>
      But he paused as other students started to enter the studio.
    </Story>

    <Line who="evergreen" action="already gathering his things">
      It seems I have to exit now. I will leave this picture as a clue. I am sure you can figure it
      out.
    </Line>

    <Story>
      That evening, Flamey fed the restored palette into the cartridge. The game had been grey for two
      hundred years. It came back in colour all at once &mdash; and that was how they found out that
      the hero of CATVENTURE was missing everything below the whiskers.
    </Story>
  </>
);

export default Chapter3;
