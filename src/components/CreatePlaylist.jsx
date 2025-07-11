import { useEffect, useState } from "react";
import React from "react";
// import axios from "axios";
import axios from "../axios"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function CreatePlaylist() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [videos, setvideos] = useState([]);
  const [allvideos, setallvideos] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios
      .get("/videos", { withCredentials: true })
      // .get("/api/v1/videos", { withCredentials: true })
      .then((res) => setallvideos(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      await axios.post(
        "/playlists/create",
        // "/api/v1/playlists/create",
        { name, description, videos },
        { withCredentials: true }
      );
      toast.success("Playlist created");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.log("error at playlist", error);
      toast.error("failed to create playlist");
    } finally {
      setloading(false);
    }
  };

  const togglevideo = (id) => {
    setvideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-neutral-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600 dark:text-red-400">
          🎵 Create a Playlist
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-neutral-800 placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
            type="text"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />

          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-neutral-800 placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
            placeholder="Playlist Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            rows={3}
          />

          <div>
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Select Videos
              </label>
              <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-neutral-800 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
                {allvideos.map((video) => (
                  <label
                    key={video._id}
                    className="flex items-center gap-3 cursor-pointer text-gray-800 dark:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={videos.includes(video._id)}
                      onChange={() => togglevideo(video._id)}
                      className="accent-red-600"
                    />
                    <span className="text-sm">{video.title}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Playlist"}
          </button>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default CreatePlaylist;
