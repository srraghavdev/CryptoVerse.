import React from "react";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
function Search({ set, searchterm }) {
  return (
    <div className="search-flex">
      <div className="search-container">
        {/* Search icon mui */}
        <SearchRoundedIcon></SearchRoundedIcon>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          onChange={(event) => set(event.target.value)}
          // setting new value on input on onChange
          value={searchterm}
          // value is searhcterm
        ></input>
      </div>
    </div>
  );
}

export default Search;
