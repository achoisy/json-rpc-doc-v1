import React from 'react';
import type {
  MethodObject,
  ContentDescriptorOrReference,
  JSONSchema,
  JSONSchemaObject,
  OpenRPCService,
  ExamplePairingObject,
  ExampleObject,
} from '@rpcdoc/shared';

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CodeExample } from '../code/CodeExample';

type TabType = 'schema' | 'example';

interface ParameterTabsProps {
  name: string;
  schema: JSONSchema;
  service: OpenRPCService;
  examples?: MethodObject['examples'];
}

const resolveSchemaWithReferences = (
  schema: JSONSchema,
  service: OpenRPCService,
  visited = new Set<string>()
): JSONSchema => {
  if (typeof schema !== 'object' || schema === null) {
    return schema;
  }

  const schemaObj = schema as JSONSchemaObject;

  if (schemaObj.$ref) {
    if (visited.has(schemaObj.$ref)) {
      return { $ref: schemaObj.$ref, circular: true };
    }
    visited.add(schemaObj.$ref);
    try {
      const resolved = service.resolveReference(schemaObj.$ref);
      const resolvedSchema = resolveSchemaWithReferences(
        resolved,
        service,
        visited
      );
      return Object.assign({}, resolvedSchema, { originalRef: schemaObj.$ref });
    } catch (error) {
      return { $ref: schemaObj.$ref, error: 'Failed to resolve reference' };
    }
  }

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(schemaObj)) {
    if (key === 'properties' && typeof value === 'object') {
      result.properties = {};
      for (const [propKey, propValue] of Object.entries(value)) {
        (result.properties as Record<string, unknown>)[propKey] =
          resolveSchemaWithReferences(
            propValue as JSONSchema,
            service,
            new Set(visited)
          );
      }
    } else if (key === 'items' && value) {
      result.items = resolveSchemaWithReferences(
        value as JSONSchema,
        service,
        new Set(visited)
      );
    } else if (key === 'additionalProperties' && typeof value === 'object') {
      result.additionalProperties = resolveSchemaWithReferences(
        value as JSONSchema,
        service,
        new Set(visited)
      );
    } else {
      result[key] = value;
    }
  }

  return result as JSONSchema;
};

const ParameterTabs: React.FC<ParameterTabsProps> = ({
  name,
  schema,
  service,
  examples,
}) => {
  const [activeTab, setActiveTab] = React.useState<TabType>('schema');

  const resolvedSchema = React.useMemo(
    () => resolveSchemaWithReferences(schema, service),
    [schema, service]
  );

  const firstExample = examples?.[0];
  let params: ExampleObject[] | undefined;

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

    params = resolvedExample.params
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
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        {params && params.length > 0 && (
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
        )}
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
        {activeTab === 'schema' ? (
          <div className="relative">
            {typeof schema === 'object' && (
              <div className="w-full overflow-x-auto">
                <CodeExample value={resolvedSchema} />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <CodeExample value={params?.[0].value[name]} />
          </div>
        )}
      </div>
    </div>
  );
};

interface ParametersSectionProps {
  params?: MethodObject['params'];
  service: OpenRPCService;
  examples?: MethodObject['examples'];
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
  examples,
}) => {
  const [expandedParams, setExpandedParams] = React.useState<
    Record<string, boolean>
  >({});

  if (!params?.length) return null;

  const toggleParamExpand = (paramName: string) => {
    setExpandedParams(prev => ({
      ...prev,
      [paramName]: !prev[paramName],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Parameters</h2>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        {params.map((paramRef: ContentDescriptorOrReference, index) => {
          let param;
          try {
            param = service.resolveContentDescriptor(paramRef);
          } catch (error) {
            return (
              <div key={index} className="text-red-500 p-4">
                Error resolving parameter:{' '}
                {'$ref' in paramRef ? paramRef.$ref : 'unknown reference'}
              </div>
            );
          }

          const isParamExpanded = expandedParams[param.name] || false;

          return (
            <div key={index} className="group">
              <button
                onClick={() => toggleParamExpand(param.name)}
                className="flex items-center gap-4 w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {isParamExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                )}
                <span className="font-mono text-gray-600 dark:text-gray-300">
                  {param.name}
                </span>
                <span className="text-gray-400">
                  {param.schema &&
                  typeof param.schema === 'object' &&
                  'type' in param.schema
                    ? param.schema.type
                    : 'any'}
                </span>
                {param.required && (
                  <span className="text-xs text-blue-500">read-only</span>
                )}
              </button>

              {isParamExpanded && (
                <div className="px-4 pb-4 space-y-4">
                  {param.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm ml-8">
                      {param.description}
                    </p>
                  )}

                  {param.schema && (
                    <div className="ml-8">
                      <ParameterTabs
                        name={param.name}
                        schema={param.schema}
                        service={service}
                        examples={examples}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
