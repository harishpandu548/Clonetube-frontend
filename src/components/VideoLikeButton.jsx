import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function VideoLikeButton({ videoId }) {
  const [liked, setliked] = useState(false);
  const [likecount, setlikecount] = useState(0);

  const likeStatus = async () => {
    try {
      const res = await axios.get(`/likes/video/check/${videoId}`, {
        withCredentials: true,
      });
      setliked(res.data.liked);
      setlikecount(res.data.totalLikes || 0);
    } catch (error) {
      console.log('like status error', error);
      setliked(false);
    }
  };

  const toggleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`/likes/video/${videoId}`, {
          withCredentials: true,
        });
        setliked(false);
        setlikecount((prev) => prev - 1);
        toast.success('Video unliked');
      } else {
        await axios.post(`/likes/video/${videoId}`, {}, { withCredentials: true });
        setliked(true);
        setlikecount((prev) => prev + 1);
        toast.success('Video liked!');
      }
    } catch (error) {
      console.log('like error', error);
      toast.error('Error at liking video');
    }
  };

  useEffect(() => {
    likeStatus();
  }, [videoId]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        className={`text-xl ${liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
        onClick={toggleLike}
      >
        {liked ? '👍' : '👎'}
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-300">{likecount}</span>
      <Toaster position="top-right" />
    </div>
  );
}

export default VideoLikeButton;
