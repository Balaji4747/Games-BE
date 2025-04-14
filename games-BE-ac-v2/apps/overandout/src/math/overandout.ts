import { GameMode } from '@provfair/shared/enums';

export interface IMinesMultiplierMap {
  gem: number;
  multiplier: number;
  probability: number;
}

export type MinesMath = Record<
  GameMode,
  {
    rtp: number;
    multiplierMap: IMinesMultiplierMap[][];
  }
>;

export const OVERANDOUT_MATH: MinesMath = Object.freeze({
  '1': {
    rtp: 99,
    multiplierMap: [
      [
        {
          gem: 1,
          probability: 0.9583,
          multiplier: 1.033,
        },
        {
          gem: 2,
          probability: 0.9167,
          multiplier: 1.08,
        },
        {
          gem: 3,
          probability: 0.875,
          multiplier: 1.1314,
        },
        {
          gem: 4,
          probability: 0.8333,
          multiplier: 1.188,
        },
        {
          gem: 5,
          probability: 0.7917,
          multiplier: 1.2505,
        },
        {
          gem: 6,
          probability: 0.75,
          multiplier: 1.32,
        },
        {
          gem: 7,
          probability: 0.7083,
          multiplier: 1.3976,
        },
        {
          gem: 8,
          probability: 0.6667,
          multiplier: 1.485,
        },
        {
          gem: 9,
          probability: 0.625,
          multiplier: 1.584,
        },
        {
          gem: 10,
          probability: 0.5833,
          multiplier: 1.6971,
        },
        {
          gem: 11,
          probability: 0.5417,
          multiplier: 1.8277,
        },
        {
          gem: 12,
          probability: 0.5,
          multiplier: 1.98,
        },
        {
          gem: 13,
          probability: 0.4583,
          multiplier: 2.16,
        },
        {
          gem: 14,
          probability: 0.4167,
          multiplier: 2.376,
        },
        {
          gem: 15,
          probability: 0.375,
          multiplier: 2.64,
        },
        {
          gem: 16,
          probability: 0.3333,
          multiplier: 2.97,
        },
        {
          gem: 17,
          probability: 0.2917,
          multiplier: 3.3943,
        },
        {
          gem: 18,
          probability: 0.25,
          multiplier: 3.96,
        },
        {
          gem: 19,
          probability: 0.2083,
          multiplier: 4.752,
        },
        {
          gem: 20,
          probability: 0.1667,
          multiplier: 5.94,
        },
        {
          gem: 21,
          probability: 0.125,
          multiplier: 7.92,
        },
        {
          gem: 22,
          probability: 0.0833,
          multiplier: 11.88,
        },
        {
          gem: 23,
          probability: 0.0417,
          multiplier: 23.76,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.9167,
          multiplier: 1.08,
        },
        {
          gem: 2,
          probability: 0.837,
          multiplier: 1.1829,
        },
        {
          gem: 3,
          probability: 0.7609,
          multiplier: 1.3011,
        },
        {
          gem: 4,
          probability: 0.6884,
          multiplier: 1.4381,
        },
        {
          gem: 5,
          probability: 0.6196,
          multiplier: 1.5979,
        },
        {
          gem: 6,
          probability: 0.5543,
          multiplier: 1.7859,
        },
        {
          gem: 7,
          probability: 0.4928,
          multiplier: 2.0091,
        },
        {
          gem: 8,
          probability: 0.4348,
          multiplier: 2.277,
        },
        {
          gem: 9,
          probability: 0.3804,
          multiplier: 2.6023,
        },
        {
          gem: 10,
          probability: 0.3297,
          multiplier: 3.0026,
        },
        {
          gem: 11,
          probability: 0.2826,
          multiplier: 3.5031,
        },
        {
          gem: 12,
          probability: 0.2391,
          multiplier: 4.14,
        },
        {
          gem: 13,
          probability: 0.1993,
          multiplier: 4.968,
        },
        {
          gem: 14,
          probability: 0.163,
          multiplier: 6.072,
        },
        {
          gem: 15,
          probability: 0.1304,
          multiplier: 7.59,
        },
        {
          gem: 16,
          probability: 0.1014,
          multiplier: 9.7586,
        },
        {
          gem: 17,
          probability: 0.0761,
          multiplier: 13.0114,
        },
        {
          gem: 18,
          probability: 0.0543,
          multiplier: 18.216,
        },
        {
          gem: 19,
          probability: 0.0362,
          multiplier: 27.324,
        },
        {
          gem: 20,
          probability: 0.0217,
          multiplier: 45.54,
        },
        {
          gem: 21,
          probability: 0.0109,
          multiplier: 91.08,
        },
        {
          gem: 22,
          probability: 0.0036,
          multiplier: 273.24,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.875,
          multiplier: 1.1314,
        },
        {
          gem: 2,
          probability: 0.7609,
          multiplier: 1.3011,
        },
        {
          gem: 3,
          probability: 0.6571,
          multiplier: 1.5066,
        },
        {
          gem: 4,
          probability: 0.5632,
          multiplier: 1.7577,
        },
        {
          gem: 5,
          probability: 0.4788,
          multiplier: 2.0679,
        },
        {
          gem: 6,
          probability: 0.4032,
          multiplier: 2.4556,
        },
        {
          gem: 7,
          probability: 0.336,
          multiplier: 2.9467,
        },
        {
          gem: 8,
          probability: 0.2767,
          multiplier: 3.5781,
        },
        {
          gem: 9,
          probability: 0.2248,
          multiplier: 4.4039,
        },
        {
          gem: 10,
          probability: 0.1798,
          multiplier: 5.5048,
        },
        {
          gem: 11,
          probability: 0.1413,
          multiplier: 7.0062,
        },
        {
          gem: 12,
          probability: 0.1087,
          multiplier: 9.108,
        },
        {
          gem: 13,
          probability: 0.0815,
          multiplier: 12.144,
        },
        {
          gem: 14,
          probability: 0.0593,
          multiplier: 16.698,
        },
        {
          gem: 15,
          probability: 0.0415,
          multiplier: 23.8543,
        },
        {
          gem: 16,
          probability: 0.0277,
          multiplier: 35.7814,
        },
        {
          gem: 17,
          probability: 0.0173,
          multiplier: 57.2503,
        },
        {
          gem: 18,
          probability: 0.0099,
          multiplier: 100.188,
        },
        {
          gem: 19,
          probability: 0.0049,
          multiplier: 200.376,
        },
        {
          gem: 20,
          probability: 0.002,
          multiplier: 500.94,
        },
        {
          gem: 21,
          probability: 0.0005,
          multiplier: 2003.76,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8333,
          multiplier: 1.188,
        },
        {
          gem: 2,
          probability: 0.6884,
          multiplier: 1.4381,
        },
        {
          gem: 3,
          probability: 0.5632,
          multiplier: 1.7577,
        },
        {
          gem: 4,
          probability: 0.456,
          multiplier: 2.1713,
        },
        {
          gem: 5,
          probability: 0.3648,
          multiplier: 2.7141,
        },
        {
          gem: 6,
          probability: 0.288,
          multiplier: 3.4378,
        },
        {
          gem: 7,
          probability: 0.224,
          multiplier: 4.4201,
        },
        {
          gem: 8,
          probability: 0.1713,
          multiplier: 5.7801,
        },
        {
          gem: 9,
          probability: 0.1285,
          multiplier: 7.7068,
        },
        {
          gem: 10,
          probability: 0.0942,
          multiplier: 10.5092,
        },
        {
          gem: 11,
          probability: 0.0673,
          multiplier: 14.7129,
        },
        {
          gem: 12,
          probability: 0.0466,
          multiplier: 21.252,
        },
        {
          gem: 13,
          probability: 0.0311,
          multiplier: 31.878,
        },
        {
          gem: 14,
          probability: 0.0198,
          multiplier: 50.094,
        },
        {
          gem: 15,
          probability: 0.0119,
          multiplier: 83.49,
        },
        {
          gem: 16,
          probability: 0.0066,
          multiplier: 150.282,
        },
        {
          gem: 17,
          probability: 0.0033,
          multiplier: 300.564,
        },
        {
          gem: 18,
          probability: 0.0014,
          multiplier: 701.316,
        },
        {
          gem: 19,
          probability: 0.0005,
          multiplier: 2103.948,
        },
        {
          gem: 20,
          probability: 0.0001,
          multiplier: 10519.74,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7917,
          multiplier: 1.2505,
        },
        {
          gem: 2,
          probability: 0.6196,
          multiplier: 1.5979,
        },
        {
          gem: 3,
          probability: 0.4788,
          multiplier: 2.0679,
        },
        {
          gem: 4,
          probability: 0.3648,
          multiplier: 2.7141,
        },
        {
          gem: 5,
          probability: 0.2736,
          multiplier: 3.6188,
        },
        {
          gem: 6,
          probability: 0.2016,
          multiplier: 4.9112,
        },
        {
          gem: 7,
          probability: 0.1456,
          multiplier: 6.8001,
        },
        {
          gem: 8,
          probability: 0.1028,
          multiplier: 9.6335,
        },
        {
          gem: 9,
          probability: 0.0707,
          multiplier: 14.0123,
        },
        {
          gem: 10,
          probability: 0.0471,
          multiplier: 21.0185,
        },
        {
          gem: 11,
          probability: 0.0303,
          multiplier: 32.6954,
        },
        {
          gem: 12,
          probability: 0.0186,
          multiplier: 53.13,
        },
        {
          gem: 13,
          probability: 0.0109,
          multiplier: 91.08,
        },
        {
          gem: 14,
          probability: 0.0059,
          multiplier: 166.98,
        },
        {
          gem: 15,
          probability: 0.003,
          multiplier: 333.96,
        },
        {
          gem: 16,
          probability: 0.0013,
          multiplier: 751.41,
        },
        {
          gem: 17,
          probability: 0.0005,
          multiplier: 2003.76,
        },
        {
          gem: 18,
          probability: 0.0001,
          multiplier: 7013.16,
        },
        {
          gem: 19,
          probability: 0,
          multiplier: 42078.96,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.75,
          multiplier: 1.32,
        },
        {
          gem: 2,
          probability: 0.5543,
          multiplier: 1.7859,
        },
        {
          gem: 3,
          probability: 0.4032,
          multiplier: 2.4556,
        },
        {
          gem: 4,
          probability: 0.288,
          multiplier: 3.4378,
        },
        {
          gem: 5,
          probability: 0.2016,
          multiplier: 4.9112,
        },
        {
          gem: 6,
          probability: 0.1379,
          multiplier: 7.1779,
        },
        {
          gem: 7,
          probability: 0.0919,
          multiplier: 10.7668,
        },
        {
          gem: 8,
          probability: 0.0595,
          multiplier: 16.6396,
        },
        {
          gem: 9,
          probability: 0.0372,
          multiplier: 26.6234,
        },
        {
          gem: 10,
          probability: 0.0223,
          multiplier: 44.3723,
        },
        {
          gem: 11,
          probability: 0.0127,
          multiplier: 77.6515,
        },
        {
          gem: 12,
          probability: 0.0069,
          multiplier: 144.21,
        },
        {
          gem: 13,
          probability: 0.0034,
          multiplier: 288.42,
        },
        {
          gem: 14,
          probability: 0.0016,
          multiplier: 634.524,
        },
        {
          gem: 15,
          probability: 0.0006,
          multiplier: 1586.31,
        },
        {
          gem: 16,
          probability: 0.0002,
          multiplier: 4758.93,
        },
        {
          gem: 17,
          probability: 0.0001,
          multiplier: 19035.72,
        },
        {
          gem: 18,
          probability: 0,
          multiplier: 133250.04,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7083,
          multiplier: 1.3976,
        },
        {
          gem: 2,
          probability: 0.4928,
          multiplier: 2.0091,
        },
        {
          gem: 3,
          probability: 0.336,
          multiplier: 2.9467,
        },
        {
          gem: 4,
          probability: 0.224,
          multiplier: 4.4201,
        },
        {
          gem: 5,
          probability: 0.1456,
          multiplier: 6.8001,
        },
        {
          gem: 6,
          probability: 0.0919,
          multiplier: 10.7668,
        },
        {
          gem: 7,
          probability: 0.0562,
          multiplier: 17.6184,
        },
        {
          gem: 8,
          probability: 0.0331,
          multiplier: 29.9513,
        },
        {
          gem: 9,
          probability: 0.0186,
          multiplier: 53.2468,
        },
        {
          gem: 10,
          probability: 0.0099,
          multiplier: 99.8377,
        },
        {
          gem: 11,
          probability: 0.005,
          multiplier: 199.6754,
        },
        {
          gem: 12,
          probability: 0.0023,
          multiplier: 432.63,
        },
        {
          gem: 13,
          probability: 0.001,
          multiplier: 1038.312,
        },
        {
          gem: 14,
          probability: 0.0003,
          multiplier: 2855.358,
        },
        {
          gem: 15,
          probability: 0.0001,
          multiplier: 9517.86,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 42830.37,
        },
        {
          gem: 17,
          probability: 0,
          multiplier: 342642.96,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6667,
          multiplier: 1.485,
        },
        {
          gem: 2,
          probability: 0.4348,
          multiplier: 2.277,
        },
        {
          gem: 3,
          probability: 0.2767,
          multiplier: 3.5781,
        },
        {
          gem: 4,
          probability: 0.1713,
          multiplier: 5.7801,
        },
        {
          gem: 5,
          probability: 0.1028,
          multiplier: 9.6335,
        },
        {
          gem: 6,
          probability: 0.0595,
          multiplier: 16.6396,
        },
        {
          gem: 7,
          probability: 0.0331,
          multiplier: 29.9513,
        },
        {
          gem: 8,
          probability: 0.0175,
          multiplier: 56.5747,
        },
        {
          gem: 9,
          probability: 0.0087,
          multiplier: 113.1494,
        },
        {
          gem: 10,
          probability: 0.0041,
          multiplier: 242.463,
        },
        {
          gem: 11,
          probability: 0.0017,
          multiplier: 565.7469,
        },
        {
          gem: 12,
          probability: 0.0007,
          multiplier: 1470.942,
        },
        {
          gem: 13,
          probability: 0.0002,
          multiplier: 4412.826,
        },
        {
          gem: 14,
          probability: 0.0001,
          multiplier: 16180.362,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 80901.81,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 728116.29,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.625,
          multiplier: 1.584,
        },
        {
          gem: 2,
          probability: 0.3804,
          multiplier: 2.6023,
        },
        {
          gem: 3,
          probability: 0.2248,
          multiplier: 4.4039,
        },
        {
          gem: 4,
          probability: 0.1285,
          multiplier: 7.7068,
        },
        {
          gem: 5,
          probability: 0.0707,
          multiplier: 14.0123,
        },
        {
          gem: 6,
          probability: 0.0372,
          multiplier: 26.6234,
        },
        {
          gem: 7,
          probability: 0.0186,
          multiplier: 53.2468,
        },
        {
          gem: 8,
          probability: 0.0087,
          multiplier: 113.1494,
        },
        {
          gem: 9,
          probability: 0.0038,
          multiplier: 258.6272,
        },
        {
          gem: 10,
          probability: 0.0015,
          multiplier: 646.5679,
        },
        {
          gem: 11,
          probability: 0.0005,
          multiplier: 1810.3902,
        },
        {
          gem: 12,
          probability: 0.0002,
          multiplier: 5883.768,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 23535.072,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 129442.896,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 1294428.96,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5833,
          multiplier: 1.6971,
        },
        {
          gem: 2,
          probability: 0.3297,
          multiplier: 3.0026,
        },
        {
          gem: 3,
          probability: 0.1798,
          multiplier: 5.5048,
        },
        {
          gem: 4,
          probability: 0.0942,
          multiplier: 10.5092,
        },
        {
          gem: 5,
          probability: 0.0471,
          multiplier: 21.0185,
        },
        {
          gem: 6,
          probability: 0.0223,
          multiplier: 44.3723,
        },
        {
          gem: 7,
          probability: 0.0099,
          multiplier: 99.8377,
        },
        {
          gem: 8,
          probability: 0.0041,
          multiplier: 242.463,
        },
        {
          gem: 9,
          probability: 0.0015,
          multiplier: 646.5679,
        },
        {
          gem: 10,
          probability: 0.0005,
          multiplier: 1939.7037,
        },
        {
          gem: 11,
          probability: 0.0001,
          multiplier: 6788.9631,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 29418.84,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 176513.04,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 1941643.44,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5417,
          multiplier: 1.8277,
        },
        {
          gem: 2,
          probability: 0.2826,
          multiplier: 3.5031,
        },
        {
          gem: 3,
          probability: 0.1413,
          multiplier: 7.0062,
        },
        {
          gem: 4,
          probability: 0.0673,
          multiplier: 14.7129,
        },
        {
          gem: 5,
          probability: 0.0303,
          multiplier: 32.6954,
        },
        {
          gem: 6,
          probability: 0.0127,
          multiplier: 77.6515,
        },
        {
          gem: 7,
          probability: 0.005,
          multiplier: 199.6754,
        },
        {
          gem: 8,
          probability: 0.0017,
          multiplier: 565.7469,
        },
        {
          gem: 9,
          probability: 0.0005,
          multiplier: 1810.3902,
        },
        {
          gem: 10,
          probability: 0.0001,
          multiplier: 6788.9631,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 31681.8277,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 205931.88,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 2471182.56,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5,
          multiplier: 1.98,
        },
        {
          gem: 2,
          probability: 0.2391,
          multiplier: 4.14,
        },
        {
          gem: 3,
          probability: 0.1087,
          multiplier: 9.108,
        },
        {
          gem: 4,
          probability: 0.0466,
          multiplier: 21.252,
        },
        {
          gem: 5,
          probability: 0.0186,
          multiplier: 53.13,
        },
        {
          gem: 6,
          probability: 0.0069,
          multiplier: 144.21,
        },
        {
          gem: 7,
          probability: 0.0023,
          multiplier: 432.63,
        },
        {
          gem: 8,
          probability: 0.0007,
          multiplier: 1470.942,
        },
        {
          gem: 9,
          probability: 0.0002,
          multiplier: 5883.768,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 29418.84,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 205931.88,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 2677114.44,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4583,
          multiplier: 2.16,
        },
        {
          gem: 2,
          probability: 0.1993,
          multiplier: 4.968,
        },
        {
          gem: 3,
          probability: 0.0815,
          multiplier: 12.144,
        },
        {
          gem: 4,
          probability: 0.0311,
          multiplier: 31.878,
        },
        {
          gem: 5,
          probability: 0.0109,
          multiplier: 91.08,
        },
        {
          gem: 6,
          probability: 0.0034,
          multiplier: 288.42,
        },
        {
          gem: 7,
          probability: 0.001,
          multiplier: 1038.312,
        },
        {
          gem: 8,
          probability: 0.0002,
          multiplier: 4412.826,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 23535.072,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 176513.04,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 2471182.56,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4167,
          multiplier: 2.376,
        },
        {
          gem: 2,
          probability: 0.163,
          multiplier: 6.072,
        },
        {
          gem: 3,
          probability: 0.0593,
          multiplier: 16.698,
        },
        {
          gem: 4,
          probability: 0.0198,
          multiplier: 50.094,
        },
        {
          gem: 5,
          probability: 0.0059,
          multiplier: 166.98,
        },
        {
          gem: 6,
          probability: 0.0016,
          multiplier: 634.524,
        },
        {
          gem: 7,
          probability: 0.0003,
          multiplier: 2855.358,
        },
        {
          gem: 8,
          probability: 0.0001,
          multiplier: 16180.362,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 129442.896,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 1941643.44,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.375,
          multiplier: 2.64,
        },
        {
          gem: 2,
          probability: 0.1304,
          multiplier: 7.59,
        },
        {
          gem: 3,
          probability: 0.0415,
          multiplier: 23.8543,
        },
        {
          gem: 4,
          probability: 0.0119,
          multiplier: 83.49,
        },
        {
          gem: 5,
          probability: 0.003,
          multiplier: 333.96,
        },
        {
          gem: 6,
          probability: 0.0006,
          multiplier: 1586.31,
        },
        {
          gem: 7,
          probability: 0.0001,
          multiplier: 9517.86,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 80901.81,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 1294428.96,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.3333,
          multiplier: 2.97,
        },
        {
          gem: 2,
          probability: 0.1014,
          multiplier: 9.7586,
        },
        {
          gem: 3,
          probability: 0.0277,
          multiplier: 35.7814,
        },
        {
          gem: 4,
          probability: 0.0066,
          multiplier: 150.282,
        },
        {
          gem: 5,
          probability: 0.0013,
          multiplier: 751.41,
        },
        {
          gem: 6,
          probability: 0.0002,
          multiplier: 4758.93,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 42830.37,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 728116.29,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2917,
          multiplier: 3.3943,
        },
        {
          gem: 2,
          probability: 0.0761,
          multiplier: 13.0114,
        },
        {
          gem: 3,
          probability: 0.0173,
          multiplier: 57.2503,
        },
        {
          gem: 4,
          probability: 0.0033,
          multiplier: 300.564,
        },
        {
          gem: 5,
          probability: 0.0005,
          multiplier: 2003.76,
        },
        {
          gem: 6,
          probability: 0.0001,
          multiplier: 19035.72,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 342642.96,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.25,
          multiplier: 3.96,
        },
        {
          gem: 2,
          probability: 0.0543,
          multiplier: 18.216,
        },
        {
          gem: 3,
          probability: 0.0099,
          multiplier: 100.188,
        },
        {
          gem: 4,
          probability: 0.0014,
          multiplier: 701.316,
        },
        {
          gem: 5,
          probability: 0.0001,
          multiplier: 7013.16,
        },
        {
          gem: 6,
          probability: 0,
          multiplier: 133250.04,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2083,
          multiplier: 4.752,
        },
        {
          gem: 2,
          probability: 0.0362,
          multiplier: 27.324,
        },
        {
          gem: 3,
          probability: 0.0049,
          multiplier: 200.376,
        },
        {
          gem: 4,
          probability: 0.0005,
          multiplier: 2103.948,
        },
        {
          gem: 5,
          probability: 0,
          multiplier: 42078.96,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.1667,
          multiplier: 5.94,
        },
        {
          gem: 2,
          probability: 0.0217,
          multiplier: 45.54,
        },
        {
          gem: 3,
          probability: 0.002,
          multiplier: 500.94,
        },
        {
          gem: 4,
          probability: 0.0001,
          multiplier: 10519.74,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.125,
          multiplier: 7.92,
        },
        {
          gem: 2,
          probability: 0.0109,
          multiplier: 91.08,
        },
        {
          gem: 3,
          probability: 0.0005,
          multiplier: 2003.76,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0833,
          multiplier: 11.88,
        },
        {
          gem: 2,
          probability: 0.0036,
          multiplier: 273.24,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0417,
          multiplier: 23.76,
        },
      ],
    ],
  },
  '3': {
    rtp: 97,
    multiplierMap: [
      [
        {
          gem: 1,
          probability: 0.9583,
          multiplier: 1.0122,
        },
        {
          gem: 2,
          probability: 0.9167,
          multiplier: 1.0582,
        },
        {
          gem: 3,
          probability: 0.875,
          multiplier: 1.1086,
        },
        {
          gem: 4,
          probability: 0.8333,
          multiplier: 1.164,
        },
        {
          gem: 5,
          probability: 0.7917,
          multiplier: 1.2253,
        },
        {
          gem: 6,
          probability: 0.75,
          multiplier: 1.2933,
        },
        {
          gem: 7,
          probability: 0.7083,
          multiplier: 1.3694,
        },
        {
          gem: 8,
          probability: 0.6667,
          multiplier: 1.455,
        },
        {
          gem: 9,
          probability: 0.625,
          multiplier: 1.552,
        },
        {
          gem: 10,
          probability: 0.5833,
          multiplier: 1.6629,
        },
        {
          gem: 11,
          probability: 0.5417,
          multiplier: 1.7908,
        },
        {
          gem: 12,
          probability: 0.5,
          multiplier: 1.94,
        },
        {
          gem: 13,
          probability: 0.4583,
          multiplier: 2.1164,
        },
        {
          gem: 14,
          probability: 0.4167,
          multiplier: 2.328,
        },
        {
          gem: 15,
          probability: 0.375,
          multiplier: 2.5867,
        },
        {
          gem: 16,
          probability: 0.3333,
          multiplier: 2.91,
        },
        {
          gem: 17,
          probability: 0.2917,
          multiplier: 3.3257,
        },
        {
          gem: 18,
          probability: 0.25,
          multiplier: 3.88,
        },
        {
          gem: 19,
          probability: 0.2083,
          multiplier: 4.656,
        },
        {
          gem: 20,
          probability: 0.1667,
          multiplier: 5.82,
        },
        {
          gem: 21,
          probability: 0.125,
          multiplier: 7.76,
        },
        {
          gem: 22,
          probability: 0.0833,
          multiplier: 11.64,
        },
        {
          gem: 23,
          probability: 0.0417,
          multiplier: 23.28,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.9167,
          multiplier: 1.0582,
        },
        {
          gem: 2,
          probability: 0.837,
          multiplier: 1.159,
        },
        {
          gem: 3,
          probability: 0.7609,
          multiplier: 1.2749,
        },
        {
          gem: 4,
          probability: 0.6884,
          multiplier: 1.4091,
        },
        {
          gem: 5,
          probability: 0.6196,
          multiplier: 1.5656,
        },
        {
          gem: 6,
          probability: 0.5543,
          multiplier: 1.7498,
        },
        {
          gem: 7,
          probability: 0.4928,
          multiplier: 1.9685,
        },
        {
          gem: 8,
          probability: 0.4348,
          multiplier: 2.231,
        },
        {
          gem: 9,
          probability: 0.3804,
          multiplier: 2.5497,
        },
        {
          gem: 10,
          probability: 0.3297,
          multiplier: 2.942,
        },
        {
          gem: 11,
          probability: 0.2826,
          multiplier: 3.4323,
        },
        {
          gem: 12,
          probability: 0.2391,
          multiplier: 4.0564,
        },
        {
          gem: 13,
          probability: 0.1993,
          multiplier: 4.8676,
        },
        {
          gem: 14,
          probability: 0.163,
          multiplier: 5.9493,
        },
        {
          gem: 15,
          probability: 0.1304,
          multiplier: 7.4367,
        },
        {
          gem: 16,
          probability: 0.1014,
          multiplier: 9.5614,
        },
        {
          gem: 17,
          probability: 0.0761,
          multiplier: 12.7486,
        },
        {
          gem: 18,
          probability: 0.0543,
          multiplier: 17.848,
        },
        {
          gem: 19,
          probability: 0.0362,
          multiplier: 26.772,
        },
        {
          gem: 20,
          probability: 0.0217,
          multiplier: 44.62,
        },
        {
          gem: 21,
          probability: 0.0109,
          multiplier: 89.24,
        },
        {
          gem: 22,
          probability: 0.0036,
          multiplier: 267.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.875,
          multiplier: 1.1086,
        },
        {
          gem: 2,
          probability: 0.7609,
          multiplier: 1.2749,
        },
        {
          gem: 3,
          probability: 0.6571,
          multiplier: 1.4762,
        },
        {
          gem: 4,
          probability: 0.5632,
          multiplier: 1.7222,
        },
        {
          gem: 5,
          probability: 0.4788,
          multiplier: 2.0261,
        },
        {
          gem: 6,
          probability: 0.4032,
          multiplier: 2.406,
        },
        {
          gem: 7,
          probability: 0.336,
          multiplier: 2.8872,
        },
        {
          gem: 8,
          probability: 0.2767,
          multiplier: 3.5059,
        },
        {
          gem: 9,
          probability: 0.2248,
          multiplier: 4.3149,
        },
        {
          gem: 10,
          probability: 0.1798,
          multiplier: 5.3936,
        },
        {
          gem: 11,
          probability: 0.1413,
          multiplier: 6.8646,
        },
        {
          gem: 12,
          probability: 0.1087,
          multiplier: 8.924,
        },
        {
          gem: 13,
          probability: 0.0815,
          multiplier: 11.8987,
        },
        {
          gem: 14,
          probability: 0.0593,
          multiplier: 16.3607,
        },
        {
          gem: 15,
          probability: 0.0415,
          multiplier: 23.3724,
        },
        {
          gem: 16,
          probability: 0.0277,
          multiplier: 35.0586,
        },
        {
          gem: 17,
          probability: 0.0173,
          multiplier: 56.0937,
        },
        {
          gem: 18,
          probability: 0.0099,
          multiplier: 98.164,
        },
        {
          gem: 19,
          probability: 0.0049,
          multiplier: 196.328,
        },
        {
          gem: 20,
          probability: 0.002,
          multiplier: 490.82,
        },
        {
          gem: 21,
          probability: 0.0005,
          multiplier: 1963.28,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8333,
          multiplier: 1.164,
        },
        {
          gem: 2,
          probability: 0.6884,
          multiplier: 1.4091,
        },
        {
          gem: 3,
          probability: 0.5632,
          multiplier: 1.7222,
        },
        {
          gem: 4,
          probability: 0.456,
          multiplier: 2.1274,
        },
        {
          gem: 5,
          probability: 0.3648,
          multiplier: 2.6592,
        },
        {
          gem: 6,
          probability: 0.288,
          multiplier: 3.3684,
        },
        {
          gem: 7,
          probability: 0.224,
          multiplier: 4.3308,
        },
        {
          gem: 8,
          probability: 0.1713,
          multiplier: 5.6633,
        },
        {
          gem: 9,
          probability: 0.1285,
          multiplier: 7.5511,
        },
        {
          gem: 10,
          probability: 0.0942,
          multiplier: 10.2969,
        },
        {
          gem: 11,
          probability: 0.0673,
          multiplier: 14.4157,
        },
        {
          gem: 12,
          probability: 0.0466,
          multiplier: 20.8227,
        },
        {
          gem: 13,
          probability: 0.0311,
          multiplier: 31.234,
        },
        {
          gem: 14,
          probability: 0.0198,
          multiplier: 49.082,
        },
        {
          gem: 15,
          probability: 0.0119,
          multiplier: 81.8033,
        },
        {
          gem: 16,
          probability: 0.0066,
          multiplier: 147.246,
        },
        {
          gem: 17,
          probability: 0.0033,
          multiplier: 294.492,
        },
        {
          gem: 18,
          probability: 0.0014,
          multiplier: 687.148,
        },
        {
          gem: 19,
          probability: 0.0005,
          multiplier: 2061.444,
        },
        {
          gem: 20,
          probability: 0.0001,
          multiplier: 10307.22,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7917,
          multiplier: 1.2253,
        },
        {
          gem: 2,
          probability: 0.6196,
          multiplier: 1.5656,
        },
        {
          gem: 3,
          probability: 0.4788,
          multiplier: 2.0261,
        },
        {
          gem: 4,
          probability: 0.3648,
          multiplier: 2.6592,
        },
        {
          gem: 5,
          probability: 0.2736,
          multiplier: 3.5457,
        },
        {
          gem: 6,
          probability: 0.2016,
          multiplier: 4.812,
        },
        {
          gem: 7,
          probability: 0.1456,
          multiplier: 6.6627,
        },
        {
          gem: 8,
          probability: 0.1028,
          multiplier: 9.4388,
        },
        {
          gem: 9,
          probability: 0.0707,
          multiplier: 13.7292,
        },
        {
          gem: 10,
          probability: 0.0471,
          multiplier: 20.5938,
        },
        {
          gem: 11,
          probability: 0.0303,
          multiplier: 32.0349,
        },
        {
          gem: 12,
          probability: 0.0186,
          multiplier: 52.0567,
        },
        {
          gem: 13,
          probability: 0.0109,
          multiplier: 89.24,
        },
        {
          gem: 14,
          probability: 0.0059,
          multiplier: 163.6067,
        },
        {
          gem: 15,
          probability: 0.003,
          multiplier: 327.2133,
        },
        {
          gem: 16,
          probability: 0.0013,
          multiplier: 736.23,
        },
        {
          gem: 17,
          probability: 0.0005,
          multiplier: 1963.28,
        },
        {
          gem: 18,
          probability: 0.0001,
          multiplier: 6871.48,
        },
        {
          gem: 19,
          probability: 0,
          multiplier: 41228.88,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.75,
          multiplier: 1.2933,
        },
        {
          gem: 2,
          probability: 0.5543,
          multiplier: 1.7498,
        },
        {
          gem: 3,
          probability: 0.4032,
          multiplier: 2.406,
        },
        {
          gem: 4,
          probability: 0.288,
          multiplier: 3.3684,
        },
        {
          gem: 5,
          probability: 0.2016,
          multiplier: 4.812,
        },
        {
          gem: 6,
          probability: 0.1379,
          multiplier: 7.0329,
        },
        {
          gem: 7,
          probability: 0.0919,
          multiplier: 10.5493,
        },
        {
          gem: 8,
          probability: 0.0595,
          multiplier: 16.3035,
        },
        {
          gem: 9,
          probability: 0.0372,
          multiplier: 26.0855,
        },
        {
          gem: 10,
          probability: 0.0223,
          multiplier: 43.4759,
        },
        {
          gem: 11,
          probability: 0.0127,
          multiplier: 76.0828,
        },
        {
          gem: 12,
          probability: 0.0069,
          multiplier: 141.2967,
        },
        {
          gem: 13,
          probability: 0.0034,
          multiplier: 282.5933,
        },
        {
          gem: 14,
          probability: 0.0016,
          multiplier: 621.7053,
        },
        {
          gem: 15,
          probability: 0.0006,
          multiplier: 1554.2633,
        },
        {
          gem: 16,
          probability: 0.0002,
          multiplier: 4662.79,
        },
        {
          gem: 17,
          probability: 0.0001,
          multiplier: 18651.16,
        },
        {
          gem: 18,
          probability: 0,
          multiplier: 130558.12,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7083,
          multiplier: 1.3694,
        },
        {
          gem: 2,
          probability: 0.4928,
          multiplier: 1.9685,
        },
        {
          gem: 3,
          probability: 0.336,
          multiplier: 2.8872,
        },
        {
          gem: 4,
          probability: 0.224,
          multiplier: 4.3308,
        },
        {
          gem: 5,
          probability: 0.1456,
          multiplier: 6.6627,
        },
        {
          gem: 6,
          probability: 0.0919,
          multiplier: 10.5493,
        },
        {
          gem: 7,
          probability: 0.0562,
          multiplier: 17.2625,
        },
        {
          gem: 8,
          probability: 0.0331,
          multiplier: 29.3462,
        },
        {
          gem: 9,
          probability: 0.0186,
          multiplier: 52.1711,
        },
        {
          gem: 10,
          probability: 0.0099,
          multiplier: 97.8208,
        },
        {
          gem: 11,
          probability: 0.005,
          multiplier: 195.6415,
        },
        {
          gem: 12,
          probability: 0.0023,
          multiplier: 423.89,
        },
        {
          gem: 13,
          probability: 0.001,
          multiplier: 1017.336,
        },
        {
          gem: 14,
          probability: 0.0003,
          multiplier: 2797.674,
        },
        {
          gem: 15,
          probability: 0.0001,
          multiplier: 9325.58,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 41965.11,
        },
        {
          gem: 17,
          probability: 0,
          multiplier: 335720.88,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6667,
          multiplier: 1.455,
        },
        {
          gem: 2,
          probability: 0.4348,
          multiplier: 2.231,
        },
        {
          gem: 3,
          probability: 0.2767,
          multiplier: 3.5059,
        },
        {
          gem: 4,
          probability: 0.1713,
          multiplier: 5.6633,
        },
        {
          gem: 5,
          probability: 0.1028,
          multiplier: 9.4388,
        },
        {
          gem: 6,
          probability: 0.0595,
          multiplier: 16.3035,
        },
        {
          gem: 7,
          probability: 0.0331,
          multiplier: 29.3462,
        },
        {
          gem: 8,
          probability: 0.0175,
          multiplier: 55.4318,
        },
        {
          gem: 9,
          probability: 0.0087,
          multiplier: 110.8635,
        },
        {
          gem: 10,
          probability: 0.0041,
          multiplier: 237.5647,
        },
        {
          gem: 11,
          probability: 0.0017,
          multiplier: 554.3177,
        },
        {
          gem: 12,
          probability: 0.0007,
          multiplier: 1441.226,
        },
        {
          gem: 13,
          probability: 0.0002,
          multiplier: 4323.678,
        },
        {
          gem: 14,
          probability: 0.0001,
          multiplier: 15853.486,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 79267.43,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 713406.87,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.625,
          multiplier: 1.552,
        },
        {
          gem: 2,
          probability: 0.3804,
          multiplier: 2.5497,
        },
        {
          gem: 3,
          probability: 0.2248,
          multiplier: 4.3149,
        },
        {
          gem: 4,
          probability: 0.1285,
          multiplier: 7.5511,
        },
        {
          gem: 5,
          probability: 0.0707,
          multiplier: 13.7292,
        },
        {
          gem: 6,
          probability: 0.0372,
          multiplier: 26.0855,
        },
        {
          gem: 7,
          probability: 0.0186,
          multiplier: 52.1711,
        },
        {
          gem: 8,
          probability: 0.0087,
          multiplier: 110.8635,
        },
        {
          gem: 9,
          probability: 0.0038,
          multiplier: 253.4024,
        },
        {
          gem: 10,
          probability: 0.0015,
          multiplier: 633.5059,
        },
        {
          gem: 11,
          probability: 0.0005,
          multiplier: 1773.8166,
        },
        {
          gem: 12,
          probability: 0.0002,
          multiplier: 5764.904,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 23059.616,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 126827.888,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 1268278.88,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5833,
          multiplier: 1.6629,
        },
        {
          gem: 2,
          probability: 0.3297,
          multiplier: 2.942,
        },
        {
          gem: 3,
          probability: 0.1798,
          multiplier: 5.3936,
        },
        {
          gem: 4,
          probability: 0.0942,
          multiplier: 10.2969,
        },
        {
          gem: 5,
          probability: 0.0471,
          multiplier: 20.5938,
        },
        {
          gem: 6,
          probability: 0.0223,
          multiplier: 43.4759,
        },
        {
          gem: 7,
          probability: 0.0099,
          multiplier: 97.8208,
        },
        {
          gem: 8,
          probability: 0.0041,
          multiplier: 237.5647,
        },
        {
          gem: 9,
          probability: 0.0015,
          multiplier: 633.5059,
        },
        {
          gem: 10,
          probability: 0.0005,
          multiplier: 1900.5178,
        },
        {
          gem: 11,
          probability: 0.0001,
          multiplier: 6651.8123,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 28824.52,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 172947.12,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 1902418.32,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5417,
          multiplier: 1.7908,
        },
        {
          gem: 2,
          probability: 0.2826,
          multiplier: 3.4323,
        },
        {
          gem: 3,
          probability: 0.1413,
          multiplier: 6.8646,
        },
        {
          gem: 4,
          probability: 0.0673,
          multiplier: 14.4157,
        },
        {
          gem: 5,
          probability: 0.0303,
          multiplier: 32.0349,
        },
        {
          gem: 6,
          probability: 0.0127,
          multiplier: 76.0828,
        },
        {
          gem: 7,
          probability: 0.005,
          multiplier: 195.6415,
        },
        {
          gem: 8,
          probability: 0.0017,
          multiplier: 554.3177,
        },
        {
          gem: 9,
          probability: 0.0005,
          multiplier: 1773.8166,
        },
        {
          gem: 10,
          probability: 0.0001,
          multiplier: 6651.8123,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 31041.7908,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 201771.64,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 2421259.68,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5,
          multiplier: 1.94,
        },
        {
          gem: 2,
          probability: 0.2391,
          multiplier: 4.0564,
        },
        {
          gem: 3,
          probability: 0.1087,
          multiplier: 8.924,
        },
        {
          gem: 4,
          probability: 0.0466,
          multiplier: 20.8227,
        },
        {
          gem: 5,
          probability: 0.0186,
          multiplier: 52.0567,
        },
        {
          gem: 6,
          probability: 0.0069,
          multiplier: 141.2967,
        },
        {
          gem: 7,
          probability: 0.0023,
          multiplier: 423.89,
        },
        {
          gem: 8,
          probability: 0.0007,
          multiplier: 1441.226,
        },
        {
          gem: 9,
          probability: 0.0002,
          multiplier: 5764.904,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 28824.52,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 201771.64,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 2623031.32,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4583,
          multiplier: 2.1164,
        },
        {
          gem: 2,
          probability: 0.1993,
          multiplier: 4.8676,
        },
        {
          gem: 3,
          probability: 0.0815,
          multiplier: 11.8987,
        },
        {
          gem: 4,
          probability: 0.0311,
          multiplier: 31.234,
        },
        {
          gem: 5,
          probability: 0.0109,
          multiplier: 89.24,
        },
        {
          gem: 6,
          probability: 0.0034,
          multiplier: 282.5933,
        },
        {
          gem: 7,
          probability: 0.001,
          multiplier: 1017.336,
        },
        {
          gem: 8,
          probability: 0.0002,
          multiplier: 4323.678,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 23059.616,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 172947.12,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 2421259.68,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4167,
          multiplier: 2.328,
        },
        {
          gem: 2,
          probability: 0.163,
          multiplier: 5.9493,
        },
        {
          gem: 3,
          probability: 0.0593,
          multiplier: 16.3607,
        },
        {
          gem: 4,
          probability: 0.0198,
          multiplier: 49.082,
        },
        {
          gem: 5,
          probability: 0.0059,
          multiplier: 163.6067,
        },
        {
          gem: 6,
          probability: 0.0016,
          multiplier: 621.7053,
        },
        {
          gem: 7,
          probability: 0.0003,
          multiplier: 2797.674,
        },
        {
          gem: 8,
          probability: 0.0001,
          multiplier: 15853.486,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 126827.888,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 1902418.32,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.375,
          multiplier: 2.5867,
        },
        {
          gem: 2,
          probability: 0.1304,
          multiplier: 7.4367,
        },
        {
          gem: 3,
          probability: 0.0415,
          multiplier: 23.3724,
        },
        {
          gem: 4,
          probability: 0.0119,
          multiplier: 81.8033,
        },
        {
          gem: 5,
          probability: 0.003,
          multiplier: 327.2133,
        },
        {
          gem: 6,
          probability: 0.0006,
          multiplier: 1554.2633,
        },
        {
          gem: 7,
          probability: 0.0001,
          multiplier: 9325.58,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 79267.43,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 1268278.88,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.3333,
          multiplier: 2.91,
        },
        {
          gem: 2,
          probability: 0.1014,
          multiplier: 9.5614,
        },
        {
          gem: 3,
          probability: 0.0277,
          multiplier: 35.0586,
        },
        {
          gem: 4,
          probability: 0.0066,
          multiplier: 147.246,
        },
        {
          gem: 5,
          probability: 0.0013,
          multiplier: 736.23,
        },
        {
          gem: 6,
          probability: 0.0002,
          multiplier: 4662.79,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 41965.11,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 713406.87,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2917,
          multiplier: 3.3257,
        },
        {
          gem: 2,
          probability: 0.0761,
          multiplier: 12.7486,
        },
        {
          gem: 3,
          probability: 0.0173,
          multiplier: 56.0937,
        },
        {
          gem: 4,
          probability: 0.0033,
          multiplier: 294.492,
        },
        {
          gem: 5,
          probability: 0.0005,
          multiplier: 1963.28,
        },
        {
          gem: 6,
          probability: 0.0001,
          multiplier: 18651.16,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 335720.88,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.25,
          multiplier: 3.88,
        },
        {
          gem: 2,
          probability: 0.0543,
          multiplier: 17.848,
        },
        {
          gem: 3,
          probability: 0.0099,
          multiplier: 98.164,
        },
        {
          gem: 4,
          probability: 0.0014,
          multiplier: 687.148,
        },
        {
          gem: 5,
          probability: 0.0001,
          multiplier: 6871.48,
        },
        {
          gem: 6,
          probability: 0,
          multiplier: 130558.12,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2083,
          multiplier: 4.656,
        },
        {
          gem: 2,
          probability: 0.0362,
          multiplier: 26.772,
        },
        {
          gem: 3,
          probability: 0.0049,
          multiplier: 196.328,
        },
        {
          gem: 4,
          probability: 0.0005,
          multiplier: 2061.444,
        },
        {
          gem: 5,
          probability: 0,
          multiplier: 41228.88,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.1667,
          multiplier: 5.82,
        },
        {
          gem: 2,
          probability: 0.0217,
          multiplier: 44.62,
        },
        {
          gem: 3,
          probability: 0.002,
          multiplier: 490.82,
        },
        {
          gem: 4,
          probability: 0.0001,
          multiplier: 10307.22,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.125,
          multiplier: 7.76,
        },
        {
          gem: 2,
          probability: 0.0109,
          multiplier: 89.24,
        },
        {
          gem: 3,
          probability: 0.0005,
          multiplier: 1963.28,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0833,
          multiplier: 11.64,
        },
        {
          gem: 2,
          probability: 0.0036,
          multiplier: 267.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0417,
          multiplier: 23.28,
        },
      ],
    ],
  },
  '5': {
    rtp: 95,
    multiplierMap: [
      [
        {
          gem: 1,
          probability: 0.9583,
          multiplier: 0.9913,
        },
        {
          gem: 2,
          probability: 0.9167,
          multiplier: 1.0364,
        },
        {
          gem: 3,
          probability: 0.875,
          multiplier: 1.0857,
        },
        {
          gem: 4,
          probability: 0.8333,
          multiplier: 1.14,
        },
        {
          gem: 5,
          probability: 0.7917,
          multiplier: 1.2,
        },
        {
          gem: 6,
          probability: 0.75,
          multiplier: 1.2667,
        },
        {
          gem: 7,
          probability: 0.7083,
          multiplier: 1.3412,
        },
        {
          gem: 8,
          probability: 0.6667,
          multiplier: 1.425,
        },
        {
          gem: 9,
          probability: 0.625,
          multiplier: 1.52,
        },
        {
          gem: 10,
          probability: 0.5833,
          multiplier: 1.6286,
        },
        {
          gem: 11,
          probability: 0.5417,
          multiplier: 1.7538,
        },
        {
          gem: 12,
          probability: 0.5,
          multiplier: 1.9,
        },
        {
          gem: 13,
          probability: 0.4583,
          multiplier: 2.0727,
        },
        {
          gem: 14,
          probability: 0.4167,
          multiplier: 2.28,
        },
        {
          gem: 15,
          probability: 0.375,
          multiplier: 2.5333,
        },
        {
          gem: 16,
          probability: 0.3333,
          multiplier: 2.85,
        },
        {
          gem: 17,
          probability: 0.2917,
          multiplier: 3.2571,
        },
        {
          gem: 18,
          probability: 0.25,
          multiplier: 3.8,
        },
        {
          gem: 19,
          probability: 0.2083,
          multiplier: 4.56,
        },
        {
          gem: 20,
          probability: 0.1667,
          multiplier: 5.7,
        },
        {
          gem: 21,
          probability: 0.125,
          multiplier: 7.6,
        },
        {
          gem: 22,
          probability: 0.0833,
          multiplier: 11.4,
        },
        {
          gem: 23,
          probability: 0.0417,
          multiplier: 22.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.9167,
          multiplier: 1.0364,
        },
        {
          gem: 2,
          probability: 0.837,
          multiplier: 1.1351,
        },
        {
          gem: 3,
          probability: 0.7609,
          multiplier: 1.2486,
        },
        {
          gem: 4,
          probability: 0.6884,
          multiplier: 1.38,
        },
        {
          gem: 5,
          probability: 0.6196,
          multiplier: 1.5333,
        },
        {
          gem: 6,
          probability: 0.5543,
          multiplier: 1.7137,
        },
        {
          gem: 7,
          probability: 0.4928,
          multiplier: 1.9279,
        },
        {
          gem: 8,
          probability: 0.4348,
          multiplier: 2.185,
        },
        {
          gem: 9,
          probability: 0.3804,
          multiplier: 2.4971,
        },
        {
          gem: 10,
          probability: 0.3297,
          multiplier: 2.8813,
        },
        {
          gem: 11,
          probability: 0.2826,
          multiplier: 3.3615,
        },
        {
          gem: 12,
          probability: 0.2391,
          multiplier: 3.9727,
        },
        {
          gem: 13,
          probability: 0.1993,
          multiplier: 4.7673,
        },
        {
          gem: 14,
          probability: 0.163,
          multiplier: 5.8267,
        },
        {
          gem: 15,
          probability: 0.1304,
          multiplier: 7.2833,
        },
        {
          gem: 16,
          probability: 0.1014,
          multiplier: 9.3643,
        },
        {
          gem: 17,
          probability: 0.0761,
          multiplier: 12.4857,
        },
        {
          gem: 18,
          probability: 0.0543,
          multiplier: 17.48,
        },
        {
          gem: 19,
          probability: 0.0362,
          multiplier: 26.22,
        },
        {
          gem: 20,
          probability: 0.0217,
          multiplier: 43.7,
        },
        {
          gem: 21,
          probability: 0.0109,
          multiplier: 87.4,
        },
        {
          gem: 22,
          probability: 0.0036,
          multiplier: 262.2,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.875,
          multiplier: 1.0857,
        },
        {
          gem: 2,
          probability: 0.7609,
          multiplier: 1.2486,
        },
        {
          gem: 3,
          probability: 0.6571,
          multiplier: 1.4457,
        },
        {
          gem: 4,
          probability: 0.5632,
          multiplier: 1.6867,
        },
        {
          gem: 5,
          probability: 0.4788,
          multiplier: 1.9843,
        },
        {
          gem: 6,
          probability: 0.4032,
          multiplier: 2.3564,
        },
        {
          gem: 7,
          probability: 0.336,
          multiplier: 2.8276,
        },
        {
          gem: 8,
          probability: 0.2767,
          multiplier: 3.4336,
        },
        {
          gem: 9,
          probability: 0.2248,
          multiplier: 4.2259,
        },
        {
          gem: 10,
          probability: 0.1798,
          multiplier: 5.2824,
        },
        {
          gem: 11,
          probability: 0.1413,
          multiplier: 6.7231,
        },
        {
          gem: 12,
          probability: 0.1087,
          multiplier: 8.74,
        },
        {
          gem: 13,
          probability: 0.0815,
          multiplier: 11.6533,
        },
        {
          gem: 14,
          probability: 0.0593,
          multiplier: 16.0233,
        },
        {
          gem: 15,
          probability: 0.0415,
          multiplier: 22.8905,
        },
        {
          gem: 16,
          probability: 0.0277,
          multiplier: 34.3357,
        },
        {
          gem: 17,
          probability: 0.0173,
          multiplier: 54.9371,
        },
        {
          gem: 18,
          probability: 0.0099,
          multiplier: 96.14,
        },
        {
          gem: 19,
          probability: 0.0049,
          multiplier: 192.28,
        },
        {
          gem: 20,
          probability: 0.002,
          multiplier: 480.7,
        },
        {
          gem: 21,
          probability: 0.0005,
          multiplier: 1922.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8333,
          multiplier: 1.14,
        },
        {
          gem: 2,
          probability: 0.6884,
          multiplier: 1.38,
        },
        {
          gem: 3,
          probability: 0.5632,
          multiplier: 1.6867,
        },
        {
          gem: 4,
          probability: 0.456,
          multiplier: 2.0835,
        },
        {
          gem: 5,
          probability: 0.3648,
          multiplier: 2.6044,
        },
        {
          gem: 6,
          probability: 0.288,
          multiplier: 3.2989,
        },
        {
          gem: 7,
          probability: 0.224,
          multiplier: 4.2415,
        },
        {
          gem: 8,
          probability: 0.1713,
          multiplier: 5.5465,
        },
        {
          gem: 9,
          probability: 0.1285,
          multiplier: 7.3954,
        },
        {
          gem: 10,
          probability: 0.0942,
          multiplier: 10.0846,
        },
        {
          gem: 11,
          probability: 0.0673,
          multiplier: 14.1185,
        },
        {
          gem: 12,
          probability: 0.0466,
          multiplier: 20.3933,
        },
        {
          gem: 13,
          probability: 0.0311,
          multiplier: 30.59,
        },
        {
          gem: 14,
          probability: 0.0198,
          multiplier: 48.07,
        },
        {
          gem: 15,
          probability: 0.0119,
          multiplier: 80.1167,
        },
        {
          gem: 16,
          probability: 0.0066,
          multiplier: 144.21,
        },
        {
          gem: 17,
          probability: 0.0033,
          multiplier: 288.42,
        },
        {
          gem: 18,
          probability: 0.0014,
          multiplier: 672.98,
        },
        {
          gem: 19,
          probability: 0.0005,
          multiplier: 2018.94,
        },
        {
          gem: 20,
          probability: 0.0001,
          multiplier: 10094.7,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7917,
          multiplier: 1.2,
        },
        {
          gem: 2,
          probability: 0.6196,
          multiplier: 1.5333,
        },
        {
          gem: 3,
          probability: 0.4788,
          multiplier: 1.9843,
        },
        {
          gem: 4,
          probability: 0.3648,
          multiplier: 2.6044,
        },
        {
          gem: 5,
          probability: 0.2736,
          multiplier: 3.4725,
        },
        {
          gem: 6,
          probability: 0.2016,
          multiplier: 4.7127,
        },
        {
          gem: 7,
          probability: 0.1456,
          multiplier: 6.5253,
        },
        {
          gem: 8,
          probability: 0.1028,
          multiplier: 9.2442,
        },
        {
          gem: 9,
          probability: 0.0707,
          multiplier: 13.4462,
        },
        {
          gem: 10,
          probability: 0.0471,
          multiplier: 20.1692,
        },
        {
          gem: 11,
          probability: 0.0303,
          multiplier: 31.3744,
        },
        {
          gem: 12,
          probability: 0.0186,
          multiplier: 50.9833,
        },
        {
          gem: 13,
          probability: 0.0109,
          multiplier: 87.4,
        },
        {
          gem: 14,
          probability: 0.0059,
          multiplier: 160.2333,
        },
        {
          gem: 15,
          probability: 0.003,
          multiplier: 320.4667,
        },
        {
          gem: 16,
          probability: 0.0013,
          multiplier: 721.05,
        },
        {
          gem: 17,
          probability: 0.0005,
          multiplier: 1922.8,
        },
        {
          gem: 18,
          probability: 0.0001,
          multiplier: 6729.8,
        },
        {
          gem: 19,
          probability: 0,
          multiplier: 40378.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.75,
          multiplier: 1.2667,
        },
        {
          gem: 2,
          probability: 0.5543,
          multiplier: 1.7137,
        },
        {
          gem: 3,
          probability: 0.4032,
          multiplier: 2.3564,
        },
        {
          gem: 4,
          probability: 0.288,
          multiplier: 3.2989,
        },
        {
          gem: 5,
          probability: 0.2016,
          multiplier: 4.7127,
        },
        {
          gem: 6,
          probability: 0.1379,
          multiplier: 6.8879,
        },
        {
          gem: 7,
          probability: 0.0919,
          multiplier: 10.3318,
        },
        {
          gem: 8,
          probability: 0.0595,
          multiplier: 15.9673,
        },
        {
          gem: 9,
          probability: 0.0372,
          multiplier: 25.5477,
        },
        {
          gem: 10,
          probability: 0.0223,
          multiplier: 42.5795,
        },
        {
          gem: 11,
          probability: 0.0127,
          multiplier: 74.5141,
        },
        {
          gem: 12,
          probability: 0.0069,
          multiplier: 138.3833,
        },
        {
          gem: 13,
          probability: 0.0034,
          multiplier: 276.7667,
        },
        {
          gem: 14,
          probability: 0.0016,
          multiplier: 608.8867,
        },
        {
          gem: 15,
          probability: 0.0006,
          multiplier: 1522.2167,
        },
        {
          gem: 16,
          probability: 0.0002,
          multiplier: 4566.65,
        },
        {
          gem: 17,
          probability: 0.0001,
          multiplier: 18266.6,
        },
        {
          gem: 18,
          probability: 0,
          multiplier: 127866.2,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7083,
          multiplier: 1.3412,
        },
        {
          gem: 2,
          probability: 0.4928,
          multiplier: 1.9279,
        },
        {
          gem: 3,
          probability: 0.336,
          multiplier: 2.8276,
        },
        {
          gem: 4,
          probability: 0.224,
          multiplier: 4.2415,
        },
        {
          gem: 5,
          probability: 0.1456,
          multiplier: 6.5253,
        },
        {
          gem: 6,
          probability: 0.0919,
          multiplier: 10.3318,
        },
        {
          gem: 7,
          probability: 0.0562,
          multiplier: 16.9066,
        },
        {
          gem: 8,
          probability: 0.0331,
          multiplier: 28.7412,
        },
        {
          gem: 9,
          probability: 0.0186,
          multiplier: 51.0954,
        },
        {
          gem: 10,
          probability: 0.0099,
          multiplier: 95.8038,
        },
        {
          gem: 11,
          probability: 0.005,
          multiplier: 191.6077,
        },
        {
          gem: 12,
          probability: 0.0023,
          multiplier: 415.15,
        },
        {
          gem: 13,
          probability: 0.001,
          multiplier: 996.36,
        },
        {
          gem: 14,
          probability: 0.0003,
          multiplier: 2739.99,
        },
        {
          gem: 15,
          probability: 0.0001,
          multiplier: 9133.3,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 41099.85,
        },
        {
          gem: 17,
          probability: 0,
          multiplier: 328798.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6667,
          multiplier: 1.425,
        },
        {
          gem: 2,
          probability: 0.4348,
          multiplier: 2.185,
        },
        {
          gem: 3,
          probability: 0.2767,
          multiplier: 3.4336,
        },
        {
          gem: 4,
          probability: 0.1713,
          multiplier: 5.5465,
        },
        {
          gem: 5,
          probability: 0.1028,
          multiplier: 9.2442,
        },
        {
          gem: 6,
          probability: 0.0595,
          multiplier: 15.9673,
        },
        {
          gem: 7,
          probability: 0.0331,
          multiplier: 28.7412,
        },
        {
          gem: 8,
          probability: 0.0175,
          multiplier: 54.2888,
        },
        {
          gem: 9,
          probability: 0.0087,
          multiplier: 108.5777,
        },
        {
          gem: 10,
          probability: 0.0041,
          multiplier: 232.6665,
        },
        {
          gem: 11,
          probability: 0.0017,
          multiplier: 542.8885,
        },
        {
          gem: 12,
          probability: 0.0007,
          multiplier: 1411.51,
        },
        {
          gem: 13,
          probability: 0.0002,
          multiplier: 4234.53,
        },
        {
          gem: 14,
          probability: 0.0001,
          multiplier: 15526.61,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 77633.05,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 698697.45,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.625,
          multiplier: 1.52,
        },
        {
          gem: 2,
          probability: 0.3804,
          multiplier: 2.4971,
        },
        {
          gem: 3,
          probability: 0.2248,
          multiplier: 4.2259,
        },
        {
          gem: 4,
          probability: 0.1285,
          multiplier: 7.3954,
        },
        {
          gem: 5,
          probability: 0.0707,
          multiplier: 13.4462,
        },
        {
          gem: 6,
          probability: 0.0372,
          multiplier: 25.5477,
        },
        {
          gem: 7,
          probability: 0.0186,
          multiplier: 51.0954,
        },
        {
          gem: 8,
          probability: 0.0087,
          multiplier: 108.5777,
        },
        {
          gem: 9,
          probability: 0.0038,
          multiplier: 248.1776,
        },
        {
          gem: 10,
          probability: 0.0015,
          multiplier: 620.444,
        },
        {
          gem: 11,
          probability: 0.0005,
          multiplier: 1737.2431,
        },
        {
          gem: 12,
          probability: 0.0002,
          multiplier: 5646.04,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 22584.16,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 124212.88,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 1242128.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5833,
          multiplier: 1.6286,
        },
        {
          gem: 2,
          probability: 0.3297,
          multiplier: 2.8813,
        },
        {
          gem: 3,
          probability: 0.1798,
          multiplier: 5.2824,
        },
        {
          gem: 4,
          probability: 0.0942,
          multiplier: 10.0846,
        },
        {
          gem: 5,
          probability: 0.0471,
          multiplier: 20.1692,
        },
        {
          gem: 6,
          probability: 0.0223,
          multiplier: 42.5795,
        },
        {
          gem: 7,
          probability: 0.0099,
          multiplier: 95.8038,
        },
        {
          gem: 8,
          probability: 0.0041,
          multiplier: 232.6665,
        },
        {
          gem: 9,
          probability: 0.0015,
          multiplier: 620.444,
        },
        {
          gem: 10,
          probability: 0.0005,
          multiplier: 1861.3319,
        },
        {
          gem: 11,
          probability: 0.0001,
          multiplier: 6514.6615,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 28230.2,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 169381.2,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 1863193.2,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5417,
          multiplier: 1.7538,
        },
        {
          gem: 2,
          probability: 0.2826,
          multiplier: 3.3615,
        },
        {
          gem: 3,
          probability: 0.1413,
          multiplier: 6.7231,
        },
        {
          gem: 4,
          probability: 0.0673,
          multiplier: 14.1185,
        },
        {
          gem: 5,
          probability: 0.0303,
          multiplier: 31.3744,
        },
        {
          gem: 6,
          probability: 0.0127,
          multiplier: 74.5141,
        },
        {
          gem: 7,
          probability: 0.005,
          multiplier: 191.6077,
        },
        {
          gem: 8,
          probability: 0.0017,
          multiplier: 542.8885,
        },
        {
          gem: 9,
          probability: 0.0005,
          multiplier: 1737.2431,
        },
        {
          gem: 10,
          probability: 0.0001,
          multiplier: 6514.6615,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 30401.7538,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 197611.4,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 2371336.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5,
          multiplier: 1.9,
        },
        {
          gem: 2,
          probability: 0.2391,
          multiplier: 3.9727,
        },
        {
          gem: 3,
          probability: 0.1087,
          multiplier: 8.74,
        },
        {
          gem: 4,
          probability: 0.0466,
          multiplier: 20.3933,
        },
        {
          gem: 5,
          probability: 0.0186,
          multiplier: 50.9833,
        },
        {
          gem: 6,
          probability: 0.0069,
          multiplier: 138.3833,
        },
        {
          gem: 7,
          probability: 0.0023,
          multiplier: 415.15,
        },
        {
          gem: 8,
          probability: 0.0007,
          multiplier: 1411.51,
        },
        {
          gem: 9,
          probability: 0.0002,
          multiplier: 5646.04,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 28230.2,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 197611.4,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 2568948.2,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4583,
          multiplier: 2.0727,
        },
        {
          gem: 2,
          probability: 0.1993,
          multiplier: 4.7673,
        },
        {
          gem: 3,
          probability: 0.0815,
          multiplier: 11.6533,
        },
        {
          gem: 4,
          probability: 0.0311,
          multiplier: 30.59,
        },
        {
          gem: 5,
          probability: 0.0109,
          multiplier: 87.4,
        },
        {
          gem: 6,
          probability: 0.0034,
          multiplier: 276.7667,
        },
        {
          gem: 7,
          probability: 0.001,
          multiplier: 996.36,
        },
        {
          gem: 8,
          probability: 0.0002,
          multiplier: 4234.53,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 22584.16,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 169381.2,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 2371336.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4167,
          multiplier: 2.28,
        },
        {
          gem: 2,
          probability: 0.163,
          multiplier: 5.8267,
        },
        {
          gem: 3,
          probability: 0.0593,
          multiplier: 16.0233,
        },
        {
          gem: 4,
          probability: 0.0198,
          multiplier: 48.07,
        },
        {
          gem: 5,
          probability: 0.0059,
          multiplier: 160.2333,
        },
        {
          gem: 6,
          probability: 0.0016,
          multiplier: 608.8867,
        },
        {
          gem: 7,
          probability: 0.0003,
          multiplier: 2739.99,
        },
        {
          gem: 8,
          probability: 0.0001,
          multiplier: 15526.61,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 124212.88,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 1863193.2,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.375,
          multiplier: 2.5333,
        },
        {
          gem: 2,
          probability: 0.1304,
          multiplier: 7.2833,
        },
        {
          gem: 3,
          probability: 0.0415,
          multiplier: 22.8905,
        },
        {
          gem: 4,
          probability: 0.0119,
          multiplier: 80.1167,
        },
        {
          gem: 5,
          probability: 0.003,
          multiplier: 320.4667,
        },
        {
          gem: 6,
          probability: 0.0006,
          multiplier: 1522.2167,
        },
        {
          gem: 7,
          probability: 0.0001,
          multiplier: 9133.3,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 77633.05,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 1242128.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.3333,
          multiplier: 2.85,
        },
        {
          gem: 2,
          probability: 0.1014,
          multiplier: 9.3643,
        },
        {
          gem: 3,
          probability: 0.0277,
          multiplier: 34.3357,
        },
        {
          gem: 4,
          probability: 0.0066,
          multiplier: 144.21,
        },
        {
          gem: 5,
          probability: 0.0013,
          multiplier: 721.05,
        },
        {
          gem: 6,
          probability: 0.0002,
          multiplier: 4566.65,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 41099.85,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 698697.45,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2917,
          multiplier: 3.2571,
        },
        {
          gem: 2,
          probability: 0.0761,
          multiplier: 12.4857,
        },
        {
          gem: 3,
          probability: 0.0173,
          multiplier: 54.9371,
        },
        {
          gem: 4,
          probability: 0.0033,
          multiplier: 288.42,
        },
        {
          gem: 5,
          probability: 0.0005,
          multiplier: 1922.8,
        },
        {
          gem: 6,
          probability: 0.0001,
          multiplier: 18266.6,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 328798.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.25,
          multiplier: 3.8,
        },
        {
          gem: 2,
          probability: 0.0543,
          multiplier: 17.48,
        },
        {
          gem: 3,
          probability: 0.0099,
          multiplier: 96.14,
        },
        {
          gem: 4,
          probability: 0.0014,
          multiplier: 672.98,
        },
        {
          gem: 5,
          probability: 0.0001,
          multiplier: 6729.8,
        },
        {
          gem: 6,
          probability: 0,
          multiplier: 127866.2,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2083,
          multiplier: 4.56,
        },
        {
          gem: 2,
          probability: 0.0362,
          multiplier: 26.22,
        },
        {
          gem: 3,
          probability: 0.0049,
          multiplier: 192.28,
        },
        {
          gem: 4,
          probability: 0.0005,
          multiplier: 2018.94,
        },
        {
          gem: 5,
          probability: 0,
          multiplier: 40378.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.1667,
          multiplier: 5.7,
        },
        {
          gem: 2,
          probability: 0.0217,
          multiplier: 43.7,
        },
        {
          gem: 3,
          probability: 0.002,
          multiplier: 480.7,
        },
        {
          gem: 4,
          probability: 0.0001,
          multiplier: 10094.7,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.125,
          multiplier: 7.6,
        },
        {
          gem: 2,
          probability: 0.0109,
          multiplier: 87.4,
        },
        {
          gem: 3,
          probability: 0.0005,
          multiplier: 1922.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0833,
          multiplier: 11.4,
        },
        {
          gem: 2,
          probability: 0.0036,
          multiplier: 262.2,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0417,
          multiplier: 22.8,
        },
      ],
    ],
  },
  '7': {
    rtp: 93,
    multiplierMap: [
      [
        {
          gem: 1,
          probability: 0.9583,
          multiplier: 0.9704,
        },
        {
          gem: 2,
          probability: 0.9167,
          multiplier: 1.0145,
        },
        {
          gem: 3,
          probability: 0.875,
          multiplier: 1.0629,
        },
        {
          gem: 4,
          probability: 0.8333,
          multiplier: 1.116,
        },
        {
          gem: 5,
          probability: 0.7917,
          multiplier: 1.1747,
        },
        {
          gem: 6,
          probability: 0.75,
          multiplier: 1.24,
        },
        {
          gem: 7,
          probability: 0.7083,
          multiplier: 1.3129,
        },
        {
          gem: 8,
          probability: 0.6667,
          multiplier: 1.395,
        },
        {
          gem: 9,
          probability: 0.625,
          multiplier: 1.488,
        },
        {
          gem: 10,
          probability: 0.5833,
          multiplier: 1.5943,
        },
        {
          gem: 11,
          probability: 0.5417,
          multiplier: 1.7169,
        },
        {
          gem: 12,
          probability: 0.5,
          multiplier: 1.86,
        },
        {
          gem: 13,
          probability: 0.4583,
          multiplier: 2.0291,
        },
        {
          gem: 14,
          probability: 0.4167,
          multiplier: 2.232,
        },
        {
          gem: 15,
          probability: 0.375,
          multiplier: 2.48,
        },
        {
          gem: 16,
          probability: 0.3333,
          multiplier: 2.79,
        },
        {
          gem: 17,
          probability: 0.2917,
          multiplier: 3.1886,
        },
        {
          gem: 18,
          probability: 0.25,
          multiplier: 3.72,
        },
        {
          gem: 19,
          probability: 0.2083,
          multiplier: 4.464,
        },
        {
          gem: 20,
          probability: 0.1667,
          multiplier: 5.58,
        },
        {
          gem: 21,
          probability: 0.125,
          multiplier: 7.44,
        },
        {
          gem: 22,
          probability: 0.0833,
          multiplier: 11.16,
        },
        {
          gem: 23,
          probability: 0.0417,
          multiplier: 22.32,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.9167,
          multiplier: 1.0145,
        },
        {
          gem: 2,
          probability: 0.837,
          multiplier: 1.1112,
        },
        {
          gem: 3,
          probability: 0.7609,
          multiplier: 1.2223,
        },
        {
          gem: 4,
          probability: 0.6884,
          multiplier: 1.3509,
        },
        {
          gem: 5,
          probability: 0.6196,
          multiplier: 1.5011,
        },
        {
          gem: 6,
          probability: 0.5543,
          multiplier: 1.6776,
        },
        {
          gem: 7,
          probability: 0.4928,
          multiplier: 1.8874,
        },
        {
          gem: 8,
          probability: 0.4348,
          multiplier: 2.139,
        },
        {
          gem: 9,
          probability: 0.3804,
          multiplier: 2.4446,
        },
        {
          gem: 10,
          probability: 0.3297,
          multiplier: 2.8207,
        },
        {
          gem: 11,
          probability: 0.2826,
          multiplier: 3.2908,
        },
        {
          gem: 12,
          probability: 0.2391,
          multiplier: 3.8891,
        },
        {
          gem: 13,
          probability: 0.1993,
          multiplier: 4.6669,
        },
        {
          gem: 14,
          probability: 0.163,
          multiplier: 5.704,
        },
        {
          gem: 15,
          probability: 0.1304,
          multiplier: 7.13,
        },
        {
          gem: 16,
          probability: 0.1014,
          multiplier: 9.1671,
        },
        {
          gem: 17,
          probability: 0.0761,
          multiplier: 12.2229,
        },
        {
          gem: 18,
          probability: 0.0543,
          multiplier: 17.112,
        },
        {
          gem: 19,
          probability: 0.0362,
          multiplier: 25.668,
        },
        {
          gem: 20,
          probability: 0.0217,
          multiplier: 42.78,
        },
        {
          gem: 21,
          probability: 0.0109,
          multiplier: 85.56,
        },
        {
          gem: 22,
          probability: 0.0036,
          multiplier: 256.68,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.875,
          multiplier: 1.0629,
        },
        {
          gem: 2,
          probability: 0.7609,
          multiplier: 1.2223,
        },
        {
          gem: 3,
          probability: 0.6571,
          multiplier: 1.4153,
        },
        {
          gem: 4,
          probability: 0.5632,
          multiplier: 1.6512,
        },
        {
          gem: 5,
          probability: 0.4788,
          multiplier: 1.9425,
        },
        {
          gem: 6,
          probability: 0.4032,
          multiplier: 2.3068,
        },
        {
          gem: 7,
          probability: 0.336,
          multiplier: 2.7681,
        },
        {
          gem: 8,
          probability: 0.2767,
          multiplier: 3.3613,
        },
        {
          gem: 9,
          probability: 0.2248,
          multiplier: 4.137,
        },
        {
          gem: 10,
          probability: 0.1798,
          multiplier: 5.1712,
        },
        {
          gem: 11,
          probability: 0.1413,
          multiplier: 6.5815,
        },
        {
          gem: 12,
          probability: 0.1087,
          multiplier: 8.556,
        },
        {
          gem: 13,
          probability: 0.0815,
          multiplier: 11.408,
        },
        {
          gem: 14,
          probability: 0.0593,
          multiplier: 15.686,
        },
        {
          gem: 15,
          probability: 0.0415,
          multiplier: 22.4086,
        },
        {
          gem: 16,
          probability: 0.0277,
          multiplier: 33.6129,
        },
        {
          gem: 17,
          probability: 0.0173,
          multiplier: 53.7806,
        },
        {
          gem: 18,
          probability: 0.0099,
          multiplier: 94.116,
        },
        {
          gem: 19,
          probability: 0.0049,
          multiplier: 188.232,
        },
        {
          gem: 20,
          probability: 0.002,
          multiplier: 470.58,
        },
        {
          gem: 21,
          probability: 0.0005,
          multiplier: 1882.32,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8333,
          multiplier: 1.116,
        },
        {
          gem: 2,
          probability: 0.6884,
          multiplier: 1.3509,
        },
        {
          gem: 3,
          probability: 0.5632,
          multiplier: 1.6512,
        },
        {
          gem: 4,
          probability: 0.456,
          multiplier: 2.0397,
        },
        {
          gem: 5,
          probability: 0.3648,
          multiplier: 2.5496,
        },
        {
          gem: 6,
          probability: 0.288,
          multiplier: 3.2295,
        },
        {
          gem: 7,
          probability: 0.224,
          multiplier: 4.1522,
        },
        {
          gem: 8,
          probability: 0.1713,
          multiplier: 5.4298,
        },
        {
          gem: 9,
          probability: 0.1285,
          multiplier: 7.2397,
        },
        {
          gem: 10,
          probability: 0.0942,
          multiplier: 9.8723,
        },
        {
          gem: 11,
          probability: 0.0673,
          multiplier: 13.8212,
        },
        {
          gem: 12,
          probability: 0.0466,
          multiplier: 19.964,
        },
        {
          gem: 13,
          probability: 0.0311,
          multiplier: 29.946,
        },
        {
          gem: 14,
          probability: 0.0198,
          multiplier: 47.058,
        },
        {
          gem: 15,
          probability: 0.0119,
          multiplier: 78.43,
        },
        {
          gem: 16,
          probability: 0.0066,
          multiplier: 141.174,
        },
        {
          gem: 17,
          probability: 0.0033,
          multiplier: 282.348,
        },
        {
          gem: 18,
          probability: 0.0014,
          multiplier: 658.812,
        },
        {
          gem: 19,
          probability: 0.0005,
          multiplier: 1976.436,
        },
        {
          gem: 20,
          probability: 0.0001,
          multiplier: 9882.18,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7917,
          multiplier: 1.1747,
        },
        {
          gem: 2,
          probability: 0.6196,
          multiplier: 1.5011,
        },
        {
          gem: 3,
          probability: 0.4788,
          multiplier: 1.9425,
        },
        {
          gem: 4,
          probability: 0.3648,
          multiplier: 2.5496,
        },
        {
          gem: 5,
          probability: 0.2736,
          multiplier: 3.3994,
        },
        {
          gem: 6,
          probability: 0.2016,
          multiplier: 4.6135,
        },
        {
          gem: 7,
          probability: 0.1456,
          multiplier: 6.388,
        },
        {
          gem: 8,
          probability: 0.1028,
          multiplier: 9.0496,
        },
        {
          gem: 9,
          probability: 0.0707,
          multiplier: 13.1631,
        },
        {
          gem: 10,
          probability: 0.0471,
          multiplier: 19.7446,
        },
        {
          gem: 11,
          probability: 0.0303,
          multiplier: 30.7138,
        },
        {
          gem: 12,
          probability: 0.0186,
          multiplier: 49.91,
        },
        {
          gem: 13,
          probability: 0.0109,
          multiplier: 85.56,
        },
        {
          gem: 14,
          probability: 0.0059,
          multiplier: 156.86,
        },
        {
          gem: 15,
          probability: 0.003,
          multiplier: 313.72,
        },
        {
          gem: 16,
          probability: 0.0013,
          multiplier: 705.87,
        },
        {
          gem: 17,
          probability: 0.0005,
          multiplier: 1882.32,
        },
        {
          gem: 18,
          probability: 0.0001,
          multiplier: 6588.12,
        },
        {
          gem: 19,
          probability: 0,
          multiplier: 39528.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.75,
          multiplier: 1.24,
        },
        {
          gem: 2,
          probability: 0.5543,
          multiplier: 1.6776,
        },
        {
          gem: 3,
          probability: 0.4032,
          multiplier: 2.3068,
        },
        {
          gem: 4,
          probability: 0.288,
          multiplier: 3.2295,
        },
        {
          gem: 5,
          probability: 0.2016,
          multiplier: 4.6135,
        },
        {
          gem: 6,
          probability: 0.1379,
          multiplier: 6.7429,
        },
        {
          gem: 7,
          probability: 0.0919,
          multiplier: 10.1143,
        },
        {
          gem: 8,
          probability: 0.0595,
          multiplier: 15.6312,
        },
        {
          gem: 9,
          probability: 0.0372,
          multiplier: 25.0098,
        },
        {
          gem: 10,
          probability: 0.0223,
          multiplier: 41.6831,
        },
        {
          gem: 11,
          probability: 0.0127,
          multiplier: 72.9454,
        },
        {
          gem: 12,
          probability: 0.0069,
          multiplier: 135.47,
        },
        {
          gem: 13,
          probability: 0.0034,
          multiplier: 270.94,
        },
        {
          gem: 14,
          probability: 0.0016,
          multiplier: 596.068,
        },
        {
          gem: 15,
          probability: 0.0006,
          multiplier: 1490.17,
        },
        {
          gem: 16,
          probability: 0.0002,
          multiplier: 4470.51,
        },
        {
          gem: 17,
          probability: 0.0001,
          multiplier: 17882.04,
        },
        {
          gem: 18,
          probability: 0,
          multiplier: 125174.28,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.7083,
          multiplier: 1.3129,
        },
        {
          gem: 2,
          probability: 0.4928,
          multiplier: 1.8874,
        },
        {
          gem: 3,
          probability: 0.336,
          multiplier: 2.7681,
        },
        {
          gem: 4,
          probability: 0.224,
          multiplier: 4.1522,
        },
        {
          gem: 5,
          probability: 0.1456,
          multiplier: 6.388,
        },
        {
          gem: 6,
          probability: 0.0919,
          multiplier: 10.1143,
        },
        {
          gem: 7,
          probability: 0.0562,
          multiplier: 16.5506,
        },
        {
          gem: 8,
          probability: 0.0331,
          multiplier: 28.1361,
        },
        {
          gem: 9,
          probability: 0.0186,
          multiplier: 50.0197,
        },
        {
          gem: 10,
          probability: 0.0099,
          multiplier: 93.7869,
        },
        {
          gem: 11,
          probability: 0.005,
          multiplier: 187.5738,
        },
        {
          gem: 12,
          probability: 0.0023,
          multiplier: 406.41,
        },
        {
          gem: 13,
          probability: 0.001,
          multiplier: 975.384,
        },
        {
          gem: 14,
          probability: 0.0003,
          multiplier: 2682.306,
        },
        {
          gem: 15,
          probability: 0.0001,
          multiplier: 8941.02,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 40234.59,
        },
        {
          gem: 17,
          probability: 0,
          multiplier: 321876.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6667,
          multiplier: 1.395,
        },
        {
          gem: 2,
          probability: 0.4348,
          multiplier: 2.139,
        },
        {
          gem: 3,
          probability: 0.2767,
          multiplier: 3.3613,
        },
        {
          gem: 4,
          probability: 0.1713,
          multiplier: 5.4298,
        },
        {
          gem: 5,
          probability: 0.1028,
          multiplier: 9.0496,
        },
        {
          gem: 6,
          probability: 0.0595,
          multiplier: 15.6312,
        },
        {
          gem: 7,
          probability: 0.0331,
          multiplier: 28.1361,
        },
        {
          gem: 8,
          probability: 0.0175,
          multiplier: 53.1459,
        },
        {
          gem: 9,
          probability: 0.0087,
          multiplier: 106.2918,
        },
        {
          gem: 10,
          probability: 0.0041,
          multiplier: 227.7682,
        },
        {
          gem: 11,
          probability: 0.0017,
          multiplier: 531.4592,
        },
        {
          gem: 12,
          probability: 0.0007,
          multiplier: 1381.794,
        },
        {
          gem: 13,
          probability: 0.0002,
          multiplier: 4145.382,
        },
        {
          gem: 14,
          probability: 0.0001,
          multiplier: 15199.734,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 75998.67,
        },
        {
          gem: 16,
          probability: 0,
          multiplier: 683988.03,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.625,
          multiplier: 1.488,
        },
        {
          gem: 2,
          probability: 0.3804,
          multiplier: 2.4446,
        },
        {
          gem: 3,
          probability: 0.2248,
          multiplier: 4.137,
        },
        {
          gem: 4,
          probability: 0.1285,
          multiplier: 7.2397,
        },
        {
          gem: 5,
          probability: 0.0707,
          multiplier: 13.1631,
        },
        {
          gem: 6,
          probability: 0.0372,
          multiplier: 25.0098,
        },
        {
          gem: 7,
          probability: 0.0186,
          multiplier: 50.0197,
        },
        {
          gem: 8,
          probability: 0.0087,
          multiplier: 106.2918,
        },
        {
          gem: 9,
          probability: 0.0038,
          multiplier: 242.9528,
        },
        {
          gem: 10,
          probability: 0.0015,
          multiplier: 607.382,
        },
        {
          gem: 11,
          probability: 0.0005,
          multiplier: 1700.6695,
        },
        {
          gem: 12,
          probability: 0.0002,
          multiplier: 5527.176,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 22108.704,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 121597.872,
        },
        {
          gem: 15,
          probability: 0,
          multiplier: 1215978.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5833,
          multiplier: 1.5943,
        },
        {
          gem: 2,
          probability: 0.3297,
          multiplier: 2.8207,
        },
        {
          gem: 3,
          probability: 0.1798,
          multiplier: 5.1712,
        },
        {
          gem: 4,
          probability: 0.0942,
          multiplier: 9.8723,
        },
        {
          gem: 5,
          probability: 0.0471,
          multiplier: 19.7446,
        },
        {
          gem: 6,
          probability: 0.0223,
          multiplier: 41.6831,
        },
        {
          gem: 7,
          probability: 0.0099,
          multiplier: 93.7869,
        },
        {
          gem: 8,
          probability: 0.0041,
          multiplier: 227.7682,
        },
        {
          gem: 9,
          probability: 0.0015,
          multiplier: 607.382,
        },
        {
          gem: 10,
          probability: 0.0005,
          multiplier: 1822.1459,
        },
        {
          gem: 11,
          probability: 0.0001,
          multiplier: 6377.5108,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 27635.88,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 165815.28,
        },
        {
          gem: 14,
          probability: 0,
          multiplier: 1823968.08,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5417,
          multiplier: 1.7169,
        },
        {
          gem: 2,
          probability: 0.2826,
          multiplier: 3.2908,
        },
        {
          gem: 3,
          probability: 0.1413,
          multiplier: 6.5815,
        },
        {
          gem: 4,
          probability: 0.0673,
          multiplier: 13.8212,
        },
        {
          gem: 5,
          probability: 0.0303,
          multiplier: 30.7138,
        },
        {
          gem: 6,
          probability: 0.0127,
          multiplier: 72.9454,
        },
        {
          gem: 7,
          probability: 0.005,
          multiplier: 187.5738,
        },
        {
          gem: 8,
          probability: 0.0017,
          multiplier: 531.4592,
        },
        {
          gem: 9,
          probability: 0.0005,
          multiplier: 1700.6695,
        },
        {
          gem: 10,
          probability: 0.0001,
          multiplier: 6377.5108,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 29761.7169,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 193451.16,
        },
        {
          gem: 13,
          probability: 0,
          multiplier: 2321413.92,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.5,
          multiplier: 1.86,
        },
        {
          gem: 2,
          probability: 0.2391,
          multiplier: 3.8891,
        },
        {
          gem: 3,
          probability: 0.1087,
          multiplier: 8.556,
        },
        {
          gem: 4,
          probability: 0.0466,
          multiplier: 19.964,
        },
        {
          gem: 5,
          probability: 0.0186,
          multiplier: 49.91,
        },
        {
          gem: 6,
          probability: 0.0069,
          multiplier: 135.47,
        },
        {
          gem: 7,
          probability: 0.0023,
          multiplier: 406.41,
        },
        {
          gem: 8,
          probability: 0.0007,
          multiplier: 1381.794,
        },
        {
          gem: 9,
          probability: 0.0002,
          multiplier: 5527.176,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 27635.88,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 193451.16,
        },
        {
          gem: 12,
          probability: 0,
          multiplier: 2514865.08,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4583,
          multiplier: 2.0291,
        },
        {
          gem: 2,
          probability: 0.1993,
          multiplier: 4.6669,
        },
        {
          gem: 3,
          probability: 0.0815,
          multiplier: 11.408,
        },
        {
          gem: 4,
          probability: 0.0311,
          multiplier: 29.946,
        },
        {
          gem: 5,
          probability: 0.0109,
          multiplier: 85.56,
        },
        {
          gem: 6,
          probability: 0.0034,
          multiplier: 270.94,
        },
        {
          gem: 7,
          probability: 0.001,
          multiplier: 975.384,
        },
        {
          gem: 8,
          probability: 0.0002,
          multiplier: 4145.382,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 22108.704,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 165815.28,
        },
        {
          gem: 11,
          probability: 0,
          multiplier: 2321413.92,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4167,
          multiplier: 2.232,
        },
        {
          gem: 2,
          probability: 0.163,
          multiplier: 5.704,
        },
        {
          gem: 3,
          probability: 0.0593,
          multiplier: 15.686,
        },
        {
          gem: 4,
          probability: 0.0198,
          multiplier: 47.058,
        },
        {
          gem: 5,
          probability: 0.0059,
          multiplier: 156.86,
        },
        {
          gem: 6,
          probability: 0.0016,
          multiplier: 596.068,
        },
        {
          gem: 7,
          probability: 0.0003,
          multiplier: 2682.306,
        },
        {
          gem: 8,
          probability: 0.0001,
          multiplier: 15199.734,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 121597.872,
        },
        {
          gem: 10,
          probability: 0,
          multiplier: 1823968.08,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.375,
          multiplier: 2.48,
        },
        {
          gem: 2,
          probability: 0.1304,
          multiplier: 7.13,
        },
        {
          gem: 3,
          probability: 0.0415,
          multiplier: 22.4086,
        },
        {
          gem: 4,
          probability: 0.0119,
          multiplier: 78.43,
        },
        {
          gem: 5,
          probability: 0.003,
          multiplier: 313.72,
        },
        {
          gem: 6,
          probability: 0.0006,
          multiplier: 1490.17,
        },
        {
          gem: 7,
          probability: 0.0001,
          multiplier: 8941.02,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 75998.67,
        },
        {
          gem: 9,
          probability: 0,
          multiplier: 1215978.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.3333,
          multiplier: 2.79,
        },
        {
          gem: 2,
          probability: 0.1014,
          multiplier: 9.1671,
        },
        {
          gem: 3,
          probability: 0.0277,
          multiplier: 33.6129,
        },
        {
          gem: 4,
          probability: 0.0066,
          multiplier: 141.174,
        },
        {
          gem: 5,
          probability: 0.0013,
          multiplier: 705.87,
        },
        {
          gem: 6,
          probability: 0.0002,
          multiplier: 4470.51,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 40234.59,
        },
        {
          gem: 8,
          probability: 0,
          multiplier: 683988.03,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2917,
          multiplier: 3.1886,
        },
        {
          gem: 2,
          probability: 0.0761,
          multiplier: 12.2229,
        },
        {
          gem: 3,
          probability: 0.0173,
          multiplier: 53.7806,
        },
        {
          gem: 4,
          probability: 0.0033,
          multiplier: 282.348,
        },
        {
          gem: 5,
          probability: 0.0005,
          multiplier: 1882.32,
        },
        {
          gem: 6,
          probability: 0.0001,
          multiplier: 17882.04,
        },
        {
          gem: 7,
          probability: 0,
          multiplier: 321876.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.25,
          multiplier: 3.72,
        },
        {
          gem: 2,
          probability: 0.0543,
          multiplier: 17.112,
        },
        {
          gem: 3,
          probability: 0.0099,
          multiplier: 94.116,
        },
        {
          gem: 4,
          probability: 0.0014,
          multiplier: 658.812,
        },
        {
          gem: 5,
          probability: 0.0001,
          multiplier: 6588.12,
        },
        {
          gem: 6,
          probability: 0,
          multiplier: 125174.28,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2083,
          multiplier: 4.464,
        },
        {
          gem: 2,
          probability: 0.0362,
          multiplier: 25.668,
        },
        {
          gem: 3,
          probability: 0.0049,
          multiplier: 188.232,
        },
        {
          gem: 4,
          probability: 0.0005,
          multiplier: 1976.436,
        },
        {
          gem: 5,
          probability: 0,
          multiplier: 39528.72,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.1667,
          multiplier: 5.58,
        },
        {
          gem: 2,
          probability: 0.0217,
          multiplier: 42.78,
        },
        {
          gem: 3,
          probability: 0.002,
          multiplier: 470.58,
        },
        {
          gem: 4,
          probability: 0.0001,
          multiplier: 9882.18,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.125,
          multiplier: 7.44,
        },
        {
          gem: 2,
          probability: 0.0109,
          multiplier: 85.56,
        },
        {
          gem: 3,
          probability: 0.0005,
          multiplier: 1882.32,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0833,
          multiplier: 11.16,
        },
        {
          gem: 2,
          probability: 0.0036,
          multiplier: 256.68,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.0417,
          multiplier: 22.32,
        },
      ],
    ],
  },
});
