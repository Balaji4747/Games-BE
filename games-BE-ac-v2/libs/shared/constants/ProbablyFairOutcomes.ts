import { GameCodes, GameMode } from '../enums';

export const MAX_RAW_OUTCOMES: Partial<Record<GameCodes, number>> = {
  [GameCodes.CRASH]: 4294967296,
  [GameCodes.AVIATORX]: 4294967296,
  [GameCodes.PCRASH]: 4294967296,
  [GameCodes.BUTTONPOP]: 4294967296,
  [GameCodes.SLIDE]: 4294967296,
  [GameCodes.LIMBO]: 16777216,
};

export const HOUSE_EDGE_CONVERSION: Record<GameMode, number> = {
  1: 0.01,
  // 2: 0.02,
  3: 0.03,
  5: 0.05,
  7: 0.07,
};

export const TOTAL_OUTCOMES = {
  DICE: 1,
  LIMBO: 1,
  HILO: 104,
  MINES: 24,
  [GameCodes.BOTTLESMASH]: 24,
  [GameCodes.OVERANDOUT]: 23,
  DIAMONDS: 5,
  PLINKO: 16,
};

export const OUTCOME_CUTOFF = {
  CRASH: 0.99,
  AVIATORX: 0.99,
  PCRASH: 0.99,
  SLIDE: 0.98,
  LIMBO: 0.99,
};

export const GAME_OUTCOME_MULTIPLIER = {
  DICE: 10001,
  HILO: 52,
  MINES: 25,
  [GameCodes.BOTTLESMASH]: 25,
  [GameCodes.OVERANDOUT]: 24,
  LIMBO: 16777216,
  DIAMONDS: 7,
  PLINKO: 2,
};

export const GAME_SEEDS = {
  [GameCodes.CRASH]: {
    seed: '00000000000000000001c98529805af6d6ef2154d2de0411aacd052c114ed131',
    bitcoinBlocknumber: 809388,
    proof: '',
    gameCode: GameCodes.CRASH,
  },
  [GameCodes.SLIDE]: {
    seed: '000000000000000000012854b43e7b237dd64c63a22a0240be1d1de911d7e819',
    bitcoinBlocknumber: 809387,
    proof: '',
    gameCode: GameCodes.SLIDE,
  },
  [GameCodes.PCRASH]: {
    seed: '00000000000000000001c98529805af6d6ef2154d2de0411aacd052c114ed131',
    bitcoinBlocknumber: 809388,
    proof: '',
    gameCode: GameCodes.PCRASH,
  },
  [GameCodes.BUTTONPOP]: {
    seed: '000000000000000000012854b43e7b237dd64c63a22a0240be1d1de911d7e819',
    bitcoinBlocknumber: 809387,
    proof: '',
    gameCode: GameCodes.BUTTONPOP,
  },
};
