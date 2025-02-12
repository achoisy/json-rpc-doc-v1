import React, { ReactNode } from 'react';
import NavBar from '../../design/NavBar';

interface ViewerLayoutProps {
  children: ReactNode;
}

const ViewerLayout: React.FC<ViewerLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1">{children}</div>
    </div>
  );
};

export default ViewerLayout;
