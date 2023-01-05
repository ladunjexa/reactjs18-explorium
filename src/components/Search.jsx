import React, { useState } from "react";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Classifier } from "./Classifier";

/*
 * SEARCH
 */
export const Search = () => {
  const [search, setSearch] = useState("TailwindCSS");
  const { setSearchTerm } = useResultContext();

  // Handle Search
  const handleSearch = () => {
    if (search.trim().length !== 0) {
      setSearchTerm(search);
    }
  };

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      {/* Search Field */}
      <input
        type="text"
        value={search}
        onKeyDown={(e) => {
          e?.key === "Enter" && handleSearch();
        }}
        placeholder="Search on Explorium or type URL"
        onChange={(e) => setSearch(e.target.value)}
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
      />

      {/* Search Button */}
      <button
        type="button"
        className="absolute top-1.5 text-2xl text-gray-500"
        onClick={handleSearch}
      >
        🔎
      </button>

      {/* Classifications */}
      <Classifier />
    </div>
  );
};
