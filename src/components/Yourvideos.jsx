import React, { useEffect, useState } from "react";
import axios from "../axios"
import Videocard from "../pages/home/Videocard";
import Swal from "sweetalert2";


//4
function Yourvideos() {
  const [videos, setvidoes] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchvideos = async () => {
    try {
      const res = await axios.get("/videos/myvideos", {
    //   const res = await axios.get("/api/v1/videos/myvideos", {
        withCredentials: true,
      });
      setvidoes(res.data.data);
    } catch (error) {
      console.log(error, "failed to fetch user videos");
    } finally {
      setloading(false);
    }
  };

  const deletevideo = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure",
      text: "You want to delete this video",
      icon: "warning",
      background: "#1f2937",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "red",
      confirmButtonText: "Confirm",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/v1/videos/${id}`, { withCredentials: true });
        setvidoes((prev) => prev.filter((video) => video._id !== id));
      } catch (error) {
        console.log(error, "error at video deletion");
      }
    }
  };
  useEffect(() => {
    fetchvideos();
  }, []);

  if (loading)
    return (
      <div className="p-5 text-center text-xl font-semibold">
        Loading your videos...
      </div>
    );

  if (videos.length === 0)
    return (
      <div className="p-10 text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-110 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 animate-pulse cursor-pointer drop-shadow-md">
          You haven't uploaded any videos yet.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
      {videos.map((video) => (
        <div key={video._id} className="relative">
          <Videocard video={video} />
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => deletevideo(video._id)}
              className="bg-red-600 text-white text-sm px-4 py-1.5 rounded-md shadow hover:bg-red-700 transition"
            >
              Delete Video
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Yourvideos;
