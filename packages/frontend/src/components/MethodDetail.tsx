import React, { useState } from 'react';
import { MethodObject } from '@rpcdoc/shared';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  coldarkDark,
  coldarkCold,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * A component for displaying JSON-RPC method details.
 */
export interface MethodDetailProps {
  method: MethodObject;
  documentTitle?: string;
}

// Add new type for response tabs
type ResponseTab = 'success' | 'error';

const MethodDetail: React.FC<MethodDetailProps> = ({ method }) => {
  // Get namespace and method name
  const [namespace, methodName] = method.name.split('/');

  const requestExample = {
    jsonrpc: '2.0',
    method: method.name,
    params: method.examples?.[0]?.params?.map(p => p.value) || [],
    id: 1,
  };

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
    <div className="p-8 max-w-7xl mx-auto">
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Method Details */}
        <div className="flex-1 space-y-6">
          {/* Parameters Section */}
          {method.params && method.params.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Parameters</h2>
              <div className="space-y-4">
                {method.params.map((param, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-800 pb-4"
                  >
                    {'name' in param && (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {param.name}
                          </span>
                          {param.required && (
                            <span className="text-xs text-red-500">
                              Required
                            </span>
                          )}
                          {'schema' in param && (
                            <span className="text-xs text-gray-500">
                              {typeof param.schema === 'object'
                                ? param.schema.type || 'object'
                                : 'any'}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {param.description}
                        </div>
                        {'schema' in param &&
                          param.schema &&
                          typeof param.schema === 'object' &&
                          'examples' in param.schema && (
                            <div className="mt-2">
                              <span className="text-sm text-gray-500">
                                Example:{' '}
                              </span>
                              <SyntaxHighlighter
                                language="json"
                                style={coldarkCold}
                                customStyle={{
                                  display: 'inline',
                                  padding: '0.2em 0.4em',
                                  margin: 0,
                                  backgroundColor: 'var(--tw-prose-pre-bg)',
                                  borderRadius: '0.375rem',
                                }}
                              >
                                {JSON.stringify(param.schema.examples?.[0])}
                              </SyntaxHighlighter>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Section */}
          {method.result && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Result</h2>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {method.result.name}
                  </span>
                  {'schema' in method.result && (
                    <span className="text-xs text-gray-500">
                      {typeof method.result.schema === 'object'
                        ? method.result.schema.type || 'object'
                        : 'any'}
                    </span>
                  )}
                </div>
                {'schema' in method.result &&
                  method.result.schema &&
                  typeof method.result.schema === 'object' &&
                  'examples' in method.result.schema && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Example: </span>
                      <SyntaxHighlighter
                        language="json"
                        style={coldarkCold}
                        customStyle={{
                          display: 'inline',
                          padding: '0.2em 0.4em',
                          margin: 0,
                          backgroundColor: 'var(--tw-prose-pre-bg)',
                          borderRadius: '0.375rem',
                        }}
                      >
                        {JSON.stringify(method.result.schema.examples?.[0])}
                      </SyntaxHighlighter>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Errors Section */}
          {method.errors && method.errors.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Errors</h3>
              <div className="space-y-4">
                {method.errors.map((error, index) => (
                  <div
                    key={index}
                    className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">
                        {error.code}
                      </span>
                      <span className="text-sm text-red-600 dark:text-red-300">
                        {error.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Examples */}
        <div className="lg:w-[45%] space-y-6">
          <div className="sticky top-4">
            {/* Example Request */}
            <div className="mb-8">
              <div className="rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <span className="text-sm text-gray-400">
                    JSON-RPC Request
                  </span>
                </div>
                <SyntaxHighlighter
                  language="json"
                  style={coldarkDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0 0 0.5rem 0.5rem',
                  }}
                >
                  {JSON.stringify(requestExample, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Example Response with Tabs */}
            {(method.examples?.[0]?.result || method.errors?.length > 0) && (
              <div className="rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  {/* Tabs */}
                  <div className="flex">
                    <button
                      className={`px-4 py-2 text-sm transition-colors ${
                        activeTab === 'success'
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
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
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={() => setActiveTab('error')}
                      disabled={!method.errors?.length}
                    >
                      Error
                    </button>
                  </div>
                </div>

                {/* Response Content */}
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
                      backgroundColor: 'rgb(254 242 242)', // Light red background
                    }}
                  >
                    {JSON.stringify(responseExample.error, null, 2)}
                  </SyntaxHighlighter>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodDetail;
