import { Args, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { DiceService } from './dice.service';
import { DiceRollResponseDTO } from './dtos/diceRoll-response.dto';
import { PayTableEntryDTO } from './dtos/payTable-response.dto';
import { DiceRollInput } from './inputs/diceRoll.input';

@NamespacedResolver(Query, 'dice')
export class DiceQueriesResolver {
  constructor(private readonly diceService: DiceService) {}

  @SimpleField({ typeRef: [PayTableEntryDTO] })
  async payTable(@CurrentUser() authUser: AuthUser): Promise<PayTableEntryDTO[]> {
    return this.diceService.payTable(authUser);
  }
}

@NamespacedResolver(Mutation, 'dice')
export class DiceMutationResolver {
  constructor(private readonly diceService: DiceService) {}

  @SimpleField({ typeRef: DiceRollResponseDTO })
  async roll(@CurrentUser() authUser: AuthUser, @Args() input: DiceRollInput): Promise<DiceRollResponseDTO> {
    return this.diceService.roll(input, authUser);
  }
}
