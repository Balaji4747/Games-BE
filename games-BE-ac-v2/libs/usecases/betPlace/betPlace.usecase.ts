import { BetPlaceInput, FederationActionRepository, FederationClient } from '@provfair/modules/federation-client';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { MonitoringService } from '@provfair/monitoring';
import { SocketEvents } from '@provfair/shared/enums';

export class BetPlaceUseCase extends FederationActionRepository {
  private respBuilderService: ResponseBuilderService;

  constructor(
    federationClient: FederationClient,
    protected monitor: MonitoringService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {
    super(federationClient, monitor);
    this.respBuilderService = new ResponseBuilderService();
  }

  async run(input: BetPlaceInput, playerId: string, token: string) {
    this.monitor.info('START BetPlaceUseCase', { data: { input, playerId } });

    try {
      const betPlaceResp = await this.betPlace(input, token);

      const { betId, playerId } = betPlaceResp;

      const wsResp = this.respBuilderService.buildBetPlaceWSResp(betPlaceResp as any);

      this.socketIOEmitterService.emit({
        roomIds: betPlaceResp.playerId,
        eventName: SocketEvents.PLACE_BET_RESPONSE,
        data: wsResp,
      });

      this.monitor.info('END BetPlaceUseCase', { data: { input, playerId, betId } });

      return betPlaceResp;
    } catch (error) {
      this.monitor.error('BetPlaceUseCase error', { error, data: { input, playerId } });

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.PLACE_BET_RESPONSE,
        data: {
          betAmount: input?.betAmount,
          playerId,
          gameCode: input?.gameCode,
          btnIndex: input?.btnIndex,
          success: false,
          error: error.message,
        },
      });
    }
  }
}
