import { Module } from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { PhotosController } from "./photos.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Photo, PhotoSchema } from "./schemas/photo.schema";

@Module({
	imports: [MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }])],
	controllers: [PhotosController],
	providers: [PhotosService],
})
export class PhotosModule {}
