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
    <div className="w-full h-screen flex items-center justify-center">
      <Button variant="contained" color="primary" onClick={signIn}>
        log in with
        <img src="/google-favicon.png" alt="Google logo" className="h-5 w-5 rounded-full ml-2.5" />
      </Button>
    </div>
  );
};

export default SignIn;
