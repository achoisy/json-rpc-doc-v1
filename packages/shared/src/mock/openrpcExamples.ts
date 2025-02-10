import { OpenrpcDocument } from '../types';

export const sampleOpenrpcDocument: OpenrpcDocument = {
  openrpc: '1.0.0-rc1',
  info: {
    version: '1.0.0',
    title: 'Petstore',
    description: 'A pet store API',
    termsOfService: 'https://example.com/terms',
    contact: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
    },
  ],
  methods: [
    {
      name: 'pets/dogs/list',
      summary: 'List all dogs',
      tags: [
        {
          name: 'pets',
        },
      ],
      params: [
        {
          name: 'limit',
          description: 'How many items to return at one time (max 100)',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
          },
        },
      ],
      result: {
        name: 'pets',
        description: 'A paged array of pets',
        schema: {
          $ref: '#/components/schemas/Pets',
        },
      },
      errors: [
        {
          code: 100,
          message: 'pets busy',
        },
      ],
      examples: [
        {
          name: 'listPetExample',
          description: 'List pet example',
          params: [
            {
              name: 'limit',
              value: 1,
            },
          ],
          result: {
            name: 'listPetResultExample',
            value: [
              {
                id: 7,
                name: 'fluffy',
                tag: 'poodle',
              },
            ],
          },
        },
      ],
    },
    {
      name: 'pets/dogs/create',
      summary: 'Create a new dog',
      tags: [
        {
          name: 'pets',
        },
      ],
      params: [
        {
          name: 'newPetName',
          description: 'Name of pet to create',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'newPetTag',
          description: 'Pet tag to create',
          schema: {
            type: 'string',
          },
        },
      ],
      examples: [
        {
          name: 'createPetExample',
          description: 'Create pet example',
          params: [
            {
              name: 'newPetName',
              value: 'fluffy',
            },
            {
              name: 'tag',
              value: 'poodle',
            },
          ],
          result: {
            name: 'listPetResultExample',
            value: 7,
          },
        },
      ],
      result: {
        $ref: '#/components/contentDescriptors/PetId',
      },
    },
    {
      name: 'pets/cats/list',
      summary: 'List all cats',
      tags: [
        {
          name: 'pets',
        },
      ],
      params: [
        {
          name: 'limit',
          description: 'How many items to return at one time (max 100)',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
          },
        },
      ],
      result: {
        name: 'pets',
        description: 'A paged array of pets',
        schema: {
          $ref: '#/components/schemas/Pets',
        },
      },
      errors: [
        {
          code: 100,
          message: 'pets busy',
        },
      ],
      examples: [
        {
          name: 'listPetExample',
          description: 'List pet example',
          params: [
            {
              name: 'limit',
              value: 1,
            },
          ],
          result: {
            name: 'listPetResultExample',
            value: [
              {
                id: 7,
                name: 'fluffy',
                tag: 'poodle',
              },
            ],
          },
        },
      ],
    },
    {
      name: 'pets/cats/medical/vaccinations',
      summary: 'Get vaccination records',
      tags: [
        {
          name: 'pets',
        },
      ],
      params: [
        {
          name: 'petId',
          description: 'The id of the pet to retrieve',
          required: true,
          schema: {
            type: 'integer',
            minimum: 0,
          },
        },
      ],
      result: {
        name: 'vaccinations',
        description: 'Expected response to a valid request',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
              },
              vaccine: {
                type: 'string',
              },
            },
          },
        },
      },
      examples: [
        {
          name: 'getVaccinationsExample',
          description: 'get vaccinations example',
          params: [
            {
              name: 'petId',
              value: 7,
            },
          ],
          result: {
            name: 'getVaccinationsExampleResult',
            value: [
              {
                date: '2023-04-15',
                vaccine: 'Rabies',
              },
              {
                date: '2023-03-20',
                vaccine: 'Distemper',
              },
            ],
          },
        },
      ],
    },
  ],
  components: {
    contentDescriptors: {
      PetId: {
        name: 'petId',
        required: true,
        description: 'The id of the pet to retrieve',
        schema: {
          $ref: '#/components/schemas/PetId',
        },
      },
    },
    schemas: {
      PetId: {
        type: 'integer',
        minimum: 0,
      },
      Pet: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: {
            $ref: '#/components/schemas/PetId',
          },
          name: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
        },
      },
      Pets: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Pet',
        },
      },
    },
  },
};
