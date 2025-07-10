import React, { useEffect, useState } from 'react';
import axios from '../axios';

function CommentLikeButton({ commentId }) {
  const [commentliked, setcommentliked] = useState(false);

  const fetchcommentlikestatus = async () => {
    try {
      const res = await axios.get(`/likes/comment/check/${commentId}`, {
        withCredentials: true,
      });
      setcommentliked(res.data.liked);
    } catch (error) {
      console.log(error, 'fetch comment like status failed');
      setcommentliked(false);
    }
  };

  const togglecommentlike = async () => {
    try {
      if (commentliked) {
        await axios.delete(`/likes/comment/${commentId}`, {
          withCredentials: true,
        });
        setcommentliked(false);
      } else {
        await axios.post(`/likes/comment/${commentId}`, null, {
          withCredentials: true,
        });
        setcommentliked(true);
      }
    } catch (error) {
      console.log(error, 'like comment failed');
    }
  };

  useEffect(() => {
    fetchcommentlikestatus();
  }, [commentId]);

  return (
    <button
      onClick={togglecommentlike}
      className={`text-xl transition-transform hover:scale-110 ${
        commentliked
          ? 'text-red-500 dark:text-red-400'
          : 'text-gray-500 dark:text-gray-400'
      }`}
      title={commentliked ? 'Unlike comment' : 'Like comment'}
    >
      {commentliked ? '👍' : '👍🏻'}
    </button>
  );
}

export default CommentLikeButton;
