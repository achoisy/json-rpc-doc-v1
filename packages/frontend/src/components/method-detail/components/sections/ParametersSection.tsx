import React from 'react';
import type { MethodObject, ParameterOrReference } from '@rpcdoc/shared';
import { CodeExample } from '../code/CodeExample';

interface ParametersSectionProps {
  params?: MethodObject['params'];
}

export const ParametersSection: React.FC<ParametersSectionProps> = ({
  params,
}) => {
  if (!params?.length) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Parameters</h2>
      <div className="space-y-4">
        {params.map((paramRef: ParameterOrReference, index) => {
          if (!('name' in paramRef)) return null;

          const param = paramRef;
          return (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-800 pb-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {param.name}
                </span>
                {param.required && (
                  <span className="text-xs text-red-500">Required</span>
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
                  <CodeExample value={param.schema.examples?.[0]} />
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
