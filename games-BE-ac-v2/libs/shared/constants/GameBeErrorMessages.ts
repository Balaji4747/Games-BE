import { GameBeResultCodes } from '../enums/gameBeResultCodes.enum';

export const GameBeErrorMessages: Record<number, string> = {
  [GameBeResultCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [GameBeResultCodes.RGS_ERROR_INVALID_TOKEN]: 'No token passed for calling RGS',
  [GameBeResultCodes.RGS_ERROR_INIT_REQUEST_FAILED]: 'RGS init failed',
  [GameBeResultCodes.RGS_ERROR_BET_REQUEST_FAILED]: 'RGS bet failed',
  [GameBeResultCodes.RGS_ERROR_WIN_REQUEST_FAILED]: 'RGS win failed',
  [GameBeResultCodes.RGS_ERROR_REFUND_REQUEST_FAILED]: 'RGS refund failed',
  [GameBeResultCodes.TOKEN_ISSUED]: 'Token is already issued once.',
  [GameBeResultCodes.NO_TOKEN]: 'Auth Token not found',
  [GameBeResultCodes.NO_PLAYER]: 'Player details not found',

  [GameBeResultCodes.INVALID_GUESS_HILO]: 'Please make valid guess.',
  [GameBeResultCodes.INVALID_CASHOUT_HILO]: 'Make atleast one prediction to cashout.',
  [GameBeResultCodes.BET_OPEN_HILO]: 'Please close your active game session.',
  [GameBeResultCodes.INVALID_BET_HILO]: 'Invalid bet session',
  [GameBeResultCodes.INVALID_SKIP_HILO]: 'Invalid action by user.',

  [GameBeResultCodes.BET_OPEN_MINES]: 'Please close your active game session.',
  [GameBeResultCodes.INVALID_BET_MINES]: 'Invalid bet session',
  [GameBeResultCodes.FIELD_SELECTED_MINES]: 'Field already selected',
  [GameBeResultCodes.INVALID_CASHOUT_MINES]: 'Pick atleast one tile to cashout.',
  [GameBeResultCodes.INVALID_GAMECODE_MINES]: 'Invalid game code found.',
};
