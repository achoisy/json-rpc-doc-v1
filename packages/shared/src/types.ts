import type {
  OpenrpcDocument,
  MethodObject,
  ContentDescriptorOrReference,
} from '@open-rpc/meta-schema';

export type { OpenrpcDocument, MethodObject, ContentDescriptorOrReference };

export interface OpenRPCStorage {
  document: OpenrpcDocument;
  methods: MethodObject[];
}
