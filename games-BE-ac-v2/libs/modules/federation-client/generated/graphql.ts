import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  JWT: { input: any; output: any };
};

export type ActiveBetResponse = {
  __typename?: 'ActiveBetResponse';
  active: Scalars['Boolean']['output'];
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  gameCode: GameCodes;
  gameMode: Scalars['String']['output'];
  payout: Scalars['Float']['output'];
  payoutMultiplier: Scalars['Float']['output'];
  roundId: Scalars['String']['output'];
  state?: Maybe<StateResponse>;
};

export type ActiveGameBet = {
  __typename?: 'ActiveGameBet';
  avatar?: Maybe<Scalars['String']['output']>;
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  betStatus: BetStatus;
  btnIndex?: Maybe<Scalars['Int']['output']>;
  cashOutAt?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['Date']['output'];
  currency: Scalars['String']['output'];
  gameCode: GameCodes;
  gameMode: Scalars['String']['output'];
  payout?: Maybe<Scalars['Float']['output']>;
  payoutMultiplier?: Maybe<Scalars['Float']['output']>;
  playerId: Scalars['String']['output'];
  roundId: Scalars['String']['output'];
};

export type ActiveGameInput = {
  gameCode: GameCodes;
};

export type ActiveGameResponse = {
  __typename?: 'ActiveGameResponse';
  acceptBetDelay?: Maybe<Scalars['Int']['output']>;
  bets: Array<ActiveGameBet>;
  currentMultiplier?: Maybe<Scalars['Float']['output']>;
  delay?: Maybe<Scalars['Float']['output']>;
  gameEndIn?: Maybe<Scalars['Int']['output']>;
  gameId: Scalars['String']['output'];
  gameMode: Scalars['String']['output'];
  nextGameHashedSeed?: Maybe<Scalars['String']['output']>;
  numbers?: Maybe<Array<Scalars['Float']['output']>>;
  roundId: Scalars['String']['output'];
  startTime?: Maybe<Scalars['Date']['output']>;
  status: MultiPlayerGameStates;
};

export type AviatorxLastRound = {
  __typename?: 'AviatorxLastRound';
  crashMultiplier: Scalars['Float']['output'];
  roundId: Scalars['String']['output'];
};

export type AviatorxLastRoundBets = {
  __typename?: 'AviatorxLastRoundBets';
  avatar?: Maybe<Scalars['String']['output']>;
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  payout: Scalars['Float']['output'];
  payoutMultiplier: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
};

export type AviatorxQueries = {
  __typename?: 'AviatorxQueries';
  lastMultipliers?: Maybe<Array<AviatorxLastRound>>;
  roundInfo?: Maybe<AviatorxRoundInfoResponse>;
};

export type AviatorxQueriesLastMultipliersArgs = {
  gameMode: Scalars['String']['input'];
};

export type AviatorxQueriesRoundInfoArgs = {
  roundId: Scalars['String']['input'];
};

export type AviatorxRoundInfoResponse = {
  __typename?: 'AviatorxRoundInfoResponse';
  crashMultiplier: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  decimal: Scalars['Float']['output'];
  firstThreeBetters?: Maybe<Array<FirstThreeBetters>>;
  hash: Scalars['String']['output'];
  hex: Scalars['String']['output'];
  round: Scalars['Int']['output'];
  roundId: Scalars['String']['output'];
  serverSeed: Scalars['String']['output'];
};

export type BetInfoResponse = {
  __typename?: 'BetInfoResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  btnIndex?: Maybe<Scalars['Int']['output']>;
  cashOutAt?: Maybe<Scalars['Float']['output']>;
  clientSeed?: Maybe<Scalars['String']['output']>;
  crashMultiplier?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  currency: Scalars['String']['output'];
  gameCode: GameCodes;
  gameMode: Scalars['String']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  hashedServerSeed?: Maybe<Scalars['String']['output']>;
  nonce: Scalars['BigInt']['output'];
  payout: Scalars['Float']['output'];
  payoutMultiplier: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
  roundId: Scalars['String']['output'];
  seed?: Maybe<Scalars['String']['output']>;
  serverSeed?: Maybe<Scalars['String']['output']>;
  state?: Maybe<BetInfoStateResponse>;
  /** This is used only for Slide */
  targetMultiplier?: Maybe<Scalars['Float']['output']>;
  winChance?: Maybe<Scalars['Int']['output']>;
};

export type BetInfoStateResponse = {
  __typename?: 'BetInfoStateResponse';
  condition?: Maybe<DiceGameConditions>;
  mineCount?: Maybe<Scalars['Int']['output']>;
  mines?: Maybe<Array<Scalars['Float']['output']>>;
  /** The outcome multiplier for Dice */
  multiplier?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
  path?: Maybe<Array<Scalars['String']['output']>>;
  risk?: Maybe<PlinkoLevel>;
  rounds?: Maybe<Array<Scalars['JSON']['output']>>;
  rows?: Maybe<Scalars['Int']['output']>;
  startCard?: Maybe<Scalars['JSON']['output']>;
  target?: Maybe<Scalars['Int']['output']>;
  /** This is used in Limbo */
  targetMultiplier?: Maybe<Scalars['Float']['output']>;
};

export type BetPlaceInput = {
  betAmount: Scalars['Float']['input'];
  btnIndex?: InputMaybe<Scalars['Int']['input']>;
  cashOutAt?: InputMaybe<Scalars['BigInt']['input']>;
  currency: Scalars['String']['input'];
  gameCode?: InputMaybe<GameCodes>;
  targetMultiplier?: InputMaybe<Scalars['Float']['input']>;
};

export type BetPlaceResponse = {
  __typename?: 'BetPlaceResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  balance: Scalars['BigInt']['output'];
  betAmount: Scalars['BigInt']['output'];
  betId: Scalars['String']['output'];
  btnIndex?: Maybe<Scalars['Float']['output']>;
  cashOutAt?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  currency: Scalars['String']['output'];
  gameCode: GameCodes;
  gameId: Scalars['String']['output'];
  gameMode: Scalars['String']['output'];
  payout: Scalars['BigInt']['output'];
  payoutMultiplier: Scalars['BigInt']['output'];
  playerId: Scalars['String']['output'];
  roundId: Scalars['String']['output'];
  targetMultiplier?: Maybe<Scalars['Float']['output']>;
};

export enum BetStatus {
  BetCancelled = 'BET_CANCELLED',
  BetPlaced = 'BET_PLACED',
  CashedOut = 'CASHED_OUT',
  CreditFailed = 'CREDIT_FAILED',
  CreditStarted = 'CREDIT_STARTED',
  CreditSuccess = 'CREDIT_SUCCESS',
  DebitFailed = 'DEBIT_FAILED',
  DebitStarted = 'DEBIT_STARTED',
  DebitSuccess = 'DEBIT_SUCCESS',
  Refund = 'REFUND',
  RefundFailed = 'REFUND_FAILED',
}

export type BulkUpdateBetsInput = {
  active?: Scalars['Boolean']['input'];
  betId: Scalars['String']['input'];
  betStatus: BetStatus;
  crashMultiplier?: InputMaybe<Scalars['Float']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  payout: Scalars['BigInt']['input'];
  payoutMultiplier: Scalars['BigInt']['input'];
  roundId: Scalars['String']['input'];
  seed?: InputMaybe<Scalars['String']['input']>;
};

export type BulkUpdateUserBetInput = {
  bets?: InputMaybe<Array<BulkUpdateBetsInput>>;
  finalCrashMultiplier: Scalars['Float']['input'];
  hash?: InputMaybe<Scalars['String']['input']>;
  roundId: Scalars['String']['input'];
  seed?: InputMaybe<Scalars['String']['input']>;
};

export type BulkUpdateUserBetResponse = {
  __typename?: 'BulkUpdateUserBetResponse';
  ok: Scalars['Boolean']['output'];
};

export type CancelBetInput = {
  betId: Scalars['String']['input'];
  gameCode?: InputMaybe<GameCodes>;
  gameId?: InputMaybe<Scalars['String']['input']>;
};

export type CancelBetResponse = {
  __typename?: 'CancelBetResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  btnIndex?: Maybe<Scalars['Float']['output']>;
  cashOutAt?: Maybe<Scalars['Float']['output']>;
  currency: Scalars['String']['output'];
  gameCode: GameCodes;
  gameId: Scalars['String']['output'];
  gameMode: Scalars['String']['output'];
  payout: Scalars['Float']['output'];
  payoutMultiplier: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
  roundId: Scalars['String']['output'];
};

export type CashOutInput = {
  betId: Scalars['String']['input'];
  gameCode?: InputMaybe<GameCodes>;
  gameId?: InputMaybe<Scalars['String']['input']>;
};

export type CashOutResponse = {
  __typename?: 'CashOutResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  btnIndex?: Maybe<Scalars['Float']['output']>;
  cashOutAt?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  currency: Scalars['String']['output'];
  gameCode: GameCodes;
  gameId: Scalars['String']['output'];
  gameMode: Scalars['String']['output'];
  payout: Scalars['Float']['output'];
  payoutMultiplier: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
  roundId: Scalars['String']['output'];
};

export type CrashCurrentDayRoundResponse = {
  __typename?: 'CrashCurrentDayRoundResponse';
  crashMultiplier: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  gameId: Scalars['String']['output'];
  round: Scalars['Int']['output'];
  roundId: Scalars['String']['output'];
  status: MultiPlayerGameStates;
};

export type CrashQueries = {
  __typename?: 'CrashQueries';
  currentDayRounds?: Maybe<Array<CrashCurrentDayRoundResponse>>;
  roundInfo?: Maybe<CrashRoundInfoResponse>;
};

export type CrashQueriesCurrentDayRoundsArgs = {
  limit?: Scalars['Int']['input'];
  pageNo?: Scalars['Int']['input'];
  sortDir?: SortDir;
  sortKey?: SortKey;
};

export type CrashQueriesRoundInfoArgs = {
  roundId: Scalars['String']['input'];
};

export type CrashRoundInfoResponse = {
  __typename?: 'CrashRoundInfoResponse';
  crashMultiplier: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  decimal: Scalars['Float']['output'];
  hash: Scalars['String']['output'];
  hex: Scalars['String']['output'];
  round: Scalars['Int']['output'];
  roundId: Scalars['String']['output'];
  seed: Scalars['String']['output'];
};

export type DiamondBetPlaceResponse = {
  __typename?: 'DiamondBetPlaceResponse';
  betId: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  diamondState: DiamondStateResponse;
  gameCode: GameCodes;
  payout: Scalars['BigInt']['output'];
  payoutMultiplier: Scalars['BigInt']['output'];
  roundId: Scalars['String']['output'];
};

export type DiamondMutation = {
  __typename?: 'DiamondMutation';
  betPlace: DiamondBetPlaceResponse;
};

export type DiamondMutationBetPlaceArgs = {
  betAmount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
};

export type DiamondQueries = {
  __typename?: 'DiamondQueries';
  payTable: Scalars['JSON']['output'];
};

export type DiamondStateResponse = {
  __typename?: 'DiamondStateResponse';
  result: Array<Scalars['String']['output']>;
};

export enum DiceGameConditions {
  Above = 'ABOVE',
  Below = 'BELOW',
}

export type DiceMutation = {
  __typename?: 'DiceMutation';
  roll: DiceRollResponse;
};

export type DiceMutationRollArgs = {
  betAmount: Scalars['Float']['input'];
  condition: DiceGameConditions;
  currency: Scalars['String']['input'];
  target: Scalars['Float']['input'];
};

export type DiceQueries = {
  __typename?: 'DiceQueries';
  payTable: Array<PayTableEntry>;
};

export type DiceRollResponse = {
  __typename?: 'DiceRollResponse';
  betId: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  diceState: DiceStateResponse;
  gameCode: GameCodes;
  payout: Scalars['BigInt']['output'];
  payoutMultiplier: Scalars['BigInt']['output'];
  roundId: Scalars['String']['output'];
};

export type DiceStateResponse = {
  __typename?: 'DiceStateResponse';
  condition: DiceGameConditions;
  multiplier: Scalars['Float']['output'];
  outcome: Scalars['Float']['output'];
  target: Scalars['Float']['output'];
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  isError: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type FirstThreeBetters = {
  __typename?: 'FirstThreeBetters';
  avatar?: Maybe<Scalars['String']['output']>;
  betId: Scalars['String']['output'];
  clientSeed: Scalars['String']['output'];
  playerId: Scalars['String']['output'];
};

export enum GameCodes {
  Aviatorx = 'AVIATORX',
  Crash = 'CRASH',
  Diamonds = 'DIAMONDS',
  Dice = 'DICE',
  Hilo = 'HILO',
  Limbo = 'LIMBO',
  Mines = 'MINES',
  Pcrash = 'PCRASH',
  Plinko = 'PLINKO',
  Slide = 'SLIDE',
}

export type GameConfig = {
  __typename?: 'GameConfig';
  acceptBetDelay?: Maybe<Scalars['Float']['output']>;
  activeGameModes: Array<Scalars['String']['output']>;
  gameCode: GameCodes;
  maxMultiplierCap?: Maybe<Scalars['Float']['output']>;
};

export type GetPlayerSeedsResponse = {
  __typename?: 'GetPlayerSeedsResponse';
  clientSeed: Scalars['String']['output'];
  hashedNextServerSeed: Scalars['String']['output'];
  hashedServerSeed: Scalars['String']['output'];
  nonce: Scalars['BigInt']['output'];
};

export type HiloBetPlaceResponse = {
  __typename?: 'HiloBetPlaceResponse';
  active: Scalars['Boolean']['output'];
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  gameCode: GameCodes;
  hiloState: HiloStateResponse;
  payout: Scalars['BigInt']['output'];
  payoutMultiplier: Scalars['BigInt']['output'];
  roundId: Scalars['String']['output'];
};

export type HiloCard = {
  __typename?: 'HiloCard';
  rank: Scalars['String']['output'];
  suit: Scalars['String']['output'];
};

export type HiloCardOutcome = {
  __typename?: 'HiloCardOutcome';
  card: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  rankValue: Scalars['Int']['output'];
};

export enum HiloGameConditions {
  High = 'high',
  HigherEqual = 'higherEqual',
  Low = 'low',
  LowerEqual = 'lowerEqual',
  Same = 'same',
  Skip = 'skip',
}

export type HiloMutation = {
  __typename?: 'HiloMutation';
  betPlace: HiloBetPlaceResponse;
  cashOut: HiloBetPlaceResponse;
  nextCard: HiloBetPlaceResponse;
};

export type HiloMutationBetPlaceArgs = {
  betAmount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  rank: Scalars['String']['input'];
  suit: Scalars['String']['input'];
};

export type HiloMutationNextCardArgs = {
  guess: HiloGameConditions;
};

export type HiloQueries = {
  __typename?: 'HiloQueries';
  payTable: Scalars['JSON']['output'];
};

export type HiloRound = {
  __typename?: 'HiloRound';
  card: HiloCard;
  guess: HiloGameConditions;
  payoutMultiplier: Scalars['Float']['output'];
};

export type HiloStateResponse = {
  __typename?: 'HiloStateResponse';
  rounds: Array<HiloRound>;
  startCard: HiloCard;
};

export type InitResponse = {
  __typename?: 'InitResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  balance: Scalars['BigInt']['output'];
  beToken: Scalars['JWT']['output'];
  clientSeed: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  defaultBet: Scalars['BigInt']['output'];
  error?: Maybe<ErrorResponse>;
  gameCode: GameCodes;
  gameMode?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  maxBet?: Maybe<Scalars['BigInt']['output']>;
  minBet?: Maybe<Scalars['BigInt']['output']>;
  nextGameHashedSeed?: Maybe<Scalars['String']['output']>;
  operatorId: Scalars['String']['output'];
  playerId: Scalars['String']['output'];
};

export type LastRoundBets = {
  __typename?: 'LastRoundBets';
  avatar?: Maybe<Scalars['String']['output']>;
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  payout: Scalars['Float']['output'];
  payoutMultiplier: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
};

export type LimboBetPlaceResponse = {
  __typename?: 'LimboBetPlaceResponse';
  betId: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  gameCode: GameCodes;
  limboState: LimboStateResponse;
  payout: Scalars['BigInt']['output'];
  payoutMultiplier: Scalars['BigInt']['output'];
  roundId: Scalars['String']['output'];
};

export type LimboMutation = {
  __typename?: 'LimboMutation';
  betPlace: LimboBetPlaceResponse;
};

export type LimboMutationBetPlaceArgs = {
  betAmount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  targetMultiplier: Scalars['Float']['input'];
};

export type LimboStateResponse = {
  __typename?: 'LimboStateResponse';
  outcome: Scalars['Float']['output'];
  targetMultiplier: Scalars['Float']['output'];
};

export type ManagementMutation = {
  __typename?: 'ManagementMutation';
  updateGameConfig: GameConfig;
};

export type ManagementMutationUpdateGameConfigArgs = {
  input: UpdateGameConfigInput;
};

export type ManagementQueries = {
  __typename?: 'ManagementQueries';
  getAllConfig: Array<GameConfig>;
};

export type MinesBetPlaceResponse = {
  __typename?: 'MinesBetPlaceResponse';
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  gameCode: GameCodes;
  minesState: MinesStateResponse;
  payout: Scalars['BigInt']['output'];
  payoutMultiplier: Scalars['BigInt']['output'];
  roundId: Scalars['String']['output'];
};

export type MinesMutation = {
  __typename?: 'MinesMutation';
  autoBet: MinesBetPlaceResponse;
  betPlace: MinesBetPlaceResponse;
  cashOut: MinesBetPlaceResponse;
  nextMine: MinesBetPlaceResponse;
};

export type MinesMutationAutoBetArgs = {
  betAmount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  mineCount: Scalars['Int']['input'];
  positions: Array<Scalars['Int']['input']>;
};

export type MinesMutationBetPlaceArgs = {
  betAmount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  mineCount: Scalars['Int']['input'];
};

export type MinesMutationNextMineArgs = {
  position: Scalars['Int']['input'];
};

export type MinesQueries = {
  __typename?: 'MinesQueries';
  payTable: Scalars['JSON']['output'];
};

export type MinesRound = {
  __typename?: 'MinesRound';
  field: Scalars['Int']['output'];
  payoutMultiplier: Scalars['Float']['output'];
};

export type MinesStateResponse = {
  __typename?: 'MinesStateResponse';
  mineCount: Scalars['Int']['output'];
  mines?: Maybe<Array<Scalars['Int']['output']>>;
  rounds: Array<MinesRound>;
};

export enum MultiPlayerGameStates {
  AcceptBet = 'ACCEPT_BET',
  Ended = 'ENDED',
  Halt = 'HALT',
  Result = 'RESULT',
  Running = 'RUNNING',
  Scheduled = 'SCHEDULED',
  Starting = 'STARTING',
  UnderMaintenance = 'UNDER_MAINTENANCE',
}

export type Mutation = {
  __typename?: 'Mutation';
  diamonds: DiamondMutation;
  dice: DiceMutation;
  hilo: HiloMutation;
  limbo: LimboMutation;
  management: ManagementMutation;
  mines: MinesMutation;
  players: PlayerMutation;
  plinko: PlinkoMutation;
};

export type PCrashFirstThreeBetters = {
  __typename?: 'PCrashFirstThreeBetters';
  avatar?: Maybe<Scalars['String']['output']>;
  betId: Scalars['String']['output'];
  clientSeed: Scalars['String']['output'];
  playerId: Scalars['String']['output'];
};

export type PCrashLastRound = {
  __typename?: 'PCrashLastRound';
  crashMultiplier: Scalars['Float']['output'];
  roundId: Scalars['String']['output'];
};

export type PCrashQueries = {
  __typename?: 'PCrashQueries';
  lastMultipliers?: Maybe<Array<PCrashLastRound>>;
  roundInfo?: Maybe<PCrashRoundInfoResponse>;
};

export type PCrashQueriesLastMultipliersArgs = {
  gameMode: Scalars['String']['input'];
};

export type PCrashQueriesRoundInfoArgs = {
  roundId: Scalars['String']['input'];
};

export type PCrashRoundInfoResponse = {
  __typename?: 'PCrashRoundInfoResponse';
  crashMultiplier: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  decimal: Scalars['Float']['output'];
  firstThreeBetters?: Maybe<Array<PCrashFirstThreeBetters>>;
  hash: Scalars['String']['output'];
  hex: Scalars['String']['output'];
  round: Scalars['Int']['output'];
  roundId: Scalars['String']['output'];
  serverSeed: Scalars['String']['output'];
};

export type PayTableEntry = {
  __typename?: 'PayTableEntry';
  multiplierOver: Scalars['Float']['output'];
  multiplierUnder: Scalars['Float']['output'];
  outcome: Scalars['BigInt']['output'];
  probabilityOver: Scalars['BigInt']['output'];
  probabilityUnder: Scalars['BigInt']['output'];
};

export type PlayerMutation = {
  __typename?: 'PlayerMutation';
  betPlace: BetPlaceResponse;
  bulkUpdateBet: BulkUpdateUserBetResponse;
  cancelBet: CancelBetResponse;
  cashOut: CashOutResponse;
  updateAvatar: UpdateUserAvatarResponse;
  updateClientSeed: UpdateClientSeedResponse;
};

export type PlayerMutationBetPlaceArgs = {
  input: BetPlaceInput;
};

export type PlayerMutationBulkUpdateBetArgs = {
  input: BulkUpdateUserBetInput;
};

export type PlayerMutationCancelBetArgs = {
  input: CancelBetInput;
};

export type PlayerMutationCashOutArgs = {
  input: CashOutInput;
};

export type PlayerMutationUpdateAvatarArgs = {
  avatar: Scalars['String']['input'];
};

export type PlayerMutationUpdateClientSeedArgs = {
  clientSeed: Scalars['String']['input'];
};

export type PlayerQueries = {
  __typename?: 'PlayerQueries';
  activeBet?: Maybe<ActiveBetResponse>;
  activeGame?: Maybe<ActiveGameResponse>;
  aviatorxLastRoundBets?: Maybe<Array<AviatorxLastRoundBets>>;
  betInfo?: Maybe<BetInfoResponse>;
  bets?: Maybe<Array<UserBetsResponse>>;
  init: InitResponse;
  lastRoundBets?: Maybe<Array<LastRoundBets>>;
  seeds: GetPlayerSeedsResponse;
  verifyFairness?: Maybe<VerifyFairnessResponse>;
};

export type PlayerQueriesActiveBetArgs = {
  gameCode?: InputMaybe<GameCodes>;
};

export type PlayerQueriesActiveGameArgs = {
  input: ActiveGameInput;
};

export type PlayerQueriesAviatorxLastRoundBetsArgs = {
  gameMode: Scalars['String']['input'];
};

export type PlayerQueriesBetInfoArgs = {
  betId: Scalars['String']['input'];
};

export type PlayerQueriesBetsArgs = {
  input: UserBetsInput;
};

export type PlayerQueriesInitArgs = {
  currency: Scalars['String']['input'];
  gameCode: GameCodes;
  token: Scalars['String']['input'];
};

export type PlayerQueriesLastRoundBetsArgs = {
  gameMode: Scalars['String']['input'];
};

export type PlayerQueriesVerifyFairnessArgs = {
  input: VerifyFairnessInput;
};

export type PlinkoBetPlaceResponse = {
  __typename?: 'PlinkoBetPlaceResponse';
  betId: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  gameCode: GameCodes;
  payout: Scalars['BigInt']['output'];
  payoutMultiplier: Scalars['BigInt']['output'];
  plinkoState: PlinkoStateResponse;
  roundId: Scalars['String']['output'];
};

export enum PlinkoLevel {
  High = 'high',
  Low = 'low',
  Medium = 'medium',
}

export type PlinkoMutation = {
  __typename?: 'PlinkoMutation';
  betPlace: PlinkoBetPlaceResponse;
};

export type PlinkoMutationBetPlaceArgs = {
  betAmount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  risk: PlinkoLevel;
  rows: Scalars['Int']['input'];
};

export type PlinkoQueries = {
  __typename?: 'PlinkoQueries';
  payTable: Scalars['JSON']['output'];
};

export type PlinkoStateResponse = {
  __typename?: 'PlinkoStateResponse';
  path: Array<Scalars['String']['output']>;
  risk: PlinkoLevel;
  rows: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  aviatorx: AviatorxQueries;
  crash: CrashQueries;
  diamonds: DiamondQueries;
  dice: DiceQueries;
  hilo: HiloQueries;
  management: ManagementQueries;
  mines: MinesQueries;
  pcrash: PCrashQueries;
  players: PlayerQueries;
  plinko: PlinkoQueries;
  slide: SlideQueries;
};

export type SlideCurrentDayRoundResponse = {
  __typename?: 'SlideCurrentDayRoundResponse';
  crashMultiplier: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  gameId: Scalars['String']['output'];
  round: Scalars['Int']['output'];
  roundId: Scalars['String']['output'];
  status: MultiPlayerGameStates;
};

export type SlideQueries = {
  __typename?: 'SlideQueries';
  currentDayRounds?: Maybe<Array<SlideCurrentDayRoundResponse>>;
  roundInfo?: Maybe<SlideRoundInfoResponse>;
};

export type SlideQueriesCurrentDayRoundsArgs = {
  limit?: Scalars['Int']['input'];
  pageNo?: Scalars['Int']['input'];
  sortDir?: SortDir;
  sortKey?: SortKey;
};

export type SlideQueriesRoundInfoArgs = {
  roundId: Scalars['String']['input'];
};

export type SlideRoundInfoResponse = {
  __typename?: 'SlideRoundInfoResponse';
  crashMultiplier: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  decimal: Scalars['Float']['output'];
  hash: Scalars['String']['output'];
  hex: Scalars['String']['output'];
  round: Scalars['Int']['output'];
  roundId: Scalars['String']['output'];
  seed: Scalars['String']['output'];
};

export enum SortDir {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum SortKey {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT',
}

export type StateResponse = {
  __typename?: 'StateResponse';
  mineCount?: Maybe<Scalars['Int']['output']>;
  rounds?: Maybe<Array<Scalars['JSON']['output']>>;
  startCard?: Maybe<Scalars['JSON']['output']>;
};

export type UpdateClientSeedResponse = {
  __typename?: 'UpdateClientSeedResponse';
  clientSeed: Scalars['String']['output'];
  hashedNextServerSeed: Scalars['String']['output'];
  hashedServerSeed: Scalars['String']['output'];
  nonce: Scalars['BigInt']['output'];
};

export type UpdateGameConfigInput = {
  acceptBetDelay?: InputMaybe<Scalars['Float']['input']>;
  activeGameModes: Array<Scalars['String']['input']>;
  gameCode: GameCodes;
  maxMultiplierCap?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserAvatarResponse = {
  __typename?: 'UpdateUserAvatarResponse';
  gameCode: GameCodes;
  ok: Scalars['Boolean']['output'];
};

export enum UserBetType {
  All = 'ALL',
  My = 'MY',
}

export type UserBetsInput = {
  gameCode?: InputMaybe<GameCodes>;
  /** Number of items to get. Min 1, Max 100. */
  limit?: Scalars['Int']['input'];
  /** Number of items to skip. Min 1. */
  pageNo?: Scalars['Int']['input'];
  roundId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserBetType>;
};

export type UserBetsResponse = {
  __typename?: 'UserBetsResponse';
  betAmount: Scalars['Float']['output'];
  betId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  currency: Scalars['String']['output'];
  gameCode: GameCodes;
  payout: Scalars['Float']['output'];
  payoutMultiplier: Scalars['Float']['output'];
  playerId: Scalars['String']['output'];
};

export type VerifyFairnessInput = {
  clientSeed?: InputMaybe<Scalars['String']['input']>;
  gameCode: GameCodes;
  hash?: InputMaybe<Scalars['String']['input']>;
  mineCount?: InputMaybe<Scalars['Int']['input']>;
  nonce?: InputMaybe<Scalars['Int']['input']>;
  risk?: InputMaybe<PlinkoLevel>;
  rows?: InputMaybe<Scalars['Int']['input']>;
  seed?: InputMaybe<Scalars['String']['input']>;
  serverSeed?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyFairnessResponse = {
  __typename?: 'VerifyFairnessResponse';
  cardOutcome?: Maybe<Array<HiloCardOutcome>>;
  mines?: Maybe<Array<Scalars['Int']['output']>>;
  multiplier?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
  path?: Maybe<Array<Scalars['String']['output']>>;
  result?: Maybe<Array<Scalars['String']['output']>>;
};

export type ActiveBetQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveBetQuery = {
  __typename?: 'Query';
  players: {
    __typename?: 'PlayerQueries';
    activeBet?: {
      __typename?: 'ActiveBetResponse';
      betId: string;
      roundId: string;
      gameMode: string;
      payout: number;
      payoutMultiplier: number;
      betAmount: number;
      gameCode: GameCodes;
      active: boolean;
      createdAt?: any | null;
      state?: {
        __typename?: 'StateResponse';
        rounds?: Array<any> | null;
        startCard?: any | null;
        mineCount?: number | null;
      } | null;
    } | null;
  };
};

export type ActiveGameQueryVariables = Exact<{
  input: ActiveGameInput;
}>;

export type ActiveGameQuery = {
  __typename?: 'Query';
  players: {
    __typename?: 'PlayerQueries';
    activeGame?: {
      __typename?: 'ActiveGameResponse';
      gameId: string;
      roundId: string;
      status: MultiPlayerGameStates;
      currentMultiplier?: number | null;
      nextGameHashedSeed?: string | null;
      gameEndIn?: number | null;
      gameMode: string;
      numbers?: Array<number> | null;
      startTime?: any | null;
      delay?: number | null;
      acceptBetDelay?: number | null;
      bets: Array<{
        __typename?: 'ActiveGameBet';
        betId: string;
        roundId: string;
        betAmount: number;
        playerId: string;
        gameMode: string;
        gameCode: GameCodes;
        currency: string;
        betStatus: BetStatus;
        cashOutAt?: number | null;
        btnIndex?: number | null;
        payout?: number | null;
        payoutMultiplier?: number | null;
        avatar?: string | null;
        createdAt: any;
      }>;
    } | null;
  };
};

export type AviatorxLastMultipliersQueryVariables = Exact<{
  gameMode: Scalars['String']['input'];
}>;

export type AviatorxLastMultipliersQuery = {
  __typename?: 'Query';
  aviatorx: {
    __typename?: 'AviatorxQueries';
    lastMultipliers?: Array<{ __typename?: 'AviatorxLastRound'; roundId: string; crashMultiplier: number }> | null;
  };
};

export type BetPlaceMutationVariables = Exact<{
  input: BetPlaceInput;
}>;

export type BetPlaceMutation = {
  __typename?: 'Mutation';
  players: {
    __typename?: 'PlayerMutation';
    betPlace: {
      __typename?: 'BetPlaceResponse';
      gameId: string;
      roundId: string;
      betId: string;
      playerId: string;
      payout: any;
      payoutMultiplier: any;
      balance: any;
      gameCode: GameCodes;
      currency: string;
      betAmount: any;
      gameMode: string;
      btnIndex?: number | null;
      cashOutAt?: number | null;
      avatar?: string | null;
      targetMultiplier?: number | null;
      createdAt?: any | null;
    };
  };
};

export type CancelBetMutationVariables = Exact<{
  input: CancelBetInput;
}>;

export type CancelBetMutation = {
  __typename?: 'Mutation';
  players: {
    __typename?: 'PlayerMutation';
    cancelBet: {
      __typename?: 'CancelBetResponse';
      gameId: string;
      roundId: string;
      betId: string;
      playerId: string;
      payout: number;
      payoutMultiplier: number;
      gameCode: GameCodes;
      currency: string;
      betAmount: number;
      gameMode: string;
      cashOutAt?: number | null;
      btnIndex?: number | null;
      avatar?: string | null;
    };
  };
};

export type CashOutMutationVariables = Exact<{
  input: CashOutInput;
}>;

export type CashOutMutation = {
  __typename?: 'Mutation';
  players: {
    __typename?: 'PlayerMutation';
    cashOut: {
      __typename?: 'CashOutResponse';
      gameId: string;
      roundId: string;
      betId: string;
      playerId: string;
      payout: number;
      payoutMultiplier: number;
      gameCode: GameCodes;
      currency: string;
      betAmount: number;
      gameMode: string;
      cashOutAt?: number | null;
      btnIndex?: number | null;
      avatar?: string | null;
      createdAt?: any | null;
    };
  };
};

export type PcrashLastMultipliersQueryVariables = Exact<{
  gameMode: Scalars['String']['input'];
}>;

export type PcrashLastMultipliersQuery = {
  __typename?: 'Query';
  pcrash: {
    __typename?: 'PCrashQueries';
    lastMultipliers?: Array<{ __typename?: 'PCrashLastRound'; roundId: string; crashMultiplier: number }> | null;
  };
};

export const ActiveBetDocument = gql`
  query ActiveBet {
    players {
      activeBet {
        betId
        roundId
        gameMode
        payout
        payoutMultiplier
        betAmount
        gameCode
        active
        createdAt
        state {
          rounds
          startCard
          mineCount
        }
      }
    }
  }
`;
export const ActiveGameDocument = gql`
  query ActiveGame($input: ActiveGameInput!) {
    players {
      activeGame(input: $input) {
        gameId
        roundId
        status
        currentMultiplier
        nextGameHashedSeed
        bets {
          betId
          roundId
          betAmount
          playerId
          gameMode
          gameCode
          currency
          betStatus
          cashOutAt
          btnIndex
          payout
          payoutMultiplier
          avatar
          createdAt
        }
        gameEndIn
        gameMode
        numbers
        startTime
        delay
        acceptBetDelay
      }
    }
  }
`;
export const AviatorxLastMultipliersDocument = gql`
  query aviatorxLastMultipliers($gameMode: String!) {
    aviatorx {
      lastMultipliers(gameMode: $gameMode) {
        roundId
        crashMultiplier
      }
    }
  }
`;
export const BetPlaceDocument = gql`
  mutation BetPlace($input: BetPlaceInput!) {
    players {
      betPlace(input: $input) {
        gameId
        roundId
        betId
        playerId
        payout
        payoutMultiplier
        balance
        gameCode
        currency
        betAmount
        gameMode
        btnIndex
        cashOutAt
        avatar
        targetMultiplier
        createdAt
      }
    }
  }
`;
export const CancelBetDocument = gql`
  mutation CancelBet($input: CancelBetInput!) {
    players {
      cancelBet(input: $input) {
        gameId
        roundId
        betId
        playerId
        payout
        payoutMultiplier
        gameCode
        currency
        betAmount
        gameMode
        cashOutAt
        btnIndex
        avatar
      }
    }
  }
`;
export const CashOutDocument = gql`
  mutation CashOut($input: CashOutInput!) {
    players {
      cashOut(input: $input) {
        gameId
        roundId
        betId
        playerId
        payout
        payoutMultiplier
        gameCode
        currency
        betAmount
        gameMode
        cashOutAt
        btnIndex
        avatar
        createdAt
      }
    }
  }
`;
export const PcrashLastMultipliersDocument = gql`
  query pcrashLastMultipliers($gameMode: String!) {
    pcrash {
      lastMultipliers(gameMode: $gameMode) {
        roundId
        crashMultiplier
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ActiveBet(
      variables?: ActiveBetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ActiveBetQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ActiveBetQuery>(ActiveBetDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'ActiveBet',
        'query',
        variables,
      );
    },
    ActiveGame(
      variables: ActiveGameQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ActiveGameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ActiveGameQuery>(ActiveGameDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ActiveGame',
        'query',
        variables,
      );
    },
    aviatorxLastMultipliers(
      variables: AviatorxLastMultipliersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AviatorxLastMultipliersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AviatorxLastMultipliersQuery>(AviatorxLastMultipliersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'aviatorxLastMultipliers',
        'query',
        variables,
      );
    },
    BetPlace(
      variables: BetPlaceMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BetPlaceMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BetPlaceMutation>(BetPlaceDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BetPlace',
        'mutation',
        variables,
      );
    },
    CancelBet(
      variables: CancelBetMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CancelBetMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CancelBetMutation>(CancelBetDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CancelBet',
        'mutation',
        variables,
      );
    },
    CashOut(
      variables: CashOutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CashOutMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CashOutMutation>(CashOutDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'CashOut',
        'mutation',
        variables,
      );
    },
    pcrashLastMultipliers(
      variables: PcrashLastMultipliersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PcrashLastMultipliersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PcrashLastMultipliersQuery>(PcrashLastMultipliersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'pcrashLastMultipliers',
        'query',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
