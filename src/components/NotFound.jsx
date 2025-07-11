import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-800 dark:text-white text-center px-4">
      <h1 className="text-6xl font-bold mb-4 text-red-600 dark:text-red-400">404</h1>
      <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
         Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
