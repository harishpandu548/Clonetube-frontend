import React from "react";
import { Link } from "react-router-dom";

function Videocard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="block">
      <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full mx-auto h-[35vh] object-fill"
        />
        <div className="flex items-start gap-2 p-2">
          <div className="flex flex-col items-center">
            <img
              src={video.owner.avatar}
              alt="Channel Avatar"
              className="w-8 h-8 rounded-full object-cover mt-2 border border-gray-300 dark:border-gray-600"
            />
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 ml-3">
              {video.owner.username}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-2 text-sm mt-3">
            {video.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Videocard;
