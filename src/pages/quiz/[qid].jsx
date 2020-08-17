import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography, Link as MaterialLink } from '@material-ui/core';
import Piano from '../../components/Piano';
import Card from '../../components/Card';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import CenterLoader from '../../components/CenterLoader';
import olRequest from '../../util/olRequest';
import { useQuizContext, ProvideQuizzes } from '../../util/quizzes';
import { useAuthContext } from '../../util/auth';

const QuestionSection = ({ num, note }) => (
  <div className="question-section">
    <div className="question-number">
      {num}
    </div>
    <Typography variant="h6">
      Click this note on the piano and confirm:
      <strong>{note}</strong>
    </Typography>
  </div>
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
  const quizContext = useQuizContext();
  const auth = useAuthContext();
  const { getQuiz } = quizContext;
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [qid, setQid] = useState(null);
  const [score, setScore] = useState(null);
  const router = useRouter();

  const onNotePlayed = (midiNotes) => {
    if (midiNotes.length > 0 && questionIdx < quiz.length) {
      setAnswers([...answers, midiNotes[0]]);
      setQuestionIdx(questionIdx + 1);
    }
  };

  useEffect(() => {
    // [qid] is not populated until second render...
    if (router && router.query) {
      if (!qid) {
        setQid(router.query.qid);
      } else {
        const fetchQuiz = async () => {
          const q = await getQuiz(qid, auth.user.accessToken);
          setQuiz(q);
        };
        fetchQuiz();
      }
    }
  }, [qid, router, getQuiz]);

  const submitQuiz = async () => {
    const { percentage } = await olRequest('results', auth.user.accessToken, 'POST', { answers, qid });
    setScore(percentage);
  };

  // Loading...
  if (!quiz) {
    return <CenterLoader />;
  }

  if (score != null) {
    return <Complete score={score} />;
  }

  if (questionIdx === quiz.length) {
    submitQuiz();
    return (
      <>
        Calculating score...
        <CenterLoader />
      </>
    );
  }

  return (
    <>
      <QuestionSection num={questionIdx + 1} note={quiz[questionIdx]} />
      <Piano onNotePlayed={onNotePlayed} />
    </>
  );
};

const QuizWrapper = () => (
  <ProvideQuizzes>
    <Quiz />
  </ProvideQuizzes>
);

export default QuizWrapper;
