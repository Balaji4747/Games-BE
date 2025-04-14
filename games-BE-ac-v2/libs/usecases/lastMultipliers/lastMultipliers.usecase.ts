import { FederationActionRepository, FederationClient } from '@provfair/modules/federation-client';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { MonitoringService } from '@provfair/monitoring';
import { GameCodes, GameMode, SocketEvents } from '@provfair/shared/enums';

export class LastMultipliersUseCase extends FederationActionRepository {
  constructor(
    federationClient: FederationClient,
    protected monitor: MonitoringService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {
    super(federationClient, monitor);
  }

  async run(gameMode: GameMode, gameCode: GameCodes, playerId: string, token: string) {
    try {
      if (![GameCodes.AVIATORX, GameCodes.PCRASH, GameCodes.BUTTONPOP].includes(gameCode)) {
        return;
      }

      this.monitor.info('START LastMultipliersUseCase', { data: { gameCode, gameMode, playerId } });

      const resp = await this.lastMultipliers(gameCode, gameMode, token);

      this.socketIOEmitterService.emit({
        roomIds: playerId,
        eventName: SocketEvents.LAST_MULTIPLIERS,
        data: resp,
      });

      this.monitor.info('END LastMultipliersUseCase', { data: { gameMode, playerId } });
    } catch (error) {
      this.monitor.error('LastMultipliersUseCase error', { error, data: { gameMode, playerId } });
    }
  }
}
