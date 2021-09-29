// sendResponse helper function
const { sendResponse } = require("../helpers/response");

// asyncHandler import
const asyncHandler = require("../helpers/asyncHandler");
const ApiError = require("../errors/ApiError");

const Favourite = require("../models/favourite.model");

//@des      Add to Favourite
//@route    GET /api/v1/favourite/addToFavourite
//@access   Public
const addToFavouriteController = asyncHandler(async (req, res, next) => {
  req.body.userfrom = req.user.id;
  const fav = await Favourite.create(req.body);

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: fav,
      message: "Favourited Successful",
    },
    200,
    "application/json"
  );
});

//@des      Remove to Favourite
//@route    GET /api/v1/favourite/:id
//@access   Public
const removeFromFavouriteController = asyncHandler(async (req, res, next) => {
  let fav = await Favourite.findById(req.params.id);

  if (!fav) {
    return next(
      new ApiError(400, `fav of id ${req.params.id} couldn't be found.`)
    );
  }

  if (fav.userfrom.toString() !== req.user.id) {
    return next(
      ApiError.unauthorized(`User of id ${req.user.id} is unauthorized.`)
    );
  }

  await fav.remove();

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: [],
      message: "Deletetion sucess.",
    },
    200,
    "application/json"
  );
});

//@des      Get Favourites
//@route    GET /api/v1/favourite/my
//@access   Public
const getFavouritedRecipeController = asyncHandler(async (req, res, next) => {
  // Find the favourite by userId
  const fav = await Favourite.find({ userfrom: req.user.id });
  // If there is no favourite
  if (!fav) {
    return next(ApiError.notfound(`fav not found for user ${req.user._id} `));
  }

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: fav,
    },
    200,
    "application/json"
  );
  //   try {
  //     const favourites = await Favourite.find({ userFrom: req.body.userFrom });
  //     if (favourites) {
  //       return res.status(200).json({ success: true, favourites });
  //     }
  //   } catch (error) {
  //     return res.status(400).json({ success: false, error });
  //   }
});

module.exports = {
  addToFavouriteController,
  removeFromFavouriteController,
  getFavouritedRecipeController,
};
