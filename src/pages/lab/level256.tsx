// "A Glitch Is a Window" — the Pac-Man kill screen as its own chapter. Same
// engine as every other chat chapter (a ChapterDef handed to the reader), in
// the lab until it is chosen.
import { NextPage } from 'next';
import NovelChapter from '@/components/novel/Chapter';
import { CHAPTER_GLITCH } from '@/components/novel/chapters/glitch';

const Level256: NextPage = () => <NovelChapter lab chapter={CHAPTER_GLITCH} />;

export default Level256;
