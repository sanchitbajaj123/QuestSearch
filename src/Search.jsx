import React from "react";
import "./App.css"; 
import {searchq} from "./Api"; 
function Searchinp() {
  async function search(e) {
    const query = e.target.value;
    if (query.length < 3) {
      return;
    }
    const result = await searchq(query);
    console.log(result);
  }
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Type at least 3 characters to search"
        className="search-input"
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
