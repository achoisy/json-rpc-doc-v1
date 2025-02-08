import { validateOpenRPCDocument } from '@open-rpc/schema-utils-js';
import type { MethodObject } from '@open-rpc/meta-schema';
import { OpenRPCStorage, OpenrpcDocumentCustom } from '../types';

/**
 * Service for handling OpenRPC document operations.
 */
export class OpenRPCService {
  private storage: OpenRPCStorage;

  constructor(document: OpenrpcDocumentCustom) {
    const validatedDocument = validateOpenRPCDocument(document);

    if (!validatedDocument) {
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
  public getDocument(): OpenrpcDocumentCustom {
    return this.storage.document;
  }

  /**
   * Retrieves the available JSON-RPC methods from the document.
   *
   * @returns {OpenrpcDocument['methods']} List of JSON-RPC methods.
   */
  public getMethods(): OpenrpcDocumentCustom['methods'] {
    return this.storage.methods;
  }
}
