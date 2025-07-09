import React from 'react';
import { useEffect, useState } from 'react';
import axios from "../axios";
import { Link } from 'react-router-dom';

function WatchHistory() {
  const [history, sethistory] = useState([]);

  useEffect(() => {
    axios.get("/users/watch-history", { withCredentials: true })
      .then((res) => {
        sethistory(res.data.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Watch History</h2>

      {history.length === 0 ? (
        <div>
          <p className="text-gray-500 dark:text-gray-400">You have not watched any video yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history.map((video) => (
            <div key={video._id}>
              <Link to={`/video/${video._id}`}>
                <div className="border rounded-xl p-2 shadow hover:shadow-md transition bg-white dark:bg-gray-800 dark:border-gray-700">
                  <video
                    className="w-full h-40 object-cover rounded-md"
                    src={video.videofile}
                    controls
                  ></video>
                  <h3 className="text-lg font-semibold mt-2 line-clamp-1 text-gray-800 dark:text-white">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      className="w-6 h-6 rounded-full object-cover"
                      src={video.owner.avatar}
                      alt="profile"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {video.owner.username}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchHistory;
