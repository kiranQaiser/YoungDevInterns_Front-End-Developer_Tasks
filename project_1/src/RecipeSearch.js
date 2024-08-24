// src/RecipeSearch.js
import React, { useState } from "react";
import { API_KEY, BASE_URL } from "./api";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(
        `${BASE_URL}?query=${encodedQuery}&apiKey=${API_KEY}&number=10`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (data.results && data.results.length > 0) {
        setRecipes(data.results);
      } else {
        console.log("No recipes found");
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button onClick={handleSearch}>Search</button>
      <RecipeList recipes={recipes} />
    </div>
  );
};

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="100" />
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeSearch;
