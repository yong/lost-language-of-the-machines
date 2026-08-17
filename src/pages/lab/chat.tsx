import { NextPage } from 'next';
import Head from 'next/head';
import PhoneFrame from '@/components/lab/chat/PhoneFrame';
import ChatTimeline from '@/components/lab/chat/ChatTimeline';
import { timeline, coverImage, coverTitle, coverSubtitle } from '@/components/lab/shared/content';

const Lab1: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Lab 1: Terminal Chronicle - Lost Language of the Machines</title>
      </Head>
      <PhoneFrame
        coverImage={coverImage}
        title={coverTitle}
        subtitle={coverSubtitle}
      >
        <ChatTimeline items={timeline} />
      </PhoneFrame>
    </>
  );
};

export default Lab1;
