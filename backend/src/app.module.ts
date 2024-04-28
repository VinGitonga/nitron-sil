import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGODB_URI } from "./env";
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';

@Module({
	imports: [MongooseModule.forRoot(MONGODB_URI), UsersModule, AlbumsModule, PhotosModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
