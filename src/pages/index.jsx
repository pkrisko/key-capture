import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, []);

    return (
        <div className="very-center-wrapper">
            <CircularProgress />
        </div>
    );
}

export default Index;