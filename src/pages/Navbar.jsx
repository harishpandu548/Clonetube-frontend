import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
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
      <nav className="w-full bg-gray-900 text-white shadow-md px-6 py-4 dark:bg-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="text-2xl">
            ☰
          </button>

          <Link to="/" className="text-2xl font-bold tracking-wide">
            CloneTube
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            {user ? (
              <>
                <Link
                  to="/"
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/uploadvid"
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition"
                >
                  Upload
                </Link>
                <Link
                  to="/createplaylist"
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition"
                >
                  Playlist
                </Link>
                <Link
                  to="/watchhistory"
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition"
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 dark:hover:text-red-200 transition"
                >
                  Logout
                </button>
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white"
                />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-300 dark:hover:text-blue-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hover:text-blue-300 dark:hover:text-blue-200 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
        
      </nav>
      <button 
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm px-3 py-1 border rounded ml-300 mt-3 hover:bg-gray-700"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Navbar;
