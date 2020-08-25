import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CenterLoader from '../components/CenterLoader';
import { useAuthContext } from '../providers/auth';

const Logout = () => {
  const auth = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    await auth.signInWithProvider();
    router.push('/signin');
  };

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CenterLoader />
  );
};

export default Logout;
