import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

/**
 * Navigation bar component with search and authentication controls
 */
export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/vite.svg" className="h-8 w-8" alt="Logo" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
              RPC Docs
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search methods..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 transition-all"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {isAuthenticated ? 'Account' : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
