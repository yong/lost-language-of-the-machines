import { NextPage } from 'next';
import Head from 'next/head';
import ChapterShell from '@/components/lab/world/ChapterShell';
import Chapter0 from '@/components/lab/book/chapter0/Chapter0';

const Page: NextPage = () => (
  <>
    <Head>
      <title>[lab] Chapter 0: Hello World! - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <ChapterShell id="chapter0">
      <Chapter0 />
    </ChapterShell>
  </>
);

export default Page;
