import React, { createContext, useState } from "react";

const QuizDataContext = createContext();

export const QuizDataProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(null);

  return (
    <QuizDataContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizDataContext.Provider>
  );
};

export default QuizDataContext;
