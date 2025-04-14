import { NestFactory } from '@nestjs/core';
import { AppConfigService } from '@provfair/configuration/app';
import { buildStartupLogger, REQUEST_ID_HEADER } from '@provfair/logger';
import { MonitoringService } from '@provfair/monitoring';
import { nanoid } from 'nanoid';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const logger = buildStartupLogger();
  const app = await NestFactory.create(AppModule, {
    logger: logger.CommonLoggerInterface,
  });
  const appConfig: AppConfigService = app.get(AppConfigService);

  const monitor: MonitoringService = app.get(MonitoringService);

  app.use((req, res, next) => {
    if (req?.body?.operationName === 'IntrospectionQuery') {
      next();
      return;
    }

    const requestId = req?.headers?.[REQUEST_ID_HEADER] || nanoid();

    res?.setHeader(REQUEST_ID_HEADER, requestId);

    next();
  });

  app.enableCors({ credentials: true, origin: true });

  await app.listen(appConfig.port, () => monitor.info(`Federation service is listening on port: ${appConfig.port}`));
}

bootstrap();
