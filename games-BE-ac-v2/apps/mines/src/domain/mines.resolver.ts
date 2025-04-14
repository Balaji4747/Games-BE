import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { GraphQLJSON } from 'graphql-scalars';
import { MinesBetPlaceResponseDTO } from './dtos/minesBetPlaceResponse.dto';
import { MinesAutoBetPlaceInput, MinesBetPlaceInput } from './inputs/minesBetPlace.input';
import { MinesService } from './mines.service';

@NamespacedResolver(Query, 'mines')
export class MinesQueriesResolver {
  constructor(private readonly minesService: MinesService) {}

  @SimpleField({ typeRef: GraphQLJSON })
  async payTable(@CurrentUser() authUser: AuthUser) {
    return this.minesService.payTable(authUser);
  }
}

@NamespacedResolver(Mutation, 'mines')
export class MinesMutationResolver {
  constructor(private readonly minesService: MinesService) {}

  @SimpleField({ typeRef: MinesBetPlaceResponseDTO })
  async betPlace(
    @CurrentUser() authUser: AuthUser,
    @Args() input: MinesBetPlaceInput,
  ): Promise<MinesBetPlaceResponseDTO> {
    return this.minesService.betPlace(input, authUser);
  }

  @SimpleField({ typeRef: MinesBetPlaceResponseDTO })
  async nextMine(
    @CurrentUser() authUser: AuthUser,
    @Args('position', { type: () => Int }) position: number,
  ): Promise<MinesBetPlaceResponseDTO> {
    return this.minesService.nextMine(position, authUser);
  }

  @SimpleField({ typeRef: MinesBetPlaceResponseDTO })
  async cashOut(@CurrentUser() authUser: AuthUser): Promise<MinesBetPlaceResponseDTO> {
    return this.minesService.cashOut(authUser);
  }

  @SimpleField({ typeRef: MinesBetPlaceResponseDTO })
  async autoBet(
    @CurrentUser() authUser: AuthUser,
    @Args() input: MinesAutoBetPlaceInput,
  ): Promise<MinesBetPlaceResponseDTO> {
    return this.minesService.autoBet(input, authUser);
  }
}
