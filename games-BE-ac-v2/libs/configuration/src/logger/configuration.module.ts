import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { LoggerConfigService } from './configuration.service';

/**
 * Import and provide app configuration related classes.
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
  providers: [ConfigService, LoggerConfigService],
  exports: [ConfigService, LoggerConfigService],
})
export class LoggerConfigModule {}
