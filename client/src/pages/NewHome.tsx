import Image from "@/components/images/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, SquareLibraryIcon } from "lucide-react";
import { Suspense } from "react";

const NewHome = () => {
	return (
		<div>
			<div className="">
				<h1 className="font-bold text-xl">Home</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mt-6 place-items-center md:place-items-start">
				{[...Array(10)].map((_, i) => (
					<UserCardItem key={i} />
				))}
			</div>
		</div>
	);
};

const UserCardItem = () => {
	return (
		<div className="max-w-xs border border-solid border-gray-200 rounded-2xl transition-all duration-500 ">
			<div className="block overflow-hidden">
				<Suspense fallback={<Loader2 className="w-10 h-10 animate-spin" />}>
					<Image srcList={["https://pagedone.io/asset/uploads/1695365240.png"]} alt="Card image" />
				</Suspense>
			</div>
			<div className="-mt-10 ml-5">
				<Avatar className="w-20 h-20 rounded-full">
					<AvatarImage src={"https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)"} />
					<AvatarFallback className="text-black">{"JD"}</AvatarFallback>
				</Avatar>
			</div>
			<div className="p-4 space-y-3">
				<h4 className="text-base font-semibold text-gray-900 capitalize transition-all duration-500 ">Christian Buehner</h4>
				<p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5">christina@gmail.com</p>
				<div className="flex items-center space-x-2">
					<SquareLibraryIcon />
					<p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5">10 Albums</p>
				</div>
				<button className="bg-indigo-600 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold">View Profile</button>
			</div>
		</div>
	);
};

export default NewHome;
