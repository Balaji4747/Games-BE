import { Args, Query } from '@nestjs/graphql';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { GameMode } from '@provfair/shared/enums';
import { AviatorxService } from './aviatorx.service';
import { AviatorxLastRoundDTO } from './dtos/lastRound-response.dto';
import { AviatorxRoundInfoResponseDTO } from './dtos/roundInfo-response.dto';

@NamespacedResolver(Query, 'aviatorx')
export class AviatorxQueriesResolver {
  constructor(private readonly aviatorxService: AviatorxService) {}

  @SimpleField({ typeRef: [AviatorxLastRoundDTO], options: { nullable: true } })
  async lastMultipliers(@Args('gameMode', { type: () => String }) gameMode: GameMode): Promise<AviatorxLastRoundDTO[]> {
    return this.aviatorxService.getLastMultipliers(gameMode);
  }

  @SimpleField({ typeRef: AviatorxRoundInfoResponseDTO, options: { nullable: true } })
  async roundInfo(@Args('roundId', { type: () => String }) roundId: string): Promise<AviatorxRoundInfoResponseDTO> {
    return this.aviatorxService.getRoundInfo(roundId);
  }
}
