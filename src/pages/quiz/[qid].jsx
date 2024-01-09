import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import get from 'lodash.get';
import size from 'lodash.size';
import { Typography, Link as MaterialLink, Paper } from '@mui/material';
import Keyboard from '../../components/Keyboard';
import Card from '../../components/Card';
import MusicalStaff from '../../components/MusicalStaff';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import CenterLoader from '../../components/CenterLoader';
import Header from '../../components/Header';
import FadeTransition from '../../components/FadeTransition';
import { useQuizContext } from '../../providers/quizzes';
import { useAuthContext } from '../../providers/auth';

const LetterQuestions = ({ num, note }) => (
  <div className="flex items-center ml-2.5 h-12">
    <Typography variant="h6" className="flex">
      <FadeTransition triggerKey={num}>{num}</FadeTransition>
      . Select the following note on the keyboard below:
      <FadeTransition triggerKey={note}>
        <strong className="ml-1">{note}</strong>
      </FadeTransition>
    </Typography>
  </div>
);

const StaffQuestions = ({ num, note }) => (
  <>
    <div className="flex h-32 p-0 py-3.5 flex-col">
      <MusicalStaff note={note} />
    </div>
    <Typography variant="h6">
      <div className="my-1 flex">
        <FadeTransition triggerKey={num}>{num}</FadeTransition>
        . Click the note from the (above) staff on the keyboard below.
      </div>
    </Typography>
  </>
);

const Complete = ({ score }) => {
  const text = score >= 70
    ? 'Nice job! You passed!'
    : 'Needs some improvement. Return to the dashboard to try again';
  return (
    <Card>
      <CircularProgressWithLabel variant="determinate" progress={score} />
      <br />
      <Typography variant="h5">
        {text}
      </Typography>
      <br />
      <Typography variant="h6">
        <Link href="/dashboard" passHref replace>
          <MaterialLink>
            Dashboard
          </MaterialLink>
        </Link>
      </Typography>
    </Card>
  );
};

const Quiz = () => {
  const auth = useAuthContext();
  const quizContext = useQuizContext();
  const { getQuiz, getScore, score } = quizContext;
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [qid, setQid] = useState(null);
  const router = useRouter();
  const tokens = get(auth, 'user.tokens');
  const { questions, type, showLabels } = quiz || {};

  const onNotePlayed = (midiNotes) => {
    if (midiNotes.length > 0 && questionIdx < size(questions)) {
      setAnswers([...answers, midiNotes[0]]);
      setQuestionIdx(questionIdx + 1);
    }
  };

  useEffect(() => {
    const queryQid = get(router, 'query.qid');
    if (queryQid && !qid) {
      setQid(queryQid);
    }
  }, [qid, router]);

  useEffect(() => {
    if (tokens && qid) {
      const fetchQuiz = async () => {
        // const q = await getQuiz(qid, tokens);
        setQuiz({
          id: 'IQd1dcC3xZhPNjooetAd',
          name: 'Quiz 3',
          questions: [
            'F5',
            'A4',
            'G4',
            'C4',
            'B4',
            'D#5',
            'D4',
            'F#4',
            'E5',
            'F4',
          ],
          type: 'staff',
          showLabels: true,
        });
      };
      fetchQuiz();
    }
  }, [qid, getQuiz, tokens]);

  const submitQuiz = async () => {
    getScore(qid, questions, type, answers, tokens);
  };

  // Loading...
  if (!quiz) {
    return <CenterLoader />;
  }

  if (score != null) {
    return <Complete score={score} />;
  }

  if (questionIdx === size(questions)) {
    submitQuiz();
    return (
      <>
        <CenterLoader />
      </>
    );
  }

  const questionProps = {
    num: questionIdx + 1,
    note: get(quiz, `questions[${questionIdx}]`),
  };

  return (
    <>
      <Header {...auth.user} onClick={() => {}} />
      <Paper variant="outlined" style={{ margin: 10 }}>
        {type === 'letter' && <LetterQuestions {...questionProps} />}
        {type === 'staff' && <StaffQuestions {...questionProps} /> }
      </Paper>
      <Paper variant="outlined" style={{ margin: 10 }}>
        <Keyboard onNotePlayed={onNotePlayed} showLabels={showLabels} />
      </Paper>
    </>
  );
};

export default Quiz;
