import { NextPage } from 'next';
import Head from 'next/head';
import ChapterShell from '@/components/lab/world/ChapterShell';
import Chapter2 from '@/components/lab/book/chapter2/Chapter2';

const Page: NextPage = () => (
  <>
    <Head>
      <title>[lab] Chapter 2: A Letter Is a Number - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <ChapterShell id="chapter2">
      <Chapter2 />
    </ChapterShell>
  </>
);

export default Page;
