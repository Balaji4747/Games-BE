import { MonitoringService } from '@provfair/monitoring';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { FederationClient } from './federation-client';
import { ActiveGameInput, BetPlaceInput, BetPlaceResponse, CancelBetInput, CashOutInput } from './generated/graphql';

export class FederationActionRepository {
  constructor(
    readonly federationClient: FederationClient,
    protected logger: MonitoringService,
  ) {}

  async betPlace(input: BetPlaceInput, token: string): Promise<BetPlaceResponse> {
    const result = await this.federationClient.call('BetPlace', { input }, token);

    return result?.players?.betPlace;
  }

  async cashOut(input: CashOutInput, token: string) {
    const result = await this.federationClient.call('CashOut', { input }, token);

    return result?.players?.cashOut;
  }

  async activeGame(input: ActiveGameInput, token: string) {
    const result = await this.federationClient.call('ActiveGame', { input }, token);

    return result?.players?.activeGame;
  }

  async activeBet(token: string) {
    const result = await this.federationClient.call('ActiveBet', null, token);

    return result?.players?.activeBet;
  }

  async cancelBet(input: CancelBetInput, token: string) {
    const result = await this.federationClient.call('CancelBet', { input }, token);

    return result?.players?.cancelBet;
  }

  async lastMultipliers(gameCode: GameCodes, gameMode: GameMode, token: string) {
    const result = await this.federationClient.call(
      `${gameCode.toLowerCase()}LastMultipliers` as any,
      { gameMode },
      token,
    );

    return result?.[gameCode.toLowerCase()]?.lastMultipliers;
  }
}
