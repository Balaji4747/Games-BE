import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './configuration.service';
import mongodb from './mongodb/configuration';

/**
 * Import and provide Mongodb database configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongodb],
      envFilePath: [`.env.${process.env.SERVICE}.local`],
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
