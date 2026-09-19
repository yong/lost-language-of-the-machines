// The establishing beat for Chapter One — the part that cannot be a text
// message.
//
// Kept SHORT on purpose. Its whole job is to put the reader in the basement,
// establish that the cabinet is considered unfixable, and get the phone into
// Starlax's hand. Everything after this is discovered by the reader's thumbs,
// so any fact stated here is a fact the toys do not get to reveal.
//
// The last line is the hinge: it is what makes the chat the next thing that
// happens rather than a change of format.
import type { OpeningProps } from './ChapterOpening';

export const OPENING: Pick<OpeningProps, 'image' | 'eyebrow' | 'title' | 'paragraphs' | 'handoffLine'> = {
  image: '/chapter1/cover.jpg',
  eyebrow: 'Chapter One',
  title: 'A Bit Is a Light',
  paragraphs: [
    'The museum basement smelled of dust and old electricity. The cabinet in the corner had been dead for two hundred years, and everyone agreed it would stay that way: the language inside it went extinct five centuries ago, there is no one left who can read it, and you cannot fix what you cannot read.',
    'Nobody had mentioned the switch.',
  ],
  handoffLine: 'Starlax got out her phone.',
};
