import { GameCodes } from '@provfair/shared/enums';
import { BaseSchema, StringWithEnum } from '@provfair/validator';
import { SchemaKeys } from './schemaKeys.enum';

export class CashOutSchema extends BaseSchema {
  public readonly key = SchemaKeys.CASH_OUT;

  constructor() {
    super();

    this.schema = {
      type: 'object',
      properties: {
        token: { type: 'string' },
        gameCode: StringWithEnum(GameCodes),
        betId: { type: 'string' },
        gameId: { type: 'string' },
      },
      required: ['gameCode', 'betId', 'gameId'],
    };
  }
}
