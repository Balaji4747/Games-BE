import { InputType, PickType } from '@nestjs/graphql';
import { GameConfig } from '../schemas/gameConfig.schema';

@InputType()
export class UpdateGameConfigInput extends PickType(
  GameConfig,
  ['activeGameModes', 'gameCode', 'maxMultiplierCap', 'acceptBetDelay'],
  InputType,
) {}
