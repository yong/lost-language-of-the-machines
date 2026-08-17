//Chapter4.tsx — built on the world's content primitives.
import { Story, Line, Beat, Forge } from '@/components/lab/world/prose';
import SpriteForge from './SpriteForge';

const Chapter4 = () => (
  <>
    <Story opening>The game was in color now. That was the problem.</Story>

    <Story>
      Because with the palette restored &mdash; every hex number back in its slot &mdash; Flamey and
      Starlax could finally see, in crisp and vivid detail, exactly how broken CATVENTURE still was.
      The title screen glowed. The score counter worked. And in the middle of the screen stood the
      hero of the game: the top half of a cat. Ears. Eyes. A confident little smile. And below the
      whiskers &mdash; nothing. A ragged edge of missing pixels.
    </Story>

    <Line who="starlax">Our hero is fifty percent off.</Line>

    <Story>
      They took the cartridge to Prof. Evergreen&rsquo;s office, which they had learned to find by
      following the smell of old electronics and disapproval. He plugged it into a reader and studied
      the screen for a long moment.
    </Story>

    <Line who="evergreen">
      The sprite sheet is damaged. A sprite &mdash; the ancients&rsquo; word for a small picture that
      moves. Your hero, the fish, the enemy. Each one is stored right here.
    </Line>

    <Story>He tapped the screen, and the cat-half dissolved into a grid of tiny squares.</Story>

    <Line who="starlax">
      Pixels. We know pixels. Every pixel is a color, and every color is a number.
    </Line>

    <Line who="evergreen">
      Then you know everything. A picture IS a grid of numbers. Nothing more. Sixteen pixels across,
      sixteen down. Two hundred fifty-six numbers, in a very particular order. Half of yours are
      missing.
    </Line>

    <Story>
      He produced, from a drawer that seemed to contain the entire Controlled Silicon Era, a paper
      printout. Actual paper. Rows and rows of hex numbers &mdash; and halfway down the page, a
      coffee-colored stain where the rest used to be.
    </Story>

    <Line who="flamey">
      Paint with WHAT? We don&rsquo;t know what the bottom of this cat looked like!
    </Line>

    <Beat />

    <Story>
      There was a soft thump. Nova, who had been asleep on the windowsill, stood up, stretched into a
      shape that physics should not allow, and arranged herself on Prof. Evergreen&rsquo;s desk in a
      perfect loaf: paws tucked, tail wrapped, entirely smug.
    </Story>

    <Line who="starlax">We have a model.</Line>

    <Forge restores="the hero sprite">
      <SpriteForge />
    </Forge>

    <Story>
      The modeling session did not go smoothly. They needed the cat standing; Nova loafed. They needed
      a walking pose; Nova loafed. Starlax held up a fish-shaped treat and Nova rose two centimeters
      into a taller, more alert loaf, which Flamey captured in sixty-four pixels before she subsided
      again.
    </Story>

    <Line who="starlax">
      It&rsquo;s fine. The hero is a loaf. Loaves are aerodynamic.
    </Line>

    <Story>
      Flamey squinted at the finished sprite, zoomed out to how it would look on a real screen,
      playing at full speed.
    </Story>

    <Line who="flamey">Be honest. Is that a cat or a mailbox?</Line>

    <Line who="starlax">It&rsquo;s eight millimeters tall. It&rsquo;s whatever you believe in.</Line>

    <Story>
      Prof. Evergreen loaded their numbers into the cartridge. On screen, the ragged half-cat
      flickered &mdash; and became whole. Ears, eyes, smile, loaf. The hero of CATVENTURE stood
      complete for the first time in two hundred years, wearing a body designed by committee and
      modeled by a cat who was already asleep again.
    </Story>

    <Line who="flamey" action="and meant it">It&rsquo;s beautiful.</Line>

    <Line who="evergreen">It is adequate.</Line>

    <Story>
      Which everyone present understood to mean the same thing.
    </Story>
  </>
);

export default Chapter4;
