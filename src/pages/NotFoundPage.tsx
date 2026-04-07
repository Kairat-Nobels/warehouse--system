import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Вернуться на главную
          </Link>
          <Link
            to="/login"
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
