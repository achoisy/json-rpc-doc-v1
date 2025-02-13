import React from 'react';
import type { MethodObject, OpenRPCService } from '@rpcdoc/shared';
import { CodeExample } from '../code/CodeExample';
import { SchemaViewer } from './ParametersSection';

interface ResultSectionProps {
  result?: MethodObject['result'];
  service: OpenRPCService;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  service,
}) => {
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
      <h2 className="text-lg font-semibold">Result</h2>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {resolvedResult.name}
          </span>
          {resolvedResult.description && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {resolvedResult.description}
            </span>
          )}
        </div>

        {resolvedResult.schema && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Schema
            </h4>
            <div className="bg-gray-100 dark:bg-gray-900/50 rounded p-3">
              <SchemaViewer schema={resolvedResult.schema} service={service} />
            </div>
          </div>
        )}

        {typeof resolvedResult.schema === 'object' &&
          resolvedResult.schema &&
          'examples' in resolvedResult.schema && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Examples
              </h4>
              <div className="space-y-2">
                {resolvedResult.schema.examples?.map((example, i) => (
                  <CodeExample key={i} value={example} />
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
