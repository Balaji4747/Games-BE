import { ApolloServerPlugin, BaseContext, GraphQLRequestListener, GraphQLServerContext } from '@apollo/server';
import { GraphQLSchema, separateOperations } from 'graphql';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';

import { TooComplicatedQueryClientError } from './too-complicated-query.error';

export class ApolloComplexityPlugin<TContext extends BaseContext> implements ApolloServerPlugin<TContext> {
  private schema!: GraphQLSchema;

  public constructor(private readonly rules: QueryComplexityRules) {}

  public async serverWillStart(serviceContext: GraphQLServerContext): Promise<void> {
    this.schema = serviceContext.schema;
  }

  public async requestDidStart(): Promise<GraphQLRequestListener<TContext>> {
    return {
      didResolveOperation: async ({ request, document }) => {
        const complexity = getComplexity({
          schema: this.schema,
          query: request.operationName ? separateOperations(document)[request.operationName] : document,
          variables: request.variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: this.rules.default })],
        });

        if (complexity > this.rules.max) {
          // throw { originalError: ... } to save error class
          // (graphql will copy error properties into a new error object)
          throw {
            originalError: new TooComplicatedQueryClientError({
              context: this,
              message: 'Too complicated query',
              public: { complexity, maxComplexity: this.rules.max },
            }),
          };
        }
      },
    };
  }
}

export interface QueryComplexityRules {
  default: number;
  max: number;
}
