import { registerEnumType } from '@nestjs/graphql';

export enum GameMode {
  ONE = '1',
  THREE = '3',
  FIVE = '5',
  SEVEN = '7',
}

registerEnumType(GameMode, {
  name: 'GameMode',
});

export const DEFAULT_GAME_MODE = GameMode.ONE;
