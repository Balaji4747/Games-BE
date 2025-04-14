import { CashOutInput, FederationActionRepository, FederationClient } from '@provfair/modules/federation-client';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { MonitoringService } from '@provfair/monitoring';
import { SocketEvents } from '@provfair/shared/enums';

export class CashOutUseCase extends FederationActionRepository {
  private respBuilderService: ResponseBuilderService;

  constructor(
    federationClient: FederationClient,
    protected monitor: MonitoringService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {
    super(federationClient, monitor);
    this.respBuilderService = new ResponseBuilderService();
  }

  async run(input: CashOutInput, playerId: string, token: string) {
    try {
      this.monitor.info('START CashOutUseCase', { data: { input, playerId } });

      const resp = await this.cashOut(input, token);

      const wsResp = this.respBuilderService.cashOutWsResp(resp as any);

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.CASHOUT_RESPONSE,
        data: wsResp,
      });

      this.monitor.info('END CashOutUseCase', { data: { input, playerId } });
    } catch (error) {
      this.monitor.error('CashOutUseCase error', { error, data: { input, playerId } });

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.CASHOUT_RESPONSE,
        data: {
          betId: input?.betId,
          success: false,
          error: error.message,
        },
      });
    }
  }
}
