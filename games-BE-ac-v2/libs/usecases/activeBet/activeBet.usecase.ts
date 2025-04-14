import { FederationActionRepository, FederationClient } from '@provfair/modules/federation-client';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { MonitoringService } from '@provfair/monitoring';
import { SocketEvents } from '@provfair/shared/enums';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';

export class ActiveBetUseCase extends FederationActionRepository {
  constructor(
    federationClient: FederationClient,
    protected monitor: MonitoringService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {
    super(federationClient, monitor);
  }

  async run(currentUser: AuthUser) {
    const { playerId, token, gameCode } = currentUser;

    this.monitor.info('START ActiveBetUseCase', { data: { playerId, gameCode } });

    try {
      const resp = await this.activeBet(token);

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.ACTIVE_BET,
        data: resp,
      });

      this.monitor.info('END ActiveBetUseCase', { data: { playerId, gameCode } });

      return resp;
    } catch (error) {
      this.monitor.error('ActiveBetUseCase error', { error, data: { playerId, gameCode } });
    }
  }
}
