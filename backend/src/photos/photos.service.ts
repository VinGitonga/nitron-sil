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
		return this.photoModel.aggregate([
			{
				$lookup: {
					from: "albums",
					localField: "album",
					foreignField: "_id",
					as: "album",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "album.user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$addFields: {
					album: { $arrayElemAt: ["$album", 0] },
					user: { $arrayElemAt: ["$user", 0] },
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
			{
				$project: {
					_id: 1,
					title: 1,
					imageUrl: 1,
					album: {
						_id: 1,
						title: 1,
						user: 1,
					},
					user: {
						_id: 1,
						email: 1,
						username: 1,
					},
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);
	}

	async getPhotoById(id: string) {
		return this.photoModel.findById(id);
	}

	async getPhotosByAlbumId(albumId: string) {
		return this.photoModel.aggregate([
			{
				$match: {
					album: albumId,
				},
			},
			{
				$lookup: {
					from: "albums",
					localField: "album",
					foreignField: "_id",
					as: "album",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "album.user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$addFields: {
					album: { $arrayElemAt: ["$album", 0] },
					user: { $arrayElemAt: ["$user", 0] },
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
			{
				$project: {
					_id: 1,
					title: 1,
					imageUrl: 1,
					album: {
						_id: 1,
						title: 1,
						user: 1,
					},
					user: {
						_id: 1,
						email: 1,
						username: 1,
					},
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);
	}

	async updatePhotoTitle(id: string, title: string) {
		return this.photoModel.findByIdAndUpdate(id, { title }, { new: true });
	}
}
