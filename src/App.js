
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import RecipeDetail from './components/RecipeDetail'; 
import BookmarkedRecipes from './components/BookmarkedRecipes'; 

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: recipes, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow-md">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800">Recipe App</h1>
            <nav className="mt-2">
              <Link to="/bookmarked" className="text-blue-600 hover:text-blue-800 transition duration-200">View Bookmarked Recipes</Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4">
          <SearchBar setSearchTerm={setSearchTerm} />
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-600">Error: {error}</p>}
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes && recipes.map(recipe => (
                  <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
              </div>
            } />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/bookmarked" element={<BookmarkedRecipes />} />
          </Routes>
        </main>
        <footer className="bg-white text-center py-4 shadow-md">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Recipe App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
