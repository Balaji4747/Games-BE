import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ErrorResponse')
export class ErrorResponseDTO {
  @Field()
  isError?: boolean;

  @Field()
  message: string;
}
