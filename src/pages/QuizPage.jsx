import React, { useState, useEffect } from "react";
import Result from "../components/Result/Result";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import QuizDataContext from "../Context/QuizDataContext";

const QuizPage = () => {
  const { quizData } = useContext(QuizDataContext);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctOption, setCorrectOption] = useState({});
  const [score, setScore] = useState(0);

  const username = localStorage.getItem("username");
  if (!username || !quizData) return <Navigate to="/" />;

  const verifyAnswer = (option) => {
    if (!selectedOptions[currentIndex]) {
      if (option === quizData[currentIndex].answer) {
        setScore(score + 1);
      }
      setSelectedOptions((prev) => ({
        ...prev,
        [currentIndex]: option,
      }));
      setCorrectOption((prev) => ({
        ...prev,
        [currentIndex]: quizData[currentIndex].answer,
      }));
    }
  };

  const handleSubmit = () => {
    document.getElementById("my_modal_5").showModal();
    setSelectedOptions({});
    setCorrectOption({});
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const progressWidth =
    currentIndex === 0
      ? "0%"
      : ((currentIndex + 1) / quizData.length) * 100 + "%";

  return (
    <div className="flex flex-col justify-between lg:items-center min-h-screen bg-gradient-to-t from-purple-500 to-pink-500">
      <Result correctAnswers={score} totalQuestions={quizData.length} />
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
            Question {quizData[currentIndex].id} out of {quizData.length}
          </p>
          <p className="text-white text-xl lg:text-2xl">
            {quizData[currentIndex].question}
          </p>
        </div>
        <form
          autoComplete="off"
          className="form-control lg:w-1/2 w-full py-5 px-2.5 h-max gap-5 mt-auto text-center text-black justify-evenly *:rounded-xl *:p-5 *:w-full lg:items-center lg:*:cursor-pointer text-xl"
        >
          {quizData[currentIndex].options.map((option, index) => (
            <label
              key={index}
              htmlFor={`op-${index + 1}`}
              className={
                option === correctOption[currentIndex]
                  ? "bg-green-500"
                  : option === selectedOptions[currentIndex]
                  ? "bg-red-500"
                  : "bg-white"
              }
              onClick={() => verifyAnswer(option)}
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

        {currentIndex === quizData.length - 1 ? (
          <button
            className="btn bg-[#EF626C] hover:bg-[#F6E8EA] text-black border-none hover:text-[#EF626C]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="btn text-black border-none bg-[#EBEBD3] hover:bg-[#083D77] hover:text-white"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
