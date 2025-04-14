import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { JWTConfigService } from './configuration.service';

/**
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
  providers: [ConfigService, JWTConfigService],
  exports: [ConfigService, JWTConfigService],
})
export class JWTConfigModule {}
