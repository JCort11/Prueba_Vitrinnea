import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Vitrinnea Task Manager</h1>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-50 font-semibold"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 font-semibold"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
