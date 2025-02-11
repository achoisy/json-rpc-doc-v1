import React from 'react';
import type { MethodObject } from '@rpcdoc/shared';
import { SyntaxHighlighter } from '../code/SyntaxHighlighter';
import { ResponseTabs } from '../tabs/ResponseTabs';

interface ExamplesSectionProps {
  method: MethodObject;
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({ method }) => {
  const examples = method.examples?.[0];

  const requestExample = {
    jsonrpc: '2.0',
    method: method.name,
    params: examples?.params || [],
    id: 1,
  };

  return (
    <>
      {/* Example Request */}
      <div className="mb-8">
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              JSON-RPC Request
            </span>
          </div>
          <SyntaxHighlighter
            code={JSON.stringify(requestExample, null, 2)}
            customStyle={{ margin: 0 }}
          />
        </div>
      </div>

      {/* Example Response */}
      {(examples?.result || method.errors?.length > 0) && (
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              JSON-RPC Response
            </span>
          </div>
          <ResponseTabs method={method} />
        </div>
      )}
    </>
  );
};
