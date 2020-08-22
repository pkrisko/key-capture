import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import { Typography, Link as MaterialLink } from '@material-ui/core';
import Piano from '../../components/Piano';
import Card from '../../components/Card';
import MusicalStaff from '../../components/MusicalStaff';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import CenterLoader from '../../components/CenterLoader';
import { useQuizContext } from '../../providers/quizzes';
import { useAuthContext } from '../../providers/auth';

const LetterQuestions = ({ num, note }) => (
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

const StaffQuestions = ({ num, note }) => (
  <>
    <div className="staff-questions-section">
      <div className="question-number">
        {num}
      </div>
      <MusicalStaff note={note} />
    </div>
    <Typography variant="h6">
      <div className="staff-instructions">
        Click the corresponding note from the staff on the piano below.
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
  const tokens = _.get(auth, 'user.tokens');

  const onNotePlayed = (midiNotes) => {
    if (midiNotes.length > 0 && questionIdx < _.size(quiz.questions)) {
      setAnswers([...answers, midiNotes[0]]);
      setQuestionIdx(questionIdx + 1);
    }
  };

  useEffect(() => {
    // [qid] is not populated until second render...
    if (router && router.query) {
      if (!qid) {
        setQid(router.query.qid);
      }
      if (tokens && qid) {
        const fetchQuiz = async () => {
          const q = await getQuiz(qid, tokens);
          setQuiz(q);
        };
        fetchQuiz();
      }
    }
  }, [qid, router, getQuiz, tokens]);

  const submitQuiz = async () => {
    getScore(qid, answers, tokens);
  };

  // Loading...
  if (!quiz) {
    return <CenterLoader />;
  }

  if (score != null) {
    return <Complete score={score} />;
  }

  if (questionIdx === _.size(quiz.questions)) {
    submitQuiz();
    return (
      <>
        Calculating score...
        <CenterLoader />
      </>
    );
  }

  const { type, showLabels } = quiz;
  const questionProps = {
    num: questionIdx + 1,
    note: _.get(quiz, `questions[${questionIdx}]`),
  };

  return (
    <>
      {type === 'letter' && <LetterQuestions {...questionProps} />}
      {type === 'staff' && <StaffQuestions {...questionProps} /> }
      <Piano onNotePlayed={onNotePlayed} showLabels={showLabels} />
    </>
  );
};

export default Quiz;
