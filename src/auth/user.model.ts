import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<UserModel>;
@Schema()
export class UserModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
