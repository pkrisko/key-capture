import React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { useAuthContext } from '../providers/auth';

const SignIn = () => {
  const auth = useAuthContext();
  const router = useRouter();

  const signIn = async () => {
    await auth.signInWithProvider();
    router.push('/dashboard');
  };

  return (
    <div className="very-center-wrapper">
      <Button variant="contained" color="primary" onClick={signIn}>
        log in with
        <img src="/google-favicon.png" alt="Google logo" className="google-icon" />
      </Button>
    </div>
  );
};

export default SignIn;
