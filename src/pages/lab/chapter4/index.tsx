import { NextPage } from 'next';
import Head from 'next/head';
import ChapterShell from '@/components/lab/world/ChapterShell';
import Chapter4 from '@/components/lab/book/chapter4/Chapter4';

const Page: NextPage = () => (
  <>
    <Head>
      <title>[lab] Chapter 4: A Picture Is a Number - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <ChapterShell id="chapter4">
      <Chapter4 />
    </ChapterShell>
  </>
);

export default Page;
