import { StatusCodes } from 'http-status-codes';
import { GameBeResultCodes } from '../enums/gameBeResultCodes.enum';

export interface IGameBeResult<T = void> {
  readonly httpStatusCode: StatusCodes;
  readonly code?: GameBeResultCodes;
  readonly message?: string;
  readonly data?: T;
}
