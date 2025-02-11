import React from 'react';
import type { MethodObject } from '@rpcdoc/shared';

interface MethodHeaderProps {
  method: MethodObject;
}

export const MethodHeader: React.FC<MethodHeaderProps> = ({ method }) => {
  const [namespace, methodName] = method.name.split('/');

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
          {namespace}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {methodName}
        </h1>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {method.description || method.summary}
      </p>
    </div>
  );
};
