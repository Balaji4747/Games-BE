import { IntrospectAndCompose, RemoteGraphQLDataSource, ServiceEndpointDefinition } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FederationConfigModule, FederationConfigService } from '@provfair/configuration/federation';
import { GraphQLConfigModule, GraphQLConfigService } from '@provfair/configuration/graphql';
import { MonitoringService } from '@provfair/monitoring';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [FederationConfigModule, GraphQLConfigModule],
      inject: [FederationConfigService, MonitoringService, GraphQLConfigService],
      useFactory: (
        configService: FederationConfigService,
        monitor: MonitoringService,
        config: GraphQLConfigService,
      ): ApolloGatewayDriverConfig => {
        const serviceList = [
          { name: 'players', url: `${configService.players.url}/graphql` },
          { name: 'management', url: `${configService.management.url}/graphql` },
        ];

        const games = [
          'aviatorx',
          'crash',
          'slide',
          'mines',
          'dice',
          'plinko',
          'limbo',
          'diamond',
          'hilo',
          'pcrash',
          'buttonpop',
          'bottlesmash',
          'overandout',
        ];
        for (const game of games) {
          if (configService[game]?.url) {
            serviceList.push({ name: game, url: `${configService[game].url}/graphql` });
          }
        }

        const plugins = [];
        if (config.graphQLOptions.playground) {
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
          server: {
            csrfPrevention: true,
            playground: false,
            introspection: config.graphQLOptions.introspection || false,
            debug: false,
            plugins,
          },
          gateway: {
            debug: false,
            serviceHealthCheck: false,
            logger: monitor,
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: serviceList,
            }),
            buildService: (item: ServiceEndpointDefinition) => {
              const { url, name } = item;
              return new RemoteGraphQLDataSource({
                url,
                willSendRequest({ request, context }) {
                  const headers = context.req?.headers ?? {};
                  for (const key in headers) {
                    const value = headers[key];
                    if (value) {
                      request.http?.headers.set(key, value);
                    }
                  }
                },
              });
            },
          },
        };
      },
    }),
  ],
})
export class FederationModule {}
