import "./App.css";
import { Route, Routes } from "react-router-dom";
// import SignupAndLoginPage from "./components/pages/Signup/SignupAndLoginPage";
import Homepage from "./components/pages/Homepage/Homepage";
import PublicAccess from "./components/pages/Signup/PublicAccess";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<SignupAndLoginPage />} /> */}
        <Route path="/" element={<PublicAccess />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
