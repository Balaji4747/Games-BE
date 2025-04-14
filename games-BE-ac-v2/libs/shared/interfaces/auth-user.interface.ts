import { GameCodes, GameMode } from '../enums';

export interface AuthUser {
  _id: string;
  playerId: string;
  gameCode: GameCodes;
  gameMode: GameMode;
  operatorId: string;
  token: string;
  isAdmin?: boolean;
}
