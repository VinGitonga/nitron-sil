import { Button } from "@/components/ui/button";
import { FC } from "react";
import { FiEdit3 } from "react-icons/fi";

type ImageItem = {
	imageUrl: string;
	albumName: string;
	photoName: string;
};

type ImageCardItemProps = {
	image: ImageItem;
};

const images: ImageItem[] = [
	{
		imageUrl: "https://pagedone.io/asset/uploads/1688031162.jpg",
		albumName: "Vintage Cars",
		photoName: "Mercedes Benz",
	},
	{
		imageUrl: "https://pagedone.io/asset/uploads/1688031232.jpg",
		albumName: "Vintage Cars",
		photoName: "BMW",
	},
	{
		imageUrl: "https://pagedone.io/asset/uploads/1688031357.jpg",
		albumName: "Vintage Cars",
		photoName: "Audi",
	},
	{
		imageUrl: "https://pagedone.io/asset/uploads/1688031375.jpg",
		albumName: "Vintage Cars",
		photoName: "Porsche",
	},
	{
		imageUrl: "https://pagedone.io/asset/uploads/1688031396.jpg",
		albumName: "Vintage Cars",
		photoName: "Ferrari",
	},
	{
		imageUrl: "https://pagedone.io/asset/uploads/1688031414.png",
		albumName: "Vintage Cars",
		photoName: "Lamborghini",
	},
];

const Photos = () => {
	return (
		<div>
			<div className="columns-1 md:columns-2 xl:columns-3 gap-7 ">
                {images.map((image, index) => (
                    <ImageCardItem key={index} image={image} />
                ))}
				<div className="break-inside-avoid mb-8">
					<div className="relative group">
						<img className="h-auto max-w-full rounded-lg" src="https://pagedone.io/asset/uploads/1688031162.jpg" alt="Gallery image" />
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 rounded-lg">
							<div className="flex flex-col justify-between h-full p-2">
								<div className="">
									<p className="text-white">Album Name</p>
								</div>
								<div className="flex items-center justify-between">
									<p className="text-white">Photo Name</p>
									<Button size={"icon"} variant={"ghost"} className="rounded-full hover:bg-gray-500">
										<FiEdit3 className="text-gray-200" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	);
};

const ImageCardItem: FC<ImageCardItemProps> = ({ image }) => {
	return (
		<div className="break-inside-avoid mb-8">
			<div className="relative group">
				<img className="h-auto max-w-full rounded-lg" src={image.imageUrl} alt="Gallery image" />
				<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 rounded-lg">
					<div className="flex flex-col justify-between h-full p-2">
						<div className="">
							<p className="text-white">{image.albumName}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-white">{image.photoName}</p>
							<Button size={"icon"} variant={"ghost"} className="rounded-full hover:bg-gray-500">
								<FiEdit3 className="text-gray-200" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Photos;
