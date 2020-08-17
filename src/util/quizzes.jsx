import React, { useState, useContext, createContext } from 'react';
import olRequest from './olRequest';

const quizContext = createContext();

// Hook that enables any component to subscribe to auth state
export const useQuizContext = () => useContext(quizContext);

const useProvideQuizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [score, setScore] = useState(null);

  const getQuizzes = async (accessToken) => {
    try {
      const [quizzesJson, { scores }] = await Promise.all([
        olRequest('quizzes', accessToken),
        olRequest('results', accessToken),
      ]);
      const appendScores = quizzesJson.map((quiz) => ({ ...quiz, score: scores[quiz.id] }));
      setQuizzes(appendScores);
    } catch (err) {
      setQuizzes(undefined);
    }
  };

  const getQuiz = async (qid, accessToken) => {
    try {
      const { questions } = await olRequest(`quiz?id=${qid}`, accessToken);
      return questions;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  };
  const getScore = async (qid, answers, accessToken) => {
    const { percentage } = await olRequest('results', accessToken, 'POST', { answers, qid });
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
