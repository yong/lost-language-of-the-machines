//Chapter0.tsx — the hook: a broken machine, and a promise to fix it.
import { Story, Line, Beat } from '@/components/lab/world/prose';
import BrokenCabinet from './BrokenCabinet';

const Chapter0 = () => (
  <>
    <Story opening>
      &ldquo;This is interesting,&rdquo; Flamey said. He was standing in front of a two hundred year
      old video game &mdash; or what was left of it. The ancient arcade machine flickered: half a
      title, a score made of garbage symbols, and in the middle of the screen, the top half of a
      little pixel cat, waiting patiently for a body that never loaded.
    </Story>

    <BrokenCabinet />

    <Line who="flamey">
      What happened to it?
    </Line>

    <Story>
      The young museum assistant shrugged. &ldquo;It&rsquo;s been broken for decades. Half of its
      memory got erased somehow. Nobody can fix it.&rdquo;
    </Story>

    <Line who="flamey">
      Why not just make a new game? Just say &lsquo;Hello World!&rsquo; and a game world will be
      created.
    </Line>

    <Story>
      &ldquo;Sure, that would work,&rdquo; the assistant said. &ldquo;But it wouldn&rsquo;t be THIS
      game. To repair the old one, you&rsquo;d have to speak to the machine itself, in its own words.
      Computer languages.&rdquo;
    </Story>

    <Line who="flamey">
      Computer languages? You mean tokens?
    </Line>

    <Story>
      The assistant looked puzzled. &ldquo;No, no. Everything runs on tokens now, but this machine is
      older than tokens. Way lower level. Nobody speaks it anymore. It&rsquo;s&hellip;&rdquo; He
      lowered his voice, the way people do when a thing has become a legend.
      &ldquo;&hellip;the lost language of the machines.&rdquo;
    </Story>

    <Line who="flamey">
      Where can I learn it?
    </Line>

    <Story>
      &ldquo;You might want to talk to Professor Evergreen,&rdquo; the assistant suggested.
      &ldquo;He&rsquo;s probably the only one who still understands it. But be careful&hellip;&rdquo;
      He hesitated. &ldquo;There is a rumor that he can turn any topic into a long lecture.&rdquo;
    </Story>

    <Beat />

    <Story>
      Flamey looked back at the flickering screen, at the half-cat that had been waiting two hundred
      years for its other half.
    </Story>

    <Line who="flamey" action="quietly, to a machine that could not hear him">
      I&rsquo;m going to fix you.
    </Line>

    <Story>
      The machine, in a language nobody remembered, blinked.
    </Story>
  </>
);

export default Chapter0;
