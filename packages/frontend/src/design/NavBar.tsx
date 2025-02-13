import React from 'react';

const NavBar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
    <div className="max-w-full px-4">
      <div className="flex items-center h-14">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            ⚡️ JSON-RPC Documentation
          </span>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
