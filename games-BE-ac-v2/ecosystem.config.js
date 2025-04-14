module.exports = {
  apps: [
    {
      name: 'management',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/management/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'management',
      },
    },
    {
      name: 'players',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/players/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'players',
      },
    },
    {
      name: 'federation',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/federation/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'federation',
      },
    },
    {
      name: 'gateway-ws',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/gateway-ws/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'gateway-ws',
      },
    },
    {
      name: 'aviatorx',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/aviatorx/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'aviatorx',
      },
    },
    {
      name: 'crash',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/crash/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'crash',
      },
    },
    {
      name: 'slide',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/slide/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'slide',
      },
    },
    {
      name: 'dice',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/dice/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'dice',
      },
    },
    {
      name: 'plinko',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/plinko/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'plinko',
      },
    },
    {
      name: 'limbo',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/limbo/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'limbo',
      },
    },
    {
      name: 'diamonds',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/diamonds/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'diamonds',
      },
    },
    {
      name: 'hilo',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/hilo/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'hilo',
      },
    },
    {
      name: 'mines',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/mines/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'mines',
      },
    },
    {
      name: 'pcrash',
      script: 'ts-node',
      args: ' --transpile-only -r tsconfig-paths/register apps/pcrash/src/main.ts',
      watch: false,
      autorestart: false,
      vizion: false,
      env: {
        SERVICE: 'pcrash',
      },
    },
  ],
};
