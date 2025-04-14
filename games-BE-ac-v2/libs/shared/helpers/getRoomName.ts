import { GameCodes, GameMode } from '../enums';

export const getRoomNameByGame = (gameCode: GameCodes, gameMode: string) => {
  return `${gameCode}/${gameMode}`;
};

export const getRoomNameByMode = (gameMode: GameMode) => {
  return `GLOBAL/${gameMode}`;
};
