import { registerEnumType } from '@nestjs/graphql';

export enum GameCodes {
  DICE = 'DICE',
  LIMBO = 'LIMBO',
  MINES = 'MINES',
  HILO = 'HILO',
  PLINKO = 'PLINKO',
  CRASH = 'CRASH',
  SLIDE = 'SLIDE',
  DIAMONDS = 'DIAMONDS',
  AVIATORX = 'AVIATORX',
  PCRASH = 'PCRASH',
  BUTTONPOP = 'BUTTONPOP',
  BOTTLESMASH = 'BOTTLESMASH',
  OVERANDOUT = 'OVERANDOUT',
}

registerEnumType(GameCodes, {
  name: 'GameCodes',
});

export const MultiplayerGames = [
  GameCodes.AVIATORX,
  GameCodes.CRASH,
  GameCodes.SLIDE,
  GameCodes.PCRASH,
  GameCodes.BUTTONPOP,
];

export enum MultiplayerGameCodes {
  CRASH = 'CRASH',
  SLIDE = 'SLIDE',
  AVIATORX = 'AVIATORX',
  PCRASH = 'PCRASH',
  BUTTONPOP = 'BUTTONPOP',
}
