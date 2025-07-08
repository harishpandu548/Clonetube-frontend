import React from "react";
import { useState, useEffect } from "react";
import axios from "../../axios";
import Videocard from "./Videocard";

function Homepage() {
  const [videos, setvideos] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get("/videos")
      .then((res) => {
        setvideos(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 500) {
          alert("Please login to view videos");
        } else {
          alert("Something went wrong.");
        }
      });
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="animate-pulse space-y-4">
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-200 dark:bg-gray-900">
      {videos.map((video) => (
        <Videocard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default Homepage;
