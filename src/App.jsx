import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicAccess from "./pages/PublicAccess";
import QuizPage from "./pages/QuizPage";
import Quiz from "./pages/Quiz";
import { QuizDataProvider } from "./components/Utils/Context/QuizDataContext";
// import SignupAndLoginPage from "./components/pages/Signup/SignupAndLoginPage";

function App() {
  return (
    <QuizDataProvider>
      <>
        <Routes>
          <Route path="/Computer-Quiz-App/" element={<PublicAccess />} />
          <Route path="/Computer-Quiz-App/Quiz" element={<Quiz />} />
          <Route path="/Computer-Quiz-App/Quizpage" element={<QuizPage />} />
        </Routes>
      </>
    </QuizDataProvider>
  );
}

export default App;
