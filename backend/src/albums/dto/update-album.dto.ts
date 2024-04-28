import { IsString } from "class-validator";

export class UpdateAlbumDto {
	@IsString()
	albumId: string;

	@IsString()
	title: string;
}
