import { Route, Routes } from "react-router-dom";

//Pages
import Home from "./components/pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default App;
