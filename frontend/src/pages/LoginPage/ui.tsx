import AuthForm from "../../features/auth/ui/AuthForm";
import axios from "axios";

export default function LoginPage() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
