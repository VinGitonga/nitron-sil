import PhotoCardItem from "@/components/app-photos/PhotoCardItem";
import usePhotoUtils from "@/hooks/usePhotoUtils";
import { IPhoto } from "@/types/Photo";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Photos = () => {
	const [photos, setPhotos] = useState<IPhoto[]>([]);

	const { getPhotos } = usePhotoUtils();

	const fetchPhotos = async () => {
		getPhotos()
			.then((resp) => {
				if (resp?.status === "success") setPhotos(resp.data!);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchPhotos();
	}, []);

	const hasImages = !photos.length || photos.length === 0;

	return (
		<div>
			<Helmet>
				<title>Photos - Nitron</title>
			</Helmet>
			{photos.length && photos.length > 0 && (
				<div className="columns-1 md:columns-2 xl:columns-3 gap-7">
					{photos.map((photo) => (
						<PhotoCardItem key={photo._id} image={photo} refresh={fetchPhotos} />
					))}
				</div>
			)}
			{hasImages && (
				<div className="flex items-center justify-center h-96">
					<p>No photos found in this album.</p>
				</div>
			)}
		</div>
	);
};

export default Photos;
