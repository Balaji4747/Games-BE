import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('BulkUpdateUserBetResponse')
export class BulkUpdateUserBetResponseDTO {
  @Field()
  ok: boolean;
}
