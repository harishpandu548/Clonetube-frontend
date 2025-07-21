import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../axios";
import Videocard from "../pages/home/Videocard"

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setresults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`/videos/search?query=${query}`)
        .then((res) => setresults(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [query]);
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Search results for "{query}":</h2>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {results.map((video) => (
            <Videocard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
