import React from "react";
import myRecipe from "../../../assets/images/rm_myrecipes.png";
import "./Body.css";
import recipeCopy from "../../../assets/images/rm_copy.png";
import { Link } from "react-router-dom";

/**
 * @author
 * @function Body
 **/

export const Body = (props) => {
  return (
    <>
      <div class="ui vertical stripe segment" className="firstSegment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="eight wide column">
              <h3 class="header">Recipe Manager</h3>
              <div class="text_point_wrapper">
                <div class="text_point">
                  Never lose a recipe again! Add your own recipes or copy
                  recipes from any website.
                </div>
                <div class="text_point">
                  Organize with tags. Search, filter, print,
                  scale&nbsp;(premium), email, and share!
                </div>
                <div class="text_point">
                  Fully integrated with the shopping list and meal planner.
                  Syncs across all your devices.
                </div>
              </div>
            </div>
            <div class="six wide right floated column">
              <img
                src={myRecipe}
                class="ui large bordered rounded image"
                alt="recipe-manager-img"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="ui vertical stripe segment" className="secondSegment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="six wide right floated column">
              <img
                src={recipeCopy}
                class="ui large bordered rounded image"
                alt="recipe-manager-img"
              />
            </div>
            <div class="eight wide column">
              <h3 class="header_two">Responsive Website</h3>
              <div class="text_point_wrapper_two">
                <div class="text_point_two">
                  Choose a platform to open the application and search any
                  recipe
                </div>
                <div class="text_point_two">
                  Open the website in different platform in differnet scale and
                  size&nbsp;
                </div>
                <div class="text_point_two">
                  Fully integrated with the shopping list and add your favorite
                  recipe to your favorite list
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ui vertical stripe segment" className="thirdSegment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="eight wide column">
              <h3 class="header">Access from any device </h3>
              <div class="text_point_wrapper">
                <div class="text_point">
                  Log into your account from any browser using your pc or mobile
                  phone.
                </div>
                <div class="text_point">
                  RecipeOraganizer syncs across all your devices.!(Internet
                  Connection Required)
                </div>
              </div>
            </div>
            <div class="six wide right floated column">
              <h3 class="header">Recipe Organizer is Free! </h3>
              <div class="text_point_wrapper">
                <div class="text_point">
                  Fully functional free version. No recipe limits!
                </div>
                <div class="text_point">
                  Signup and SignIn using your email address for secure access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttonSection">
        <button class="button" className="button"> 
          {props.isLogin ? (
            <ul class="item role">{props.role}</ul>
          ) : (
            <Link to="/auth/signup">Signup</Link>
          )}
        </button>
      </div>
    </>
  );
};
