import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import AppSidebar from "../app-layouts/AppSidebar";

function MobileSidebarDialog() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size={"icon"}>
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<div className="font-inconsolata">
					<AppSidebar />
				</div>
			</SheetContent>
		</Sheet>
	);
}

export default MobileSidebarDialog;
