import React from "react";
import { Link } from "react-router-dom";

// helper to format seconds
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function Videocard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="block">
      <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl transition duration-300">
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-[200px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>
        <div className="flex gap-3 p-3">
          <div className="flex flex-col items-center">
            <img
              src={video.owner.avatar}
              alt="Channel Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
              {video.owner.username}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-sm md:text-base font-semibold text-black dark:text-white line-clamp-2">
              {video.title}
            </h3>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {video.views} views
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Videocard;
