import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';

export type SlideHashCodeDocument = HydratedDocument<SlideHashCode>;

@Schema({ timestamps: true, autoIndex: false, collection: 'slide_hashcodes' })
export class SlideHashCode {
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

export const SlideHashCodeSchema = SchemaFactory.createForClass(SlideHashCode);

export type SlideHashCodeModel = Model<SlideHashCode>;
