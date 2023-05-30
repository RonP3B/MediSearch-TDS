import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Holas</h1>} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default App;
