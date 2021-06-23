// sendResponse helper function
const { sendResponse } = require("../helpers/response");

// asyncHandler import
const asyncHandler = require("../helpers/asyncHandler");

// Model Recipe
const Recipe = require("../models/recipe.model");
const ApiError = require("../errors/ApiError");

//@des      Get all recipe
//@route    GET /api/v1/recipe
//@access   Public
exports.getRecipes = asyncHandler(async (req, res, next) => {
  return sendResponse(res, res.advanceResults, 200, "application/json");
});

//@des      Get all recipe by the Admin which are public
//@route    GET /api/v1/recipe/my
//@access   Private: [admin, owner]
exports.getMyPublicRecipe = asyncHandler(async (req, res, next) => {
  // Find the Recipe by userId
  const recipe = await Recipe.find({ user: req.user._id, ispublic: true });
  
  // If there is no recipe
  if (!recipe) {
    return next(
      ApiError.notfound(`recipe not found for user ${req.user._id} `)
    );
  }

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: recipe,
    },
    200,
    "application/json"
  );
});

//@des      Get single recipe
//@route    GET /api/v1/recipe/:id
//@access   Public
exports.getRecipe = asyncHandler(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(ApiError.notfound(`id of ${req.params.id} couldn't found.`));
  }

  //   recipe = await recipe.populate({
  //     path: "recipe",
  //     select: "title description servings steps",
  //   });

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: recipe,
    },
    200,
    "application/json"
  );
});

//@des      Create Recipe
//@route    POST /api/v1/recipe
//@access   Private: [admin, owner]
exports.createRecipe = asyncHandler(async (req, res, next) => {
  //req.body.user = req.user.id;

  const recipe = await Recipe.create(req.body);

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: recipe,
    },
    200,
    "application/json"
  );
});

//@des      Update Recipe
//@route    PUT /api/v1/recipe/:id
//@access   Private: [admin, owner]
exports.updateRecipe = asyncHandler(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ApiError(400, `Recipe of id ${req.params.id} couldn't be found.`)
    );
  }

  if (recipe.user.toString() !== req.user.id) {
    return next(
      ApiError.unauthorized(`User of id ${req.user.id} is unauthorized.`)
    );
  }

  recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: recipe,
    },
    200,
    "application/json"
  );
});

//@des      Delete Recipe
//@route    Delete /api/v1/recipe/:id
//@access   Private: [admin, owner]
exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ApiError(400, `Recipe of id ${req.params.id} couldn't be found.`)
    );
  }

  if (recipe.user.toString() !== req.user.id) {
    return next(
      ApiError.unauthorized(`User of id ${req.user.id} is unauthorized.`)
    );
  }

  await recipe.remove();

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
