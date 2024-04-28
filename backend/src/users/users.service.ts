import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async createUser(userInfo: CreateUserDto) {
		const userExists = await this.userModel.exists({ email: userInfo.email });

		if (userExists) {
			throw new Error("User already exists");
		}

		return this.userModel.create(userInfo);
	}

	async getUserByEmail(email: string) {
		return this.userModel.findOne({ email });
	}

	async getUserById(id: string) {
		return this.userModel.findById(id);
	}

	async getAllUsers() {
		// Return all users and also the count of albums and photos for each user
		return this.userModel.aggregate([
			{
				$lookup: {
					from: "albums",
					localField: "_id",
					foreignField: "user",
					as: "albums",
				},
			},

			{
				$project: {
					_id: 1,
					email: 1,
					name: 1,
					username: 1,
					albumCount: { $size: "$albums" },
					createdAt: 1,
					updatedAt: 1,
				},
			},
		]);
	}
}
