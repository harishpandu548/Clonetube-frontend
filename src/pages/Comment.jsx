import React, { useEffect, useState } from "react";
import axios from "../axios";
// import axios from "axios"
import CommentLikeButton from "../components/CommentLikeButton";

function Comment({ videoId }) {
  const [comments, setcomments] = useState([]);
  const [newcomment, setnewcomment] = useState("");

  const fetchcomments = async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      // const res = await axios.get(`/api/v1/comments/${videoId}`);
      setcomments(res.data.data);
    } catch (error) {
      console.log(error, "fetch comments failed");
    }
  };

  useEffect(() => {
    fetchcomments();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newcomment.trim()) return;
    try {
      await axios.post(
        `/comments/${videoId}`,
        // `/api/v1/comments/${videoId}`,
        { content: newcomment },
        { withCredentials: true }
      );
      setnewcomment("");
      fetchcomments();
    } catch (error) {
      console.log(error, "comment failed");
    }
  };

  return (
    <div className="mt-8 text-black dark:text-white">
      <h3 className="text-xl font-semibold mb-6">
        {comments.length} Comments
      </h3>

      <form className="flex items-center gap-4 mb-8" onSubmit={handleSubmit}>
        <input
          className="flex-1 p-3 rounded-xl bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 text-sm focus:outline-none"
          type="text"
          placeholder="Add a comment..."
          value={newcomment}
          onChange={(e) => setnewcomment(e.target.value)}
        />
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-medium transition">
          Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div className="flex gap-4 items-start" key={comment._id}>
            <img
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
              src={comment.owner.avatar}
              alt="User Avatar"
            />
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {comment.owner.username}
              </p>
              <div className="flex items-center justify-between bg-gray-100 dark:bg-neutral-800 p-3 rounded-xl shadow-sm">
                <p className="text-gray-900 dark:text-gray-100 text-sm">
                  {comment.content}
                </p>
                <CommentLikeButton commentId={comment._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
