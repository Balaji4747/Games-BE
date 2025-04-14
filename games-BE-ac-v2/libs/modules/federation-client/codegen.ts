import type { CodegenConfig } from '@graphql-codegen/cli';

const schema = process.env.FEDERATION_URL;

if (!schema) {
  throw new Error('Make sure graphql api url is provided as environment variable!');
}

const codeGenConfig: CodegenConfig = {
  schema,
  overwrite: true,
  ignoreNoDocuments: true,
  documents: './libs/modules/federation-client/gql/*.gql',
  generates: {
    './libs/modules/federation-client/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};

export default codeGenConfig;
