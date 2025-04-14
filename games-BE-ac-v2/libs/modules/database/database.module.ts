import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigModule, DatabaseConfigService } from '@provfair/configuration/database';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (configService: DatabaseConfigService) => ({
        uri: configService.mongodb.uri,
        autoIndex: false,
      }),
      inject: [DatabaseConfigService],
    }),
  ],
})
export class DatabaseModule {}
