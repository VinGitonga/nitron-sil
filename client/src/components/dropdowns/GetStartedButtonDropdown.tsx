import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/hooks/useAuthStore";
import { firebaseAuth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function GetStartedButtonDropdown() {
	const { setUser } = useAuthStore();
	const navigate = useNavigate();
	const onClickSignIn = async () => {
		const userCred = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
		setUser(userCred.user);
		navigate("/home");
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="rounded-full">Get Started</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-72 font-inconsolata">
				<DropdownMenuLabel>Get Started</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100" onClick={onClickSignIn}>
							<FcGoogle className="w-5 h-5" />
							Continue with Google
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
							<FaGithub className="w-5 h-5" />
							Continue with GitHub
						</button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default GetStartedButtonDropdown;
