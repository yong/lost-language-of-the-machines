// Chapter 4 "A Picture Is a Number" — chat-novel timeline

export interface Chapter4Item {
  type: 'heading' | 'narrator' | 'chat' | 'game';
  role?: 'user' | 'assistant' | 'system';
  content?: string;
  component?: string; // 'SpriteForge'
}

export const coverImage = '/chapter3/pixelart.jpg';
export const coverTitle = 'Chapter 4';
export const coverSubtitle = '"A Picture Is a Number"';

export const timeline: Chapter4Item[] = [
  { type: 'heading', content: 'Chapter 4 "A Picture Is a Number"' },

  { type: 'narrator', content: `The game was in color now. That was the problem.` },
  { type: 'narrator', content: `Because with the palette restored — every hex number back in its slot — Flamey and Starlax could finally see, in crisp and vivid detail, exactly how broken CATVENTURE still was.` },
  { type: 'narrator', content: `The title screen glowed. The score counter worked. And in the middle of the screen stood the hero of the game: the TOP HALF of a cat. Ears, eyes, a confident little smile — and below the whiskers, nothing but a ragged edge of missing pixels.` },
  { type: 'chat', role: 'assistant', content: `Our hero is fifty percent off. 🏷️` },
  { type: 'narrator', content: `They took the cartridge to Prof. Evergreen's office, which they had learned to find by following the smell of old electronics and disapproval.` },
  { type: 'chat', role: 'system', content: `"The sprite sheet is damaged. A sprite — the ancients' word for a small picture that moves. Your hero, the fish, the enemy — each one is stored as a tiny grid."` },
  { type: 'chat', role: 'user', content: `A grid of what?` },
  { type: 'chat', role: 'system', content: `"You already know. Every pixel is a color, and every color is a number. A picture IS a grid of numbers — nothing more. Sixteen pixels across, sixteen down. 256 numbers in a very particular order. Half of yours are missing."` },
  { type: 'narrator', content: `From a drawer that seemed to contain the entire Controlled Silicon Era, he produced a paper printout. Actual paper. Rows and rows of hex numbers — and halfway down the page, a coffee-colored stain where the rest used to be.` },
  { type: 'chat', role: 'user', content: `Paint with WHAT? We don't know what the bottom of this cat looked like! 😤` },
  { type: 'narrator', content: `There was a soft thump. Nova, who had been asleep on the windowsill, stood up, stretched into a shape that physics should not allow, and arranged herself on the desk in a perfect loaf: paws tucked, tail wrapped, entirely smug.` },
  { type: 'chat', role: 'assistant', content: `We have a model. 🐱` },

  { type: 'game', component: 'SpriteForge' },

  { type: 'narrator', content: `The modeling session did not go smoothly. They needed the cat standing; Nova loafed. They needed a walking pose; Nova loafed. In the end, the hero of CATVENTURE became a loaf. Loaves, Starlax pointed out, are aerodynamic.` },
  { type: 'chat', role: 'user', content: `Be honest. Is that a cat or a mailbox?` },
  { type: 'chat', role: 'assistant', content: `It's eight millimeters tall. It's whatever you believe in. ✨` },
  { type: 'narrator', content: `Prof. Evergreen loaded their numbers into the cartridge. On screen, the ragged half-cat flickered — and became whole. The hero of CATVENTURE stood complete for the first time in two hundred years.` },
  { type: 'chat', role: 'user', content: `It's beautiful.` },
  { type: 'chat', role: 'system', content: `"It is adequate." — which everyone present understood to mean the same thing.` },
];
