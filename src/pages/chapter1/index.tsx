// Chapter One — the official read.
//
// The settled shape, with no experiment on screen: the TRACK way in (a
// vertical pager whose pages move with the thumb), the conversation arriving
// in TYPING mode, and binary snow falling on the cover. All three were picked
// by reading the alternatives on a phone; the alternatives are still
// switchable in the lab at /lab/openings and /lab/novel.
//
// Same component as the lab (`@/components/novel/Chapter`) rather than a copy,
// so the official read cannot drift from the thing that was tested.
import { NextPage } from 'next';
import NovelChapter from '@/components/novel/Chapter';

const ChapterOne: NextPage = () => <NovelChapter />;

export default ChapterOne;
