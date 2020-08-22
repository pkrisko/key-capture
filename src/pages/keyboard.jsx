import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../providers/auth';
import Piano from '../components/Piano';

const Keyboard = () => {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin');
    }
  }, [auth, router]);

  return (
    <Piano />
  );
};

export default Keyboard;