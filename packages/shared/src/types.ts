import type { OpenrpcDocument, MethodObject } from '@open-rpc/meta-schema';

export type { OpenrpcDocument, MethodObject };

export interface OpenrpcDocumentCustom extends OpenrpcDocument {
  'x-uuid': string;
}

export interface OpenRPCStorage {
  document: OpenrpcDocumentCustom;
  methods: MethodObject[];
}
