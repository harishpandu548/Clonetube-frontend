import React, { useState, useEffect } from "react";
import axios from "../../axios";
// import axios from "axios"
import toast,{Toaster} from "react-hot-toast";


import Videocard from "./Videocard";

function Homepage() {
  const [videos, setvideos] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get("/videos")
      // .get("/api/v1/videos")
      .then((res) => {
        setvideos(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 500) {
          alert("Please login to view videos");
        } else {
          alert("Login to view videos.");
        }
      });
  }, []);
  useEffect(()=>{
    if(localStorage.getItem("justloggedIn")==="true"){
      toast.success("Welcome back User")
      localStorage.removeItem("justloggedIn")
    }

  },[])

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="animate-pulse space-y-4">
            <div className="w-full h-48 bg-neutral-300 dark:bg-neutral-700 rounded-xl"></div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-24 h-4 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                <div className="w-32 h-4 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Videocard key={video._id} video={video} />
        ))}
      </div>
      <Toaster position="top-right"/>
    </div>
  );
}

export default Homepage;
