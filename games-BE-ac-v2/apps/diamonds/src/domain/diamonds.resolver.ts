import { Args, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { GraphQLJSON } from 'graphql-scalars';
import { DiamondsService } from './diamonds.service';
import { DiamondBetPlaceResponseDTO } from './dtos/diamondBetPlaceResponse.dto';
import { DiamondBetPlaceInput } from './inputs/diamondBetPlace.input';

@NamespacedResolver(Query, 'diamonds')
export class DiamondQueriesResolver {
  constructor(private readonly diamondService: DiamondsService) {}

  @SimpleField({ typeRef: GraphQLJSON })
  async payTable(@CurrentUser() authUser: AuthUser) {
    return this.diamondService.payTable(authUser);
  }
}

@NamespacedResolver(Mutation, 'diamonds')
export class DiamondMutationResolver {
  constructor(private readonly diamondService: DiamondsService) {}

  @SimpleField({ typeRef: DiamondBetPlaceResponseDTO })
  async betPlace(
    @CurrentUser() authUser: AuthUser,
    @Args() input: DiamondBetPlaceInput,
  ): Promise<DiamondBetPlaceResponseDTO> {
    return this.diamondService.betPlace(input, authUser);
  }
}
