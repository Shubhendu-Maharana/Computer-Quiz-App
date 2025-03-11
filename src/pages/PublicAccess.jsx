import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";

const PublicAccess = () => {
  const [redirectToQuizPage, setRedirectToQuizPage] = useState(false);
  const handleStartQuiz = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    localStorage.setItem("username", name);
    setRedirectToQuizPage(true);
  };

  useEffect(() => {
    localStorage.removeItem("username");
  }, []);

  if (redirectToQuizPage) {
    return <Navigate to="/Quiz" />;
  }

  return (
    <div className="h-screen flex flex-col justify-between lg:items-center lg:justify-around p-6 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex items-center justify-center h-full">
        <span className="text-6xl text-white uppercase font-bold">
          Quiz App
        </span>
      </div>
      <div className="bg-white px-6 py-10 lg: rounded-2xl flex flex-col items-center lg:w-1/3 shadow-xl">
        <div>
          <span className="text-2xl font-bold text-purple-500">
            Welcome New User :)
          </span>
        </div>
        <hr className="w-16 h-1 mx-auto m-6 bg-gradient-to-r from-purple-500 to-pink-500 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <div className="w-full">
          <form
            onSubmit={handleStartQuiz}
            className="form-control gap-8 text-purple-500"
          >
            <label className="input flex items-center gap-2 bg-white border-2 border-purple-500">
              <IoPersonCircleSharp className="text-xl" />
              <input
                required
                type="text"
                name="name"
                className="grow"
                placeholder="Your Name"
              />
            </label>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-800 font-bold rounded-full text-2xl px-5 py-2.5 text-center"
              >
                Start Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicAccess;
