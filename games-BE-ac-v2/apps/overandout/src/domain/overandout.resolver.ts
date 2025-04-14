import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { GraphQLJSON } from 'graphql-scalars';
import { OverAndOutBetPlaceResponseDTO } from './dtos/overandoutBetPlaceResponse.dto';
import { OverAndOutAutoBetPlaceInput, OverAndOutBetPlaceInput } from './inputs/overandoutBetPlace.input';
import { OverAndOutService } from './overandout.service';

@NamespacedResolver(Query, 'overandout')
export class OverAndOutQueriesResolver {
  constructor(private readonly service: OverAndOutService) {}

  @SimpleField({ typeRef: GraphQLJSON })
  async payTable(@CurrentUser() authUser: AuthUser) {
    return this.service.payTable(authUser);
  }
}

@NamespacedResolver(Mutation, 'overandout')
export class OverAndOutMutationResolver {
  constructor(private readonly service: OverAndOutService) {}

  @SimpleField({ typeRef: OverAndOutBetPlaceResponseDTO })
  async betPlace(
    @CurrentUser() authUser: AuthUser,
    @Args() input: OverAndOutBetPlaceInput,
  ): Promise<OverAndOutBetPlaceResponseDTO> {
    return this.service.betPlace(input, authUser);
  }

  @SimpleField({ typeRef: OverAndOutBetPlaceResponseDTO })
  async nextMine(
    @CurrentUser() authUser: AuthUser,
    @Args('position', { type: () => Int }) position: number,
  ): Promise<OverAndOutBetPlaceResponseDTO> {
    return this.service.nextMine(position, authUser);
  }

  @SimpleField({ typeRef: OverAndOutBetPlaceResponseDTO })
  async cashOut(@CurrentUser() authUser: AuthUser): Promise<OverAndOutBetPlaceResponseDTO> {
    return this.service.cashOut(authUser);
  }

  @SimpleField({ typeRef: OverAndOutBetPlaceResponseDTO })
  async autoBet(
    @CurrentUser() authUser: AuthUser,
    @Args() input: OverAndOutAutoBetPlaceInput,
  ): Promise<OverAndOutBetPlaceResponseDTO> {
    return this.service.autoBet(input, authUser);
  }
}
