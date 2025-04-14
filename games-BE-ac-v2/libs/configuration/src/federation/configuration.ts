import { registerAs } from '@nestjs/config';

export default registerAs('federation', () => ({
  players: {
    service: 'players',
    url: process.env.PLAYERS_GRAPHQL_URL,
  },
  aviatorx: {
    service: 'aviatorx',
    url: process.env.AVIATORX_GRAPHQL_URL,
  },
  management: {
    service: 'management',
    url: process.env.MANAGEMENT_GRAPHQL_URL,
  },
  crash: {
    service: 'crash',
    url: process.env.CRASH_GRAPHQL_URL,
  },

  slide: {
    service: 'slide',
    url: process.env.SLIDE_GRAPHQL_URL,
  },

  dice: {
    service: 'dice',
    url: process.env.DICE_GRAPHQL_URL,
  },

  plinko: {
    service: 'plinko',
    url: process.env.PLINKO_GRAPHQL_URL,
  },

  limbo: {
    service: 'limbo',
    url: process.env.LIMBO_GRAPHQL_URL,
  },

  diamond: {
    service: 'diamond',
    url: process.env.DIAMOND_GRAPHQL_URL,
  },

  hilo: {
    service: 'hilo',
    url: process.env.HILO_GRAPHQL_URL,
  },

  mines: {
    service: 'mines',
    url: process.env.MINES_GRAPHQL_URL,
  },

  pcrash: {
    service: 'pcrash',
    url: process.env.PCRASH_GRAPHQL_URL,
  },

  buttonpop: {
    service: 'buttonpop',
    url: process.env.BUTTONPOP_GRAPHQL_URL,
  },

  bottlesmash: {
    service: 'bottlesmash',
    url: process.env.BOTTLESMASH_GRAPHQL_URL,
  },

  overandout: {
    service: 'overandout',
    url: process.env.OVERANDOUT_GRAPHQL_URL,
  },
}));
