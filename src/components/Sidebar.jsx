import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Clonetube</h2>
        <button onClick={onClose} className="text-lg">✖</button>
      </div>

      <nav className="p-4 space-y-4 text-lg">
        <button className="block hover:text-blue-600 dark:hover:text-blue-400" onClick={onClose}>
          <Link to="/">🏠 Home</Link>
        </button>
        <button className="block hover:text-blue-600 dark:hover:text-blue-400" onClick={onClose}>
          <Link to="/uploadvid">📤 Upload</Link>
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;
