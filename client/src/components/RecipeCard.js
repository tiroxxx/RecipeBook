import React from 'react';
import './Recipe.css';
import axios from 'axios';

export default function Recipes({ recipes, isLoggedIn }) {

  async function saveRecipe(recipe) {
    const newRecipe = {
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      summary: recipe.summary,
    };
    const request = [newRecipe, localStorage.getItem('user-id')];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    };
    await axios.post('http://localhost:3001/api/recipebook', request, config);
  }

  return (
    <div className="RecipesContainer">
      {recipes.map((recipe, recipeIdx) => {
        return (
          <div key={recipeIdx}>
            {recipeIdx <= 5 ? (
              <div className="RecipeCard">
                <img
                  className="CardImage"
                  src={recipe.image}
                  alt={recipe.title}

                />
                <h3>{recipe.title}</h3>
                <p>Ready in: {recipe.readyInMinutes} minutes</p>
                <p>Serves: {recipe.servings}</p>
                <a rel="noreferrer" target="_blank" href={recipe.sourceUrl}>
                  {' '}
                  Link to Recipe{' '}
                </a>
                {isLoggedIn && (
                  <button onClick={() => saveRecipe(recipe)}>
                    SAVE recipe
                  </button>
                )}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
