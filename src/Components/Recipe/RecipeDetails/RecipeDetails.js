import React from "react";
import "./RecipeDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import myImage from "../../../assets/images/rm_myrecipes.png";
import { Alert } from "bootstrap";

/**
 * @author
 * @function RecipeDetais
 **/

const RecipeDetais = (props) => {
  const [myRecipe, setmyRecipe] = useState("");
  const [title, setTitle] = useState("");
  const [recipeid, setRecipeid] = useState("");
  const [username, setusername] = useState("");
  const [userfrom, setuserfrom] = useState("");

  useEffect(() => {
    axios
      .get(`https://recipe-organizer-site.herokuapp.com/api/v1/recipe/${props.id}/`, {
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
  });

  const submitHandler = async () => {
    setTitle(myRecipe.title);
    setRecipeid(myRecipe._id);
    setusername(myRecipe.username);
    setuserfrom(myRecipe.user);

    const data = {
      title,
      recipeid,
      username,
      userfrom,
    };

    axios
      .post(`http://localhost:3000/api/v1/favourite/addToFavourite`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data);
        console.log("Favourite Clicked!");
        alert("Favourite Added!")
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <>
      <div class="ui vertical stripe segment" className="firstSegment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="eight wide column">
              <h3 class="ui block header">{myRecipe.title}</h3>
              <div class="text_point_wrapper">
                <div class="ui large label">Description:</div>
                <div class="text_point">{myRecipe.description} </div>
              </div>

              <div class="text_point_wrapper">
                <div class="ui large label">Servings:</div>
                <div class="text_point">{myRecipe.servings} </div>
              </div>

              <div class="text_point_wrapper">
                <div class="ui small label">Ingredients:</div>
                <div className="gap">
                  <div class="text_point_wrapper">
                    <div class="ui label">Ingredient Names:</div>
                    <div class="text_point">{myRecipe.ingredientname} </div>
                    <div class="ui label">Quantity:</div>
                    <div class="text_point">{myRecipe.quantity} </div>
                    <div class="ui label">Units:</div>
                    <div class="text_point">{myRecipe.unit} </div>
                  </div>
                </div>
              </div>

              <div class="text_point_wrapper">
                <div class="ui large label">Steps:</div>
                <div class="text_point">{myRecipe.steps} </div>
              </div>

              <div class="text_point_wrapper">
                <div class="ui large label">Notes:</div>
                <div class="text_point">{myRecipe.notes} </div>
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
        <button
          class="fluid ui right labeled icon button"
          onClick={submitHandler}
        >
          <i class="heart icon"></i>
          Add to favourite
        </button>
      </div>
    </>
  );
};

export default RecipeDetais;
