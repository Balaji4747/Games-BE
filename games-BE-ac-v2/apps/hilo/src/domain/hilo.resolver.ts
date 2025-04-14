import { Args, Mutation, Query } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { GraphQLJSON } from 'graphql-scalars';
import { HiloBetPlaceResponseDTO } from './dtos/hiloBetPlaceResponse.dto';
import { HiloGameConditions } from './enums';
import { HiloService } from './hilo.service';
import { HiloBetPlaceInput } from './inputs/hiloBetPlace.input';

@NamespacedResolver(Query, 'hilo')
export class HiloQueriesResolver {
  constructor(private readonly hiloService: HiloService) {}

  @SimpleField({ typeRef: GraphQLJSON })
  async payTable(@CurrentUser() authUser: AuthUser) {
    return this.hiloService.payTable(authUser);
  }
}

@NamespacedResolver(Mutation, 'hilo')
export class HiloMutationResolver {
  constructor(private readonly hiloService: HiloService) {}

  @SimpleField({ typeRef: HiloBetPlaceResponseDTO })
  async betPlace(
    @CurrentUser() authUser: AuthUser,
    @Args() input: HiloBetPlaceInput,
  ): Promise<HiloBetPlaceResponseDTO> {
    return this.hiloService.betPlace(input, authUser);
  }

  @SimpleField({ typeRef: HiloBetPlaceResponseDTO })
  async nextCard(
    @CurrentUser() authUser: AuthUser,
    @Args('guess', { type: () => HiloGameConditions }) guess: HiloGameConditions,
  ): Promise<HiloBetPlaceResponseDTO> {
    return this.hiloService.nextCard(guess, authUser);
  }

  @SimpleField({ typeRef: HiloBetPlaceResponseDTO })
  async cashOut(@CurrentUser() authUser: AuthUser): Promise<HiloBetPlaceResponseDTO> {
    return this.hiloService.cashOut(authUser);
  }
}
