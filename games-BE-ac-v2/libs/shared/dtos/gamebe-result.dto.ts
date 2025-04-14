import { StatusCodes } from 'http-status-codes';
import { GameBeResultCodes } from '../enums/gameBeResultCodes.enum';
import { IGameBeResult } from '../interfaces/IGameBeResult';

/**
 * Container for every response.
 * Main idea - we always must return valid response based on code.
 */
export class GameBEResultDto<T = void> implements IGameBeResult<T> {
  /**
   * PlatformResultDto constructor.
   * @param data - constructor data.
   */
  constructor(data: Partial<IGameBeResult<T>>) {
    this.code = data.code;
    this.data = data.data;
    this.message = data.message;
    this.httpStatusCode =
      data.httpStatusCode ?? (this.message ? StatusCodes.INTERNAL_SERVER_ERROR : data.httpStatusCode);
  }

  /**
   * Platform code which display status of operation, successfully or failed and why
   */
  public readonly code?: GameBeResultCodes = GameBeResultCodes.INTERNAL_SERVER_ERROR;

  /**
   * Additional information about result, reason of fail or other text.
   */
  public readonly message?: string;

  /**
   * Response data in successfully case.
   */
  public readonly data?: T;

  public readonly httpStatusCode: StatusCodes = StatusCodes.OK;
}
