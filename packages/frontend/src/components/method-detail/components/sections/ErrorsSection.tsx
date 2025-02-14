import React, { useState, useEffect } from 'react';
import type { MethodObject, ErrorObject, OpenRPCService } from '@rpcdoc/shared';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CodeExample } from '../code/CodeExample';
interface ErrorTabsProps {
  error: ErrorObject;
}

const ErrorTabs: React.FC<ErrorTabsProps> = ({ error }) => {
  const [activeTab, setActiveTab] = useState<'message' | 'data'>('message');

  const hasData = !!error.data;

  useEffect(() => {
    if (!hasData) {
      setActiveTab('message');
    }
  }, [hasData]);

  return (
    <div className="space-y-2">
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('message')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === 'message'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Message
        </button>
        {hasData && (
          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'data'
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Data
          </button>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        {activeTab === 'message' ? (
          <div className="text-gray-700 dark:text-gray-300 break-words">
            <CodeExample value={error.message} />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <CodeExample value={error.data} />
          </div>
        )}
      </div>
    </div>
  );
};

interface ErrorsSectionProps {
  errors?: MethodObject['errors'];
  service: OpenRPCService;
}

export const ErrorsSection: React.FC<ErrorsSectionProps> = ({
  errors,
  service,
}) => {
  const [expandedErrors, setExpandedErrors] = React.useState<
    Record<string, boolean>
  >({});

  if (!errors?.length) return null;

  const toggleErrorExpand = (errorCode: number) => {
    setExpandedErrors(prev => ({
      ...prev,
      [errorCode]: !prev[errorCode],
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Errors</h2>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        {errors.map((errorRef, index) => {
          let error: ErrorObject;
          try {
            if ('$ref' in errorRef) {
              error = service.resolveReference(errorRef.$ref) as ErrorObject;
            } else {
              error = errorRef as ErrorObject;
            }
          } catch (e) {
            return (
              <div key={index} className="text-red-500 p-4">
                Error resolving error reference:{' '}
                {'$ref' in errorRef ? errorRef.$ref : 'unknown reference'}
              </div>
            );
          }

          const isErrorExpanded = expandedErrors[error.code] || false;

          return (
            <div key={index} className="group">
              <button
                onClick={() => toggleErrorExpand(error.code)}
                className="flex items-center gap-4 w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {isErrorExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                )}
                <span className="font-mono text-gray-600 dark:text-gray-300">
                  {error.code}
                </span>
                <span className="text-red-500 text-sm">Error</span>
              </button>

              {isErrorExpanded && (
                <div className="px-4 pb-4 ml-8">
                  <ErrorTabs error={error} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
