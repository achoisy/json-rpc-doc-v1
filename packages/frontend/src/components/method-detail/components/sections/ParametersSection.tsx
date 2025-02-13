import React from 'react';
import type {
  MethodObject,
  ContentDescriptorOrReference,
  JSONSchema,
  JSONSchemaObject,
  OpenRPCService,
} from '@rpcdoc/shared';
import { CodeExample } from '../code/CodeExample';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ParametersSectionProps {
  params?: MethodObject['params'];
  service: OpenRPCService;
}

interface SchemaViewerProps {
  schema: JSONSchema;
  service: OpenRPCService;
  level?: number;
  isExpanded?: boolean;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({
  schema,
  service,
  level = 0,
  isExpanded = false,
}) => {
  const [expanded, setExpanded] = React.useState(isExpanded);

  if (typeof schema === 'boolean') {
    return <span className="text-gray-500">{schema ? 'any' : 'never'}</span>;
  }

  const schemaObj = schema as JSONSchemaObject;

  const renderType = () => {
    if (schemaObj.$ref) {
      try {
        const resolved = service.resolveReference(schemaObj.$ref);
        return (
          <SchemaViewer schema={resolved} service={service} level={level} />
        );
      } catch (error) {
        return (
          <span className="text-red-500">
            Error resolving reference: {schemaObj.$ref}
          </span>
        );
      }
    }

    if (schemaObj.enum) {
      return (
        <span className="text-purple-500">
          enum({schemaObj.enum.join(' | ')})
        </span>
      );
    }

    if (schemaObj.type === 'array' && schemaObj.items) {
      return (
        <span>
          array&lt;
          <SchemaViewer
            schema={schemaObj.items}
            service={service}
            level={level + 1}
          />
          &gt;
        </span>
      );
    }

    if (schemaObj.type === 'object' && schemaObj.properties) {
      const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon;
      return (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 hover:text-blue-500"
          >
            <ChevronIcon className="w-4 h-4" />
            <span>object</span>
          </button>
          {expanded && (
            <div className="ml-4 mt-2 space-y-2">
              {Object.entries(schemaObj.properties).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    {key}
                  </span>
                  {schemaObj.required?.includes(key) && (
                    <span className="text-xs text-red-500">required</span>
                  )}
                  <span className="text-gray-500">:</span>
                  <SchemaViewer
                    schema={value}
                    service={service}
                    level={level + 1}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <span className="text-green-500">{schemaObj.type || 'any'}</span>;
  };

  return (
    <div className="space-y-1">
      {renderType()}
      {schemaObj.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {schemaObj.description}
        </p>
      )}
      {schemaObj.format && (
        <p className="text-xs text-gray-500">format: {schemaObj.format}</p>
      )}
      {(schemaObj.minimum !== undefined || schemaObj.maximum !== undefined) && (
        <p className="text-xs text-gray-500">
          range: {schemaObj.minimum ?? '-∞'} to {schemaObj.maximum ?? '∞'}
        </p>
      )}
      {schemaObj.pattern && (
        <p className="text-xs text-gray-500">pattern: {schemaObj.pattern}</p>
      )}
    </div>
  );
};

export const ParametersSection: React.FC<ParametersSectionProps> = ({
  params,
  service,
}) => {
  if (!params?.length) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">Parameters</h2>
      <div className="space-y-6">
        {params.map((paramRef: ContentDescriptorOrReference, index) => {
          let param;
          try {
            param = service.resolveContentDescriptor(paramRef);
          } catch (error) {
            return (
              <div key={index} className="text-red-500">
                Error resolving parameter:{' '}
                {'$ref' in paramRef ? paramRef.$ref : 'unknown reference'}
              </div>
            );
          }

          return (
            <div
              key={index}
              className="border dark:border-gray-800 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {param.name}
                </span>
                {param.required && (
                  <span className="px-2 py-1 text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 rounded">
                    Required
                  </span>
                )}
                {param.deprecated && (
                  <span className="px-2 py-1 text-xs font-medium text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    Deprecated
                  </span>
                )}
              </div>

              {param.description && (
                <p className="text-gray-600 dark:text-gray-300">
                  {param.description}
                </p>
              )}

              {param.schema && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Schema
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3">
                    <SchemaViewer schema={param.schema} service={service} />
                  </div>
                </div>
              )}

              {typeof param.schema === 'object' &&
                param.schema &&
                'examples' in param.schema && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Examples
                    </h4>
                    <div className="space-y-2">
                      {param.schema.examples?.map((example, i) => (
                        <CodeExample key={i} value={example} />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
