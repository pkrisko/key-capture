import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CenterLoader from '../components/CenterLoader';
import { useAuth } from '../util/auth';

const Index = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin');
    } else {
      router.push('/dashboard');
    }
  }, [auth, router]);

  return (
    <CenterLoader />
  );
};

export default Index;
