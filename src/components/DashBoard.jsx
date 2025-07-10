import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";

function Dashboard() {
  const [stats, setstats] = useState(null);
  const [playlist, setplaylist] = useState([]);

  useEffect(() => {
    axios
      .get("/dashboard/dashboard/overview", { withCredentials: true })
      .then((res) => setstats(res.data.stats))
      .catch((err) => console.log(err, "failed to load dashboard"));

    axios
      .get("/playlists/getplaylist", { withCredentials: true })
      .then((res) => setplaylist(res.data.playlist))
      .catch((error) => console.log(error));
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 dark:border-white"></div>
      </div>
    );

  return (
    <div className="p-4 max-w-5xl mx-auto text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center tracking-wide text-red-600 dark:text-red-400">
        📊 Dashboard Overview
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Subscribers", value: stats.totalSubscribers },
          { label: "Likes", value: stats.totalLikes },
          { label: "Comments", value: stats.totalComments },
          { label: "Total Views", value: stats.totalViews },
          { label: "Videos", value: stats.totalVideos },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{item.value}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">🎵 Your Playlists</h2>

      {playlist.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't created any playlists yet.
        </p>
      ) : (
        <div className="space-y-4">
          {playlist.map((pl) => (
            <div
              key={pl._id}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <p className="text-lg font-bold text-gray-800 dark:text-white">{pl.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{pl.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                🎥 {pl.videos.length} {pl.videos.length === 1 ? "video" : "videos"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
