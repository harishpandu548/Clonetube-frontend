import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../axios";
import VideoCard from "../pages/home/Videocard";
import { motion } from "framer-motion";

function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [params] = useSearchParams();
  const query = params.get("query");
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      axios
        // .get(`/api/v1/videos/search?query=${query}`)
        .get(`/videos/search?query=${query}`)
        .then((res) => {
            setVideos(res.data.data)})
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Search Results for "{query}"
      </h2>

      {videos.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center text-center py-20 px-4 text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-4xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold tracking-wide">
            No Videos Found
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            We couldn’t find any videos. Try using different keywords.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Go Home
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default SearchPage;
