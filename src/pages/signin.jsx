import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Button variant="contained" color="primary" onClick={signIn} className="bg-piano-blue">
        log in with
        <img src="/google-favicon.png" alt="Google logo" className="h-5 w-5 rounded-full ml-2.5" />
      </Button>
      <Link href="/keyboard" className="underline mt-4 hover:text-piano-blue">
        Or, play keyboard as guest
      </Link>
    </div>
  );
};

export default SignIn;
