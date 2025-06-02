import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import BoardPage from "../pages/BoardPage/BoardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="board" element={<BoardPage />} />
    </Routes>
  );
}

export default App;
