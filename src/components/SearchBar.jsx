import { useState } from "react";

const SearchBar = ({ onSearch, onFocus }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 mt-4 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => onFocus && onFocus()}
        placeholder="Search meals by name..."
        className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/30 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none backdrop-blur-md transition-colors"
      />
      <button
        type="submit"
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
