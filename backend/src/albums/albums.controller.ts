import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Put, Query, Res } from "@nestjs/common";
import { AlbumsService } from "./albums.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Response } from "express";
import { ApiResponseType } from "src/types/ApiResponse";
import { AlbumDocument } from "./schemas/album.schema";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Controller("api/albums")
export class AlbumsController {
	constructor(private readonly albumsService: AlbumsService) {}

	@Post("create")
	async createAlbum(@Body() body: CreateAlbumDto, @Res() res: Response<ApiResponseType<AlbumDocument>>) {
		try {
			const album = await this.albumsService.createNewAlbum(body);

			res.status(HttpStatus.CREATED).json({
				status: "success",
				msg: "Album created successfully",
				data: album.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while creating the album",
			});
		}
	}

	@Get("get/all")
	async getAlbums(@Res() res: Response<ApiResponseType<AlbumDocument[]>>) {
		try {
			const albums = await this.albumsService.getAlbums();

			res.status(HttpStatus.OK).json({
				status: "success",
				msg: "Albums found",
				data: albums,
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the albums",
			});
		}
	}

	@Get("get/by-id")
	async getAlbumById(@Query("id") id: string, @Res() res: Response<ApiResponseType<AlbumDocument>>) {
		try {
			const album = await this.albumsService.getAlbumById(id);

			if (!album) {
				throw new Error("Album not found");
			}

			res.status(HttpStatus.OK).json({
				status: "success",
				msg: "Album found",
				data: album?.[0]?.toJSON() ?? {},
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the album",
			});
		}
	}

	@Get("get/by-user-id")
	async getAlbumsByUserId(@Query("userId") userId: string, @Res() res: Response<ApiResponseType<AlbumDocument[]>>) {
		try {
			const albums = await this.albumsService.getAlbumsByUserId(userId);

			res.status(HttpStatus.OK).json({
				status: "success",
				msg: "Albums found",
				data: albums,
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the albums",
			});
		}
	}

	@Put("update/title")
	async updateAlbumTitle(@Body() body: UpdateAlbumDto, @Res() res: Response<ApiResponseType<AlbumDocument>>) {
		try {
			const { albumId: id, title } = body;
			const album = await this.albumsService.updateAlbumTitle(id, title);

			if (!album) {
				throw new Error("Album not found");
			}

			res.status(HttpStatus.OK).json({
				status: "success",
				msg: "Album title updated",
				data: album.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while updating the album title",
			});
		}
	}
}
