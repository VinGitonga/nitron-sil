import { IsString } from "class-validator";

export class CreatePhotoDto {
	@IsString()
	title: string;

	@IsString()
	imageUrl: string;

	@IsString()
	album: string;
}
