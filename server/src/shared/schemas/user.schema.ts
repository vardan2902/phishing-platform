import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    index: true,
    unique: true,
    sparse: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;
}

export type UserDoc = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = { name: User.name, schema: UserSchema }
