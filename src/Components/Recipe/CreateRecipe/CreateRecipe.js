import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router";
import Logo from "../../../assets/images/ro.png";

const CreateRecipe = () => {
  const [error, setError] = useState();
  const [title, settitle] = useState();
  const [description, setDescription] = useState();
  const [servings, setservings] = useState();
  const [ingredientname, setIngredentname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setunit] = useState();
  const [steps, setsteps] = useState("");
  const [notes, setnotes] = useState();
  const [image, setimage] = useState();
  const [ispublic, setispublic] = useState(false);
  const [averageRating, setAverageRating] = useState("");
  const [review, setreview] = useState("");
  const [createdSucess, setCreatedSucess] = useState();

  // Handler
  const titleHandler = (event) => {
    settitle(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const servingsHandler = (event) => {
    setservings(event.target.value);
  };

  const ingredientTitleHandler = (event) => {
    setIngredentname(event.target.value);
  };

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const unitHandler = (event) => {
    setunit(event.target.value);
  };

  const stepsHandler = (event) => {
    setsteps(event.target.value);
  };

  const notesHandler = (event) => {
    setnotes(event.target.value);
  };

  const reviewHandler = (event) => {
    setreview(event.target.value);
  };

  const averageRatingHandler = (event) => {
    setAverageRating(event.target.value);
  };

  const submitHandler = async () => {
    const data = {
      ingredientname,
      unit,
      quantity,
      title,
      description,
      image: "no-photo.jpg",
      steps,
      notes,
      servings,
      ispublic: true,
      averageRating: 5,
      review: "Null",
    };
    axios
      .post("http://localhost:3000/api/v1/recipe", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setCreatedSucess(true);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  if (createdSucess) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="signupform">
        <div class="ui middle aligned center aligned grid">
          <div class="column">
            <h2 class="ui teal image header">
              <img src={Logo} class="image" alt="logo" />
              <div class="content">Create Your Recipe</div>
            </h2>
            <div class="ui form">
              <div class="field">
                <label>Recipe Title</label>
                <input
                  placeholder="Recipe Title"
                  type="text"
                  onChange={titleHandler}
                />
              </div>

              <div class="field">
                <label>Recipe Description</label>
                <input
                  placeholder="Description"
                  type="text"
                  onChange={descriptionHandler}
                />
              </div>

              <div class="field">
                <label>Servings</label>
                <input
                  placeholder="Servings"
                  type="text"
                  onChange={servingsHandler}
                />
              </div>

              <div class="field">
                <label>Ingredient Title</label>
                <input
                  placeholder="Ingredient Title"
                  type="text"
                  onChange={ingredientTitleHandler}
                />
              </div>

              <div class="field">
                <label>Quantity</label>
                <input
                  placeholder="Quantity"
                  type="text"
                  onChange={quantityHandler}
                />
              </div>

              <div class="field">
                <label>Units of Quantity</label>
                <input
                  placeholder="Units"
                  type="text"
                  onChange={unitHandler}
                />
              </div>

              <div class="field">
                <label>Steps</label>
                <input
                  placeholder="Steps"
                  type="text"
                  onChange={stepsHandler}
                />
              </div>

              <div class="field">
                <label>Notes</label>
                <input
                  placeholder="Notes"
                  type="text"
                  onChange={notesHandler}
                />
              </div>

              <div
                class="ui fluid large teal submit button"
                type="submit"
                onClick={submitHandler}
              >
                Create Recipe
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateRecipe;
