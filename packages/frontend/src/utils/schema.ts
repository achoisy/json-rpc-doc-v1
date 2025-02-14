import type {
  JSONSchema,
  JSONSchemaObject,
  OpenRPCService,
} from '@rpcdoc/shared';

export const resolveSchemaWithReferences = (
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
