import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schemas/user.schema";

@Schema({ timestamps: true })
export class Album {
	@Prop({ required: true })
	title: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	user: User;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
export type AlbumDocument = HydratedDocument<Album>;
