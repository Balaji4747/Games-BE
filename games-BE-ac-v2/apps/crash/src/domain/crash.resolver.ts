import { Args, Query } from '@nestjs/graphql';
import { SortOffsetLimitArgs } from '@provfair/modules/graphql/inputs/sort-offset-limit.args';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { CrashService } from './crash.service';
import { CrashCurrentDayRoundResponseDTO } from './dtos/currentDayRounds-response.dto';
import { CrashRoundInfoResponseDTO } from './dtos/roundInfo-response.dto';

@NamespacedResolver(Query, 'crash')
export class CrashQueriesResolver {
  constructor(private readonly crashService: CrashService) {}

  @SimpleField({ typeRef: CrashRoundInfoResponseDTO, options: { nullable: true } })
  async roundInfo(@Args('roundId', { type: () => String }) roundId: string): Promise<CrashRoundInfoResponseDTO> {
    return this.crashService.getRoundInfo(roundId);
  }

  @SimpleField({ typeRef: [CrashCurrentDayRoundResponseDTO], options: { nullable: true } })
  async currentDayRounds(
    @CurrentUser() authUser: AuthUser,
    @Args() input: SortOffsetLimitArgs,
  ): Promise<CrashCurrentDayRoundResponseDTO[]> {
    return this.crashService.getCurrentDayRounds(input, authUser);
  }
}
