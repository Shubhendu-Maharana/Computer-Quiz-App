import React from "react";
import { LuKeyRound } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";

const LoginForm = ({ toggleForm }) => {
  return (
    <div className="w-full">
      <form className="form-control gap-8 text-purple-500">
        <label className="input flex items-center gap-2 bg-white border-2 border-purple-500">
          <IoPersonCircleSharp className="text-xl" />
          <input type="text" className="grow" placeholder="Your Name" />
        </label>
        <label className="input flex items-center gap-2 bg-white border-2 border-purple-500">
          <LuKeyRound />
          <input type="password" className="grow" placeholder="Password" />
        </label>
        <div>
          <button onClick={toggleForm}>New here?</button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-800 font-bold rounded-full text-2xl px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
