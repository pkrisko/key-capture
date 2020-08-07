import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Link as MaterialLink } from '@material-ui/core';
import CenterLoader from '../components/CenterLoader';
import { useAuth } from '../util/auth';
import { API_DOMAIN } from '../util/constants';
import { useRouter } from 'next/router';
import Header from '../components/Header';


const Quizzes = () => {
    const [quizzes, setQuizzes] = useState(null);

    const getQuizzes = async () => {
        try {
            const response = await fetch(`${API_DOMAIN}/quizzes`);
            const json = await response.json();
            setQuizzes(json);
        } catch(err) {
            setQuizzes(undefined);
        }
    }

    useEffect(() => {
        getQuizzes();
    }, []);

    if (quizzes === null) {
        return (
            <CenterLoader />
        );
    }

    if (quizzes === undefined) {
        return (
            <span>Error getting cases</span>
        )
    }

    if (quizzes.length === 0) {
        return (
            <span>No quizzes available</span>
        )
    }

    return (
        <div className="links-to-quizzes">
            {quizzes.map(({ id, name }) => (
                <Link href="/quiz/[qid]" as={`quiz/${id}`} key={name}>
                    <MaterialLink >
                        {name}
                    </MaterialLink>
                </Link>
            ))}
        </div>
    )
}

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
            <Quizzes />
        </>
    );



}

export default Dashboard;