import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "../axios";
import Sidebar from "../components/Sidebar";
import Authcontext from "../authcontextapi/Authcontext";

function Navbar({ darkMode, setDarkMode }) {
  const { user, setuser } = useContext(Authcontext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/users/logout", { withCredentials: true });
      setuser(null);
      navigate("/login");
    } catch (error) {
      console.log(error, "logout failed");
    }
  };

  return (
    <>
      <nav className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-2xl text-black dark:text-white"
            >
              ☰
            </button>

            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-wide"
            >
              CloneTube
            </Link>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {user ? (
              <>
                <Link
                  to="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/uploadvid"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
                >
                  Upload
                </Link>
                <Link
                  to="/createplaylist"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
                >
                  Playlist
                </Link>
                <Link
                  to="/watchhistory"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-400 text-sm font-medium"
                >
                  Logout
                </button>
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-white"
                />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
                >
                  Signup
                </Link>
              </>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-sm px-3 py-1 border rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Navbar;
