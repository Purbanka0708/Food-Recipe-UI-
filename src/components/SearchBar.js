
import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search for recipes..."
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
};

export default SearchBar; 
