import React, { useState } from "react";
import SearachBar from "../UI/SearchBar/SearchBar";
import Footer from "../UI/Footer/Footer";
import GetAllRecipes from "../../Components/Recipe/GetAllRecipes/GetAllRecipes";

/**
 * @author
 * @function RecipeCard
 **/

const RecipeCard = (props) => {
  // const [title, setTitle] = useState("");
  // const[description, setDescription] = useState("");
  // const [username, setUsername] = useState("");

  // const {
  //   title,
  //   description,
  //   username
  // } = props;

  return (
    <>
      <div class="ui card">
        <div class="ui slide masked reveal image">
          <img src="/images/avatar/large/jenny.jpg" class="visible content" />
          <img src="/images/avatar/large/elliot.jpg" class="hidden content" />
        </div>
        <div class="content">
          <a class="header">{props.title}</a>
          <div class="meta">
            <span class="date">{props.description}</span>
          </div>
        </div>
        <div class="extra content">
          <a>
            <i class="users icon"></i>{props.username}
          </a>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
