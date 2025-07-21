import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "../axios";
// import axios from "axios";

import Sidebar from "../components/Sidebar";
import Authcontext from "../authcontextapi/Authcontext";
import Swal from "sweetalert2";
import AvatarModal from "./AvatarModal";
import SearchBar from "../components/Searchbar";

function Navbar({ darkMode, setDarkMode }) {
  const { user, setuser } = useContext(Authcontext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure",
      text: "You will be logged out",
      icon: "warning",
      background: "#1f2937",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "red",
      confirmButtonText: "Yes,logout",
    });
    if (result.isConfirmed) {
      try {
        await axios.post("/users/logout", { withCredentials: true });
        // await axios.post("/api/v1/users/logout", { withCredentials: true });
        setuser(null);
        navigate("/");
      } catch (error) {
        console.log(error, "logout failed");
      }
    }
  };

  return (
    <>
      <nav className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            {user && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-2xl text-black dark:text-white sm:block"
              >
                ☰
              </button>
            )}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold text-black dark:text-white tracking-wide"
            >
              <img
                src="/Pikachu1.png"
                alt="Logo"
                className="w-10 sm:w-12 h-auto drop-shadow-md hover:animate-bounce"
              />
              <span className="hover:text-red-500 transition duration-300">
                CloneTube
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
            {user ? (
              <>
                <SearchBar />

                <div className="flex flex-wrap gap-2 text-sm sm:text-base">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                        : "hover:text-blue-400 transition"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                        : "hover:text-blue-400 transition"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/uploadvid"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                        : "hover:text-blue-400 transition"
                    }
                  >
                    Upload
                  </NavLink>
                  <NavLink
                    to="/createplaylist"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                        : "hover:text-blue-400 transition"
                    }
                  >
                    Playlist
                  </NavLink>
                  <NavLink
                    to="/watchhistory"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                        : "hover:text-blue-400 transition"
                    }
                  >
                    History
                  </NavLink>
                  <NavLink
                    to="/yourvideos"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                        : "hover:text-blue-400 transition"
                    }
                  >
                    Your Videos
                  </NavLink>
                  <NavLink
                    to="/premiumpage"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                        : "hover:text-blue-400 transition"
                    }
                  >
                    Get Premium
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-400 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>

                <AvatarModal user={user} />
              </>
            ) : (
              <div className="flex flex-wrap gap-2 text-sm sm:text-base">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                      : "hover:text-blue-400 transition"
                  }
                >
                  Videos
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                      : "hover:text-blue-400 transition"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1"
                      : "hover:text-blue-400 transition"
                  }
                >
                  Signup
                </NavLink>
              </div>
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
