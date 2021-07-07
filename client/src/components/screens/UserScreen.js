import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserScreen({ history }) {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState();

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      history.push('/login-screen');
    }
    async function getUserRecipes() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      const userId = localStorage.getItem('user-id');
      try {
        const { data } = await axios.get(`/api/recipebook/${userId}`, config);
        setPrivateData(data);
      } catch (err) {
        localStorage.removeItem('auth-token');
        console.log(err);
        setError('You are not authorized, please login');
      }
    }
    getUserRecipes();
  }, [history]);

  async function deleteRecipe(recipe) {
    const payload = {
      data: {
        userId: localStorage.getItem('user-id'),
        recipeId: recipe._id,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    };

    try {
      const { data } = await axios.delete(`/api/recipebook/`, payload);
      const recipeArray = privateData;
      // Find index of deleted recipe
      let index = recipeArray.findIndex((recipe) => recipe._id === data);
      setPrivateData(
        privateData.filter((recipe, stateIndex) => stateIndex !== index)
      );

      console.log(privateData);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  function Recipes() {
    if (privateData) {
      return (
        <div className="RecipesContainer">
          {privateData.map((recipe, recipeIdx) => {
            return (
              <div key={recipeIdx} className="RecipeCard">
                <img
                  className="CardImage"
                  src={recipe.image}
                  alt="recipe stuff"
                />
                <h3>{recipe.title}</h3>
                <p>Ready in: {recipe.readyInMinutes} minutes</p>
                <p>Serves: {recipe.servings}</p>
                <a rel="noreferrer" target="_blank" href={recipe.sourceUrl}>
                  Link to Recipe
                </a>
                <button onClick={() => deleteRecipe(recipe)}>delete</button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <h1>Get started by saving your favorite recipes here!</h1>;
    }
  }

  function logoutHandler() {
    localStorage.removeItem('auth-token');
    history.push('/login-screen');
  }

  return (
    <>
      {error && <span>{error}</span>}
      <button onClick={logoutHandler}>Logout</button>
      <Recipes />
    </>
  );
}
