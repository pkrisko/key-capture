import React, { useState, useContext, createContext } from 'react';
import olRequest from '../util/olRequest';

const quizContext = createContext();

// Hook that enables any component to subscribe to auth state
export const useQuizContext = () => useContext(quizContext);

const useProvideQuizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [score, setScore] = useState(null);

  const getQuizzes = async (tokens) => {
    try {
      const [quizzesJson, { scores }] = await Promise.all([
        olRequest('quizzes', tokens),
        olRequest('results', tokens),
      ]);
      const appendScores = quizzesJson.map((quiz) => ({ ...quiz, score: scores[quiz.id] }));
      setScore(null);
      setQuizzes(appendScores);
    } catch (err) {
      setScore(null);
      setQuizzes(undefined);
    }
  };

  const getQuiz = async (qid, tokens) => {
    try {
      const { questions, type, showLabels } = await olRequest(`quiz?id=${qid}`, tokens);
      return { questions, type, showLabels };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  };
  const getScore = async (qid, questions, type, answers, tokens) => {
    const { percentage } = await olRequest('results', tokens, 'POST', {
      qid,
      questions,
      type,
      answers,
    });
    setScore(percentage);
    setQuizzes(null);
  };

  return {
    quizzes,
    score,
    getQuizzes,
    getQuiz,
    getScore,
  };
};

export const ProvideQuizzes = ({ children }) => {
  const quiz = useProvideQuizzes();
  return (
    <quizContext.Provider value={quiz}>
      {children}
    </quizContext.Provider>
  );
};
