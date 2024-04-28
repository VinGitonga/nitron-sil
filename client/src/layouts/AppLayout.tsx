import AppSidebar from "@/components/app-layouts/AppSidebar";
import AppLogo from "@/components/app-logo/AppLogo";
import MobileSidebarDialog from "@/components/modals/MobileSidebarDialog";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
	return (
		<div className="flex h-screen">
			<div className="hidden md:block">
				<AppSidebar />
			</div>
			<div className="flex flex-col flex-1">
				<div className="block md:hidden border-b">
					<div className="px-2 py-2">
						<div className="flex items-center justify-between">
							<MobileSidebarDialog />
							<AppLogo />
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1 overflow-y-auto pt-[20px] px-[5px] md:px-[30px] py-[20px]">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
