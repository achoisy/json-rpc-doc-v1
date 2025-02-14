import React from 'react';
import type {
  MethodObject,
  OpenRPCService,
  ExamplePairingObject,
  ExampleObject,
  JSONSchema,
} from '@rpcdoc/shared';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CodeExample } from '../code/CodeExample';

import { resolveSchemaWithReferences } from '../../../../utils/schema';

type TabType = 'schema' | 'example';

interface ResultTabsProps {
  name: string;
  schema: JSONSchema;
  service: OpenRPCService;
  examples?: MethodObject['examples'];
}

const ResultTabs: React.FC<ResultTabsProps> = ({
  name,
  schema,
  service,
  examples,
}) => {
  const [activeTab, setActiveTab] = React.useState<TabType>('schema');

  const firstExample = examples?.[0];
  let result: ExampleObject | undefined;

  const resolvedSchema = React.useMemo(
    () => resolveSchemaWithReferences(schema, service),
    [schema, service]
  );

  React.useEffect(() => {
    if (firstExample) {
      setActiveTab('example');
    }
  }, [firstExample]);

  if (firstExample) {
    let resolvedExample: ExamplePairingObject;
    try {
      resolvedExample =
        '$ref' in firstExample
          ? (service.resolveReference(
              firstExample.$ref
            ) as ExamplePairingObject)
          : firstExample;
    } catch (error) {
      return (
        <div className="text-red-500">
          Error resolving example:{' '}
          {'$ref' in firstExample ? firstExample.$ref : 'unknown reference'}
        </div>
      );
    }

    const isExampleObject = (obj: any): obj is ExampleObject => {
      return obj && typeof obj === 'object' && 'value' in obj;
    };

    if (resolvedExample.result) {
      if ('$ref' in resolvedExample.result) {
        try {
          const resolved = service.resolveReference(
            resolvedExample.result.$ref
          );
          if (isExampleObject(resolved)) {
            result = resolved;
          }
        } catch {
          result = undefined;
        }
      } else if (isExampleObject(resolvedExample.result)) {
        result = resolvedExample.result;
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('example')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === 'example'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Example
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === 'schema'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Schema
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        {activeTab === 'example' ? (
          <div className="w-full overflow-x-auto">
            {result ? (
              <CodeExample value={result.value[name]} />
            ) : (
              <div className="text-gray-500 italic">No example available</div>
            )}
          </div>
        ) : (
          <div className="relative">
            {typeof schema === 'object' && (
              <div className="w-full overflow-x-auto">
                <CodeExample value={resolvedSchema} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface ResultSectionProps {
  result?: MethodObject['result'];
  service: OpenRPCService;
  examples?: MethodObject['examples'];
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  service,
  examples,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!result) return null;

  let resolvedResult;
  try {
    resolvedResult = service.resolveContentDescriptor(result);
  } catch (error) {
    return (
      <div className="text-red-500">
        Error resolving result:{' '}
        {'$ref' in result ? result.$ref : 'unknown reference'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Result</h2>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="group">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-4 w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            )}
            <span className="font-mono text-gray-600 dark:text-gray-300">
              {resolvedResult.name}
            </span>
            <span className="text-gray-400">
              {resolvedResult.schema &&
              typeof resolvedResult.schema === 'object' &&
              'type' in resolvedResult.schema
                ? resolvedResult.schema.type
                : 'any'}
            </span>
          </button>

          {isExpanded && (
            <div className="px-4 pb-4 space-y-4">
              {resolvedResult.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm ml-8">
                  {resolvedResult.description}
                </p>
              )}

              {resolvedResult.schema && (
                <div className="ml-8">
                  <ResultTabs
                    name={resolvedResult.name}
                    schema={resolvedResult.schema}
                    service={service}
                    examples={examples}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
