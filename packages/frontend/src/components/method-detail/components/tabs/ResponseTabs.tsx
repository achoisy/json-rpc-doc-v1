import React, { useState, useEffect } from 'react';
import type {
  ExamplePairingObject,
  ExampleObject,
  ErrorObject,
} from '@rpcdoc/shared';
import { SyntaxHighlighter } from '../code/SyntaxHighlighter';

type ResponseTab = 'success' | 'error';

interface ResponseTabsProps {
  example: ExamplePairingObject;
  error?: ErrorObject;
}

const isExampleObject = (obj: any): obj is ExampleObject => {
  return obj && typeof obj === 'object' && 'value' in obj;
};

export const ResponseTabs: React.FC<ResponseTabsProps> = ({
  example,
  error,
}) => {
  const [activeTab, setActiveTab] = useState<ResponseTab>('success');

  const resolvedResult =
    example.result && isExampleObject(example.result)
      ? example.result.value
      : undefined;

  const hasSuccessExample = !!resolvedResult;
  const hasError = !!error;

  // Reset to available tab when examples/errors change or on mount
  useEffect(() => {
    if (!hasSuccessExample && hasError) {
      setActiveTab('error');
    } else if (hasSuccessExample) {
      setActiveTab('success');
    }
  }, [hasSuccessExample, hasError]);

  const responseExample = {
    success: hasSuccessExample && {
      jsonrpc: '2.0',
      result: resolvedResult,
      id: 1,
    },
    error: hasError && {
      jsonrpc: '2.0',
      error: {
        code: error.code,
        message: error.message,
        data: error.data,
      },
      id: 1,
    },
  };

  if (!hasSuccessExample && !hasError) return null;

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {hasSuccessExample && (
          <button
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === 'success'
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            onClick={() => setActiveTab('success')}
          >
            Success Response
          </button>
        )}
        {hasError && (
          <button
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === 'error'
                ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
            onClick={() => setActiveTab('error')}
          >
            Error Response
          </button>
        )}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'success' && responseExample.success && (
          <SyntaxHighlighter
            code={JSON.stringify(responseExample.success, null, 2)}
            customStyle={{ margin: 0 }}
          />
        )}
        {activeTab === 'error' && responseExample.error && (
          <SyntaxHighlighter
            code={JSON.stringify(responseExample.error, null, 2)}
            customStyle={{ margin: 0 }}
          />
        )}
      </div>
    </div>
  );
};
