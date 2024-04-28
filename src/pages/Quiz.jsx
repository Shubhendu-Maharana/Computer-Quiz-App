import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import QuizDataContext from "../components/Utils/Context/QuizDataContext";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";

const Quiz = () => {
  const username = localStorage.getItem("username");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const { setQuizData } = useContext(QuizDataContext);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [error, setError] = useState(false);

  if(!username) {
    return <Navigate to="/Computer-Quiz-App/" />
  }

  const API_URL = "https://api.openai.com/v1/chat/completions";
  const ENCRYPTED_API_KEY =
    "U2FsdGVkX182LMlOeBL/ajj6laWVCRso4H+6LjJgTpL4iDv4vBu6uAxJEc8bpOOh5YqtSb3wBOFqNgLZPXJV5AIOjhN2m1lA2l3IQNRAm8s=";
  const API_KEY = CryptoJS.AES.decrypt(
    ENCRYPTED_API_KEY.toString(),
    "shubhendu"
  ).toString(CryptoJS.enc.Utf8);
  const query = `give 30 questions about ${topic} in json format as like, id: starts from 1 and so on, question: conatains actual question, options: array of 4 options, answer: contains actual answer from options don't wrap these with any name`;

  const generateQuestions = async (event) => {
    event.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
      }),
    };

    try {
      const res = await (await fetch(API_URL, requestOptions)).json();
      const data = res.choices[0].message.content;
      setQuizData(JSON.parse(data));
      //   localStorage.setItem("quizData", JSON.stringify(data));
      setLoading(false);
      setQuizGenerated(true);
      setError(false); // Reset error state
    } catch (error) {
      console.log("Error: " + error);
      setLoading(false); // Set loading to false on error
      setError(true); // Set error state to true
    }
  };

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="min-h-screen text-white flex flex-col justify-between bg-gradient-to-t from-purple-500 to-pink-500">
      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-red-500 text-black">
            <span>Error Generating Quiz. Try Again</span>
          </div>
        </div>
      )}
      <div className="p-8 lg:p-6 flex flex-col gap-5 lg:gap-2 bg-[#2B3D41] text-center">
        <p className="text-2xl">Hey {username}</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-evenly">
        <div>
          <span className="text-3xl">AI Quiz Generator</span>
        </div>
        <form
          onSubmit={generateQuestions}
          className="form-control gap-8 w-full lg:w-1/3 md:w-1/2 px-10"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Enter Quiz Topic</span>
            </div>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Generate"
              className="input grow w-full bg-white border-2 border-pink-500 text-pink-500"
            />
          </label>
          <div className="flex flex-col items-center">
            <button className="btn bg-pink-500 text-white font-bold text-lg border-none hover:bg-pink-600">
              {loading ? "Generating" : ""}
              {loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Generate Quiz"
              )}
            </button>
            {quizGenerated ? (
              <hr className="w-16 h-1 mx-auto my-6 bg-gray-600 border-0 rounded"></hr>
            ) : (
              ""
            )}
            {quizGenerated ? (
              <Link
                to={{
                  pathname: "/Computer-Quiz-App/QuizPage",
                }}
                className="btn bg-pink-500 text-white font-bold text-lg border-none hover:bg-pink-600"
              >
                Start Quiz
              </Link>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
