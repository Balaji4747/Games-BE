import { Args, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { GraphQLJSON } from 'graphql-scalars';
import { PlinkoBetPlaceResponseDTO } from './dtos/plinkoBetPlaceResponse.dto';
import { PlinkoBetPlaceInput } from './inputs/plinkoBetPlace.input';
import { PlinkoService } from './plinko.service';

@NamespacedResolver(Query, 'plinko')
export class PlinkoQueriesResolver {
  constructor(private readonly plinkoService: PlinkoService) {}

  @SimpleField({ typeRef: GraphQLJSON })
  async payTable(@CurrentUser() authUser: AuthUser) {
    return this.plinkoService.payTable(authUser);
  }
}

@NamespacedResolver(Mutation, 'plinko')
export class PlinkoMutationResolver {
  constructor(private readonly plinkoService: PlinkoService) {}

  @SimpleField({ typeRef: PlinkoBetPlaceResponseDTO })
  async betPlace(
    @CurrentUser() authUser: AuthUser,
    @Args() input: PlinkoBetPlaceInput,
  ): Promise<PlinkoBetPlaceResponseDTO> {
    return this.plinkoService.betPlace(input, authUser);
  }
}
