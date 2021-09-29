const express = require("express");
const router = express.Router();

const advanceResults = require("../middlewares/advanceResults");
const { protect, authorization } = require("../middlewares/auth");
const Favourite = require("../models/favourite.model");

const {
  addToFavouriteController,
  removeFromFavouriteController,
  getFavouritedRecipeController,
} = require("../controllers/favourite.controller");

// Define Route
router
  .route("/addToFavourite")
  .post(protect, authorization("admin", "user"), addToFavouriteController);
router
  .route("/:id")
  .delete(
    protect,
    authorization("admin", "user"),
    removeFromFavouriteController
  );
router
  .route("/my")
  .get(
    protect,
    authorization("admin", "user"),
    advanceResults(Favourite),
    getFavouritedRecipeController
  );
module.exports = router;
