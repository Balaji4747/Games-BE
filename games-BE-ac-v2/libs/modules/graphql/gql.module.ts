import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfigModule, GraphQLConfigService } from '@provfair/configuration/graphql';
import { InternalConfigModule, InternalConfigService } from '@provfair/configuration/internalService';
import { JWTConfigModule, JWTConfigService } from '@provfair/configuration/jwt';
import { Request, Response } from 'express';
import { GraphQLError } from 'graphql';
import { GraphQLContext } from '../context/graphql.context';
import { JWTModule } from '../jwt/jwt.module';
import JWTService from '../jwt/jwt.service';
import { ApolloComplexityPlugin } from './complexity/apollo-complexity.plugin';
import { formatGraphQLError } from './errors/formats/graphql';

@Module({})
export class GqlModule implements NestModule {
  public static forRoot(): DynamicModule {
    return {
      module: GqlModule,
      imports: [
        GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          imports: [GraphQLConfigModule, JWTModule, InternalConfigModule, JWTConfigModule],
          inject: [GraphQLConfigService, JWTService, InternalConfigService, JWTConfigService],
          useFactory: (
            config: GraphQLConfigService,
            jwtService: JWTService,
            internalConfigService: InternalConfigService,
            jwtConfigService: JWTConfigService,
          ): ApolloFederationDriverConfig => {
            const plugins = [];
            if (!config.graphQLOptions.playground) {
              plugins.push(new ApolloComplexityPlugin(config.queryComplexity));
            } else {
              plugins.push(
                ApolloServerPluginLandingPageLocalDefault({
                  includeCookies: true,
                  footer: false,
                  embed: {
                    endpointIsEditable: false,
                    initialState: { pollForSchemaUpdates: false },
                  },
                }),
              );
            }
            return {
              ...config.graphQLOptions,
              playground: false,
              formatError: (formattedError, error) =>
                formatGraphQLError(error as GraphQLError, config.showErrorInternals),
              context: ({ req, res }: { req: Request; res: Response }) =>
                GraphQLContext.create({
                  request: req,
                  response: res,
                  jwtService,
                  internalConfigService,
                  jwtConfigService,
                }),
              plugins,
            };
          },
        }),
      ],
    };
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes('graphql');
  }
}
