import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import BoardPage from "../pages/BoardPage/BoardPage";
import LoginPage from "../pages/LoginPage/ui";
import RegisterPage from "../pages/RegisterPage/ui";
import Layout from "./Layout";
import BoardLayout from "./BoardLayout";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<BoardLayout />}>
          <Route path="/board" element={<BoardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
