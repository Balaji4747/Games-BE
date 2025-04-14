import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false, collection: 'user_tokens' })
export class UserToken {
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  rgsSessionId: string;

  @Prop()
  beToken: string;

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);

export type UserTokenModel = Model<UserToken>;
