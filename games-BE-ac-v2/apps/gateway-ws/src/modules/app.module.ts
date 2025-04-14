import { Module, OnModuleInit } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '@provfair/configuration/app';
import { RedisClientConfigModule, RedisClientConfigService } from '@provfair/configuration/redis-client';
import { CacheModule } from '@provfair/modules/cache/cache.module';
import { MonitoringModule } from '@provfair/monitoring';
import { RedisModule } from '@provfair/redis';
import { BaseSchema, SchemaListType, ValidatorModule, ValidatorService } from '@provfair/validator';
import { HealthController } from '../controllers/health.controller';
import { EventsGatewayModule } from '../events/events.gateway.module';
import * as SchemaListImport from '../validationSchemas/list';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [RedisClientConfigModule],
      inject: [RedisClientConfigService],
      useFactory: (config: RedisClientConfigService) => {
        return config.redis;
      },
    }),
    CacheModule,
    AppConfigModule,
    EventsGatewayModule,
    MonitoringModule,
    TerminusModule,
    ValidatorModule,
  ],
  controllers: [HealthController],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly validatorService: ValidatorService) {}

  onModuleInit() {
    const schemaList: SchemaListType = {};

    for (const schema in SchemaListImport) {
      const instance: BaseSchema = new SchemaListImport[`${schema}`]();

      schemaList[instance.key] = instance;
    }

    this.validatorService.precompileSchemas(schemaList);
  }
}
