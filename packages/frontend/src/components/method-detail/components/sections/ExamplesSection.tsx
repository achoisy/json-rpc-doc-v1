import React from 'react';
import type {
  MethodObject,
  OpenRPCService,
  ExamplePairingObject,
  ExampleObject,
  ErrorObject,
} from '@rpcdoc/shared';
import { SyntaxHighlighter } from '../code/SyntaxHighlighter';
import { ResponseTabs } from '../tabs/ResponseTabs';

interface ExamplesSectionProps {
  examples?: MethodObject['examples'];
  service: OpenRPCService;
  errors?: MethodObject['errors'];
}

const isExampleObject = (obj: any): obj is ExampleObject => {
  return obj && typeof obj === 'object' && 'value' in obj;
};

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  examples,
  service,
  errors,
}) => {
  const firstExample = examples?.[0];
  if (!firstExample) return null;

  let resolvedExample: ExamplePairingObject;
  try {
    resolvedExample =
      '$ref' in firstExample
        ? (service.resolveReference(firstExample.$ref) as ExamplePairingObject)
        : firstExample;
  } catch (error) {
    return (
      <div className="text-red-500">
        Error resolving example:{' '}
        {'$ref' in firstExample ? firstExample.$ref : 'unknown reference'}
      </div>
    );
  }

  // Resolve error example
  let resolvedError: ErrorObject | undefined;
  if (errors?.length) {
    try {
      const firstError = errors[0];
      if ('$ref' in firstError) {
        resolvedError = service.resolveReference(
          firstError.$ref
        ) as ErrorObject;
      } else {
        resolvedError = firstError;
      }
    } catch (error) {
      console.error('Error resolving error example:', error);
    }
  }

  const params = resolvedExample.params
    ?.map(param => {
      if ('$ref' in param) {
        try {
          return service.resolveReference(param.$ref) as ExampleObject;
        } catch {
          return undefined;
        }
      }
      return param;
    })
    .filter(isExampleObject);

  const requestExample = {
    jsonrpc: '2.0',
    method: resolvedExample.name || 'method',
    params: params?.[0]?.value || [],
    id: 1,
  };

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">Examples</h2>

      {/* Example Request */}
      <div>
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
      {(resolvedExample.result || resolvedError) && (
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              JSON-RPC Response
            </span>
          </div>
          <ResponseTabs example={resolvedExample} error={resolvedError} />
        </div>
      )}
    </div>
  );
};
