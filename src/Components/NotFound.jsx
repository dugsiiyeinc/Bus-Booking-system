import { Link } from "react-router-dom";

//passwordabdi

export default function NotFound () {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl mt-4 font-semibold text-gray-800">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
}
