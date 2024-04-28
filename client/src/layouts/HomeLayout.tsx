import MainNav from "@/components/navbar/MainNav";
import NavItem from "@/components/navbar/NavItem";
import UserNav from "@/components/navbar/UserNav";
import { Outlet } from "react-router-dom";

const navItems = [<NavItem text="Home" href="home" />, <NavItem text="Albums" href="home/albums" />, <NavItem text="Photos" href="home/photos" />];

const HomeLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="border-b">
				<div className="flex h-16 items-center px-4">
					<MainNav navItems={navItems} className="mx-6" />
					<div className="ml-auto flex items-center space-x-4">
						<UserNav />
					</div>
				</div>
			</div>
			<div className="px-4 py-3">
				<Outlet />
			</div>
		</div>
	);
};

export default HomeLayout;
