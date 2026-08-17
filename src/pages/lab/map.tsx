import { NextPage } from 'next';
import Head from 'next/head';

import CampusMap from '@/components/lab/world/CampusMap';

const Page: NextPage = () => (
  <>
    <Head>
      <title>[lab] The Campus - Lost Language of the Machines</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <CampusMap />
  </>
);

export default Page;
