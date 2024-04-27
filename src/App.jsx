import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicAccess from "./pages/PublicAccess";
// import SignupAndLoginPage from "./components/pages/Signup/SignupAndLoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PublicAccess />} />
      </Routes>
    </>
  );
}

export default App;
