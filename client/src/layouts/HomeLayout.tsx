import MainNav from "@/components/navbar/MainNav";
import NavItem from "@/components/navbar/NavItem";
import { Outlet } from "react-router-dom";

const navItems = [<NavItem text="Home" href="home" />, <NavItem text="Albums" href="albums" />, <NavItem text="Photos" href="photos" />];

const HomeLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="border-b">
				<div className="flex h-16 items-center px-4">
					<MainNav navItems={navItems} className="mx-6" />
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default HomeLayout;
