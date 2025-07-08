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
    <div className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400">
      <button onClick={togglecommentlike}>
        {commentliked ? <div>👍</div> : <div>👎</div>}
      </button>
    </div>
  );
}

export default CommentLikeButton;
