import { registerEnumType } from '@nestjs/graphql';

export enum CardSuitEnum {
  CLUBS = 'C',
  DIAMONDS = 'D',
  HEARTS = 'H',
  SPADES = 'S',
}

export enum CardRankEnum {
  ACE = 'A',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
}

export enum HiloGameConditions {
  lowerEqual = 'lowerEqual',
  higherEqual = 'higherEqual',
  high = 'high',
  low = 'low',
  same = 'same',
  skip = 'skip',
}

registerEnumType(CardSuitEnum, { name: 'CardSuitEnum' });
registerEnumType(CardRankEnum, { name: 'CardRankEnum' });
registerEnumType(HiloGameConditions, { name: 'HiloGameConditions' });
