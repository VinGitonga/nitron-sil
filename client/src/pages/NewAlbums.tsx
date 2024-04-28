import Image from "@/components/images/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const NewAlbums = () => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<div className="">
					<h1 className="font-bold text-xl">Albums</h1>
					<div className="w-full md:w-[75%]">
						<p>List of all albums. This page is just a demo to show how the API works. The data is fetched from the backend and displayed here.</p>
					</div>
				</div>
				<Button className="rounded-full">Add Album</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-x-5 gap-y-8">
				{[...Array(10)].map((_, i) => (
					<AlbumCardItem key={i} />
				))}
			</div>
		</div>
	);
};

const AlbumCardItem = () => {
	return (
		<div className="max-w-lg border border-solid border-gray-200 rounded-2xl transition-all duration-500 ">
			<div className="block overflow-hidden">
				<Suspense
					fallback={
						<div className="flex items-center justify-center h-40">
							<Loader2 className="w-10 h-10 animate-spin" />
						</div>
					}>
					<Image srcList={["https://pagedone.io/asset/uploads/1695365240.png"]} alt="Card image" className="w-full" />
				</Suspense>
			</div>
			<div className="px-4 py-4">
				<h2 className="text-lg font-semibold">I Built A Successful Blog In One Year</h2>
				<div className="mt-5 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Avatar className="w-16 h-16 rounded-full">
							<AvatarImage src={"https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)"} />
							<AvatarFallback className="text-black">{"JD"}</AvatarFallback>
						</Avatar>
						<p className="text-base font-bold transition-all duration-500 leading-5">John Doe</p>
						<p className="font-normal text-sm text-gray-500">21 May 2021</p>
					</div>
					<Badge>10 Photos</Badge>
				</div>
			</div>
		</div>
	);
};

export default NewAlbums;
