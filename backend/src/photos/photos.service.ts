import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Photo } from "./schemas/photo.schema";
import { Model } from "mongoose";
import { CreatePhotoDto } from "./dto/create-photo.dto";

@Injectable()
export class PhotosService {
	constructor(@InjectModel(Photo.name) private readonly photoModel: Model<Photo>) {}

	async createNewPhoto(photoInfo: CreatePhotoDto) {
		return this.photoModel.create(photoInfo);
	}

	async getPhotos() {
		return this.photoModel.find();
	}

	async getPhotoById(id: string) {
		return this.photoModel.findById(id);
	}

	async getPhotosByAlbumId(albumId: string) {
		return this.photoModel.find({ album: albumId });
	}

	async updatePhotoTitle(id: string, title: string) {
		return this.photoModel.findByIdAndUpdate(id, { title }, { new: true });
	}
}
