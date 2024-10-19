// src/components/BookmarkedRecipes.js
import React from 'react';
import { Link } from 'react-router-dom';

const BookmarkedRecipes = () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];

  const removeBookmark = (idMeal) => {
    const updatedBookmarks = bookmarks.filter(recipe => recipe.idMeal !== idMeal);
    localStorage.setItem('bookmarkedRecipes', JSON.stringify(updatedBookmarks));
    window.location.reload(); // Refresh the page to update the view
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bookmarked Recipes</h1>
      {bookmarks.length === 0 ? (
        <p className="text-gray-600">No bookmarked recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map(recipe => (
            <div key={recipe.idMeal} className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="w-full h-48 object-cover rounded-t-lg" 
              />
              <div className="p-4">
                <h2 className="font-bold text-xl text-gray-800 mb-2">{recipe.strMeal}</h2>
                <Link to={`/recipe/${recipe.idMeal}`}>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mr-2">
                    View Details
                  </button>
                </Link>
                <button 
                  onClick={() => removeBookmark(recipe.idMeal)} 
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedRecipes;
