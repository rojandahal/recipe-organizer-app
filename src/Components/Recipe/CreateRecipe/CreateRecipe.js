import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router";

const CreateRecipe = () => {
  const [error, setError] = useState();
  const [title, settitle] = useState();
  const [description, setDescription] = useState();
  const [servings, setservings] = useState();
  const [ingredientTitle, setIngredentTitle] = useState();
  const [quantity, setQuantity] = useState();
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
    setIngredentTitle(event.target.value);
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
      ingredients: {
        name: ingredientTitle,
        quantity: quantity,
        unit: unit,
      },
      title,
      description,
      image: "no-photo.jpg",
      steps,
      notes,
      servings,
      ispublic: true,
      averageRating,
      review,
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
      <div className="Singup">
        {error}
        <h3 className="title">Create recipe</h3>
        <div>
          <h4 className="label">Recipe title</h4>
          <input
            type="text"
            name="InputName"
            placeholder="Recipe Title"
            onChange={titleHandler}
          ></input>
        </div>
        <div>
          <h4 className="label">Recipe description</h4>
          <input
            type="text"
            name="InputName"
            placeholder="Recipe Description"
            onChange={descriptionHandler}
          ></input>
        </div>
        <div>
          <h4 className="label">Servings</h4>
          <input
            type="text"
            name="InputName"
            placeholder="Servings"
            onChange={servingsHandler}
          ></input>
        </div>
        <div title="Ingredients">
          <div>
            <h4 className="label">Ingredient Title</h4>
            <input
              type="text"
              name="InputName"
              placeholder="Ingredient Title"
              onChange={ingredientTitleHandler}
            ></input>
          </div>
          <div>
            <h4 className="label">Quantity</h4>
            <input
              type="text"
              name="InputName"
              placeholder="Quantity"
              onChange={quantityHandler}
            ></input>
          </div>
          <div>
            <h4 className="label">Units</h4>
            <input
              type="text"
              name="InputName"
              placeholder="Units"
              onChange={unitHandler}
            ></input>
          </div>
        </div>

        <div>
          <h4 className="label">steps</h4>
          <input
            type="text"
            name="InputName"
            placeholder="Steps"
            onChange={stepsHandler}
          ></input>
        </div>
        <div>
          <h4 className="label">Notes</h4>
          <input
            type="text"
            name="InputName"
            placeholder="Notes"
            onChange={notesHandler}
          ></input>
        </div>
        <div>
          <h4 className="label">Rating</h4>
          <input
            type="text"
            name="InputName"
            placeholder="Rating"
            onChange={averageRatingHandler}
          ></input>
        </div>
        <div>
          <h4 className="label">Review</h4>
          <input
            type="text"
            name="InputName"
            placeholder="Units"
            onChange={reviewHandler}
          ></input>
        </div>

        <div>
          <button type="submit" onClick={submitHandler}>
            Create Recipe
          </button>
        </div>
      </div>
    );
  }
};

export default CreateRecipe;
