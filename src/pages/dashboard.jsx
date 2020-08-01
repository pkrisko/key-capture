import React, { useEffect } from 'react';
import { useAuth } from '../util/auth';
import { useRouter } from 'next/router';
import Header from '../components/Header';

const Dashboard = () => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.user === false) {
            router.push('/signin');
        }
    }, [auth, router]);

    return <div>
        <Header {...auth.user} />
        Dashboard page
    </div>


}

export default Dashboard;