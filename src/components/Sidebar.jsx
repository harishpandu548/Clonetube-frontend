import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-wide text-red-600 dark:text-red-400">CloneTube</h2>
        <button
          onClick={onClose}
          className="text-xl hover:text-red-500 dark:hover:text-red-400"
          aria-label="Close Sidebar"
        >
          ✖
        </button>
      </div>

      <nav className="p-4 space-y-3 text-base font-medium">
        <Link
          to="/"
          onClick={onClose}
          className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          🏠 Home
        </Link>
        <Link
          to="/uploadvid"
          onClick={onClose}
          className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          📤 Upload
        </Link>
        <Link
          to="/dashboard"
          onClick={onClose}
          className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          📊 Dashboard
        </Link>
        <Link
          to="/createplaylist"
          onClick={onClose}
          className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          🎵 Create Playlist
        </Link>
        <Link
          to="/watchhistory"
          onClick={onClose}
          className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          📺 Watch History
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
