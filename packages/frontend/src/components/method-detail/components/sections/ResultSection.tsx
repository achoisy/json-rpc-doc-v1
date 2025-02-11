import React from 'react';
import type { MethodObject } from '@rpcdoc/shared';
import { CodeExample } from '../code/CodeExample';

interface ResultSectionProps {
  result?: MethodObject['result'];
}

export const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  if (!result) return null;

  // Handle reference objects
  if (!('schema' in result)) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Result</h2>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {result.description || 'Response'}
          </span>
          <span className="text-xs text-gray-500">
            {typeof result.schema === 'object'
              ? result.schema.type || 'object'
              : 'any'}
          </span>
        </div>
        {result.schema &&
          typeof result.schema === 'object' &&
          'examples' in result.schema && (
            <CodeExample value={result.schema.examples?.[0]} />
          )}
      </div>
    </div>
  );
};
