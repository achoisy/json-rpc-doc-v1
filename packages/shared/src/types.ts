import type { OpenrpcDocument, MethodObject } from '@open-rpc/meta-schema';

export type { OpenrpcDocument, MethodObject };

export interface OpenRPCStorage {
  document: OpenrpcDocument;
  methods: MethodObject[];
}
