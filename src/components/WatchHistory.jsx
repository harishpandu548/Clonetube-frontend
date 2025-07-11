import React, { useEffect, useState } from 'react';
import axios from "../axios";
// import axios from "axios"

import { Link } from 'react-router-dom';

function WatchHistory() {
  const [history, sethistory] = useState([]);
  const [loading,setloading]=useState(true)

  useEffect(() => {
    axios.get("/users/watch-history", { withCredentials: true })
    // axios.get("/api/v1/users/watch-history", { withCredentials: true })
      .then((res) => {
        sethistory(res.data.data || []);
        setloading(false)
      })
      .catch((error) => {
        console.log(error);
        setloading(false)
      });
  }, []);

   if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="animate-pulse space-y-4">
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
            <div className="flex gap-4 items-center mt-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Your Watch History
      </h2>

      {history.length === 0 ? (
        <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-lg">
          You haven’t watched any videos yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`}>
              <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-200 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800">
                <video
                  className="w-full h-48 object-cover"
                  src={video.videofile}
                  controls
                />
                <div className="p-3">
                  <h3 className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-white">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-3">
                    <img
                      src={video.owner.avatar}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {video.owner.username}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchHistory;
