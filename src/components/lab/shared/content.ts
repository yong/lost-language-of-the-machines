// Shared content data for all lab pages — extracted from Chapter 1

export interface TimelineItem {
  type: 'narrator' | 'chat' | 'game' | 'poem' | 'heading';
  role?: 'user' | 'assistant' | 'system';
  content?: string;
  component?: string; // 'FourSwitches' | 'Poem'
}

export const coverImage = '/chapter1/cover.jpg';
export const coverTitle = 'Chapter 1';
export const coverSubtitle = '"One and Zero"';

export const timeline: TimelineItem[] = [
  { type: 'heading', content: 'Chapter 1 "One and Zero"' },

  // Story part 1
  { type: 'narrator', content: `While it was still early in the morning, with fewer flying vehicles leaving traces in the sky, the only thing that disturbed the peaceful silence was Flamey's footsteps rattling on the dark carbon-titanium floor of the History Hall.` },
  { type: 'narrator', content: `A quick glance at his time tracker confirmed his worst fear: there were only two minutes left before the start of the 'Archaeology Principles: Controlled Silicon of the Past' class.` },
  { type: 'narrator', content: `As he focused on getting there on time, he felt a tug on his arm and turned to see Starlax, his best human friend.` },
  { type: 'chat', role: 'assistant', content: `Oh, Flamey, I'm so relieved you're here! Professor Evergreen is known to be a person with ATTITUDE.` },
  { type: 'narrator', content: `Flamey groaned. He wouldn't have signed up for this class if he had not missed the registration deadline for another history course. APCSP was known to be dull and perplexing.` },
  { type: 'narrator', content: `They entered the room through a glass bubble door, where Prof. Evergreen was sitting behind his desk with lots of empty chairs. As expected, they were the only two students today.` },
  { type: 'chat', role: 'system', content: `Prof. Evergreen muttered: "Well, I guess I have to adapt. For today's topic – Binary, how about I start with a poem?"` },

  // Poem
  { type: 'poem', component: 'Poem' },

  // Story part 2
  { type: 'narrator', content: `Flamey and Starlax looked at each other, not sure what to say. With the eager look of their professor waiting for feedback, Flamey slowly raised his hand.` },
  { type: 'chat', role: 'user', content: `Err… I want to know why Binary was invented? Why didn't ancient computers use NORMAL math, like 1,2,3,4,5…?` },
  { type: 'chat', role: 'system', content: `"Convenience, young droid." Prof. Evergreen elaborated, "Just like humans having ten fingers contributed to the 10 based number system. Ancient computers used electric signals. So naturally 1 represents On, 0 represents Off."` },
  { type: 'chat', role: 'system', content: `Professor gestured with his hand and a hologram of a cat trying to flip switches showed up.` },

  // FourSwitches game
  { type: 'game', component: 'FourSwitches' },

  // Story part 3
  { type: 'chat', role: 'assistant', content: `Wow! 🐱` },
  { type: 'narrator', content: `Starlax was instantly convinced. The image of the jumping cat had captured her imagination.` },

  // Chat section — the conversation about binary
  { type: 'chat', role: 'user', content: `So here is the first rule of a number system...` },
  { type: 'chat', role: 'user', content: `What if a number system's base is larger than ten? Don't we run out of digits to use?` },
  { type: 'chat', role: 'system', content: `"You can invent more symbols beyond 0 to 9, or just reuse existing symbols, like letters." Prof. Evergreen replied.` },
  { type: 'chat', role: 'user', content: `Oh…` },
  { type: 'chat', role: 'system', content: `"Remember Place Value from Elementary school? It is the value of each digit based on its position."` },
  { type: 'chat', role: 'user', content: `Oh, it starts to make sense now. So binary actually works the same way as decimal — you count the place values then add them up.` },
  { type: 'chat', role: 'system', content: `"Good find. 1101 in binary is 1×8+1×4+0×2+1×1, which is 13 in decimal."` },
  { type: 'chat', role: 'assistant', content: `Wow!` },

  // Closing
  { type: 'narrator', content: `"I'd like to show you more, but we ran out of time." Prof. Evergreen walked out of the room in a rush without even acknowledging his two students.` },
  { type: 'chat', role: 'assistant', content: `He is definitely a man with character, but not the way I expected.` },
  { type: 'chat', role: 'user', content: `Don't think he overused cats to make a point?` },
  { type: 'chat', role: 'assistant', content: `Nope. There is no such thing as too many cats. 😺` },
];

// Full chat novel — the evening texting conversation between Flamey and Starlax
export const fullChatMessages = [
  { role: "user" as const, content: "Hi, u there?" },
  { role: "assistant" as const, content: "👋" },
  { role: "user" as const, content: "Have you seen the homework?" },
  { role: "assistant" as const, content: "y" },
  { role: "user" as const, content: "What about the questions that convert Decimal into Binary?" },
  { role: "user" as const, content: "He did not teach us how to do that 😠" },
  { role: "assistant" as const, content: "yep, don't know why he left in a hurry" },
  { role: "assistant" as const, content: "but the rule #2 covered in class leaves enough clues" },
  { role: "user" as const, content: "Huh? How?" },
  { role: "assistant" as const, content: "Say the decimal number is 13, we need to break it down into 2's place values - those multiples of two" },
  { role: "assistant" as const, content: "13 = 8 + 4 + 1 = 1*8+1*4+0*2+1 = 1101 in binary" },
  { role: "assistant" as const, content: "I found it is very tedious to break down larger numbers. Since your calculation unit is way better than my brain on this, may be you can find a better way?" },
  { role: "user" as const, content: "You are a genius! Let me load this training data..." },
  { role: "user" as const, content: "I got one! We can figure it out backward, first divide 13 by 2, got 6 and remainder of 1, the remainder will be the rightmost digits of the binary" },
  { role: "user" as const, content: "keep dividing 6 by 2, got 3 and no remainder, so we have 01" },
  { role: "assistant" as const, content: "$#%@#" },
  { role: "user" as const, content: "Huh? anyway, keep dividing 3 by 2, got 1 and remainder 1, write it down: 101" },
  { role: "user" as const, content: "Finally, 1 divided by 2 is 0, remainder is 1, so we have 1101" },
  { role: "user" as const, content: "Oh, I found easier way starting with biggest place value!" },
  { role: "assistant" as const, content: "RT%$#$%@^#@#$%@#burrrrrrrr" },
  { role: "user" as const, content: "r u still there? is your cat typing?" },
  { role: "user" as const, content: "whatever, I will see you in class tomorrow" },
  { role: "assistant" as const, content: "Sorry, Nova🐱 walked on my keyboard. I'd love to hear the way you found!" },
];
