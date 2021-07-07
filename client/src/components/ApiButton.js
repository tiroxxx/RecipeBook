import React from 'react';
import axios from 'axios';

export default function ApiButton() {

  async function callApi() {
    try {
      const recipe = await axios.get(
        `https://api.spoonacular.com/recipes/random?tags=italian&number=10&apiKey=${process.env.REACT_APP_API_KEY_SPOONACULAR}`
      );
      console.log(recipe.data);
error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={callApi}>Call API</button>
    </div>
  );
}
