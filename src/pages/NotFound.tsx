import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex-1 flex items-center justify-center flex-col text-center h-full bg-gray-100">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 text-blue-600 underline">
        Back to Dashboard
      </Link>
    </main>
  );
};

export default NotFound;
