#! /usr/bin/env node

/* eslint-disable*/
'use strict';
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const waitOn = require('wait-on');
const yargs = require('yargs');
const { mapValuesLimit } = require('async');
const config = require('./ecosystem.config');

const APP_PORT_KEY = 'APP_PORT';
let BUILD_APP_LIMIT = 3;

const ecosystemConfigPath = path.join(__dirname, 'ecosystem.config.js');

const execCommand = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const getConfigFromArgv = async () => {
  const argBuilder = yargs
    .version(false)
    .option('timeout', {
      describe: 'Wait timeout for each service start in seconds.',
      alias: 't',
      type: 'number',
      number: true,
      default: 5 * 60,
    })
    .option('limit', {
      describe: 'Concurrency limit.',
      alias: 'l',
      type: 'number',
      number: true,
      default: 3,
    })
    .alias('h', 'help')
    .help();

  const rawConfig = await argBuilder.strict().argv;

  return Object.freeze({
    timeout: rawConfig.timeout,
    limit: rawConfig.limit,
  });
};

const delay = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getEnvFileName = (app) => {
  return path.join(__dirname, `.env.${app}.local`);
};

const startServices = async (timeout = 60) => {
  try {
    if (!config.apps || !Array.isArray(config.apps) || config.apps.length === 0) {
      throw new Error('No apps found in ecosystem.config.js');
    }

    const appsToRun = config.apps.filter((appName) => appName.name !== 'federation');

    await mapValuesLimit(appsToRun, BUILD_APP_LIMIT, async (app) => {
      const cliCmd = `pm2 -s start ${ecosystemConfigPath} --only ${app.name}`;

      console.log('\x1b[34m', `Start service:[${app.name}]`);

      await execCommand(cliCmd);
      const envPath = getEnvFileName(app.name);
      const envFile = await fs.readFile(envPath, { encoding: 'utf-8' });

      if (!envFile) {
        console.log(`env file ${envPath} for ${app.name} not found. skip.`);
        return null;
      }
      const fileData = envFile.split('\n');
      const findPort = fileData
        .find((line) => line.includes(APP_PORT_KEY))
        ?.split('=')?.[1]
        .trim();

      if (findPort && !Number.isNaN(parseInt(findPort, 10))) {
        try {
          await waitOn({
            resources: [`http://localhost:${findPort}`],
            interval: 50,
            timeout: timeout * 1000,
            window: 0,
            validateStatus: function (status) {
              return status >= 200;
            },
          });
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      }

      console.log('\x1b[32m', `${app.name} started successfully`);
    });

    console.log('\x1b[37m', 'All apps started');
  } catch (error) {
    console.error('Failed to start apps:', error);
  }
};

const startFederation = async (timeout = 5 * 60) => {
  try {
    const pm2Command = `pm2 -s start ${ecosystemConfigPath} --only 'federation'`;
    await execCommand(pm2Command);

    console.log('\x1b[34m', `Start federation`);

    await waitOn({
      resources: [`http://localhost:3100`],
      interval: 50,
      timeout: timeout * 1000,
      window: 0,
      validateStatus: function (status) {
        return status >= 200;
      },
    });

    console.log('\x1b[32m', `Federation started successfully`);

    await delay(1000);
  } catch (error) {
    console.error('\x1b[31m', 'Failed to start federation:', error);
  }
};

const stopAll = async () => {
  try {
    const pm2Command = `pm2 stop all`;
    await execCommand(pm2Command);

    console.log('\x1b[32m', `Services have been stopped`);

    await delay(1000);
  } catch (error) {
    console.error('\x1b[31m', 'Failed to stop apps:', error);
  }
};

const restartAll = async () => {
  const startTime = process.hrtime();

  const params = await getConfigFromArgv();

  if (params.limit) {
    BUILD_APP_LIMIT = params.limit;
  }

  await stopAll();
  await startServices(params.timeout);
  await startFederation(params.timeout);

  const endTime = process.hrtime(startTime);
  const duration = (endTime[0] * 1000000000 + endTime[1]) / 1000000;

  console.log(`I finish in ${Math.round(duration / 1000)} seconds\n\n`, 'Provfair started\n\n', 'Good luck with development! ❤')
};

void restartAll();
