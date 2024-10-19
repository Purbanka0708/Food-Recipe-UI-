// src/components/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setRecipe(result.meals[0]); // Assuming the result structure has meals
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetail();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">{recipe.strMeal}</h1>
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="w-full h-64 object-cover rounded-lg mt-4" 
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">Ingredients:</h2>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {Object.keys(recipe)
            .filter(key => key.startsWith('strIngredient') && recipe[key])
            .map((key, index) => (
              <li key={index}>{recipe[key]}</li>
            ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">Instructions:</h2>
        <p className="mt-2 text-gray-700">{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
