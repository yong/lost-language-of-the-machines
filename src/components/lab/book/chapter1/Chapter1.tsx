//Chapter1.tsx — rebuilt on the world's content primitives (see world/prose.tsx).
import Image from 'next/image';

import Poem from '@/components/chapter1/Poem';
import Rule2 from './Rule2';
import Rule3 from '@/components/chapter1/Rule3';
import FourSwitches from '@/components/chapter1/FourSwitches';
import { Story, Line, Slide, Play, Beat, Forge } from '@/components/lab/world/prose';
import ScoreCounter from './ScoreCounter';

import Rule1Image from '../../../../../public/chapter1/rule1.jpg';

const Chapter1 = () => (
  <>
    <Story opening>
      While it was still early in the morning, with fewer flying vehicles leaving traces in the sky,
      the only thing that disturbed the peaceful silence was Flamey&rsquo;s footsteps rattling on the
      dark carbon-titanium floor of the History Hall. A quick glance at his time tracker confirmed his
      worst fear: there were only two minutes left before the start of the &lsquo;Archaeology
      Principles: Controlled Silicon of the Past&rsquo; class.
    </Story>

    <Story>
      As he focused on getting there on time, he felt a tug on his arm and turned to see Starlax, his
      best human friend.
    </Story>

    <Line who="starlax" action="dragging him along">
      Oh, Flamey, I&rsquo;m so relieved you&rsquo;re here! Professor Evergreen is known to be a person
      with ATTITUDE.
    </Line>

    <Story>
      Flamey groaned. He wouldn&rsquo;t have signed up for this class if he had not missed the
      registration deadline for another history course. Why did he have to learn about the old
      languages from the Controlled Silicon Era that ancient computers used to speak? The textbook
      listed a lot of strange names like Binary, Assembly, C, Python, Javascript blah blah. They went
      extinct 500 years ago!
    </Story>

    <Story>
      They entered the room through a glass bubble door. Prof. Evergreen sat behind his desk,
      surrounded by empty chairs. As expected, they were the only two students today.
    </Story>

    <Line who="evergreen" action="not looking up from his notes">
      Excellent turnout. I have exactly 10 students this year.
    </Line>

    <Beat />

    <Story>
      Flamey counted the chairs. Then he counted himself and Starlax. He decided to let it go, which
      for a robot in teenage mode is a significant act of restraint.
    </Story>

    <Line who="evergreen">
      Well. I guess I have to adapt, otherwise this class will not be offered next year. As history
      has taught us, modern kids have no patience for long lectures. For today&rsquo;s topic &ndash;
      Binary &ndash; how about I start with a poem?
    </Line>

    <Slide title="EVERGREEN'S POEM">
      <Poem />
    </Slide>

    <Story>
      Flamey and Starlax looked at each other, not sure what to say. With the eager look of their
      professor waiting for feedback on his &ldquo;new&rdquo; style of teaching, Flamey slowly raised
      his hand.
    </Story>

    <Line who="flamey">
      Err&hellip; I want to know why Binary was invented? Why didn&rsquo;t ancient computers use
      NORMAL math, like 1, 2, 3, 4, 5&hellip;?
    </Line>

    <Line who="evergreen">
      Convenience, young droid. Just like the fact that humans having ten fingers contributed to the
      popularity of the 10-based number system. Ancient computers used electric signals to
      communicate. So naturally 1 represents On, 0 represents Off.
    </Line>

    <Story>
      He gestured, and a hologram of a cat trying to flip switches appeared in the air. The switches
      represent a sequence of Ones and Zeros &mdash; which can be used to represent anything,
      including numbers.
    </Story>

    <Play label="Flip the switches — what number are you holding?">
      <FourSwitches />
    </Play>

    <Story>
      Nova, who had smuggled herself into Starlax&rsquo;s bag, chose that moment to stroll across the
      hologram, flipping four switches at random with her tail.
    </Story>

    <Line who="evergreen" action="entirely unbothered">
      Ah. A random number generator.
    </Line>

    <Line who="starlax">
      Wow!
    </Line>

    <Story>
      Starlax was instantly convinced. It was clear that the image of the jumping cat had captured her
      imagination.
    </Story>

    <Slide title="RULE #1 — THE BASE">
      <div className="font-mono text-center">
        <div className="text-xl sm:text-2xl font-bold mb-2">
          When we say &ldquo;base-<span className="text-red-600">X</span>&rdquo;, we&rsquo;re talking
          about how many different symbols we use to represent numbers.
        </div>
        <div className="text-base mb-1">For example:</div>
        <div className="mb-3">
          In our everyday decimal system (base-<span className="text-red-600">10</span>), we have{' '}
          <span className="text-red-600">ten</span> symbols:{' '}
          <b className="text-blue-500">0,1,2,3,4,5,6,7,8,9</b>
          <br />
          In a binary system (base-<span className="text-red-600">2</span>), we have only{' '}
          <span className="text-red-600">two</span> symbols: <b className="text-blue-500">1</b> and{' '}
          <b className="text-blue-500">0</b>.
        </div>
        <div className="max-w-screen-md mx-auto flex items-center justify-center">
          <Image src={Rule1Image} alt="Rule 1: the base of a number system" />
        </div>
      </div>
    </Slide>

    <Line who="flamey">
      What if a number system&rsquo;s base is larger than ten? Don&rsquo;t we run out of digits to
      use?
    </Line>

    <Story>
      Flamey quickly found a way to argue &mdash; how can you blame him? His brain CPU is set to
      teenage mode; argument is his specialty.
    </Story>

    <Line who="evergreen" action="as if he had heard this question a million times">
      You can invent more symbols beyond 0 to 9, or just reuse existing symbols, like letters. For
      example, the 16-based number system (Hex) uses A for ten, B for eleven, C for twelve, D for
      thirteen, E for fourteen and F for fifteen.
    </Line>

    <Story>
      &ldquo;Oh&hellip;&rdquo; Flamey was a little disappointed that his question was answered so
      easily.
    </Story>

    <Line who="evergreen">
      Once we run out of single symbols, we combine them to build more complicated numbers. Remember
      Place Value from Elementary school? It is the value of each digit in a number based on its
      position.
    </Line>

    <Slide title="RULE #2 — PLACE VALUE">
      <Rule2 />
    </Slide>

    <Line who="flamey">
      Oh, it starts to make sense now. So binary actually works the same way as decimal &mdash; you
      count the place values, then add them up.
    </Line>

    <Line who="evergreen" action="nodding">
      Good find. That is how you convert a binary number into decimal. 1101 in binary is
      1&times;8 + 1&times;4 + 0&times;2 + 1&times;1, which is 13 in decimal.
    </Line>

    <Slide title="RULE #3 — COUNTING UP">
      <Rule3 />
    </Slide>

    <Story>
      &ldquo;Wow!&rdquo; said Starlax &mdash; not sure whether she was complimenting the rule or the
      cats on the slides holding signs.
    </Story>

    <Story>
      And that was when Flamey remembered the broken machine in the museum, and the garbage number
      flickering where its score should be. He pulled the cartridge out of his bag and looked at it
      properly for the first time since the class began.
    </Story>

    <Story>
      <b>1101.</b> Not garbage at all. Just a number, patiently waiting five hundred years for
      somebody to learn how to read it.
    </Story>

    <Forge restores="the score counter">
      <ScoreCounter />
    </Forge>

    <Line who="evergreen" action="already walking out">
      I&rsquo;d like to show you more, but we ran out of time. As science has shown, your attention
      must be depleted now.
    </Line>

    <Story>
      He left the room in a rush without even acknowledging his two students.
    </Story>

    <Line who="starlax">
      He is definitely a man with character, but not the way I expected.
    </Line>

    <Line who="flamey">
      Yep. Don&rsquo;t you think he overused cats to make a point?
    </Line>

    <Line who="starlax">
      Nope. There is no such thing as too many cats.
    </Line>
  </>
);

export default Chapter1;
