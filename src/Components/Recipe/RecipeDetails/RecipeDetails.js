import React from "react";
import "./RecipeDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import myImage from "../../../assets/images/rm_myrecipes.png";

/**
 * @author
 * @function RecipeDetais
 **/

const RecipeDetais = (props) => {
  const [myRecipe, setmyRecipe] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/recipe/${props.id}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setmyRecipe(response.data.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  return (
    <div class="ui vertical stripe segment" className="firstSegment">
      <div class="ui middle aligned stackable grid container">
        <div class="row">
          <div class="eight wide column">
            <h3 class="header">{myRecipe.title}</h3>
            <div class="text_point_wrapper">
              <div class="ui label">Description:</div>
              <div class="text_point">{myRecipe.description} </div>
            </div>

            <div class="text_point_wrapper">
              <div class="ui label">Servings:</div>
              <div class="text_point">{myRecipe.servings} </div>
            </div>
            
            <div class="text_point_wrapper">
              <div class="ui small label">Ingredients:</div>
              <div className="gap">
                <div class="text_point_wrapper">
                  <div class="ui label">Ingredient Names:</div>
                  <div class="text_point">{myRecipe.title} </div>
                  <div class="ui label">Quantity:</div>
                  <div class="text_point">{myRecipe.title} </div>
                  <div class="ui label">Units:</div>
                  <div class="text_point">{myRecipe.title} </div>
                </div>
              </div>
            </div>
          </div>
          <div class="six wide right floated column">
            <img
              src={myImage}
              class="ui large bordered rounded image"
              alt="recipe-manager-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetais;
