import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum PhishingStatuses {
  PENDING = "PENDING",
  CLICKED = "CLICKED",
}

@Schema({
  timestamps: true,
})
export class Phishing extends Document {
  @Prop()
  email: string;

  @Prop()
  content: string;

  @Prop({ default: PhishingStatuses.PENDING })
  status: string;
}

export type PhishingDoc = Phishing & Document;

export const PhishingSchema = SchemaFactory.createForClass(Phishing);

export const PhishingModel = { name: Phishing.name, schema: PhishingSchema };
