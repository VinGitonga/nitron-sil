import { HomeIcon, ImagesIcon, LogOutIcon, SearchIcon, SquareLibraryIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FC, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import AppLogo from "../app-logo/AppLogo";
import { useAuthStore } from "@/hooks/useAuthStore";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { getInitials } from "@/utils";

type SidebarItemProps = {
	icon: React.ReactNode;
	text: string;
	href: string;
};

const AppSidebar = () => {
	const { user, clearData } = useAuthStore();
	const navigate = useNavigate();

	const doLogout = () => {
		signOut(firebaseAuth).then(() => {
			clearData();
			navigate("/");
		});
	};

	return (
		<aside className="h-screen">
			<nav className="h-full flex flex-col bg-white w-[calc(15rem)] md:border-r overflow-y-scroll">
				<div className="md:px-4 py-8 md:py-5 h-full">
					<div className="flex flex-col h-full justify-between flex-1">
						<div className="">
							<AppLogo />
							<div className="mt-6">
								<div className="relative  text-gray-500 focus-within:text-gray-900 ">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
										<SearchIcon size={20} />
									</div>
									<input
										type="text"
										id="default-search"
										className="block w-full max-w-xs pr-4 pl-12 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
										placeholder="Search ... "
									/>
								</div>
							</div>
							<div className="mt-4">
								<ul className="space-y-4">
									<SidebarItem icon={<HomeIcon />} text="Home" href="home" />
									<SidebarItem icon={<SquareLibraryIcon />} text="Albums" href="home/albums" />
									<SidebarItem icon={<ImagesIcon />} text="Photos" href="home/photos" />
								</ul>
							</div>
						</div>
						<div className="">
							<div className="flex items-center justify-between border px-1 py-2 rounded-2xl">
								<div className="flex items-center space-x-1">
									<Avatar className="w-10 h-10 rounded-full">
										<AvatarImage src={user?.photoURL ?? "https://api.dicebear.com/8.x/adventurer/svg?seed=Fluffy"} />
										<AvatarFallback className="text-black">{getInitials(user?.name ?? "John Doe")}</AvatarFallback>
									</Avatar>
									<p className="truncate capitalize">{user?.username}</p>
								</div>
								<Button size={"icon"} variant={"ghost"} className="rounded-full" onClick={doLogout}>
									<LogOutIcon />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</aside>
	);
};

const SidebarItem: FC<SidebarItemProps> = ({ icon, text, href }) => {
	const location = useLocation();

	/**
	 * Check if the current route path is selected on the sidebar
	 */
	const selected = useMemo(() => {
		if (href && location.pathname !== "/") {
			return location.pathname === `/${href}`;
		}

		return false;
	}, [href, location.pathname]);

	return (
		<li>
			<Link to={`/${href}`}>
				<div className={cn("flex items-center space-x-3 bg-gray-100 p-2 rounded-xl cursor-pointer hover:bg-[#ff9900]/40 transition-colors", selected && "bg-[#ff9900]")}>
					{icon}
					<p className="text-lg font-medium">{text}</p>
				</div>
			</Link>
		</li>
	);
};

export default AppSidebar;
