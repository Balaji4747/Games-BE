import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { FederationClientConfigService } from './configuration.service';

/**
 * Import and provide Federation configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.federation-client.local`],
    }),
  ],
  providers: [ConfigService, FederationClientConfigService],
  exports: [ConfigService, FederationClientConfigService],
})
export class FederationClientConfigModule {}
