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
import TurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import CheckBoxBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import CenterLoader from '../components/CenterLoader';
import Header from '../components/Header';
import { useAuthContext } from '../util/auth';
import { useQuizContext, ProvideQuizzes } from '../util/quizzes';

const Quizzes = ({ accessToken }) => {
  const quizContext = useQuizContext();
  const { quizzes, getQuizzes } = quizContext;

  if (quizzes === null) {
    getQuizzes(accessToken);
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
                <TableCell align="right">Completed?</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map(({ id, name, score }) => (
                <TableRow key={id}>
                  <TableCell>
                    <Link href="/quiz/[qid]" as={`quiz/${id}`} key={name} passHref>
                      <MaterialLink>
                        {name}
                      </MaterialLink>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {score === undefined ? <CheckBoxBlank /> : <TurnedIn style={{ color: 'green' }} />}
                  </TableCell>
                  <TableCell align="right">
                    {score === undefined ? 'N/A' : score}
                  </TableCell>
                </TableRow>
              ))}
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

  return (
    <ProvideQuizzes>
      <Header {...auth.user} />
      {auth.user && <Quizzes accessToken={auth.user.accessToken} />}
    </ProvideQuizzes>
  );
};

export default Dashboard;
