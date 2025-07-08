import { useEffect, useState } from "react";
import React from "react";
import axios from "../pages/home/axios"
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
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded">
      <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          type="text"
          placeholder="Enter name of the playlist"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <textarea
          className="w-full border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          placeholder="Description of your playlist"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>

        <p className="font-semibold mb-2">Select videos:</p>
        <div className="space-y-2 max-h-48 overflow-y-auto border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800">
          {allvideos.map((video) => (
            <label className="flex items-center gap-2" key={video._id}>
              <input
                type="checkbox"
                checked={videos.includes(video._id)}
                onChange={() => togglevideo(video._id)}
              />
              <span>{video.title}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Create Playlist
        </button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
