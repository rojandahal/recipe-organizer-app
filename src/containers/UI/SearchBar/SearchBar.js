import React, { useEffect, useState } from "react";
import axios from "axios";

import "./SearchBar.css";
import SearchDetails from "./SearchDetail/SearchDetail";
/**
 * @author
 * @function SearchBar
 **/

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");

  const onChangeHandler = (event) => {
    setSearchText(event.target.value);
    axios
      .get(
        `http://localhost:3000/api/v1/recipe/search/?title=${event.target.value}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data.data);
        console.log(searchText);
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <>
      <div className="SearchBar">
        <div class="ui action input">
          <input
            type="text"
            placeholder="Search..."
            onChange={onChangeHandler}
          />
          <button class="ui icon button">
            <i class="search icon"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
