import { GameMode } from '@provfair/shared/enums';

export interface IDiamondsMultiplierMap {
  primaryGroup: number;
  secondaryGroup: number;
  multiplier: number;
  probability: number;
  weight?: number;
}

export interface DiamondsMath
  extends Record<
    GameMode,
    {
      rtp: number;
      multiplierMap: IDiamondsMultiplierMap[];
    }
  > {
  colorMap: Record<number, string>;
}

export const DIAMONDS_MATH: DiamondsMath = Object.freeze({
  '1': {
    rtp: 99,
    multiplierMap: [
      {
        primaryGroup: 5,
        secondaryGroup: 0,
        multiplier: 50,
        probability: 0.04,
        weight: 7,
      },
      {
        primaryGroup: 4,
        secondaryGroup: 0,
        multiplier: 5,
        probability: 1.25,
        weight: 210,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 2,
        multiplier: 4,
        probability: 2.5,
        weight: 420,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 0,
        multiplier: 3,
        probability: 12.49,
        weight: 2100,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 2,
        multiplier: 2,
        probability: 18.74,
        weight: 3150,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 0,
        multiplier: 0.1,
        probability: 49.98,
        weight: 8400,
      },
      {
        primaryGroup: 0,
        secondaryGroup: 0,
        multiplier: 0,
        probability: 14.99,
        weight: 2520,
      },
    ],
  },
  '3': {
    rtp: 97,
    multiplierMap: [
      {
        primaryGroup: 5,
        secondaryGroup: 0,
        multiplier: 25,
        probability: 0.04,
        weight: 7,
      },
      {
        primaryGroup: 4,
        secondaryGroup: 0,
        multiplier: 5,
        probability: 1.25,
        weight: 210,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 2,
        multiplier: 4,
        probability: 2.5,
        weight: 420,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 0,
        multiplier: 3,
        probability: 12.49,
        weight: 2100,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 2,
        multiplier: 2,
        probability: 18.74,
        weight: 3150,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 0,
        multiplier: 0.1,
        probability: 49.98,
        weight: 8400,
      },
      {
        primaryGroup: 0,
        secondaryGroup: 0,
        multiplier: 0,
        probability: 14.99,
        weight: 2520,
      },
    ],
  },
  '5': {
    rtp: 95,
    multiplierMap: [
      {
        primaryGroup: 5,
        secondaryGroup: 0,
        multiplier: 35,
        probability: 0.04,
        weight: 7,
      },
      {
        primaryGroup: 4,
        secondaryGroup: 0,
        multiplier: 4,
        probability: 1.25,
        weight: 210,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 2,
        multiplier: 3.5,
        probability: 2.5,
        weight: 420,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 0,
        multiplier: 3,
        probability: 12.49,
        weight: 2100,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 2,
        multiplier: 2,
        probability: 18.74,
        weight: 3150,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 0,
        multiplier: 0.1,
        probability: 49.98,
        weight: 8400,
      },
      {
        primaryGroup: 0,
        secondaryGroup: 0,
        multiplier: 0,
        probability: 14.99,
        weight: 2520,
      },
    ],
  },
  '7': {
    rtp: 93,
    multiplierMap: [
      {
        primaryGroup: 5,
        secondaryGroup: 0,
        multiplier: 15,
        probability: 0.04,
        weight: 7,
      },
      {
        primaryGroup: 4,
        secondaryGroup: 0,
        multiplier: 5,
        probability: 1.25,
        weight: 210,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 2,
        multiplier: 3,
        probability: 2.5,
        weight: 420,
      },
      {
        primaryGroup: 3,
        secondaryGroup: 0,
        multiplier: 2.5,
        probability: 12.49,
        weight: 2100,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 2,
        multiplier: 2,
        probability: 18.74,
        weight: 3150,
      },
      {
        primaryGroup: 2,
        secondaryGroup: 0,
        multiplier: 0.2,
        probability: 49.98,
        weight: 8400,
      },
      {
        primaryGroup: 0,
        secondaryGroup: 0,
        multiplier: 0,
        probability: 14.99,
        weight: 2520,
      },
    ],
  },
  colorMap: {
    '0': 'green',
    '1': 'purple',
    '2': 'yellow',
    '3': 'red',
    '4': 'cyan',
    '5': 'pink',
    '6': 'blue',
  },
});
