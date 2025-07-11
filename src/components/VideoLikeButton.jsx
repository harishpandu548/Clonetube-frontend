import React, { useState, useEffect } from "react";
import axios from '../axios';
// import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

function VideoLikeButton({ videoId }) {
  const [liked, setliked] = useState(false);
  const [likecount, setlikecount] = useState(0);

  const likeStatus = async () => {
    try {
      const res = await axios.get(`/likes/video/check/${videoId}`, {
      // const res = await axios.get(`/api/v1/likes/video/check/${videoId}`, {
        withCredentials: true,
      });
      setliked(res.data.liked);
    } catch (error) {
      console.log("like status error", error);
      setliked(false);
    }
  };
  const likeCount = async () => {
    try {
      // const res = await axios.get(`/api/v1/likes/count/${videoId}`);
      const res = await axios.get(`/likes/count/${videoId}`);
      setlikecount(res.data.data);
    } catch (error) {
      console.log(error, "Fetching like count error");
    }
  };

  const toggleLike = async () => {
    try {
      if (liked) {
        // await axios.delete(`/api/v1/likes/video/${videoId}`, {
        await axios.delete(`/likes/video/${videoId}`, {
          withCredentials: true,
        });
        setliked(false);
        toast.success("Unliked the video");
      } else {
        await axios.post(
          // `/api/v1/likes/video/${videoId}`,
          `/likes/video/${videoId}`,
          {},
          { withCredentials: true }
        );
        setliked(true);
        toast.success("Liked the video");
      }
      likeCount();
    } catch (error) {
      console.log("like error", error);
      toast.error("Error while updating like");
    }
  };

  useEffect(() => {
    likeStatus();
    likeCount();
  }, [videoId]);

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={toggleLike}
        className={`flex items-center gap-1 px-3 py-1 rounded-full transition duration-200 ${
          liked
            ? "bg-red-100 text-red-600 dark:bg-red-800/20 dark:text-red-400"
            : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        } hover:scale-105`}
      >
        {liked ? <div>👍</div> : <div>👎</div>}
        <span className="text-sm">{liked ? "Liked" : "Like"}</span>
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {likecount}
      </span>
      <Toaster position="top-right" />
    </div>
  );
}

export default VideoLikeButton;
