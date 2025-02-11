import type { OpenrpcDocument } from '../types';

export const sampleOpenrpcDocument: OpenrpcDocument = {
  openrpc: '1.2.4',
  info: {
    title: 'Ethereum JSON-RPC API',
    version: '1.0.0',
    description:
      'Ethereum-inspired JSON-RPC API with hierarchical method structure',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      name: 'Mainnet',
      url: 'https://mainnet.example.com/rpc',
      summary: 'Production Ethereum network',
    },
    {
      name: 'Testnet',
      url: 'https://testnet.example.com/rpc',
      summary: 'Test network (Görli)',
    },
  ],
  methods: [
    {
      name: 'eth/blockNumber',
      summary: 'Returns the current block number',
      description: 'Returns the number of most recent block',
      tags: [{ name: 'eth' }],
      params: [],
      result: {
        name: 'blockNumber',
        schema: {
          type: 'string',
          pattern: '^0x[0-9a-fA-F]+$',
          examples: ['0x5bad55'],
        },
      },
      errors: [{ $ref: '#/components/errors/InvalidParams' }],
      examples: [
        {
          name: 'current_block',
          params: [],
          result: {
            name: 'current_block',
            description: 'Current block number',
            value: '0x5bad55',
          },
        },
      ],
    },
    {
      name: 'eth/getBlockByNumber',
      summary: 'Returns block information by block number',
      tags: [{ name: 'eth' }],
      params: [
        {
          name: 'blockNumber',
          description: 'Hex block number, or "latest"',
          schema: {
            oneOf: [
              { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
              { enum: ['latest', 'earliest', 'pending'] },
            ],
          },
        },
        {
          name: 'includeFullTransactions',
          schema: { type: 'boolean' },
        },
      ],
      result: {
        $ref: '#/components/schemas/Block',
      },
      errors: [{ code: -32602, message: 'Invalid block number format' }],
      examples: [
        {
          name: 'get_block_example',
          params: [
            { name: 'blockNumber', value: 'latest' },
            { name: 'includeFullTransactions', value: false },
          ],
          result: {
            name: 'get_block_example',
            value: {
              number: '0x5bad55',
              transactions: [],
              timestamp: '0x5f5e0a6a',
            },
          },
        },
        {
          name: 'get_block_example',
          params: [
            { name: 'blockNumber', value: 'latest' },
            { name: 'includeFullTransactions', value: false },
          ],
          result: {
            name: 'get_block_example',
            value: {
              number: '0x5bad55',
              transactions: [],
              timestamp: '0x5f5e0a6a',
            },
          },
        },
      ],
    },
    {
      name: 'net/version',
      summary: 'Returns network ID',
      tags: [{ name: 'net' }],
      params: [],
      result: {
        name: 'network_id',
        schema: { type: 'string' },
      },
      errors: [{ $ref: '#/components/errors/InternalError' }],
      examples: [
        {
          name: 'network_version_example',
          params: [],
          result: {
            name: 'network_id',
            value: '1',
          },
        },
      ],
    },
    {
      name: 'debug/getRawTransaction',
      summary: 'Debug method to get raw transaction data',
      tags: [{ name: 'debug' }],
      params: [
        {
          name: 'txHash',
          schema: {
            type: 'string',
            pattern: '^0x[0-9a-fA-F]{64}$',
          },
        },
      ],
      result: {
        $ref: '#/components/schemas/RawTransaction',
      },
      errors: [{ code: -32602, message: 'invalid tx hash' }],
      examples: [
        {
          name: 'debug_raw_tx_example',
          params: [
            {
              name: 'txHash',
              value:
                '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
            },
          ],
          result: {
            name: 'debug_getRawTransaction',
            value: {
              input: '0xabcdef',
              r: '0x1111',
              s: '0x2222',
              v: '0x1',
            },
          },
        },
      ],
    },
    {
      name: 'txpool/content',
      summary: 'Returns transactions in the mempool',
      tags: [{ name: 'txpool' }],
      params: [],
      result: {
        name: 'txpool_content',
        schema: {
          type: 'object',
          properties: {
            pending: {
              $ref: '#/components/schemas/TransactionMap',
            },
            queued: {
              $ref: '#/components/schemas/TransactionMap',
            },
          },
        },
      },
      errors: [{ $ref: '#/components/errors/InternalError' }],
      examples: [
        {
          name: 'txpool_content_example',
          params: [],
          result: {
            name: 'txpool_content',
            value: {
              pending: {
                '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae': [
                  {
                    hash: '0x123',
                    from: '0xabc',
                    to: '0xdef',
                    value: '0x456',
                  },
                ],
              },
              queued: {
                '0xde0b295669a9fd93d5f28d9ec85e40f4cb697ba1': [
                  {
                    hash: '0x789',
                    from: '0xdef',
                    to: '0xghi',
                    value: '0x101',
                  },
                ],
              },
            },
          },
        },
      ],
    },
    {
      name: 'eth/getBalance',
      summary: 'Returns balance of given address',
      description: 'Returns the account balance in wei as hex string',
      tags: [{ name: 'eth' }],
      params: [
        {
          name: 'address',
          schema: {
            type: 'string',
            pattern: '^0x[0-9a-fA-F]{40}$',
            examples: ['0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'],
          },
        },
        {
          name: 'block',
          schema: {
            oneOf: [
              { type: 'string', pattern: '^0x[0-9a-fA-F]+$' },
              { enum: ['latest', 'earliest', 'pending'] },
            ],
          },
        },
      ],
      result: {
        name: 'balance',
        schema: {
          type: 'string',
          pattern: '^0x[0-9a-fA-F]+$',
          examples: ['0x16345785d8a0000'],
        },
      },
      errors: [
        { $ref: '#/components/errors/InvalidParams' },
        { code: -32001, message: 'Address not found' },
      ],
      examples: [
        {
          name: 'mainnet_balance',
          params: [
            {
              name: 'address',
              value: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
            },
            { name: 'block', value: 'latest' },
          ],
          result: {
            name: 'mainnet_balance',
            value: '0x16345785d8a0000',
          },
        },
      ],
    },
    {
      name: 'eth/getLogs',
      summary: 'Returns logs matching filter criteria',
      tags: [{ name: 'eth' }],
      params: [
        {
          name: 'filter',
          schema: { $ref: '#/components/schemas/LogFilter' },
        },
      ],
      result: {
        name: 'logs',
        schema: {
          type: 'array',
          items: { $ref: '#/components/schemas/Log' },
        },
      },
      errors: [
        { code: -32600, message: 'Invalid filter parameters' },
        { code: -32005, message: 'Query timeout' },
      ],
      examples: [
        {
          name: 'get_logs_example',
          params: [
            {
              name: 'filter',
              value: {
                fromBlock: '0x1',
                toBlock: '0x2',
                address: '0x1234567890abcdef1234567890abcdef12345678',
                topics: ['0xdeadbeef'],
              },
            },
          ],
          result: {
            name: 'logs',
            value: [
              {
                address: '0x1234567890abcdef1234567890abcdef12345678',
                topics: ['0xdeadbeef'],
                data: '0xdata',
                blockNumber: '0x10',
              },
            ],
          },
        },
      ],
    },
  ],
  components: {
    schemas: {
      Block: {
        type: 'object',
        properties: {
          number: { type: 'string', description: 'Block number in hex' },
          hash: { type: 'string' },
          parentHash: { type: 'string' },
          transactions: {
            type: 'array',
            items: { $ref: '#/components/schemas/Transaction' },
          },
          timestamp: { type: 'string' },
        },
        required: ['number', 'hash', 'parentHash'],
      },
      Transaction: {
        type: 'object',
        properties: {
          hash: { type: 'string' },
          from: { type: 'string' },
          to: { type: 'string' },
          value: { type: 'string' },
        },
        required: ['hash', 'from'],
      },
      RawTransaction: {
        type: 'object',
        properties: {
          input: { type: 'string' },
          r: { type: 'string' },
          s: { type: 'string' },
          v: { type: 'string' },
        },
      },
      TransactionMap: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: { $ref: '#/components/schemas/Transaction' },
        },
      },
      Log: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          topics: {
            type: 'array',
            items: { type: 'string' },
          },
          data: { type: 'string' },
          blockNumber: { type: 'string' },
        },
        required: ['address', 'blockNumber'],
      },
      LogFilter: {
        type: 'object',
        properties: {
          fromBlock: { type: 'string' },
          toBlock: { type: 'string' },
          address: {
            oneOf: [
              { type: 'string' },
              { type: 'array', items: { type: 'string' } },
            ],
          },
          topics: {
            type: 'array',
            items: {
              oneOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' } },
              ],
            },
          },
        },
      },
      MempoolStatus: {
        type: 'object',
        properties: {
          pendingCount: { type: 'number' },
          queuedCount: { type: 'number' },
          transactions: {
            type: 'array',
            items: { $ref: '#/components/schemas/Transaction' },
          },
        },
      },
    },
    errors: {
      InvalidParams: {
        code: -32602,
        message: 'Invalid parameters',
        data: { type: 'string' },
      },
      InternalError: {
        code: -32603,
        message: 'Internal server error',
        data: { type: 'string' },
      },
      RateLimitExceeded: {
        code: -32000,
        message: 'Request limit exceeded',
        data: {
          type: 'object',
          properties: {
            retryAfter: { type: 'number' },
          },
        },
      },
      MethodDeprecated: {
        code: -32604,
        message: 'Method deprecated',
        data: {
          type: 'object',
          properties: {
            alternative: { type: 'string' },
          },
        },
      },
    },
  },
};
