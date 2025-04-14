import { Module } from '@nestjs/common';
import { FederationClientConfigModule, FederationClientConfigService } from '@provfair/configuration/federation-client';
import { FederationClientModule } from '@provfair/modules/federation-client';
import { JWTModule } from '@provfair/modules/jwt/jwt.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { EventsController } from './events.controller';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    JWTModule,
    SocketIOEmitterModule,
    FederationClientModule.forRootAsync({
      imports: [FederationClientConfigModule],
      inject: [FederationClientConfigService],
      useFactory: (config: FederationClientConfigService) => {
        return {
          url: config.url,
          token: config.token,
        };
      },
    }),
  ],
  providers: [EventsGateway],
  controllers: [EventsController],
  exports: [EventsGateway],
})
export class EventsGatewayModule {}
