import { registerEnumType } from '@nestjs/graphql';

export enum DiceGameConditions {
  ABOVE = 'ABOVE',
  BELOW = 'BELOW',
}

registerEnumType(DiceGameConditions, {
  name: 'DiceGameConditions',
});
