import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { RedisCacheKeyEnum } from '@provfair/shared/enums';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { UpdateGameConfigInput } from './inputs/updateGameConfig.input';
import { GameConfig, GameConfigModel } from './schemas/gameConfig.schema';

@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(GameConfig.name) private gameConfigModel: GameConfigModel,
    private readonly cacheService: CacheService,
  ) {}

  public async updateGameConfig(input: UpdateGameConfigInput): Promise<GameConfig> {
    const { gameCode } = input;
    const updatedConfig = await this.gameConfigModel.findOneAndUpdate(
      { gameCode },
      { $set: input },
      { upsert: true, new: true },
    );

    await this.cacheService.addToSet({
      key: getRedisCacheKeys(RedisCacheKeyEnum.GAME_CONFIG, null),
      element: { field: gameCode, value: JSON.stringify(updatedConfig.toJSON()) },
    });

    return updatedConfig;
  }

  public async getAllConfig(): Promise<GameConfig[]> {
    return this.gameConfigModel.find();
  }
}
