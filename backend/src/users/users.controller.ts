import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";
import { ApiResponseType } from "src/types/ApiResponse";
import { UserDocument } from "./schemas/user.schema";

@Controller("api/users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post("create")
	async createUser(@Body() body: CreateUserDto, @Res() res: Response<ApiResponseType<UserDocument>>) {
		try {
			const user = await this.usersService.createUser(body);

			res.status(HttpStatus.CREATED).json({
				status: "success",
				msg: "User created successfully",
				data: user.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while creating the user",
			});
		}
	}

	@Get("get/by-email")
	async getUserByEmail(@Query("email") email: string, @Res() res: Response<ApiResponseType<UserDocument>>) {
		try {
			const user = await this.usersService.getUserByEmail(email);

			if (!user) {
				throw new Error("User not found");
			}

			res.status(HttpStatus.OK).json({
				status: "success",
				msg: "User found",
				data: user.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the user",
			});
		}
	}

	@Get("get/by-id")
	async getUserById(@Query("id") id: string, @Res() res: Response<ApiResponseType<UserDocument>>) {
		try {
			const user = await this.usersService.getUserById(id);

			if (!user) {
				throw new Error("User not found");
			}

			res.status(HttpStatus.OK).json({
				status: "success",
				msg: "User found",
				data: user.toJSON(),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the user",
			});
		}
	}

	@Get("get/all")
	async getAllUsers(@Res() res: Response<ApiResponseType<UserDocument[]>>) {
		try {
			const users = await this.usersService.getAllUsers();

			res.status(HttpStatus.OK).json({
				status: "success",
				msg: "Users found",
				data: users.map((user) => user.toJSON()),
			});
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: err.message ?? "An error occurred while fetching the users",
			});
		}
	}
}
