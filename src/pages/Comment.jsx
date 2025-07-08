import React from "react";
import axios from "../axios"
import { useEffect, useState } from "react";
import CommentLikeButton from "../components/CommentLikeButton";

function Comment({ videoId }) {
  const [comments, setcomments] = useState([]);
  const [newcomment, setnewcomment] = useState("");

  const fetchcomments = async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
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
        `/api/v1/comments/${videoId}`,
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
    <div className="mt-6 text-black dark:text-white">
      <h3 className="text-lg font-semibold mb-4">
        {comments.length} Comments
      </h3>

      <form className="flex gap-3 mb-6" onSubmit={handleSubmit}>
        <input
          className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-600"
          type="text"
          placeholder="Add a comment"
          value={newcomment}
          onChange={(e) => setnewcomment(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Post
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div className="flex gap-3 items-start" key={comment._id}>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={comment.owner.avatar}
              alt="profile"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {comment.owner.username}
                </p>
              </div>

              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <p className="text-gray-800 dark:text-gray-100">{comment.content}</p>
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
