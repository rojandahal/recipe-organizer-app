import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../../containers/UI/Footer/Footer";
import SearchBar from "../../../containers/UI/SearchBar/SearchBar";
import rm_myrecipe from "../../../assets/images/rm_myrecipes.png";
import "./GetAllRecipes.css";
import RecipeDetails from "../RecipeDetails/RecipeDetails";

const GetAllRecipes = () => {
  const [Recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/recipe/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setRecipes(response.data.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const onRecipeDetails = (id) => {
    console.log("Recipe Details Clicked!");
    setRecipeId(id);
    // axios
    //   .get(`http://localhost:3000/api/v1/recipe/${id}/`, {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setRecipeId(id);
    //   })
    //   .catch((error) => console.log(error));
  };

  const recipelist = [];
  Recipes.forEach((element) => {
    recipelist.push(
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
                onClick={() => onRecipeDetails(element._id)}  
              >
                {element.title}
              </a>
              <div className="username">
                <i class="user icon"></i>
                {element.username}
              </div>
              <div className="description">
                <h4>
                  Description: <p>{element.description}</p>{" "}
                </h4>
              </div>
              <div class="container">
                <button
                  class="fluid ui right labeled icon button"
                  onClick={() => onRecipeDetails(element._id)}
                >
                  <i class="right arrow icon"></i>
                  More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <SearchBar />
      <div className="getallrecipe">
        {recipeId === undefined ? recipelist : <RecipeDetails id={recipeId} />}
      </div>
    </div>
  );
};

export default GetAllRecipes;
