import "./App.css";
import { useState } from "react";
import Homepage from "./pages/home/Homepage";
import Video from "./pages/video/Video";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Navbar from "./pages/Navbar";
import Uploadvid from "./pages/Uploadvid";
import DashBoard from "./components/DashBoard";
import CreatePlaylist from "./components/CreatePlaylist";
import WatchHistory from "./components/WatchHistory";
import { useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "bg-gray-200");
    }
  }, [darkMode]);
  return (
    <>
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-black dark:text-white">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="max-w-6xl mx-auto p-4 bg-gray-200 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/uploadvid" element={<Uploadvid />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/createplaylist" element={<CreatePlaylist />} />
            <Route path="/watchhistory" element={<WatchHistory />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
