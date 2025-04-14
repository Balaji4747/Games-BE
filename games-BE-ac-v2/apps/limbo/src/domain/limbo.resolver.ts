import { Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { LimboBetPlaceResponseDTO } from './dtos/limboBetPlaceResponse.dto';
import { LimboBetPlaceInput } from './inputs/limboBetPlace.input';
import { LimboService } from './limbo.service';

@NamespacedResolver(Mutation, 'limbo')
export class LimboMutationResolver {
  constructor(private readonly limboService: LimboService) {}

  @SimpleField({ typeRef: LimboBetPlaceResponseDTO })
  async betPlace(
    @CurrentUser() authUser: AuthUser,
    @Args() input: LimboBetPlaceInput,
  ): Promise<LimboBetPlaceResponseDTO> {
    return this.limboService.betPlace(input, authUser);
  }
}
