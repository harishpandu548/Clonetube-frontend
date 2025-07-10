import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Comment from "../Comment";
import VideoLikeButton from "../../components/VideoLikeButton";
import SubscribeButton from "../../components/SubscribeButton";

function Video() {
  const { id } = useParams();
  const [video, setvideo] = useState(null);

  useEffect(() => {
    axios
      .get(`/videos/${id}`)
      .then((res) => setvideo(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleplay = () => {
    axios
      .patch(`/videos/views/${id}`, {}, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (!video) return <p className="p-4 text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-6 text-black dark:text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          <video
            src={video.videofile}
            controls
            className="w-full h-full object-contain"
            onPlaying={handleplay}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
            {video.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {video.views} views
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-300 dark:border-gray-700 pb-4">
          <div className="flex items-center gap-4">
            <img
              src={video.owner.avatar}
              alt="Channel Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-400 dark:border-gray-600"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {video.owner.username}
              </p>
              <SubscribeButton channelId={video.owner._id} />
            </div>
          </div>

          <VideoLikeButton videoId={video._id} />
        </div>

        <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-xl shadow text-gray-800 dark:text-gray-200">
          <h4 className="font-semibold text-lg mb-2">Description</h4>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {video.description}
          </p>
        </div>

        <div className="pt-4">
          <Comment videoId={video._id} />
        </div>
      </div>
    </div>
  );
}

export default Video;
