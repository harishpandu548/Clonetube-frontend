import React, { useState, useEffect } from 'react';
import axios from '../axios';
import toast, { Toaster } from 'react-hot-toast';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

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
        toast.success('Unliked the video');
      } else {
        await axios.post(`/likes/video/${videoId}`, {}, { withCredentials: true });
        setliked(true);
        setlikecount((prev) => prev + 1);
        toast.success('Liked the video');
      }
    } catch (error) {
      console.log('like error', error);
      toast.error('Error while updating like');
    }
  };

  useEffect(() => {
    likeStatus();
  }, [videoId]);

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={toggleLike}
        className={`flex items-center gap-1 px-3 py-1 rounded-full transition duration-200 ${
          liked
            ? 'bg-red-100 text-red-600 dark:bg-red-800/20 dark:text-red-400'
            : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
        } hover:scale-105`}
      >
        {liked ? <ThumbsUp size={18} /> : <ThumbsDown size={18} />}
        <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-400">{likecount}</span>
      <Toaster position="top-right" />
    </div>
  );
}

export default VideoLikeButton;
