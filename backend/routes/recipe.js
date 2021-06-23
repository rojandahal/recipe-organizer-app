const express = require('express');

// Controllers
const {
    getRecipes,
    getRecipe,
    getMyPublicRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe
} = require('../controllers/recipe.controller');

// Express router
const router = express.Router();


// Advance results
const advanceResults = require('../middlewares/advanceResults');
const { protect, authorization } = require('../middlewares/auth');
const Recipe = require('../models/recipe.model');


router
    .route('/')
    .get(advanceResults(Recipe, {
        path: 'recipe',
        select: 'title description servings'
    }), getRecipes)
    .post(protect, authorization('admin'), createRecipe)

router
    .route('/my')
    .get(protect, authorization('admin'), getMyPublicRecipe)

router
    .route('/:id')
    .get(getRecipe)
    .delete(protect, authorization('admin'), deleteRecipe)
    .put(protect, authorization('admin'), updateRecipe)



module.exports = router;