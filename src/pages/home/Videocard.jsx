import React from "react";
import { Link } from "react-router-dom";

function Videocard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="block">
      <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl transition duration-300">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-[200px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] object-cover"
        />
        <div className="flex gap-3 p-3">
          <img
            src={video.owner.avatar}
            alt="Channel Avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          <div className="flex flex-col">
            <h3 className="text-sm md:text-base font-semibold text-black dark:text-white line-clamp-2">
              {video.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {video.owner.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Videocard;
