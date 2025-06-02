import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>StudMiro</h1>
      <Link to="/board">Перейти к доске</Link>
    </div>
  );
}
