import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("")
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
        className="px-3 py-1 rounded-l border outline-none dark:bg-[#181818] dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-300 px-1 py-1 rounded-r text-white"
      >
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
