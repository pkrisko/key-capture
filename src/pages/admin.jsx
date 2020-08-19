import React from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../util/auth';
import CenterLoader from '../components/CenterLoader';

const Admin = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  if (user === null) {
    return (
      <CenterLoader />
    );
  }
  if (!user.admin) {
    router.push('/dashboard');
  }
  return (
    <>
      Admin panel ayyy
    </>
  );
};

export default Admin;
