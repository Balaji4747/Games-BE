import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@provfair/modules/cache/cache.module';
import { DatabaseModule } from '@provfair/modules/database';
import { GqlModule } from '@provfair/modules/graphql';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { HealthController } from './controllers/health.controller';
import { ManagementMutationResolver, ManagementQueriesResolver } from './management.resolver';
import { ManagementService } from './management.service';
import { GameConfig, GameConfigSchema } from './schemas/gameConfig.schema';

@Module({
  controllers: [HealthController],
  imports: [
    GqlModule.forRoot(),
    DatabaseModule,
    MongooseModule.forFeature([{ name: GameConfig.name, schema: GameConfigSchema }]),
    CacheModule,
  ],
  providers: [
    ManagementService,
    ManagementMutationResolver,
    ManagementQueriesResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
