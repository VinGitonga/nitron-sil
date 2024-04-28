import { BadRequestException, Body, Controller, Get, Post, Put, Query, Res } from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { Response } from "express";
import { ApiResponseType } from "src/types/ApiResponse";
import { PhotoDocument } from "./schemas/photo.schema";
import { UpdatePhotoDto } from "./dto/update-photo.dto";

@Controller("api/photos")
export class PhotosController {
	constructor(private readonly photosService: PhotosService) {}

	@Post("create")
	async createPhoto(@Body() body: CreatePhotoDto, @Res() res: Response<ApiResponseType<PhotoDocument>>) {
		try {
			const photo = await this.photosService.createNewPhoto(body);

			res.status(201).json({
				status: "success",
				msg: "Photo created successfully",
				data: photo.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while creating the photo",
			});
		}
	}

	@Get("get/all")
	async getPhotos(@Res() res: Response<ApiResponseType<PhotoDocument[]>>) {
		try {
			const photos = await this.photosService.getPhotos();

			res.status(200).json({
				status: "success",
				msg: "Photos found",
				data: photos,
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the photos",
			});
		}
	}

	@Get("get/by-id")
	async getPhotoById(@Query("id") id: string, @Res() res: Response<ApiResponseType<PhotoDocument>>) {
		try {
			const photo = await this.photosService.getPhotoById(id);

			if (!photo) {
				throw new Error("Photo not found");
			}

			res.status(200).json({
				status: "success",
				msg: "Photo found",
				data: photo.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the photo",
			});
		}
	}

	@Get("get/by-album-id")
	async getPhotosByAlbumId(@Query("albumId") albumId: string, @Res() res: Response<ApiResponseType<PhotoDocument[]>>) {
		try {
			const photos = await this.photosService.getPhotosByAlbumId(albumId);

			res.status(200).json({
				status: "success",
				msg: "Photos found",
				data: photos,
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the photos",
			});
		}
	}

	@Put("update/title")
	async updatePhotoTitle(@Body() body: UpdatePhotoDto, @Res() res: Response<ApiResponseType<PhotoDocument>>) {
		try {
			const { photoId: id, title } = body;
			const photo = await this.photosService.updatePhotoTitle(id, title);

			res.status(200).json({
				status: "success",
				msg: "Photo updated successfully",
				data: photo.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while updating the photo",
			});
		}
	}
}
