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

export const MINES_MATH: MinesMath = Object.freeze({
  '1': {
    rtp: 99,
    multiplierMap: [
      [
        {
          gem: 1,
          probability: 0.96,
          multiplier: 1.03125,
        },
        {
          gem: 2,
          probability: 0.92,
          multiplier: 1.076086956521739,
        },
        {
          gem: 3,
          probability: 0.8800000000000001,
          multiplier: 1.1249999999999998,
        },
        {
          gem: 4,
          probability: 0.8399999999999999,
          multiplier: 1.1785714285714288,
        },
        {
          gem: 5,
          probability: 0.7999999999999999,
          multiplier: 1.2375,
        },
        {
          gem: 6,
          probability: 0.7600000000000003,
          multiplier: 1.302631578947368,
        },
        {
          gem: 7,
          probability: 0.7199999999999999,
          multiplier: 1.3750000000000002,
        },
        {
          gem: 8,
          probability: 0.68,
          multiplier: 1.4558823529411764,
        },
        {
          gem: 9,
          probability: 0.64,
          multiplier: 1.546875,
        },
        {
          gem: 10,
          probability: 0.6000000000000001,
          multiplier: 1.65,
        },
        {
          gem: 11,
          probability: 0.56,
          multiplier: 1.7678571428571428,
        },
        {
          gem: 12,
          probability: 0.5200000000000001,
          multiplier: 1.9038461538461535,
        },
        {
          gem: 13,
          probability: 0.48,
          multiplier: 2.0625,
        },
        {
          gem: 14,
          probability: 0.44,
          multiplier: 2.25,
        },
        {
          gem: 15,
          probability: 0.4000000000000001,
          multiplier: 2.4749999999999996,
        },
        {
          gem: 16,
          probability: 0.36,
          multiplier: 2.75,
        },
        {
          gem: 17,
          probability: 0.32,
          multiplier: 3.09375,
        },
        {
          gem: 18,
          probability: 0.27999999999999997,
          multiplier: 3.535714285714286,
        },
        {
          gem: 19,
          probability: 0.24,
          multiplier: 4.125,
        },
        {
          gem: 20,
          probability: 0.20000000000000004,
          multiplier: 4.949999999999999,
        },
        {
          gem: 21,
          probability: 0.16,
          multiplier: 6.1875,
        },
        {
          gem: 22,
          probability: 0.12,
          multiplier: 8.25,
        },
        {
          gem: 23,
          probability: 0.08,
          multiplier: 12.375,
        },
        {
          gem: 24,
          probability: 0.04,
          multiplier: 24.75,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.92,
          multiplier: 1.076086956521739,
        },
        {
          gem: 2,
          probability: 0.8433333333333334,
          multiplier: 1.173913043478261,
        },
        {
          gem: 3,
          probability: 0.77,
          multiplier: 1.2857142857142856,
        },
        {
          gem: 4,
          probability: 0.6999999999999998,
          multiplier: 1.4142857142857146,
        },
        {
          gem: 5,
          probability: 0.6333333333333335,
          multiplier: 1.5631578947368416,
        },
        {
          gem: 6,
          probability: 0.5700000000000001,
          multiplier: 1.7368421052631577,
        },
        {
          gem: 7,
          probability: 0.5099999999999999,
          multiplier: 1.9411764705882357,
        },
        {
          gem: 8,
          probability: 0.4533333333333333,
          multiplier: 2.183823529411765,
        },
        {
          gem: 9,
          probability: 0.4,
          multiplier: 2.475,
        },
        {
          gem: 10,
          probability: 0.35000000000000014,
          multiplier: 2.8285714285714274,
        },
        {
          gem: 11,
          probability: 0.3033333333333334,
          multiplier: 3.2637362637362632,
        },
        {
          gem: 12,
          probability: 0.26,
          multiplier: 3.8076923076923075,
        },
        {
          gem: 13,
          probability: 0.22,
          multiplier: 4.5,
        },
        {
          gem: 14,
          probability: 0.18333333333333332,
          multiplier: 5.4,
        },
        {
          gem: 15,
          probability: 0.15000000000000002,
          multiplier: 6.6,
        },
        {
          gem: 16,
          probability: 0.12,
          multiplier: 8.25,
        },
        {
          gem: 17,
          probability: 0.09333333333333334,
          multiplier: 10.607142857142856,
        },
        {
          gem: 18,
          probability: 0.06999999999999999,
          multiplier: 14.142857142857144,
        },
        {
          gem: 19,
          probability: 0.05000000000000001,
          multiplier: 19.799999999999997,
        },
        {
          gem: 20,
          probability: 0.03333333333333334,
          multiplier: 29.699999999999992,
        },
        {
          gem: 21,
          probability: 0.019999999999999997,
          multiplier: 49.50000000000001,
        },
        {
          gem: 22,
          probability: 0.01,
          multiplier: 99,
        },
        {
          gem: 23,
          probability: 0.0033333333333333335,
          multiplier: 297,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.88,
          multiplier: 1.125,
        },
        {
          gem: 2,
          probability: 0.77,
          multiplier: 1.2857142857142856,
        },
        {
          gem: 3,
          probability: 0.6695652173913044,
          multiplier: 1.4785714285714284,
        },
        {
          gem: 4,
          probability: 0.5782608695652173,
          multiplier: 1.7120300751879705,
        },
        {
          gem: 5,
          probability: 0.49565217391304356,
          multiplier: 1.9973684210526312,
        },
        {
          gem: 6,
          probability: 0.421304347826087,
          multiplier: 2.3498452012383897,
        },
        {
          gem: 7,
          probability: 0.3547826086956521,
          multiplier: 2.7904411764705888,
        },
        {
          gem: 8,
          probability: 0.2956521739130435,
          multiplier: 3.348529411764706,
        },
        {
          gem: 9,
          probability: 0.24347826086956523,
          multiplier: 4.066071428571428,
        },
        {
          gem: 10,
          probability: 0.1978260869565218,
          multiplier: 5.0043956043956035,
        },
        {
          gem: 11,
          probability: 0.1582608695652174,
          multiplier: 6.2554945054945055,
        },
        {
          gem: 12,
          probability: 0.12434782608695652,
          multiplier: 7.961538461538461,
        },
        {
          gem: 13,
          probability: 0.09565217391304347,
          multiplier: 10.35,
        },
        {
          gem: 14,
          probability: 0.07173913043478261,
          multiplier: 13.8,
        },
        {
          gem: 15,
          probability: 0.052173913043478265,
          multiplier: 18.974999999999998,
        },
        {
          gem: 16,
          probability: 0.036521739130434785,
          multiplier: 27.107142857142854,
        },
        {
          gem: 17,
          probability: 0.02434782608695652,
          multiplier: 40.660714285714285,
        },
        {
          gem: 18,
          probability: 0.015217391304347823,
          multiplier: 65.05714285714286,
        },
        {
          gem: 19,
          probability: 0.008695652173913045,
          multiplier: 113.84999999999997,
        },
        {
          gem: 20,
          probability: 0.004347826086956523,
          multiplier: 227.69999999999993,
        },
        {
          gem: 21,
          probability: 0.0017391304347826085,
          multiplier: 569.25,
        },
        {
          gem: 22,
          probability: 0.0004347826086956522,
          multiplier: 2277,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.84,
          multiplier: 1.1785714285714286,
        },
        {
          gem: 2,
          probability: 0.7,
          multiplier: 1.4142857142857144,
        },
        {
          gem: 3,
          probability: 0.5782608695652174,
          multiplier: 1.71203007518797,
        },
        {
          gem: 4,
          probability: 0.4731225296442687,
          multiplier: 2.092481203007519,
        },
        {
          gem: 5,
          probability: 0.38300395256917,
          multiplier: 2.5848297213622287,
        },
        {
          gem: 6,
          probability: 0.306403162055336,
          multiplier: 3.2310371517027856,
        },
        {
          gem: 7,
          probability: 0.24189723320158096,
          multiplier: 4.09264705882353,
        },
        {
          gem: 8,
          probability: 0.18814229249011857,
          multiplier: 5.261974789915966,
        },
        {
          gem: 9,
          probability: 0.1438735177865613,
          multiplier: 6.881043956043954,
        },
        {
          gem: 10,
          probability: 0.10790513833992096,
          multiplier: 9.174725274725274,
        },
        {
          gem: 11,
          probability: 0.0791304347826087,
          multiplier: 12.510989010989011,
        },
        {
          gem: 12,
          probability: 0.05652173913043478,
          multiplier: 17.515384615384615,
        },
        {
          gem: 13,
          probability: 0.03913043478260869,
          multiplier: 25.3,
        },
        {
          gem: 14,
          probability: 0.02608695652173913,
          multiplier: 37.95,
        },
        {
          gem: 15,
          probability: 0.016600790513833993,
          multiplier: 59.63571428571428,
        },
        {
          gem: 16,
          probability: 0.009960474308300396,
          multiplier: 99.39285714285714,
        },
        {
          gem: 17,
          probability: 0.005533596837944664,
          multiplier: 178.90714285714287,
        },
        {
          gem: 18,
          probability: 0.0027667984189723312,
          multiplier: 357.81428571428586,
        },
        {
          gem: 19,
          probability: 0.0011857707509881424,
          multiplier: 834.8999999999999,
        },
        {
          gem: 20,
          probability: 0.0003952569169960475,
          multiplier: 2504.6999999999994,
        },
        {
          gem: 21,
          probability: 0.00007905138339920947,
          multiplier: 12523.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8,
          multiplier: 1.2375,
        },
        {
          gem: 2,
          probability: 0.6333333333333333,
          multiplier: 1.563157894736842,
        },
        {
          gem: 3,
          probability: 0.4956521739130435,
          multiplier: 1.9973684210526317,
        },
        {
          gem: 4,
          probability: 0.3830039525691699,
          multiplier: 2.584829721362229,
        },
        {
          gem: 5,
          probability: 0.29181253529079615,
          multiplier: 3.3925890092879256,
        },
        {
          gem: 6,
          probability: 0.21885940146809715,
          multiplier: 4.523452012383901,
        },
        {
          gem: 7,
          probability: 0.1612648221343873,
          multiplier: 6.138970588235296,
        },
        {
          gem: 8,
          probability: 0.11646903820816866,
          multiplier: 8.500113122171944,
        },
        {
          gem: 9,
          probability: 0.08221343873517786,
          multiplier: 12.041826923076924,
        },
        {
          gem: 10,
          probability: 0.05652173913043479,
          multiplier: 17.515384615384612,
        },
        {
          gem: 11,
          probability: 0.03768115942028986,
          multiplier: 26.27307692307692,
        },
        {
          gem: 12,
          probability: 0.02422360248447205,
          multiplier: 40.86923076923077,
        },
        {
          gem: 13,
          probability: 0.014906832298136644,
          multiplier: 66.41250000000001,
        },
        {
          gem: 14,
          probability: 0.008695652173913044,
          multiplier: 113.85,
        },
        {
          gem: 15,
          probability: 0.0047430830039525695,
          multiplier: 208.72499999999997,
        },
        {
          gem: 16,
          probability: 0.0023715415019762848,
          multiplier: 417.44999999999993,
        },
        {
          gem: 17,
          probability: 0.001054018445322793,
          multiplier: 939.2625000000002,
        },
        {
          gem: 18,
          probability: 0.0003952569169960473,
          multiplier: 2504.7000000000007,
        },
        {
          gem: 19,
          probability: 0.00011293054771315642,
          multiplier: 8766.449999999999,
        },
        {
          gem: 20,
          probability: 0.000018821757952192737,
          multiplier: 52598.69999999999,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.76,
          multiplier: 1.3026315789473686,
        },
        {
          gem: 2,
          probability: 0.57,
          multiplier: 1.736842105263158,
        },
        {
          gem: 3,
          probability: 0.42130434782608694,
          multiplier: 2.34984520123839,
        },
        {
          gem: 4,
          probability: 0.3064031620553359,
          multiplier: 3.231037151702787,
        },
        {
          gem: 5,
          probability: 0.21885940146809715,
          multiplier: 4.523452012383901,
        },
        {
          gem: 6,
          probability: 0.153201581027668,
          multiplier: 6.462074303405571,
        },
        {
          gem: 7,
          probability: 0.10482213438735177,
          multiplier: 9.444570135746606,
        },
        {
          gem: 8,
          probability: 0.06988142292490117,
          multiplier: 14.166855203619914,
        },
        {
          gem: 9,
          probability: 0.04521739130434783,
          multiplier: 21.894230769230766,
        },
        {
          gem: 10,
          probability: 0.028260869565217395,
          multiplier: 35.030769230769224,
        },
        {
          gem: 11,
          probability: 0.016956521739130433,
          multiplier: 58.384615384615394,
        },
        {
          gem: 12,
          probability: 0.00968944099378882,
          multiplier: 102.17307692307693,
        },
        {
          gem: 13,
          probability: 0.005217391304347825,
          multiplier: 189.75000000000006,
        },
        {
          gem: 14,
          probability: 0.0026086956521739132,
          multiplier: 379.5,
        },
        {
          gem: 15,
          probability: 0.0011857707509881424,
          multiplier: 834.8999999999999,
        },
        {
          gem: 16,
          probability: 0.0004743083003952569,
          multiplier: 2087.25,
        },
        {
          gem: 17,
          probability: 0.00015810276679841898,
          multiplier: 6261.75,
        },
        {
          gem: 18,
          probability: 0.00003952569169960473,
          multiplier: 25047.000000000007,
        },
        {
          gem: 19,
          probability: 0.000005646527385657822,
          multiplier: 175328.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.72,
          multiplier: 1.375,
        },
        {
          gem: 2,
          probability: 0.51,
          multiplier: 1.9411764705882353,
        },
        {
          gem: 3,
          probability: 0.35478260869565215,
          multiplier: 2.7904411764705883,
        },
        {
          gem: 4,
          probability: 0.241897233201581,
          multiplier: 4.0926470588235295,
        },
        {
          gem: 5,
          probability: 0.16126482213438736,
          multiplier: 6.138970588235293,
        },
        {
          gem: 6,
          probability: 0.10482213438735181,
          multiplier: 9.444570135746602,
        },
        {
          gem: 7,
          probability: 0.06620345329727478,
          multiplier: 14.953902714932132,
        },
        {
          gem: 8,
          probability: 0.04045766590389016,
          multiplier: 24.47002262443439,
        },
        {
          gem: 9,
          probability: 0.023798627002288325,
          multiplier: 41.59903846153846,
        },
        {
          gem: 10,
          probability: 0.013386727688787188,
          multiplier: 73.95384615384614,
        },
        {
          gem: 11,
          probability: 0.007139588100686498,
          multiplier: 138.66346153846158,
        },
        {
          gem: 12,
          probability: 0.0035697940503432494,
          multiplier: 277.3269230769231,
        },
        {
          gem: 13,
          probability: 0.0016475972540045763,
          multiplier: 600.8750000000001,
        },
        {
          gem: 14,
          probability: 0.0006864988558352403,
          multiplier: 1442.1000000000001,
        },
        {
          gem: 15,
          probability: 0.00024963594757645107,
          multiplier: 3965.774999999999,
        },
        {
          gem: 16,
          probability: 0.0000748907842729353,
          multiplier: 13219.25,
        },
        {
          gem: 17,
          probability: 0.000016642396505096735,
          multiplier: 59486.62499999999,
        },
        {
          gem: 18,
          probability: 0.000002080299563137091,
          multiplier: 475893.0000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.68,
          multiplier: 1.4558823529411764,
        },
        {
          gem: 2,
          probability: 0.4533333333333333,
          multiplier: 2.183823529411765,
        },
        {
          gem: 3,
          probability: 0.2956521739130435,
          multiplier: 3.348529411764706,
        },
        {
          gem: 4,
          probability: 0.18814229249011855,
          multiplier: 5.261974789915967,
        },
        {
          gem: 5,
          probability: 0.11646903820816867,
          multiplier: 8.500113122171944,
        },
        {
          gem: 6,
          probability: 0.0698814229249012,
          multiplier: 14.166855203619907,
        },
        {
          gem: 7,
          probability: 0.04045766590389015,
          multiplier: 24.470022624434396,
        },
        {
          gem: 8,
          probability: 0.022476481057716755,
          multiplier: 44.0460407239819,
        },
        {
          gem: 9,
          probability: 0.011899313501144164,
          multiplier: 83.19807692307693,
        },
        {
          gem: 10,
          probability: 0.005949656750572083,
          multiplier: 166.39615384615382,
        },
        {
          gem: 11,
          probability: 0.002776506483600305,
          multiplier: 356.56318681318686,
        },
        {
          gem: 12,
          probability: 0.0011899313501144164,
          multiplier: 831.9807692307693,
        },
        {
          gem: 13,
          probability: 0.0004576659038901601,
          multiplier: 2163.1500000000005,
        },
        {
          gem: 14,
          probability: 0.00015255530129672007,
          multiplier: 6489.45,
        },
        {
          gem: 15,
          probability: 0.00004160599126274184,
          multiplier: 23794.65,
        },
        {
          gem: 16,
          probability: 0.000008321198252548368,
          multiplier: 118973.24999999999,
        },
        {
          gem: 17,
          probability: 9.245775836164852e-7,
          multiplier: 1070759.25,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.64,
          multiplier: 1.546875,
        },
        {
          gem: 2,
          probability: 0.4,
          multiplier: 2.475,
        },
        {
          gem: 3,
          probability: 0.24347826086956523,
          multiplier: 4.066071428571428,
        },
        {
          gem: 4,
          probability: 0.14387351778656127,
          multiplier: 6.881043956043956,
        },
        {
          gem: 5,
          probability: 0.08221343873517788,
          multiplier: 12.041826923076922,
        },
        {
          gem: 6,
          probability: 0.045217391304347834,
          multiplier: 21.894230769230763,
        },
        {
          gem: 7,
          probability: 0.023798627002288325,
          multiplier: 41.59903846153846,
        },
        {
          gem: 8,
          probability: 0.011899313501144163,
          multiplier: 83.19807692307693,
        },
        {
          gem: 9,
          probability: 0.005599676941714901,
          multiplier: 176.79591346153848,
        },
        {
          gem: 10,
          probability: 0.0024498586620002698,
          multiplier: 404.10494505494495,
        },
        {
          gem: 11,
          probability: 0.0009799434648001077,
          multiplier: 1010.2623626373626,
        },
        {
          gem: 12,
          probability: 0.0003499798088571813,
          multiplier: 2828.7346153846156,
        },
        {
          gem: 13,
          probability: 0.00010768609503297885,
          multiplier: 9193.387500000003,
        },
        {
          gem: 14,
          probability: 0.000026921523758244717,
          multiplier: 36773.55,
        },
        {
          gem: 15,
          probability: 0.00000489482250149904,
          multiplier: 202254.52499999997,
        },
        {
          gem: 16,
          probability: 4.894822501499039e-7,
          multiplier: 2022545.2500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6,
          multiplier: 1.6500000000000001,
        },
        {
          gem: 2,
          probability: 0.35,
          multiplier: 2.8285714285714287,
        },
        {
          gem: 3,
          probability: 0.19782608695652176,
          multiplier: 5.004395604395604,
        },
        {
          gem: 4,
          probability: 0.10790513833992094,
          multiplier: 9.174725274725276,
        },
        {
          gem: 5,
          probability: 0.05652173913043479,
          multiplier: 17.515384615384612,
        },
        {
          gem: 6,
          probability: 0.028260869565217395,
          multiplier: 35.030769230769224,
        },
        {
          gem: 7,
          probability: 0.01338672768878718,
          multiplier: 73.95384615384619,
        },
        {
          gem: 8,
          probability: 0.005949656750572081,
          multiplier: 166.39615384615385,
        },
        {
          gem: 9,
          probability: 0.0024498586620002693,
          multiplier: 404.104945054945,
        },
        {
          gem: 10,
          probability: 0.0009186969982501011,
          multiplier: 1077.6131868131865,
        },
        {
          gem: 11,
          probability: 0.00030623233275003367,
          multiplier: 3232.83956043956,
        },
        {
          gem: 12,
          probability: 0.00008749495221429533,
          multiplier: 11314.938461538462,
        },
        {
          gem: 13,
          probability: 0.000020191142818683533,
          multiplier: 49031.40000000001,
        },
        {
          gem: 14,
          probability: 0.0000033651904697805896,
          multiplier: 294188.4,
        },
        {
          gem: 15,
          probability: 3.0592640634369e-7,
          multiplier: 3236072.3999999994,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.56,
          multiplier: 1.7678571428571428,
        },
        {
          gem: 2,
          probability: 0.30333333333333334,
          multiplier: 3.2637362637362637,
        },
        {
          gem: 3,
          probability: 0.1582608695652174,
          multiplier: 6.2554945054945055,
        },
        {
          gem: 4,
          probability: 0.07913043478260869,
          multiplier: 12.510989010989013,
        },
        {
          gem: 5,
          probability: 0.03768115942028986,
          multiplier: 26.27307692307692,
        },
        {
          gem: 6,
          probability: 0.016956521739130436,
          multiplier: 58.38461538461538,
        },
        {
          gem: 7,
          probability: 0.007139588100686497,
          multiplier: 138.66346153846158,
        },
        {
          gem: 8,
          probability: 0.0027765064836003045,
          multiplier: 356.5631868131869,
        },
        {
          gem: 9,
          probability: 0.0009799434648001077,
          multiplier: 1010.2623626373626,
        },
        {
          gem: 10,
          probability: 0.0003062323327500337,
          multiplier: 3232.8395604395596,
        },
        {
          gem: 11,
          probability: 0.00008166195540000897,
          multiplier: 12123.148351648351,
        },
        {
          gem: 12,
          probability: 0.000017498990442859063,
          multiplier: 56574.69230769232,
        },
        {
          gem: 13,
          probability: 0.0000026921523758244713,
          multiplier: 367735.50000000006,
        },
        {
          gem: 14,
          probability: 2.2434603131870596e-7,
          multiplier: 4412826,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.52,
          multiplier: 1.9038461538461537,
        },
        {
          gem: 2,
          probability: 0.26,
          multiplier: 3.8076923076923075,
        },
        {
          gem: 3,
          probability: 0.12434782608695652,
          multiplier: 7.961538461538461,
        },
        {
          gem: 4,
          probability: 0.056521739130434775,
          multiplier: 17.515384615384615,
        },
        {
          gem: 5,
          probability: 0.024223602484472053,
          multiplier: 40.86923076923076,
        },
        {
          gem: 6,
          probability: 0.009689440993788821,
          multiplier: 102.1730769230769,
        },
        {
          gem: 7,
          probability: 0.0035697940503432485,
          multiplier: 277.32692307692315,
        },
        {
          gem: 8,
          probability: 0.0011899313501144164,
          multiplier: 831.9807692307693,
        },
        {
          gem: 9,
          probability: 0.0003499798088571813,
          multiplier: 2828.7346153846156,
        },
        {
          gem: 10,
          probability: 0.00008749495221429534,
          multiplier: 11314.93846153846,
        },
        {
          gem: 11,
          probability: 0.000017498990442859066,
          multiplier: 56574.692307692305,
        },
        {
          gem: 12,
          probability: 0.0000024998557775512948,
          multiplier: 396022.84615384624,
        },
        {
          gem: 13,
          probability: 1.922965982731765e-7,
          multiplier: 5148297.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.48,
          multiplier: 2.0625,
        },
        {
          gem: 2,
          probability: 0.22,
          multiplier: 4.5,
        },
        {
          gem: 3,
          probability: 0.09565217391304348,
          multiplier: 10.35,
        },
        {
          gem: 4,
          probability: 0.03913043478260869,
          multiplier: 25.3,
        },
        {
          gem: 5,
          probability: 0.014906832298136647,
          multiplier: 66.4125,
        },
        {
          gem: 6,
          probability: 0.005217391304347826,
          multiplier: 189.75000000000003,
        },
        {
          gem: 7,
          probability: 0.0016475972540045763,
          multiplier: 600.8750000000001,
        },
        {
          gem: 8,
          probability: 0.0004576659038901602,
          multiplier: 2163.15,
        },
        {
          gem: 9,
          probability: 0.00010768609503297887,
          multiplier: 9193.3875,
        },
        {
          gem: 10,
          probability: 0.00002019114281868354,
          multiplier: 49031.399999999994,
        },
        {
          gem: 11,
          probability: 0.0000026921523758244718,
          multiplier: 367735.5,
        },
        {
          gem: 12,
          probability: 1.922965982731765e-7,
          multiplier: 5148297.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.44,
          multiplier: 2.25,
        },
        {
          gem: 2,
          probability: 0.18333333333333332,
          multiplier: 5.4,
        },
        {
          gem: 3,
          probability: 0.07173913043478261,
          multiplier: 13.8,
        },
        {
          gem: 4,
          probability: 0.026086956521739126,
          multiplier: 37.95000000000001,
        },
        {
          gem: 5,
          probability: 0.008695652173913044,
          multiplier: 113.85,
        },
        {
          gem: 6,
          probability: 0.0026086956521739132,
          multiplier: 379.5,
        },
        {
          gem: 7,
          probability: 0.0006864988558352401,
          multiplier: 1442.1000000000004,
        },
        {
          gem: 8,
          probability: 0.00015255530129672007,
          multiplier: 6489.45,
        },
        {
          gem: 9,
          probability: 0.000026921523758244717,
          multiplier: 36773.55,
        },
        {
          gem: 10,
          probability: 0.00000336519046978059,
          multiplier: 294188.39999999997,
        },
        {
          gem: 11,
          probability: 2.2434603131870596e-7,
          multiplier: 4412826,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4,
          multiplier: 2.475,
        },
        {
          gem: 2,
          probability: 0.15,
          multiplier: 6.6000000000000005,
        },
        {
          gem: 3,
          probability: 0.05217391304347826,
          multiplier: 18.975,
        },
        {
          gem: 4,
          probability: 0.016600790513833986,
          multiplier: 59.6357142857143,
        },
        {
          gem: 5,
          probability: 0.0047430830039525695,
          multiplier: 208.72499999999997,
        },
        {
          gem: 6,
          probability: 0.0011857707509881424,
          multiplier: 834.8999999999999,
        },
        {
          gem: 7,
          probability: 0.00024963594757645096,
          multiplier: 3965.7750000000005,
        },
        {
          gem: 8,
          probability: 0.00004160599126274184,
          multiplier: 23794.65,
        },
        {
          gem: 9,
          probability: 0.000004894822501499039,
          multiplier: 202254.525,
        },
        {
          gem: 10,
          probability: 3.0592640634369e-7,
          multiplier: 3236072.3999999994,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.36,
          multiplier: 2.75,
        },
        {
          gem: 2,
          probability: 0.12,
          multiplier: 8.25,
        },
        {
          gem: 3,
          probability: 0.03652173913043478,
          multiplier: 27.107142857142858,
        },
        {
          gem: 4,
          probability: 0.009960474308300394,
          multiplier: 99.39285714285715,
        },
        {
          gem: 5,
          probability: 0.0023715415019762848,
          multiplier: 417.44999999999993,
        },
        {
          gem: 6,
          probability: 0.0004743083003952569,
          multiplier: 2087.25,
        },
        {
          gem: 7,
          probability: 0.00007489078427293529,
          multiplier: 13219.250000000004,
        },
        {
          gem: 8,
          probability: 0.000008321198252548368,
          multiplier: 118973.24999999999,
        },
        {
          gem: 9,
          probability: 4.894822501499039e-7,
          multiplier: 2022545.2500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.32,
          multiplier: 3.09375,
        },
        {
          gem: 2,
          probability: 0.09333333333333334,
          multiplier: 10.607142857142856,
        },
        {
          gem: 3,
          probability: 0.02434782608695652,
          multiplier: 40.660714285714285,
        },
        {
          gem: 4,
          probability: 0.005533596837944663,
          multiplier: 178.9071428571429,
        },
        {
          gem: 5,
          probability: 0.0010540184453227933,
          multiplier: 939.2624999999999,
        },
        {
          gem: 6,
          probability: 0.000158102766798419,
          multiplier: 6261.749999999999,
        },
        {
          gem: 7,
          probability: 0.000016642396505096728,
          multiplier: 59486.62500000002,
        },
        {
          gem: 8,
          probability: 9.245775836164852e-7,
          multiplier: 1070759.25,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.28,
          multiplier: 3.5357142857142856,
        },
        {
          gem: 2,
          probability: 0.07,
          multiplier: 14.142857142857142,
        },
        {
          gem: 3,
          probability: 0.015217391304347827,
          multiplier: 65.05714285714285,
        },
        {
          gem: 4,
          probability: 0.0027667984189723317,
          multiplier: 357.8142857142858,
        },
        {
          gem: 5,
          probability: 0.0003952569169960475,
          multiplier: 2504.6999999999994,
        },
        {
          gem: 6,
          probability: 0.00003952569169960475,
          multiplier: 25046.999999999996,
        },
        {
          gem: 7,
          probability: 0.000002080299563137091,
          multiplier: 475893.0000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.24,
          multiplier: 4.125,
        },
        {
          gem: 2,
          probability: 0.05,
          multiplier: 19.8,
        },
        {
          gem: 3,
          probability: 0.008695652173913044,
          multiplier: 113.85,
        },
        {
          gem: 4,
          probability: 0.0011857707509881422,
          multiplier: 834.9,
        },
        {
          gem: 5,
          probability: 0.00011293054771315642,
          multiplier: 8766.449999999999,
        },
        {
          gem: 6,
          probability: 0.000005646527385657822,
          multiplier: 175328.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2,
          multiplier: 4.95,
        },
        {
          gem: 2,
          probability: 0.03333333333333333,
          multiplier: 29.7,
        },
        {
          gem: 3,
          probability: 0.004347826086956522,
          multiplier: 227.7,
        },
        {
          gem: 4,
          probability: 0.00039525691699604737,
          multiplier: 2504.7000000000003,
        },
        {
          gem: 5,
          probability: 0.000018821757952192737,
          multiplier: 52598.69999999999,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.16,
          multiplier: 6.1875,
        },
        {
          gem: 2,
          probability: 0.02,
          multiplier: 49.5,
        },
        {
          gem: 3,
          probability: 0.0017391304347826088,
          multiplier: 569.25,
        },
        {
          gem: 4,
          probability: 0.00007905138339920947,
          multiplier: 12523.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.12,
          multiplier: 8.25,
        },
        {
          gem: 2,
          probability: 0.01,
          multiplier: 99,
        },
        {
          gem: 3,
          probability: 0.0004347826086956522,
          multiplier: 2277,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.08,
          multiplier: 12.375,
        },
        {
          gem: 2,
          probability: 0.0033333333333333335,
          multiplier: 297,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.04,
          multiplier: 24.75,
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
          probability: 0.96,
          multiplier: 1.0104166666666667,
        },
        {
          gem: 2,
          probability: 0.92,
          multiplier: 1.0543478260869565,
        },
        {
          gem: 3,
          probability: 0.8800000000000001,
          multiplier: 1.102272727272727,
        },
        {
          gem: 4,
          probability: 0.8399999999999999,
          multiplier: 1.1547619047619049,
        },
        {
          gem: 5,
          probability: 0.7999999999999999,
          multiplier: 1.2125,
        },
        {
          gem: 6,
          probability: 0.7600000000000003,
          multiplier: 1.2763157894736836,
        },
        {
          gem: 7,
          probability: 0.7199999999999999,
          multiplier: 1.3472222222222223,
        },
        {
          gem: 8,
          probability: 0.68,
          multiplier: 1.426470588235294,
        },
        {
          gem: 9,
          probability: 0.64,
          multiplier: 1.515625,
        },
        {
          gem: 10,
          probability: 0.6000000000000001,
          multiplier: 1.6166666666666665,
        },
        {
          gem: 11,
          probability: 0.56,
          multiplier: 1.732142857142857,
        },
        {
          gem: 12,
          probability: 0.5200000000000001,
          multiplier: 1.865384615384615,
        },
        {
          gem: 13,
          probability: 0.48,
          multiplier: 2.0208333333333335,
        },
        {
          gem: 14,
          probability: 0.44,
          multiplier: 2.2045454545454546,
        },
        {
          gem: 15,
          probability: 0.4000000000000001,
          multiplier: 2.4249999999999994,
        },
        {
          gem: 16,
          probability: 0.36,
          multiplier: 2.694444444444444,
        },
        {
          gem: 17,
          probability: 0.32,
          multiplier: 3.03125,
        },
        {
          gem: 18,
          probability: 0.27999999999999997,
          multiplier: 3.4642857142857144,
        },
        {
          gem: 19,
          probability: 0.24,
          multiplier: 4.041666666666667,
        },
        {
          gem: 20,
          probability: 0.20000000000000004,
          multiplier: 4.849999999999999,
        },
        {
          gem: 21,
          probability: 0.16,
          multiplier: 6.0625,
        },
        {
          gem: 22,
          probability: 0.12,
          multiplier: 8.083333333333334,
        },
        {
          gem: 23,
          probability: 0.08,
          multiplier: 12.125,
        },
        {
          gem: 24,
          probability: 0.04,
          multiplier: 24.25,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.92,
          multiplier: 1.0543478260869565,
        },
        {
          gem: 2,
          probability: 0.8433333333333334,
          multiplier: 1.150197628458498,
        },
        {
          gem: 3,
          probability: 0.77,
          multiplier: 1.2597402597402596,
        },
        {
          gem: 4,
          probability: 0.6999999999999998,
          multiplier: 1.385714285714286,
        },
        {
          gem: 5,
          probability: 0.6333333333333335,
          multiplier: 1.5315789473684207,
        },
        {
          gem: 6,
          probability: 0.5700000000000001,
          multiplier: 1.7017543859649122,
        },
        {
          gem: 7,
          probability: 0.5099999999999999,
          multiplier: 1.9019607843137258,
        },
        {
          gem: 8,
          probability: 0.4533333333333333,
          multiplier: 2.139705882352941,
        },
        {
          gem: 9,
          probability: 0.4,
          multiplier: 2.425,
        },
        {
          gem: 10,
          probability: 0.35000000000000014,
          multiplier: 2.77142857142857,
        },
        {
          gem: 11,
          probability: 0.3033333333333334,
          multiplier: 3.197802197802197,
        },
        {
          gem: 12,
          probability: 0.26,
          multiplier: 3.7307692307692304,
        },
        {
          gem: 13,
          probability: 0.22,
          multiplier: 4.409090909090909,
        },
        {
          gem: 14,
          probability: 0.18333333333333332,
          multiplier: 5.290909090909091,
        },
        {
          gem: 15,
          probability: 0.15000000000000002,
          multiplier: 6.466666666666666,
        },
        {
          gem: 16,
          probability: 0.12,
          multiplier: 8.083333333333334,
        },
        {
          gem: 17,
          probability: 0.09333333333333334,
          multiplier: 10.392857142857142,
        },
        {
          gem: 18,
          probability: 0.06999999999999999,
          multiplier: 13.857142857142858,
        },
        {
          gem: 19,
          probability: 0.05000000000000001,
          multiplier: 19.399999999999995,
        },
        {
          gem: 20,
          probability: 0.03333333333333334,
          multiplier: 29.09999999999999,
        },
        {
          gem: 21,
          probability: 0.019999999999999997,
          multiplier: 48.50000000000001,
        },
        {
          gem: 22,
          probability: 0.01,
          multiplier: 97,
        },
        {
          gem: 23,
          probability: 0.0033333333333333335,
          multiplier: 291,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.88,
          multiplier: 1.1022727272727273,
        },
        {
          gem: 2,
          probability: 0.77,
          multiplier: 1.2597402597402596,
        },
        {
          gem: 3,
          probability: 0.6695652173913044,
          multiplier: 1.4487012987012986,
        },
        {
          gem: 4,
          probability: 0.5782608695652173,
          multiplier: 1.6774436090225568,
        },
        {
          gem: 5,
          probability: 0.49565217391304356,
          multiplier: 1.9570175438596487,
        },
        {
          gem: 6,
          probability: 0.421304347826087,
          multiplier: 2.3023735810113517,
        },
        {
          gem: 7,
          probability: 0.3547826086956521,
          multiplier: 2.734068627450981,
        },
        {
          gem: 8,
          probability: 0.2956521739130435,
          multiplier: 3.2808823529411764,
        },
        {
          gem: 9,
          probability: 0.24347826086956523,
          multiplier: 3.983928571428571,
        },
        {
          gem: 10,
          probability: 0.1978260869565218,
          multiplier: 4.903296703296702,
        },
        {
          gem: 11,
          probability: 0.1582608695652174,
          multiplier: 6.129120879120879,
        },
        {
          gem: 12,
          probability: 0.12434782608695652,
          multiplier: 7.8006993006993,
        },
        {
          gem: 13,
          probability: 0.09565217391304347,
          multiplier: 10.14090909090909,
        },
        {
          gem: 14,
          probability: 0.07173913043478261,
          multiplier: 13.521212121212121,
        },
        {
          gem: 15,
          probability: 0.052173913043478265,
          multiplier: 18.591666666666665,
        },
        {
          gem: 16,
          probability: 0.036521739130434785,
          multiplier: 26.559523809523807,
        },
        {
          gem: 17,
          probability: 0.02434782608695652,
          multiplier: 39.83928571428571,
        },
        {
          gem: 18,
          probability: 0.015217391304347823,
          multiplier: 63.74285714285715,
        },
        {
          gem: 19,
          probability: 0.008695652173913045,
          multiplier: 111.54999999999997,
        },
        {
          gem: 20,
          probability: 0.004347826086956523,
          multiplier: 223.09999999999994,
        },
        {
          gem: 21,
          probability: 0.0017391304347826085,
          multiplier: 557.75,
        },
        {
          gem: 22,
          probability: 0.0004347826086956522,
          multiplier: 2231,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.84,
          multiplier: 1.1547619047619047,
        },
        {
          gem: 2,
          probability: 0.7,
          multiplier: 1.3857142857142857,
        },
        {
          gem: 3,
          probability: 0.5782608695652174,
          multiplier: 1.6774436090225564,
        },
        {
          gem: 4,
          probability: 0.4731225296442687,
          multiplier: 2.0502088554720137,
        },
        {
          gem: 5,
          probability: 0.38300395256917,
          multiplier: 2.532610939112487,
        },
        {
          gem: 6,
          probability: 0.306403162055336,
          multiplier: 3.1657636738906083,
        },
        {
          gem: 7,
          probability: 0.24189723320158096,
          multiplier: 4.009967320261439,
        },
        {
          gem: 8,
          probability: 0.18814229249011857,
          multiplier: 5.155672268907563,
        },
        {
          gem: 9,
          probability: 0.1438735177865613,
          multiplier: 6.742032967032966,
        },
        {
          gem: 10,
          probability: 0.10790513833992096,
          multiplier: 8.989377289377288,
        },
        {
          gem: 11,
          probability: 0.0791304347826087,
          multiplier: 12.258241758241757,
        },
        {
          gem: 12,
          probability: 0.05652173913043478,
          multiplier: 17.161538461538463,
        },
        {
          gem: 13,
          probability: 0.03913043478260869,
          multiplier: 24.78888888888889,
        },
        {
          gem: 14,
          probability: 0.02608695652173913,
          multiplier: 37.18333333333334,
        },
        {
          gem: 15,
          probability: 0.016600790513833993,
          multiplier: 58.43095238095238,
        },
        {
          gem: 16,
          probability: 0.009960474308300396,
          multiplier: 97.38492063492063,
        },
        {
          gem: 17,
          probability: 0.005533596837944664,
          multiplier: 175.29285714285714,
        },
        {
          gem: 18,
          probability: 0.0027667984189723312,
          multiplier: 350.5857142857144,
        },
        {
          gem: 19,
          probability: 0.0011857707509881424,
          multiplier: 818.0333333333332,
        },
        {
          gem: 20,
          probability: 0.0003952569169960475,
          multiplier: 2454.0999999999995,
        },
        {
          gem: 21,
          probability: 0.00007905138339920947,
          multiplier: 12270.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8,
          multiplier: 1.2125,
        },
        {
          gem: 2,
          probability: 0.6333333333333333,
          multiplier: 1.531578947368421,
        },
        {
          gem: 3,
          probability: 0.4956521739130435,
          multiplier: 1.957017543859649,
        },
        {
          gem: 4,
          probability: 0.3830039525691699,
          multiplier: 2.532610939112487,
        },
        {
          gem: 5,
          probability: 0.29181253529079615,
          multiplier: 3.324051857585139,
        },
        {
          gem: 6,
          probability: 0.21885940146809715,
          multiplier: 4.432069143446852,
        },
        {
          gem: 7,
          probability: 0.1612648221343873,
          multiplier: 6.014950980392158,
        },
        {
          gem: 8,
          probability: 0.11646903820816866,
          multiplier: 8.32839366515837,
        },
        {
          gem: 9,
          probability: 0.08221343873517786,
          multiplier: 11.798557692307693,
        },
        {
          gem: 10,
          probability: 0.05652173913043479,
          multiplier: 17.16153846153846,
        },
        {
          gem: 11,
          probability: 0.03768115942028986,
          multiplier: 25.74230769230769,
        },
        {
          gem: 12,
          probability: 0.02422360248447205,
          multiplier: 40.04358974358974,
        },
        {
          gem: 13,
          probability: 0.014906832298136644,
          multiplier: 65.07083333333334,
        },
        {
          gem: 14,
          probability: 0.008695652173913044,
          multiplier: 111.55,
        },
        {
          gem: 15,
          probability: 0.0047430830039525695,
          multiplier: 204.5083333333333,
        },
        {
          gem: 16,
          probability: 0.0023715415019762848,
          multiplier: 409.0166666666666,
        },
        {
          gem: 17,
          probability: 0.001054018445322793,
          multiplier: 920.2875000000001,
        },
        {
          gem: 18,
          probability: 0.0003952569169960473,
          multiplier: 2454.100000000001,
        },
        {
          gem: 19,
          probability: 0.00011293054771315642,
          multiplier: 8589.349999999999,
        },
        {
          gem: 20,
          probability: 0.000018821757952192737,
          multiplier: 51536.09999999999,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.76,
          multiplier: 1.2763157894736843,
        },
        {
          gem: 2,
          probability: 0.57,
          multiplier: 1.7017543859649125,
        },
        {
          gem: 3,
          probability: 0.42130434782608694,
          multiplier: 2.302373581011352,
        },
        {
          gem: 4,
          probability: 0.3064031620553359,
          multiplier: 3.1657636738906096,
        },
        {
          gem: 5,
          probability: 0.21885940146809715,
          multiplier: 4.432069143446852,
        },
        {
          gem: 6,
          probability: 0.153201581027668,
          multiplier: 6.331527347781217,
        },
        {
          gem: 7,
          probability: 0.10482213438735177,
          multiplier: 9.253770739064857,
        },
        {
          gem: 8,
          probability: 0.06988142292490117,
          multiplier: 13.88065610859729,
        },
        {
          gem: 9,
          probability: 0.04521739130434783,
          multiplier: 21.451923076923073,
        },
        {
          gem: 10,
          probability: 0.028260869565217395,
          multiplier: 34.32307692307692,
        },
        {
          gem: 11,
          probability: 0.016956521739130433,
          multiplier: 57.20512820512821,
        },
        {
          gem: 12,
          probability: 0.00968944099378882,
          multiplier: 100.10897435897436,
        },
        {
          gem: 13,
          probability: 0.005217391304347825,
          multiplier: 185.9166666666667,
        },
        {
          gem: 14,
          probability: 0.0026086956521739132,
          multiplier: 371.8333333333333,
        },
        {
          gem: 15,
          probability: 0.0011857707509881424,
          multiplier: 818.0333333333332,
        },
        {
          gem: 16,
          probability: 0.0004743083003952569,
          multiplier: 2045.0833333333335,
        },
        {
          gem: 17,
          probability: 0.00015810276679841898,
          multiplier: 6135.25,
        },
        {
          gem: 18,
          probability: 0.00003952569169960473,
          multiplier: 24541.000000000007,
        },
        {
          gem: 19,
          probability: 0.000005646527385657822,
          multiplier: 171786.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.72,
          multiplier: 1.347222222222222,
        },
        {
          gem: 2,
          probability: 0.51,
          multiplier: 1.9019607843137254,
        },
        {
          gem: 3,
          probability: 0.35478260869565215,
          multiplier: 2.7340686274509807,
        },
        {
          gem: 4,
          probability: 0.241897233201581,
          multiplier: 4.009967320261438,
        },
        {
          gem: 5,
          probability: 0.16126482213438736,
          multiplier: 6.014950980392156,
        },
        {
          gem: 6,
          probability: 0.10482213438735181,
          multiplier: 9.253770739064853,
        },
        {
          gem: 7,
          probability: 0.06620345329727478,
          multiplier: 14.651803670186029,
        },
        {
          gem: 8,
          probability: 0.04045766590389016,
          multiplier: 23.97567873303167,
        },
        {
          gem: 9,
          probability: 0.023798627002288325,
          multiplier: 40.75865384615385,
        },
        {
          gem: 10,
          probability: 0.013386727688787188,
          multiplier: 72.45982905982905,
        },
        {
          gem: 11,
          probability: 0.007139588100686498,
          multiplier: 135.8621794871795,
        },
        {
          gem: 12,
          probability: 0.0035697940503432494,
          multiplier: 271.72435897435895,
        },
        {
          gem: 13,
          probability: 0.0016475972540045763,
          multiplier: 588.7361111111112,
        },
        {
          gem: 14,
          probability: 0.0006864988558352403,
          multiplier: 1412.9666666666667,
        },
        {
          gem: 15,
          probability: 0.00024963594757645107,
          multiplier: 3885.6583333333324,
        },
        {
          gem: 16,
          probability: 0.0000748907842729353,
          multiplier: 12952.194444444443,
        },
        {
          gem: 17,
          probability: 0.000016642396505096735,
          multiplier: 58284.87499999999,
        },
        {
          gem: 18,
          probability: 0.000002080299563137091,
          multiplier: 466279.0000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.68,
          multiplier: 1.426470588235294,
        },
        {
          gem: 2,
          probability: 0.4533333333333333,
          multiplier: 2.139705882352941,
        },
        {
          gem: 3,
          probability: 0.2956521739130435,
          multiplier: 3.2808823529411764,
        },
        {
          gem: 4,
          probability: 0.18814229249011855,
          multiplier: 5.155672268907564,
        },
        {
          gem: 5,
          probability: 0.11646903820816867,
          multiplier: 8.32839366515837,
        },
        {
          gem: 6,
          probability: 0.0698814229249012,
          multiplier: 13.880656108597282,
        },
        {
          gem: 7,
          probability: 0.04045766590389015,
          multiplier: 23.97567873303168,
        },
        {
          gem: 8,
          probability: 0.022476481057716755,
          multiplier: 43.156221719457015,
        },
        {
          gem: 9,
          probability: 0.011899313501144164,
          multiplier: 81.5173076923077,
        },
        {
          gem: 10,
          probability: 0.005949656750572083,
          multiplier: 163.03461538461536,
        },
        {
          gem: 11,
          probability: 0.002776506483600305,
          multiplier: 349.35989010989016,
        },
        {
          gem: 12,
          probability: 0.0011899313501144164,
          multiplier: 815.173076923077,
        },
        {
          gem: 13,
          probability: 0.0004576659038901601,
          multiplier: 2119.4500000000003,
        },
        {
          gem: 14,
          probability: 0.00015255530129672007,
          multiplier: 6358.349999999999,
        },
        {
          gem: 15,
          probability: 0.00004160599126274184,
          multiplier: 23313.95,
        },
        {
          gem: 16,
          probability: 0.000008321198252548368,
          multiplier: 116569.74999999999,
        },
        {
          gem: 17,
          probability: 9.245775836164852e-7,
          multiplier: 1049127.75,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.64,
          multiplier: 1.515625,
        },
        {
          gem: 2,
          probability: 0.4,
          multiplier: 2.425,
        },
        {
          gem: 3,
          probability: 0.24347826086956523,
          multiplier: 3.983928571428571,
        },
        {
          gem: 4,
          probability: 0.14387351778656127,
          multiplier: 6.742032967032967,
        },
        {
          gem: 5,
          probability: 0.08221343873517788,
          multiplier: 11.798557692307691,
        },
        {
          gem: 6,
          probability: 0.045217391304347834,
          multiplier: 21.45192307692307,
        },
        {
          gem: 7,
          probability: 0.023798627002288325,
          multiplier: 40.75865384615385,
        },
        {
          gem: 8,
          probability: 0.011899313501144163,
          multiplier: 81.5173076923077,
        },
        {
          gem: 9,
          probability: 0.005599676941714901,
          multiplier: 173.22427884615385,
        },
        {
          gem: 10,
          probability: 0.0024498586620002698,
          multiplier: 395.9412087912087,
        },
        {
          gem: 11,
          probability: 0.0009799434648001077,
          multiplier: 989.8530219780218,
        },
        {
          gem: 12,
          probability: 0.0003499798088571813,
          multiplier: 2771.5884615384616,
        },
        {
          gem: 13,
          probability: 0.00010768609503297885,
          multiplier: 9007.662500000002,
        },
        {
          gem: 14,
          probability: 0.000026921523758244717,
          multiplier: 36030.65,
        },
        {
          gem: 15,
          probability: 0.00000489482250149904,
          multiplier: 198168.57499999995,
        },
        {
          gem: 16,
          probability: 4.894822501499039e-7,
          multiplier: 1981685.7500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6,
          multiplier: 1.6166666666666667,
        },
        {
          gem: 2,
          probability: 0.35,
          multiplier: 2.7714285714285714,
        },
        {
          gem: 3,
          probability: 0.19782608695652176,
          multiplier: 4.903296703296703,
        },
        {
          gem: 4,
          probability: 0.10790513833992094,
          multiplier: 8.98937728937729,
        },
        {
          gem: 5,
          probability: 0.05652173913043479,
          multiplier: 17.16153846153846,
        },
        {
          gem: 6,
          probability: 0.028260869565217395,
          multiplier: 34.32307692307692,
        },
        {
          gem: 7,
          probability: 0.01338672768878718,
          multiplier: 72.45982905982909,
        },
        {
          gem: 8,
          probability: 0.005949656750572081,
          multiplier: 163.0346153846154,
        },
        {
          gem: 9,
          probability: 0.0024498586620002693,
          multiplier: 395.94120879120874,
        },
        {
          gem: 10,
          probability: 0.0009186969982501011,
          multiplier: 1055.8432234432232,
        },
        {
          gem: 11,
          probability: 0.00030623233275003367,
          multiplier: 3167.52967032967,
        },
        {
          gem: 12,
          probability: 0.00008749495221429533,
          multiplier: 11086.353846153846,
        },
        {
          gem: 13,
          probability: 0.000020191142818683533,
          multiplier: 48040.866666666676,
        },
        {
          gem: 14,
          probability: 0.0000033651904697805896,
          multiplier: 288245.2,
        },
        {
          gem: 15,
          probability: 3.0592640634369e-7,
          multiplier: 3170697.1999999993,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.56,
          multiplier: 1.732142857142857,
        },
        {
          gem: 2,
          probability: 0.30333333333333334,
          multiplier: 3.1978021978021975,
        },
        {
          gem: 3,
          probability: 0.1582608695652174,
          multiplier: 6.129120879120879,
        },
        {
          gem: 4,
          probability: 0.07913043478260869,
          multiplier: 12.258241758241759,
        },
        {
          gem: 5,
          probability: 0.03768115942028986,
          multiplier: 25.74230769230769,
        },
        {
          gem: 6,
          probability: 0.016956521739130436,
          multiplier: 57.2051282051282,
        },
        {
          gem: 7,
          probability: 0.007139588100686497,
          multiplier: 135.8621794871795,
        },
        {
          gem: 8,
          probability: 0.0027765064836003045,
          multiplier: 349.3598901098902,
        },
        {
          gem: 9,
          probability: 0.0009799434648001077,
          multiplier: 989.8530219780218,
        },
        {
          gem: 10,
          probability: 0.0003062323327500337,
          multiplier: 3167.5296703296694,
        },
        {
          gem: 11,
          probability: 0.00008166195540000897,
          multiplier: 11878.236263736264,
        },
        {
          gem: 12,
          probability: 0.000017498990442859063,
          multiplier: 55431.76923076924,
        },
        {
          gem: 13,
          probability: 0.0000026921523758244713,
          multiplier: 360306.50000000006,
        },
        {
          gem: 14,
          probability: 2.2434603131870596e-7,
          multiplier: 4323678,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.52,
          multiplier: 1.8653846153846152,
        },
        {
          gem: 2,
          probability: 0.26,
          multiplier: 3.7307692307692304,
        },
        {
          gem: 3,
          probability: 0.12434782608695652,
          multiplier: 7.8006993006993,
        },
        {
          gem: 4,
          probability: 0.056521739130434775,
          multiplier: 17.161538461538463,
        },
        {
          gem: 5,
          probability: 0.024223602484472053,
          multiplier: 40.043589743589735,
        },
        {
          gem: 6,
          probability: 0.009689440993788821,
          multiplier: 100.10897435897434,
        },
        {
          gem: 7,
          probability: 0.0035697940503432485,
          multiplier: 271.724358974359,
        },
        {
          gem: 8,
          probability: 0.0011899313501144164,
          multiplier: 815.173076923077,
        },
        {
          gem: 9,
          probability: 0.0003499798088571813,
          multiplier: 2771.5884615384616,
        },
        {
          gem: 10,
          probability: 0.00008749495221429534,
          multiplier: 11086.353846153845,
        },
        {
          gem: 11,
          probability: 0.000017498990442859066,
          multiplier: 55431.76923076923,
        },
        {
          gem: 12,
          probability: 0.0000024998557775512948,
          multiplier: 388022.3846153847,
        },
        {
          gem: 13,
          probability: 1.922965982731765e-7,
          multiplier: 5044291.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.48,
          multiplier: 2.0208333333333335,
        },
        {
          gem: 2,
          probability: 0.22,
          multiplier: 4.409090909090909,
        },
        {
          gem: 3,
          probability: 0.09565217391304348,
          multiplier: 10.14090909090909,
        },
        {
          gem: 4,
          probability: 0.03913043478260869,
          multiplier: 24.78888888888889,
        },
        {
          gem: 5,
          probability: 0.014906832298136647,
          multiplier: 65.07083333333333,
        },
        {
          gem: 6,
          probability: 0.005217391304347826,
          multiplier: 185.91666666666669,
        },
        {
          gem: 7,
          probability: 0.0016475972540045763,
          multiplier: 588.7361111111112,
        },
        {
          gem: 8,
          probability: 0.0004576659038901602,
          multiplier: 2119.45,
        },
        {
          gem: 9,
          probability: 0.00010768609503297887,
          multiplier: 9007.6625,
        },
        {
          gem: 10,
          probability: 0.00002019114281868354,
          multiplier: 48040.86666666666,
        },
        {
          gem: 11,
          probability: 0.0000026921523758244718,
          multiplier: 360306.5,
        },
        {
          gem: 12,
          probability: 1.922965982731765e-7,
          multiplier: 5044291.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.44,
          multiplier: 2.2045454545454546,
        },
        {
          gem: 2,
          probability: 0.18333333333333332,
          multiplier: 5.290909090909091,
        },
        {
          gem: 3,
          probability: 0.07173913043478261,
          multiplier: 13.521212121212121,
        },
        {
          gem: 4,
          probability: 0.026086956521739126,
          multiplier: 37.183333333333344,
        },
        {
          gem: 5,
          probability: 0.008695652173913044,
          multiplier: 111.55,
        },
        {
          gem: 6,
          probability: 0.0026086956521739132,
          multiplier: 371.8333333333333,
        },
        {
          gem: 7,
          probability: 0.0006864988558352401,
          multiplier: 1412.966666666667,
        },
        {
          gem: 8,
          probability: 0.00015255530129672007,
          multiplier: 6358.349999999999,
        },
        {
          gem: 9,
          probability: 0.000026921523758244717,
          multiplier: 36030.65,
        },
        {
          gem: 10,
          probability: 0.00000336519046978059,
          multiplier: 288245.19999999995,
        },
        {
          gem: 11,
          probability: 2.2434603131870596e-7,
          multiplier: 4323678,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4,
          multiplier: 2.425,
        },
        {
          gem: 2,
          probability: 0.15,
          multiplier: 6.466666666666667,
        },
        {
          gem: 3,
          probability: 0.05217391304347826,
          multiplier: 18.59166666666667,
        },
        {
          gem: 4,
          probability: 0.016600790513833986,
          multiplier: 58.4309523809524,
        },
        {
          gem: 5,
          probability: 0.0047430830039525695,
          multiplier: 204.5083333333333,
        },
        {
          gem: 6,
          probability: 0.0011857707509881424,
          multiplier: 818.0333333333332,
        },
        {
          gem: 7,
          probability: 0.00024963594757645096,
          multiplier: 3885.6583333333338,
        },
        {
          gem: 8,
          probability: 0.00004160599126274184,
          multiplier: 23313.95,
        },
        {
          gem: 9,
          probability: 0.000004894822501499039,
          multiplier: 198168.57499999998,
        },
        {
          gem: 10,
          probability: 3.0592640634369e-7,
          multiplier: 3170697.1999999993,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.36,
          multiplier: 2.694444444444444,
        },
        {
          gem: 2,
          probability: 0.12,
          multiplier: 8.083333333333334,
        },
        {
          gem: 3,
          probability: 0.03652173913043478,
          multiplier: 26.55952380952381,
        },
        {
          gem: 4,
          probability: 0.009960474308300394,
          multiplier: 97.38492063492065,
        },
        {
          gem: 5,
          probability: 0.0023715415019762848,
          multiplier: 409.0166666666666,
        },
        {
          gem: 6,
          probability: 0.0004743083003952569,
          multiplier: 2045.0833333333335,
        },
        {
          gem: 7,
          probability: 0.00007489078427293529,
          multiplier: 12952.194444444447,
        },
        {
          gem: 8,
          probability: 0.000008321198252548368,
          multiplier: 116569.74999999999,
        },
        {
          gem: 9,
          probability: 4.894822501499039e-7,
          multiplier: 1981685.7500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.32,
          multiplier: 3.03125,
        },
        {
          gem: 2,
          probability: 0.09333333333333334,
          multiplier: 10.392857142857142,
        },
        {
          gem: 3,
          probability: 0.02434782608695652,
          multiplier: 39.83928571428571,
        },
        {
          gem: 4,
          probability: 0.005533596837944663,
          multiplier: 175.29285714285717,
        },
        {
          gem: 5,
          probability: 0.0010540184453227933,
          multiplier: 920.2874999999999,
        },
        {
          gem: 6,
          probability: 0.000158102766798419,
          multiplier: 6135.249999999999,
        },
        {
          gem: 7,
          probability: 0.000016642396505096728,
          multiplier: 58284.87500000002,
        },
        {
          gem: 8,
          probability: 9.245775836164852e-7,
          multiplier: 1049127.75,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.28,
          multiplier: 3.464285714285714,
        },
        {
          gem: 2,
          probability: 0.07,
          multiplier: 13.857142857142856,
        },
        {
          gem: 3,
          probability: 0.015217391304347827,
          multiplier: 63.74285714285713,
        },
        {
          gem: 4,
          probability: 0.0027667984189723317,
          multiplier: 350.58571428571435,
        },
        {
          gem: 5,
          probability: 0.0003952569169960475,
          multiplier: 2454.0999999999995,
        },
        {
          gem: 6,
          probability: 0.00003952569169960475,
          multiplier: 24540.999999999996,
        },
        {
          gem: 7,
          probability: 0.000002080299563137091,
          multiplier: 466279.0000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.24,
          multiplier: 4.041666666666667,
        },
        {
          gem: 2,
          probability: 0.05,
          multiplier: 19.4,
        },
        {
          gem: 3,
          probability: 0.008695652173913044,
          multiplier: 111.55,
        },
        {
          gem: 4,
          probability: 0.0011857707509881422,
          multiplier: 818.0333333333333,
        },
        {
          gem: 5,
          probability: 0.00011293054771315642,
          multiplier: 8589.349999999999,
        },
        {
          gem: 6,
          probability: 0.000005646527385657822,
          multiplier: 171786.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2,
          multiplier: 4.85,
        },
        {
          gem: 2,
          probability: 0.03333333333333333,
          multiplier: 29.099999999999998,
        },
        {
          gem: 3,
          probability: 0.004347826086956522,
          multiplier: 223.1,
        },
        {
          gem: 4,
          probability: 0.00039525691699604737,
          multiplier: 2454.1000000000004,
        },
        {
          gem: 5,
          probability: 0.000018821757952192737,
          multiplier: 51536.09999999999,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.16,
          multiplier: 6.0625,
        },
        {
          gem: 2,
          probability: 0.02,
          multiplier: 48.5,
        },
        {
          gem: 3,
          probability: 0.0017391304347826088,
          multiplier: 557.75,
        },
        {
          gem: 4,
          probability: 0.00007905138339920947,
          multiplier: 12270.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.12,
          multiplier: 8.083333333333334,
        },
        {
          gem: 2,
          probability: 0.01,
          multiplier: 97,
        },
        {
          gem: 3,
          probability: 0.0004347826086956522,
          multiplier: 2231,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.08,
          multiplier: 12.125,
        },
        {
          gem: 2,
          probability: 0.0033333333333333335,
          multiplier: 291,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.04,
          multiplier: 24.25,
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
          probability: 0.96,
          multiplier: 0.9895833333333334,
        },
        {
          gem: 2,
          probability: 0.92,
          multiplier: 1.0326086956521738,
        },
        {
          gem: 3,
          probability: 0.8800000000000001,
          multiplier: 1.0795454545454544,
        },
        {
          gem: 4,
          probability: 0.8399999999999999,
          multiplier: 1.1309523809523812,
        },
        {
          gem: 5,
          probability: 0.7999999999999999,
          multiplier: 1.1875,
        },
        {
          gem: 6,
          probability: 0.7600000000000003,
          multiplier: 1.2499999999999993,
        },
        {
          gem: 7,
          probability: 0.7199999999999999,
          multiplier: 1.3194444444444446,
        },
        {
          gem: 8,
          probability: 0.68,
          multiplier: 1.3970588235294117,
        },
        {
          gem: 9,
          probability: 0.64,
          multiplier: 1.484375,
        },
        {
          gem: 10,
          probability: 0.6000000000000001,
          multiplier: 1.583333333333333,
        },
        {
          gem: 11,
          probability: 0.56,
          multiplier: 1.6964285714285712,
        },
        {
          gem: 12,
          probability: 0.5200000000000001,
          multiplier: 1.8269230769230764,
        },
        {
          gem: 13,
          probability: 0.48,
          multiplier: 1.9791666666666667,
        },
        {
          gem: 14,
          probability: 0.44,
          multiplier: 2.159090909090909,
        },
        {
          gem: 15,
          probability: 0.4000000000000001,
          multiplier: 2.3749999999999996,
        },
        {
          gem: 16,
          probability: 0.36,
          multiplier: 2.638888888888889,
        },
        {
          gem: 17,
          probability: 0.32,
          multiplier: 2.96875,
        },
        {
          gem: 18,
          probability: 0.27999999999999997,
          multiplier: 3.392857142857143,
        },
        {
          gem: 19,
          probability: 0.24,
          multiplier: 3.9583333333333335,
        },
        {
          gem: 20,
          probability: 0.20000000000000004,
          multiplier: 4.749999999999999,
        },
        {
          gem: 21,
          probability: 0.16,
          multiplier: 5.9375,
        },
        {
          gem: 22,
          probability: 0.12,
          multiplier: 7.916666666666667,
        },
        {
          gem: 23,
          probability: 0.08,
          multiplier: 11.875,
        },
        {
          gem: 24,
          probability: 0.04,
          multiplier: 23.75,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.92,
          multiplier: 1.0326086956521738,
        },
        {
          gem: 2,
          probability: 0.8433333333333334,
          multiplier: 1.1264822134387351,
        },
        {
          gem: 3,
          probability: 0.77,
          multiplier: 1.2337662337662336,
        },
        {
          gem: 4,
          probability: 0.6999999999999998,
          multiplier: 1.3571428571428574,
        },
        {
          gem: 5,
          probability: 0.6333333333333335,
          multiplier: 1.4999999999999996,
        },
        {
          gem: 6,
          probability: 0.5700000000000001,
          multiplier: 1.6666666666666665,
        },
        {
          gem: 7,
          probability: 0.5099999999999999,
          multiplier: 1.862745098039216,
        },
        {
          gem: 8,
          probability: 0.4533333333333333,
          multiplier: 2.0955882352941178,
        },
        {
          gem: 9,
          probability: 0.4,
          multiplier: 2.375,
        },
        {
          gem: 10,
          probability: 0.35000000000000014,
          multiplier: 2.714285714285713,
        },
        {
          gem: 11,
          probability: 0.3033333333333334,
          multiplier: 3.131868131868131,
        },
        {
          gem: 12,
          probability: 0.26,
          multiplier: 3.6538461538461533,
        },
        {
          gem: 13,
          probability: 0.22,
          multiplier: 4.318181818181818,
        },
        {
          gem: 14,
          probability: 0.18333333333333332,
          multiplier: 5.181818181818182,
        },
        {
          gem: 15,
          probability: 0.15000000000000002,
          multiplier: 6.333333333333332,
        },
        {
          gem: 16,
          probability: 0.12,
          multiplier: 7.916666666666667,
        },
        {
          gem: 17,
          probability: 0.09333333333333334,
          multiplier: 10.178571428571427,
        },
        {
          gem: 18,
          probability: 0.06999999999999999,
          multiplier: 13.571428571428571,
        },
        {
          gem: 19,
          probability: 0.05000000000000001,
          multiplier: 18.999999999999996,
        },
        {
          gem: 20,
          probability: 0.03333333333333334,
          multiplier: 28.499999999999993,
        },
        {
          gem: 21,
          probability: 0.019999999999999997,
          multiplier: 47.50000000000001,
        },
        {
          gem: 22,
          probability: 0.01,
          multiplier: 95,
        },
        {
          gem: 23,
          probability: 0.0033333333333333335,
          multiplier: 285,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.88,
          multiplier: 1.0795454545454546,
        },
        {
          gem: 2,
          probability: 0.77,
          multiplier: 1.2337662337662336,
        },
        {
          gem: 3,
          probability: 0.6695652173913044,
          multiplier: 1.4188311688311688,
        },
        {
          gem: 4,
          probability: 0.5782608695652173,
          multiplier: 1.6428571428571432,
        },
        {
          gem: 5,
          probability: 0.49565217391304356,
          multiplier: 1.9166666666666663,
        },
        {
          gem: 6,
          probability: 0.421304347826087,
          multiplier: 2.2549019607843133,
        },
        {
          gem: 7,
          probability: 0.3547826086956521,
          multiplier: 2.677696078431373,
        },
        {
          gem: 8,
          probability: 0.2956521739130435,
          multiplier: 3.2132352941176467,
        },
        {
          gem: 9,
          probability: 0.24347826086956523,
          multiplier: 3.9017857142857135,
        },
        {
          gem: 10,
          probability: 0.1978260869565218,
          multiplier: 4.802197802197801,
        },
        {
          gem: 11,
          probability: 0.1582608695652174,
          multiplier: 6.002747252747252,
        },
        {
          gem: 12,
          probability: 0.12434782608695652,
          multiplier: 7.639860139860139,
        },
        {
          gem: 13,
          probability: 0.09565217391304347,
          multiplier: 9.931818181818182,
        },
        {
          gem: 14,
          probability: 0.07173913043478261,
          multiplier: 13.242424242424242,
        },
        {
          gem: 15,
          probability: 0.052173913043478265,
          multiplier: 18.20833333333333,
        },
        {
          gem: 16,
          probability: 0.036521739130434785,
          multiplier: 26.01190476190476,
        },
        {
          gem: 17,
          probability: 0.02434782608695652,
          multiplier: 39.01785714285714,
        },
        {
          gem: 18,
          probability: 0.015217391304347823,
          multiplier: 62.42857142857143,
        },
        {
          gem: 19,
          probability: 0.008695652173913045,
          multiplier: 109.24999999999997,
        },
        {
          gem: 20,
          probability: 0.004347826086956523,
          multiplier: 218.49999999999994,
        },
        {
          gem: 21,
          probability: 0.0017391304347826085,
          multiplier: 546.25,
        },
        {
          gem: 22,
          probability: 0.0004347826086956522,
          multiplier: 2185,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.84,
          multiplier: 1.130952380952381,
        },
        {
          gem: 2,
          probability: 0.7,
          multiplier: 1.3571428571428572,
        },
        {
          gem: 3,
          probability: 0.5782608695652174,
          multiplier: 1.6428571428571428,
        },
        {
          gem: 4,
          probability: 0.4731225296442687,
          multiplier: 2.0079365079365084,
        },
        {
          gem: 5,
          probability: 0.38300395256917,
          multiplier: 2.4803921568627447,
        },
        {
          gem: 6,
          probability: 0.306403162055336,
          multiplier: 3.1004901960784306,
        },
        {
          gem: 7,
          probability: 0.24189723320158096,
          multiplier: 3.9272875816993476,
        },
        {
          gem: 8,
          probability: 0.18814229249011857,
          multiplier: 5.049369747899159,
        },
        {
          gem: 9,
          probability: 0.1438735177865613,
          multiplier: 6.603021978021976,
        },
        {
          gem: 10,
          probability: 0.10790513833992096,
          multiplier: 8.804029304029303,
        },
        {
          gem: 11,
          probability: 0.0791304347826087,
          multiplier: 12.005494505494504,
        },
        {
          gem: 12,
          probability: 0.05652173913043478,
          multiplier: 16.807692307692307,
        },
        {
          gem: 13,
          probability: 0.03913043478260869,
          multiplier: 24.27777777777778,
        },
        {
          gem: 14,
          probability: 0.02608695652173913,
          multiplier: 36.416666666666664,
        },
        {
          gem: 15,
          probability: 0.016600790513833993,
          multiplier: 57.22619047619047,
        },
        {
          gem: 16,
          probability: 0.009960474308300396,
          multiplier: 95.37698412698411,
        },
        {
          gem: 17,
          probability: 0.005533596837944664,
          multiplier: 171.67857142857142,
        },
        {
          gem: 18,
          probability: 0.0027667984189723312,
          multiplier: 343.35714285714295,
        },
        {
          gem: 19,
          probability: 0.0011857707509881424,
          multiplier: 801.1666666666665,
        },
        {
          gem: 20,
          probability: 0.0003952569169960475,
          multiplier: 2403.4999999999995,
        },
        {
          gem: 21,
          probability: 0.00007905138339920947,
          multiplier: 12017.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8,
          multiplier: 1.1875,
        },
        {
          gem: 2,
          probability: 0.6333333333333333,
          multiplier: 1.5,
        },
        {
          gem: 3,
          probability: 0.4956521739130435,
          multiplier: 1.9166666666666665,
        },
        {
          gem: 4,
          probability: 0.3830039525691699,
          multiplier: 2.480392156862745,
        },
        {
          gem: 5,
          probability: 0.29181253529079615,
          multiplier: 3.255514705882353,
        },
        {
          gem: 6,
          probability: 0.21885940146809715,
          multiplier: 4.340686274509803,
        },
        {
          gem: 7,
          probability: 0.1612648221343873,
          multiplier: 5.890931372549021,
        },
        {
          gem: 8,
          probability: 0.11646903820816866,
          multiplier: 8.156674208144794,
        },
        {
          gem: 9,
          probability: 0.08221343873517786,
          multiplier: 11.555288461538462,
        },
        {
          gem: 10,
          probability: 0.05652173913043479,
          multiplier: 16.807692307692303,
        },
        {
          gem: 11,
          probability: 0.03768115942028986,
          multiplier: 25.21153846153846,
        },
        {
          gem: 12,
          probability: 0.02422360248447205,
          multiplier: 39.217948717948715,
        },
        {
          gem: 13,
          probability: 0.014906832298136644,
          multiplier: 63.72916666666667,
        },
        {
          gem: 14,
          probability: 0.008695652173913044,
          multiplier: 109.25,
        },
        {
          gem: 15,
          probability: 0.0047430830039525695,
          multiplier: 200.29166666666663,
        },
        {
          gem: 16,
          probability: 0.0023715415019762848,
          multiplier: 400.58333333333326,
        },
        {
          gem: 17,
          probability: 0.001054018445322793,
          multiplier: 901.3125000000001,
        },
        {
          gem: 18,
          probability: 0.0003952569169960473,
          multiplier: 2403.500000000001,
        },
        {
          gem: 19,
          probability: 0.00011293054771315642,
          multiplier: 8412.249999999998,
        },
        {
          gem: 20,
          probability: 0.000018821757952192737,
          multiplier: 50473.49999999999,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.76,
          multiplier: 1.25,
        },
        {
          gem: 2,
          probability: 0.57,
          multiplier: 1.6666666666666667,
        },
        {
          gem: 3,
          probability: 0.42130434782608694,
          multiplier: 2.2549019607843137,
        },
        {
          gem: 4,
          probability: 0.3064031620553359,
          multiplier: 3.100490196078432,
        },
        {
          gem: 5,
          probability: 0.21885940146809715,
          multiplier: 4.340686274509803,
        },
        {
          gem: 6,
          probability: 0.153201581027668,
          multiplier: 6.200980392156861,
        },
        {
          gem: 7,
          probability: 0.10482213438735177,
          multiplier: 9.062971342383106,
        },
        {
          gem: 8,
          probability: 0.06988142292490117,
          multiplier: 13.594457013574663,
        },
        {
          gem: 9,
          probability: 0.04521739130434783,
          multiplier: 21.009615384615383,
        },
        {
          gem: 10,
          probability: 0.028260869565217395,
          multiplier: 33.615384615384606,
        },
        {
          gem: 11,
          probability: 0.016956521739130433,
          multiplier: 56.025641025641036,
        },
        {
          gem: 12,
          probability: 0.00968944099378882,
          multiplier: 98.04487179487181,
        },
        {
          gem: 13,
          probability: 0.005217391304347825,
          multiplier: 182.08333333333337,
        },
        {
          gem: 14,
          probability: 0.0026086956521739132,
          multiplier: 364.16666666666663,
        },
        {
          gem: 15,
          probability: 0.0011857707509881424,
          multiplier: 801.1666666666665,
        },
        {
          gem: 16,
          probability: 0.0004743083003952569,
          multiplier: 2002.9166666666667,
        },
        {
          gem: 17,
          probability: 0.00015810276679841898,
          multiplier: 6008.75,
        },
        {
          gem: 18,
          probability: 0.00003952569169960473,
          multiplier: 24035.000000000007,
        },
        {
          gem: 19,
          probability: 0.000005646527385657822,
          multiplier: 168244.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.72,
          multiplier: 1.3194444444444444,
        },
        {
          gem: 2,
          probability: 0.51,
          multiplier: 1.8627450980392155,
        },
        {
          gem: 3,
          probability: 0.35478260869565215,
          multiplier: 2.6776960784313726,
        },
        {
          gem: 4,
          probability: 0.241897233201581,
          multiplier: 3.9272875816993467,
        },
        {
          gem: 5,
          probability: 0.16126482213438736,
          multiplier: 5.890931372549018,
        },
        {
          gem: 6,
          probability: 0.10482213438735181,
          multiplier: 9.062971342383102,
        },
        {
          gem: 7,
          probability: 0.06620345329727478,
          multiplier: 14.349704625439925,
        },
        {
          gem: 8,
          probability: 0.04045766590389016,
          multiplier: 23.481334841628957,
        },
        {
          gem: 9,
          probability: 0.023798627002288325,
          multiplier: 39.91826923076923,
        },
        {
          gem: 10,
          probability: 0.013386727688787188,
          multiplier: 70.96581196581195,
        },
        {
          gem: 11,
          probability: 0.007139588100686498,
          multiplier: 133.06089743589746,
        },
        {
          gem: 12,
          probability: 0.0035697940503432494,
          multiplier: 266.12179487179486,
        },
        {
          gem: 13,
          probability: 0.0016475972540045763,
          multiplier: 576.5972222222223,
        },
        {
          gem: 14,
          probability: 0.0006864988558352403,
          multiplier: 1383.8333333333333,
        },
        {
          gem: 15,
          probability: 0.00024963594757645107,
          multiplier: 3805.5416666666656,
        },
        {
          gem: 16,
          probability: 0.0000748907842729353,
          multiplier: 12685.138888888889,
        },
        {
          gem: 17,
          probability: 0.000016642396505096735,
          multiplier: 57083.12499999999,
        },
        {
          gem: 18,
          probability: 0.000002080299563137091,
          multiplier: 456665.0000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.68,
          multiplier: 1.3970588235294117,
        },
        {
          gem: 2,
          probability: 0.4533333333333333,
          multiplier: 2.0955882352941178,
        },
        {
          gem: 3,
          probability: 0.2956521739130435,
          multiplier: 3.2132352941176467,
        },
        {
          gem: 4,
          probability: 0.18814229249011855,
          multiplier: 5.04936974789916,
        },
        {
          gem: 5,
          probability: 0.11646903820816867,
          multiplier: 8.156674208144794,
        },
        {
          gem: 6,
          probability: 0.0698814229249012,
          multiplier: 13.594457013574658,
        },
        {
          gem: 7,
          probability: 0.04045766590389015,
          multiplier: 23.481334841628964,
        },
        {
          gem: 8,
          probability: 0.022476481057716755,
          multiplier: 42.26640271493213,
        },
        {
          gem: 9,
          probability: 0.011899313501144164,
          multiplier: 79.83653846153847,
        },
        {
          gem: 10,
          probability: 0.005949656750572083,
          multiplier: 159.6730769230769,
        },
        {
          gem: 11,
          probability: 0.002776506483600305,
          multiplier: 342.15659340659346,
        },
        {
          gem: 12,
          probability: 0.0011899313501144164,
          multiplier: 798.3653846153846,
        },
        {
          gem: 13,
          probability: 0.0004576659038901601,
          multiplier: 2075.7500000000005,
        },
        {
          gem: 14,
          probability: 0.00015255530129672007,
          multiplier: 6227.25,
        },
        {
          gem: 15,
          probability: 0.00004160599126274184,
          multiplier: 22833.25,
        },
        {
          gem: 16,
          probability: 0.000008321198252548368,
          multiplier: 114166.24999999999,
        },
        {
          gem: 17,
          probability: 9.245775836164852e-7,
          multiplier: 1027496.25,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.64,
          multiplier: 1.484375,
        },
        {
          gem: 2,
          probability: 0.4,
          multiplier: 2.375,
        },
        {
          gem: 3,
          probability: 0.24347826086956523,
          multiplier: 3.9017857142857135,
        },
        {
          gem: 4,
          probability: 0.14387351778656127,
          multiplier: 6.603021978021978,
        },
        {
          gem: 5,
          probability: 0.08221343873517788,
          multiplier: 11.55528846153846,
        },
        {
          gem: 6,
          probability: 0.045217391304347834,
          multiplier: 21.00961538461538,
        },
        {
          gem: 7,
          probability: 0.023798627002288325,
          multiplier: 39.91826923076923,
        },
        {
          gem: 8,
          probability: 0.011899313501144163,
          multiplier: 79.83653846153847,
        },
        {
          gem: 9,
          probability: 0.005599676941714901,
          multiplier: 169.65264423076923,
        },
        {
          gem: 10,
          probability: 0.0024498586620002698,
          multiplier: 387.7774725274724,
        },
        {
          gem: 11,
          probability: 0.0009799434648001077,
          multiplier: 969.4436813186812,
        },
        {
          gem: 12,
          probability: 0.0003499798088571813,
          multiplier: 2714.4423076923076,
        },
        {
          gem: 13,
          probability: 0.00010768609503297885,
          multiplier: 8821.937500000002,
        },
        {
          gem: 14,
          probability: 0.000026921523758244717,
          multiplier: 35287.75,
        },
        {
          gem: 15,
          probability: 0.00000489482250149904,
          multiplier: 194082.62499999997,
        },
        {
          gem: 16,
          probability: 4.894822501499039e-7,
          multiplier: 1940826.2500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6,
          multiplier: 1.5833333333333333,
        },
        {
          gem: 2,
          probability: 0.35,
          multiplier: 2.7142857142857144,
        },
        {
          gem: 3,
          probability: 0.19782608695652176,
          multiplier: 4.802197802197802,
        },
        {
          gem: 4,
          probability: 0.10790513833992094,
          multiplier: 8.804029304029305,
        },
        {
          gem: 5,
          probability: 0.05652173913043479,
          multiplier: 16.807692307692303,
        },
        {
          gem: 6,
          probability: 0.028260869565217395,
          multiplier: 33.615384615384606,
        },
        {
          gem: 7,
          probability: 0.01338672768878718,
          multiplier: 70.965811965812,
        },
        {
          gem: 8,
          probability: 0.005949656750572081,
          multiplier: 159.67307692307693,
        },
        {
          gem: 9,
          probability: 0.0024498586620002693,
          multiplier: 387.77747252747247,
        },
        {
          gem: 10,
          probability: 0.0009186969982501011,
          multiplier: 1034.07326007326,
        },
        {
          gem: 11,
          probability: 0.00030623233275003367,
          multiplier: 3102.2197802197798,
        },
        {
          gem: 12,
          probability: 0.00008749495221429533,
          multiplier: 10857.76923076923,
        },
        {
          gem: 13,
          probability: 0.000020191142818683533,
          multiplier: 47050.33333333334,
        },
        {
          gem: 14,
          probability: 0.0000033651904697805896,
          multiplier: 282302,
        },
        {
          gem: 15,
          probability: 3.0592640634369e-7,
          multiplier: 3105321.9999999995,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.56,
          multiplier: 1.6964285714285712,
        },
        {
          gem: 2,
          probability: 0.30333333333333334,
          multiplier: 3.1318681318681314,
        },
        {
          gem: 3,
          probability: 0.1582608695652174,
          multiplier: 6.002747252747252,
        },
        {
          gem: 4,
          probability: 0.07913043478260869,
          multiplier: 12.005494505494505,
        },
        {
          gem: 5,
          probability: 0.03768115942028986,
          multiplier: 25.21153846153846,
        },
        {
          gem: 6,
          probability: 0.016956521739130436,
          multiplier: 56.02564102564102,
        },
        {
          gem: 7,
          probability: 0.007139588100686497,
          multiplier: 133.06089743589746,
        },
        {
          gem: 8,
          probability: 0.0027765064836003045,
          multiplier: 342.1565934065935,
        },
        {
          gem: 9,
          probability: 0.0009799434648001077,
          multiplier: 969.4436813186812,
        },
        {
          gem: 10,
          probability: 0.0003062323327500337,
          multiplier: 3102.2197802197793,
        },
        {
          gem: 11,
          probability: 0.00008166195540000897,
          multiplier: 11633.324175824175,
        },
        {
          gem: 12,
          probability: 0.000017498990442859063,
          multiplier: 54288.84615384616,
        },
        {
          gem: 13,
          probability: 0.0000026921523758244713,
          multiplier: 352877.50000000006,
        },
        {
          gem: 14,
          probability: 2.2434603131870596e-7,
          multiplier: 4234530,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.52,
          multiplier: 1.8269230769230766,
        },
        {
          gem: 2,
          probability: 0.26,
          multiplier: 3.6538461538461533,
        },
        {
          gem: 3,
          probability: 0.12434782608695652,
          multiplier: 7.639860139860139,
        },
        {
          gem: 4,
          probability: 0.056521739130434775,
          multiplier: 16.807692307692307,
        },
        {
          gem: 5,
          probability: 0.024223602484472053,
          multiplier: 39.21794871794871,
        },
        {
          gem: 6,
          probability: 0.009689440993788821,
          multiplier: 98.04487179487178,
        },
        {
          gem: 7,
          probability: 0.0035697940503432485,
          multiplier: 266.1217948717949,
        },
        {
          gem: 8,
          probability: 0.0011899313501144164,
          multiplier: 798.3653846153846,
        },
        {
          gem: 9,
          probability: 0.0003499798088571813,
          multiplier: 2714.4423076923076,
        },
        {
          gem: 10,
          probability: 0.00008749495221429534,
          multiplier: 10857.769230769229,
        },
        {
          gem: 11,
          probability: 0.000017498990442859066,
          multiplier: 54288.84615384615,
        },
        {
          gem: 12,
          probability: 0.0000024998557775512948,
          multiplier: 380021.9230769231,
        },
        {
          gem: 13,
          probability: 1.922965982731765e-7,
          multiplier: 4940285.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.48,
          multiplier: 1.9791666666666667,
        },
        {
          gem: 2,
          probability: 0.22,
          multiplier: 4.318181818181818,
        },
        {
          gem: 3,
          probability: 0.09565217391304348,
          multiplier: 9.931818181818182,
        },
        {
          gem: 4,
          probability: 0.03913043478260869,
          multiplier: 24.27777777777778,
        },
        {
          gem: 5,
          probability: 0.014906832298136647,
          multiplier: 63.72916666666666,
        },
        {
          gem: 6,
          probability: 0.005217391304347826,
          multiplier: 182.08333333333334,
        },
        {
          gem: 7,
          probability: 0.0016475972540045763,
          multiplier: 576.5972222222223,
        },
        {
          gem: 8,
          probability: 0.0004576659038901602,
          multiplier: 2075.75,
        },
        {
          gem: 9,
          probability: 0.00010768609503297887,
          multiplier: 8821.9375,
        },
        {
          gem: 10,
          probability: 0.00002019114281868354,
          multiplier: 47050.33333333333,
        },
        {
          gem: 11,
          probability: 0.0000026921523758244718,
          multiplier: 352877.5,
        },
        {
          gem: 12,
          probability: 1.922965982731765e-7,
          multiplier: 4940285.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.44,
          multiplier: 2.159090909090909,
        },
        {
          gem: 2,
          probability: 0.18333333333333332,
          multiplier: 5.181818181818182,
        },
        {
          gem: 3,
          probability: 0.07173913043478261,
          multiplier: 13.242424242424242,
        },
        {
          gem: 4,
          probability: 0.026086956521739126,
          multiplier: 36.41666666666667,
        },
        {
          gem: 5,
          probability: 0.008695652173913044,
          multiplier: 109.25,
        },
        {
          gem: 6,
          probability: 0.0026086956521739132,
          multiplier: 364.16666666666663,
        },
        {
          gem: 7,
          probability: 0.0006864988558352401,
          multiplier: 1383.8333333333335,
        },
        {
          gem: 8,
          probability: 0.00015255530129672007,
          multiplier: 6227.25,
        },
        {
          gem: 9,
          probability: 0.000026921523758244717,
          multiplier: 35287.75,
        },
        {
          gem: 10,
          probability: 0.00000336519046978059,
          multiplier: 282301.99999999994,
        },
        {
          gem: 11,
          probability: 2.2434603131870596e-7,
          multiplier: 4234530,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4,
          multiplier: 2.375,
        },
        {
          gem: 2,
          probability: 0.15,
          multiplier: 6.333333333333333,
        },
        {
          gem: 3,
          probability: 0.05217391304347826,
          multiplier: 18.208333333333332,
        },
        {
          gem: 4,
          probability: 0.016600790513833986,
          multiplier: 57.22619047619049,
        },
        {
          gem: 5,
          probability: 0.0047430830039525695,
          multiplier: 200.29166666666663,
        },
        {
          gem: 6,
          probability: 0.0011857707509881424,
          multiplier: 801.1666666666665,
        },
        {
          gem: 7,
          probability: 0.00024963594757645096,
          multiplier: 3805.541666666667,
        },
        {
          gem: 8,
          probability: 0.00004160599126274184,
          multiplier: 22833.25,
        },
        {
          gem: 9,
          probability: 0.000004894822501499039,
          multiplier: 194082.625,
        },
        {
          gem: 10,
          probability: 3.0592640634369e-7,
          multiplier: 3105321.9999999995,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.36,
          multiplier: 2.638888888888889,
        },
        {
          gem: 2,
          probability: 0.12,
          multiplier: 7.916666666666667,
        },
        {
          gem: 3,
          probability: 0.03652173913043478,
          multiplier: 26.011904761904763,
        },
        {
          gem: 4,
          probability: 0.009960474308300394,
          multiplier: 95.37698412698413,
        },
        {
          gem: 5,
          probability: 0.0023715415019762848,
          multiplier: 400.58333333333326,
        },
        {
          gem: 6,
          probability: 0.0004743083003952569,
          multiplier: 2002.9166666666667,
        },
        {
          gem: 7,
          probability: 0.00007489078427293529,
          multiplier: 12685.13888888889,
        },
        {
          gem: 8,
          probability: 0.000008321198252548368,
          multiplier: 114166.24999999999,
        },
        {
          gem: 9,
          probability: 4.894822501499039e-7,
          multiplier: 1940826.2500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.32,
          multiplier: 2.96875,
        },
        {
          gem: 2,
          probability: 0.09333333333333334,
          multiplier: 10.178571428571427,
        },
        {
          gem: 3,
          probability: 0.02434782608695652,
          multiplier: 39.01785714285714,
        },
        {
          gem: 4,
          probability: 0.005533596837944663,
          multiplier: 171.67857142857144,
        },
        {
          gem: 5,
          probability: 0.0010540184453227933,
          multiplier: 901.3124999999999,
        },
        {
          gem: 6,
          probability: 0.000158102766798419,
          multiplier: 6008.749999999999,
        },
        {
          gem: 7,
          probability: 0.000016642396505096728,
          multiplier: 57083.125000000015,
        },
        {
          gem: 8,
          probability: 9.245775836164852e-7,
          multiplier: 1027496.25,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.28,
          multiplier: 3.3928571428571423,
        },
        {
          gem: 2,
          probability: 0.07,
          multiplier: 13.57142857142857,
        },
        {
          gem: 3,
          probability: 0.015217391304347827,
          multiplier: 62.428571428571416,
        },
        {
          gem: 4,
          probability: 0.0027667984189723317,
          multiplier: 343.3571428571429,
        },
        {
          gem: 5,
          probability: 0.0003952569169960475,
          multiplier: 2403.4999999999995,
        },
        {
          gem: 6,
          probability: 0.00003952569169960475,
          multiplier: 24034.999999999996,
        },
        {
          gem: 7,
          probability: 0.000002080299563137091,
          multiplier: 456665.0000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.24,
          multiplier: 3.9583333333333335,
        },
        {
          gem: 2,
          probability: 0.05,
          multiplier: 19,
        },
        {
          gem: 3,
          probability: 0.008695652173913044,
          multiplier: 109.25,
        },
        {
          gem: 4,
          probability: 0.0011857707509881422,
          multiplier: 801.1666666666666,
        },
        {
          gem: 5,
          probability: 0.00011293054771315642,
          multiplier: 8412.249999999998,
        },
        {
          gem: 6,
          probability: 0.000005646527385657822,
          multiplier: 168244.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2,
          multiplier: 4.75,
        },
        {
          gem: 2,
          probability: 0.03333333333333333,
          multiplier: 28.5,
        },
        {
          gem: 3,
          probability: 0.004347826086956522,
          multiplier: 218.5,
        },
        {
          gem: 4,
          probability: 0.00039525691699604737,
          multiplier: 2403.5000000000005,
        },
        {
          gem: 5,
          probability: 0.000018821757952192737,
          multiplier: 50473.49999999999,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.16,
          multiplier: 5.9375,
        },
        {
          gem: 2,
          probability: 0.02,
          multiplier: 47.5,
        },
        {
          gem: 3,
          probability: 0.0017391304347826088,
          multiplier: 546.25,
        },
        {
          gem: 4,
          probability: 0.00007905138339920947,
          multiplier: 12017.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.12,
          multiplier: 7.916666666666667,
        },
        {
          gem: 2,
          probability: 0.01,
          multiplier: 95,
        },
        {
          gem: 3,
          probability: 0.0004347826086956522,
          multiplier: 2185,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.08,
          multiplier: 11.875,
        },
        {
          gem: 2,
          probability: 0.0033333333333333335,
          multiplier: 285,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.04,
          multiplier: 23.75,
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
          probability: 0.96,
          multiplier: 0.9687500000000001,
        },
        {
          gem: 2,
          probability: 0.92,
          multiplier: 1.0108695652173914,
        },
        {
          gem: 3,
          probability: 0.8800000000000001,
          multiplier: 1.0568181818181817,
        },
        {
          gem: 4,
          probability: 0.8399999999999999,
          multiplier: 1.1071428571428574,
        },
        {
          gem: 5,
          probability: 0.7999999999999999,
          multiplier: 1.1625,
        },
        {
          gem: 6,
          probability: 0.7600000000000003,
          multiplier: 1.2236842105263153,
        },
        {
          gem: 7,
          probability: 0.7199999999999999,
          multiplier: 1.291666666666667,
        },
        {
          gem: 8,
          probability: 0.68,
          multiplier: 1.3676470588235294,
        },
        {
          gem: 9,
          probability: 0.64,
          multiplier: 1.453125,
        },
        {
          gem: 10,
          probability: 0.6000000000000001,
          multiplier: 1.55,
        },
        {
          gem: 11,
          probability: 0.56,
          multiplier: 1.6607142857142856,
        },
        {
          gem: 12,
          probability: 0.5200000000000001,
          multiplier: 1.788461538461538,
        },
        {
          gem: 13,
          probability: 0.48,
          multiplier: 1.9375000000000002,
        },
        {
          gem: 14,
          probability: 0.44,
          multiplier: 2.1136363636363638,
        },
        {
          gem: 15,
          probability: 0.4000000000000001,
          multiplier: 2.3249999999999997,
        },
        {
          gem: 16,
          probability: 0.36,
          multiplier: 2.5833333333333335,
        },
        {
          gem: 17,
          probability: 0.32,
          multiplier: 2.90625,
        },
        {
          gem: 18,
          probability: 0.27999999999999997,
          multiplier: 3.3214285714285716,
        },
        {
          gem: 19,
          probability: 0.24,
          multiplier: 3.8750000000000004,
        },
        {
          gem: 20,
          probability: 0.20000000000000004,
          multiplier: 4.6499999999999995,
        },
        {
          gem: 21,
          probability: 0.16,
          multiplier: 5.8125,
        },
        {
          gem: 22,
          probability: 0.12,
          multiplier: 7.750000000000001,
        },
        {
          gem: 23,
          probability: 0.08,
          multiplier: 11.625,
        },
        {
          gem: 24,
          probability: 0.04,
          multiplier: 23.25,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.92,
          multiplier: 1.0108695652173914,
        },
        {
          gem: 2,
          probability: 0.8433333333333334,
          multiplier: 1.1027667984189724,
        },
        {
          gem: 3,
          probability: 0.77,
          multiplier: 1.2077922077922079,
        },
        {
          gem: 4,
          probability: 0.6999999999999998,
          multiplier: 1.328571428571429,
        },
        {
          gem: 5,
          probability: 0.6333333333333335,
          multiplier: 1.4684210526315786,
        },
        {
          gem: 6,
          probability: 0.5700000000000001,
          multiplier: 1.631578947368421,
        },
        {
          gem: 7,
          probability: 0.5099999999999999,
          multiplier: 1.8235294117647063,
        },
        {
          gem: 8,
          probability: 0.4533333333333333,
          multiplier: 2.0514705882352944,
        },
        {
          gem: 9,
          probability: 0.4,
          multiplier: 2.325,
        },
        {
          gem: 10,
          probability: 0.35000000000000014,
          multiplier: 2.657142857142856,
        },
        {
          gem: 11,
          probability: 0.3033333333333334,
          multiplier: 3.0659340659340657,
        },
        {
          gem: 12,
          probability: 0.26,
          multiplier: 3.5769230769230766,
        },
        {
          gem: 13,
          probability: 0.22,
          multiplier: 4.2272727272727275,
        },
        {
          gem: 14,
          probability: 0.18333333333333332,
          multiplier: 5.072727272727273,
        },
        {
          gem: 15,
          probability: 0.15000000000000002,
          multiplier: 6.2,
        },
        {
          gem: 16,
          probability: 0.12,
          multiplier: 7.750000000000001,
        },
        {
          gem: 17,
          probability: 0.09333333333333334,
          multiplier: 9.964285714285714,
        },
        {
          gem: 18,
          probability: 0.06999999999999999,
          multiplier: 13.285714285714286,
        },
        {
          gem: 19,
          probability: 0.05000000000000001,
          multiplier: 18.599999999999998,
        },
        {
          gem: 20,
          probability: 0.03333333333333334,
          multiplier: 27.899999999999995,
        },
        {
          gem: 21,
          probability: 0.019999999999999997,
          multiplier: 46.50000000000001,
        },
        {
          gem: 22,
          probability: 0.01,
          multiplier: 93,
        },
        {
          gem: 23,
          probability: 0.0033333333333333335,
          multiplier: 279,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.88,
          multiplier: 1.0568181818181819,
        },
        {
          gem: 2,
          probability: 0.77,
          multiplier: 1.2077922077922079,
        },
        {
          gem: 3,
          probability: 0.6695652173913044,
          multiplier: 1.388961038961039,
        },
        {
          gem: 4,
          probability: 0.5782608695652173,
          multiplier: 1.6082706766917299,
        },
        {
          gem: 5,
          probability: 0.49565217391304356,
          multiplier: 1.876315789473684,
        },
        {
          gem: 6,
          probability: 0.421304347826087,
          multiplier: 2.2074303405572753,
        },
        {
          gem: 7,
          probability: 0.3547826086956521,
          multiplier: 2.6213235294117654,
        },
        {
          gem: 8,
          probability: 0.2956521739130435,
          multiplier: 3.1455882352941176,
        },
        {
          gem: 9,
          probability: 0.24347826086956523,
          multiplier: 3.819642857142857,
        },
        {
          gem: 10,
          probability: 0.1978260869565218,
          multiplier: 4.7010989010989,
        },
        {
          gem: 11,
          probability: 0.1582608695652174,
          multiplier: 5.876373626373627,
        },
        {
          gem: 12,
          probability: 0.12434782608695652,
          multiplier: 7.479020979020979,
        },
        {
          gem: 13,
          probability: 0.09565217391304347,
          multiplier: 9.722727272727274,
        },
        {
          gem: 14,
          probability: 0.07173913043478261,
          multiplier: 12.963636363636365,
        },
        {
          gem: 15,
          probability: 0.052173913043478265,
          multiplier: 17.825,
        },
        {
          gem: 16,
          probability: 0.036521739130434785,
          multiplier: 25.464285714285715,
        },
        {
          gem: 17,
          probability: 0.02434782608695652,
          multiplier: 38.19642857142857,
        },
        {
          gem: 18,
          probability: 0.015217391304347823,
          multiplier: 61.11428571428573,
        },
        {
          gem: 19,
          probability: 0.008695652173913045,
          multiplier: 106.94999999999997,
        },
        {
          gem: 20,
          probability: 0.004347826086956523,
          multiplier: 213.89999999999995,
        },
        {
          gem: 21,
          probability: 0.0017391304347826085,
          multiplier: 534.75,
        },
        {
          gem: 22,
          probability: 0.0004347826086956522,
          multiplier: 2139,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.84,
          multiplier: 1.1071428571428572,
        },
        {
          gem: 2,
          probability: 0.7,
          multiplier: 1.3285714285714287,
        },
        {
          gem: 3,
          probability: 0.5782608695652174,
          multiplier: 1.6082706766917294,
        },
        {
          gem: 4,
          probability: 0.4731225296442687,
          multiplier: 1.965664160401003,
        },
        {
          gem: 5,
          probability: 0.38300395256917,
          multiplier: 2.428173374613003,
        },
        {
          gem: 6,
          probability: 0.306403162055336,
          multiplier: 3.0352167182662533,
        },
        {
          gem: 7,
          probability: 0.24189723320158096,
          multiplier: 3.8446078431372563,
        },
        {
          gem: 8,
          probability: 0.18814229249011857,
          multiplier: 4.943067226890756,
        },
        {
          gem: 9,
          probability: 0.1438735177865613,
          multiplier: 6.464010989010988,
        },
        {
          gem: 10,
          probability: 0.10790513833992096,
          multiplier: 8.618681318681318,
        },
        {
          gem: 11,
          probability: 0.0791304347826087,
          multiplier: 11.752747252747254,
        },
        {
          gem: 12,
          probability: 0.05652173913043478,
          multiplier: 16.453846153846154,
        },
        {
          gem: 13,
          probability: 0.03913043478260869,
          multiplier: 23.76666666666667,
        },
        {
          gem: 14,
          probability: 0.02608695652173913,
          multiplier: 35.650000000000006,
        },
        {
          gem: 15,
          probability: 0.016600790513833993,
          multiplier: 56.02142857142857,
        },
        {
          gem: 16,
          probability: 0.009960474308300396,
          multiplier: 93.36904761904762,
        },
        {
          gem: 17,
          probability: 0.005533596837944664,
          multiplier: 168.06428571428572,
        },
        {
          gem: 18,
          probability: 0.0027667984189723312,
          multiplier: 336.12857142857155,
        },
        {
          gem: 19,
          probability: 0.0011857707509881424,
          multiplier: 784.3,
        },
        {
          gem: 20,
          probability: 0.0003952569169960475,
          multiplier: 2352.8999999999996,
        },
        {
          gem: 21,
          probability: 0.00007905138339920947,
          multiplier: 11764.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.8,
          multiplier: 1.1625,
        },
        {
          gem: 2,
          probability: 0.6333333333333333,
          multiplier: 1.468421052631579,
        },
        {
          gem: 3,
          probability: 0.4956521739130435,
          multiplier: 1.8763157894736844,
        },
        {
          gem: 4,
          probability: 0.3830039525691699,
          multiplier: 2.4281733746130034,
        },
        {
          gem: 5,
          probability: 0.29181253529079615,
          multiplier: 3.186977554179567,
        },
        {
          gem: 6,
          probability: 0.21885940146809715,
          multiplier: 4.249303405572755,
        },
        {
          gem: 7,
          probability: 0.1612648221343873,
          multiplier: 5.766911764705885,
        },
        {
          gem: 8,
          probability: 0.11646903820816866,
          multiplier: 7.98495475113122,
        },
        {
          gem: 9,
          probability: 0.08221343873517786,
          multiplier: 11.31201923076923,
        },
        {
          gem: 10,
          probability: 0.05652173913043479,
          multiplier: 16.453846153846154,
        },
        {
          gem: 11,
          probability: 0.03768115942028986,
          multiplier: 24.68076923076923,
        },
        {
          gem: 12,
          probability: 0.02422360248447205,
          multiplier: 38.392307692307696,
        },
        {
          gem: 13,
          probability: 0.014906832298136644,
          multiplier: 62.38750000000001,
        },
        {
          gem: 14,
          probability: 0.008695652173913044,
          multiplier: 106.95,
        },
        {
          gem: 15,
          probability: 0.0047430830039525695,
          multiplier: 196.075,
        },
        {
          gem: 16,
          probability: 0.0023715415019762848,
          multiplier: 392.15,
        },
        {
          gem: 17,
          probability: 0.001054018445322793,
          multiplier: 882.3375000000002,
        },
        {
          gem: 18,
          probability: 0.0003952569169960473,
          multiplier: 2352.900000000001,
        },
        {
          gem: 19,
          probability: 0.00011293054771315642,
          multiplier: 8235.15,
        },
        {
          gem: 20,
          probability: 0.000018821757952192737,
          multiplier: 49410.899999999994,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.76,
          multiplier: 1.223684210526316,
        },
        {
          gem: 2,
          probability: 0.57,
          multiplier: 1.6315789473684212,
        },
        {
          gem: 3,
          probability: 0.42130434782608694,
          multiplier: 2.2074303405572757,
        },
        {
          gem: 4,
          probability: 0.3064031620553359,
          multiplier: 3.0352167182662546,
        },
        {
          gem: 5,
          probability: 0.21885940146809715,
          multiplier: 4.249303405572755,
        },
        {
          gem: 6,
          probability: 0.153201581027668,
          multiplier: 6.0704334365325066,
        },
        {
          gem: 7,
          probability: 0.10482213438735177,
          multiplier: 8.872171945701357,
        },
        {
          gem: 8,
          probability: 0.06988142292490117,
          multiplier: 13.30825791855204,
        },
        {
          gem: 9,
          probability: 0.04521739130434783,
          multiplier: 20.56730769230769,
        },
        {
          gem: 10,
          probability: 0.028260869565217395,
          multiplier: 32.90769230769231,
        },
        {
          gem: 11,
          probability: 0.016956521739130433,
          multiplier: 54.84615384615386,
        },
        {
          gem: 12,
          probability: 0.00968944099378882,
          multiplier: 95.98076923076925,
        },
        {
          gem: 13,
          probability: 0.005217391304347825,
          multiplier: 178.25000000000006,
        },
        {
          gem: 14,
          probability: 0.0026086956521739132,
          multiplier: 356.5,
        },
        {
          gem: 15,
          probability: 0.0011857707509881424,
          multiplier: 784.3,
        },
        {
          gem: 16,
          probability: 0.0004743083003952569,
          multiplier: 1960.7500000000002,
        },
        {
          gem: 17,
          probability: 0.00015810276679841898,
          multiplier: 5882.25,
        },
        {
          gem: 18,
          probability: 0.00003952569169960473,
          multiplier: 23529.000000000007,
        },
        {
          gem: 19,
          probability: 0.000005646527385657822,
          multiplier: 164702.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.72,
          multiplier: 1.2916666666666667,
        },
        {
          gem: 2,
          probability: 0.51,
          multiplier: 1.8235294117647058,
        },
        {
          gem: 3,
          probability: 0.35478260869565215,
          multiplier: 2.621323529411765,
        },
        {
          gem: 4,
          probability: 0.241897233201581,
          multiplier: 3.8446078431372555,
        },
        {
          gem: 5,
          probability: 0.16126482213438736,
          multiplier: 5.766911764705882,
        },
        {
          gem: 6,
          probability: 0.10482213438735181,
          multiplier: 8.872171945701355,
        },
        {
          gem: 7,
          probability: 0.06620345329727478,
          multiplier: 14.047605580693823,
        },
        {
          gem: 8,
          probability: 0.04045766590389016,
          multiplier: 22.986990950226243,
        },
        {
          gem: 9,
          probability: 0.023798627002288325,
          multiplier: 39.07788461538462,
        },
        {
          gem: 10,
          probability: 0.013386727688787188,
          multiplier: 69.47179487179487,
        },
        {
          gem: 11,
          probability: 0.007139588100686498,
          multiplier: 130.25961538461542,
        },
        {
          gem: 12,
          probability: 0.0035697940503432494,
          multiplier: 260.5192307692308,
        },
        {
          gem: 13,
          probability: 0.0016475972540045763,
          multiplier: 564.4583333333335,
        },
        {
          gem: 14,
          probability: 0.0006864988558352403,
          multiplier: 1354.7,
        },
        {
          gem: 15,
          probability: 0.00024963594757645107,
          multiplier: 3725.4249999999993,
        },
        {
          gem: 16,
          probability: 0.0000748907842729353,
          multiplier: 12418.083333333334,
        },
        {
          gem: 17,
          probability: 0.000016642396505096735,
          multiplier: 55881.37499999999,
        },
        {
          gem: 18,
          probability: 0.000002080299563137091,
          multiplier: 447051.0000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.68,
          multiplier: 1.3676470588235294,
        },
        {
          gem: 2,
          probability: 0.4533333333333333,
          multiplier: 2.0514705882352944,
        },
        {
          gem: 3,
          probability: 0.2956521739130435,
          multiplier: 3.1455882352941176,
        },
        {
          gem: 4,
          probability: 0.18814229249011855,
          multiplier: 4.943067226890757,
        },
        {
          gem: 5,
          probability: 0.11646903820816867,
          multiplier: 7.98495475113122,
        },
        {
          gem: 6,
          probability: 0.0698814229249012,
          multiplier: 13.308257918552034,
        },
        {
          gem: 7,
          probability: 0.04045766590389015,
          multiplier: 22.98699095022625,
        },
        {
          gem: 8,
          probability: 0.022476481057716755,
          multiplier: 41.37658371040724,
        },
        {
          gem: 9,
          probability: 0.011899313501144164,
          multiplier: 78.15576923076924,
        },
        {
          gem: 10,
          probability: 0.005949656750572083,
          multiplier: 156.31153846153845,
        },
        {
          gem: 11,
          probability: 0.002776506483600305,
          multiplier: 334.95329670329676,
        },
        {
          gem: 12,
          probability: 0.0011899313501144164,
          multiplier: 781.5576923076924,
        },
        {
          gem: 13,
          probability: 0.0004576659038901601,
          multiplier: 2032.0500000000006,
        },
        {
          gem: 14,
          probability: 0.00015255530129672007,
          multiplier: 6096.150000000001,
        },
        {
          gem: 15,
          probability: 0.00004160599126274184,
          multiplier: 22352.550000000003,
        },
        {
          gem: 16,
          probability: 0.000008321198252548368,
          multiplier: 111762.74999999999,
        },
        {
          gem: 17,
          probability: 9.245775836164852e-7,
          multiplier: 1005864.75,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.64,
          multiplier: 1.453125,
        },
        {
          gem: 2,
          probability: 0.4,
          multiplier: 2.325,
        },
        {
          gem: 3,
          probability: 0.24347826086956523,
          multiplier: 3.819642857142857,
        },
        {
          gem: 4,
          probability: 0.14387351778656127,
          multiplier: 6.46401098901099,
        },
        {
          gem: 5,
          probability: 0.08221343873517788,
          multiplier: 11.312019230769229,
        },
        {
          gem: 6,
          probability: 0.045217391304347834,
          multiplier: 20.567307692307686,
        },
        {
          gem: 7,
          probability: 0.023798627002288325,
          multiplier: 39.07788461538462,
        },
        {
          gem: 8,
          probability: 0.011899313501144163,
          multiplier: 78.15576923076924,
        },
        {
          gem: 9,
          probability: 0.005599676941714901,
          multiplier: 166.08100961538463,
        },
        {
          gem: 10,
          probability: 0.0024498586620002698,
          multiplier: 379.6137362637362,
        },
        {
          gem: 11,
          probability: 0.0009799434648001077,
          multiplier: 949.0343406593406,
        },
        {
          gem: 12,
          probability: 0.0003499798088571813,
          multiplier: 2657.296153846154,
        },
        {
          gem: 13,
          probability: 0.00010768609503297885,
          multiplier: 8636.212500000001,
        },
        {
          gem: 14,
          probability: 0.000026921523758244717,
          multiplier: 34544.85,
        },
        {
          gem: 15,
          probability: 0.00000489482250149904,
          multiplier: 189996.675,
        },
        {
          gem: 16,
          probability: 4.894822501499039e-7,
          multiplier: 1899966.7500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.6,
          multiplier: 1.55,
        },
        {
          gem: 2,
          probability: 0.35,
          multiplier: 2.6571428571428575,
        },
        {
          gem: 3,
          probability: 0.19782608695652176,
          multiplier: 4.701098901098901,
        },
        {
          gem: 4,
          probability: 0.10790513833992094,
          multiplier: 8.61868131868132,
        },
        {
          gem: 5,
          probability: 0.05652173913043479,
          multiplier: 16.453846153846154,
        },
        {
          gem: 6,
          probability: 0.028260869565217395,
          multiplier: 32.90769230769231,
        },
        {
          gem: 7,
          probability: 0.01338672768878718,
          multiplier: 69.47179487179491,
        },
        {
          gem: 8,
          probability: 0.005949656750572081,
          multiplier: 156.31153846153848,
        },
        {
          gem: 9,
          probability: 0.0024498586620002693,
          multiplier: 379.61373626373626,
        },
        {
          gem: 10,
          probability: 0.0009186969982501011,
          multiplier: 1012.3032967032966,
        },
        {
          gem: 11,
          probability: 0.00030623233275003367,
          multiplier: 3036.90989010989,
        },
        {
          gem: 12,
          probability: 0.00008749495221429533,
          multiplier: 10629.184615384616,
        },
        {
          gem: 13,
          probability: 0.000020191142818683533,
          multiplier: 46059.80000000001,
        },
        {
          gem: 14,
          probability: 0.0000033651904697805896,
          multiplier: 276358.8,
        },
        {
          gem: 15,
          probability: 3.0592640634369e-7,
          multiplier: 3039946.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.56,
          multiplier: 1.6607142857142856,
        },
        {
          gem: 2,
          probability: 0.30333333333333334,
          multiplier: 3.065934065934066,
        },
        {
          gem: 3,
          probability: 0.1582608695652174,
          multiplier: 5.876373626373627,
        },
        {
          gem: 4,
          probability: 0.07913043478260869,
          multiplier: 11.752747252747255,
        },
        {
          gem: 5,
          probability: 0.03768115942028986,
          multiplier: 24.68076923076923,
        },
        {
          gem: 6,
          probability: 0.016956521739130436,
          multiplier: 54.84615384615385,
        },
        {
          gem: 7,
          probability: 0.007139588100686497,
          multiplier: 130.25961538461542,
        },
        {
          gem: 8,
          probability: 0.0027765064836003045,
          multiplier: 334.9532967032968,
        },
        {
          gem: 9,
          probability: 0.0009799434648001077,
          multiplier: 949.0343406593406,
        },
        {
          gem: 10,
          probability: 0.0003062323327500337,
          multiplier: 3036.9098901098896,
        },
        {
          gem: 11,
          probability: 0.00008166195540000897,
          multiplier: 11388.41208791209,
        },
        {
          gem: 12,
          probability: 0.000017498990442859063,
          multiplier: 53145.92307692309,
        },
        {
          gem: 13,
          probability: 0.0000026921523758244713,
          multiplier: 345448.50000000006,
        },
        {
          gem: 14,
          probability: 2.2434603131870596e-7,
          multiplier: 4145382,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.52,
          multiplier: 1.7884615384615383,
        },
        {
          gem: 2,
          probability: 0.26,
          multiplier: 3.5769230769230766,
        },
        {
          gem: 3,
          probability: 0.12434782608695652,
          multiplier: 7.479020979020979,
        },
        {
          gem: 4,
          probability: 0.056521739130434775,
          multiplier: 16.453846153846154,
        },
        {
          gem: 5,
          probability: 0.024223602484472053,
          multiplier: 38.39230769230769,
        },
        {
          gem: 6,
          probability: 0.009689440993788821,
          multiplier: 95.98076923076923,
        },
        {
          gem: 7,
          probability: 0.0035697940503432485,
          multiplier: 260.51923076923083,
        },
        {
          gem: 8,
          probability: 0.0011899313501144164,
          multiplier: 781.5576923076924,
        },
        {
          gem: 9,
          probability: 0.0003499798088571813,
          multiplier: 2657.296153846154,
        },
        {
          gem: 10,
          probability: 0.00008749495221429534,
          multiplier: 10629.184615384615,
        },
        {
          gem: 11,
          probability: 0.000017498990442859066,
          multiplier: 53145.92307692308,
        },
        {
          gem: 12,
          probability: 0.0000024998557775512948,
          multiplier: 372021.4615384616,
        },
        {
          gem: 13,
          probability: 1.922965982731765e-7,
          multiplier: 4836279.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.48,
          multiplier: 1.9375000000000002,
        },
        {
          gem: 2,
          probability: 0.22,
          multiplier: 4.2272727272727275,
        },
        {
          gem: 3,
          probability: 0.09565217391304348,
          multiplier: 9.722727272727274,
        },
        {
          gem: 4,
          probability: 0.03913043478260869,
          multiplier: 23.76666666666667,
        },
        {
          gem: 5,
          probability: 0.014906832298136647,
          multiplier: 62.387499999999996,
        },
        {
          gem: 6,
          probability: 0.005217391304347826,
          multiplier: 178.25000000000003,
        },
        {
          gem: 7,
          probability: 0.0016475972540045763,
          multiplier: 564.4583333333335,
        },
        {
          gem: 8,
          probability: 0.0004576659038901602,
          multiplier: 2032.0500000000002,
        },
        {
          gem: 9,
          probability: 0.00010768609503297887,
          multiplier: 8636.2125,
        },
        {
          gem: 10,
          probability: 0.00002019114281868354,
          multiplier: 46059.8,
        },
        {
          gem: 11,
          probability: 0.0000026921523758244718,
          multiplier: 345448.5,
        },
        {
          gem: 12,
          probability: 1.922965982731765e-7,
          multiplier: 4836279.000000001,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.44,
          multiplier: 2.1136363636363638,
        },
        {
          gem: 2,
          probability: 0.18333333333333332,
          multiplier: 5.072727272727273,
        },
        {
          gem: 3,
          probability: 0.07173913043478261,
          multiplier: 12.963636363636365,
        },
        {
          gem: 4,
          probability: 0.026086956521739126,
          multiplier: 35.65000000000001,
        },
        {
          gem: 5,
          probability: 0.008695652173913044,
          multiplier: 106.95,
        },
        {
          gem: 6,
          probability: 0.0026086956521739132,
          multiplier: 356.5,
        },
        {
          gem: 7,
          probability: 0.0006864988558352401,
          multiplier: 1354.7000000000003,
        },
        {
          gem: 8,
          probability: 0.00015255530129672007,
          multiplier: 6096.150000000001,
        },
        {
          gem: 9,
          probability: 0.000026921523758244717,
          multiplier: 34544.85,
        },
        {
          gem: 10,
          probability: 0.00000336519046978059,
          multiplier: 276358.8,
        },
        {
          gem: 11,
          probability: 2.2434603131870596e-7,
          multiplier: 4145382,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.4,
          multiplier: 2.325,
        },
        {
          gem: 2,
          probability: 0.15,
          multiplier: 6.2,
        },
        {
          gem: 3,
          probability: 0.05217391304347826,
          multiplier: 17.825000000000003,
        },
        {
          gem: 4,
          probability: 0.016600790513833986,
          multiplier: 56.021428571428594,
        },
        {
          gem: 5,
          probability: 0.0047430830039525695,
          multiplier: 196.075,
        },
        {
          gem: 6,
          probability: 0.0011857707509881424,
          multiplier: 784.3,
        },
        {
          gem: 7,
          probability: 0.00024963594757645096,
          multiplier: 3725.4250000000006,
        },
        {
          gem: 8,
          probability: 0.00004160599126274184,
          multiplier: 22352.550000000003,
        },
        {
          gem: 9,
          probability: 0.000004894822501499039,
          multiplier: 189996.67500000002,
        },
        {
          gem: 10,
          probability: 3.0592640634369e-7,
          multiplier: 3039946.8,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.36,
          multiplier: 2.5833333333333335,
        },
        {
          gem: 2,
          probability: 0.12,
          multiplier: 7.750000000000001,
        },
        {
          gem: 3,
          probability: 0.03652173913043478,
          multiplier: 25.46428571428572,
        },
        {
          gem: 4,
          probability: 0.009960474308300394,
          multiplier: 93.36904761904763,
        },
        {
          gem: 5,
          probability: 0.0023715415019762848,
          multiplier: 392.15,
        },
        {
          gem: 6,
          probability: 0.0004743083003952569,
          multiplier: 1960.7500000000002,
        },
        {
          gem: 7,
          probability: 0.00007489078427293529,
          multiplier: 12418.083333333338,
        },
        {
          gem: 8,
          probability: 0.000008321198252548368,
          multiplier: 111762.74999999999,
        },
        {
          gem: 9,
          probability: 4.894822501499039e-7,
          multiplier: 1899966.7500000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.32,
          multiplier: 2.90625,
        },
        {
          gem: 2,
          probability: 0.09333333333333334,
          multiplier: 9.964285714285714,
        },
        {
          gem: 3,
          probability: 0.02434782608695652,
          multiplier: 38.19642857142857,
        },
        {
          gem: 4,
          probability: 0.005533596837944663,
          multiplier: 168.06428571428575,
        },
        {
          gem: 5,
          probability: 0.0010540184453227933,
          multiplier: 882.3375,
        },
        {
          gem: 6,
          probability: 0.000158102766798419,
          multiplier: 5882.249999999999,
        },
        {
          gem: 7,
          probability: 0.000016642396505096728,
          multiplier: 55881.37500000002,
        },
        {
          gem: 8,
          probability: 9.245775836164852e-7,
          multiplier: 1005864.75,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.28,
          multiplier: 3.321428571428571,
        },
        {
          gem: 2,
          probability: 0.07,
          multiplier: 13.285714285714285,
        },
        {
          gem: 3,
          probability: 0.015217391304347827,
          multiplier: 61.114285714285714,
        },
        {
          gem: 4,
          probability: 0.0027667984189723317,
          multiplier: 336.1285714285715,
        },
        {
          gem: 5,
          probability: 0.0003952569169960475,
          multiplier: 2352.8999999999996,
        },
        {
          gem: 6,
          probability: 0.00003952569169960475,
          multiplier: 23528.999999999996,
        },
        {
          gem: 7,
          probability: 0.000002080299563137091,
          multiplier: 447051.0000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.24,
          multiplier: 3.8750000000000004,
        },
        {
          gem: 2,
          probability: 0.05,
          multiplier: 18.6,
        },
        {
          gem: 3,
          probability: 0.008695652173913044,
          multiplier: 106.95,
        },
        {
          gem: 4,
          probability: 0.0011857707509881422,
          multiplier: 784.3000000000001,
        },
        {
          gem: 5,
          probability: 0.00011293054771315642,
          multiplier: 8235.15,
        },
        {
          gem: 6,
          probability: 0.000005646527385657822,
          multiplier: 164702.99999999997,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.2,
          multiplier: 4.65,
        },
        {
          gem: 2,
          probability: 0.03333333333333333,
          multiplier: 27.900000000000002,
        },
        {
          gem: 3,
          probability: 0.004347826086956522,
          multiplier: 213.9,
        },
        {
          gem: 4,
          probability: 0.00039525691699604737,
          multiplier: 2352.9000000000005,
        },
        {
          gem: 5,
          probability: 0.000018821757952192737,
          multiplier: 49410.899999999994,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.16,
          multiplier: 5.8125,
        },
        {
          gem: 2,
          probability: 0.02,
          multiplier: 46.5,
        },
        {
          gem: 3,
          probability: 0.0017391304347826088,
          multiplier: 534.75,
        },
        {
          gem: 4,
          probability: 0.00007905138339920947,
          multiplier: 11764.500000000002,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.12,
          multiplier: 7.750000000000001,
        },
        {
          gem: 2,
          probability: 0.01,
          multiplier: 93,
        },
        {
          gem: 3,
          probability: 0.0004347826086956522,
          multiplier: 2139,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.08,
          multiplier: 11.625,
        },
        {
          gem: 2,
          probability: 0.0033333333333333335,
          multiplier: 279,
        },
      ],
      [
        {
          gem: 1,
          probability: 0.04,
          multiplier: 23.25,
        },
      ],
    ],
  },
});
