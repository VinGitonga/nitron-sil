import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	username: string;

	@Prop({ required: true, unique: true })
	email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
