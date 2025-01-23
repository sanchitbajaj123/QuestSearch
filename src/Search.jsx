import React from "react";
import "./App.css"; // Import the CSS file

function Searchinp() {
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Type at least 3 characters to search"
        className="search-input"
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
