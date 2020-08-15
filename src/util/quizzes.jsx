import React, { useState, useContext, createContext } from 'react';
import _ from 'lodash';
import olRequest from './olRequest';

const quizContext = createContext();

// Hook that enables any component to subscribe to auth state
export const useQuizContext = () => useContext(quizContext);

const useProvideQuizzes = () => {
  const [quizzes, setQuizzes] = useState(null);

  const getQuizzes = async (accessToken) => {
    try {
      const json = await olRequest('quizzes', accessToken);
      setQuizzes(json);
    } catch (err) {
      setQuizzes(undefined);
    }
  };

  const getQuiz = (qid) => {
    const matches = quizzes.filter(({ id }) => id === qid);
    return matches.length === 1 ? _.get(matches, '[0].questions') : null;
  };

  return {
    quizzes,
    getQuizzes,
    getQuiz,
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
