import axios from "axios";
import React, { useEffect, useState } from "react";
import rm_myrecipe from "../../../assets/images/rm_myrecipes.png";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import "./GetUserRecipe.css";
import Footer from "../../../containers/UI/Footer/Footer";
import ProfileSegment from "../ProfileSegment/ProfileSegment";

const GetUserRecipe = () => {
  const [myrecipes, setMyrecipes] = useState([]);
  const [recipeId, setRecipeId] = useState();
  const [user, setUserDetail] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/recipe/my", {
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

    axios
      .get("http://localhost:3000/api/v1/auth/me", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("iuhtfctr");
        setUserDetail(response.data.data);
        console.log(user);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const onDeleteRecipe = (id) => {
    console.log("Deleted Clicked!");
    axios
      .delete(`http://localhost:3000/api/v1/recipe/${id}/`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setMyrecipes(response.data.data);
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
      <ProfileSegment
        username={user.username}
        firstname={user.firstname}
        lastname={user.lastname}
        email={user.email}
        role={user.role}
      />
      <div className="getuserrecipe">
        {recipeId === undefined ? (
          myrecipesList
        ) : (
          <RecipeDetails id={recipeId} />
        )}
      </div>
    </>
  );
};

export default GetUserRecipe;
