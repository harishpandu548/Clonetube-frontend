import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Homepage from "./pages/home/Homepage";
import Video from "./pages/video/Video";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Uploadvid from "./pages/Uploadvid";
import DashBoard from "./components/DashBoard";
import CreatePlaylist from "./components/CreatePlaylist";
import WatchHistory from "./components/WatchHistory";

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
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-6xl mx-auto p-4">
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
  );
}

export default App;
