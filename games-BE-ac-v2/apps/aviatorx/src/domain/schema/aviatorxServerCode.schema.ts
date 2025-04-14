import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';

export type AviatorxServerCodeDocument = HydratedDocument<AviatorxServerCodes>;

@Schema({ timestamps: true, autoIndex: false, collection: 'aviatorx_servercodes' })
export class AviatorxServerCodes {
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  serverSeed: string;

  @Prop({ required: true })
  hashedServerSeed: string;

  @Prop({ required: true, default: false })
  isUsed: boolean;

  @Prop({ required: true })
  order: number;

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;
}

export const AviatorxServerCodesSchema = SchemaFactory.createForClass(AviatorxServerCodes);

export type AviatorxServerCodesModel = Model<AviatorxServerCodes>;
