import React, { useState } from "react";
import "./App.css"; 
import { searchq } from "./Api";

function Searchinp({ setData, pageno, query, setQuery }) {
  const [typingTimeout, setTypingTimeout] = useState(null);

  const search = (e) => {
    const query = e.target.value;
    setQuery(query);

    // Clear the previous timeout if there's any
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to trigger the search after 500ms
    const timeout = setTimeout(async () => {
      if (query.length >= 3) {
        const result = await searchq(query, pageno);
        setData(result);
      }
    }, 500); // Adjust debounce time here (500ms)

    setTypingTimeout(timeout);
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Type at least 3 characters to search"
        className="search-input"
        onChange={search}
        value={query}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/622/622669.png" 
        onClick={() => alert("Search clicked!")}
        alt="Search Icon"
        className="search-icon"
      />
    </div>
  );
}

export default Searchinp;
