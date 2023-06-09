import { Route, Routes } from "react-router-dom";

//Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PasswordRecovery from "./components/pages/PasswordRecovery";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="*" element={<h1>404 page</h1>} />
    </Routes>
  );
};

export default App;
