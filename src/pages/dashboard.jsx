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
  Typography,
  Paper,
} from '@mui/material';
import TurnedIn from '@mui/icons-material/AssignmentTurnedInRounded';
import CheckBoxBlank from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import Warning from '@mui/icons-material/WarningRounded';
import { useTheme } from '@mui/material/styles';
import CenterLoader from '../components/CenterLoader';
import Header from '../components/Header';
import { useAuthContext } from '../providers/auth';
import { useQuizContext } from '../providers/quizzes';

const Quizzes = ({ tokens }) => {
  const quizContext = useQuizContext();
  const theme = useTheme();
  const { quizzes, getQuizzes } = quizContext;

  if (quizzes === null) {
    getQuizzes(tokens);
    return (
      <CenterLoader />
    );
  }

  if (quizzes === undefined) {
    return (
      <Paper className="error-box">Error getting quizzes</Paper>
    );
  }

  if (quizzes.length === 0) {
    return (
      <Paper className="error-box">No quizzes available</Paper>
    );
  }

  return (
    <div className="links-to-quizzes">
      <Paper>
        <Typography variant="h4" className="font-eurostile">
          Quiz Dashboard
        </Typography>
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
                  ? () => <TurnedIn style={{ color: theme?.palette?.success?.main }} />
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
