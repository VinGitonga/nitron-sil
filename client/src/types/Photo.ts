import { IAlbum } from "./Album";

export interface IPhoto {
	_id: string;
	title: string;
	imageUrl: string;
	album: IAlbum;
	createdAt: string;
	updatedAt: string;
}
