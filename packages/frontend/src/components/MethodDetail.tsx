import React from 'react';
import { CodeBracketIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { MethodObject } from '@rpcdoc/shared';

/**
 * A component for displaying method details.
 */
export interface MethodDetailProps {
  method: MethodObject;
}

const MethodDetail: React.FC<MethodDetailProps> = ({ method }) => (
  <div className="space-y-6">
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
        {method.name}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{method.summary}</p>
    </div>

    {method.params && (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <CodeBracketIcon className="w-5 h-5" />
          Parameters
        </h3>
        <div className="grid gap-4">
          {method.params.map((param, index) =>
            '$ref' in param ? (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-900 dark:text-gray-200">
                    {param.$ref}
                  </span>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-900 dark:text-gray-200">
                    {param.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {(typeof param.schema === 'object' && param.schema.type) ||
                      'any'}
                    {param.required ? ' *' : ''}
                  </span>
                </div>
                {param.description && (
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {param.description}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    )}

    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <DocumentTextIcon className="w-5 h-5" />
        Example Request
      </h3>
      <pre className="p-4 bg-gray-800 text-gray-100 rounded-lg overflow-x-auto max-w-full">
        <code>
          {JSON.stringify({ method: method.name, params: [] }, null, 2)}
        </code>
      </pre>
    </div>
  </div>
);

export default MethodDetail;
