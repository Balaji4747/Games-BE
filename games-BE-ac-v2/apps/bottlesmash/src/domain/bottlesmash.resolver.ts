import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { GraphQLJSON } from 'graphql-scalars';
import { BottleSmashService } from './bottlesmash.service';
import { BottleSmashBetPlaceResponseDTO } from './dtos/bottlesmashBetPlaceResponse.dto';
import { BottleSmashAutoBetPlaceInput, BottleSmashBetPlaceInput } from './inputs/bottlesmashBetPlace.input';

@NamespacedResolver(Query, 'bottlesmash')
export class BottleSmashQueriesResolver {
  constructor(private readonly service: BottleSmashService) {}

  @SimpleField({ typeRef: GraphQLJSON })
  async payTable(@CurrentUser() authUser: AuthUser) {
    return this.service.payTable(authUser);
  }
}

@NamespacedResolver(Mutation, 'bottlesmash')
export class BottleSmashMutationResolver {
  constructor(private readonly service: BottleSmashService) {}

  @SimpleField({ typeRef: BottleSmashBetPlaceResponseDTO })
  async betPlace(
    @CurrentUser() authUser: AuthUser,
    @Args() input: BottleSmashBetPlaceInput,
  ): Promise<BottleSmashBetPlaceResponseDTO> {
    return this.service.betPlace(input, authUser);
  }

  @SimpleField({ typeRef: BottleSmashBetPlaceResponseDTO })
  async nextMine(
    @CurrentUser() authUser: AuthUser,
    @Args('position', { type: () => Int }) position: number,
  ): Promise<BottleSmashBetPlaceResponseDTO> {
    return this.service.nextMine(position, authUser);
  }

  @SimpleField({ typeRef: BottleSmashBetPlaceResponseDTO })
  async cashOut(@CurrentUser() authUser: AuthUser): Promise<BottleSmashBetPlaceResponseDTO> {
    return this.service.cashOut(authUser);
  }

  @SimpleField({ typeRef: BottleSmashBetPlaceResponseDTO })
  async autoBet(
    @CurrentUser() authUser: AuthUser,
    @Args() input: BottleSmashAutoBetPlaceInput,
  ): Promise<BottleSmashBetPlaceResponseDTO> {
    return this.service.autoBet(input, authUser);
  }
}
