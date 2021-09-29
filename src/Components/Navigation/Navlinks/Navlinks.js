import React from "react";
import { Link } from "react-router-dom";

import "./Navlinks.css";

const Navlinks = (props) => {
  return (
    <div class="ui inverted segment">
      <div class="ui inverted secondary menu">
        <a class="active item">
          <Link to="/">Home</Link>
        </a>
        <a class="item">
          <Link to="/recipe">All Recipe</Link>
        </a>
        <a class="item">
          {props.isLogin ? <Link to="/recipe/my">My profile</Link> : ""}
        </a>
        <a class="item">
          {props.isLogin ? <Link to="/recipe/favourites">Favourites</Link> : ""}
        </a>
        <a class="item">
          {props.isLogin && props.role === "Admin" ? (
            <Link to="/auth/recipe">Create Recipe</Link>
          ) : (
            ""
          )}
        </a>
        <div class="right menu">
          <a class="item">
            {props.isLogin ? (
              <ul class="item role">{props.role}</ul>
            ) : (
              <Link to="/auth/signup">Signup</Link>
            )}
          </a>
          <a class="item">
            {props.isLogin ? (
              <Link to="/auth/logout">Logout</Link>
            ) : (
              <Link to="/auth/login">Login</Link>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navlinks;
