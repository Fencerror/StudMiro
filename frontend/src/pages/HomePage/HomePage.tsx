import { Link } from "react-router-dom";
import Footer from "@features/Footer/Footer";

export default function HomePage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold">StudMiro</h1>
        <Link className="mt-4 text-blue-500 underline" to="/board">
          Перейти к доске
        </Link>
      </div>
      <Footer />
    </div>
  );
}
