import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';

export type CrashHashCodeDocument = HydratedDocument<CrashHashCode>;

@Schema({ timestamps: true, autoIndex: false, collection: 'crash_hashcodes' })
export class CrashHashCode {
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

export const CrashHashCodeSchema = SchemaFactory.createForClass(CrashHashCode);

export type CrashHashCodeModel = Model<CrashHashCode>;
