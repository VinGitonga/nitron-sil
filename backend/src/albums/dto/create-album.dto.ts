import { IsString } from "class-validator";

export class CreateAlbumDto {
	@IsString()
	title: string;

	@IsString()
	user: string;
}
