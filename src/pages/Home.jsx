import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to StudyHub</h1>
      <p className="text-center text-gray-700 mb-6">
        A centralized platform to share and access study resources including notes, past papers, and guides.
      </p>
      <div className="flex gap-4">
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </Link>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
