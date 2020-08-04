import React from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import { useAuth } from '../util/auth';

const SignIn = () => {
    const auth = useAuth();
    const router = useRouter();

    const signIn = async () => {
        await auth.signinWithProvider();
        router.push('/dashboard');
    }

    return (
        <div className="very-center-wrapper">
            <Button variant="contained" color="primary" onClick={signIn}>
                log in with
                <img src="/google-favicon.png" alt="Google logo" className="google-icon"/>
            </Button>
        </div>
    );
}

export default SignIn;