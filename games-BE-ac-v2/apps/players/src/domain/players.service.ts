import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DIAMONDS_MATH } from '@provfair/apps/diamonds/src/math/diamonds';
import { HILO_MATH } from '@provfair/apps/hilo/src/math/hilo';
import { PLINKO_MATH } from '@provfair/apps/plinko/src/math/plinko';
import { JWTConfigService } from '@provfair/configuration/jwt';
import { ServerError } from '@provfair/modules/graphql/errors/server/server.error';
import JWTService from '@provfair/modules/jwt/jwt.service';
import { MultiplayerGameOutcomeService, SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { MonitoringService } from '@provfair/monitoring';
import { GameBeResultCodes, GameCodes } from '@provfair/shared/enums';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { CommonService } from '@provfair/shared/services/common.service';
import { InitResponseDTO } from './dtos/init-response.dto';
import { VerifyFairnessResponseDTO } from './dtos/verifyFairness-response.dto';
import { InitArgs } from './inputs/init.args';
import { VerifyFairnessInput } from './inputs/verifyFairness.input';
import { UserToken, UserTokenModel } from './schemas/userToken.schema';

@Injectable()
export class PlayersService extends CommonService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsServiceInstance: RgsService,
    private readonly jwtService: JWTService,
    private readonly jwtConfigService: JWTConfigService,
    private readonly userServiceInstance: UsersService,
    private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService,
    private readonly multiPlayerOutComeService: MultiplayerGameOutcomeService,
    @InjectModel(UserToken.name) private userTokenModel: UserTokenModel,
  ) {
    super();
  }

  async init(input: InitArgs): Promise<InitResponseDTO> {
    this.monitor.info('===Init started ===', { data: { input } });

    if (!this.jwtConfigService.disableDupJwtCheck) {
      const jwtIssued = await this.userTokenModel.findOne({ rgsSessionId: input.token });

      if (jwtIssued) {
        this.monitor.error(
          `A JWT for token: ${input.token} was already issued, player(${jwtIssued.playerId}) is trying to get another JWT.`,
        );

        throw new ServerError({
          context: this,
          code: GameBeResultCodes.TOKEN_ISSUED,
        });
      }
    }

    const playerInfo = await this.rgsServiceInstance.init({
      token: input.token,
      gameCode: input.gameCode,
    });

    let clientSeed: string;

    let user = await this.userServiceInstance.getUserDetails({
      playerId: playerInfo.playerId,
      operatorId: playerInfo.operatorId,
    });

    if (user) {
      clientSeed = user.clientSeed;
    } else {
      this.monitor.info(`===${input.gameCode}: creating user record for user id ${playerInfo.playerId} ===`);

      clientSeed = playerInfo.playerId.slice(0, 10);

      user = await this.userServiceInstance.createNewUser({
        playerId: playerInfo.playerId,
        clientSeed,
        operatorId: playerInfo?.operatorId,
      });
    }

    const resp: InitResponseDTO = {
      ...playerInfo,
      clientSeed,
      gameCode: input.gameCode,
      beToken: '',
      avatar: user.avatar,
    };

    resp.beToken = this.jwtService.generateToken({
      _id: user._id,
      playerId: playerInfo.playerId,
      gameMode: playerInfo.gameMode,
      operatorId: playerInfo.operatorId,
      token: input.token,
      gameCode: input.gameCode,
    });

    if (!this.jwtConfigService.disableDupJwtCheck) {
      await this.userTokenModel.create({ playerId: resp.playerId, rgsSessionId: input.token, beToken: resp.beToken });
    }

    return resp;
  }

  public async verifyFairness(input: VerifyFairnessInput, currentUser: AuthUser): Promise<VerifyFairnessResponseDTO> {
    this.monitor.info('===verifyFairness started for ===', { data: { input } });

    const { gameMode } = currentUser;
    const { gameCode, hash, seed, clientSeed, serverSeed, nonce, mineCount, rows, risk } = input;

    let resp: VerifyFairnessResponseDTO = {};
    let generatedTarget: number[];
    if (![GameCodes.CRASH, GameCodes.SLIDE].includes(gameCode)) {
      generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
        serverSeed || '',
        clientSeed || '',
        nonce,
        gameCode,
      );
    }

    switch (gameCode) {
      case GameCodes.DICE:
        resp = {
          outcome: Math.trunc(generatedTarget[0]) / 100,
        };
        break;
      case GameCodes.BOTTLESMASH:
      case GameCodes.OVERANDOUT:
      case GameCodes.MINES:
        const initialTiles = Array.from(Array(GameCodes.OVERANDOUT === gameCode ? 24 : 25).keys());

        const mines = generatedTarget.map((index) => {
          const mine_index = Math.floor(index);
          const mine_location = initialTiles[mine_index];
          initialTiles.splice(index, 1);
          return mine_location;
        });

        resp = {
          mines: mines.slice(0, mineCount),
        };
        break;
      case GameCodes.HILO:
        resp = {
          cardOutcome: generatedTarget.map((curr) => {
            const card = HILO_MATH.suitOrder[Math.floor(curr)];

            return {
              index: Math.floor(curr),
              card,
              rankValue: HILO_MATH.rankValue[card.split('-')[0]],
            };
          }),
        };
        break;
      case GameCodes.LIMBO:
        resp = {
          outcome: generatedTarget[0],
        };
        break;
      case GameCodes.DIAMONDS:
        resp = {
          result: generatedTarget.map((curr) => DIAMONDS_MATH.colorMap[Math.trunc(curr)]),
        };
        break;
      case GameCodes.PLINKO:
        const path = generatedTarget.map((el) => (!!Math.trunc(el) ? 'R' : 'L')).slice(0, rows);
        const payInfo = PLINKO_MATH[gameMode].gameLevel[risk].find((el) => el.row === rows).multiplierMap[
          path.filter((el) => el === 'R').length
        ];

        resp = {
          path,
          multiplier: payInfo.multiplier,
        };
        break;
      case GameCodes.CRASH:
      case GameCodes.SLIDE:
        const multiplier = await this.multiPlayerOutComeService.generateGameOutcomes(hash, seed, gameCode, gameMode);

        resp = {
          multiplier,
        };
        break;
      default:
        return null;
    }

    return resp;
  }
}
