import { NextPage } from 'next';
import Head from 'next/head';
import ChapterShell from '@/components/lab/world/ChapterShell';
import Chapter1 from '@/components/lab/book/chapter1/Chapter1';

const Page: NextPage = () => (
  <>
    <Head>
      <title>[lab] Chapter 1: A Number Is a Switch - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <ChapterShell id="chapter1">
      <Chapter1 />
    </ChapterShell>
  </>
);

export default Page;
