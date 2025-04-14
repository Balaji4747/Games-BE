import { ValidationPipe } from '@nestjs/common';
import { NotValidClientError } from '@provfair/modules/graphql/errors/client/not-valid.error';
import { PlatformBootstrap } from 'libs/bootstrap/bootstrap';
import { FrameworkEnum } from 'libs/bootstrap/framework.enum';
import { AppModule } from './app/app.module';

new PlatformBootstrap().run({
  AppModule,
  framework: FrameworkEnum.EXPRESS,
  startMicroservices: true,
  pipes: [
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) =>
        new NotValidClientError({
          context: ValidationPipe.name,
          message: 'Data is not valid.',
          publicErrors: errors,
        }),
    }),
  ],
});
