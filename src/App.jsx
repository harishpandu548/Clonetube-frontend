import "./App.css";
// import "./index.css"
import { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Homepage from "./pages/home/Homepage";
import Video from "./pages/video/Video";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Uploadvid from "./pages/Uploadvid";
import DashBoard from "./components/DashBoard";
import CreatePlaylist from "./components/CreatePlaylist";
import WatchHistory from "./components/WatchHistory";
// import Authprovider from "./authcontextapi/Authprovider";
import Authcontext from "./authcontextapi/Authcontext";
import NotFound from "./components/NotFound";
import Yourvideos from "./components/Yourvideos";
import PremiumPage from "./components/PremiumPage";
import UpgradeProcessing from "./components/UpgradeProcessing";
import SearchPage from "./components/SearchPage";
// import SearchResults from "./components/SearchResults";

function App() {
  const { user } = useContext(Authcontext);
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
          <Route
            path="/video/:id"
            element={user ? <Video /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/createplaylist" element={<CreatePlaylist />} />
          <Route path="/watchhistory" element={<WatchHistory />} />
          <Route path="/yourvideos" element={<Yourvideos />} />
          <Route path="*" element={<NotFound />} />
          <Route path="premiumpage" element={<PremiumPage/>} />
          <Route path="upgrading" element={<UpgradeProcessing/>} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
