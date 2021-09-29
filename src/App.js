import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login/Login";
import Logout from "./Components/Auth/Logout";
import Signup from "./Components/Auth/Signup/Signup";
import UserRecipe from "./Components/Recipe/GetUserRecipe/GetUserRecipe";
import Navlinks from "./Components/Navigation/Navlinks/Navlinks";
import CreateRecipe from "./Components/Recipe/CreateRecipe/CreateRecipe";
import Home from "./containers/Home/Home";
import GetAllRecipes from "./Components/Recipe/GetAllRecipes/GetAllRecipes";
import FavouriteRecipe from "./Components/Recipe/FavouriteRecipe/FavouriteRecipe";
import RecipeDetais from "./Components/Recipe/RecipeDetails/RecipeDetails";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function App() {
  const [isLogginIn, setIsLogginIn] = useState();
  const [role, setRole] = useState();

  const getMe = () => {
    axios
      .get("http://localhost:3000/api/v1/auth/me", { withCredentials: true })
      .then((response) => {
        setRole(response.data.data.role);
        console.log(role);
        setIsLogginIn(true);
      })
      .catch((error) => {
        console.log(error.message);
        // Asses denied
        setIsLogginIn(false);
      });
  };

  // Every time when you be in the website check the auth
  useEffect(() => {
    getMe();
  });
  return (
    <BrowserRouter>
      {/* { location.loaded ? JSON.stringify(location) : ""} */}
      <Navlinks
        isLogin={isLogginIn}
        role={role === undefined ? role : capitalize(role)}
      />
      <Switch>
        <Route
          path="/auth/login"
          exact
          component={() => <Login isLogin={isLogginIn} />}
        />
        <Route
          path="/auth/signup"
          exact
          component={() => <Signup isLogin={isLogginIn} />}
        />
        <Route path="/recipe/details" exact component={RecipeDetais}/>
        <Route path="/recipe/favourites" exact component={FavouriteRecipe} />
        <Route path="/recipe" exact component={GetAllRecipes} />
        <Route path="/auth/recipe" exact component={CreateRecipe} />
        <Route path="/recipe/my" exact component={UserRecipe} />
        <Route path="/auth/logout" exact component={Logout} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
