import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FederationConfigService } from '@provfair/configuration/federation/configuration.service';
import configuration from './configuration';

/**
 * Import and provide Federation configuration related classes.
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
  providers: [ConfigService, FederationConfigService],
  exports: [ConfigService, FederationConfigService],
})
export class FederationConfigModule {}
