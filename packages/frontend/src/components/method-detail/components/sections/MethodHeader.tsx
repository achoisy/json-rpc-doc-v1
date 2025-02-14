import React from 'react';
import type { MethodObject } from '@rpcdoc/shared';

interface MethodHeaderProps {
  method: MethodObject;
  documentTitle?: string;
}

export const MethodHeader: React.FC<MethodHeaderProps> = ({
  method,
  documentTitle,
}) => {
  return (
    <div className="space-y-4">
      {documentTitle && (
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {documentTitle}
        </h1>
      )}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {method.name}
        </h2>
        {method.summary && (
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {method.summary}
          </p>
        )}
      </div>
      {method.description && (
        <div className="prose dark:prose-invert max-w-none">
          <p>{method.description}</p>
        </div>
      )}
      {method.tags && method.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {method.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded"
            >
              {'name' in tag ? tag.name : tag.$ref}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
