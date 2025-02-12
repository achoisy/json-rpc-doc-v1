import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 px-3 py-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
