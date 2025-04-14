import { GameCodes } from '@provfair/shared/enums';
import { BaseSchema, StringWithEnum } from '@provfair/validator';
import { SchemaKeys } from './schemaKeys.enum';

export class PlaceBetSchema extends BaseSchema {
  public readonly key = SchemaKeys.PLACE_BET;

  constructor() {
    super();

    this.schema = {
      type: 'object',
      properties: {
        token: { type: 'string' },
        gameCode: StringWithEnum(GameCodes),
        currency: { type: 'string' },
        betAmount: { type: 'number', minimum: 0 },
        btnIndex: { type: 'number', minimum: 0 },
      },
      required: ['gameCode', 'currency', 'betAmount'],
    };
  }
}
