import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryComplexityRules } from '@provfair/modules/graphql/complexity/apollo-complexity.plugin';

/**
 * Service dealing with graphql config based operations.
 *
 * @class
 */
@Injectable()
export class GraphQLConfigService {
  constructor(private readonly configService: ConfigService) {}

  public readonly queryComplexity: QueryComplexityRules = {
    default: 1,
    max: 80_000, // max number of fields/records obtained from DB or RPC
  };

  get gqlSchemaInFile(): boolean {
    return this.configService.get<boolean>('graphql.gqlSchemaInFile');
  }

  get playground(): boolean {
    return this.configService.get<boolean>('graphql.playground');
  }

  get introspection(): boolean {
    return this.configService.get<boolean>('graphql.introspection');
  }

  get showErrorInternals(): boolean {
    return this.configService.get<boolean>('graphql.showErrorInternals');
  }

  public graphQLOptions: ApolloDriverConfig = {
    path: '/graphql',
    autoSchemaFile: { federation: 2 },
    sortSchema: true,
    playground: this.playground,
    introspection: this.introspection,
    fieldResolverEnhancers: ['guards', 'filters', 'interceptors'],
  };
}
