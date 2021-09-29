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
  
  req.body.user = req.user._id;
  req.body.username = req.user.username;

  if (req.body.ispublic === true && req.user.role === "user") {
    return next(
      ApiError.notfound(
        `User of username: ${req.body.username} cannot create public recipe.`
      )
    );
  }

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

  if (!(req.body.username === req.user.username)) {
    return next(
      ApiError.notfound(`User of username: ${req.body.username} not found.`)
    );
  }

  if (recipe.user.toString() !== req.user.id) {
    return next(
      ApiError.unauthorized(`User of id ${req.user.id} is unauthorized.`)
    );
  }

  if (req.body.ispublic === true && req.user.role === "user") {
    return next(
      ApiError.notfound(
        `User of username: ${req.body.username} cannot create public recipe.`
      )
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

//@des      Search Recipe using regex
//@route    Get /api/v1/recipe/search/?title=
//@access   Private: [admin, owner]
exports.searchRecipe = asyncHandler(async (req, res, next) => {
  const searchField = req.query.title;

  const recipe = await Recipe.find({
    title: { $regex: searchField, $options: "$i" },
  });
  // console.log(recipe)

  if (!recipe) {
    return next(
      ApiError.notfound(`Recipe name of ${req.query.name} couldn't found.`)
    );
  }

  return sendResponse(
    res,
    {
      status: "Sucess",
      data: recipe,
      message: "Search sucess.",
    },
    200,
    "application/json"
  );
});
