import { useEffect, useState } from "react";
import React from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function CreatePlaylist() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [videos, setvideos] = useState([]);
  const [allvideos, setallvideos] = useState([]);

  useEffect(() => {
    axios
      .get("/videos", { withCredentials: true })
      .then((res) => setallvideos(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/playlists/create",
        { name, description, videos },
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (error) {
      console.log("error at playlist", error);
    }
  };

  const togglevideo = (id) => {
    setvideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600 dark:text-red-400">
        🎵 Create a Playlist
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />

        <textarea
          className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Playlist Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          rows={3}
        />

        <div>
          <p className="font-semibold mb-2 text-lg">Select videos:</p>
          <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
            {allvideos.map((video) => (
              <label key={video._id} className="flex items-center gap-3 cursor-pointer">
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

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-lg transition"
        >
          ✅ Create Playlist
        </button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
