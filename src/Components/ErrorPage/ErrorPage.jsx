import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-green-50 to-blue-200 text-center px-5">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r  from-green-600 to-[#00549F] drop-shadow-lg">
        404
      </h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found 😢
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="btn mt-8 bg-linear-to-r from-green-600 to-[#00549F] text-white font-semibold px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform flex items-center gap-2"
      >
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
