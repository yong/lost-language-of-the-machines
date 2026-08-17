import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CoverScene from '@/components/lab/scenes/CoverScene';
import GameScene from '@/components/lab/scenes/GameScene';
import SceneNav from '@/components/lab/scenes/SceneNav';
import Poem from '@/components/chapter1/Poem';
import { coverImage, coverTitle, coverSubtitle } from '@/components/lab/shared/content';
import FullscreenChat from '@/components/lab/shared/FullscreenChat';

gsap.registerPlugin(ScrollTrigger);

const sceneLabels = ['Cover', 'Story', 'Switches', 'Chat', 'Closing'];

const storyText = [
  `While it was still early in the morning, with fewer flying vehicles leaving traces in the sky, the only thing that disturbed the peaceful silence was Flamey's footsteps rattling on the dark carbon-titanium floor of the History Hall. A quick glance at his time tracker confirmed his worst fear: there were only two minutes left before the start of the 'Archaeology Principles: Controlled Silicon of the Past' class.`,

  `As he focused on getting there on time, he felt a tug on his arm and turned to see Starlax, his best human friend. "Oh, Flamey, I'm so relieved you're here!" Starlax exclaimed, dragging him along. "Professor Evergreen is known to be a person with ATTITUDE."`,

  `Flamey groaned. He wouldn't have signed up for this class if he had not missed the registration deadline for another history course. APCSP was known to be dull and perplexing. Why did he have to learn about the old languages from the Controlled Silicon Era that ancient computers used to speak?`,

  `They entered the room through a glass bubble door, where Prof. Evergreen was sitting behind his desk with lots of empty chairs. As expected, they were the only two students today.`,

  `"Well," Prof. Evergreen muttered. "I guess I have to adapt. For today's topic – Binary, how about I start with a poem?"`,
];

const storyText2 = [
  `Flamey and Starlax looked at each other, not sure what to say. With the eager look of their professor waiting for feedback on his "new" style of teaching, Flamey slowly raised his hand and opened up: "Err… I want to know why Binary was invented? Why didn't ancient computers use NORMAL math, like 1,2,3,4,5…?"`,

  `"Convenience, young droid." Prof. Evergreen elaborated, "Just like the fact that humans having ten fingers contributed to the popularity of the 10 based number system. Ancient computers used electric signals to communicate. So naturally 1 represents On, 0 represents Off."`,
];

const storyText3 = [
  `"Wow!" said Starlax, not sure she was complimenting the rule or the cats on the slides holding signs.`,

  `"I'd like to show you more, but we ran out of time. As science has shown, your attention must be depleted now." Prof. Evergreen walked out of the room in a rush without even acknowledging his two students.`,

  `"Hmm…" Starlax looked at Flamey with a puzzled look, "He is definitely a man with character, but not the way I expected."`,

  `"Yep." Answered Flamey, "Don't think he overused cats to make a point?"`,

  `"Nope", Said Starlax, "There is no such thing as too many cats."`,
];


const Lab2: NextPage = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const story2Ref = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainTextRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import lenis for smooth scroll
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.1 });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    // Animate story paragraphs fading in
    const animateSection = (ref: HTMLDivElement | null, selector: string) => {
      if (!ref) return;
      gsap.utils.toArray<HTMLElement>(`${selector} > *`).forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 60%', toggleActions: 'play none none none' },
          }
        );
      });
    };

    animateSection(storyRef.current, '.story-section');
    animateSection(story2Ref.current, '.story2-section');
    animateSection(closingRef.current, '.closing-section');

    // Pinned curtain — creates a pacing break before chat
    if (curtainRef.current && curtainTextRef.current) {
      const curtainTl = gsap.timeline({
        scrollTrigger: {
          trigger: curtainRef.current,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.5,
        },
      });
      // Text fades in, holds, then fades out
      curtainTl.fromTo(curtainTextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0);
      curtainTl.to(curtainTextRef.current, { opacity: 0, y: -10, duration: 0.3 }, 0.7);
    }

    // Pinned chat entrance — scroll drives UI assembly, not page movement
    if (chatRef.current) {
      const header = chatRef.current.querySelector('[data-chat-header]');
      const inputBar = chatRef.current.querySelector('[data-chat-input]');
      const instantMsgs = chatRef.current.querySelectorAll('[data-instant]');

      // Set initial hidden states
      if (header) gsap.set(header, { yPercent: -100, opacity: 0 });
      if (inputBar) gsap.set(inputBar, { yPercent: 100, opacity: 0 });
      gsap.set(instantMsgs, { opacity: 0, y: 15 });

      const chatTl = gsap.timeline({
        scrollTrigger: {
          trigger: chatRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.3,
        },
      });

      // Phase 1: Header drops down, input bar rises up
      chatTl.to(header, { yPercent: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0);
      chatTl.to(inputBar, { yPercent: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.05);

      // Phase 2: Messages stagger in rapidly
      chatTl.to(instantMsgs, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        stagger: 0.07,
        ease: 'power2.out',
      }, 0.15);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Lab 2: Scene Shift - Lost Language of the Machines</title>
      </Head>

      <SceneNav scenes={sceneLabels} />

      <div className="bg-gray-950">
        {/* Section 1: Cover with cinematic Ken Burns */}
        <CoverScene image={coverImage} title={coverTitle} subtitle={coverSubtitle} />

        {/* Section 2: Story — normal readable paragraphs with fade-in */}
        <div ref={storyRef} className="story-section max-w-2xl mx-auto px-6 py-24 text-gray-300 text-base leading-relaxed">
          {storyText.map((p, i) => (
            <p key={i} className={`mb-6 ${i === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:float-start first-letter:me-3' : ''}`}>
              {p}
            </p>
          ))}

          {/* Poem inline */}
          <div className="my-12">
            <Poem />
          </div>

          <div ref={story2Ref} className="story2-section">
            {storyText2.map((p, i) => (
              <p key={i} className="mb-6">{p}</p>
            ))}
          </div>
        </div>

        {/* Section 3: Game — spotlight reveal */}
        <GameScene />

        {/* Section 4: More story */}
        <div ref={closingRef} className="closing-section max-w-2xl mx-auto px-6 py-24 text-gray-300 text-base leading-relaxed">
          {storyText3.map((p, i) => (
            <p key={i} className="mb-6">{p}</p>
          ))}
        </div>

        {/* Curtain — pinned black screen with time jump text */}
        <div ref={curtainRef} className="h-screen w-full bg-black flex items-center justify-center">
          <div ref={curtainTextRef} className="text-center opacity-0">
            <div className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3">Later that evening</div>
            <div className="w-12 h-px bg-white/20 mx-auto" />
          </div>
        </div>

        {/* Section 5: Fullscreen chat — pinned entrance */}
        <div ref={chatRef} className="min-h-screen">
          <FullscreenChat theme="dark" showTimeLabel={false} instantCount={8} deferInstant />
        </div>
      </div>
    </>
  );
};

export default Lab2;
