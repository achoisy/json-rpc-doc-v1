import { validateOpenRPCDocument } from '@open-rpc/schema-utils-js';
import type {
  MethodObject,
  ContentDescriptorOrReference,
  ContentDescriptorObject,
  JSONSchema,
  ReferenceObject,
} from '@open-rpc/meta-schema';
import { OpenRPCStorage, OpenrpcDocument } from '../types';

export interface SearchableMethod {
  name: string;
  description: string;
  path: string;
}

/**
 * Service for handling OpenRPC document operations.
 */
export class OpenRPCService {
  private storage: OpenRPCStorage;
  private resolvedRefs: Map<string, JSONSchema> = new Map();

  constructor(document: OpenrpcDocument) {
    const valideOpenrpcDocument = validateOpenRPCDocument(document);

    if (valideOpenrpcDocument !== true) {
      throw new Error('Invalid OpenRPC document');
    }

    this.storage = {
      document,
      methods: document.methods.filter(
        (method): method is MethodObject =>
          typeof method === 'object' && 'name' in method && 'params' in method
      ),
    };
  }

  /**
   * Retrieves the full OpenRPC document.
   *
   * @returns {OpenrpcDocument} The OpenRPC document.
   */
  public getDocument(): OpenrpcDocument {
    return this.storage.document;
  }

  /**
   * Retrieves the available JSON-RPC methods from the document.
   *
   * @returns {OpenrpcDocument['methods']} List of JSON-RPC methods.
   */
  public getMethods(): MethodObject[] {
    return this.storage.methods;
  }

  /**
   * Resolves a reference object to its actual content.
   *
   * @param ref - The reference object or reference string to resolve
   * @returns The resolved schema
   * @throws Error if reference cannot be resolved
   */
  public resolveReference(ref: ReferenceObject | string): JSONSchema {
    const refString = typeof ref === 'string' ? ref : ref.$ref;

    // Check cache first
    const cached = this.resolvedRefs.get(refString);
    if (cached) return cached;

    // Parse the reference path
    // Example: "#/components/schemas/MySchema"
    const parts = refString.split('/').slice(1);

    let current: any = this.storage.document;
    for (const part of parts) {
      if (!(part in current)) {
        throw new Error(`Cannot resolve reference: ${refString}`);
      }
      current = current[part];
    }

    // Cache the result
    this.resolvedRefs.set(refString, current);
    return current;
  }

  /**
   * Resolves a content descriptor or reference to its actual content.
   *
   * @param contentOrRef - The content descriptor or reference to resolve
   * @returns The resolved content descriptor
   * @throws Error if reference cannot be resolved
   */
  public resolveContentDescriptor(
    contentOrRef: ContentDescriptorOrReference
  ): ContentDescriptorObject {
    if (!('$ref' in contentOrRef)) {
      return contentOrRef;
    }

    const resolved = this.resolveReference(contentOrRef.$ref);
    if (!this.isContentDescriptor(resolved)) {
      throw new Error(
        `Reference does not resolve to a ContentDescriptor: ${contentOrRef.$ref}`
      );
    }

    return resolved;
  }

  /**
   * Returns formatted method data suitable for search functionality.
   *
   * @returns {SearchableMethod[]} Array of searchable method data
   */
  public getSearchableMethodData(): SearchableMethod[] {
    return this.storage.methods.map(method => ({
      name: method.name,
      description: method.summary || '',
      path: `/methods/${method.name}`,
    }));
  }

  /**
   * Type guard to check if a value is a ContentDescriptorObject
   */
  private isContentDescriptor(
    value: unknown
  ): value is ContentDescriptorObject {
    return (
      typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      'schema' in value
    );
  }
}
