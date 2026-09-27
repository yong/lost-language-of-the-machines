// "The Maze Is Made of Numbers" — the Pac-Man level-256 idea as its own
// chapter. Same engine as every chat chapter (a ChapterDef handed to the
// reader), in the lab until it is chosen.
import { NextPage } from 'next';
import NovelChapter from '@/components/novel/Chapter';
import { CHAPTER_MAZE } from '@/components/novel/chapters/maze';

const Level256: NextPage = () => <NovelChapter lab chapter={CHAPTER_MAZE} />;

export default Level256;
