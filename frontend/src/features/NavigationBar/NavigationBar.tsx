import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

interface NavigationBarProps {
  mode: "sticky" | "fixed";
}

export default function NavigationBar({ mode }: NavigationBarProps) {
  const positionClass = mode === "fixed" ? "fixed top-0 left-0 right-0" : "sticky top-0";
  const { user, logout } = useAuth();

  return (
    <nav className={`${positionClass} bg-[#3f3e3c] shadow-md z-50`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          StudMiro
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-700">
            Главная
          </Link>
          <Link to="/board" className="hover:text-gray-700">
            Доска
          </Link>
          {user ? (
            <>
              <span className="text-[#646cff]">{user.email}</span>
              <button onClick={logout} className="text-[#646cff] px-3 py-1 rounded hover:text-[#535bf2]">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-700">
                Войти
              </Link>
              <Link to="/register" className="hover:text-gray-700">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
