import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AviatorxRound, AviatorxRoundSchema } from '@provfair/apps/aviatorx/src/domain/schema/aviatorxRounds.schema';
import {
  AviatorxServerCodes,
  AviatorxServerCodesSchema,
} from '@provfair/apps/aviatorx/src/domain/schema/aviatorxServerCode.schema';
import {
  ButtonPopHashCode,
  ButtonPopHashCodeSchema,
} from '@provfair/apps/buttonpop/src/domain/schema/buttonpopHashCode.schema';
import {
  ButtonPopRound,
  ButtonPopRoundSchema,
} from '@provfair/apps/buttonpop/src/domain/schema/buttonpopRounds.schema';
import { CrashHashCode, CrashHashCodeSchema } from '@provfair/apps/crash/src/domain/schema/crashHashCode.schema';
import { CrashRound, CrashRoundSchema } from '@provfair/apps/crash/src/domain/schema/crashRound.schema';
import { GameConfig, GameConfigSchema } from '@provfair/apps/management/src/app/schemas/gameConfig.schema';
import { PCrashHashCode, PCrashHashCodeSchema } from '@provfair/apps/pcrash/src/domain/schema/pCrashHashCode.schema';
import { PCrashRound, PCrashRoundSchema } from '@provfair/apps/pcrash/src/domain/schema/pcrashRounds.schema';
import { UserToken, UserTokenSchema } from '@provfair/apps/players/src/domain/schemas/userToken.schema';
import { SlideHashCode, SlideHashCodeSchema } from '@provfair/apps/slide/src/domain/schema/slideHashCode.schema';
import { SlideRound, SlideRoundSchema } from '@provfair/apps/slide/src/domain/schema/slideRound.schema';
import { DatabaseModule } from '@provfair/modules/database';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { UserBet, UserBetSchema } from '@provfair/modules/user/schema/userBet.schema';
import { Users, UsersSchema } from '@provfair/modules/user/schema/users.schema';
import { GameSeeds, GameSeedsSchema } from '@provfair/shared/schemas/gameSeeds.schema';
import { CommonService } from '@provfair/shared/services/common.service';
import { CreateIndexesCommand } from './commander/createIndexes.command';
import { DiamondSimCommand } from './commander/diamond.command';
import { DiceCommand } from './commander/dice.command';
import { HiloCommand } from './commander/hilo.command';
import { LimboSimCommand } from './commander/limboSim.command';
import { MinesSimCommand } from './commander/minesSim.command';
import { OverAndOutSimCommand } from './commander/overAndOutSim.command';
import { PlinkoCommand } from './commander/plinko.command';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: UserBet.name, schema: UserBetSchema },
      { name: AviatorxRound.name, schema: AviatorxRoundSchema },
      { name: AviatorxServerCodes.name, schema: AviatorxServerCodesSchema },
      { name: CrashRound.name, schema: CrashRoundSchema },
      { name: CrashHashCode.name, schema: CrashHashCodeSchema },
      { name: GameSeeds.name, schema: GameSeedsSchema },
      { name: GameConfig.name, schema: GameConfigSchema },
      { name: UserToken.name, schema: UserTokenSchema },
      { name: SlideRound.name, schema: SlideRoundSchema },
      { name: SlideHashCode.name, schema: SlideHashCodeSchema },
      { name: PCrashRound.name, schema: PCrashRoundSchema },
      { name: PCrashHashCode.name, schema: PCrashHashCodeSchema },
      { name: ButtonPopRound.name, schema: ButtonPopRoundSchema },
      { name: ButtonPopHashCode.name, schema: ButtonPopHashCodeSchema },
    ]),
    ProvablyFairModule,
  ],
  providers: [
    CreateIndexesCommand,
    MinesSimCommand,
    DiamondSimCommand,
    DiceCommand,
    HiloCommand,
    PlinkoCommand,
    LimboSimCommand,
    CommonService,
    OverAndOutSimCommand,
  ],
})
export class AppModule {}
