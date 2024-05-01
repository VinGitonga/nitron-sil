import AlbumCardItem from "@/components/app-albums/AlbumCardItem";
import NewAlbumModal from "@/components/modals/NewAlbumModal";
import useAlbumUtils from "@/hooks/useAlbumUtils";
import { IAlbum } from "@/types/Album";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

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
			<Helmet>
				<title>
					Albums - Nitron
				</title>
			</Helmet>
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



export default NewAlbums;
