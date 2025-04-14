import { Args, Mutation, Query } from '@nestjs/graphql';
import { SimpleField } from '@provfair/shared/decorators/fields.decorator';
import { NamespacedResolver } from '@provfair/shared/decorators/namespaced-resolver.decorator';
import { UpdateGameConfigInput } from './inputs/updateGameConfig.input';
import { ManagementService } from './management.service';
import { GameConfig } from './schemas/gameConfig.schema';

@NamespacedResolver(Mutation, 'management')
export class ManagementMutationResolver {
  constructor(private readonly managementService: ManagementService) {}

  @SimpleField({ typeRef: GameConfig, internalOnly: true })
  async updateGameConfig(@Args('input') input: UpdateGameConfigInput): Promise<GameConfig> {
    return this.managementService.updateGameConfig(input);
  }
}

@NamespacedResolver(Query, 'management')
export class ManagementQueriesResolver {
  constructor(private readonly managementService: ManagementService) {}

  @SimpleField({ typeRef: [GameConfig], internalOnly: true })
  async getAllConfig(): Promise<GameConfig[]> {
    return this.managementService.getAllConfig();
  }
}
