import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 text-blue-600 underline">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
