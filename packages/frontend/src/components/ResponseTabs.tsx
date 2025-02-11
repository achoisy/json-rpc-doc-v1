import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { MethodObject } from '@rpcdoc/shared';

type ResponseTab = 'success' | 'error';

interface ResponseTabsProps {
  method: MethodObject;
}

export const ResponseTabs: React.FC<ResponseTabsProps> = ({ method }) => {
  const [activeTab, setActiveTab] = useState<ResponseTab>('success');

  const responseExample = {
    success: {
      jsonrpc: '2.0',
      result: method.examples?.[0]?.result?.value,
      id: 1,
    },
    error: method.errors?.[0]
      ? {
          jsonrpc: '2.0',
          error: {
            code: method.errors[0].code,
            message: method.errors[0].message,
          },
          id: 1,
        }
      : null,
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === 'success'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('success')}
            disabled={!method.examples?.[0]?.result}
          >
            Success
          </button>
          <button
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === 'error'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('error')}
            disabled={!method.errors?.length}
          >
            Error
          </button>
        </div>
      </div>

      {activeTab === 'success' && method.examples?.[0]?.result && (
        <SyntaxHighlighter
          language="json"
          style={coldarkCold}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 0.5rem 0.5rem',
          }}
        >
          {JSON.stringify(responseExample.success, null, 2)}
        </SyntaxHighlighter>
      )}

      {activeTab === 'error' && responseExample.error && (
        <SyntaxHighlighter
          language="json"
          style={coldarkCold}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 0.5rem 0.5rem',
            backgroundColor: 'rgb(254 242 242)',
          }}
        >
          {JSON.stringify(responseExample.error, null, 2)}
        </SyntaxHighlighter>
      )}
    </div>
  );
};
