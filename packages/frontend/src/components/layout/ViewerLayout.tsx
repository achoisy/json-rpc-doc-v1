import React, { ReactNode } from 'react';
import NavBar from '../../design/NavBar';

interface ViewerLayoutProps {
  children: ReactNode;
}

const ViewerLayout: React.FC<ViewerLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1 pt-14">
        {/* Sidebar wrapper */}
        <div className="md:w-72 flex-shrink-0">
          {/* First child is the sidebar */}
          {React.Children.toArray(children)[0]}
        </div>
        {/* Main content wrapper */}
        <div className="flex-1">
          {/* Second child is the main content */}
          {React.Children.toArray(children)[1]}
        </div>
      </div>
    </div>
  );
};

export default ViewerLayout;
