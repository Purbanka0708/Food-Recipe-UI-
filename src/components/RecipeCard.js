
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
    setIsBookmarked(bookmarks.some(bookmark => bookmark.idMeal === recipe.idMeal));
  }, [recipe.idMeal]);

  const toggleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
    
    if (isBookmarked) {
      
      bookmarks = bookmarks.filter(bookmark => bookmark.idMeal !== recipe.idMeal);
    } else {
      
      bookmarks.push(recipe);
    }

    localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="w-full h-48 object-cover rounded-t-lg" 
      />
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-800 mb-2">{recipe.strMeal}</h2>
        <p className="text-gray-600 mb-4">
          Ingredients: 
          {Object.keys(recipe)
            .filter(key => key.startsWith('strIngredient') && recipe[key])
            .map((key, index) => (
              <span key={index} className="block">{recipe[key]}</span>
            ))}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <Link to={`/recipe/${recipe.idMeal}`}>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              View Details
            </button>
          </Link>
          <button 
            onClick={toggleBookmark}
            className={`py-2 px-4 rounded-lg transition duration-200 ${isBookmarked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {isBookmarked ? 'Unbookmark' : 'Bookmark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
