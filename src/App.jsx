import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicAccess from "./pages/PublicAccess";
import Homepage from "./pages/Homepage";
// import SignupAndLoginPage from "./components/pages/Signup/SignupAndLoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Computer-Quiz-App/" element={<PublicAccess />} />
        <Route path="/Computer-Quiz-App/homepage" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
