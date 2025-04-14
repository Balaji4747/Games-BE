import { InjectModel } from '@nestjs/mongoose';
import { AviatorxRound, AviatorxRoundModel } from '@provfair/apps/aviatorx/src/domain/schema/aviatorxRounds.schema';
import {
  AviatorxServerCodes,
  AviatorxServerCodesModel,
} from '@provfair/apps/aviatorx/src/domain/schema/aviatorxServerCode.schema';
import {
  ButtonPopHashCode,
  ButtonPopHashCodeModel,
} from '@provfair/apps/buttonpop/src/domain/schema/buttonpopHashCode.schema';
import { ButtonPopRound, ButtonPopRoundModel } from '@provfair/apps/buttonpop/src/domain/schema/buttonpopRounds.schema';
import { CrashHashCode, CrashHashCodeModel } from '@provfair/apps/crash/src/domain/schema/crashHashCode.schema';
import { CrashRound, CrashRoundModel } from '@provfair/apps/crash/src/domain/schema/crashRound.schema';
import { GameConfig, GameConfigModel } from '@provfair/apps/management/src/app/schemas/gameConfig.schema';
import { PCrashHashCode, PCrashHashCodeModel } from '@provfair/apps/pcrash/src/domain/schema/pCrashHashCode.schema';
import { PCrashRound, PCrashRoundModel } from '@provfair/apps/pcrash/src/domain/schema/pcrashRounds.schema';
import { UserToken, UserTokenModel } from '@provfair/apps/players/src/domain/schemas/userToken.schema';
import { SlideHashCode, SlideHashCodeModel } from '@provfair/apps/slide/src/domain/schema/slideHashCode.schema';
import { SlideRound, SlideRoundModel } from '@provfair/apps/slide/src/domain/schema/slideRound.schema';
import { UserBet, UserBetModel } from '@provfair/modules/user/schema/userBet.schema';
import { Users, UsersModel } from '@provfair/modules/user/schema/users.schema';
import { GameSeeds, GameSeedsModel } from '@provfair/shared/schemas/gameSeeds.schema';
import { IndexDescription } from 'mongodb';
import { Model } from 'mongoose';
import { Command, CommandRunner, Option } from 'nest-commander';

interface CommandOptions {
  drop?: boolean;
  collections?: string[];
}

@Command({ name: 'createIndexes', description: 'Create required indexes for Game BE Database' })
export class CreateIndexesCommand extends CommandRunner {
  private allCollections: Record<string, { model: Model<any>; indexes: IndexDescription[] }> = {};

  constructor(
    @InjectModel(UserBet.name) private userBetModel: UserBetModel,
    @InjectModel(Users.name) private usersModel: UsersModel,
    @InjectModel(AviatorxRound.name) private aviatorxRoundModel: AviatorxRoundModel,
    @InjectModel(AviatorxServerCodes.name) private aviatorxServerCodeModel: AviatorxServerCodesModel,
    @InjectModel(CrashRound.name) private crashRoundModel: CrashRoundModel,
    @InjectModel(CrashHashCode.name) private crashHashCodeModel: CrashHashCodeModel,
    @InjectModel(GameConfig.name) private gameConfigModel: GameConfigModel,
    @InjectModel(UserToken.name) private userTokenModel: UserTokenModel,
    @InjectModel(SlideRound.name) private slideRoundModel: SlideRoundModel,
    @InjectModel(SlideHashCode.name) private slideHashCodeModel: SlideHashCodeModel,
    @InjectModel(GameSeeds.name) private gameSeedsModel: GameSeedsModel,
    @InjectModel(PCrashRound.name) private pCrashRoundModel: PCrashRoundModel,
    @InjectModel(PCrashHashCode.name) private pCrashHashCodeModel: PCrashHashCodeModel,
    @InjectModel(ButtonPopRound.name) private buttonPopRoundModel: ButtonPopRoundModel,
    @InjectModel(ButtonPopHashCode.name) private buttonPopHashCodeModel: ButtonPopHashCodeModel,
  ) {
    super();

    this.allCollections = {
      [userBetModel.collection.name]: {
        model: userBetModel,
        indexes: [
          { key: { betId: 1 } },
          { key: { roundId: 1, betId: 1 } },
          { key: { roundId: 1, betStatus: 1, playerId: 1, gameCode: 1 }, name: 'activeGameInfo_bets' },
          { key: { gameCode: 1, gameMode: 1, betStatus: 1, createdAt: -1, playerId: 1 }, name: 'getUserBets-my_all' },
          { key: { gameCode: 1, playerId: 1, active: 1 }, name: 'findActiveBet' },
          { key: { roundId: 1, betStatus: 1, createdAt: -1 }, name: 'leaderBoard' },
        ],
      },
      [usersModel.collection.name]: {
        model: usersModel,
        indexes: [{ key: { playerId: 1, operatorId: 1 } }],
      },
      [aviatorxRoundModel.collection.name]: {
        model: aviatorxRoundModel,
        indexes: [{ key: { roundId: 1, status: 1 }, name: 'getRoundInfo' }],
      },
      [aviatorxServerCodeModel.collection.name]: {
        model: aviatorxServerCodeModel,
        indexes: [{ key: { isUsed: 1 } }],
      },
      [crashRoundModel.collection.name]: {
        model: crashRoundModel,
        indexes: [
          { key: { roundId: 1, status: 1 }, name: 'getRoundInfo' },
          { key: { gameMode: 1, status: 1, createdAt: -1 }, name: 'getCurrentDayRounds' },
        ],
      },
      [crashHashCodeModel.collection.name]: {
        model: crashHashCodeModel,
        indexes: [{ key: { isUsed: 1 } }],
      },
      [gameConfigModel.collection.name]: {
        model: gameConfigModel,
        indexes: [{ key: { gameCode: 1 } }],
      },
      [userTokenModel.collection.name]: {
        model: userTokenModel,
        indexes: [{ key: { rgsSessionId: 1 } }, { key: { createdAt: 1 }, expireAfterSeconds: 604800 }],
      },
      [slideRoundModel.collection.name]: {
        model: slideRoundModel,
        indexes: [
          { key: { roundId: 1, status: 1 }, name: 'getRoundInfo' },
          { key: { gameMode: 1, status: 1, createdAt: -1 }, name: 'getCurrentDayRounds' },
        ],
      },
      [slideHashCodeModel.collection.name]: {
        model: slideHashCodeModel,
        indexes: [{ key: { isUsed: 1 } }],
      },
      [gameSeedsModel.collection.name]: {
        model: gameSeedsModel,
        indexes: [{ key: { gameCode: 1 } }],
      },
      [pCrashRoundModel.collection.name]: {
        model: pCrashRoundModel,
        indexes: [{ key: { roundId: 1, status: 1 }, name: 'getRoundInfo' }],
      },
      [pCrashHashCodeModel.collection.name]: {
        model: pCrashHashCodeModel,
        indexes: [{ key: { isUsed: 1 } }],
      },
      [buttonPopRoundModel.collection.name]: {
        model: buttonPopRoundModel,
        indexes: [{ key: { roundId: 1, status: 1 }, name: 'getRoundInfo' }],
      },
      [buttonPopHashCodeModel.collection.name]: {
        model: buttonPopHashCodeModel,
        indexes: [{ key: { isUsed: 1 } }],
      },
    };
  }

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    await this.createIndexes(options.collections, options.drop);
  }

  private async createIndexes(collections: string[] | undefined, dropIndexes: boolean) {
    const targetCollections = collections || Object.keys(this.allCollections);

    for (const collectionName of targetCollections) {
      const col = this.allCollections[collectionName];

      if (!col) {
        console.warn(`Schema for collection ${collectionName} not found`);
        continue;
      }

      const model = col.model;

      if (dropIndexes) {
        console.log(`Dropping indexes for collection ${collectionName}`);
        await model.collection.dropIndexes();
      }

      console.log(`Creating indexes for collection ${collectionName}`);

      await model.collection.createIndexes(col.indexes);

      console.log(`Indexes for collection ${collectionName} created\n`);
    }
  }

  @Option({
    flags: '-d, --drop [boolean]',
    description: 'Drop all indexes before creation',
  })
  parseDrop(val: string): boolean {
    return val === 'true' || val === '1';
  }

  @Option({
    flags: '-c, --collections <string>',
    description: 'Comma-separated list of collections to create indexes for',
  })
  parseCollections(val: string): string[] {
    return val.split(',');
  }
}
