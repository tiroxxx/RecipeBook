const express = require('express');
const router = express.Router();
const {
  getRecipes,
  saveRecipe,
  deleteRecipe,
} = require('../controllers/recipebook');
const { verify } = require('../middleware/verifyToken');

// Getting all recipes
router.get('/:id', verify, getRecipes);

// Save a recipe
router.post('/', verify, saveRecipe);

router.delete('/', verify, deleteRecipe);

module.exports = router;
