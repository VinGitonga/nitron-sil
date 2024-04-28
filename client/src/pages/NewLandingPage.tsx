import GetStartedButtonDropdown from "@/components/dropdowns/GetStartedButtonDropdown";
import Image from "@/components/images/Image";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";
import { FC } from "react";
import { SiMagic } from "react-icons/si";
import { Link } from "react-router-dom";

type NavLinkProps = {
	text: string;
};

const NewLandingPage = () => {
	return (
		<div className="px-28 py-6">
			<div className="border-b">
				<NavSection />
			</div>
			<HeroSection />
		</div>
	);
};

const NavSection = () => {
	const { user } = useAuthStore();
	return (
		<div className="py-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="p-2 bg-[#ff9900] rounded-full">
						<SiMagic />
					</div>
					<h1 className="text-3xl font-bold">Nitron</h1>
				</div>
				<ul className="flex items-center space-x-8">
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
				<div className="md:col-span-5">
					<h1 className="text-[60px] font-bold">The perfect place to backup your memories and share them with your loved ones.</h1>
					<div className="mt-10">
						<h3 className="text-lg">We provide the best cloud storage for your photos and videos. Our platform is designed to help you store your memories and share them with your loved ones.</h3>
					</div>
					<div className="mt-6">
						{!user ? (
							<GetStartedButtonDropdown />
						) : (
							<Link to={"/home"}>
								<Button className="rounded-full">Go to App</Button>
							</Link>
						)}
					</div>
				</div>
				<div className="md:col-span-3">
					<Image srcList={["/images/vintage-photos.jpg"]} alt="" className="rounded-3xl h-[600px]" />
				</div>
			</div>
		</div>
	);
};

export default NewLandingPage;
