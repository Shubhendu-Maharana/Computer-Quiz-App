import React, { useState, useEffect } from "react";
import Result from "../components/Result/Result";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import QuizDataContext from "../components/Utils/Context/QuizDataContext";

const QuizPage = () => {
  const { quizData } = useContext(QuizDataContext);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setRedirectToLogin(true);
    }
  }, []);

  if (redirectToLogin) {
    return <Navigate to="/Computer-Quiz-App/" />;
  }

  const handleOptionClick = (questionId, option) => {
    if (!selectedOptions[questionId]) {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [questionId]: option,
      }));
    }
  };

  const questions = quizData;

  const handleNextOrSubmit = () => {
    if (currentIndex === questions.length - 1) {
      let correct = 0;
      questions.forEach((question) => {
        if (selectedOptions[question.id] === question.answer) {
          correct++;
        }
      });
      setCorrectAnswers(correct);
      setSubmitted(true);
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === questions.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (submitted) {
    document.getElementById("my_modal_5").showModal();
    setSelectedOptions({});
    setCurrentIndex(0);
    setSubmitted(false);
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? questions.length - 1 : prevIndex - 1
    );
  };

  const progressWidth = ((currentIndex + 1) / questions.length) * 100 + "%";

  return (
    <div className="flex flex-col justify-between lg:items-center min-h-screen bg-gradient-to-t from-purple-500 to-pink-500">
      <Result
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
      />
      <div className="p-8 lg:p-6 w-full flex flex-col gap-5 lg:gap-1 bg-[#2B3D41] text-center">
        <p className="text-2xl">Your Progress</p>
        <div className="rounded-full h-2.5 bg-[#DFBBB1]">
          <div
            className="bg-[#F56476] h-2.5 rounded-full"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
      <div className="p-3 h-full min-w-96 flex flex-col lg:w-full lg:justify-evenly items-center">
        <div>
          <p className="text-black text-md lg:text-lg text-center mb-5">
            Question {questions[currentIndex].id} out of {questions.length}
          </p>
          <p className="text-white text-xl lg:text-2xl">
            {questions[currentIndex].question}
          </p>
        </div>
        <form
          autoComplete="off"
          className="form-control lg:w-1/2 w-full py-5 px-2.5 h-max gap-5 mt-auto text-center text-black justify-evenly *:rounded-xl *:p-5 *:w-full lg:items-center lg:*:cursor-pointer text-xl"
        >
          {questions[currentIndex].options.map((option, index) => (
            <label
              key={index}
              htmlFor={`op-${index + 1}`}
              className={
                selectedOptions[questions[currentIndex].id] === option
                  ? option === questions[currentIndex].answer
                    ? "bg-green-500"
                    : "bg-[#FE5F55]"
                  : "bg-[#EDF7F6]"
              }
              onClick={() =>
                handleOptionClick(questions[currentIndex].id, option)
              }
            >
              <span>{option}</span>
            </label>
          ))}
        </form>
      </div>
      <div className="flex w-full items-center justify-between pb-5 px-5">
        {currentIndex !== 0 ? (
          <button
            className="btn btn-primary text-black border-none bg-[#EBEBD3] hover:bg-[#083D77] hover:text-white"
            onClick={handlePrevious}
          >
            Previous
          </button>
        ) : (
          <button
            className="btn btn-primary invisible"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}

        {currentIndex === questions.length - 1 ? (
          <button
            className="btn bg-[#EF626C] hover:bg-[#F6E8EA] text-black border-none hover:text-[#EF626C]"
            onClick={handleNextOrSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="btn text-black border-none bg-[#EBEBD3] hover:bg-[#083D77] hover:text-white"
            onClick={handleNextOrSubmit}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
