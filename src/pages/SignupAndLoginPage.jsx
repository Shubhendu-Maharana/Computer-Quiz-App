import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const SignupAndLoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row justify-between lg:items-center lg:justify-around p-6 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex items-center justify-center h-full">
        <span className="text-6xl text-white">Quiz App</span>
      </div>
      <div className="bg-white px-6 py-10 lg: rounded-2xl flex flex-col items-center lg:w-1/2">
        <div>
          <span className="text-2xl font-bold text-purple-500">
            {showLoginForm ? "Welcome New User :)" : "Welcome Back Friend ;)"}
          </span>
        </div>
        <hr className="w-16 h-1 mx-auto m-6 bg-gradient-to-r from-purple-500 to-pink-500 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        {showLoginForm ? (
          <SignupForm toggleForm={toggleForm} />
        ) : (
          <LoginForm toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default SignupAndLoginPage;
