import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Album } from "src/albums/schemas/album.schema";

@Schema({ timestamps: true })
export class Photo {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	imageUrl: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Album" })
	album: Album;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
export type PhotoDocument = HydratedDocument<Photo>;
