import React from "react";

import "./SearchBar.css";

/**
 * @author
 * @function SearchBar
 **/

const SearchBar = (props) => {
  return (
    <div className="SearchBar">
      <div class="ui action input">
        <input type="text" placeholder="Search..." />
        <button class="ui icon button">
          <i class="search icon"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
