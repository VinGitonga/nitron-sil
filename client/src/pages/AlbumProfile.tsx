import useAlbumUtils from "@/hooks/useAlbumUtils";
import { IAlbum } from "@/types/Album";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Image from "@/components/images/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UploadImageModal from "@/components/modals/UploadImageModal";

const AlbumProfile = () => {
	const [albumInfo, setAlbumInfo] = useState<IAlbum | null>(null);

	const { id } = useParams() as { id: string };

	const { getAlbumById } = useAlbumUtils();

	const fetchAlbum = async () => {
		getAlbumById(id)
			.then((resp) => {
				if (resp?.status === "success") setAlbumInfo(resp.data!);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// generate random number between 1 and 10

	const idx = Math.floor(Math.random() * 10) + 1;

	useEffect(() => {
		fetchAlbum();
	}, [id]);

	return (
		<div className="w-full border border-solid border-gray-200 rounded-2xl transition-all duration-500">
			{albumInfo ? (
				<>
					<div className="block overflow-hidden">
						<Suspense
							fallback={
								<div className="flex items-center justify-center h-40">
									<Loader2 className="w-10 h-10 animate-spin" />
								</div>
							}>
							<Image srcList={[`https://source.unsplash.com/random?color&${idx}`, "https://pagedone.io/asset/uploads/1695365240.png"]} alt="Card image" className="w-full rounded-t-2xl max-h-80" />
						</Suspense>
					</div>
					<div className="px-4 py-4">
						<h2 className="text-lg font-semibold hover:underline">{albumInfo.title}</h2>
						<div className="mt-5 flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Avatar className="w-16 h-16 rounded-full border">
									<AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${albumInfo?.user?.username}`} />
									<AvatarFallback className="text-black">{"JD"}</AvatarFallback>
								</Avatar>
								<Link to={`/home/user/${albumInfo?.user?._id}`}>
									<p className="text-base font-bold transition-all duration-500 leading-5 hover:underline">@{albumInfo?.user?.username}</p>
								</Link>
								<p className="font-normal text-sm text-gray-500">
									{new Date(albumInfo.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<Badge>{albumInfo.photoCount} photos</Badge>
								<UploadImageModal />
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center h-96">
					<div className="flex items-center space-x-3">
						<Loader2 className="w-10 h-10 animate-spin" />
						<p>Loading album...</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default AlbumProfile;
