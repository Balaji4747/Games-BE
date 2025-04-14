import { RedisCacheKeyEnum } from '../enums/redisCacheKeys.enum';

export const getRedisCacheKeys = (type: RedisCacheKeyEnum, data: Record<string, string>) => {
  let key: string;

  switch (type) {
    case RedisCacheKeyEnum.USER_DETAILS:
      key = `be:user:${data.operatorId}:${data.playerId}`;
      break;
    case RedisCacheKeyEnum.BET_LIST:
      key = `be:${data.gameCode}:${data.roundId}`;
      break;
    case RedisCacheKeyEnum.ACTIVE_GAME:
      key = `${data.gameCode}/${data.gameMode}/activeGame`;
      break;
    case RedisCacheKeyEnum.TOTAL_BET_COUNT:
      key = `${data.gameCode}/totalBetCount/${data.roundId}`;
      break;
    case RedisCacheKeyEnum.PLAYER_BET_COUNT:
      key = `${data.gameCode}/playerBetCount/${data.roundId}/${data.playerId}`;
      break;
    case RedisCacheKeyEnum.LAST_ROUND_LIST:
      key = `${data.gameCode}/${data.gameMode}/lastRounds`;
      break;
    case RedisCacheKeyEnum.GAME_CONFIG:
      key = `be:gameConfigs`;
      break;
    case RedisCacheKeyEnum.ACTIVE_BET:
      key = `be:activeBet/${data.gameCode}/${data.playerId}`;
      break;
  }

  return key;
};
