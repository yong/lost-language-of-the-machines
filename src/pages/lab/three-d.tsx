import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// R3F requires browser APIs, must disable SSR
const Lab3Canvas = dynamic(
  () => import('@/components/lab/three-d/Lab3Canvas'),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full bg-[#050a15] flex items-center justify-center">
        <div className="text-cyan-400/60 text-sm animate-pulse" style={{ fontFamily: 'VT323' }}>
          Initializing hologram classroom...
        </div>
      </div>
    ),
  }
);

const Lab3: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Lab 3: Hologram Classroom - Lost Language of the Machines</title>
      </Head>
      <Lab3Canvas />
    </>
  );
};

export default Lab3;
