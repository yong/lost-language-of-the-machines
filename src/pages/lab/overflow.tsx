// The overflow chapter, in the lab. New work lives here until a direction is
// chosen (CLAUDE.md), and it is the same engine Chapter One reads on — a
// ChapterDef handed to `@/components/novel/Chapter`, not a second copy of it.
import { NextPage } from 'next';
import NovelChapter from '@/components/novel/Chapter';
import { CHAPTER_OVERFLOW } from '@/components/novel/chapters/overflow';

const OverflowChapter: NextPage = () => <NovelChapter lab chapter={CHAPTER_OVERFLOW} />;

export default OverflowChapter;
