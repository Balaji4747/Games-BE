import { registerEnumType } from '@nestjs/graphql';

export enum MultiPlayerGameStates {
  SCHEDULED = 'SCHEDULED',
  STARTING = 'STARTING',
  ACCEPT_BET = 'ACCEPT_BET',
  RUNNING = 'RUNNING',
  HALT = 'HALT',
  ENDED = 'ENDED',
  RESULT = 'RESULT',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
}

registerEnumType(MultiPlayerGameStates, {
  name: 'MultiPlayerGameStates',
});
