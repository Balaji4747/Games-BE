import { GameCodes } from '@provfair/shared/enums/gameCodes.enum';

export interface IJoinRoom {
  gameCode: GameCodes;
}

export interface ILeaveRoom {
  gameCode: GameCodes;
}
