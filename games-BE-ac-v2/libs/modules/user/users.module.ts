import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@provfair/modules/cache/cache.module';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { MonitoringModule } from '@provfair/monitoring';
import { UserBet, UserBetSchema } from './schema/userBet.schema';
import { Users, UsersSchema } from './schema/users.schema';
import { UserBetService } from './services/userBet.service';
import { UsersService } from './services/users.service';

@Global()
@Module({
  imports: [
    MonitoringModule,
    CacheModule,
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: UserBet.name, schema: UserBetSchema },
    ]),
    ProvablyFairModule,
  ],
  providers: [UsersService, UserBetService],
  exports: [UsersService, UserBetService],
})
export class UsersModule {}
