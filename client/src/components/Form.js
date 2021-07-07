import axios from 'axios';
import React, { useState } from 'react';
import './Form.css';

export default function Form({ setRecipe }) {
  const [input, setInput] = useState('');


  function handleInputChange(event) {
    setInput(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?tags=${input}&number=10&apiKey=${process.env.REACT_APP_API_KEY_SPOONACULAR}`
    );
    setRecipe(response.data.recipes);
    console.log(response.data.recipes);

  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="searchLabel">
        <label>
          <h2>Search a cuisine and receive your random recipes!</h2>
        </label>
      </div>
      <input
        onChange={handleInputChange}
        type="text"
        name="search"
        placeholder="Ingredient"
        className="searchInput"
      />
      <button className="searchBtn">Search</button>
    </form>
  );
}
