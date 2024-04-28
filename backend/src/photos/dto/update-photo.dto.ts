import { IsString } from "class-validator";

export class UpdatePhotoDto {
	@IsString()
	title: string;

	@IsString()
	photoId: string;
}
