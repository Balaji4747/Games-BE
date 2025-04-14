import { GameMode, MultiPlayerGameStates } from '@provfair/shared/enums';

export interface IActiveGameCache {
  gameId: string;
  roundId: string;
  gameMode: GameMode;
  status: MultiPlayerGameStates;
  finalCrashMultiplier?: number;
  currentMultiplier?: number;
  nextGameHashedSeed?: string;
  startTime?: Date;
  numbers?: number[];
  gameEndIn?: number;
  seed?: string; // Only present for Crash & Slide
  hash?: string; // Only present for Crash & Slide
  acceptBetEndTime?: number;
  acceptBetDelay?: number;
}
