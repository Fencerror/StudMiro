import AuthForm from "../../features/auth/ui/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider"; // добавлено

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // получаем функцию login

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log(response.data);
      if (response.data && response.data.token) {
        login(response.data.token); // сохраняем токен и user в контексте
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
