import React, { useState } from "react";
import Emoji from "../Utils/Emoji";
import { Navigate } from "react-router-dom";

const Result = ({ correctAnswers, totalQuestions }) => {
  const [redirectToLoginPage, setRedirectToLoginPage] = useState(false);
  const [redirectToRegen, setRedirectToReGen] = useState(false);
  const resultPercentage = (correctAnswers / totalQuestions) * 100;
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    setRedirectToLoginPage(true);
  };

  if (redirectToLoginPage) {
    return <Navigate to="/" />;
  }

  const handleReGen = () => {
    setRedirectToReGen(true);
  };

  if (redirectToRegen) {
    return <Navigate to="/Quiz" />;
  }

  const progressWidth = (100 / totalQuestions) * correctAnswers + "%";

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hey {username}</h3>
        <div className="rounded-full h-2.5 flex items-center mt-4 bg-[#DFBBB1]">
          <div
            className="bg-[#F56476] h-2.5 rounded-full pt-4"
            style={{ width: correctAnswers === 0 ? "0%" : progressWidth }}
          ></div>
        </div>
        <p className="py-4">
          You've got {correctAnswers} correct out of {totalQuestions} questions{" "}
          {resultPercentage >= 90 ? (
            <Emoji symbol="😎" />
          ) : resultPercentage >= 60 ? (
            <Emoji symbol="😊" />
          ) : resultPercentage >= 45 ? (
            <Emoji symbol="😒" />
          ) : (
            <Emoji symbol="😭" />
          )}
        </p>
        <div className="modal-action">
          <form method="dialog" className="w-full flex justify-between">
            <button
              onClick={handleLogout}
              className="btn bg-purple-500 text-black hover:bg-pink-500 hover:text-white"
            >
              Logout
            </button>
            <button
              onClick={handleReGen}
              className="btn bg-pink-500 text-white hover:bg-purple-500 hover:text-black"
            >
              Re-Gen
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Result;
