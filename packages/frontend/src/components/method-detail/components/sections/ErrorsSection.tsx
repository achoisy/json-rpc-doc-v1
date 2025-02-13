import React from 'react';
import type { MethodObject, ErrorObject, OpenRPCService } from '@rpcdoc/shared';
import { CodeExample } from '../code/CodeExample';

interface ErrorsSectionProps {
  errors?: MethodObject['errors'];
  service: OpenRPCService;
}

export const ErrorsSection: React.FC<ErrorsSectionProps> = ({
  errors,
  service,
}) => {
  if (!errors?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Errors</h2>
      <div className="space-y-4">
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
              <div key={index} className="text-red-500">
                Error resolving error reference:{' '}
                {'$ref' in errorRef ? errorRef.$ref : 'unknown reference'}
              </div>
            );
          }

          return (
            <div
              key={index}
              className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error.code}
                </span>
                <span className="text-sm text-red-700 dark:text-red-300">
                  {error.message}
                </span>
              </div>
              {error.data && (
                <div className="mt-2">
                  <CodeExample value={error.data} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
