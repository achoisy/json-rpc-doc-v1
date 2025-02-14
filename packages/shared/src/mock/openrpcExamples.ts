import type { OpenrpcDocument } from '../types';

export const sampleOpenrpcDocument: OpenrpcDocument = {
  openrpc: '1.2.6',
  info: {
    title: 'Sample JSON-RPC API (Loyalty & Rewards)',
    version: '1.0.0',
    description:
      'A sample JSON-RPC API specification demonstrating the OpenRPC schema for a loyalty and reward program.',
  },
  servers: [
    {
      name: 'Production Server',
      url: 'https://api.example.com/jsonrpc',
    },
    {
      name: 'Development Server',
      url: 'http://localhost:4000/jsonrpc',
    },
  ],
  methods: [
    {
      name: 'loyalty/createAccount',
      summary: 'Create a new loyalty account.',
      description: 'Creates a new loyalty account for a given customer.',
      tags: [{ name: 'loyalty' }, { name: 'account' }],
      params: [
        {
          name: 'account',
          schema: {
            $ref: '#/components/schemas/NewLoyaltyAccount',
          },
          description: 'Data required to create a new loyalty account.',
        },
      ],
      result: {
        name: 'createdAccount',
        description: 'The newly created loyalty account.',
        schema: {
          $ref: '#/components/schemas/LoyaltyAccount',
        },
      },
      examples: [
        {
          name: 'Basic account creation example',
          description:
            'Creating a loyalty account for an existing customer with default currency.',
          params: [
            {
              name: 'Example params',
              value: {
                account: {
                  customerId: 'cust-001',
                  balance: 0,
                  currency: 'USD',
                },
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              createdAccount: {
                id: 'acc-001',
                customerId: 'cust-001',
                balance: 0,
                currency: 'USD',
                createdAt: '2025-01-01T12:00:00Z',
              },
            },
          },
        },
      ],
      errors: [
        {
          code: -32602,
          message: 'Invalid params',
          data: 'Missing required fields or invalid data.',
        },
        {
          code: 401,
          message: 'Unauthorized',
          data: 'Invalid API key or session token.',
        },
      ],
    },
    {
      name: 'loyalty/getAccount',
      summary: 'Retrieve a loyalty account.',
      description: 'Returns details of an existing loyalty account.',
      tags: [{ name: 'loyalty' }, { name: 'account' }],
      params: [
        {
          name: 'accountId',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'ID of the loyalty account to retrieve.',
        },
      ],
      result: {
        name: 'account',
        description: 'The loyalty account details.',
        schema: {
          $ref: '#/components/schemas/LoyaltyAccount',
        },
      },
      examples: [
        {
          name: 'Get account by ID',
          description: 'Retrieve loyalty account details using its ID.',
          params: [
            {
              name: 'Example params',
              value: {
                accountId: 'acc-001',
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              account: {
                id: 'acc-001',
                customerId: 'cust-001',
                balance: 150,
                currency: 'USD',
                createdAt: '2025-01-01T12:00:00Z',
              },
            },
          },
        },
      ],
      errors: [
        {
          code: 404,
          message: 'Not Found',
          data: 'No loyalty account found with the specified ID.',
        },
        {
          code: -32602,
          message: 'Invalid params',
          data: 'The provided accountId is invalid.',
        },
      ],
    },
    {
      name: 'loyalty/addPoints',
      summary: 'Add loyalty points.',
      description: 'Adds loyalty points to an existing account.',
      tags: [{ name: 'loyalty' }, { name: 'account' }, { name: 'points' }],
      params: [
        {
          name: 'accountId',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'ID of the loyalty account to update.',
        },
        {
          name: 'points',
          required: true,
          schema: {
            type: 'number',
          },
          description: 'Number of points to add.',
        },
      ],
      result: {
        name: 'updatedAccount',
        description: 'The loyalty account after points have been added.',
        schema: {
          $ref: '#/components/schemas/LoyaltyAccount',
        },
      },
      examples: [
        {
          name: 'Add points example',
          description: "Add 50 points to a user's loyalty account.",
          params: [
            {
              name: 'Example params',
              value: {
                accountId: 'acc-001',
                points: 50,
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              updatedAccount: {
                id: 'acc-001',
                customerId: 'cust-001',
                balance: 200,
                currency: 'USD',
                createdAt: '2025-01-01T12:00:00Z',
              },
            },
          },
        },
      ],
      errors: [
        {
          code: 404,
          message: 'Not Found',
          data: 'Loyalty account not found.',
        },
        {
          code: 400,
          message: 'Bad Request',
          data: 'Points must be a positive number.',
        },
      ],
    },
    {
      name: 'loyalty/spendPoints',
      summary: 'Spend loyalty points.',
      description: 'Removes or redeems loyalty points from an account.',
      tags: [{ name: 'loyalty' }, { name: 'account' }, { name: 'points' }],
      params: [
        {
          name: 'accountId',
          schema: {
            type: 'string',
          },
          description: 'ID of the loyalty account to update.',
        },
        {
          name: 'points',
          schema: {
            type: 'number',
          },
          description: 'Number of points to spend.',
        },
      ],
      result: {
        name: 'updatedAccount',
        description: 'The loyalty account after points have been spent.',
        schema: {
          $ref: '#/components/schemas/LoyaltyAccount',
        },
      },
      examples: [
        {
          name: 'Spend points example',
          description: 'Spend 20 points from an account.',
          params: [
            {
              name: 'Example params',
              value: {
                accountId: 'acc-001',
                points: 20,
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              updatedAccount: {
                id: 'acc-001',
                customerId: 'cust-001',
                balance: 130,
                currency: 'USD',
                createdAt: '2025-01-01T12:00:00Z',
              },
            },
          },
        },
      ],
      errors: [
        {
          code: 400,
          message: 'Insufficient Points',
          data: 'Balance is too low to spend the requested amount of points.',
        },
        {
          code: 404,
          message: 'Not Found',
          data: 'No loyalty account found with the specified ID.',
        },
      ],
    },
    {
      name: 'loyalty/getTransactions',
      summary: 'Retrieve transaction history.',
      description:
        'Returns a list of all transactions for a given loyalty account.',
      tags: [
        { name: 'loyalty' },
        { name: 'account' },
        { name: 'transactions' },
      ],
      params: [
        {
          name: 'accountId',
          schema: {
            type: 'string',
          },
          description:
            'ID of the loyalty account whose transaction history is requested.',
        },
      ],
      result: {
        name: 'transactions',
        description: 'List of all transactions for the specified account.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Transaction',
          },
        },
      },
      examples: [
        {
          name: 'Get transactions example',
          description: 'Retrieve transaction history for a loyalty account.',
          params: [
            {
              name: 'Example params',
              value: {
                accountId: 'acc-001',
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              transactions: [
                {
                  id: 'txn-1001',
                  accountId: 'acc-001',
                  type: 'add',
                  points: 100,
                  timestamp: '2025-01-01T12:00:00Z',
                },
                {
                  id: 'txn-1002',
                  accountId: 'acc-001',
                  type: 'spend',
                  points: 50,
                  timestamp: '2025-01-02T10:00:00Z',
                },
              ],
            },
          },
        },
      ],
      errors: [
        {
          code: 404,
          message: 'Not Found',
          data: 'No loyalty account found with the specified ID.',
        },
      ],
    },
    {
      name: 'customer/createCustomer',
      summary: 'Create a new customer.',
      description: 'Adds a customer to the system.',
      tags: [{ name: 'customer' }],
      params: [
        {
          name: 'customer',
          schema: {
            $ref: '#/components/schemas/NewCustomer',
          },
          description: 'The new customer object to create.',
        },
      ],
      result: {
        name: 'createdCustomer',
        description: 'The newly created customer.',
        schema: {
          $ref: '#/components/schemas/Customer',
        },
      },
      examples: [
        {
          name: 'Create customer',
          description: 'Basic example of creating a new customer.',
          params: [
            {
              name: 'Example params',
              value: {
                customer: {
                  username: 'john_doe',
                  email: 'john@doe.com',
                  password: 'p@ssw0rd',
                },
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              createdCustomer: {
                id: 'cust-001',
                username: 'john_doe',
                email: 'john@doe.com',
                registeredAt: '2025-01-01T12:00:00Z',
              },
            },
          },
        },
      ],
      errors: [
        {
          code: 409,
          message: 'Conflict',
          data: 'A customer with that email already exists.',
        },
        {
          code: -32602,
          message: 'Invalid params',
          data: 'Missing or invalid data for creating a customer.',
        },
      ],
    },
    {
      name: 'customer/getCustomer',
      summary: 'Retrieve a customer by ID.',
      description: 'Returns details about a customer.',
      tags: [{ name: 'customer' }],
      params: [
        {
          name: 'customerId',
          schema: {
            type: 'string',
          },
          description: 'ID of the customer.',
        },
      ],
      result: {
        name: 'customer',
        description: 'The customer object.',
        schema: {
          $ref: '#/components/schemas/Customer',
        },
      },
      examples: [
        {
          name: 'Get customer by ID',
          description: "Fetch an existing customer's record.",
          params: [
            {
              name: 'Example params',
              value: {
                customerId: 'cust-001',
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              customer: {
                id: 'cust-001',
                username: 'john_doe',
                email: 'john@doe.com',
                registeredAt: '2025-01-01T12:00:00Z',
              },
            },
          },
        },
      ],
      errors: [
        {
          code: 404,
          message: 'Not Found',
          data: 'No customer found with the specified ID.',
        },
      ],
    },
    {
      name: 'auth/login',
      summary: 'Login user.',
      description: 'Returns a session token if successful.',
      tags: [{ name: 'auth' }],
      params: [
        {
          name: 'username',
          schema: {
            type: 'string',
          },
          description: 'Username.',
        },
        {
          name: 'password',
          schema: {
            type: 'string',
          },
          description: "User's password.",
        },
      ],
      result: {
        name: 'token',
        description: 'Session token.',
        schema: {
          type: 'string',
        },
      },
      examples: [
        {
          name: 'Login',
          description: 'Basic example of user login.',
          params: [
            {
              name: 'Example params',
              value: {
                username: 'john_doe',
                password: 'p@ssw0rd',
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              token: 'abcd1234',
            },
          },
        },
      ],
      errors: [
        {
          code: 401,
          message: 'Unauthorized',
          data: 'Invalid credentials provided.',
        },
      ],
    },
    {
      name: 'auth/logout',
      summary: 'Logout user.',
      description: 'Invalidates the current user session.',
      tags: [{ name: 'auth' }],
      params: [
        {
          name: 'token',
          schema: {
            type: 'string',
          },
          description: 'Session token to invalidate.',
        },
      ],
      result: {
        name: 'success',
        description:
          'Indicates whether the session was successfully invalidated.',
        schema: {
          type: 'boolean',
        },
      },
      examples: [
        {
          name: 'Logout',
          description: 'Basic logout example.',
          params: [
            {
              name: 'Example params',
              value: {
                token: 'abcd1234',
              },
            },
          ],
          result: {
            name: 'Example result',
            value: {
              success: true,
            },
          },
        },
      ],
      errors: [
        {
          code: 401,
          message: 'Unauthorized',
          data: 'Invalid or expired token.',
        },
      ],
    },
  ],
  components: {
    schemas: {
      LoyaltyAccount: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          customerId: {
            type: 'string',
          },
          balance: {
            type: 'number',
          },
          currency: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: ['id', 'customerId', 'balance'],
      },
      NewLoyaltyAccount: {
        type: 'object',
        properties: {
          customerId: {
            type: 'string',
          },
          balance: {
            type: 'number',
            default: 0,
          },
          currency: {
            type: 'string',
            default: 'USD',
          },
        },
        required: ['customerId'],
      },
      Transaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          accountId: {
            type: 'string',
          },
          type: {
            type: 'string',
            enum: ['add', 'spend', 'adjust'],
          },
          points: {
            type: 'number',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: ['id', 'accountId', 'type', 'points', 'timestamp'],
      },
      Customer: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          registeredAt: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: ['id', 'username', 'email'],
      },
      NewCustomer: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
          },
        },
        required: ['username', 'email', 'password'],
      },
    },
  },
  externalDocs: {
    description: 'Find more info here.',
    url: 'https://open-rpc.org',
  },
};
