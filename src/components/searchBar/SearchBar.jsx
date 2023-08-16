import React from "react";
import "./searchBar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = () => {
  return (
    <div className="search-wrapper">
      <SearchOutlinedIcon style={{ color: "gray" }} />
      <input
        className="search-bar"
        type="text"
        placeholder="Search Posts, People, Anything"
      />
    </div>
  );
};

export default SearchBar;
