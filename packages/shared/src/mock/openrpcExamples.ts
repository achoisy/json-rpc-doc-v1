import { OpenrpcDocumentCustom } from '../types';

export const sampleOpenrpcDocument: OpenrpcDocumentCustom = {
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
