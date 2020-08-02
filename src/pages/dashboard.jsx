import React, { useEffect } from 'react';
import { useAuth } from '../util/auth';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Recording from '../components/Recording';

const Dashboard = () => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.user === false) {
            router.push('/signin');
        }
    }, [auth, router]);

    return (
        <>
            <Header {...auth.user} />
            <Recording />
        </>
    );



}

export default Dashboard;