import { Args, Query } from '@nestjs/graphql';
import { ActiveBetResponseDTO } from '@provfair/modules/user/dtos/activeBet-response.dto';
import { ActiveGameResponseDTO } from '@provfair/modules/user/dtos/activeGame-response.dto';
import { AviatorxLastRoundBetsDTO } from '@provfair/modules/user/dtos/aviatorxLastRoundBets-response.dto';
import { BetInfoResponseDTO } from '@provfair/modules/user/dtos/betInfo-response.dto';
import { GetPlayerSeedsResponseDTO } from '@provfair/modules/user/dtos/getPlayerSeeds-response.dto';
import { LastRoundBetsDTO } from '@provfair/modules/user/dtos/lastRoundBets-response.dto';
import { UserBetsResponseDTO } from '@provfair/modules/user/dtos/userBets-response.dto';
import { UserBetsInput } from '@provfair/modules/user/inputs/userBets.input';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { CurrentUser } from '@provfair/shared/decorators/current-user.decorator';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { ActiveGameInput } from '@provfair/shared/inputs';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { InitResponseDTO } from '../dtos/init-response.dto';
import { VerifyFairnessResponseDTO } from '../dtos/verifyFairness-response.dto';
import { InitArgs } from '../inputs/init.args';
import { VerifyFairnessInput } from '../inputs/verifyFairness.input';
import { PlayersService } from '../players.service';

@NamespacedResolver(Query, 'players')
export class PlayerQueriesResolver {
  constructor(
    private readonly playersService: PlayersService,
    private readonly userBetService: UserBetService,
    private readonly userServiceInstance: UsersService,
  ) {}

  @SimpleField({ typeRef: InitResponseDTO, isAuth: false })
  async init(@Args() input: InitArgs): Promise<InitResponseDTO> {
    return this.playersService.init(input);
  }

  @SimpleField({ typeRef: ActiveGameResponseDTO, options: { nullable: true } })
  async activeGame(
    @CurrentUser() authUser: AuthUser,
    @Args('input') input: ActiveGameInput,
  ): Promise<ActiveGameResponseDTO> {
    return this.userBetService.activeGameInfo(input, authUser);
  }

  @SimpleField({ typeRef: [AviatorxLastRoundBetsDTO], options: { nullable: true } })
  async aviatorxLastRoundBets(
    @Args('gameMode', { type: () => String }) gameMode: GameMode,
  ): Promise<AviatorxLastRoundBetsDTO[]> {
    return this.userBetService.aviatorxGetLastRoundBets(gameMode);
  }

  @SimpleField({ typeRef: [UserBetsResponseDTO], options: { nullable: true } })
  async bets(@CurrentUser() authUser: AuthUser, @Args('input') input: UserBetsInput): Promise<UserBetsResponseDTO[]> {
    return this.userBetService.getUserBets(input, authUser);
  }

  @SimpleField({ typeRef: ActiveBetResponseDTO, options: { nullable: true } })
  async activeBet(
    @CurrentUser() authUser: AuthUser,
    @Args('gameCode', { nullable: true, type: () => GameCodes }) gameCode?: GameCodes,
  ): Promise<ActiveBetResponseDTO> {
    return this.userBetService.findActiveBet(authUser, gameCode);
  }

  @SimpleField({ typeRef: BetInfoResponseDTO, options: { nullable: true } })
  async betInfo(
    @CurrentUser() authUser: AuthUser,
    @Args('betId', { type: () => String }) betId: string,
  ): Promise<BetInfoResponseDTO> {
    return this.userBetService.betInfo(betId, authUser);
  }

  @SimpleField({ typeRef: GetPlayerSeedsResponseDTO })
  async seeds(@CurrentUser() authUser: AuthUser): Promise<GetPlayerSeedsResponseDTO> {
    return this.userServiceInstance.getPlayerSeeds(authUser);
  }

  @SimpleField({ typeRef: VerifyFairnessResponseDTO, options: { nullable: true } })
  async verifyFairness(
    @CurrentUser() authUser: AuthUser,
    @Args('input') input: VerifyFairnessInput,
  ): Promise<VerifyFairnessResponseDTO> {
    return this.playersService.verifyFairness(input, authUser);
  }

  @SimpleField({ typeRef: [LastRoundBetsDTO], options: { nullable: true } })
  async lastRoundBets(
    @CurrentUser() authUser: AuthUser,
    @Args('gameMode', { type: () => String }) gameMode: GameMode,
  ): Promise<LastRoundBetsDTO[]> {
    return this.userBetService.lastRoundBets(authUser, gameMode);
  }
}
