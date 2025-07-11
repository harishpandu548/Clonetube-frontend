import React, { useEffect, useState } from "react";
import axios from '../axios';
// import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function CommentLikeButton({ commentId }) {
  const [commentliked, setcommentliked] = useState(false);

  const fetchcommentlikestatus = async () => {
    try {
      // const res = await axios.get(`/api/v1/likes/comment/check/${commentId}`, {
      const res = await axios.get(`/likes/comment/check/${commentId}`, {
        withCredentials: true,
      });
      setcommentliked(res.data.liked);
    } catch (error) {
      console.log(error, "fetch comment like status failed");
      setcommentliked(false);
    }
  };

  const togglecommentlike = async () => {
    try {
      if (commentliked) {
        await axios.delete(`/likes/comment/${commentId}`, {
        // await axios.delete(`/api/v1/likes/comment/${commentId}`, {
          withCredentials: true,
        });
        toast.success("comment unliked");
        setcommentliked(false);
      } else {
        // await axios.post(`/api/v1/likes/comment/${commentId}`, null, {
        await axios.post(`/likes/comment/${commentId}`, null, {
          withCredentials: true,
        });
        toast.success("comment liked");
        setcommentliked(true);
      }
    } catch (error) {
      console.log(error, "like comment failed");
    }
  };

  useEffect(() => {
    fetchcommentlikestatus();
  }, [commentId]);

  return (
    <>
      <button
        onClick={togglecommentlike}
        className={`text-xl transition-transform hover:scale-110 ${
          commentliked
            ? "text-red-500 dark:text-red-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
        title={commentliked ? "Unlike comment" : "Like comment"}
      >
        {commentliked ? "👍" : "👍🏻"}
      </button>
      <Toaster position="top-right" />
    </>
  );
}

export default CommentLikeButton;
