import { Args, Mutation } from '@nestjs/graphql';
import { BulkUpdateUserBetResponseDTO } from '@provfair/modules/user/dtos/bulkUpdateUserBet-response.dto';
import { UpdateClientSeedResponseDTO } from '@provfair/modules/user/dtos/update-clientSeed.response.dto';
import { UpdateUserAvatarResponseDTO } from '@provfair/modules/user/dtos/updateUserAvatar-response.dto';
import { BulkUpdateUserBetInput } from '@provfair/modules/user/inputs/bulkUpdateUserBet.input';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { BetPlaceResponseDTO, CancelBetResponseDTO, CashOutResponseDTO } from '@provfair/shared/dtos';
import { BetPlaceInput, CashOutInput } from '@provfair/shared/inputs';
import { CancelBetInput } from '@provfair/shared/inputs/cancelBet.input';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { BetPlaceService, CashOutService } from '../services';
import { CancelBetService } from '../services/cancelBet.service';

@NamespacedResolver(Mutation, 'players')
export class PlayerMutationResolver {
  constructor(
    private readonly betPlaceService: BetPlaceService,
    private readonly cashOutService: CashOutService,
    private readonly cancelBetService: CancelBetService,
    private readonly userServiceInstance: UsersService,
    private readonly userBetService: UserBetService,
  ) {}

  @SimpleField({ typeRef: BetPlaceResponseDTO })
  async betPlace(@CurrentUser() authUser: AuthUser, @Args('input') input: BetPlaceInput): Promise<BetPlaceResponseDTO> {
    return this.betPlaceService.betPlace(input, authUser);
  }

  @SimpleField({ typeRef: CashOutResponseDTO })
  async cashOut(@CurrentUser() authUser: AuthUser, @Args('input') input: CashOutInput): Promise<CashOutResponseDTO> {
    return this.cashOutService.cashOut(input, authUser);
  }

  @SimpleField({ typeRef: BulkUpdateUserBetResponseDTO, internalOnly: true })
  async bulkUpdateBet(
    @Args({ name: 'input', type: () => BulkUpdateUserBetInput }) input: BulkUpdateUserBetInput,
  ): Promise<BulkUpdateUserBetResponseDTO> {
    return this.userBetService.bulkUpdateBet(input);
  }

  @SimpleField({ typeRef: CancelBetResponseDTO })
  async cancelBet(
    @CurrentUser() authUser: AuthUser,
    @Args({ name: 'input', type: () => CancelBetInput }) input: CancelBetInput,
  ): Promise<CancelBetResponseDTO> {
    return this.cancelBetService.cancelBet(input, authUser);
  }

  @SimpleField({ typeRef: UpdateUserAvatarResponseDTO })
  async updateAvatar(
    @CurrentUser() authUser: AuthUser,
    @Args({ name: 'avatar', type: () => String }) avatar: string,
  ): Promise<UpdateUserAvatarResponseDTO> {
    return this.userServiceInstance.updateUserAvatar(avatar, authUser);
  }

  @SimpleField({ typeRef: UpdateClientSeedResponseDTO })
  async updateClientSeed(
    @CurrentUser() authUser: AuthUser,
    @Args({ name: 'clientSeed', type: () => String }) clientSeed: string,
  ): Promise<UpdateClientSeedResponseDTO> {
    return this.userServiceInstance.updateClientSeed(clientSeed, authUser);
  }
}
