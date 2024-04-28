import { IPhoto } from "@/types/Photo";
import { FC, Suspense } from "react";
import Image from "@/components/images/Image";
import { Loader2 } from "lucide-react";
import EditPhotoTitleModal from "../modals/EditPhotoTitleModal";

interface PhotoCardItemProps {
	image: IPhoto;
	refresh?: () => void;
}

const PhotoCardItem: FC<PhotoCardItemProps> = ({ image, refresh }) => {
	return (
		<div className="break-inside-avoid mb-8">
			<div className="relative group">
				<Suspense
					fallback={
						<div className="flex items-center justify-center">
							<Loader2 className="w-10 h-10 animate-spin" />
						</div>
					}>
					<Image srcList={[image.imageUrl, "https://pagedone.io/asset/uploads/1688031414.png"]} alt="Gallery image" className="h-auto max-w-full rounded-lg" />
				</Suspense>
				<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 rounded-lg">
					<div className="flex flex-col justify-between h-full p-2">
						<div className="">
							<p className="text-white">{image?.album?.title}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-white">{image?.title}</p>
							<EditPhotoTitleModal photoId={image._id} currentTitle={image?.title} refresh={refresh} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoCardItem;
