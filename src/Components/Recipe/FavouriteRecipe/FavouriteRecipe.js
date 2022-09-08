import axios from "axios";
import React, { useEffect, useState } from "react";
import rm_myrecipe from "../../../assets/images/rm_myrecipes.png";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import "./FavouriteRecipe.css";
import Footer from "../../../containers/UI/Footer/Footer";

const FavouriteRecipe = () => {
  const [myrecipes, setMyrecipes] = useState([]);
  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    axios
      .get("https://recipe-organizer-site.herokuapp.com/api/v1/favourite/my", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setMyrecipes(response.data.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  const onDeleteRecipe = (id) => {
    console.log("Deleted Clicked!");
    axios
      .delete(`https://recipe-organizer-site.herokuapp.com/api/v1/favourite/${id}/`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((error) => console.log(error));
  };

  const onRecipeDetails = (id) => {
    console.log("Recipe Details Clicked!");
    setRecipeId(id);
  };

  let myrecipesList = [];
  myrecipes.forEach((element) => {
    myrecipesList.push(
      <div class="four wide column">
        <div class="column">
          <div className="card">
            <div className="image">
              <img src={rm_myrecipe} />
            </div>
            <div className="info">
              <a
                class=" medium header"
                href="#"
                onClick={() => onRecipeDetails(element.recipeid)}
              >
                {element.title}
              </a>
              <div className="username">
                <i class="user icon"></i>
                {element.username}
              </div>
              <div className="description">
                <h4>
                  Description: <p>{element.title}</p>{" "}
                </h4>
              </div>
              <div class="container">
                <button
                  class="fluid ui right labeled icon button"
                  onClick={() => onRecipeDetails(element.recipeid)}
                >
                  <i class="right arrow icon"></i>
                  More
                </button>
              </div>

              <button
                class="fluid ui right labeled icon button"
                onClick={() => onDeleteRecipe(element._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="getuserrecipe">
        {recipeId === undefined ? (
          myrecipesList
        ) : (
          <RecipeDetails id={recipeId} />
        )}
        {myrecipes.length === 0 ? (
          <div class="ui header">No Favourite Recipes!</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FavouriteRecipe;
