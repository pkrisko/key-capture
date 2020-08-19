import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import TurnedIn from '@material-ui/icons/AssignmentTurnedInRounded';
import CheckBoxBlank from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import Warning from '@material-ui/icons/WarningRounded';
import CenterLoader from '../components/CenterLoader';
import Header from '../components/Header';
import { useAuthContext } from '../util/auth';
import { useQuizContext } from '../util/quizzes';

const Quizzes = ({ tokens }) => {
  const quizContext = useQuizContext();
  const { quizzes, getQuizzes } = quizContext;

  if (quizzes === null) {
    getQuizzes(tokens);
    return (
      <CenterLoader />
    );
  }

  if (quizzes === undefined) {
    return (
      <span>Error getting quizzes</span>
    );
  }

  if (quizzes.length === 0) {
    return (
      <span>No quizzes available</span>
    );
  }

  return (
    <div className="links-to-quizzes">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Completed?</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map(({
                id,
                name,
                score,
                type,
              }) => {
                const completed = score !== undefined;
                const CompletedIcon = completed && score >= 70
                  ? () => <TurnedIn style={{ color: 'green' }} />
                  : () => <Warning style={{ color: 'orange' }} />;
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <Link href="/quiz/[qid]" as={`quiz/${id}`} key={name} passHref>
                        <MaterialLink>
                          {name}
                        </MaterialLink>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {type}
                    </TableCell>
                    <TableCell align="right">
                      {completed ? <CompletedIcon /> : <CheckBoxBlank />}
                    </TableCell>
                    <TableCell align="right">
                      {completed ? `${score}%` : 'N/A'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

const Dashboard = () => {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin');
    }
  }, [auth, router]);

  if (!auth.user) {
    return (
      <CenterLoader />
    );
  }
  return (
    <>
      <Header {...auth.user} onClick={() => (auth.user.admin ? router.push('/admin') : {})} />
      {auth.user && <Quizzes tokens={auth.user.tokens} />}
    </>
  );
};

export default Dashboard;
