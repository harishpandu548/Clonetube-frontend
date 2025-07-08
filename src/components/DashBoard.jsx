import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "../pages/home/axios";
import Authcontext from "../authcontextapi/Authcontext";

function Dashboard() {
  const [stats, setstats] = useState(null);
  // const { user } = useContext(Authcontext);
  const [playlist, setplaylist] = useState([]);

  useEffect(() => {
    axios
      .get("/dashboard/dashboard/overview", { withCredentials: true })
      .then((res) => {
        setstats(res.data.stats);
      })
      .catch((err) => console.log(err, "failed to load dashboard"));

    axios
      .get("/playlists/getplaylist", { withCredentials: true })
      .then((res) => {
        setplaylist(res.data.playlist);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!stats)
    return (
      <div className="animate-spin mt-50 ml-125 rounded-full h-40 w-40 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
    );

  return (
    <div className="p-4 max-w-3xl mx-auto text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-semibold">{stats.totalSubscribers}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Subscribers</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-semibold">{stats.totalLikes}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Likes</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-semibold">{stats.totalComments}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Comments</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-semibold">{stats.totalViews}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Total Views</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-semibold">{stats.totalVideos}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Videos</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Playlists</h2>

      <div className="space-y-4">
        {playlist.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No playlists created yet.</p>
        ) : (
          playlist.map((pl) => (
            <div
              key={pl._id}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-4 hover:shadow-md transition duration-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-bold text-lg text-gray-800 dark:text-white">{pl.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{pl.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {pl.videos.length} videos
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
