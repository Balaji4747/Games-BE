import { PlatformBootstrap } from 'libs/bootstrap/bootstrap';
import { FrameworkEnum } from 'libs/bootstrap/framework.enum';
import { AppModule } from './modules/app.module';

new PlatformBootstrap().run({
  AppModule,
  framework: FrameworkEnum.EXPRESS,
  enableWebSockets: true,
});
