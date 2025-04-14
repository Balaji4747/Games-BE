import { CancelBetInput, FederationActionRepository, FederationClient } from '@provfair/modules/federation-client';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { MonitoringService } from '@provfair/monitoring';
import { SocketEvents } from '@provfair/shared/enums';

export class CancelBetUseCase extends FederationActionRepository {
  private respBuilderService: ResponseBuilderService;

  constructor(
    federationClient: FederationClient,
    protected monitor: MonitoringService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {
    super(federationClient, monitor);
    this.respBuilderService = new ResponseBuilderService();
  }

  async run(input: CancelBetInput, playerId: string, token: string) {
    try {
      this.monitor.info('START CancelBetUseCase', { data: { input, playerId } });

      const resp = await this.cancelBet(input, token);

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.CANCEL_BET_RESPONSE,
        data: this.respBuilderService.cancelBetWsResp(resp as any),
      });

      this.monitor.info('END CancelBetUseCase', { data: { input, playerId } });
    } catch (error) {
      this.monitor.error('CancelBetUseCase error', { error, data: { input, playerId } });

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.CANCEL_BET_RESPONSE,
        data: {
          betId: input?.betId,
          success: false,
          error: error.message,
        },
      });
    }
  }
}
