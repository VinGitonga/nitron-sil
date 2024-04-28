import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album } from "./schemas/album.schema";
import mongoose, { Model } from "mongoose";
import { CreateAlbumDto } from "./dto/create-album.dto";

@Injectable()
export class AlbumsService {
	constructor(@InjectModel(Album.name) private readonly albumModel: Model<Album>) {}

	async createNewAlbum(albumInfo: CreateAlbumDto) {
		return this.albumModel.create(albumInfo);
	}

	async getAlbums() {
		// Return all albums and also the count of photos in each album
		return this.albumModel.aggregate([
			{
				$lookup: {
					from: "photos",
					localField: "_id",
					foreignField: "album",
					as: "photos",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$addFields: {
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
					user: 1,
					photoCount: { $size: "$photos" },
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);
	}

	async getAlbumById(id: string) {
		// Return the album and also the count of photos in the album
		return this.albumModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "photos",
					localField: "_id",
					foreignField: "album",
					as: "photos",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$addFields: {
					user: { $arrayElemAt: ["$user", 0] },
				},
			},
			{
				$project: {
					_id: 1,
					title: 1,
					user: 1,
					photoCount: { $size: "$photos" },
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);
	}

	async getAlbumsByUserId(userId: string) {
		// Return all albums and also the count of photos in each album
		return this.albumModel.aggregate([
			{
				$match: {
					user: userId,
				},
			},
			{
				$lookup: {
					from: "photos",
					localField: "_id",
					foreignField: "album",
					as: "photos",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$addFields: {
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
					user: 1,
					photoCount: { $size: "$photos" },
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);
	}

	async updateAlbumTitle(id: string, title: string) {
		return this.albumModel.findByIdAndUpdate(id, { title }, { new: true });
	}
}
