import React from 'react';

interface BreadCrumbProps {
  path: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ path }) => {
  const segments = path.split('.');

  return (
    <div className="flex items-center gap-2 text-sm mb-4">
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            {segment}
          </span>
          {index < segments.length - 1 && (
            <span className="text-gray-400 dark:text-gray-500">/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
