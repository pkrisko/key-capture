import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CenterLoader from '../components/CenterLoader';
import { useAuthContext } from '../util/auth';

const Logout = () => {
  const auth = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    await auth.signInWithProvider();
    router.push('/signin');
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <CenterLoader />
  );
};

export default Logout;