import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicAccess from "./pages/PublicAccess";
import QuizPage from "./pages/QuizPage";
import Quiz from "./pages/Quiz";
import { QuizDataProvider } from "./Context/QuizDataContext";

function App() {
  return (
    <QuizDataProvider>
      <>
        <Routes>
          <Route path="/*" element={<PublicAccess />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Quizpage" element={<QuizPage />} />
        </Routes>
      </>
    </QuizDataProvider>
  );
}

export default App;
