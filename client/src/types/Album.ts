import { UserDocument } from "./User";

export interface IAlbum {
	_id: string;
	title: string;
	user: UserDocument;
	photoCount: number;
    createdAt: string;
    updatedAt: string;
}
