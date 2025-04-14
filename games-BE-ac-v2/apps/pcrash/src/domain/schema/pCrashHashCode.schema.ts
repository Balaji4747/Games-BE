import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false, collection: 'pcrash_hashcodes' })
export class PCrashHashCode {
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

export const PCrashHashCodeSchema = SchemaFactory.createForClass(PCrashHashCode);

export type PCrashHashCodeModel = Model<PCrashHashCode>;
