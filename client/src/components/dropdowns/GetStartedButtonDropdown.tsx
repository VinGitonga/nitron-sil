import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useUpdateUserModalStore } from "@/hooks/useUpdateUserModalStore";
import useUserUtils from "@/hooks/useUserUtils";
import { firebaseAuth } from "@/lib/firebase";
import { IUser } from "@/types/User";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function GetStartedButtonDropdown() {
	const { setUser } = useAuthStore();
	const { setOpen, setUserInfo } = useUpdateUserModalStore();

	const { getUserByEmail } = useUserUtils();

	const checkUserExists = async (email: string) => {
		try {
			const resp = await getUserByEmail(email);

			if (resp?.status === "success") {
				return resp?.data;
			}

			return null;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

	const navigate = useNavigate();

	const onClickSignIn = async () => {
		const userCred = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
		const userExists = await checkUserExists(userCred.user.email!);

		if (!userExists) {
			// Show update username modal
			setUserInfo(userCred.user);
			setOpen(true);
			return;
		}

		// Set user in global state
		const userData = { ...userExists, photoURL: userCred.user?.photoURL } as unknown as IUser;

		setUser(userData);

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
