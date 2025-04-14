import { Args, Query } from '@nestjs/graphql';
import { SortOffsetLimitArgs } from '@provfair/modules/graphql/inputs/sort-offset-limit.args';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { SlideCurrentDayRoundResponseDTO } from './dtos/currentDayRounds-response.dto';
import { SlideRoundInfoResponseDTO } from './dtos/roundInfo-response.dto';
import { SlideService } from './slide.service';

@NamespacedResolver(Query, 'slide')
export class SlideQueriesResolver {
  constructor(private readonly slideService: SlideService) {}

  @SimpleField({ typeRef: SlideRoundInfoResponseDTO, options: { nullable: true } })
  async roundInfo(@Args('roundId', { type: () => String }) roundId: string): Promise<SlideRoundInfoResponseDTO> {
    return this.slideService.getRoundInfo(roundId);
  }

  @SimpleField({ typeRef: [SlideCurrentDayRoundResponseDTO], options: { nullable: true } })
  async currentDayRounds(
    @CurrentUser() authUser: AuthUser,
    @Args() input: SortOffsetLimitArgs,
  ): Promise<SlideCurrentDayRoundResponseDTO[]> {
    return this.slideService.getCurrentDayRounds(input, authUser);
  }
}
