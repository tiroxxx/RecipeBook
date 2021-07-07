const Recipebook = require('../models/recipe');
const User = require('../models/User');

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate('recipes');
    res.send(user.recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Save a recipe
exports.saveRecipe = async (req, res) => {
  const savedRecipe = req.body[0];
  const userId = req.body[1];

  const recipe = new Recipebook({
    title: savedRecipe.title,
    image: savedRecipe.image,
    readyInMinutes: savedRecipe.readyInMinutes,
    servings: savedRecipe.servings,
    sourceUrl: savedRecipe.sourceUrl,
    summary: savedRecipe.summary,
  });
  try {
    const newRecipe = await recipe.save();
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { recipes: newRecipe._id } }
    );
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
  const recipeId = req.body.recipeId;
  const userId = req.body.userId;

  try {
    const deletedRecipe = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { recipes: recipeId } }
    );
    res.status(201).json(recipeId);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
