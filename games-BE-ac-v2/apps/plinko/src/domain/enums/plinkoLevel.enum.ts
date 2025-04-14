import { registerEnumType } from '@nestjs/graphql';

export enum PlinkoLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

registerEnumType(PlinkoLevel, {
  name: 'PlinkoLevel',
});
