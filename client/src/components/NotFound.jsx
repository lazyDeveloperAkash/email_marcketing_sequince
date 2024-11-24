import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! The page you are loking for it does not exist!</p>
      <button
        onClick={() => navigate("/")}
        className="bg-white text-purple-600 font-semibold px-6 py-3 rounded shadow-md hover:bg-gray-200 transition-all duration-200"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
