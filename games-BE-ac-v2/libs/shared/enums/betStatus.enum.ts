import { registerEnumType } from '@nestjs/graphql';

export enum BetStatus {
  'DEBIT_STARTED' = 'DEBIT_STARTED',
  'DEBIT_SUCCESS' = 'DEBIT_SUCCESS',
  'DEBIT_FAILED' = 'DEBIT_FAILED',
  'CREDIT_SUCCESS' = 'CREDIT_SUCCESS',
  'CREDIT_STARTED' = 'CREDIT_STARTED',
  'CREDIT_FAILED' = 'CREDIT_FAILED',
  'REFUND' = 'REFUND',
  'REFUND_FAILED' = 'REFUND_FAILED',

  // Sent to all users
  BET_PLACED = 'BET_PLACED',
  BET_CANCELLED = 'BET_CANCELLED',
  CASHED_OUT = 'CASHED_OUT',
}

registerEnumType(BetStatus, {
  name: 'BetStatus',
});
