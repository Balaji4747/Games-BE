import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { ServerError } from '@provfair/modules/graphql/errors/server/server.error';
import { UserSeedsService } from '@provfair/modules/provablyFair/services';
import { MonitoringService } from '@provfair/monitoring';
import { GameBeResultCodes } from '@provfair/shared/enums';
import { RedisCacheKeyEnum } from '@provfair/shared/enums/redisCacheKeys.enum';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { UpdateQuery } from 'mongoose';
import { GetPlayerSeedsResponseDTO } from '../dtos/getPlayerSeeds-response.dto';
import { UpdateClientSeedResponseDTO } from '../dtos/update-clientSeed.response.dto';
import { UpdateUserAvatarResponseDTO } from '../dtos/updateUserAvatar-response.dto';
import { Users, UsersModel } from '../schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly cacheService: CacheService,
    private readonly userSeedsInstance: UserSeedsService,
    @InjectModel(Users.name) private usersModel: UsersModel,
  ) {}

  public async setUserDetailsCache(user: Users) {
    this.cacheService.setCache({
      key: getRedisCacheKeys(RedisCacheKeyEnum.USER_DETAILS, { operatorId: user.operatorId, playerId: user.playerId }),
      data: user,
      expire: 7200,
    }); // cache for 12hrs
  }

  public async getUserDetails(data: { playerId: string; operatorId: string }) {
    const { playerId, operatorId } = data;

    let user = await this.cacheService.getCache<Users>(getRedisCacheKeys(RedisCacheKeyEnum.USER_DETAILS, data));

    if (user) {
      return user;
    }

    const userFromDB = await this.usersModel
      .findOne({
        playerId,
        operatorId,
      })
      .select({
        _id: 1,
        clientSeed: 1,
        serverSeed: 1,
        playerId: 1,
        operatorId: 1,
        hashedServerSeed: 1,
        nonce: 1,
        avatar: 1,
        hashedNextServerSeed: 1,
        nextServerSeed: 1,
      });

    if (userFromDB) {
      user = userFromDB.toJSON();

      await this.setUserDetailsCache(user);
    }

    return user;
  }

  public async getUserDetailsOrFail(data: { playerId: string; operatorId: string }) {
    const user = await this.getUserDetails(data);

    if (!user) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.NO_PLAYER,
      });
    }

    return user;
  }

  public async updateUserDetails(
    userId: string,
    updateQuery: UpdateQuery<Partial<Omit<Users, '_id' | 'playerId'>>>,
    reloadCache = true,
  ) {
    const updatedUser = await this.usersModel.findOneAndUpdate({ _id: userId }, updateQuery, { new: true }).select({
      _id: 1,
      clientSeed: 1,
      serverSeed: 1,
      playerId: 1,
      operatorId: 1,
      hashedServerSeed: 1,
      nonce: 1,
      avatar: 1,
      hashedNextServerSeed: 1,
      nextServerSeed: 1,
    });

    const userObj = updatedUser.toJSON();

    if (reloadCache) {
      this.setUserDetailsCache(userObj);
    }

    return userObj;
  }

  public async createNewUser(data: Pick<Users, 'playerId' | 'clientSeed' | 'operatorId'>) {
    this.monitor.info('===createNewUser started for player id ===', { data: data.playerId });

    const { serverSeed, hashedServerSeed } = this.userSeedsInstance.generateNewServerSeed();
    const { serverSeed: nextServerSeed, hashedServerSeed: hashedNextServerSeed } =
      this.userSeedsInstance.generateNewServerSeed();

    const user = await this.usersModel.create({
      ...data,
      serverSeed,
      hashedServerSeed,
      nextServerSeed,
      hashedNextServerSeed,
      nonce: 0,
      avatar: 'av1',
    });

    this.setUserDetailsCache(user.toJSON());

    this.monitor.info('===createNewUser ended===', { data: data.playerId });

    return user;
  }

  public async updateUserAvatar(avatar: string, currentUser: AuthUser): Promise<UpdateUserAvatarResponseDTO> {
    await this.updateUserDetails(currentUser._id, { avatar });

    return { ok: true, gameCode: currentUser.gameCode };
  }

  public async updateClientSeed(clientSeed: string, currentUser: AuthUser): Promise<UpdateClientSeedResponseDTO> {
    const { playerId, operatorId } = currentUser;

    const user = await this.getUserDetails({ playerId, operatorId });

    const { serverSeed: nextServerSeed, hashedServerSeed: hashedNextServerSeed } =
      this.userSeedsInstance.generateNewServerSeed();

    const updateUser = {
      clientSeed,
      serverSeed: user.nextServerSeed,
      hashedServerSeed: user.hashedNextServerSeed,
      nextServerSeed,
      hashedNextServerSeed,
      nonce: 0,
    };

    await this.updateUserDetails(currentUser._id, {
      $set: updateUser,
      $push: {
        seedHistory: {
          clientSeed: user.clientSeed,
          serverSeed: user.serverSeed,
          hashedServerSeed: user.hashedServerSeed,
          nonce: user.nonce,
        },
      },
    });

    return {
      clientSeed,
      hashedServerSeed: user.hashedNextServerSeed,
      nonce: 0,
      hashedNextServerSeed,
    };
  }

  public async getPlayerSeeds(currentUser: AuthUser): Promise<GetPlayerSeedsResponseDTO> {
    const { playerId, operatorId } = currentUser;

    const user = await this.getUserDetails({ playerId, operatorId });

    return {
      clientSeed: user.clientSeed,
      hashedServerSeed: user.hashedServerSeed,
      hashedNextServerSeed: user.hashedNextServerSeed,
      nonce: user.nonce,
    };
  }
}
