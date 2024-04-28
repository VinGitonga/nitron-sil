import Image from "@/components/images/Image";
import NewAlbumModal from "@/components/modals/NewAlbumModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useAlbumUtils from "@/hooks/useAlbumUtils";
import { IAlbum } from "@/types/Album";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface AlbumCardItemProps {
	album: IAlbum;
	idx?: number;
}

const NewAlbums = () => {
	const [albums, setAlbums] = useState<IAlbum[]>([]);

	const { getAlbums } = useAlbumUtils();

	async function fetchAlbums() {
		getAlbums()
			.then((resp) => {
				if (resp?.status === "success") setAlbums(resp.data!);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	useEffect(() => {
		fetchAlbums();
	}, []);

	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="">
					<h1 className="font-bold text-xl">Albums</h1>
					<div className="w-full md:w-[75%]">
						<p>List of all albums. This page is just a demo to show how the API works. The data is fetched from the backend and displayed here.</p>
					</div>
				</div>
				<NewAlbumModal refresh={fetchAlbums} />
			</div>
			{albums?.length === 0 && (
				<div className="flex items-center justify-center h-96">
					<Loader2 className="w-10 h-10 animate-spin" />
				</div>
			)}
			{albums?.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8 mt-6">
					{albums.map((album, idx) => (
						<AlbumCardItem key={album._id} album={album} idx={idx} />
					))}
				</div>
			)}
		</div>
	);
};

const AlbumCardItem = ({ album, idx }: AlbumCardItemProps) => {
	return (
		<div className="max-w-lg border border-solid border-gray-200 rounded-2xl transition-all duration-500 ">
			<div className="block overflow-hidden">
				<Suspense
					fallback={
						<div className="flex items-center justify-center h-40">
							<Loader2 className="w-10 h-10 animate-spin" />
						</div>
					}>
					<Link to={`/home/album/${album._id}`}>
						<Image srcList={[`https://source.unsplash.com/random?random&${idx}`, "https://pagedone.io/asset/uploads/1695365240.png"]} alt="Card image" className="w-full rounded-t-2xl max-h-80" />
					</Link>
				</Suspense>
			</div>
			<div className="px-4 py-4">
				<Link to={`/home/album/${album._id}`}>
					<h2 className="text-lg font-semibold hover:underline">{album.title}</h2>
				</Link>
				<div className="mt-5 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Avatar className="w-16 h-16 rounded-full border">
							<AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${album?.user?.username}`} />
							<AvatarFallback className="text-black">{"JD"}</AvatarFallback>
						</Avatar>
						<Link to={`/home/user/${album.user._id}`}>
							<p className="text-base font-bold transition-all duration-500 leading-5 hover:underline">@{album.user.username}</p>
						</Link>
						<p className="font-normal text-sm text-gray-500">
							{new Date(album.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</p>
					</div>
					<Badge>{album.photoCount} photos</Badge>
				</div>
			</div>
		</div>
	);
};

export default NewAlbums;
