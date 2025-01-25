import React from "react";
import "./App.css"; 
function Searchinp({query,setQuery}) {
  async function search(e) {
    const query = e.target.value;
    setQuery(query);
  }
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Type to search by title..."
        className="search-input"
        value={query}
        onChange={search}
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
