import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axios"
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

  if (!video) return <p className="p-4 text-black dark:text-white">Loading</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-200 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video
          src={video.videofile}
          controls
          className="w-full h-full object-contain"
          onPlaying={handleplay}
        ></video>
      </div>

      <div className="mt-6 space-y-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {video.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {video.views} views
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={video.owner.avatar}
              alt="Channel Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-200">
                {video.owner.username}
              </p>
              <SubscribeButton channelId={video.owner._id} />
            </div>
          </div>

          <VideoLikeButton videoId={video._id} />
        </div>

        <div className="mt-4 bg-gray-200 dark:bg-gray-800 p-4 rounded shadow text-gray-800 dark:text-gray-200">
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="whitespace-pre-line">{video.description}</p>
        </div>

        <div className="mt-6">
          <Comment videoId={video._id} />
        </div>
      </div>
    </div>
  );
}

export default Video;
