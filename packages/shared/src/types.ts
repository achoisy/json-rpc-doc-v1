import type {
  OpenrpcDocument,
  MethodObject,
  ContentDescriptorOrReference,
  JSONSchema,
  JSONSchemaObject,
  ErrorObject,
  ExamplePairingObject,
  ExampleObject,
} from '@open-rpc/meta-schema';

export type {
  OpenrpcDocument,
  MethodObject,
  ContentDescriptorOrReference,
  JSONSchema,
  JSONSchemaObject,
  ErrorObject,
  ExamplePairingObject,
  ExampleObject,
};

export interface OpenRPCStorage {
  document: OpenrpcDocument;
  methods: MethodObject[];
}
