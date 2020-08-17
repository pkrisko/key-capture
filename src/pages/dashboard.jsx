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
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CenterLoader from '../components/CenterLoader';
import Header from '../components/Header';
import { useAuthContext } from '../util/auth';
import { useQuizContext } from '../util/quizzes';

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
              {quizzes.map(({ id, name }) => (
                <TableRow key={id}>
                  <TableCell>
                    <Link href="/quiz/[qid]" as={`quiz/${id}`} key={name}>
                      <MaterialLink>
                        {name}
                      </MaterialLink>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {name === 'Quiz 2'
                      ? <CheckBoxOutlineBlankIcon />
                      : <AssignmentTurnedInIcon style={{ color: 'green' }} />}
                  </TableCell>
                  <TableCell align="right">
                    {name === 'Quiz 2' ? 'N/A' : `${90}%`}
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
    <>
      <Header {...auth.user} />
      {auth.user && <Quizzes accessToken={auth.user.accessToken} />}
    </>
  );
};

export default Dashboard;
