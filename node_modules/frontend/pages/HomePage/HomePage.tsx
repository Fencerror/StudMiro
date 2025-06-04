import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">StudMiro</h1>
      <Link className="mt-4 text-blue-500 underline" to="/board">
        Перейти к доске
      </Link>
      {/* Footer removed, as it is now rendered globally via Layout */}
    </div>
  );
}
