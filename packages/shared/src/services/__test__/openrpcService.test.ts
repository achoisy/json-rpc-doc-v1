import { OpenRPCService } from '../openrpcService';
import type { OpenrpcDocumentCustom } from '../../types';

const sampleOpenrpcDocument: OpenrpcDocumentCustom = {
  openrpc: '1.2.6',
  'x-uuid': '123e4567-e89b-12d3-a456-426614174000',
  info: {
    title: 'Sample JSON-RPC API',
    version: '1.0.0',
    description: 'A sample JSON-RPC API documentation using OpenRPC.',
  },
  methods: [
    {
      name: 'add',
      summary: 'Addition method',
      description: 'Adds two numbers and returns the sum.',
      params: [
        {
          name: 'a',
          schema: {
            type: 'number',
          },
          required: true,
        },
        {
          name: 'b',
          schema: {
            type: 'number',
          },
          required: true,
        },
      ],
      result: {
        name: 'sum',
        schema: {
          type: 'number',
        },
      },
    },
  ],
};

describe('OpenRPCService', () => {
  it('returns the provided valid document', () => {
    const service = new OpenRPCService(sampleOpenrpcDocument);
    const document = service.getDocument();
    expect(document).toHaveProperty('openrpc', '1.2.6');
    expect(document).toHaveProperty('x-uuid', sampleOpenrpcDocument['x-uuid']);
  });

  it('returns a non-empty list of methods', () => {
    const service = new OpenRPCService(sampleOpenrpcDocument);
    const methods = service.getMethods();
    expect(Array.isArray(methods)).toBe(true);
    expect(methods.length).toBeGreaterThan(0);
  });

  it('throws an error for an invalid document', () => {
    expect(() => {
      new OpenRPCService({} as OpenrpcDocumentCustom);
    }).toThrow('Invalid OpenRPC document');
  });
});
