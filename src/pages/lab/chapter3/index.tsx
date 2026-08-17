import { NextPage } from 'next';
import Head from 'next/head';
import ChapterShell from '@/components/lab/world/ChapterShell';
import Chapter3 from '@/components/lab/book/chapter3/Chapter3';

const Page: NextPage = () => (
  <>
    <Head>
      <title>[lab] Chapter 3: A Color Is a Number - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <ChapterShell id="chapter3">
      <Chapter3 />
    </ChapterShell>
  </>
);

export default Page;
