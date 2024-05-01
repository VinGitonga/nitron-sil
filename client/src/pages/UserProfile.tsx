import AlbumCardItem from "@/components/app-albums/AlbumCardItem";
import AppInput from "@/components/app-forms/AppInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useAlbumUtils from "@/hooks/useAlbumUtils";
import useUserUtils from "@/hooks/useUserUtils";
import { IAlbum } from "@/types/Album";
import { UserDocument } from "@/types/User";
import { getInitials } from "@/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const [userItem, setUserItem] = useState<UserDocument | null>(null);
	const [albums, setAlbums] = useState<IAlbum[]>([]);

	const { getUserById } = useUserUtils();
	const { getAlbumsByUserId } = useAlbumUtils();

	const { id } = useParams() as { id: string };

	async function fetchAlbums() {
		getAlbumsByUserId(id)
			.then((resp) => {
				if (resp?.status === "success") setAlbums(resp.data!);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	useEffect(() => {
		async function fetchUser() {
			try {
				const resp = await getUserById(id);

				if (resp?.status === "success") {
					setUserItem(resp.data!);
				}
			} catch (err) {
				console.error(err);
			}
		}

		fetchUser();
		fetchAlbums();
	}, [id]);

	return (
		<div>
			<div className="relative mt-8">
				<div className="rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full h-56"></div>
				<div className="absolute -bottom-10 left-5 ">
					<Avatar className="w-20 h-20 rounded-full border">
						<AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${userItem?.username}`} />
						<AvatarFallback className="text-black">{getInitials(userItem?.name ?? "John Doe")}</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<div className="mt-12">
				<Card>
					<CardHeader>
						<CardTitle>User Profile</CardTitle>
						<CardDescription>Profile details for {userItem?.name}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<AppInput name="name" label="Name" value={userItem?.name} />
							<AppInput name="username" label="Username" value={userItem?.username} />
							<AppInput name="email" label="Email" value={userItem?.email} />
							<AppInput name="createdAt" label="Joined On" value={new Date(userItem?.createdAt ?? "").toLocaleString()} disabled />
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="mt-2">
				<Card>
					<CardHeader>
						<CardTitle>
							Albums
							<span className="text-sm text-gray-500"> ({albums.length})</span>
						</CardTitle>
					</CardHeader>
				</Card>
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
		</div>
	);
};

export default UserProfile;
