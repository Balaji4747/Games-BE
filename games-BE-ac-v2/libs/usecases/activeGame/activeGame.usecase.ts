import { ActiveGameInput, FederationActionRepository, FederationClient } from '@provfair/modules/federation-client';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { MonitoringService } from '@provfair/monitoring';
import { SocketEvents } from '@provfair/shared/enums';

export class ActiveGameUseCase extends FederationActionRepository {
  constructor(
    federationClient: FederationClient,
    protected monitor: MonitoringService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {
    super(federationClient, monitor);
  }

  async run(input: ActiveGameInput, playerId: string, token: string) {
    this.monitor.info('START ActiveGameUseCase', { data: { input, playerId } });

    try {
      const resp = await this.activeGame(input, token);

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.GAME_STATS,
        data: resp,
      });

      this.monitor.info('END ActiveGameUseCase', { data: { input, playerId } });

      return resp;
    } catch (error) {
      this.monitor.error('ActiveGameUseCase error', { error, data: { input, playerId } });
    }
  }
}
