import React, { useState } from "react";
import axios from "../axios";
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
    <div className="min-h-screen bg-white dark:bg-black px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-neutral-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Upload a New Video
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Video Title"
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Video Description"
            rows={5}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white resize-none"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            accept="video/*"
            className="block w-full text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            onChange={(e) => setvideofile(e.target.files[0])}
          />
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            onChange={(e) => setthumbnail(e.target.files[0])}
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
}

export default Uploadvid;
