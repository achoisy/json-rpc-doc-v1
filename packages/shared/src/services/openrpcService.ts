import { validateOpenRPCDocument } from '@open-rpc/schema-utils-js';
import type { MethodObject } from '@open-rpc/meta-schema';
import { OpenRPCStorage, OpenrpcDocument } from '../types';

/**
 * Service for handling OpenRPC document operations.
 */
export class OpenRPCService {
  private storage: OpenRPCStorage;

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
}
