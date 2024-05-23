import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/chapter1');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default Home;
