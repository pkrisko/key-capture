import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import Piano from '../../components/Piano';
import CenterLoader from '../../components/CenterLoader';
import { API_DOMAIN } from '../../util/constants';

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

const Quiz = () => {
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
        const getQuiz = async () => {
          const response = await fetch(`${API_DOMAIN}/quiz?id=${qid}`);
          const { questions } = await response.json();
          setQuiz(questions);
        };
        getQuiz();
      }
    }
  }, [qid, router]);

  // Loading...
  if (!quiz) {
    return (
      <CenterLoader />
    );
  }

  const submitQuiz = async () => {
    const response = await fetch(`${API_DOMAIN}/results`, {
      method: 'POST',
      body: JSON.stringify({ answers, qid }),
    });
    const { percentage } = await response.json();
    setScore(percentage);
  };

  if (score != null) {
    const expression = score >= 80 ? 'Nice job!' : 'Oof.';
    const text = `${expression} Your score was ${score}%`;
    return (
      <div>
        <span>{text}</span>
        <br />
        <Link href="/dashboard">Dashboard</Link>
      </div>
    );
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

export default Quiz;
