import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album } from "./schemas/album.schema";
import { Model } from "mongoose";
import { CreateAlbumDto } from "./dto/create-album.dto";

@Injectable()
export class AlbumsService {
	constructor(@InjectModel(Album.name) private readonly albumModel: Model<Album>) {}

	async createNewAlbum(albumInfo: CreateAlbumDto) {
		return this.albumModel.create(albumInfo);
	}

	async getAlbums() {
		return this.albumModel.find();
	}

	async getAlbumById(id: string) {
		return this.albumModel.findById(id);
	}

	async getAlbumsByUserId(userId: string) {
		return this.albumModel.find({ user: userId });
	}

	async updateAlbumTitle(id: string, title: string) {
		return this.albumModel.findByIdAndUpdate(id, { title }, { new: true });
	}
}
