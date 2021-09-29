const express = require('express');

// Controllers
const {
    getRecipes,
    getRecipe,
    getMyPublicRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    searchRecipe
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
    .post(protect, authorization('admin', 'user'), createRecipe)

router
    .route('/my')
    .get(protect, authorization('admin'),advanceResults(Recipe, {
        path: 'recipe',
        select: 'title description servings'
    }), getMyPublicRecipe)

router
    .route('/search')
    .get(advanceResults(Recipe, {
        path: 'recipe',
        select: 'title description servings'
    }), searchRecipe)

router
    .route('/:id')
    .get(getRecipe)
    .delete(protect, authorization('admin','user'), deleteRecipe)
    .put(protect, authorization('admin','user'), updateRecipe)



module.exports = router;