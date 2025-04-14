import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ _id: false })
export class SeedHistory {
  @Prop({ required: true })
  clientSeed: string;

  @Prop({ required: true })
  serverSeed: string;

  @Prop({ required: true })
  hashedServerSeed: string;

  @Prop({ required: true, default: 0 })
  nonce: number;
}

export const SeedHistorySchema = SchemaFactory.createForClass(SeedHistory);

@Schema({ timestamps: true, autoIndex: false })
export class Users {
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  operatorId: string;

  @Prop({ required: true })
  clientSeed: string;

  @Prop({ required: true })
  serverSeed: string;

  @Prop({ required: true })
  hashedServerSeed: string;

  @Prop({ required: true })
  nextServerSeed: string;

  @Prop({ required: true })
  hashedNextServerSeed: string;

  @Prop({ required: true, default: 0 })
  nonce: number;

  @Prop({ type: [SeedHistorySchema] })
  seedHistory?: SeedHistory[];

  @Prop()
  avatar?: string;

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

export type UsersModel = Model<Users>;
