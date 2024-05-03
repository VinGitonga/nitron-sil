import AppLogo from "@/components/app-logo/AppLogo";
import GetStartedButtonDropdown from "@/components/dropdowns/GetStartedButtonDropdown";
import Image from "@/components/images/Image";
import UpdateUsernameModal from "@/components/modals/UpdateUsernameModal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Loader2 } from "lucide-react";
import { FC, Suspense } from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
	text: string;
};

const NewLandingPage = () => {
	return (
		<div className="px-6 md:px-28 py-6">
			<div className="border-b">
				<NavSection />
			</div>
			<HeroSection />
			<UpdateUsernameModal />
		</div>
	);
};

const NavSection = () => {
	const { user } = useAuthStore();
	return (
		<div className="py-2">
			<div className="flex items-center justify-between">
				<AppLogo />
				<ul className="hidden md:flex items-center space-x-8">
					<NavLink text="Home" />
					<NavLink text="About Us" />
					<NavLink text="Blog" />
					<NavLink text="Contact Us" />
				</ul>
				<div className="">
					{!user ? (
						<GetStartedButtonDropdown />
					) : (
						<Link to={"/home"}>
							<Button className="rounded-full">Go to App</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

const NavLink: FC<NavLinkProps> = ({ text }) => (
	<Link to={"/"}>
		<li className="text-xl font-medium hover:text-[#ff9900] hover:underline hover:underline-offset-4 transition-colors duration-200">{text}</li>
	</Link>
);

const HeroSection = () => {
	const { user } = useAuthStore();
	return (
		<div className="mt-10">
			<div className="grid grid-cols-1 md:grid-cols-8 gap-5">
				<div className="col-auto md:col-span-5">
					<h1 className="text-[60px] font-bold">The perfect place to backup your memories and share them with your loved ones.</h1>
					<div className="mt-10">
						<h3 className="text-lg">We provide the best cloud storage for your photos and videos. Our platform is designed to help you store your memories and share them with your loved ones.</h3>
					</div>
					<div className="mt-6">
						{!user ? (
							<GetStartedButtonDropdown />
						) : (
							<Link to={"/home"} data-cy={"go-to-dashboard"}>
								<Button className="rounded-full">Go to App</Button>
							</Link>
						)}
					</div>
				</div>
				<div className="col-auto md:col-span-3 order-first md:order-none">
					<Suspense fallback={<Loader2 className="w-10 h-10 animate-spin" />}>
						<Image srcList={["/images/vintage-photos.jpg"]} alt="" className="rounded-3xl h-[600px]" />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default NewLandingPage;
