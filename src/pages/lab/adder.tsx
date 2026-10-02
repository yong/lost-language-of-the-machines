// "Two Doors Can Add" — logic gates as the way a machine does maths. Same
// engine as every chat chapter, in the lab until it is chosen.
import { NextPage } from 'next';
import NovelChapter from '@/components/novel/Chapter';
import { CHAPTER_ADDER } from '@/components/novel/chapters/adder';

const Adder: NextPage = () => <NovelChapter lab chapter={CHAPTER_ADDER} />;

export default Adder;
