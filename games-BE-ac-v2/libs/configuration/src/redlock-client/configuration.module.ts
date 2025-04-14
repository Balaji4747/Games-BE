import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { RedlockClientConfigService } from './configuration.service';

/**
 * Import and provide Redlock configuration related classes.
 *
 * @module
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.redlock-client.local`],
    }),
  ],
  providers: [ConfigService, RedlockClientConfigService],
  exports: [ConfigService, RedlockClientConfigService],
})
export class RedlockClientConfigModule {}
