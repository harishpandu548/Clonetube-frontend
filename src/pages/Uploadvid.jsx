import React from "react";
import { useState } from "react";
import axios from "./home/axios";
import { useNavigate } from "react-router-dom";

function Uploadvid() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [videofile, setvideofile] = useState(null);
  const [thumbnail, setthumbnail] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !videofile || !thumbnail)
      return alert("Please fill all the fields");

    try {
      const playload = new FormData();
      playload.append("title", title);
      playload.append("description", description);
      playload.append("videofile", videofile);
      playload.append("thumbnail", thumbnail);

      const res = await axios.post("/videos", playload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/video/${res.data.data._id}`);
    } catch (error) {
      console.log("upload failed", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded">
      <h2 className="text-2xl font-bold mb-4">Upload New Video</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          type="text"
          placeholder="Enter the title"
          required
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          className="p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          placeholder="video description"
          rows={4}
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
        <input
          className="p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          type="file"
          accept="video/*"
          onChange={(e) => setvideofile(e.target.files[0])}
        />
        <input
          className="p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          type="file"
          accept="image/*"
          onChange={(e) => setthumbnail(e.target.files[0])}
        />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Upload video
        </button>
      </form>
    </div>
  );
}

export default Uploadvid;
