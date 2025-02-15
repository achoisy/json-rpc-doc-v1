import React, { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { OpenRPCService, SearchableMethod } from '@rpcdoc/shared';

interface SearchBarProps {
  service: OpenRPCService;
  onMethodSelect: (methodName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ service, onMethodSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMethods, setFilteredMethods] = useState<SearchableMethod[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const methods = service.getSearchableMethodData();

  const handleSearch = useCallback((query: string) => {
    const filtered = methods.filter(
      method =>
        method.name.toLowerCase().includes(query.toLowerCase()) ||
        method.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMethods(filtered);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isFocused) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredMethods.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredMethods[selectedIndex]) {
      handleMethodSelect(filteredMethods[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const handleMethodSelect = (method: SearchableMethod) => {
    onMethodSelect(method.name);
    setIsFocused(false);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          className="block w-full pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
        />
      </div>

      {isFocused && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {filteredMethods.map((method, index) => (
            <button
              key={method.name}
              onClick={() => handleMethodSelect(method)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 ${
                index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700/50' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {method.name}
                  </div>
                  {method.description && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {method.description}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
          {filteredMethods.length === 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
