import { Args, Query } from '@nestjs/graphql';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { GameMode } from '@provfair/shared/enums';
import { ButtonPopService } from './buttonpop.service';
import { ButtonPopLastRoundDTO } from './dtos/lastRound-response.dto';
import { ButtonPopRoundInfoResponseDTO } from './dtos/roundInfo-response.dto';

@NamespacedResolver(Query, 'buttonpop')
export class ButtonPopQueriesResolver {
  constructor(private readonly service: ButtonPopService) {}

  @SimpleField({ typeRef: [ButtonPopLastRoundDTO], options: { nullable: true } })
  async lastMultipliers(
    @Args('gameMode', { type: () => String }) gameMode: GameMode,
  ): Promise<ButtonPopLastRoundDTO[]> {
    return this.service.getLastMultipliers(gameMode);
  }

  @SimpleField({ typeRef: ButtonPopRoundInfoResponseDTO, options: { nullable: true } })
  async roundInfo(@Args('roundId', { type: () => String }) roundId: string): Promise<ButtonPopRoundInfoResponseDTO> {
    return this.service.getRoundInfo(roundId);
  }
}
