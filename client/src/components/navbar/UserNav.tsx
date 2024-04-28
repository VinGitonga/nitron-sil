import { useAuthStore } from "@/hooks/useAuthStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils";
import { SettingsIcon, UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";

export default function UserNav() {
	const { user, clearData } = useAuthStore();
	const navigate = useNavigate();

	const doLogout = () => {
		signOut(firebaseAuth).then(() => {
			clearData();
			navigate("/");
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"outline"} className="relative space-x-2">
					<Avatar className="w-8 h-8 rounded-full">
						<AvatarImage src={user?.photoURL ?? "https://avatars.githubusercontent.com/u/139895814?s=280&v=4"} />
						<AvatarFallback className="text-black">{getInitials(user?.displayName ?? "John Doe")}</AvatarFallback>
					</Avatar>
					<p>{user?.displayName}</p>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className=" font-inconsolata" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-2">
						<p className="text-base font-medium leading-none">{user?.displayName}</p>
						<p className="text-sm leading-none text-muted-foreground">{user?.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link to={"/home"}>
							<div className="flex items-center space-x-2">
								<UserIcon className="w-4 h-4" />
								<p className="">My Profile</p>
							</div>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link to={"/home"}>
							<div className="flex items-center space-x-2">
								<SettingsIcon className="w-4 h-4" />
								<p className="">Settings</p>
							</div>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer focus:bg-destructive/20 focus:text-destructive" onClick={doLogout}>
						<div className="flex items-center space-x-2">
							<BiLogOutCircle className="w-4 h-4" />
							<p>Logout</p>
						</div>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
