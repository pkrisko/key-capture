import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CircularProgress, Link as MaterialLink } from '@material-ui/core';
import { useAuth } from '../util/auth';
import { API_DOMAIN } from '../util/constants';
import { useRouter } from 'next/router';
import Header from '../components/Header';


const Quizzes = ({ quizzes }) => {
    const links = quizzes.map(({ id, name }) => (
        <Link href="/quiz/[qid]" as={`quiz/${id}`} key={name}>
            <MaterialLink >
                {name}
            </MaterialLink>
        </Link>
    ));
    return (
        <div className="links-to-quizzes">
            {links}
        </div>
    )
}

const Dashboard = () => {
    const auth = useAuth();
    const router = useRouter();
    const [quizzes, setQuizzes] = useState(null);

    const getQuizzes = async () => {
        const response = await fetch(`${API_DOMAIN}/quizzes`);
        const json = await response.json();
        setQuizzes(json);
    }

    useEffect(() => {
        if (auth.user === false) {
            router.push('/signin');
        } else {
            getQuizzes();
        }
    }, [auth, router]);

    return (
        <>
            <Header {...auth.user} />
            {!quizzes && <CircularProgress/>}
            {quizzes && <Quizzes quizzes={quizzes}/>}
        </>
    );



}

export default Dashboard;