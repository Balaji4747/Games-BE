import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { GraphQLConfigService } from './configuration.service';

/**
 * Import and provide graphql configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.${process.env.SERVICE}.local`],
    }),
  ],
  providers: [ConfigService, GraphQLConfigService],
  exports: [ConfigService, GraphQLConfigService],
})
export class GraphQLConfigModule {}
