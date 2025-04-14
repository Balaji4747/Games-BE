import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTConfigModule } from '@provfair/configuration/jwt';
import { JWTModule } from '@provfair/modules/jwt/jwt.module';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GqlModule } from 'libs/modules/graphql';
import { PlayersConsumer } from './consumers/players.consumer';
import { PlayersService } from './players.service';
import { PlayerMutationResolver } from './resolvers/players-mutation.resolver';
import { PlayerQueriesResolver } from './resolvers/players-queries.resolver';
import { UserToken, UserTokenSchema } from './schemas/userToken.schema';
import { BetPlaceService, CancelBetService, CashOutService } from './services';

@Module({
  imports: [
    GqlModule.forRoot(),
    MongooseModule.forFeature([{ name: UserToken.name, schema: UserTokenSchema }]),
    RGSModule,
    JWTModule,
    JWTConfigModule,
    ProvablyFairModule,
  ],
  providers: [
    PlayersService,
    PlayerQueriesResolver,
    PlayerMutationResolver,
    BetPlaceService,
    CashOutService,
    CancelBetService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PlayersConsumer,
  ],
})
export class PlayersModule {}
