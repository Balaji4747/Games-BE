/* eslint-disable @typescript-eslint/ban-types */
import { HttpStatus } from '@nestjs/common';
import { GameBeErrorMessages } from '@provfair/shared/constants/GameBeErrorMessages';
import { GameBeResultCodes } from '@provfair/shared/enums/gameBeResultCodes.enum';

/* eslint max-classes-per-file: 0 */

/**
 * Virtual class for doing some magic (inherits Error and does not call it constructor).
 */
declare class ErrorWithoutCaptureStackClass extends Error {}

/**
 * Inherits Error, does not call it constructor and does not capture stack trace (it's a heavy operation).
 * @constructor
 */
function ErrorWithoutCaptureStack(): void {
  // does not call constructor and does not capture stack trace
}
ErrorWithoutCaptureStack.prototype = Object.create(Error.prototype);
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
ErrorWithoutCaptureStack.prototype.constructor = ErrorWithoutCaptureStack;

const BaseBaseRichError = ErrorWithoutCaptureStack as {} as typeof ErrorWithoutCaptureStackClass;

/**
 * Base class for all application errors.
 * It's is an internal server error by default.
 * Do not use this class directly. Use ServerError or ClientError inheritors.
 */
export class BaseRichError extends BaseBaseRichError {
  public static internalServerError = {
    name: 'InternalServerError',
    message: 'Internal server error.',
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  public readonly context: string;
  public readonly logLevel: Level;

  public httpCode: number;
  public code: GameBeResultCodes = GameBeResultCodes.INTERNAL_SERVER_ERROR;
  public public?: Record<string, unknown>;
  public internal?: Record<string, unknown>;

  public readonly doNotCaptureStack?: boolean;
  public readonly prevError?: Error;
  public readonly prevErrorMessage?: string;

  /**
   * Do not use this class directly. Use ServerError or ClientError inheritors.
   */
  protected constructor(opts: BaseRichErrorOptions) {
    super(); // will call ErrorWithoutCaptureStack and will not call Error constructor

    if (typeof opts.context === 'string') {
      this.context = opts.context;
    } else if (typeof opts.context === 'function') {
      this.context = opts.context.name;
    } else {
      this.context = opts.context.constructor.name;
    }

    if (opts.name) {
      this.name = opts.name;
    } else {
      this.name =
        this.constructor.name === BaseRichError.name ? BaseRichError.internalServerError.name : this.constructor.name;
    }

    this.code = opts.code ?? this.code;
    this.message = opts.message ?? GameBeErrorMessages[this.code];
    this.logLevel = opts.logLevel || 'error';
    this.httpCode = opts.httpCode || BaseRichError.internalServerError.httpCode;

    this.public = opts.public;
    this.internal = opts.internal;
    this.doNotCaptureStack = opts.doNotCaptureStack;

    if (opts.doNotCaptureStack) {
      // does not capture stack trace (it's a heavy operation)
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    this.prevError = opts.prevError;
    if (opts.prevErrorMessage) {
      this.prevErrorMessage = String(opts.prevErrorMessage);
    }
  }

  public static toRichError(context: string | Function | {}, error: Error): BaseRichError {
    if (error instanceof BaseRichError) {
      return error;
    }

    return new BaseRichError({
      context,
      message: (context as any)?.message ?? BaseRichError.internalServerError.message,
      doNotCaptureStack: true,
      prevError: error,
    });
  }
}

/**
 * A preferred log level for an error.
 */
export type Level = 'error' | 'warn' | 'info' | 'do-not-log';

/**
 * @see formatGraphQLError function
 */
export interface BaseRichErrorOptions {
  /**
   * An error context name in PascalCase or function/class name or object constructor name.
   * @see Nest.js logging context.
   * @example 'InstanceLoader', 'RouterExplorer', 'NestApplication'
   */
  context: any;

  /**
   * Error name. Must be in format SomeNameError.
   */
  name?: string;

  /**
   * Error message in format 'Some error occurred.' (with '.' at the end).
   */
  message?: string;

  /**
   * Preferred log level for this error.
   */
  logLevel?: Level;

  /**
   * Disable stack capturing (it is a heavy operation).
   */
  doNotCaptureStack?: boolean;

  /**
   * Appropriate HTTP status code for this error.
   */
  httpCode?: number;

  code?: GameBeResultCodes;

  /**
   * Some public info.
   * All data in this field in the top level error will be shown to a client.
   * DO NOT put errors here.
   * public: { internal: somePrivateData } will show somePrivateData to a client.
   */
  public?: Record<string, unknown>;

  /**
   * Some internal information.
   * All data in this field in the top level error will not be shown to a client.
   */
  internal?: Record<string, unknown>;

  /**
   * Previous error. A reason of this error.
   */
  prevError?: Error;

  /**
   * Previous error. A reason of this error.
   * It will be converted to string if it is present
   */
  prevErrorMessage?: string | Error;
}
