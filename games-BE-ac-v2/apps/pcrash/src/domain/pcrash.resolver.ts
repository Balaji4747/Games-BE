import { Args, Query } from '@nestjs/graphql';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { GameMode } from '@provfair/shared/enums';
import { PCrashLastRoundDTO } from './dtos/lastRound-response.dto';
import { PCrashRoundInfoResponseDTO } from './dtos/roundInfo-response.dto';
import { PCrashService } from './pcrash.service';

@NamespacedResolver(Query, 'pcrash')
export class PCrashQueriesResolver {
  constructor(private readonly service: PCrashService) {}

  @SimpleField({ typeRef: [PCrashLastRoundDTO], options: { nullable: true } })
  async lastMultipliers(@Args('gameMode', { type: () => String }) gameMode: GameMode): Promise<PCrashLastRoundDTO[]> {
    return this.service.getLastMultipliers(gameMode);
  }

  @SimpleField({ typeRef: PCrashRoundInfoResponseDTO, options: { nullable: true } })
  async roundInfo(@Args('roundId', { type: () => String }) roundId: string): Promise<PCrashRoundInfoResponseDTO> {
    return this.service.getRoundInfo(roundId);
  }
}
