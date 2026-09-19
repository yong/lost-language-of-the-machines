// /lab/novel — the chapter with the experiment harness on: the variant chip on
// the cover and the reveal-mode toggle in the header. Same component as the
// official read at /chapter1, so the thing being compared is the thing that
// ships.
import { NextPage } from 'next';
import NovelChapter from '@/components/novel/Chapter';

const LabNovel: NextPage = () => <NovelChapter lab />;
export default LabNovel;
