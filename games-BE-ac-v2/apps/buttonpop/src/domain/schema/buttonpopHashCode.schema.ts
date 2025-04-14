import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false, collection: 'buttonpop_hashcodes' })
export class ButtonPopHashCode {
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true, default: false })
  isUsed: boolean;

  @Prop({ required: true })
  order: number;

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;
}

export const ButtonPopHashCodeSchema = SchemaFactory.createForClass(ButtonPopHashCode);

export type ButtonPopHashCodeModel = Model<ButtonPopHashCode>;
