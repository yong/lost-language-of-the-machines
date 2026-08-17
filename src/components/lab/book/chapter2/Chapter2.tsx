//Chapter2.tsx — rebuilt on the world's content primitives.
import Code from '@/components/chapter2/Code';
import Hex from '@/components/chapter2/Hex';
import Answer from '@/components/chapter2/Answer';
import AsciiTable from '@/components/chapter2/AsciiTable';
import { Story, Line, Slide, Beat } from '@/components/lab/world/prose';

const Chapter2 = () => (
  <>
    <Story opening>
      Despite a recent brush with overheating, Flamey spotted his friend Starlax enthusiastically
      waving from the iconic blue steps of Literature Hall.
    </Story>

    <Line who="starlax">Flamey! Creative Writing too?</Line>

    <Line who="flamey" action="still climbing the stairs">Indeed. Running late again?</Line>

    <Line who="starlax">
      Not at all. But Mrs. Katseen&rsquo;s class is popular. Early arrival secures better seats.
    </Line>

    <Story>
      Entering the classroom, they were surprised to find Professor Evergreen behind a transparent
      carbon fiber desk, surrounded by empty chairs.
    </Story>

    <Beat />

    <Line who="evergreen">
      This is Creative Writing. Sadly, a hybrid virus is sweeping the campus, striking many students
      and staff, including Mrs. Katseen. That&rsquo;s why I&rsquo;m here today as your substitute.
    </Line>

    <Story>
      Flamey and Starlax exchanged nervous glances. This wasn&rsquo;t exactly their planned adventure.
      Starlax quietly added another mark to a tally she had started keeping.
    </Story>

    <Line who="evergreen">
      According to Mrs. Katseen&rsquo;s notes, we&rsquo;re to discuss &lsquo;Aegis: Saga of Conflict,
      Idealism, and Identity&rsquo; &mdash; a masterpiece penned by Edward Grant during the Third
      Human Robot War. You&rsquo;re familiar with it, I presume?
    </Line>

    <Line who="starlax">
      Yes. Often called ASCII, this text laid the foundation for our harmonious coexistence.
    </Line>

    <Line who="flamey" action="proudly">
      And I&rsquo;ve done five book reports on it since kindergarten.
    </Line>

    <Line who="evergreen">
      ASCII, intriguing. There&rsquo;s also an ancient text encoding method called ASCII, standing for
      American Standard Code for Information Interchange. Remember I mentioned binary representing
      anything? Have you considered how text can be encoded?
    </Line>

    <Line who="flamey">I thought binary was just for numbers.</Line>

    <Line who="evergreen">
      Precisely. Since languages have finite letters and symbols, we can assign numbers to them. ASCII
      assigns 0&ndash;127 to represent English letters, both upper and lower case, along with special
      characters.
    </Line>

    <Slide title="THE ASCII TABLE">
      <AsciiTable />
    </Slide>

    <Line who="evergreen">
      Literature analysis is not my area of expertise, and I would not want to give you a suboptimal
      experience. How about you two decipher a message using this ASCII together, then conclude our
      session?
    </Line>

    <Story>Flamey and Starlax agreed eagerly.</Story>

    <Line who="evergreen">
      Before we do that, I have to teach you another thing. Binary numbers can be lengthy, so
      we&rsquo;ll use hexadecimal, or hex, which is base 16. It uses 0&ndash;9 for values zero to
      nine, and A&ndash;F for ten to fifteen.
    </Line>

    <Slide title="HEXADECIMAL">
      <Hex />
    </Slide>

    <Line who="flamey">
      What? When people discuss binary, they&rsquo;re actually referring to hex?
    </Line>

    <Story>
      Flamey&rsquo;s instinct was to declare this as &lsquo;cheating,&rsquo; but he halted mid-thought.
      Urgency tugged at him; he yearned to unravel the puzzle and slip out of class a little earlier.
    </Story>

    <Line who="evergreen" action="nodding">Yes, it happens a lot.</Line>

    <Slide title="THE CODED MESSAGE">
      <Code />
    </Slide>

    <Story>
      &ldquo;So 54 is &lsquo;T&rsquo;, 68 is &lsquo;h&rsquo;, 65 is &lsquo;e&rsquo;&hellip;&rdquo; The
      two friends started to translate. &ldquo;And 20 is a whitespace&hellip;&rdquo;
    </Story>

    <Story>And the message slowly revealed itself:</Story>

    <Slide title="DECODED">
      <Answer />
    </Slide>

    <Line who="flamey" action="puzzled">
      Wait a sec&hellip; The math does not seem right. Where are the other 8 types?
    </Line>

    <Beat />

    <Line who="starlax" action="giggling">
      Oh, Flamey&hellip; You are the one who doesn&rsquo;t understand binary.
    </Line>

    <Beat />

    <Story>
      Then Flamey&rsquo;s metallic form vibrated with laughter. &ldquo;This binary joke got me.&rdquo;
    </Story>

    <Story>
      On the way out, Starlax noticed something stamped into the corner of the old cartridge&rsquo;s
      label &mdash; eight characters that were not, it turned out, a serial number at all.
    </Story>

    <Story>
      <b>CA7F00D.</b> The ancients had hidden words inside their numbers. Mostly, it seemed, about
      food.
    </Story>
  </>
);

export default Chapter2;
