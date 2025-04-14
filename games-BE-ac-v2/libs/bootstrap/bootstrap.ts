import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from '@provfair/configuration/app';
import { RedisClientConfigService } from '@provfair/configuration/redis-client';
import { AppLogger, buildStartupLogger } from '@provfair/logger';
import { MonitoringService } from '@provfair/monitoring';
import { RedisIoAdapter } from '@provfair/shared/adapters/socket-io-redis.adapter';
import { CatchAll } from '@provfair/shared/decorators';
import { IBootstrapOptions } from './bootstrap.interface';
import { FRAMEWORK_TYPE } from './constants';
import { FrameworkEnum } from './framework.enum';

export class PlatformBootstrap {
  @CatchAll((err) => {
    console.error(err);

    process.exit(1);
  })
  public async run(options: IBootstrapOptions): Promise<void> {
    const framework = this?.[options.framework];

    if (!framework) {
      throw new Error(`Bootstrap for ${options.framework} not implemented`);
    }

    const logger: AppLogger = buildStartupLogger();

    const app: INestApplication = await framework(options.AppModule, logger, options?.factoryOptions);

    app.enableShutdownHooks();

    const appConfig: AppConfigService = app.get(AppConfigService);
    const monitor: MonitoringService = app.get(MonitoringService);

    if (options.startMicroservices) {
      const redisClientConfig: RedisClientConfigService = app.get(RedisClientConfigService);
      app.connectMicroservice<MicroserviceOptions>({ transport: Transport.REDIS, options: redisClientConfig.redis });

      await app.startAllMicroservices();
    }

    if (options?.filters?.length) {
      app.useGlobalFilters(...options?.filters);
    }

    if (options.enableWebSockets) {
      const redisConfigService = app.get(RedisClientConfigService);
      app.useWebSocketAdapter(new RedisIoAdapter(app, redisConfigService));
    }

    app.use((req, res, next) => {
      res[FRAMEWORK_TYPE] = options.framework;

      next();
    });

    app.enableCors({ credentials: true, origin: true });

    options?.middlewares?.forEach((middleware) => app.use(middleware));

    options?.pipes?.forEach((pipe) => app.useGlobalPipes(pipe));

    await app.listen(appConfig.port, () =>
      monitor.info(`${appConfig.name?.toUpperCase()} service is listening on port: ${appConfig.port}`),
    );
  }

  private async [FrameworkEnum.EXPRESS](
    module: any,
    logger: AppLogger,
    factoryOptions?: Record<string, any>,
  ): Promise<INestApplication> {
    const app = await NestFactory.create<NestExpressApplication>(module, {
      logger: logger.CommonLoggerInterface,
      ...(factoryOptions || {}),
    });

    return app;
  }
}
