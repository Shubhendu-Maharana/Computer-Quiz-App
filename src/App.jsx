import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicAccess from "./pages/PublicAccess";
import Homepage from "./pages/Homepage";
// import SignupAndLoginPage from "./components/pages/Signup/SignupAndLoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/computer-quiz-app" element={<PublicAccess />} />
        <Route path="/computer-quiz-app/homepage" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
