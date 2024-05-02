import Image from "@/components/images/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserUtils from "@/hooks/useUserUtils";
import { UserDocument } from "@/types/User";
import { getInitials } from "@/utils";
import { Loader2, SquareLibraryIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

type UserCardItemProps = {
	user: UserDocument;
	idx?: number;
};

const NewHome = () => {
	const [users, setUsers] = useState<UserDocument[]>([]);

	const { getAllUsers } = useUserUtils();

	useEffect(() => {
		async function fetchUsers() {
			getAllUsers()
				.then((resp) => {
					if (resp?.status === "success") setUsers(resp.data!);
				})
				.catch((err) => {
					console.error(err);
				});
		}

		fetchUsers();
	}, []);

	return (
		<div>
			<Helmet>
				<title>Home - Nitron</title>
			</Helmet>
			<div className="">
				<h1 className="font-bold text-xl">Home</h1>
				<p>List of all users and their albums. This page is just a demo to show how the API works. The data is fetched from the backend and displayed here.</p>
			</div>
			{users?.length && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mt-6 place-items-center md:place-items-start" data-cy="homepage-user-items">
					{users.map((user, idx) => (
						<UserCardItem key={user._id} user={user} idx={idx} />
					))}
				</div>
			)}

			{users?.length === 0 && (
				<div className="flex items-center justify-center h-96">
					<Loader2 className="w-10 h-10 animate-spin" />
				</div>
			)}
		</div>
	);
};

const UserCardItem = ({ user, idx }: UserCardItemProps) => {
	const navigate = useNavigate();
	return (
		<div className="max-w-xs border border-solid border-gray-200 rounded-2xl transition-all duration-500" data-cy="homepage-user-item">
			<div className="block overflow-hidden">
				<Suspense
					fallback={
						<div className="flex items-center justify-center">
							<Loader2 className="w-10 h-10 animate-spin" />
						</div>
					}>
					<Image srcList={[`https://source.unsplash.com/random?random&${idx}`, "https://pagedone.io/asset/uploads/1695365240.png"]} alt="Card image" className="rounded-t-2xl" />
				</Suspense>
			</div>
			<div className="-mt-10 ml-5">
				<Avatar className="w-20 h-20 rounded-full border">
					<AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user?.username}`} />
					<AvatarFallback className="text-black">{getInitials(user?.name ?? "John Doe")}</AvatarFallback>
				</Avatar>
			</div>
			<div className="p-4 space-y-3">
				<h4 className="text-base font-semibold text-gray-900 capitalize transition-all duration-500 ">{user.name}</h4>
				<p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5">{user.email}</p>
				<div className="flex items-center space-x-2 mb-5">
					<SquareLibraryIcon />
					<p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5">{user.albumCount} Albums</p>
				</div>
				<button className="bg-indigo-600 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold" onClick={() => navigate(`/home/user/${user._id}`)}>
					View Profile
				</button>
			</div>
		</div>
	);
};

export default NewHome;
