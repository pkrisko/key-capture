import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../util/auth';

function SignIn(props) {
    const auth = useAuth();
    const router = useRouter();

    const signIn = async () => {
        await auth.signinWithProvider();
        router.push('/dashboard');
    }

    useEffect(() => {
        signIn();
    }, []);

    return (
        <>
            Logging in...
        </>
    );
}

export default SignIn;